import { Navigate } from 'react-router';

const ProtectedRoute = ({ element, requiredRole }) => {
    const userRole = localStorage.getItem('userRole');

    if (!userRole) {
        // Pas de rôle stocké = pas connecté
        return <Navigate to="/Connexion" replace />;
    }

    if (requiredRole && userRole !== requiredRole) {
        // Rôle ne correspond pas
        return <Navigate to="/" replace />;
    }

    return element;
};

export default ProtectedRoute;
