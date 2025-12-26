import { useNavigate } from 'react-router';
import axios from 'axios';

export const useLogout = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            // Optionnel: appel API pour déconnexion côté serveur
            await axios.post('http://localhost:3000/api/auth/deconnexion', {}, {
                withCredentials: true
            });
        } catch (err) {
            console.error('Erreur lors de la déconnexion:', err);
        } finally {
            // Nettoyer le localStorage
            localStorage.removeItem('userRole');
            localStorage.removeItem('userId');
            
            // Rediriger vers la page d'accueil
            navigate('/');
        }
    };

    return logout;
};
