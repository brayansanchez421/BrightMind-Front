import { useAuth } from "./context/auth.context";
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoute({ requiredRole }) {
    const { loading, isAuthenticated, user, role} = useAuth();
    console.log(role);

    // Mostrar un indicador de carga mientras se verifica la autenticación
    if (loading) {
        return <div>Loading...</div>;  // Indicador de carga
    }

    // Verificar si el usuario está autenticado
    if (!isAuthenticated()) {
        console.log("User is not authenticated, redirecting to /notFound");
        return <Navigate to="/notFound" />;
    }

    // Verificar si el rol del usuario está disponible y coincide con el rol requerido
    const userRole = role;  // Adaptar según la estructura correcta
    if (requiredRole && (!userRole || userRole !== requiredRole)) {
        console.log(`User role (${userRole}) does not match required role (${requiredRole}), redirecting to /notFound`);
        return <Navigate to="/notFound" />;
    }

    console.log("la informacion del usuario es",user);

    // Renderizar el componente Outlet si el usuario está autorizado
    return <Outlet />;
}

export default ProtectedRoute;