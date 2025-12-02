import {useState} from 'react';
import NavBarAdmin from '../components/NavBarAdmin';

function Equipements() {

    const[open, setOpen] = useState(true)
    const[openChasuble, setOpenChasuble] = useState(false)
    const[openCrampon, setOpenCrampon] = useState(false)
    const[openBallon, setOpenBallon] = useState(false)
    const[currentPageChasubles, setCurrentPageChasubles] = useState(1)
    const[currentPageBoots, setCurrentPageBoots] = useState(1)
    const[currentPageBalloons, setCurrentPageBallons] = useState(1)
    const[confirmerBoutton, setConfirmerBoutton] = useState(false)

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
        if(currentPageChasubles >= totalOfPagesChasuble){
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
        if(currentPageBalloons >= totalOfPagesBalloon){
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
        if(currentPageBoots >= totalOfPagesBoots){
            setCurrentPageBoots(currentPageBoots - 1);
        }
    }
    
    
    return(
    <>
        <div className='flex'>
            <NavBarAdmin open={open} setOpen={setOpen} /> {/* Passe en props les éléments du UseStat (open,setOpen) */}
        </div>

        <section className= {`duration-500 ${open ? "pl-60" : "pl-[72px]"}`}>
            <h1 className="text-center text-[#68bd6c] text-2xl font-extrabold underline">Equipements</h1>


            <section className="flex border-2 bg-[#68bd6c] border-white rounded-xl justify-center text-center w-[50vw] mx-[15vw] my-[5vh] p-4 text-xl text-white font-semibold">
                <label>Sélectionner l'équipement qui vous intéresse: </label>
                <select name="menu" className="bg-[#68bd6c] mx-2">
                    <option value="balloons" onChange={setOpenBallon(!openBallon)}>Ballons</option>
                    <option value="Boots" onChange={setOpenCrampon(!openCrampon)}>Crampons</option>
                    <option value="Chasubles" onChange={setOpenChasuble(!openChasuble)}>Chasubles</option>
                </select>

            </section>

                <table className="table-auto w-9/10 border-collapse border-2 border-white rounded-xl mx-15 text-white bg-[#7cca98]">
                    <thead className="rounded-xl"> 
                        <tr>
                        <th className="px-4 py-2 text-white font-roboto text-md text-left">ID</th>
                        <th className="px-20 py-2 text-white font-roboto text-md text-left">stock d'origine</th>
                        <th className="px-40 py-2 text-white font-roboto text-md text-left">stock actuel</th>
                        <th className="px-4 py-2 text-white font-roboto text-md text-left">état du stock</th>
                        </tr>
                    </thead>
        
                    <tbody> 
                        {openBallon==true ? currentBalloon > 0 (
                        currentBalloon.map((currentBallon) => (
                            <tr key={currentBallon.id} className="border-b">
                                <td className="px-4 py-2">{currentBallon.id}</td>
                                <td className="px-20 py-2">{currentBallon.stock_base}</td>
                                <td className="px-40 py-2">{currentBallon.stcok_current}</td>
                                <td className="px-4 py-2 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowOptions(true)}
                                        className=" bg-yellow-300 text-white px-3 py-1 rounded cursor-pointer hover:opacity-70"
                                    >
                                        Editer
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowOptions(true)}
                                        className=" bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:opacity-70"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))
                        ) : openChasuble==true ? currentChasuble > 0 (
                        currentChasuble.map((currentChasublee) => (
                            <tr key={currentChasublee.id} className="border-b">
                                <td className="px-4 py-2">{currentChasublee.id}</td>
                                <td className="px-20 py-2">{currentChasublee.stock_base}</td>
                                <td className="px-40 py-2">{currentChasublee.stcok_current}</td>
                                <td className="px-4 py-2 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowOptions(true)}
                                        className=" bg-yellow-300 text-white px-3 py-1 rounded cursor-pointer hover:opacity-70"
                                    >
                                        Editer
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowOptions(true)}
                                        className=" bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:opacity-70"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))
                        ) : openCrampon==true ? currentBoot > 0 (
                        currentBoot.map((currentCrampon) => (
                            <tr key={currentCrampon.id} className="border-b">
                                <td className="px-4 py-2">{currentCrampon.id}</td>
                                <td className="px-20 py-2">{currentCrampon.stock_base}</td>
                                <td className="px-40 py-2">{currentCrampon.stcok_current}</td>
                                <td className="px-4 py-2 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowOptions(true)}
                                        className=" bg-yellow-300 text-white px-3 py-1 rounded cursor-pointer hover:opacity-70"
                                    >
                                        Editer
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowOptions(true)}
                                        className=" bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:opacity-70"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))
                        ) : 
                         <tr>
                            <td className="px-4 py-2 text-red-600" colSpan={4}>
                                Rien à afficher
                            </td>
                        </tr>
                        }
                    
                    </tbody>

                </table>
            <section>

            </section>

        </section>
    </>
        
    );
}

export default Equipements;