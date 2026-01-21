import { useState, useEffect } from 'react';
import axios from 'axios';
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
        role: 'utilisateur',
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        date_naissance: '',
        mot_de_passe: '',
        montant_cotisation: '',
        debut_adhesion: '',
        fin_adhesion: '',
        type_abonnement: ''
    });

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios
            .get("http://localhost:3000/api/admin/getAllUsers", { withCredentials: true })
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    navigate("/connexion");
                } else {
                    setError("Erreur lors du chargement des utilisateurs12345");
                }
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleCreateUser = () => {
        if (
            !formData.email ||
            !formData.mot_de_passe ||
            !formData.prenom ||
            !formData.nom ||
            !formData.telephone ||
            !formData.date_naissance
        ) {
            alert("Tous les champs obligatoires doivent être remplis");
            return;
        }

        axios.post("http://localhost:3000/api/admin/createUser", formData, { withCredentials: true } )
            .then(() => {
                alert("Adhérent créé avec succès");
                setShowAddModal(false);
                resetForm();
                window.location.reload()
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    navigate("/connexion");
                } else {
                    alert("Erreur lors de la création de l’adhérent");
                }
                console.error(err);
            });
    };

    const handleUpdateUser = () => {
        if (!selectedUser) return;

        const payload = { ...formData };
        if (!payload.mot_de_passe) {
            delete payload.mot_de_passe; // ne pas écraser le mot de passe si non modifié
        }

        axios
            .put(`http://localhost:3000/api/admin/updateUser/${selectedUser.id}`, payload, { withCredentials: true })
            .then(() => {
                alert("Adhérent modifié avec succès");
                setEditMessage(false);
                setConfirmerBoutton(false);
                resetForm();
                setSelectedUser(null);
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    navigate("/connexion");
                } else {
                    alert("Erreur lors de la modification de l’adhérent");
                }
                console.error(err);
            });
    };


    const handleDeleteUser = () => {
    console.log('selectedUser:', selectedUser);     
    if (!selectedUser) return;

    console.log('ID à supprimer:', selectedUser.id);

    axios
        .delete(`http://localhost:3000/api/admin/deleteUser/${selectedUser.id}`, { withCredentials: true })
        .then(() => {
            alert("Adhérent supprimé avec succès");
            setDeleteMessage(false);
            setConfirmerBoutton(false);
            setSelectedUser(null);
            window.location.reload();
        })
        .catch(err => {
            console.error('Erreur complète:', err); 
            if (err.response?.status === 401) {
                window.location.href = "/connexion";
            } else {
                alert("Erreur lors de la suppression de l'adhérent");
            }
        });
};


    const openEditModal = (user) => {
        setSelectedUser(user);
        setFormData({
            role: user.role,
            prenom: user.prenom,
            nom: user.nom,
            email: user.email,
            telephone: user.telephone,
            date_naissance: user.date_naissance ? user.date_naissance.split('T')[0] : '',
            mot_de_passe: '',
            montant_cotisation: user.montant_cotisation || '',
            debut_adhesion: user.debut_adhesion ? user.debut_adhesion.split('T')[0] : '',
            fin_adhesion: user.fin_adhesion ? user.fin_adhesion.split('T')[0] : '',
            type_abonnement: user.type_abonnement || ''
        });
        setShowOptions(false);
        setEditMessage(true);
    };

    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setShowOptions(false);
        setDeleteMessage(true);
    };

    const resetForm = () => {
        setFormData({
            role: 'utilisateur',
            prenom: '',
            nom: '',
            email: '',
            telephone: '',
            date_naissance: '',
            mot_de_passe: '',
            montant_cotisation: '',
            debut_adhesion: '',
            fin_adhesion: '',
            type_abonnement: ''
        });
    };

    // Pagination
    const usersPerPages = 15
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
            {/* Modal Ajout */}
            {showAddModal && (
                <div className="absolute inset-0 bg-[#00000166] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative flex flex-col bg-white rounded-lg p-8 max-w-2xl w-full space-y-4 max-h-[90vh] overflow-y-auto">
                        <h1 className="text-xl font-bold text-center">Ajouter un adhérent</h1>

                        <button
                            className="absolute right-5 top-3 text-gray-500 hover:text-gray-700"
                            onClick={() => {
                                setShowAddModal(false);
                                resetForm();
                            }}
                        >
                            ✕
                        </button>

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Prénom *"
                                value={formData.prenom}
                                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="text"
                                placeholder="Nom *"
                                value={formData.nom}
                                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="email"
                                placeholder="Email *"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="tel"
                                placeholder="Téléphone *"
                                value={formData.telephone}
                                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="date"
                                placeholder="Date de naissance *"
                                value={formData.date_naissance}
                                onChange={(e) => setFormData({ ...formData, date_naissance: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="password"
                                placeholder="Mot de passe *"
                                value={formData.mot_de_passe}
                                onChange={(e) => setFormData({ ...formData, mot_de_passe: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="border p-2 rounded"
                            >
                                <option value="utilisateur">Utilisateur</option>
                            </select>

                            <input
                                type="text"
                                placeholder="Type d'abonnement"
                                value={formData.type_abonnement}
                                onChange={(e) => setFormData({ ...formData, type_abonnement: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="number"
                                placeholder="Montant cotisation"
                                value={formData.montant_cotisation}
                                onChange={(e) => setFormData({ ...formData, montant_cotisation: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="date"
                                placeholder="Début adhésion"
                                value={formData.debut_adhesion}
                                onChange={(e) => setFormData({ ...formData, debut_adhesion: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="date"
                                placeholder="Fin adhésion"
                                value={formData.fin_adhesion}
                                onChange={(e) => setFormData({ ...formData, fin_adhesion: e.target.value })}
                                className="border p-2 rounded"
                            />
                        </div>

                        <div className="flex justify-around mt-4">
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

            {/* Modal Options */}
            {showOptions && selectedUser && (
                <div className="absolute inset-0 bg-[#00000166] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative flex flex-col justify-evenly h-2/5 bg-white rounded-lg p-8 max-w-md w-full">
                        <div className="flex flex-col justify-between items-center space-y-5">
                            <h1 className="text-xl font-bold m-auto">Voulez-vous supprimer ou modifier l'adhérent</h1>
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

            {/* Modal Suppression */}
            {deleteMessage && selectedUser && (
                <div className="absolute inset-0 bg-[#00000166] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative flex flex-col justify-evenly h-2/5 bg-white rounded-lg p-8 max-w-md w-full">
                        <div className="flex flex-col justify-between items-center space-y-5">
                            <h1 className="text-xl font-bold m-auto">Supprimer l'adhérent</h1>
                            <h2>Êtes-vous sûr de vouloir supprimer {selectedUser.prenom} {selectedUser.nom} ?</h2>
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

            {/* Modal Edition */}
            {editMessage && selectedUser && (
                <div className="absolute inset-0 bg-[#00000166] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative flex flex-col bg-white rounded-lg p-8 max-w-2xl w-full space-y-4 max-h-[90vh] overflow-y-auto">
                        <h1 className="text-xl font-bold text-center">Modifier l'adhérent</h1>

                        <button
                            className="absolute right-5 top-3 text-gray-500 hover:text-gray-700"
                            onClick={() => {
                                setEditMessage(false);
                                setConfirmerBoutton(false);
                                resetForm();
                                setSelectedUser(null);
                            }}
                        >
                            ✕
                        </button>

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Prénom"
                                value={formData.prenom}
                                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="text"
                                placeholder="Nom"
                                value={formData.nom}
                                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="tel"
                                placeholder="Téléphone"
                                value={formData.telephone}
                                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="date"
                                placeholder="Date de naissance"
                                value={formData.date_naissance}
                                onChange={(e) => setFormData({ ...formData, date_naissance: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="password"
                                placeholder="Nouveau mot de passe (optionnel)"
                                value={formData.mot_de_passe}
                                onChange={(e) => setFormData({ ...formData, mot_de_passe: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="border p-2 rounded"
                            >
                                <option value="utilisateur">Utilisateur</option>
                                <option value="admin">Admin</option>
                                <option value="superadmin">Super Admin</option>
                            </select>

                            <input
                                type="text"
                                placeholder="Type d'abonnement"
                                value={formData.type_abonnement}
                                onChange={(e) => setFormData({ ...formData, type_abonnement: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="number"
                                placeholder="Montant cotisation"
                                value={formData.montant_cotisation}
                                onChange={(e) => setFormData({ ...formData, montant_cotisation: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="date"
                                placeholder="Début adhésion"
                                value={formData.debut_adhesion}
                                onChange={(e) => setFormData({ ...formData, debut_adhesion: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="date"
                                placeholder="Fin adhésion"
                                value={formData.fin_adhesion}
                                onChange={(e) => setFormData({ ...formData, fin_adhesion: e.target.value })}
                                className="border p-2 rounded"
                            />
                        </div>

                        {confirmerBoutton && <h3 className="text-red-600 font-bold text-center">Cette action est irréversible.</h3>}

                        <div className="flex justify-around mt-4">
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
                    Gestion Adhérents
                </h1>

                <div className="flex justify-end mx-15 mb-4">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-[#7CA982] text-white px-6 py-2 rounded-xl hover:-translate-y-1 duration-300 font-bold"
                    >
                        + Ajouter un adhérent
                    </button>
                </div>

                {loading && <p className="text-center">Chargement...</p>}
                {error && <p className="text-center text-red-600">Erreur: {error}</p>}

                <table className="table-auto w-9/10 border-collapse border-2 border-white rounded-xl mx-15 text-white bg-[#7CA982]">
                    <thead className="rounded-xl">
                        <tr>
                            <th className="px-4 py-2 text-white font-roboto text-md text-left">ID</th>
                            <th className="px-4 py-2 text-white font-roboto text-md text-left">Rôle</th>
                            <th className="px-4 py-2 text-white font-roboto text-md text-left">Prénom</th>
                            <th className="px-4 py-2 text-white font-roboto text-md text-left">Nom</th>
                            <th className="px-4 py-2 text-white font-roboto text-md text-left">Email</th>
                            <th className="px-4 py-2 text-white font-roboto text-md text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentUsers.length > 0 ? (
                            currentUsers.map((currentUser) => (
                                <tr key={currentUser.id} className="border-b">
                                    <td className="px-4 py-2">{currentUser.id}</td>
                                    <td className="px-4 py-2">{currentUser.role}</td>
                                    <td className="px-4 py-2">{currentUser.prenom}</td>
                                    <td className="px-4 py-2">{currentUser.nom}</td>
                                    <td className="px-4 py-2">{currentUser.email}</td>
                                    <td className="px-4 py-2 flex gap-3">
                                        {currentUser.role === 'utilisateur' ? (
                                            <>
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
                                            </>
                                        ) : (
                                            <span className="text-xs italic text-white/80">
                                                Gestion réservée aux utilisateurs simples
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-2 text-red-600" colSpan={6}>
                                    Aucun adhérent à afficher.
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