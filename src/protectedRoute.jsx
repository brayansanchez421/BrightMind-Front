import { useAuth } from "./context/auth.context";
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function ProtectedRoute() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/notFound');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated()) {
        // Redireccionar a la página de login si no está autenticado
        navigate('/');
        return null; // No renderizar nada
    }

    return <Outlet />;
}

export default ProtectedRoute;
