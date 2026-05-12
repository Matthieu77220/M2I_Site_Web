import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import NavBarSuperAdmin from '../components/NavBarSuperAdmin';
import axios from 'axios';


function SuperAdminStats() {
    const [open, setOpen] = useState(true);
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate();
     useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/superadmin/dashboard/stats', {
                withCredentials: true
            });
            setStats(response.data);
            setError(null);
        } catch (err) {
            console.error('Erreur lors du chargement des stats:', err);
            setError('Erreur lors du chargement des statistiques');
            
            if (err.response && err.response.status == 401) { 
                    navigate("/connexion");
                    console.log("Erreur d'authentification : ", err.response.data.message);
            }
            if(err.response && err.response.status == 403) {
                navigate("/connexion");
                console.log("Accès refusé : ", err.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return ( 
        <>
            <div className='flex'>
                <NavBarSuperAdmin open={open} setOpen={setOpen} />
            </div>

            <div className={`duration-500 ${open ? "pl-60" : "pl-[72px]"} pr-8 pt-8 pb-8`}>
                <h1 className="text-3xl md:text-4xl font-bold text-[#7CA982] mb-10 ml-8">
                    Statistiques
                </h1>
                 {error && <div className="text-red-600 text-center mb-4">{error}</div>}
                
                {loading ? (
                    <div className="text-center py-10">Chargement des statistiques...</div>
                ) : stats && (



                     <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl  mx-auto">
                        
                        {/* Donnée Utilisateurs */}
                            <div className="bg-[#7CA982] border-2 border-gray-300 p-6 rounded-2xl shadow-lg text-white text-center">
                                <h3 className="text-lg font-bold mb-2">Total Utilisateurs</h3>
                                <p className="text-4xl font-bold">{stats.total_users}</p>
                            </div>
                            <div className="bg-[#7CA982] border-2 border-gray-300 p-6 rounded-2xl shadow-lg text-white text-center">
                                <h3 className="text-lg font-bold mb-2">Super Administrateur total</h3>
                                <p className="text-4xl font-bold">{stats.total_super_admin}</p>
                            </div>
                            <div className="bg-[#7CA982] border-2 border-gray-300 p-6 rounded-2xl shadow-lg text-white text-center">
                                <h3 className="text-lg font-bold mb-2">Administrateurs total</h3>
                                <p className="text-4xl font-bold">{stats.total_admin}</p>
                            </div>
                    
                        {/* Donnée Club */}
                            <div className="bg-[#7CA982] border-2 border-gray-300 p-6 rounded-2xl shadow-lg text-white text-center">
                                <h3 className="text-lg font-bold mb-2">Total Club</h3>
                                <p className="text-4xl font-bold">{stats.total_club}</p>
                            </div>

                        {/* Donnée Licence */}
                            <div className="bg-[#7CA982] border-2 border-gray-300 p-6 rounded-2xl shadow-lg text-white text-center">
                                <h3 className="text-lg font-bold mb-2">Licences non valides</h3>
                                <p className="text-4xl font-bold">{stats.licence_non_valides}</p>
                            </div>
                            <div className="bg-[#7CA982] border-2 border-gray-300 p-6 rounded-2xl shadow-lg text-white text-center">
                                <h3 className="text-lg font-bold mb-2">Licences valides</h3>
                                <p className="text-4xl font-bold">{stats.licence_valides}</p>
                            </div>
                            <div className="bg-white border-2 border-gray-300 p-6 rounded-2xl shadow-lg text-center">
                                <h3 className="text-lg font-bold mb-2 text-[#7CA982]">Total Licences</h3>
                                <p className="text-4xl font-bold text-[#7CA982]">{stats.total_licenses}</p>
                            </div>
                        
                        {/* Donnée Matchs */}
                            <div className="bg-[#7CA982] border-2 border-gray-300 p-6 rounded-2xl shadow-lg text-white text-center">
                                <h3 className="text-lg font-bold mb-2">Réservations</h3>
                                <p className="text-4xl font-bold">{stats.total_reservations}</p>
                            </div>
                            <div className="bg-white border-2 border-gray-300 p-6 rounded-2xl shadow-lg text-center">
                                <h3 className="text-lg font-bold mb-2 text-[#7CA982]">Matchs</h3>
                                <p className="text-4xl font-bold text-[#7CA982]">{stats.total_matches}</p>
                            </div>
                        </section>
                )}

            </div>
        </>
    );  
}

export default SuperAdminStats;