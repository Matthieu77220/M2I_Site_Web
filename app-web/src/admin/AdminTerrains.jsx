import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import NavBarAdmin from '../components/NavBarAdmin';

import axios from 'axios'

function AdminTerrains() {

    const navigate = useNavigate()

    const [open, setOpen] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [editData, setEditData] = useState(null);
    const [id_terrain, setId_terrain] = useState(null);
    const [showCreateTerrainModal, setShowCreateTerrainModal] = useState(false);
    const [showEditTerrainModal, setShowEditTerrainModal] = useState(false)
    const [terrainFormData, setTerrainFormData] = useState({
        adresse: ''
    });

    const pitchsPerPages = 15;

    // ------------------------------------ //
    // ----------- API Voir Terrain ------------ //
    // ------------------------------------ //

    const [pitchs, setPitchs] = useState([])

    // Catch : proctection des pages si status = 401
    useEffect(() => {
        axios.get("/api/admin/voirTerrain", { withCredentials: true })
            .then(res => setPitchs(res.data))
            .catch(err => {
                if (err.response && err.response.status == 401) {
                    navigate("/connexion")
                }
                console.error(err)
            })
    }, [])


    // ------------------------------------ //
    // --------- API Supprimer ------------ //
    // ------------------------------------ //

    const handleDeleteTerrain = async (id) => {
        if (!window.confirm("Voulez-vous vraiment supprimer ce terrain ?")) return;

        try {
            await axios.delete(
                "/api/admin/supprimerTerrain",
                {
                    withCredentials: true,
                    data: { id_terrain: id }
                }
            );

            setPitchs(prev => prev.filter(p => p.id_terrain !== id));
            alert("Terrain supprimé avec succès");
        } catch (err) {
            if (err.response?.status === 401) navigate("/connexion");
            console.error(err);
        }
    };


    const indexOfLastPitch = currentPage * pitchsPerPages;
    const indexOfFirstPitch = (currentPage - 1) * pitchsPerPages;

    const currentPitchs = pitchs.slice(indexOfFirstPitch, indexOfLastPitch);
    const totalOfPages = Math.max(1, Math.ceil(pitchs.length / pitchsPerPages));

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTerrainFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // ------------------------------------ //
    // ------ API AJouter Terrain -------- //
    // ------------------------------------ //

    const handleCreateTerrain = async (e) => {
        e.preventDefault();
        console.log('Terrain à créer:', terrainFormData);

        setShowCreateTerrainModal(false);
        setTerrainFormData({
            adresse: ''
        });

        try {
            await axios.post("/api/admin/ajouterTerrain",
                terrainFormData,
                { withCredentials: true, }
            )
                .then(res => setPitchs(res.data))
        } catch (err) {
            console.log(err);
            // Ajouter des useState pour afficher au front les erreurs
        }
    };

    // ------------------------------------ //
    // ------- API Edit Terrain ----------- //
    // ------------------------------------ //

    const handleEditTerrain = async (e) => {
        e.preventDefault();

        setShowEditTerrainModal(false);
        setTerrainFormData({
            adresse: ''
        });

        console.log(pitchs.id_terrain);
        console.log(pitchs);



        try {
            await axios.put("/api/admin/modifierTerrain",
                { id_terrain: id_terrain, adresse: terrainFormData.adresse },
                { withCredentials: true }
            )
            window.location.reload()
        } catch (err) {
            console.log(err);
            // Ajouter des useState pour afficher au front les erreurs
        }
    };



    return (
        <>

            <div className='flex'>
                <NavBarAdmin open={open} setOpen={setOpen} /> {/* Passe en props les éléments du UseStat (open,setOpen) */}
            </div>

            <section className={`duration-500 ${open ? "pl-60" : "pl-18"}`}>
                <h1 className="font-spartan text-[#7CA982] font-bold text-5xl text-center underline mt-15 pb-5">Gestion Terrains</h1>

                <div className="flex justify-end mx-22 pb-5">
                    <button
                        type="button"
                        onClick={() => setShowCreateTerrainModal(true)}
                        className="bg-[#7CA982] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#6a9470] transition-all"
                    >
                        + Ajouter un terrain
                    </button>
                </div>

                <table className="table-auto w-9/10 border-collapse border-2 border-white rounded-xl bg-[#7CA982] mx-15 text-white">
                    <thead className="rounded-xl font-xl">
                        <tr>
                            <th className="text-white font-roboto text-md px-4 py-2 text-left">ID</th>
                            <th className="text-white font-roboto text-md px-50 py-2 text-left">Adresse Terrain</th>
                            <th className="text-white font-roboto text-md px-4 py-2 text-left">Editer/Supprimer</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentPitchs.length > 0 ? (
                            currentPitchs.map((pitch, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-4 py-2">{pitch.id_terrain}</td>
                                    <td className="px-50 py-2">{pitch.adresse}</td>
                                    <td className="px-4 py-2 flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditData(pitch);
                                                setTerrainFormData({
                                                    adresse: pitch.adresse
                                                });
                                                setShowEditTerrainModal(true);
                                                setId_terrain(pitch.id_terrain)


                                            }}
                                            className="bg-yellow-300 text-white px-3 py-1 rounded cursor-pointer hover:opacity-70"
                                        >
                                            Editer
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteTerrain(pitch.id_terrain)}
                                            className=" bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:opacity-70"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-2 text-red-600" colSpan={3}>
                                    Aucun terrains à afficher.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <section className="flex justify-center p-2">
                    <button
                        type="button"
                        onClick={() => { prevPage() }}
                        className="border-2 border-white bg-[#7CA982] border-solid cursor-pointer p-3 text-white font-bold rounded-xl"
                    >
                        &lt;
                    </button>

                    <p className="border-2 border-white bg-[#7CA982] border-solid cursor-pointer p-3 text-white font-bold rounded-xl">{currentPage}</p>

                    <button
                        type="button"
                        onClick={() => { nextPage() }}
                        className="border-2 border-white bg-[#7CA982] border-solid cursor-pointer p-3 text-white font-bold rounded-xl"
                    >
                        &gt;
                    </button>

                </section>

            </section>

            {/* Modale de Edit de terrain */}
            {showEditTerrainModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold text-[#7CA982] mb-4">Modifier un Terrain</h2>

                        <form onSubmit={handleEditTerrain} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">
                                    Adresse
                                </label>
                                <input
                                    type="text"
                                    name="adresse"
                                    value={terrainFormData.adresse}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7CA982]"
                                    placeholder="Ex: 34 cours du Danube SERRIS"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#7CA982] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#6a9470] transition-all"
                                >
                                    Modifier
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditTerrainModal(false)
                                        setTerrainFormData({
                                            adresse: ''
                                        });
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

            {/* Modale de création de terrain */}
            {showCreateTerrainModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold text-[#7CA982] mb-4">Créer un nouveau Terrain</h2>

                        <form onSubmit={handleCreateTerrain} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">
                                    Adresse
                                </label>
                                <input
                                    type="text"
                                    name="adresse"
                                    value={terrainFormData.adresse}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7CA982]"
                                    placeholder="Ex: 34 cours du Danube SERRIS"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#7CA982] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#6a9470] transition-all"
                                >
                                    Créer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCreateTerrainModal(false);
                                        setTerrainFormData({
                                            adresse: ''
                                        });
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

export default AdminTerrains;