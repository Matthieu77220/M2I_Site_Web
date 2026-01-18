import {useState, useEffect} from 'react';
import {useNavigate } from 'react-router';
import NavBarSuperAdmin from '../components/NavBarSuperAdmin';
import axios from 'axios';

function PannelSuperAdmin() {
    const [open, setOpen] = useState(true)
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
        } finally {
            setLoading(false);
        }
    };

    return (  
        <>       
            <div className='flex'>
                <NavBarSuperAdmin open={open} setOpen={setOpen} />
            </div>

            <div className={`transition-all duration-300 ${open ? 'ml-64' : 'ml-20'}`}>
                <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-spartan text-[#7CA982] underline decoration-solid mt-10 pb-10 md:pb-20 px-4">
                    Dashboard du Super Administrateur
                </h1>

                {error && <div className="text-red-600 text-center mb-4">{error}</div>}
                
                {loading ? (
                    <div className="text-center py-10">Chargement des statistiques...</div>
                ) : stats && (
                    <section className="flex flex-col items-center justify-center space-y-8 px-4 pb-10">
                        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                            <div className="bg-[#7CA982] border-2 border-gray-300 p-6 rounded-2xl shadow-lg text-white text-center">
                                <h3 className="text-lg font-bold mb-2">Total Utilisateurs</h3>
                                <p className="text-4xl font-bold">{stats.total_users}</p>
                            </div>
                            <div className="bg-white border-2 border-gray-300 p-6 rounded-2xl shadow-lg text-center">
                                <h3 className="text-lg font-bold mb-2 text-[#7CA982]">Total Clubs</h3>
                                <p className="text-4xl font-bold text-[#7CA982]">{stats.total_clubs}</p>
                            </div>
                            <div className="bg-[#7CA982] border-2 border-gray-300 p-6 rounded-2xl shadow-lg text-white text-center">
                                <h3 className="text-lg font-bold mb-2">Licences Actives</h3>
                                <p className="text-4xl font-bold">{stats.active_licenses}</p>
                            </div>
                            <div className="bg-white border-2 border-gray-300 p-6 rounded-2xl shadow-lg text-center">
                                <h3 className="text-lg font-bold mb-2 text-[#7CA982]">Total Licences</h3>
                                <p className="text-4xl font-bold text-[#7CA982]">{stats.total_licenses}</p>
                            </div>
                            <div className="bg-[#7CA982] border-2 border-gray-300 p-6 rounded-2xl shadow-lg text-white text-center">
                                <h3 className="text-lg font-bold mb-2">Réservations</h3>
                                <p className="text-4xl font-bold">{stats.total_reservations}</p>
                            </div>
                            <div className="bg-white border-2 border-gray-300 p-6 rounded-2xl shadow-lg text-center">
                                <h3 className="text-lg font-bold mb-2 text-[#7CA982]">Matchs</h3>
                                <p className="text-4xl font-bold text-[#7CA982]">{stats.total_matches}</p>
                            </div>
                        </section>
                  
                        <section className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 lg:gap-12 w-full max-w-5xl">
                            <button 
                                onClick={() => navigate("../PannelAdmin")}
                                className="bg-[#7CA982] border-2 border-gray-300 w-full md:w-80 lg:w-96 h-48 md:h-56 lg:h-64 rounded-2xl shadow-lg 
                                           transition-all duration-300 hover:scale-105 hover:-translate-y-2 
                                           active:scale-95 cursor-pointer hover:shadow-2xl flex items-center justify-center">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">Pannel Admin</h2>
                            </button>
                       
                        </section>

                      
                        <section className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 lg:gap-12 w-full max-w-5xl">
                            <button 
                                onClick={() => navigate('../SuperAdminClubs')}
                                className="bg-white border-2 border-gray-300 w-full md:w-80 lg:w-96 h-48 md:h-56 lg:h-64 rounded-2xl shadow-lg 
                                           transition-all duration-300 hover:scale-105 hover:-translate-y-2 
                                           active:scale-95 cursor-pointer hover:shadow-2xl flex items-center justify-center">
                                <h2 className="text-2xl md:text-3xl font-bold">Clubs</h2>
                            </button>

                            <button 
                                onClick={() => navigate('../SuperAdminUsers')}
                                className="bg-[#7CA982] border-2 border-gray-300 w-full md:w-80 lg:w-96 h-48 md:h-56 lg:h-64 rounded-2xl shadow-lg 
                                           transition-all duration-300 hover:scale-105 hover:-translate-y-2 
                                           active:scale-95 cursor-pointer hover:shadow-2xl flex items-center justify-center">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">Utilisateurs</h2>
                            </button>
                        </section>
                    </section>
                )}
            </div>
        </>
    );
}

export default PannelSuperAdmin;