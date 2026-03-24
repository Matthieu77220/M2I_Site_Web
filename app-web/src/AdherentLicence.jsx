import { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router';
import NavBar from './components/navBar'

import photoTest from '../../Epreuve E6/Docs AP2/wireframes/adherent_licence.png'


function AdherentLicence() {
    const [open, setOpen] = useState(true)
    const [user, setUser] = useState([])

    const navigate = useNavigate()

    // Catch : proctection des pages si status = 401
    useEffect(() => {
        axios.get("http://localhost:3000/api/licence/identifiantLicence", {withCredentials: true})
            .then(res => setUser(res.data))
            .catch(err => {
                if (err.response && err.response.status == 401) { 
                    navigate("/connexion")
                }
                console.error(err)})
    }, [])

    return (
        <>
            <div className='flex'>
                <NavBar open={open} setOpen={setOpen} /> {/* Passe en props les éléments du UseStat (open,setOpen) */}
            </div>
            <div className= {`duration-500 ${open ? "pl-60" : "pl-[72px]"}`}>
              
        
                <section className=' min-h-screen flex items-center justify-center bg-gray-100 p-4'>
                    <div className='w-full max-w-4xl'>
                        <div className='bg-[#7CA982] rounded-xl shadow-lg p-8'>
                            
                            <h2 className='text-2xl font-bold mb-6 text-gray-100'>Licence</h2>
            
                           
                            <div className='flex gap-6 mb-6'>
                            
                                {/* <div className='w-48 h-64 bg-sky-100 rounded-lg overflow-hidden flex flex-col shadow-md'>
                                    <img className='w-full h-full object-cover' src={photoTest} />
                                </div> */}

                                {user.map((element, index) => (
                                   <div key={index} className='flex-1 bg-white rounded-lg p-6 shadow-md'>
                                        <h3 className='font-bold text-xl mb-4 text-gray-800'> {element.nom} {element.prenom}</h3>
                                        <p className='mb-2 text-gray-700'><strong>Né le :</strong> {new Date(element.date_naissance).toLocaleDateString("fr-FR")}</p>
                                        {
                                            element.numero_adherent != null ?
                                            <p className='mb-2 text-gray-700'><strong>Numéro :</strong> {element.numero_adherent}</p>
                                            :
                                            <p>Numéro :Aucun numéro</p>
                                        }
                                        <p className='text-gray-700'><strong>Type de forfait :</strong> {element.type_abonnement}</p>
                                    </div>
                                    ))
                                }
                            </div>

                            {user.map((element, index) => (
                                <div key={index} className='bg-white rounded-lg p-6 shadow-md mb-8'>
                                    <p className='mb-2 text-gray-700'><strong>Délivrée le :</strong> {new Date(element.debut_licence).toLocaleDateString("fr-FR")}</p>
                                    <p className='text-gray-700'><strong>Date de validité :</strong> {new Date(element.debut_licence).toLocaleDateString("fr-FR")}</p>
                                </div>
                            ))

                            }

                        </div>
                    </div>
                </section>





            </div>
        </>
    );
}

export default AdherentLicence;
<>

</>