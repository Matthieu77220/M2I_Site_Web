import { useState, useEffect } from 'react';
import NavBarAdmin from '../components/NavBarAdmin';

function AdminUsers() {
    const [open, setOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [showOptions, setShowOptions] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editMessage, setEditMessage] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(false);
    const [confirmerBoutton, setConfirmerBoutton] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        admin: 0
    });

    const usersPerPages = 15;

    // Charge les utilisateurs au montage du composant
    useEffect(() => {
        fetchUsers();
    }, []);

    // Récupére tous les utilisateurs
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/admin/users', {
                credentials: 'include'
            });
            
            if (!response.ok) throw new Error('Erreur lors du chargement');
            
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
            console.error('Erreur:', err);
        } finally {
            setLoading(false);
        }
    };

  
    const handleCreateUser = async () => {
        if (!formData.email || !formData.password) {
            alert('Email et mot de passe requis');
            return;
        }

        try {
            const response = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            alert('Utilisateur créé avec succès');
            setShowAddModal(false);
            setFormData({ email: '', password: '', admin: 0 });
            fetchUsers();
        } catch (err) {
            alert('Erreur: ' + err.message);
        }
    };

 
    const handleUpdateUser = async () => {
        if (!selectedUser) return;

        try {
            const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            alert('Utilisateur modifié avec succès');
            setEditMessage(false);
            setConfirmerBoutton(false);
            setFormData({ email: '', password: '', admin: 0 });
            setSelectedUser(null);
            fetchUsers();
        } catch (err) {
            alert('Erreur: ' + err.message);
        }
    };

 
    const handleDeleteUser = async () => {
        if (!selectedUser) return;

        try {
            const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            alert('Utilisateur supprimé avec succès');
            setDeleteMessage(false);
            setConfirmerBoutton(false);
            setSelectedUser(null);
            fetchUsers();
        } catch (err) {
            alert('Erreur: ' + err.message);
        }
    };

    
    const openEditModal = (user) => {
        setSelectedUser(user);
        setFormData({
            email: user.email,
            password: '',
            admin: user.admin
        });
        setShowOptions(false);
        setEditMessage(true);
    };

  
    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setShowOptions(false);
        setDeleteMessage(true);
    };

    // Pagination
    const indexOfLastUser = currentPage * usersPerPages;
    const indexOfFirstUser = (currentPage - 1) * usersPerPages;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalOfPages = Math.max(1, Math.ceil(users.length / usersPerPages));

    function nextPage() {
        if (currentPage < totalOfPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    return (
        <>
            {/* Ajouter */}
            {showAddModal && (
                <div className="absolute inset-0 bg-[#00000166] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative flex flex-col bg-white rounded-lg p-8 max-w-md w-full space-y-4">
                        <h1 className="text-xl font-bold text-center">Ajouter un utilisateur</h1>
                        
                        <button
                            className="absolute right-5 top-3 text-gray-500 hover:text-gray-700"
                            onClick={() => {
                                setShowAddModal(false);
                                setFormData({ email: '', password: '', admin: 0 });
                            }}
                        >
                            ✕
                        </button>

                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="border p-2 rounded"
                        />

                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="border p-2 rounded"
                        />

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={formData.admin === 1}
                                onChange={(e) => setFormData({ ...formData, admin: e.target.checked ? 1 : 0 })}
                            />
                            <span>Administrateur</span>
                        </label>

                        <div className="flex justify-around">
                            <button
                                onClick={handleCreateUser}
                                className="bg-[#7CA982] text-white px-6 py-2 rounded-xl hover:-translate-y-1 duration-300"
                            >
                                Créer
                            </button>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="bg-red-600 text-white px-6 py-2 rounded-xl hover:-translate-y-1 duration-300"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Options */}
            {showOptions && selectedUser && (
                <div className="absolute inset-0 bg-[#00000166] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative flex flex-col justify-evenly h-2/5 bg-white rounded-lg p-8 max-w-md w-full">
                        <div className="flex flex-col justify-between items-center space-y-5">
                            <h1 className="text-xl font-bold m-auto">Voulez-vous supprimer ou modifier l'utilisateur</h1>
                            <h2>double cliquez pour valider</h2>

                            <button
                                className="absolute right-5 top-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                                onClick={() => {
                                    setShowOptions(false);
                                    setSelectedUser(null);
                                }}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="flex justify-around items-center">
                            <button
                                type="button"
                                onClick={() => openEditModal(selectedUser)}
                                className="bg-amber-400 rounded-xl border border-[#bd68681a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12 backdrop-blur-md"
                            >
                                Editer
                            </button>
                            <button
                                type="button"
                                onClick={() => openDeleteModal(selectedUser)}
                                className="bg-red-600 rounded-xl border border-[#bd68681a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12 backdrop-blur-md"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Suppression */}
            {deleteMessage && selectedUser && (
                <div className="absolute inset-0 bg-[#00000166] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative flex flex-col justify-evenly h-2/5 bg-white rounded-lg p-8 max-w-md w-full">
                        <div className="flex flex-col justify-between items-center space-y-5">
                            <h1 className="text-xl font-bold m-auto">Supprimer l'utilisateur</h1>
                            <h2>Etes-vous sur de vouloir supprimer {selectedUser.email} ?</h2>
                            {confirmerBoutton && <h3 className="text-red-600 font-bold">Cette action est irréversible.</h3>}
                            <button
                                className="absolute right-5 top-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                                onClick={() => {
                                    setDeleteMessage(false);
                                    setConfirmerBoutton(false);
                                    setSelectedUser(null);
                                }}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="flex justify-around items-center">
                            {confirmerBoutton ? (
                                <button
                                    type="button"
                                    onClick={handleDeleteUser}
                                    className="bg-[#7CA982] rounded-xl border border-[#bd68681a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12 backdrop-blur-md"
                                >
                                    OUI
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setConfirmerBoutton(true)}
                                    className="bg-[#7CA982] rounded-xl border border-[#bd68681a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12 backdrop-blur-md"
                                >
                                    OUI
                                </button>
                            )}
                            <button
                                type="button"
                                className="bg-red-600 rounded-xl border border-[#68bd6c1a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12"
                                onClick={() => {
                                    setDeleteMessage(false);
                                    setConfirmerBoutton(false);
                                }}
                            >
                                NON
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edition */}
            {editMessage && selectedUser && (
                <div className="absolute inset-0 bg-[#00000166] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative flex flex-col bg-white rounded-lg p-8 max-w-md w-full space-y-4">
                        <h1 className="text-xl font-bold text-center">Modifier l'utilisateur</h1>

                        <button
                            className="absolute right-5 top-3 text-gray-500 hover:text-gray-700"
                            onClick={() => {
                                setEditMessage(false);
                                setConfirmerBoutton(false);
                                setFormData({ email: '', password: '', admin: 0 });
                                setSelectedUser(null);
                            }}
                        >
                            ✕
                        </button>

                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="border p-2 rounded"
                        />

                        <input
                            type="password"
                            placeholder="Nouveau mot de passe (optionnel)"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="border p-2 rounded"
                        />

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={formData.admin === 1}
                                onChange={(e) => setFormData({ ...formData, admin: e.target.checked ? 1 : 0 })}
                            />
                            <span>Administrateur</span>
                        </label>

                        {confirmerBoutton && <h3 className="text-red-600 font-bold text-center">Cette action est irréversible.</h3>}

                        <div className="flex justify-around">
                            {confirmerBoutton ? (
                                <button
                                    onClick={handleUpdateUser}
                                    className="bg-[#7CA982] text-white px-6 py-2 rounded-xl hover:-translate-y-1 duration-300"
                                >
                                    Confirmer
                                </button>
                            ) : (
                                <button
                                    onClick={() => setConfirmerBoutton(true)}
                                    className="bg-[#68bd6c] text-white px-6 py-2 rounded-xl hover:-translate-y-1 duration-300"
                                >
                                    Modifier
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    setEditMessage(false);
                                    setConfirmerBoutton(false);
                                }}
                                className="bg-red-600 text-white px-6 py-2 rounded-xl hover:-translate-y-1 duration-300"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex">
                <NavBarAdmin open={open} setOpen={setOpen} />
            </div>

            <section className={`duration-500 ${open ? 'pl-60' : 'pl-[72px]'}`}>
                <h1 className="font-spartan text-[#7CA982] font-bold text-5xl text-center underline mt-15 pb-5">
                    Gestion Utilisateur
                </h1>

                <div className="flex justify-end mx-15 mb-4">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-[#7CA982] text-white px-6 py-2 rounded-xl hover:-translate-y-1 duration-300 font-bold"
                    >
                        + Ajouter un utilisateur
                    </button>
                </div>

                {loading && <p className="text-center">Chargement...</p>}
                {error && <p className="text-center text-red-600">Erreur: {error}</p>}

                <table className="table-auto w-9/10 border-collapse border-2 border-white rounded-xl mx-15 text-white bg-[#7CA982]">
                    <thead className="rounded-xl">
                        <tr>
                            <th className="px-4 py-2 text-white font-roboto text-md text-left">ID</th>
                            <th className="px-20 py-2 text-white font-roboto text-md text-left">est Admin ?</th>
                            <th className="px-40 py-2 text-white font-roboto text-md text-left">Identifiant</th>
                            <th className="px-4 py-2 text-white font-roboto text-md text-left">Editer/Supprimer</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentUsers.length > 0 ? (
                            currentUsers.map((currentUser) => (
                                <tr key={currentUser.id} className="border-b">
                                    <td className="px-4 py-2">{currentUser.id}</td>
                                    <td className="px-20 py-2">{currentUser.admin ? 'Oui' : 'Non'}</td>
                                    <td className="px-40 py-2">{currentUser.email}</td>
                                    <td className="px-4 py-2 flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedUser(currentUser);
                                                setShowOptions(true);
                                            }}
                                            className="bg-yellow-300 text-white px-3 py-1 rounded cursor-pointer hover:opacity-70"
                                        >
                                            Editer
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedUser(currentUser);
                                                setShowOptions(true);
                                            }}
                                            className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:opacity-70"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-2 text-red-600" colSpan={4}>
                                    Aucun utilisateur à afficher.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <section className="flex justify-center p-2">
                    <button
                        type="button"
                        onClick={prevPage}
                        className="border-2 border-white bg-[#7CA982] border-solid cursor-pointer p-3 text-white font-bold rounded-xl"
                    >
                        &lt;
                    </button>

                    <p className="border-2 border-white bg-[#7CA982] border-solid p-3 text-white font-bold rounded-xl">
                        {currentPage}
                    </p>

                    <button
                        type="button"
                        onClick={nextPage}
                        className="border-2 border-white bg-[#7CA982] border-solid cursor-pointer p-3 text-white font-bold rounded-xl"
                    >
                        &gt;
                    </button>
                </section>
            </section>
        </>
    );
}

export default AdminUsers;