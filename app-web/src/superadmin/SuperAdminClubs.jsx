import {useState} from 'react';
import { useNavigate} from 'react-router';
import NavBarSuperAdmin from '../components/NavBarSuperAdmin';

function SuperAdminClubs() {
    const [open, setOpen] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [showOptions, setShowOptions] = useState(false);
    const [editMessage, setEditMessage] = useState(false)
    const [editData, setEditData] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(false);
    const [deleteData, setDeleteData] = useState(false);
    const [confirmerBoutton, setConfirmerBoutton] = useState(false);
    
    const pitchsPerPages = 15;
    const pitchs = [
        {
            id:1,
            identifiant:"1234",
            adresse:"34 cours du Danube SERRIS",
        },
        {
            id:2,
            identifiant:"1234",
            adresse:"34 cours du Danube SERRIS",
        },
        {
            id:3,
            identifiant:"1234",
            adresse:"34 cours du Danube SERRIS",
        },
        {
            id:4,
            identifiant:"1234",
            adresse:"34 cours du Danube SERRIS",
        },
        {
            id:5,
            identifiant:"1234",
            adresse:"34 cours du Danube SERRIS",
        },
        {
            id:6,
            identifiant:"1234",
            adresse:"34 cours du Danube SERRIS",
        },
        {
            id:7,
            identifiant:"1234",
            adresse:"34 cours du Danube SERRIS",
        },
        {
            id:8,
            identifiant:"1234",
            adresse:"34 cours du Danube SERRIS",
        },
        {
            id:9,
            identifiant:"1234",
            adresse:"34 cours du Danube SERRIS",
        },
        {
            id:10,
            identifiant:"1234",
            adresse:"34 cours du Danube SERRIS",
        },
        {
            id:11,
            identifiant:"1234",
            adresse:"34 cours du Danube SERRIS",
        },
        {
            id:12,
            identifiant:"1234",
            adresse:"34 cours du Danube SERRIS",
        },
        {
            id:13,
            identifiant:"1234",
            adresse:"34 cours du Danube SERRIS",
        },
        {
            id:14,
            identifiant:"1234",
            adresse:"34 cours du Danube SERRIS",
        },
        {
            id:15,
            identifiant:"12345",
            adresse:"34 cours du Danube SERRIS",
        },
        {
            id:16,
            identifiant:"1234",
            adresse:"34 cours du Danube SERRIS",
        },
    ]; //plus tard on mettra avec les users de la bdd

    const indexOfLastPitch = currentPage * pitchsPerPages;
    const indexOfFirstPitch = (currentPage - 1) * pitchsPerPages;

    const currentPitchs = pitchs.slice(indexOfFirstPitch, indexOfLastPitch);
    const totalOfPages = Math.max(1, Math.ceil(pitchs.length / pitchsPerPages));

    function nextPage(){
        if(currentPage < totalOfPages){
            setCurrentPage(currentPage + 1);
        }
    }

    function prevPage(){
        if(currentPage >= totalOfPages){
            setCurrentPage(currentPage - 1);
        }

   
    }
    
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
                        onClick={() => {setEditMessage(!editMessage)}}
                        className="bg-amber-400 rounded-xl border border-[#bd68681a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12 backdrop-blur-md"
                        >
                            Editer
                        </button>
                        <button 
                        type="button"
                        onClick={() => {setDeleteMessage(!deleteMessage)}}
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
                            onClick={() => setDeleteMessage(!deleteMessage)}
                        >
                            ✕
                        </button>
                    </div>
                    <div className='flex justify-around items-center '>
                        {confirmerBoutton ? 
                            <button type="button" onClick={() => setDeleteData(!deleteData)} className='bg-[#68bd6c] rounded-xl border border-[#bd68681a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12 backdrop-blur-md'>OUI</button>
                            :
                            <button type="button" onClick={() => {setConfirmerBoutton(!confirmerBoutton)}} className='bg-[#68bd6c] rounded-xl border border-[#bd68681a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12 backdrop-blur-md'>OUI</button>
                        }
                        <button type="button" className='bg-red-600 rounded-xl border border-[#68bd6c1a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12' onClick={() => setDeleteMessage(!deleteMessage)}>NON</button>
                    </div>
                </div>
                </div>
            }
    
            {editMessage &&
                <div className="absolute inset-0 bg-[#00000166] bg-opacity-50 flex items-center justify-center z-50">
                <div className="relative flex flex-col justify-evenly h-2/5 bg-white rounded-lg p-8 max-w-md w-full">
                    <div className="flex flex-col justify-between items-center space-y-5">
                        <h1 className="text-xl font-bold m-auto">Modifier ce club</h1>
                        <h2 className=''>Etes-vous sur de vouloir modifier ce club </h2>
                        {confirmerBoutton &&  <h3 className='text-red-600 font-bold'>Cette action est irréversible.</h3>}
                        <button
                            className="absolute right-5 top-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                            onClick={() => setEditMessage(!editMessage)}
                        >
                            ✕
                        </button>
                    </div>
                    <div className='flex justify-around items-center '>
                        {confirmerBoutton ? 
                            <button type="button" onClick={() => setEditData(!editData)} className='bg-[#68bd6c] rounded-xl border border-[#bd68681a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12 backdrop-blur-md'>OUI</button>
                            :
                            <button type="button" onClick={() => {setConfirmerBoutton(!confirmerBoutton)}} className='bg-[#68bd6c] rounded-xl border border-[#bd68681a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12 backdrop-blur-md'>OUI</button>
                        }
                        <button type="button" className='bg-red-600 rounded-xl border border-[#68bd6c1a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12' onClick={() => setEditMessage(!editMessage)}>NON</button>
                    </div>
                </div>
                </div>
            }

            <div className='flex'>
                <NavBarSuperAdmin open={open} setOpen={setOpen} /> {/* Passe en props les éléments du UseStat (open,setOpen) */}
            </div>

            <section className= {`duration-500 ${open ? "pl-60" : "pl-[72px]"}`}>
                <h1 className="font-spartan text-[#7CA982] font-bold text-5xl text-center underline mt-15 pb-5">Gestion Clubs</h1>
                <table className="table-auto w-9/10 border-collapse border-2 border-white rounded-xl bg-[#7CA982] mx-15 text-white">
                    <thead className="rounded-xl font-xl">
                        <tr>
                        <th className="text-white font-roboto text-md px-4 py-2 text-left">ID</th>
                        <th className="text-white font-roboto text-md px-50 py-2 text-left">Adresse Clubs</th>
                        <th className="text-white font-roboto text-md px-4 py-2 text-left">Editer/Supprimer</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentPitchs.length > 0 ? (
                        currentPitchs.map((pitch) => (
                        <tr key={pitch.id} className="border-b">
                            <td className="px-4 py-2">{pitch.identifiant}</td>
                            <td className="px-50 py-2">{pitch.adresse}</td>
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
                        ) : (
                        <tr>
                            <td className="px-4 py-2 text-red-600" colSpan={3}>
                                Aucun Clubs à afficher.
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>

                <section className="flex justify-center p-2">
                    <button 
                        type="button"
                        onClick={() =>{prevPage()}}
                        className="border-2 border-white bg-[#7CA982] border-solid cursor-pointer p-3 text-white font-bold rounded-xl"
                    >
                        &lt;
                    </button>

                    <p className="border-2 border-white bg-[#7CA982] border-solid cursor-pointer p-3 text-white font-bold rounded-xl">{currentPage}</p>

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