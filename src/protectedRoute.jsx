import { useAuth } from "./context/auth.context";
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function ProtectedRoute() {
    const { loading, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated()) {
            navigate('/notFound');
        }
    }, [isAuthenticated && loading, navigate]);

    if (!loading && !isAuthenticated()) {
        return null;
    }

    return <Outlet />;
}

export default ProtectedRoute;
