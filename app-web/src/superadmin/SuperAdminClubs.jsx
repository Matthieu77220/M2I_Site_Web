import {useState, useEffect} from 'react';
import { useNavigate} from 'react-router';
import NavBarSuperAdmin from '../components/NavBarSuperAdmin';
import axios from 'axios';

function SuperAdminClubs() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true)
    const [clubs, setClubs] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [showOptions, setShowOptions] = useState(false);
    const [editMessage, setEditMessage] = useState(false)
    const [deleteMessage, setDeleteMessage] = useState(false);
    const [confirmerBoutton, setConfirmerBoutton] = useState(false);
    const [selectedClub, setSelectedClub] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateClubModal, setShowCreateClubModal] = useState(false);
    const [clubFormData, setClubFormData] = useState({
        nom: '',
        adresse: '',
        telephone: '',
        email: ''
    });
    const [clubLoading, setClubLoading] = useState(false);
    const [clubError, setClubError] = useState(null);
    
    const clubsPerPage = 15;

    // Récupérer les clubs au chargement
    useEffect(() => {
        fetchClubs();
    }, []);

    const fetchClubs = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/superadmin/clubs', {
                withCredentials: true
            });
            setClubs(response.data);
            setError(null);
        } catch (err) {
            console.error('Erreur lors du chargement des clubs:', err);
            setError('Erreur lors du chargement des clubs');
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

    const handleDeleteClub = async () => {
        if (!selectedClub) return;
        try {
            await axios.delete(`http://localhost:3000/api/superadmin/clubs/${selectedClub.id_club}`, {
                withCredentials: true
            });
            setClubs(clubs.filter(c => c.id_club !== selectedClub.id_club));
            setDeleteMessage(false);
            setConfirmerBoutton(false);
            setSelectedClub(null);
            setShowOptions(false);
        } catch (err) {
            console.error('Erreur lors de la suppression:', err);
            setError('Erreur lors de la suppression du club');
        }
    };

    const handleUpdateClub = async () => {
        if (!selectedClub) return;
        try {
            await axios.put(`http://localhost:3000/api/superadmin/clubs/${selectedClub.id_club}`, selectedClub, {
                withCredentials: true
            });
            setClubs(clubs.map(c => c.id_club === selectedClub.id_club ? selectedClub : c));
            setEditMessage(false);
            setConfirmerBoutton(false);
            setSelectedClub(null);
            setShowOptions(false);
        } catch (err) {
            console.error('Erreur lors de la mise à jour:', err);
            setError('Erreur lors de la mise à jour du club');
        }
    };

    const indexOfLastClub = currentPage * clubsPerPage;
    const indexOfFirstClub = (currentPage - 1) * clubsPerPage;
    const currentClubs = clubs.slice(indexOfFirstClub, indexOfLastClub);
    const totalPages = Math.max(1, Math.ceil(clubs.length / clubsPerPage));

    function nextPage(){
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1);
        }
    }

    function prevPage(){
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }

    const openOptions = (club) => {
        setSelectedClub({...club});
        setShowOptions(true);
        setConfirmerBoutton(false);
    };

    const handleClubFieldChange = (field, value) => {
        setSelectedClub(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCreateClub = async (e) => {
        e.preventDefault();
        
        if (!clubFormData.nom.trim() || !clubFormData.adresse.trim() || !clubFormData.telephone.trim() || !clubFormData.email.trim()) {
            setClubError('Tous les champs sont requis');
            return;
        }

        try {
            setClubLoading(true);
            setClubError(null);
            const response = await axios.post('http://localhost:3000/api/superadmin/clubs', clubFormData, {
                withCredentials: true
            });
            setShowCreateClubModal(false);
            setClubFormData({
                nom: '',
                adresse: '',
                telephone: '',
                email: ''
            });
            fetchClubs();
            alert('Club créé avec succès !');
        } catch (err) {
            console.error('Erreur lors de la création du club:', err);
            setClubError(err.response?.data?.message || 'Erreur lors de la création du club');
        } finally {
            setClubLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClubFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    return (  
        <>
            
            {showOptions &&
                <div className="fixed inset-0 bg-[#00000166] bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="relative flex flex-col justify-evenly h-2/5 bg-white rounded-lg p-8 max-w-md w-full">
                    <div className="flex flex-col justify-between items-center space-y-5">
                        <h1 className="text-xl font-bold m-auto">Voulez-vous supprimer ou modifier ce club ?</h1>
                        <h2 className=''>double cliquez pour valider</h2>
        
                        <button
                            className="absolute right-5 top-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                            onClick={() => setShowOptions(false)}
                        >
                            ✕
                        </button>
                    </div>
                    <div className='flex justify-around items-center '>
                        <button
                        type="button"
                        onClick={() => setEditMessage(true)}
                        className="bg-amber-400 rounded-xl border border-[#bd68681a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12 backdrop-blur-md"
                        >
                            Editer
                        </button>
                        <button 
                        type="button"
                        onClick={() => setDeleteMessage(true)}
                        className="bg-red-600 rounded-xl border border-[#bd68681a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12 backdrop-blur-md"
                        >
                            Supprimer
                        </button>
                            
                    </div>
                </div>
                </div>
            }        
            
            {deleteMessage &&
                <div className="fixed inset-0 bg-[#00000166] bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="relative flex flex-col justify-evenly h-2/5 bg-white rounded-lg p-8 max-w-md w-full">
                    <div className="flex flex-col justify-between items-center space-y-5">
                        <h1 className="text-xl font-bold m-auto">Supprimer ce club</h1>
                        <h2 className=''>Etes-vous sur de vouloir supprimer ce club ?</h2>
                        {confirmerBoutton &&  <h3 className='text-red-600 font-bold'>Cette action est irréversible.</h3>}
                        <button
                            className="absolute right-5 top-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                            onClick={() => setDeleteMessage(false)}
                        >
                            ✕
                        </button>
                    </div>
                    <div className='flex justify-around items-center '>
                        {confirmerBoutton ? 
                            <button type="button" onClick={handleDeleteClub} className='bg-[#68bd6c] rounded-xl border border-[#bd68681a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12 backdrop-blur-md'>OUI</button>
                            :
                            <button type="button" onClick={() => {setConfirmerBoutton(!confirmerBoutton)}} className='bg-[#68bd6c] rounded-xl border border-[#bd68681a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12 backdrop-blur-md'>OUI</button>
                        }
                        <button type="button" className='bg-red-600 rounded-xl border border-[#68bd6c1a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12' onClick={() => setDeleteMessage(false)}>NON</button>
                    </div>
                </div>
                </div>
            }
    
            {editMessage &&
                <div className="fixed inset-0 bg-[#00000166] bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="relative flex flex-col justify-evenly h-auto max-h-[90vh] bg-white rounded-lg p-8 max-w-md w-full overflow-y-auto">
                    <div className="flex flex-col justify-between items-center space-y-4">
                        <h1 className="text-xl font-bold m-auto">Modifier le club</h1>
                        
                        <div className="w-full">
                            <label className="block text-gray-700 font-bold mb-2">Nom du club :</label>
                            <input 
                                type="text"
                                value={selectedClub?.nom || ''}
                                onChange={(e) => handleClubFieldChange('nom', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7CA982]"
                            />
                        </div>

                        <div className="w-full">
                            <label className="block text-gray-700 font-bold mb-2">Adresse :</label>
                            <input 
                                type="text"
                                value={selectedClub?.adresse || ''}
                                onChange={(e) => handleClubFieldChange('adresse', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7CA982]"
                            />
                        </div>

                        <div className="w-full">
                            <label className="block text-gray-700 font-bold mb-2">Téléphone :</label>
                            <input 
                                type="text"
                                value={selectedClub?.telephone || ''}
                                onChange={(e) => handleClubFieldChange('telephone', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7CA982]"
                            />
                        </div>

                        <button
                            className="absolute right-5 top-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                            onClick={() => setEditMessage(false)}
                        >
                            ✕
                        </button>
                    </div>
                    <div className='flex justify-around items-center mt-4'>
                        {confirmerBoutton ? 
                            <button type="button" onClick={handleUpdateClub} className='bg-[#68bd6c] rounded-xl border border-[#bd68681a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12 backdrop-blur-md'>OUI</button>
                            :
                            <button type="button" onClick={() => {setConfirmerBoutton(!confirmerBoutton)}} className='bg-[#68bd6c] rounded-xl border border-[#bd68681a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12 backdrop-blur-md'>OUI</button>
                        }
                        <button type="button" className='bg-red-600 rounded-xl border border-[#68bd6c1a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12' onClick={() => setEditMessage(false)}>NON</button>
                    </div>
                </div>
                </div>
            }

            <div className='flex'>
                <NavBarSuperAdmin open={open} setOpen={setOpen} />
            </div>

            <section className= {`duration-500 ${open ? "md:pl-60" : "md:pl-[72px]"} p-4`}>
                <h1 className="font-spartan text-[#7CA982] font-bold text-3xl md:text-5xl text-center underline mt-15 pb-5">Gestion Clubs</h1>
                
                <div className="flex justify-center pb-4">
                    <button 
                        onClick={() => setShowCreateClubModal(true)}
                        className="bg-[#7CA982] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#6a9470] transition-all shadow-lg"
                    >
                        + Créer un Club
                    </button>
                </div>

                {error && <div className="text-red-600 text-center mb-4">{error}</div>}
                {loading && <div className="text-center py-10">Chargement des clubs...</div>}
                {!loading && (
                <table className="table-auto w-9/10 border-collapse border-2 border-white rounded-xl bg-[#7CA982] mx-15 text-white">
                    <thead className="rounded-xl font-xl">
                        <tr>
                        <th className="text-white font-roboto text-md px-4 py-2 text-left">ID</th>
                        <th className="text-white font-roboto text-md px-4 py-2 text-left">Nom</th>
                        <th className="text-white font-roboto text-md px-4 py-2 text-left">Adresse</th>
                        <th className="text-white font-roboto text-md px-4 py-2 text-left whitespace-nowrap">Téléphone</th>
                        <th className="text-white font-roboto text-md px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentClubs.length > 0 ? (
                        currentClubs.map((club) => (
                        <tr key={club.id_club} className="border-b">
                            <td className="px-4 py-2">{club.id_club}</td>
                            <td className="px-4 py-2">{club.nom}</td>
                            <td className="px-4 py-2">{club.adresse}</td>
                            <td className="px-4 py-2">{club.telephone}</td>
                            <td className="px-4 py-2 gap-3">
                                <button
                                type="button"
                                onClick={() => openOptions(club)}
                                className=" bg-yellow-300 text-white px-3 py-1 rounded cursor-pointer hover:opacity-70"
                                >
                                    Options
                                </button>
                            </td>
                        </tr>
                        ))
                        ) : (
                        <tr>
                            <td className="px-4 py-2 text-red-600" colSpan={5}>
                                Aucun clubs à afficher.
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
                )}

                <section className="flex justify-center p-2 gap-2">
                    <button 
                        type="button"
                        onClick={() =>{prevPage()}}
                        className="border-2 border-white bg-[#7CA982] border-solid cursor-pointer p-3 text-white font-bold rounded-xl"
                    >
                        &lt;
                    </button>

                    <p className="border-2 border-white bg-[#7CA982] border-solid cursor-pointer p-3 text-white font-bold rounded-xl">{currentPage} / {totalPages}</p>

                    <button 
                        type="button"
                        onClick={() => {nextPage()}} 
                        className="border-2 border-white bg-[#7CA982] border-solid cursor-pointer p-3 text-white font-bold rounded-xl"
                    >
                        &gt;
                    </button>

                </section>
    
            </section>

            {/* Modale de création de club */}
            {showCreateClubModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold text-[#7CA982] mb-4">Créer un nouveau Club</h2>
                        
                        {clubError && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                {clubError}
                            </div>
                        )}

                        <form onSubmit={handleCreateClub} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">
                                    Nom du Club
                                </label>
                                <input
                                    type="text"
                                    name="nom"
                                    value={clubFormData.nom}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7CA982]"
                                    placeholder="Ex: AS Foot"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-bold mb-2">
                                    Adresse
                                </label>
                                <input
                                    type="text"
                                    name="adresse"
                                    value={clubFormData.adresse}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7CA982]"
                                    placeholder="Ex: 123 Rue de la Paix"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-bold mb-2">
                                    Téléphone
                                </label>
                                <input
                                    type="tel"
                                    name="telephone"
                                    value={clubFormData.telephone}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7CA982]"
                                    placeholder="Ex: 06 12 34 56 78"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-bold mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={clubFormData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7CA982]"
                                    placeholder="Ex: contact@asfoot.fr"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={clubLoading}
                                    className="flex-1 bg-[#7CA982] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#6a9470] disabled:opacity-50 transition-all"
                                >
                                    {clubLoading ? 'Création...' : 'Créer'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCreateClubModal(false);
                                        setClubFormData({
                                            nom: '',
                                            adresse: '',
                                            telephone: '',
                                            email: ''
                                        });
                                        setClubError(null);
                                    }}
                                    className="flex-1 bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-400 transition-all"
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default SuperAdminClubs;