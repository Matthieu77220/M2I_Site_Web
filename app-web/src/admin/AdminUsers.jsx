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
        loadUsers();
    }, []);

    const loadUsers = () => {
        setLoading(true);
        setError(null);

        axios
            .get("http://localhost:3000/api/admin/getAllUsers", { withCredentials: true })
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    window.location.href = "/connexion";
                } else {
                    setError("Erreur lors du chargement des utilisateurs");
                }
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

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
                loadUsers(); // Recharger la liste au lieu de reload
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    window.location.href = "/connexion";
                } else {
                    alert("Erreur lors de la création de l'adhérent");
                }
                console.error(err);
            });
    };

    const handleUpdateUser = () => {
        if (!selectedUser) return;

        const payload = { ...formData };
        if (!payload.mot_de_passe) {
            delete payload.mot_de_passe;
        }

        axios
            .put(`http://localhost:3000/api/admin/updateUser/${selectedUser.id}`, payload, { withCredentials: true })
            .then(() => {
                alert("Adhérent modifié avec succès");
                setEditMessage(false);
                setConfirmerBoutton(false);
                resetForm();
                setSelectedUser(null);
                loadUsers(); // Recharger la liste
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    window.location.href = "/connexion";
                } else {
                    alert("Erreur lors de la modification de l'adhérent");
                }
                console.error(err);
            });
    };


    const handleDeleteUser = () => {
        if (!selectedUser) return;

        axios
            .delete(`http://localhost:3000/api/admin/deleteUser/${selectedUser.id}`, { withCredentials: true })
            .then(() => {
                alert("Adhérent supprimé avec succès");
                setDeleteMessage(false);
                setConfirmerBoutton(false);
                setSelectedUser(null);
                loadUsers(); // Recharger la liste
            })
            .catch(err => {
                console.error('Erreur complète:', err);
                if (err.response?.status === 401) {
                    window.location.href = "/connexion";
                } else {
                    alert("Erreur lors de la suppression de l'adhérent: " + (err.response?.data?.message || err.message));
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
        setEditMessage(true);
        setShowOptions(false);
    };

    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setDeleteMessage(true);
        setShowOptions(false);
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

    const nextPage = () => {
        if (currentPage < Math.ceil(users.length / usersPerPages)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            {showOptions && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-80">
                        <h3 className="text-center font-bold text-xl mb-4">
                            Options pour {selectedUser?.prenom} {selectedUser?.nom}
                        </h3>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => {
                                    openEditModal(selectedUser);
                                }}
                                className="bg-yellow-300 text-white px-4 py-2 rounded hover:opacity-70"
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => {
                                    openDeleteModal(selectedUser);
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:opacity-70"
                            >
                                Supprimer
                            </button>
                            <button
                                onClick={() => {
                                    setShowOptions(false);
                                    setSelectedUser(null);
                                }}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:opacity-70"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Suppression */}
            {deleteMessage && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                        <h3 className="text-center font-bold text-xl mb-4">
                            Supprimer l'adhérent
                        </h3>
                        <p className="text-center mb-4">
                            Êtes-vous sûr de vouloir supprimer <span className="font-bold">{selectedUser?.prenom} {selectedUser?.nom}</span> ?
                        </p>
                        <p className="text-red-600 font-bold text-center mb-4">
                            Cette action est irréversible !
                        </p>
                        <div className="flex justify-around">
                            <button
                                onClick={handleDeleteUser}
                                className="bg-red-600 text-white px-6 py-2 rounded-xl hover:-translate-y-1 duration-300"
                            >
                                Confirmer la suppression
                            </button>
                            <button
                                onClick={() => {
                                    setDeleteMessage(false);
                                    setSelectedUser(null);
                                }}
                                className="bg-gray-500 text-white px-6 py-2 rounded-xl hover:-translate-y-1 duration-300"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Ajout */}
            {showAddModal && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-[500px] max-h-[90vh] overflow-y-auto">
                        <h3 className="text-center font-bold text-2xl mb-4">Ajouter un adhérent</h3>

                        <div className="grid grid-cols-1 gap-4">
                            <input
                                type="text"
                                placeholder="Prénom*"
                                value={formData.prenom}
                                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="text"
                                placeholder="Nom*"
                                value={formData.nom}
                                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="email"
                                placeholder="Email*"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="text"
                                placeholder="Téléphone*"
                                value={formData.telephone}
                                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="date"
                                placeholder="Date de naissance*"
                                value={formData.date_naissance}
                                onChange={(e) => setFormData({ ...formData, date_naissance: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="password"
                                placeholder="Mot de passe* (min 12 caractères)"
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
                                onClick={() => {
                                    setShowAddModal(false);
                                    resetForm();
                                }}
                                className="bg-red-600 text-white px-6 py-2 rounded-xl hover:-translate-y-1 duration-300"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Modification */}
            {editMessage && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-[500px] max-h-[90vh] overflow-y-auto">
                        <h3 className="text-center font-bold text-2xl mb-4">
                            Modifier l'adhérent
                        </h3>

                        <div className="grid grid-cols-1 gap-4">
                            <input
                                type="text"
                                placeholder="Prénom*"
                                value={formData.prenom}
                                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="text"
                                placeholder="Nom*"
                                value={formData.nom}
                                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="email"
                                placeholder="Email*"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="text"
                                placeholder="Téléphone*"
                                value={formData.telephone}
                                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="date"
                                placeholder="Date de naissance*"
                                value={formData.date_naissance}
                                onChange={(e) => setFormData({ ...formData, date_naissance: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                type="password"
                                placeholder="Nouveau mot de passe (laisser vide pour ne pas changer)"
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

                        {confirmerBoutton && <h3 className="text-red-600 font-bold text-center mt-4">Cette action est irréversible.</h3>}

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
                                    setSelectedUser(null);
                                    resetForm();
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
                                    <td className="px-4 py-2">
                                        {currentUser.role === 'utilisateur' ? (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedUser(currentUser);
                                                    setShowOptions(true);
                                                }}
                                                className="bg-white text-[#7CA982] px-3 py-1 rounded cursor-pointer hover:opacity-70"
                                            >
                                                Actions
                                            </button>
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

                <section className="flex justify-center p-2 gap-2">
                    <button
                        type="button"
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="border-2 border-white bg-[#7CA982] border-solid cursor-pointer p-3 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        &lt;
                    </button>

                    <p className="border-2 border-white bg-[#7CA982] border-solid p-3 text-white font-bold rounded-xl">
                        {currentPage} / {Math.ceil(users.length / usersPerPages)}
                    </p>

                    <button
                        type="button"
                        onClick={nextPage}
                        disabled={currentPage >= Math.ceil(users.length / usersPerPages)}
                        className="border-2 border-white bg-[#7CA982] border-solid cursor-pointer p-3 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        &gt;
                    </button>
                </section>
            </section>
        </>
    );
}

export default AdminUsers;