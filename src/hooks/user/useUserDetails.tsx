import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { toast } from 'react-toastify';

interface UserDetails {
    email: string;
    firstName: string;
}

export const useUserDetails = () => {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('No token found. Please login.');
                setLoading(false);
                return;
            }
            try {
                const response = await axiosInstance.post(`/Auth/validate-token`, { token });
                if (response.status === 200 && response.data.success) {
                    const { email, firstName } = response.data.data;
                    setUserDetails({ email, firstName });
                } else {
                    toast.error('Failed to validate token.');
                    console.error("Token validation failed:", response.data.message);
                }
            } catch (error) {
                console.error("An error occurred while validating the token:", error);
                toast.error('An error occurred during token validation.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    return { userDetails, loading };
};
