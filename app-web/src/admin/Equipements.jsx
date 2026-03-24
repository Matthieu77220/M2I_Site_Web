import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import NavBarAdmin from '../components/NavBarAdmin';

import axios from 'axios'

function Equipements() {

    const navigate = useNavigate()

    const[open, setOpen] = useState(true)
    const[selectedEquipment, setSelectedEquipment] = useState('ballons') // État pour gérer la sélection
    const[currentPageChasubles, setCurrentPageChasubles] = useState(1)
    const[currentPageBoots, setCurrentPageBoots] = useState(1)
    const[currentPageBalloons, setCurrentPageBallons] = useState(1)
    const[showOptions, setShowOptions] = useState(false)
    const[equipmentFormData, setEquipmentFormData] = useState({
        nom: '',
        type: 'ballon',
        quantite: '',
        id_terrain: ''
    })
    const [formMessage, setFormMessage] = useState("")
    const [terrains, setTerrains] = useState([])

    const chasublesPerPages = 10
    const ballonsPerPages = 10
    const cramponsPerPages = 10

    // ------------------------------------ //
    // ----------- API CHASUBLE ----------- //
    // ------------------------------------ //

    const [chasubles, setChasubles] = useState([])

    const fetchChasubles = () => {
        axios.get("http://localhost:3000/api/equipement/stockChasuble", { withCredentials: true })
            .then(res => {
                console.log("Chasubles récupérés:", res.data)
                setChasubles(res.data) 
            })
            .catch(err => {
                if (err.response && err.response.status == 401) {
                    navigate("/connexion")
                }
                console.error(err)
            })
    }

    // Catch : proctection des pages si status = 401
    useEffect(() => {
        fetchChasubles()
    }, [])

    const indexOfLastChasuble = currentPageChasubles * chasublesPerPages;
    const indexOfFirstChasuble = (currentPageChasubles - 1) * chasublesPerPages;

    const currentChasuble = chasubles.slice(indexOfFirstChasuble, indexOfLastChasuble);
    const totalOfPagesChasuble = Math.max(1, Math.ceil(chasubles.length / chasublesPerPages));

    function nextPageChasuble(){
        if(currentPageChasubles < totalOfPagesChasuble){
            setCurrentPageChasubles(currentPageChasubles + 1);
        }
    }

    function prevPageChasuble(){
        if(currentPageChasubles > 1){
            setCurrentPageChasubles(currentPageChasubles - 1);
        }
    }


    // ------------------------------------ //
    // ----------- API BALLON ------------- //
    // ------------------------------------ //

    const [ballons, setBallons] = useState([])

    const fetchBallons = () => {
        axios.get("http://localhost:3000/api/equipement/stockBallon", { withCredentials: true })
            .then(res => {
                console.log("Ballons récupérés:", res.data)
                setBallons(res.data) 
            })
            .catch(err => {
                if (err.response && err.response.status == 401) {
                    navigate("/connexion")
                }
                console.error(err)
            })
    }

    // Catch : proctection des pages si status = 401
    useEffect(() => {
        fetchBallons()
    }, [])

    const indexOfLastBalloon = currentPageBalloons * ballonsPerPages;
    const indexOfFirstBalloon = (currentPageBalloons- 1) * ballonsPerPages;

    const currentBalloon = ballons.slice(indexOfFirstBalloon, indexOfLastBalloon);
    const totalOfPagesBalloon = Math.max(1, Math.ceil(ballons.length / ballonsPerPages));

    function nextPageBallon(){
        if(currentPageBalloons < totalOfPagesBalloon){
            setCurrentPageBallons(currentPageBalloons + 1);
        }
    }

    function prevPageBalloon(){
        if(currentPageBalloons > 1){
            setCurrentPageBallons(currentPageBalloons - 1);
        }
    }

    
    // ------------------------------------ //
    // ----------- API CRAMPON ------------ //
    // ------------------------------------ //

    const [crampons, setCrampons] = useState([])

    const fetchCrampons = () => {
        axios.get("http://localhost:3000/api/equipement/stockCrampon", { withCredentials: true })
            .then(res => {
                console.log("Crampons récupérés:", res.data)
                setCrampons(res.data) 
            })
            .catch(err => {
                if (err.response && err.response.status == 401) {
                    navigate("/connexion")
                }
                console.error(err)
            })
    }

    // Catch : proctection des pages si status = 401
    useEffect(() => {
        fetchCrampons()
    }, [])

    //
    useEffect(() => {
            // Appel API pour récupérer la liste des terrains
        axios.get("http://localhost:3000/api/admin/voirTerrain", { withCredentials: true })
            .then(res => setTerrains(res.data || []))
            .catch(err => {
                //
                if (err.response && err.response.status == 401)  {
                    navigate("/connexion")
                }
                console.error(err)
            })
    }, [])

    const indexOfLastBoots = currentPageBoots* cramponsPerPages;
    const indexOfFirstBoots = (currentPageBoots- 1) * cramponsPerPages;

    const currentBoot = crampons.slice(indexOfFirstBoots, indexOfLastBoots);
    const totalOfPagesBoots = Math.max(1, Math.ceil(crampons.length / cramponsPerPages));

    function nextPageBoot(){
        if(currentPageBoots < totalOfPagesBoots){
            setCurrentPageBoots(currentPageBoots + 1);
        }
    }

    function prevPageBoot(){
        if(currentPageBoots > 1){
            setCurrentPageBoots(currentPageBoots - 1);
        }
    }

    // Fonction pour gérer le changement de sélection
    const handleEquipmentChange = (e) => {
        setSelectedEquipment(e.target.value);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEquipmentFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitEquipment = (e) => {
        e.preventDefault() // Empêche le rechargement de la page au submit
        setFormMessage("") // Réinitialise le message du formulaire
    
        const quantite = Number(equipmentFormData.quantite)
        const idTerrain = Number(equipmentFormData.id_terrain)
    
        // Vérification de la quantité
        if (!Number.isFinite(quantite) || quantite <= 0) {
            setFormMessage("Quantité invalide.")
            return
        }
    
        // Vérification de l'ID du terrain
        if (!Number.isInteger(idTerrain) || idTerrain <= 0) {
            setFormMessage("Sélectionnez un terrain.")
            return
        }
    
        // Envoi de la requête POST pour ajouter l'équipement
        axios.post(
            "http://localhost:3000/api/equipement",
            { type: equipmentFormData.type, quantite, id_terrain: idTerrain },
            { withCredentials: true }
        )
            .then(() => {
                setFormMessage("Équipement ajouté.") // Message succès
                // Réinitialise le formulaire
                setEquipmentFormData(prev => ({ ...prev, nom: "", quantite: "", id_terrain: "" }))
                // Rafraîchit les listes d'équipements
                fetchChasubles()
                fetchBallons()
                fetchCrampons()
            })
            .catch((err) => {
                // Si non authentifié, redirige vers la page de connexion
                if (err.response && err.response.status == 401) {
                    navigate("/connexion")
                    return
                }
                // Affiche le message d'erreur
                setFormMessage(err.response?.data?.message || "Erreur lors de l'ajout.")
            })
    }

    const deleteEquipement = (id) => {
        console.log("Tentative de suppression de l'équipement ID:", id)
        if (!window.confirm("Voulez-vous vraiment supprimer cet équipement ?")) return

        axios.delete(`http://localhost:3000/api/equipement/${id}`, { withCredentials: true })
            .then((response) => {
                console.log("Suppression réussie:", response.data)
                setFormMessage("Équipement supprimé.")
                fetchChasubles()
                fetchBallons()
                fetchCrampons()
            })
            .catch((err) => {
                console.error("Erreur lors de la suppression:", err.response?.data || err)
                if (err.response && err.response.status == 401) {
                    navigate("/connexion")
                    return
                }
                setFormMessage(err.response?.data?.message || "Erreur lors de la suppression.")
            })
    }

    // Fonction pour déterminer l'état du stock
    const getStockStatus = (stockCurrent, stockBase) => {
        const percentage = (stockCurrent / stockBase) * 100;
        
        if (percentage === 100) {
            return { text: "Complet", color: "text-green-600 font-bold" };
        } else if (percentage > 75) {
            return { text: "Bon", color: "text-green-500 font-semibold" };
        } else if (percentage >= 50) {
            return { text: "Moyen", color: "text-yellow-500 font-semibold" };
        } else if (percentage >= 25) {
            return { text: "Faible", color: "text-orange-500 font-semibold" };
        } else if (percentage > 0) {
            return { text: "Critique", color: "text-red-500 font-bold" };
        } else {
            return { text: "Rupture", color: "text-red-700 font-bold" };
        }
    }
    
    
    return(
    <>
        <div className='flex'>
            <NavBarAdmin open={open} setOpen={setOpen} />
        </div>

        <section className= {`duration-500 ${open ? "pl-60" : "pl-[72px]"}`}>
            <h1 className="text-center text-[#7CA982] text-2xl font-extrabold underline">Equipements</h1>

            <section className="flex border-2 bg-[#7CA982] border-white rounded-xl justify-center text-center w-[50vw] mx-[15vw] my-[5vh] p-4 text-xl text-white font-semibold">
                <label>Sélectionner l'équipement qui vous intéresse: </label>
                <select 
                    name="menu" 
                    className="bg-[#7CA982] mx-2"
                    value={selectedEquipment}
                    onChange={handleEquipmentChange}
                >
                    <option value="ballons">Ballons</option>
                    <option value="crampons">Crampons</option>
                    <option value="chasubles">Chasubles</option>
                </select>
            </section>

            <form
                onSubmit={handleSubmitEquipment}
                className="flex flex-wrap items-center gap-3 border-2 bg-[#7CA982] border-white rounded-xl w-[70vw] mx-[5vw] my-[2vh] p-4 text-white"
            >
{/*Sélectionner un équipement*/}

                <select
                    name="type"
                    value={equipmentFormData.type}
                    onChange={handleInputChange}
                    className="bg-white text-black px-3 py-2 rounded-md"
                >
                    <option value="ballon">ballon</option>
                    <option value="chasuble">chasuble</option>
                    <option value="crampon">crampon</option>
                </select>
                <input
                    type="number"
                    min="1"
                    name="quantite"
                    value={equipmentFormData.quantite}
                    onChange={handleInputChange}
                    placeholder="Quantité"
                    className="bg-white text-black px-3 py-2 rounded-md"
                />
                <select
                    name="id_terrain"
                    value={equipmentFormData.id_terrain}
                    onChange={handleInputChange}
                    className="bg-white text-black px-3 py-2 rounded-md"
                >
                    <option value="">Choisir un terrain</option>
                    {terrains.map((terrain) => (
                        <option key={terrain.id_terrain} value={terrain.id_terrain}>
                            Terrain {terrain.id_terrain} - {terrain.adresse}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="border-2 border-white px-4 py-2 rounded-md font-bold"
                >
                    Ajouter
                </button>
                {formMessage && <p className="font-semibold">{formMessage}</p>}
            </form>

            <table className="table-auto w-9/10 border-collapse border-2 border-white rounded-xl mx-15 text-white bg-[#7cca98]">
                <thead className="rounded-xl"> 
                    <tr>
                        <th className="px-4 py-2 text-white font-roboto text-md text-left">ID</th>
                        <th className="px-20 py-2 text-white font-roboto text-md text-left">Stock d'origine</th>
                        <th className="px-40 py-2 text-white font-roboto text-md text-left">Stock actuel</th>
                        <th className="px-4 py-2 text-white font-roboto text-md text-left">État du stock</th>
                        <th className="px-4 py-2 text-white font-roboto text-md text-left">Actions</th>
                    </tr>
                </thead>
    
                <tbody> 
                    {selectedEquipment === 'ballons' && currentBalloon.length > 0 ? (
                        currentBalloon.map((item, index) => {
                            const stockStatus = getStockStatus(item.stock_current, item.stock_base);
                            return (
                                <tr key={index} className="border-b">
                                    <td className="px-4 py-2">{item.id_equipement || item.id_ballon}</td>
                                    <td className="px-20 py-2">{item.stock_base}</td>
                                    <td className="px-40 py-2">{item.stock_current}</td>
                                    <td className={`px-4 py-2 ${stockStatus.color}`}>
                                        {stockStatus.text}
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            type="button"
                                            className="bg-red-600  text-white px-2 py-1 rounded"
                                            onClick={() => {
                                                console.log("Bouton cliqué pour item:", item)
                                                deleteEquipement(item.id_equipement || item.id_ballon)
                                            }}
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : selectedEquipment === 'chasubles' && currentChasuble.length > 0 ? (
                        currentChasuble.map((item, index) => {
                            const stockStatus = getStockStatus(item.stock_current, item.stock_base);
                            return (
                                <tr key={index} className="border-b">
                                    <td className="px-4 py-2">{item.id_equipement || item.id_chasuble}</td>
                                    <td className="px-20 py-2">{item.stock_base}</td>
                                    <td className="px-40 py-2">{item.stock_current}</td>
                                    <td className={`px-4 py-2 ${stockStatus.color}`}>
                                        {stockStatus.text}
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            type="button"
                                            className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                                            onClick={() => {
                                                console.log("Bouton cliqué pour item:", item)
                                                deleteEquipement(item.id_equipement || item.id_chasuble)
                                            }}
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : selectedEquipment === 'crampons' && currentBoot.length > 0 ? (
                        currentBoot.map((item, index) => {
                            const stockStatus = getStockStatus(item.stock_current, item.stock_base);
                            return (
                                <tr key={index} className="border-b">
                                    <td className="px-4 py-2">{item.id_equipement || item.id_crampon}</td>
                                    <td className="px-20 py-2">{item.stock_base}</td>
                                    <td className="px-40 py-2">{item.stock_current}</td>
                                    <td className={`px-4 py-2 ${stockStatus.color}`}>
                                        {stockStatus.text}
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            type="button"
                                            className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                                            onClick={() => {
                                                console.log("Bouton cliqué pour item:", item)
                                                deleteEquipement(item.id_equipement || item.id_crampon)
                                            }}
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td className="px-4 py-2 text-red-600" colSpan={4}>
                                Rien à afficher
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <section className="flex justify-center p-2">
                {selectedEquipment === 'ballons' && (
                    <>
                        <button 
                            type="button"
                            onClick={prevPageBalloon}
                            className="border-2 border-white bg-[#7CA982] border-solid cursor-pointer p-3 text-white font-bold rounded-xl"
                        >
                            &lt;
                        </button>
                        <p className="border-2 border-white bg-[#7CA982] border-solid p-3 text-white font-bold rounded-xl">{currentPageBalloons}</p>
                        <button 
                            type="button"
                            onClick={nextPageBallon} 
                            className="border-2 border-white bg-[#7CA982] border-solid cursor-pointer p-3 text-white font-bold rounded-xl"
                        >
                            &gt;
                        </button>
                    </>
                )}
                {selectedEquipment === 'chasubles' && (
                    <>
                        <button 
                            type="button"
                            onClick={prevPageChasuble}
                            className="border-2 border-white bg-[#7CA982] border-solid cursor-pointer p-3 text-white font-bold rounded-xl"
                        >
                            &lt;
                        </button>
                        <p className="border-2 border-white bg-[#7CA982] border-solid p-3 text-white font-bold rounded-xl">{currentPageChasubles}</p>
                        <button 
                            type="button"
                            onClick={nextPageChasuble} 
                            className="border-2 border-white bg-[#7CA982] border-solid cursor-pointer p-3 text-white font-bold rounded-xl"
                        >
                            &gt;
                        </button>
                    </>
                )}
                {selectedEquipment === 'crampons' && (
                    <>
                        <button 
                            type="button"
                            onClick={prevPageBoot}
                            className="border-2 border-white bg-[#7CA982] border-solid cursor-pointer p-3 text-white font-bold rounded-xl"
                        >
                            &lt;
                        </button>
                        <p className="border-2 border-white bg-[#7CA982] border-solid p-3 text-white font-bold rounded-xl">{currentPageBoots}</p>
                        <button 
                            type="button"
                            onClick={nextPageBoot} 
                            className="border-2 border-white bg-[#7CA982] border-solid cursor-pointer p-3 text-white font-bold rounded-xl"
                        >
                            &gt;
                        </button>
                    </>
                )}
            </section>
        </section>
    </>
    );
}

export default Equipements;