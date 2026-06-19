import { useState } from 'react'
import NavBarAdmin from '../components/NavBarAdmin';
import { FaPencil } from "react-icons/fa6";
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import axios from 'axios';

function AdminProfile() {
    const [open, setOpen] = useState(true)

    //Affiche la page pour supprimer son compte
    const [pageGestionCompte, setPageGestionCompte] = useState(true)

    //Confirme la supprésion du compte
    const [confirmerBoutton,setConfirmerBoutton] = useState(false)
     
    const navigate = useNavigate()

    // ---------- Vérification du mot pour suppression du compte ------------
    function verifierPrenom() {
        const prenomInput = document.getElementById("confrime").value;
        if(prenomInput === "Confirmer") {
            setConfirmerBoutton(true);
        } else {
            setConfirmerBoutton(false);
            alert("le mot de confirmation est incorrect, veuillez entrer 'Confirmer' pour supprimer votre compte.");
        }
    }

    // ---------- Suppression du compte ------------
    async function deleteCompte() {
        setPageGestionCompte(!pageGestionCompte)
      
        try {
            await axios.delete("/api/auth/suppressionCompte", {withCredentials: true})
            
            navigate("../inscription")
        } catch (err) {
            console.log(err);
            // Ajouter des useState pour afficher au front les erreurs
        }
    }

    // ---------- Visualisation des informations du compte ------------
    const [adherent, setAdherent] = useState([])

    useEffect(() => {
        axios.get("/api/voirProfile/voirProfile", {withCredentials: true})
            .then(res => setAdherent(res.data))
            .catch(err => {
                if (err.response && err.response.status == 401) { 
                    navigate("/connexion")
                }
                console.error(err)})
    }, [])

    return (
        <>
        <section className='min-h-screen flex flex-col'>
            <div className='flex'>
                <NavBarAdmin open={open} setOpen={setOpen} /> {/* Passe en props les éléments du UseStat (open,setOpen) */}
            </div>
            <div className= {`duration-500 ${open ? "pl-60 w-[calc(100vw-15rem)]" : "pl-18 [calc(100vw_-_4.5rem)]"}
                            overflow-hidden flex flex-col justify-center items-center bg-[#f8f9fa] h-screen w-full`}>

                {/* Page pour supprimer le compte */}
                {!pageGestionCompte &&
                    <div className="absolute inset-0 bg-[#00000166] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative flex flex-col justify-evenly bg-white rounded-lg p-8 max-w-md w-full">
                        <div className="flex flex-col justify-between items-center space-y-5">
                            <h1 className="text-xl font-bold m-auto">Supprimer le compte</h1>
                            <h2 className=''>Êtes-vous sur de vouloir supprimer votre compte ?</h2>
                            <h2 className=''>Veuillez entrer <strong>"Confirmer"</strong> </h2>
                            <input type="text" id="confrime" required placeholder='Confirmer' className='border border-gray-300 rounded-md p-2 w-full' />

                            {confirmerBoutton &&  <h3 className='text-red-600 font-bold'>Cette action est irréversible.</h3>}
                            <button
                                className="absolute right-5 top-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                                onClick={() => setPageGestionCompte(!pageGestionCompte)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className='flex justify-around items-center '>
                            {confirmerBoutton ? 
                                <button type="button" onClick={() => deleteCompte()} className='bg-[#bd6868] rounded-xl border border-[#bd68681a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12 backdrop-blur-md'>OUI</button>
                                :
                                <button type="button" onClick={() => verifierPrenom()} className='bg-[#bd6868] rounded-xl border border-[#bd68681a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12 backdrop-blur-md'>OUI</button>
                            }
                            <button type="button" className='bg-[#68bd6c] rounded-xl border border-[#68bd6c1a] hover:-translate-y-1.5 duration-700 cursor-pointer p-4 pl-12 pr-12' onClick={() => setPageGestionCompte(!pageGestionCompte)}>NON</button>
                        </div>
                    </div>
                    </div>
                }

                <h1 className='m-5 text-black text-2xl lg:text-4xl font-bold'>Mon compte</h1>

                {adherent.map((element, index) => (
                <div key={index} className='flex flex-col md:p-[25px] p-[40px] gap-10 rounded-md overflow-hidden bg-white min-w-11/12 max-md:h-5/6'>
                
                    <div className='flex flex-col justify-between gap-3 items-center border-[1px] border-gray-950 rounded-md p-5'>
                        <h1 className='text-sm lg:text-xl font-bold'>Information personnelles :</h1>
                        <div className='flex flex-col w-full space-y-3'>

                            {/* ----- Section Nom ------ */}
                            <div className='flex w-full justify-between items-center'>
                                <h1 className='text-sm font-semibold'>Nom</h1>
                                <h1 className='text-sm font-semibold'>{element.nom}</h1>
                                <label htmlFor="nom" className='p-2 h-10 items-center'>
                                    <FaPencil onClick={() => {navigate('../ModifierProfile')}} className={'cursor-pointer'} />
                                </label>
                            </div>
                            
                            {/* ------ Section Prénom ------ */}
                            <div className='flex w-full justify-between items-center'>
                                <h1 className='text-sm font-semibold'>Prénom</h1>
                                <h1 className='text-sm font-semibold'>{element.prenom}</h1>
                                <label htmlFor="nom" className='p-2 h-10 items-center'>
                                    <FaPencil onClick={() => {navigate('../ModifierProfile')}} className={'cursor-pointer'} />
                                </label>
                            </div>
                            
                            {/* ------ Section Naissance ------ */}
                            <div className='flex w-full justify-between items-center'>
                                <h1 className='text-sm font-semibold'>Naissance</h1>
                                <h1 className='text-sm font-semibold'>{new Date(element.date_naissance).toLocaleDateString("fr-FR")}</h1> 
                                <label htmlFor="date" 
                                    className='p-2 h-10 items-center'>
                                    <FaPencil onClick={() => {navigate('../ModifierProfile')}} className={'cursor-pointer'} />
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    {/* ------ Section Email ------ */}
                    <div className='flex flex-col justify-between gap-3 items-center border-[1px] border-gray-950 rounded-md p-5'>
                        <h1 className='text-sm lg:text-xl font-bold'>Coordonées :</h1>
                        <div className='flex flex-col w-full space-y-3'>

                            <div className='flex w-full justify-between items-center'>
                                <h1 className='text-sm font-semibold'>Email</h1>
                                <h1 className='text-sm font-semibold'>{element.email}</h1> 
                                <label htmlFor="email" className='p-2 h-10 items-center'>
                                    <FaPencil onClick={() => {navigate('../ModifierProfile')}} className={'cursor-pointer'} />
                                </label>
                            </div>
                            
                            {/* ------ Section Téléphone ------ */}
                            <div className='flex w-full justify-between items-center'>
                                <h1 className='text-sm font-semibold'>Téléphone</h1>
                                <h1 className='text-sm font-semibold'>{element.telephone}</h1>
                                <label htmlFor="telephone" className='p-2 h-10 items-center'>
                                    <FaPencil onClick={() => {navigate('../ModifierProfile')}} className={'cursor-pointer text-lg'} />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <button
                            onClick={() => {navigate('../ModifierMotDePasse')}}
                            type="button" 
                            className="flex min-w-[150px] w-1/5 text-center items-center justify-center rounded-md shadow-xs bg-[#7CA982] p-5 text-sm/6 font-semibold text-white hover:bg-[#4ea052] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2">
                            <p>Modifier Mot de Passe</p>
                        </button>

                        <button
                            onClick={() => {setPageGestionCompte(!pageGestionCompte)}}
                            type="button" 
                            className="flex min-w-[150px] w-1/5 text-center items-center justify-center rounded-md shadow-xs bg-[#bd6868] p-5 text-sm/6 font-semibold text-white hover:bg-[#976b6b] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2">
                            <p>Supprimer le Profile</p>
                        </button>
                    </div>
                </div>
                ))

                }
            </div>
        </section>
        </>
     );
}

export default AdminProfile;