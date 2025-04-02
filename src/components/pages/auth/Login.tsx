import { useForm } from 'react-hook-form';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Logo from '../../assets/images/logo.png';
import { useAuth } from '../../../hooks/user/useAuth';
import { loginSchema } from '../../../schemas/auth';
import { useState } from 'react';

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const { handleLogin } = useAuth(setLoading); // Pass setLoading to useAuth


    const onSubmit = (data: LoginFormInputs) => {
        // handleLogin();
    };

    const handleSsoLogin = () => {
        setLoading(true); // Set loading to true when login starts
        handleLogin()
            .finally(() => setLoading(false)); // Set loading to false when login completes
    };


    return (
        <>
            <header className="LoginHeader">
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-end">
                            <img src="images/logoFull.png" alt="" />
                        </div>
                    </div>
                </div>
            </header>
            <section className="login d-flex align-items-center">
                <div className="container">
                    <div className="row g-4 justify-content-center align-items-end">
                        <div className="col-xl-7 col-lg-6 col-md-12 col-sm-12 col-12">
                        </div>
                        <div className="col-xl-5 col-lg-6 ps-xl-5 col-md-12 col-sm-12 col-12">
                            <div className="loginCard p-lg-4 p-md-4 p-sm-3 p-3">
                                <h1 className="m-0">Beyond the Bell</h1>
                                <p className="my-lg-4 my-md-4 my-3 py-lg-2 py-md-1 py-0">Digitize your afterschool management and
                                    save time for what truly matters.</p>
                                {/* //<button className="btn btn-primary" onClick={() => handleSsoLogin()}>Login</button> */}
                                <button className="btn btn-primary" onClick={() => handleSsoLogin()}> {loading ? (
                                        <span className="btnloader loader"></span>
                                    ) : (
                                        'Login'
                                    )}
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
