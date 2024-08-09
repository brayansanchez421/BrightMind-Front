import { useAuth } from "./context/auth.context";
import { Outlet, Navigate } from 'react-router-dom';

function PublicRoute({ redirectToUser = "/Home", redirectToAdmin = "/admin" }) {
    const { loading, isAuthenticated, role } = useAuth();

    if (loading) {
        return <div>Loading...</div>;  // Indicador de carga
    }

    if (isAuthenticated()) {
        if (role === "usuario") {
            return <Navigate to={redirectToUser} />;
        } else if (role === "Admin") {
            return <Navigate to={redirectToAdmin} />;
        }
    }

    // Si no está autenticado, renderizar el componente hijo
    return <Outlet />;
}

export default PublicRoute;