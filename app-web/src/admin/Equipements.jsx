import {useState} from 'react';
import NavBarAdmin from '../components/NavBarAdmin';

function Equipements() {

    const[open, setOpen] = useState(true)
    const[selectedEquipment, setSelectedEquipment] = useState('ballons') // État pour gérer la sélection
    const[currentPageChasubles, setCurrentPageChasubles] = useState(1)
    const[currentPageBoots, setCurrentPageBoots] = useState(1)
    const[currentPageBalloons, setCurrentPageBallons] = useState(1)
    const[showOptions, setShowOptions] = useState(false)
    const[showCreateModal, setShowCreateModal] = useState(false)
    const[equipmentFormData, setEquipmentFormData] = useState({
        stock_base: ''
    })

    const chasublesPerPages = 10
    const ballonsPerPages = 10
    const cramponsPerPages = 10
    
    const chasubles = [
        {
            id: 0,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 1,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 2,
            stock_base: 100,
            stcok_current: 15
        },
        {
            id: 4,
            stock_base: 100,
            stcok_current: 85
        },
        {
            id: 5,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 6,
            stock_base: 100,
            stcok_current: 55
        },
        {
            id: 7,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 8,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 9,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 10,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 11,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 12,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 13,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 14,
            stock_base: 100,
            stcok_current: 50
        },
        {
            id: 15,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 16,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 17,
            stock_base: 100,
            stcok_current: 5
        }
    ]

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


    const ballons = [
         {
            id: 0,
            stock_base: 20,
            stcok_current: 5
        },
        {
            id: 1,
            stock_base: 20,
            stcok_current: 5
        },
        {
            id: 2,
            stock_base: 20,
            stcok_current: 5
        },
        {
            id: 4,
            stock_base: 20,
            stcok_current: 5
        },
        {
            id: 5,
            stock_base: 20,
            stcok_current: 5
        },
        {
            id: 6,
            stock_base: 20,
            stcok_current: 5
        },
        {
            id: 7,
            stock_base: 20,
            stcok_current: 5
        },
        {
            id: 8,
           stock_base: 20,
            stcok_current: 5
        },
        {
            id: 9,
            stock_base: 20,
            stcok_current: 5
        },
        {
            id: 10,
            stock_base: 20,
            stcok_current: 5
        },
        {
            id: 11,
            stock_base: 20,
            stcok_current: 5
        },
        {
            id: 12,
            stock_base: 20,
            stcok_current: 5
        },
        {
            id: 13,
            stock_base: 20,
            stcok_current: 5
        },
        {
            id: 14,
            stock_base: 20,
            stcok_current: 10
        },
        {
            id: 15,
            stock_base: 20,
            stcok_current: 20
        },
        {
            id: 16,
            stock_base: 20,
            stcok_current: 15
        },
        {
            id: 17,
            stock_base: 20,
            stcok_current: 5
        }
    ]

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

    const crampons = [
         {
            id: 0,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 1,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 2,
            stock_base: 100,
            stcok_current: 15
        },
        {
            id: 4,
            stock_base: 100,
            stcok_current: 85
        },
        {
            id: 5,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 6,
            stock_base: 100,
            stcok_current: 55
        },
        {
            id: 7,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 8,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 9,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 10,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 11,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 12,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 13,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 14,
            stock_base: 100,
            stcok_current: 50
        },
        {
            id: 15,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 16,
            stock_base: 100,
            stcok_current: 5
        },
        {
            id: 17,
            stock_base: 100,
            stcok_current: 5
        }
    ]

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

    const handleCreateEquipment = (e) => {
        e.preventDefault();
        console.log('Équipement à créer:', selectedEquipment, equipmentFormData);
        // La requête API 
        setShowCreateModal(false);
        setEquipmentFormData({
            stock_base: ''
        });
    };

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

<<<<<<< HEAD
            <table className="table-auto w-9/10 border-collapse border-2 border-white rounded-xl mx-15 text-white bg-[#7CA982]">
=======
            <div className="flex justify-end mx-22 pb-5">
                <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="bg-[#7cca98] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#6a9470] transition-all"
                >
                    + Ajouter un équipement
                </button>
            </div>

            <table className="table-auto w-9/10 border-collapse border-2 border-white rounded-xl mx-15 text-white bg-[#7cca98]">
>>>>>>> 20a53cd5150aae655fead6f284c5204e97cd9e4f
                <thead className="rounded-xl"> 
                    <tr>
                        <th className="px-4 py-2 text-white font-roboto text-md text-left">ID</th>
                        <th className="px-20 py-2 text-white font-roboto text-md text-left">Stock d'origine</th>
                        <th className="px-40 py-2 text-white font-roboto text-md text-left">Stock actuel</th>
                        <th className="px-4 py-2 text-white font-roboto text-md text-left">État du stock</th>
                    </tr>
                </thead>
    
                <tbody> 
                    {selectedEquipment === 'ballons' && currentBalloon.length > 0 ? (
                        currentBalloon.map((item) => {
                            const stockStatus = getStockStatus(item.stcok_current, item.stock_base);
                            return (
                                <tr key={item.id} className="border-b">
                                    <td className="px-4 py-2">{item.id}</td>
                                    <td className="px-20 py-2">{item.stock_base}</td>
                                    <td className="px-40 py-2">{item.stcok_current}</td>
                                    <td className={`px-4 py-2 ${stockStatus.color}`}>
                                        {stockStatus.text}
                                    </td>
                                </tr>
                            );
                        })
                    ) : selectedEquipment === 'chasubles' && currentChasuble.length > 0 ? (
                        currentChasuble.map((item) => {
                            const stockStatus = getStockStatus(item.stcok_current, item.stock_base);
                            return (
                                <tr key={item.id} className="border-b">
                                    <td className="px-4 py-2">{item.id}</td>
                                    <td className="px-20 py-2">{item.stock_base}</td>
                                    <td className="px-40 py-2">{item.stcok_current}</td>
                                    <td className={`px-4 py-2 ${stockStatus.color}`}>
                                        {stockStatus.text}
                                    </td>
                                </tr>
                            );
                        })
                    ) : selectedEquipment === 'crampons' && currentBoot.length > 0 ? (
                        currentBoot.map((item) => {
                            const stockStatus = getStockStatus(item.stcok_current, item.stock_base);
                            return (
                                <tr key={item.id} className="border-b">
                                    <td className="px-4 py-2">{item.id}</td>
                                    <td className="px-20 py-2">{item.stock_base}</td>
                                    <td className="px-40 py-2">{item.stcok_current}</td>
                                    <td className={`px-4 py-2 ${stockStatus.color}`}>
                                        {stockStatus.text}
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

            {/* Modale de création d'équipement */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold text-[#7CA982] mb-4">Ajouter un nouvel Équipement</h2>

                        <form onSubmit={handleCreateEquipment} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">
                                    Type d'équipement
                                </label>
                                <select
                                    value={selectedEquipment}
                                    onChange={(e) => setSelectedEquipment(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7CA982]"
                                >
                                    <option value="ballons">Ballons</option>
                                    <option value="crampons">Crampons</option>
                                    <option value="chasubles">Chasubles</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-bold mb-2">
                                    Stock de base
                                </label>
                                <input
                                    type="number"
                                    name="stock_base"
                                    value={equipmentFormData.stock_base}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#7CA982]"
                                    placeholder="Ex: 20"
                                    min="1"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#7CA982] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#6a9470] transition-all"
                                >
                                    Ajouter
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCreateModal(false);
                                        setEquipmentFormData({
                                            stock_base: ''
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
        </section>
    </>
    );
}

export default Equipements;