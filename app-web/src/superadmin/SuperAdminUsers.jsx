import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import NavBarSuperAdmin from '../components/NavBarSuperAdmin';
import axios from 'axios';

function SuperAdminUsers() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true)
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [showOptions, setShowOptions] = useState(false);
    const [editMessage, setEditMessage] = useState(false)
    const [deleteMessage, setDeleteMessage] = useState(false);
    const [confirmerBoutton, setConfirmerBoutton] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editRole, setEditRole] = useState('');
    const [clubs, setClubs] = useState([]);
    const [editClub, setEditClub] = useState('');

    const usersPerPage = 15;

    useEffect(() => {
        fetchUsers();
        fetchClubs();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/superadmin/users', {
                withCredentials: true
            });
            setUsers(response.data);
            setError(null);
        } catch (err) {
            console.error('Erreur lors du chargement des utilisateurs:', err);
            setError('Erreur lors du chargement des utilisateurs');

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

    const fetchClubs = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/superadmin/clubs', {
                withCredentials: true
            });
            setClubs(response.data);
        } catch (err) {
            console.error('Erreur lors du chargement des clubs:', err);
        }
    };

    const handleDeleteUser = async () => {
        if (!selectedUser) return;
        try {
            await axios.delete(`http://localhost:3000/api/superadmin/users/${selectedUser.id_adherent}`, {
                withCredentials: true
            });
            setUsers(users.filter(u => u.id_adherent !== selectedUser.id_adherent));
            setDeleteMessage(false);
            setConfirmerBoutton(false);
            setSelectedUser(null);
            setShowOptions(false);
        } catch (err) {
            console.error('Erreur lors de la suppression:', err);
            setError('Erreur lors de la suppression de l\'utilisateur');
        }
    };

    const handleUpdateUser = async () => {
        if (!selectedUser) return;
        try {
            const updatedUser = { ...selectedUser, role: editRole, id_club: editClub || null };
            await axios.put(`http://localhost:3000/api/superadmin/users/${selectedUser.id_adherent}`, updatedUser, {
                withCredentials: true
            });
            setUsers(users.map(u => u.id_adherent === selectedUser.id_adherent ? updatedUser : u));
            setEditMessage(false);
            setConfirmerBoutton(false);
            setSelectedUser(null);
            setShowOptions(false);
        } catch (err) {
            console.error('Erreur lors de la mise à jour:', err);
            setError('Erreur lors de la mise à jour de l\'utilisateur');
       
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = (currentPage - 1) * usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.max(1, Math.ceil(users.length / usersPerPage));

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

    const openOptions = (user) => {
        setSelectedUser(user);
        setEditRole(user.role);
        setEditClub(user.id_club || '');
        setShowOptions(true);
        setConfirmerBoutton(false);
    };

    return (  
        <>
            
            {showOptions &&
                <div className="absolute inset-0 bg-[#00000166] bg-opacity-50 flex items-center justify-center z-50">
                <div className="relative flex flex-col justify-evenly h-2/5 bg-white rounded-lg p-8 max-w-md w-full">
                    <div className="flex flex-col justify-between items-center space-y-5">
                        <h1 className="text-xl font-bold m-auto">Voulez-vous supprimer ou modifier l'utilisateur</h1>
                        <h2 className=''>Rôle actuel : {selectedUser?.role}</h2>
        
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
                        <h1 className="text-xl font-bold m-auto">Supprimer l'utilisateur</h1>
                        <h2 className=''>Etes-vous sur de vouloir supprimer cet utilisateur?</h2>
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
                            <button type="button" onClick={handleDeleteUser} className='bg-[#68bd6c] rounded-xl border border-[#bd68681a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12 backdrop-blur-md'>OUI</button>
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
                <div className="relative flex flex-col justify-evenly h-3/5 bg-white rounded-lg p-8 max-w-md w-full overflow-y-auto">
                    <div className="flex flex-col justify-between items-center space-y-5">
                        <h1 className="text-xl font-bold m-auto">Modifier l'utilisateur</h1>
                        <div className="w-full space-y-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Sélectionner un rôle :</label>
                                <select 
                                    value={editRole} 
                                    onChange={(e) => setEditRole(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7CA982]"
                                >
                                    <option value="utilisateur">Utilisateur</option>
                                    <option value="admin">Admin</option>
                                    <option value="superAdmin">Super Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Sélectionner un club :</label>
                                <select 
                                    value={editClub} 
                                    onChange={(e) => setEditClub(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7CA982]"
                                >
                                    <option value="">Aucun club</option>
                                    {clubs.map((club) => (
                                        <option key={club.id_club} value={club.id_club}>
                                            {club.nom}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button
                            className="absolute right-5 top-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                            onClick={() => setEditMessage(false)}
                        >
                            ✕
                        </button>
                    </div>
                    <div className='flex justify-around items-center '>
                        {confirmerBoutton ? 
                            <button type="button" onClick={handleUpdateUser} className='bg-[#68bd6c] rounded-xl border border-[#bd68681a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12 backdrop-blur-md'>OUI</button>
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
                <h1 className="font-spartan text-[#7CA982] font-bold text-5xl text-center underline mt-15 pb-5">Gestion Utilisateurs</h1>
                {error && <div className="text-red-600 text-center mb-4">{error}</div>}
                {loading && <div className="text-center py-10">Chargement des utilisateurs...</div>}
                {!loading && (
                <table className="table-auto w-9/10 border-collapse border-2 border-white rounded-xl mx-15 text-white bg-[#7CA982]">
                    <thead className="rounded-xl">
                        <tr>
                        <th className="px-4 py-2 text-white font-roboto text-md text-left">ID</th>
                        <th className="px-20 py-2 text-white font-roboto text-md text-left">Prénom</th>
                        <th className="px-20 py-2 text-white font-roboto text-md text-left">Nom</th>
                        <th className="px-40 py-2 text-white font-roboto text-md text-left">Email</th>
                        <th className="px-4 py-2 text-white font-roboto text-md text-left">Rôle</th>
                        <th className="px-4 py-2 text-white font-roboto text-md text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentUsers.length > 0 ? (
                        currentUsers.map((user) => (
                            <tr key={user.id_adherent} className="border-b">
                                <td className="px-4 py-2">{user.id_adherent}</td>
                                <td className="px-20 py-2">{user.prenom}</td>
                                <td className="px-20 py-2">{user.nom}</td>
                                <td className="px-40 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.role}</td>
                                <td className="px-4 py-2 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => openOptions(user)}
                                        className=" bg-yellow-300 text-white px-3 py-1 rounded cursor-pointer hover:opacity-70"
                                    >
                                        Options
                                    </button>
                                </td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td className="px-4 py-2 text-red-600" colSpan={6}>
                                Aucun utilisateur à afficher.
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

                    <p className="border-2 border-white bg-[#7CA982] border-solid p-3 text-white font-bold rounded-xl">{currentPage} / {totalPages}</p>

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

export default SuperAdminUsers;