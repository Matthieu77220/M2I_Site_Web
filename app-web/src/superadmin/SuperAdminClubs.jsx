import {useState, useEffect} from 'react';
import { useNavigate} from 'react-router';
import NavBarSuperAdmin from '../components/NavBarSuperAdmin';
import axios from 'axios';

function SuperAdminClubs() {
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
    
    return (  
        <>
            
            {showOptions &&
                <div className="absolute inset-0 bg-[#00000166] bg-opacity-50 flex items-center justify-center z-50">
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
                <div className="absolute inset-0 bg-[#00000166] bg-opacity-50 flex items-center justify-center z-50">
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
                <div className="absolute inset-0 bg-[#00000166] bg-opacity-50 flex items-center justify-center z-50">
                <div className="relative flex flex-col justify-evenly h-auto bg-white rounded-lg p-8 max-w-md w-full max-h-96 overflow-y-auto">
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

            <section className= {`duration-500 ${open ? "pl-60" : "pl-[72px]"}`}>
                <h1 className="font-spartan text-[#7CA982] font-bold text-5xl text-center underline mt-15 pb-5">Gestion Clubs</h1>
                {error && <div className="text-red-600 text-center mb-4">{error}</div>}
                {loading && <div className="text-center py-10">Chargement des clubs...</div>}
                {!loading && (
                <table className="table-auto w-9/10 border-collapse border-2 border-white rounded-xl bg-[#7CA982] mx-15 text-white">
                    <thead className="rounded-xl font-xl">
                        <tr>
                        <th className="text-white font-roboto text-md px-4 py-2 text-left">ID</th>
                        <th className="text-white font-roboto text-md px-50 py-2 text-left">Nom</th>
                        <th className="text-white font-roboto text-md px-50 py-2 text-left">Adresse</th>
                        <th className="text-white font-roboto text-md px-4 py-2 text-left">Téléphone</th>
                        <th className="text-white font-roboto text-md px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentClubs.length > 0 ? (
                        currentClubs.map((club) => (
                        <tr key={club.id_club} className="border-b">
                            <td className="px-4 py-2">{club.id_club}</td>
                            <td className="px-50 py-2">{club.nom}</td>
                            <td className="px-50 py-2">{club.adresse}</td>
                            <td className="px-4 py-2">{club.telephone}</td>
                            <td className="px-4 py-2 flex gap-3">
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

        </>
    );
}

export default SuperAdminClubs;