import {useState} from 'react';
import { useNavigate, useViewTransitionState } from 'react-router';
import NavBarAdmin from './components/NavBarAdmin';

function PannelAdmin() {
    const [open, setOpen] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [showOptions, setShowOptions] = useState(false);
    const [editData, setEditData] = useState(false);
    const [deleteData, setDeleteData] = useState(false);
    const [confirmerBoutton, setConfirmerBoutton] = useState()
    
    const usersPerPages = 10;
    const users = []; //plus tard on mettra avec les users de la bdd

    const indexOfLastUser = currentPage * usersPerPages;
    const indexOfFirstUser = indexOfLastUser - currentPage;

    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalOfPages = Math.max(1, Math.ceil(users.length / usersPerPages));

    function nextPage(){
        if(currentPage < totalOfPages){
            setCurrentPage(currentPage + 1);
        }
    }

    function prevPage(){
        if(currentPage > totalOfPages){
            setCurrentPage(currentPage - 1);
        }

   
    }
    
    return (  
        <>
            {!showOptions &&
                    <div className="absolute inset-0 bg-[#00000166] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative flex flex-col justify-evenly h-2/5 bg-white rounded-lg p-8 max-w-md w-full">
                        <div className="flex flex-col justify-between items-center space-y-5">
                            <h1 className="text-xl font-bold m-auto">Modifier le dossier</h1>
                            <h2 className=''>Etes-vous sur de vouloir supprimer votre compte ?</h2>
                            {confirmerBoutton &&  <h3 className='text-red-600 font-bold'>Cette action est irréversible.</h3>}
                            <button
                                className="absolute right-5 top-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                                onClick={() => setShowOptions(!showOptions)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className='flex justify-around items-center '>
                            {confirmerBoutton ? 
                                <button type="button" onClick={() => deleteCompte()} className='bg-[#bd6868] rounded-xl border border-[#bd68681a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12 backdrop-blur-md'>OUI</button>
                                :
                                <button type="button" onClick={() => {setConfirmerBoutton(!confirmerBoutton)}} className='bg-[#bd6868] rounded-xl border border-[#bd68681a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12 backdrop-blur-md'>OUI</button>
                            }
                            <button type="button" className='bg-[#68bd6c] rounded-xl border border-[#68bd6c1a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12' onClick={() => setPageGestionCompte(!pageGestionCompte)}>NON</button>
                        </div>
                    </div>
                    </div>
                }

            <div className='flex'>
                <NavBarAdmin open={open} setOpen={setOpen} /> {/* Passe en props les éléments du UseStat (open,setOpen) */}
            </div>

            <section className= {`duration-500 ${open ? "pl-60" : "pl-[72px]"}`}>
                <h1>Gestion Utilisateur</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>est Admin ?</th>
                            <th>identifiant</th>
                            <th>editer/supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                       {currentUsers.lenght > 0 ?(
                        currentUsers.map((utilisateur) =>(
                            <tr key={utilisateur.id}>
                                <td>{utilisateur.id}</td>
                                <td>{utilisateur.est_admin}</td>
                                <td>{utilisateur.identifiant}</td>
                                <td onClick={() =>{setShowOptions(true)}}>editer/supprimer</td>
                            </tr>
                        ))
                    ) : 
                        <tr>
                            <td>
                                Aucun utilisateur à afficher.
                            </td>
                        </tr>
                    }
                    </tbody>
                </table>      
            </section>
        </>
    );
}

export default PannelAdmin;