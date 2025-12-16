import {useState} from 'react';
import NavBarSuperAdmin from '../components/NavBarSuperAdmin';

function SuperAdminUsers() {
    const [open, setOpen] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [showOptions, setShowOptions] = useState(false);
    const [editMessage, setEditMessage] = useState(false)
    const [editData, setEditData] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(false);
    const [deleteData, setDeleteData] = useState(false);
    const [confirmerBoutton, setConfirmerBoutton] = useState(false);

    const usersPerPages = 15;
    const users = [
        {
            id: 0,
            admin: 1,
            "email": "...@123.com",
        },
        {
            id: 1,
            admin: 1,
            "email": "...@123.com",
        },
        {
            id: 2,
            admin: 1,
            "email": "...@123.com",
        },
        {
            id: 4,
            admin: 1,
            "email": "...@123.com",
        },
        {
            id: 5,
            admin: 1,
            "email": "...@123.com",
        },
        {
            id: 6,
            admin: 1,
            "email": "...@123.com",
        },
        {
            id: 7,
            admin: 1,
            "email": "...@123.com",
        },
        {
            id: 8,
            admin: 1,
            "email": "...@123.com",
        },
        {
            id: 9,
            admin: 1,
            "email": "...@123.com",
        },
        {
            id: 10,
            admin: 1,
            "email": "...@123.com",
        },
        {
            id: 11,
            admin: 1,
            "email": "...@123.com",
        },
        {
            id: 12,
            admin: 1,
            "email": "...@123.com",
        },
        {
            id: 13,
            admin: 1,
            "email": "...@123.com",
        },
        {
            id: 14,
            admin: 1,
            "email": "...@123.com",
        },
        {
            id: 15,
            admin: 1,
            "email": "...@123.com",
        },
        {
            id: 16,
            admin: 1,
            "email": "...@123.com",
        },
        {
            id: 17,
            admin: 1,
            "email": "...@123.com",
        }
    ]; //plus tard on mettra avec les users de la bdd

    const indexOfLastUser = currentPage * usersPerPages;
    const indexOfFirstUser = (currentPage - 1) * usersPerPages;

    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalOfPages = Math.max(1, Math.ceil(users.length / usersPerPages));

    function nextPage(){
        if(currentPage < totalOfPages){
            setCurrentPage(currentPage + 1);
        }
    }

    function prevPage(){
        if(currentPage >= totalOfPages){
            setCurrentPage(currentPage - 1);
            console.log("bonjout")
        }
    }
    
    return (  
        <>
            
            {showOptions &&
                <div className="absolute inset-0 bg-[#00000166] bg-opacity-50 flex items-center justify-center z-50">
                <div className="relative flex flex-col justify-evenly h-2/5 bg-white rounded-lg p-8 max-w-md w-full">
                    <div className="flex flex-col justify-between items-center space-y-5">
                        <h1 className="text-xl font-bold m-auto">Voulez-vous supprimer ou modifier l'utilisateur</h1>
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
                        <h1 className="text-xl font-bold m-auto">Supprimer l'utilisateur</h1>
                        <h2 className=''>Etes-vous sur de vouloir supprimer cet utilisateur?</h2>
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
                        <h1 className="text-xl font-bold m-auto">Modifier l'utilisateur</h1>
                        <h2 className=''>Etes-vous sur de vouloir modifier cet utilisateur?</h2>
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
                <h1 className="font-spartan text-[#7cca98] font-bold text-5xl text-center underline mt-15 pb-5">Gestion Utilisateur Super Admin</h1>
                <table className="table-auto w-9/10 border-collapse border-2 border-white rounded-xl mx-15 text-white bg-[#7cca98]">
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
                                <td className="px-20 py-2">{currentUser.admin ? "Oui" : "Non"}</td>
                                <td className="px-40 py-2">{currentUser.email}</td>
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
                        onClick={() =>{prevPage()}}
                        className="border-2 border-white bg-[#7cca98] border-solid cursor-pointer p-3 text-white font-bold rounded-xl"
                    >
                        &lt;
                    </button>

                    <p className="border-2 border-white bg-[#7cca98] border-solid p-3 text-white font-bold rounded-xl">{currentPage}</p>

                    <button 
                        type="button"
                        onClick={() => {nextPage()}} 
                        className="border-2 border-white bg-[#7cca98] border-solid cursor-pointer p-3 text-white font-bold rounded-xl"
                    >
                        &gt;
                    </button>
                </section>        
      
            </section>
            
        </>
    );
}

export default SuperAdminUsers;