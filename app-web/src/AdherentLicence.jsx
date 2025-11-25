import { useState } from 'react'
import NavBar from './components/navBar'


function AdherentLicence() {
    const [open, setOpen] = useState(true)

    //Exemple d'un user 
    const user = [
        {
            id: 1,
            nom: "Dupont Antoine",
            club: "FC Esbly",
            dateNaissance : "12/01/2001",
            numeroLicence : "X2395283",
            dateDebutLicence : "14/10/2025",
            finDebutLicence: "14/10/2028"
        }
    ]
    
    return ( 
        <>
            <div className='flex'>
                <NavBar open={open} setOpen={setOpen} /> {/* Passe en props les éléments du UseStat (open,setOpen) */}
            </div>
            <div className= {`duration-500 ${open ? "pl-60" : "pl-[72px]"}`}>
              
        
                <section className=' min-h-screen flex justify-center bg-gray-100 p-4'>
                    <div className='w-full max-w-4xl'>
                        <div className='bg-[#7CA982] rounded-xl shadow-lg p-8'>
                            
                            <h2 className='text-2xl font-bold mb-6 text-gray-800'>Licence</h2>
            
                           
                            <div className='flex gap-6 mb-6'>
                            
                                <div className='w-48 h-64 bg-sky-100 rounded-lg overflow-hidden flex flex-col shadow-md'>
                                    <image className='w-full h-full object-cover'></image>
                                </div>

                                {user.map((element) => (
                                   <div key={element.id} className='flex-1 bg-white rounded-lg p-6 shadow-md'>
                                        <h3 className='font-bold text-xl mb-4 text-gray-800'> {element.nom}</h3>
                                        <p className='mb-2 text-gray-700'><strong>Club :</strong> {element.club}</p>
                                        <p className='mb-2 text-gray-700'><strong>Né le :</strong> {element.dateNaissance}</p>
                                        <p className='text-gray-700'><strong>Numéro :</strong> {element.numeroLicence}</p>
                                    </div>
                                    ))
                                }
                            </div>

                            {user.map((element) => (
                                <div key={element.id} className='bg-white rounded-lg p-6 shadow-md mb-8'>
                                    <p className='mb-2 text-gray-700'><strong>Délivrée le :</strong> {element.dateDebutLicence}</p>
                                    <p className='text-gray-700'><strong>Date de validité :</strong> {element.finDebutLicence}</p>
                                </div>
                            ))

                            }

                        
                            <div className='flex justify-center'>
                                <button className='bg-green-900 hover:bg-green-900/40 cursor-pointer text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-200 transform hover:scale-105'>
                                    Sauvegarder
                                </button>
                            </div>
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