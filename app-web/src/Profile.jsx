import { useState } from 'react'
import NavBar from './components/navBar'
import { FaPencil } from "react-icons/fa6";

function Profile() {
    const [open, setOpen] = useState(true)

    // Affiche ou non les inputs pour modifier le contenu
    const [inputPrenom, setInputPrenom] = useState(false)
    const [inputNom, setInputNom] = useState(false)
    const [inputNaissance, setInputNaissance] = useState(false)
    const [inputEmail,setInputEmail] = useState(false)
    const [inputTelephone,setInputTelephone] = useState(false)

    const [isInputValid,setIsInputValid] = useState(true)

    // Création des Regex pour chaque Input
    const regexPrenom = new RegExp("^[a-zA-Z]{3,15}$")
    const regexNom = new RegExp("^[a-zA-Z\- ]{3,15}$")
    const regexEmail = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+")
    const regexTel = new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")

    // Attribut les valeur des input selon leurs clés
    const [formData, setFormData] = useState({
        prenom: "",
        nom: "",
        email : "",
        dateDeNaissance : "",
        telephone : "",
    })

    function checkValidInput(event) {
        if (regexPrenom.test(formData.prenom) && regexNom.test(formData.nom) && regexEmail.test(formData.email) && regexTel.test(formData.telephone)) {
            setIsInputValid(true) // Attribut True si le résultat lors de la 1er condition etait dans le else
        }else{
            setIsInputValid(false)
            event.preventDefault() // empêche la réinitilisation du form si input n'est pas conforme avec les Regex
        }
    }


    return (
        <>
        <section className='min-h-screen flex flex-col'>
            <div className='flex'>
                <NavBar open={open} setOpen={setOpen} /> {/* Passe en props les éléments du UseStat (open,setOpen) */}
            </div>
            <div className= {`duration-500 ${open ? "pl-60 w-[calc(100vw_-_15rem)]" : "pl-[72px] [calc(100vw_-_4.5rem)]"} 
                            overflow-hidden flex flex-col justify-center items-center bg-[#f8f9fa] h-full w-full`}>
                <h1 className='m-5 text-black text-2xl lg:text-4xl font-bold'>Mon compte</h1>
                {!isInputValid && <h2 className='text-red-600 m-5'>Caractère non valide</h2>}
                <form onSubmit={checkValidInput} className='flex flex-col md:p-[25px] p-[40px] gap-10 rounded-md overflow-hidden bg-white min-w-11/12 max-md:h-5/6'>
                
                    <div className='flex flex-col justify-between gap-3 items-center border-[1px] border-gray-950 rounded-md p-5'>
                        <h1 className='text-sm lg:text-xl font-bold'>Information personnelles :</h1>
                        <div className='flex flex-col w-full space-y-3'>

                            {/* ----- Section Nom ------ */}
                            <div className='flex w-full justify-between items-center'>
                                <h1 className='text-sm font-semibold'>Nom</h1>
                                {!inputNom ? 
                                    <h1 className='text-sm font-semibold'>Dubois</h1>
                                            : 
                                <input
                                    type="text" 
                                    id='nom' 
                                    placeholder='Martin Dumas' 
                                    onChange={(e) => setFormData({...formData, nom:e.target.value})} 
                                    className='bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-200 block p-2.5'/> 
                                }

                                <label htmlFor="nom" className='p-2 h-10 items-center' onClick={() => {setInputNom(!inputNom)}}>
                                    <FaPencil className={'cursor-pointer'} />
                                </label>
                            </div>
                            
                            {/* ------ Section Prénom ------ */}
                            <div className='flex w-full justify-between items-center'>
                                <h1 className='text-sm font-semibold'>Prénom</h1>
                                {!inputPrenom ? 
                                    <h1 className='text-sm font-semibold'>Martin</h1>
                                            : 
                                <input 
                                    type="text" 
                                    id='nom' 
                                    placeholder='Martin Dumas' 
                                    onChange={(e) => setFormData({...formData, prenom:e.target.value})} 
                                    className='bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-200 block p-2.5'/> 
                                }

                                <label htmlFor="nom" className='p-2 h-10 items-center' onClick={() => {setInputPrenom(!inputPrenom)}}>
                                    <FaPencil className={'cursor-pointer'} />
                                </label>
                            </div>
                            
                            {/* ------ Section Naissance ------ */}
                            <div className='flex w-full justify-between items-center'>
                                <h1 className='text-sm font-semibold'>Naissance</h1>
                                {!inputNaissance ? 
                                        <h1 className='text-sm font-semibold'>20/12/2001</h1> 
                                            :
                                        <input 
                                            type="date" 
                                            id="date" 
                                            onChange={(e) => setFormData({...formData, dateDeNaissance:e.target.value})} 
                                            className='text-sm font-semibold' />
                                }

                                <label htmlFor="date" 
                                    className='p-2 h-10 items-center' 
                                    onClick={() => {setInputNaissance(!inputNaissance)}}>
                                    <FaPencil className={'cursor-pointer'} />
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
                                {!inputEmail ? 
                                        <h1 className='text-sm font-semibold'>martin.dumas@test.com</h1> 
                                            :
                                        <input 
                                            type="email" 
                                            id="email" 
                                            placeholder='exemple@test.fr' 
                                            onChange={(e) => setFormData({...formData, email:e.target.value})} 
                                            className='bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-200 block p-2.5'/>
                                }

                                <label htmlFor="email" className='p-2 h-10 items-center' onClick={() => {setInputEmail(!inputEmail)}}>
                                    <FaPencil className={'cursor-pointer'} />
                                </label>
                            </div>
                            
                            {/* ------ Section Téléphone ------ */}
                            <div className='flex w-full justify-between items-center'>
                                <h1 className='text-sm font-semibold'>Téléphone</h1>
                                {!inputTelephone ? 
                                        <h1 className='text-sm font-semibold'>0123455678</h1> 
                                            :
                                        <input 
                                            placeholder='0123455678' 
                                            onChange={(e) => setFormData({...formData, telephone:e.target.value})} 
                                            type="text" id="telephone" 
                                            className='bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-200 block p-2' />
                                }

                                <label htmlFor="telephone" className='p-2 h-10 items-center' onClick={() => {setInputTelephone(!inputTelephone)}}>
                                    <FaPencil className={'cursor-pointer text-lg'} />
                                </label>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="flex min-w-[150px] w-1/5 text-center items-center justify-center rounded-md shadow-xs bg-[#8BB78F] p-5 text-sm/6 font-semibold text-white hover:bg-[#6b9773] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2">
                        <p>Sauvegarder</p>
                    </button>

                </form>
            </div>
        </section>
        </>
     );
}

export default Profile;