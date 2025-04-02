import { useMsal } from "@azure/msal-react";
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

export const useAuth = (setLoading: (loading: boolean) => void) => {
    const { instance } = useMsal();
    const navigate = useNavigate(); // Make sure to include navigate here

    useEffect(() => {
        instance.handleRedirectPromise()
            .then(response => {
                if (response) {
                    console.log("Authentication response:", response);
                } else {
                    console.log("No response, check if the login flow was interrupted.");
                }
            })
            .catch(error => {
                console.error("Error handling redirect promise:", error);
            });
    }, [instance]);

    const handleLogin = (): Promise<void> => {
        const request = {
            scopes: ["openid", "profile", "email", "api://d32d00a5-d256-47a9-bd92-c040e3dcbfa1/Read.All"]
        };

        return instance.loginPopup(request)
            .then(async response => {
                const accessToken = response.accessToken;
                // console.log("Access Token:", accessToken);
                const userData = await authorizeToken(accessToken);
                if (userData) {
                    localStorage.setItem('token', accessToken);
                    localStorage.setItem('userData', JSON.stringify(userData));
                    toast.success('Login successfully');
                    navigate('/dashboard');
                }
            })
            .catch(error => {
                console.error(error);
                toast.error('Login failed');
            });
    };

    const authorizeToken = async (token: string) => {
        try {
            const response = await axiosInstance.post(`/Auth/validate-token`, { token });
            if (response.status === 200 && response.data.success) {
                const validatedUser = response.data.data;
                const { email, firstName } = validatedUser;
                return validatedUser;
            } else {
                console.error("Token validation failed:", response.data.message);
                return null;
            }
        } catch (error) {
            console.error("An error occurred while validating the token:", error);
            toast.error('An error occurred during token validation');
            return null;
        }
    };

    return { handleLogin };
};
