import React from 'react';
import { Navigate, Outlet,useLocation } from 'react-router-dom';

// Assuming you store your token in localStorage
const useAuth = () => {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists
};

interface ProtectedRoutesProps {
    allowedRoutes: boolean;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({allowedRoutes}) => {
    const isAuth = useAuth();
    const location = useLocation();
    // return isAuth ? <Outlet /> : <Navigate to="/" />;
    if (!isAuth) {
        return <Navigate to="/" />;
    }

    if (allowedRoutes && location.pathname !== '/dashboard') {
        return <Navigate to="/dashboard" />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
