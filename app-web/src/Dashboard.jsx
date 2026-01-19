import { useState } from 'react'
import { useNavigate } from 'react-router'
import NavBar from './components/navBar'

function Dashboard() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(true)
    const [activeTab, setActiveTab] = useState('licence') // gère le choix entre Licence et Frais

    return (
        <>
            <div className='flex'>
                <NavBar open={open} setOpen={setOpen} />
            </div>

            <div className={`duration-500 ${open ? "pl-60" : "pl-[72px]"} min-h-screen bg-[#f3f8f4]`}>
                {/* --- En-tête du tableau de bord --- */}
                <div className="">

                    {/* --- Boutons pour changer de tableau --- */}
                    <div className="h-screen w-full flex flex-col min-md:flex-row items-center justify-center gap-16">
                        <button
                            onClick={() => navigate('/AdherentLicence')}
                            className={`w-lg h-80 max-w-1/2 max-h-2/5 rounded-2xl m-5 font-bold text-2xl cursor-pointer shadow-lg transition-transform ${activeTab === 'licence'
                                    ? 'bg-[#7CA982] text-white scale-105'
                                    : 'bg-gray-200 hover:scale-105'
                                }`}
                        >
                            Licence
                        </button>

                        <button
                            onClick={() => navigate('/Abonnement')}
                            className={`w-lg h-80 max-w-1/2 max-h-2/5 rounded-2xl m-5 font-bold text-2xl cursor-pointer shadow-lg transition-transform ${activeTab === 'abonnement'
                                    ? 'bg-[#7CA982] text-white scale-105'
                                    : 'bg-gray-200 hover:scale-105'
                                }`}
                        >
                            Abonnement
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard