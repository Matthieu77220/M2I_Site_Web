import {useState} from 'react';
import { useNavigate } from 'react-router';
import NavBarAdmin from './components/NavBarAdmin';

function PannelAdmin() {
    const [open, setOpen] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [showOptions, setShowOptions] = useState(false);
    const [editData, setEditData] = useState(false);
    const [deleteData, setDeleteData] = useState(false);
    
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

    function options(){
        if()
    }
    }
    return (  
        <>
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