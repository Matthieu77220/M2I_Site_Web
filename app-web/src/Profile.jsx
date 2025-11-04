import { useState } from 'react'
import NavBar from './components/navBar'
import { FaPencil } from "react-icons/fa6";

function Profile() {
    const [open, setOpen] = useState(true)

    return (
        <>
        <section className='min-h-screen flex flex-col'>
            <div className='flex'>
                <NavBar open={open} setOpen={setOpen} /> {/* Passe en props les éléments du UseStat (open,setOpen) */}
            </div>
            <div className= {`duration-500 ${open ? "pl-60 w-[calc(100vw_-_15rem)]" : "pl-[72px] [calc(100vw_-_4.5rem)]"} 
                            overflow-hidden flex flex-col justify-center items-center bg-[#f8f9fa] h-full w-full`}>
                <h1 className='m-5 text-black text-2xl lg:text-4xl font-bold'>Mon compte</h1>
                <div className='flex flex-col md:p-[25px] p-[40px] gap-10 rounded-md overflow-hidden bg-white min-w-11/12 max-md:h-5/6'>
                
                    <div className='flex flex-col justify-between gap-3 items-center border-[1px] border-gray-950 rounded-md p-5'>
                        <h1 className='text-sm lg:text-xl font-bold'>Information personnelles :</h1>
                        <div className='flex flex-col w-full space-y-3'>

                            {/* ----- Section Nom ------ */}
                            <div className='flex w-full justify-between items-center'>
                                <h1 className='text-sm font-semibold'>Nom</h1>
                                <h1 className='text-sm font-semibold'>Dubois</h1>
                                <label htmlFor="nom" className='p-2 h-10 items-center'>
                                    <FaPencil className={'cursor-pointer'} />
                                </label>
                            </div>
                            
                            {/* ------ Section Prénom ------ */}
                            <div className='flex w-full justify-between items-center'>
                                <h1 className='text-sm font-semibold'>Prénom</h1>
                                <h1 className='text-sm font-semibold'>Martin</h1>
                                <label htmlFor="nom" className='p-2 h-10 items-center'>
                                    <FaPencil className={'cursor-pointer'} />
                                </label>
                            </div>
                            
                            {/* ------ Section Naissance ------ */}
                            <div className='flex w-full justify-between items-center'>
                                <h1 className='text-sm font-semibold'>Naissance</h1>
                                <h1 className='text-sm font-semibold'>20/12/2001</h1> 
                                <label htmlFor="date" 
                                    className='p-2 h-10 items-center'>
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
                                <h1 className='text-sm font-semibold'>martin.dumas@test.com</h1> 
                                <label htmlFor="email" className='p-2 h-10 items-center'>
                                    <FaPencil className={'cursor-pointer'} />
                                </label>
                            </div>
                            
                            {/* ------ Section Téléphone ------ */}
                            <div className='flex w-full justify-between items-center'>
                                <h1 className='text-sm font-semibold'>Téléphone</h1>
                                <h1 className='text-sm font-semibold'>0123455678</h1>
                                <label htmlFor="telephone" className='p-2 h-10 items-center'>
                                    <FaPencil className={'cursor-pointer text-lg'} />
                                </label>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="flex min-w-[150px] w-1/5 text-center items-center justify-center rounded-md shadow-xs bg-[#8BB78F] p-5 text-sm/6 font-semibold text-white hover:bg-[#6b9773] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2">
                        <p>Sauvegarder</p>
                    </button>

                </div>
            </div>
        </section>
        </>
     );
}

export default Profile;