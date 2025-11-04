import { useState } from 'react'
import NavBar from './components/navBar'

function Dashboard() {
    const [open, setOpen] = useState(true)
    const [activeTab, setActiveTab] = useState('licence') // gère le choix entre Licence et Frais

    return (
        <>
            <div className='flex'>
                <NavBar open={open} setOpen={setOpen} />
            </div>

            <div className={`duration-500 ${open ? "pl-60" : "pl-[72px]"} min-h-screen bg-[#f3f8f4]`}>
                {/* --- En-tête du tableau de bord --- */}
                <div className="p-8">

                    {/* --- Boutons pour changer de tableau --- */}
                   <div className="h-[700px] w-full flex items-center justify-center gap-16 mb-12">
    <button
        onClick={() => setActiveTab('licence')}
        className={`w-[500px] h-[300px] rounded-2xl font-bold text-2xl shadow-lg transition-transform ${
            activeTab === 'licence'
                ? 'bg-[#7bd0a0] text-white scale-105'
                : 'bg-gray-200 hover:scale-105'
        }`}
    >
        Licence
    </button>

    <button
        onClick={() => setActiveTab('frais')}
        className={`w-[500px] h-[300px] rounded-2xl font-bold text-2xl shadow-lg transition-transform ${
            activeTab === 'frais'
                ? 'bg-[#7bd0a0] text-white scale-105'
                : 'bg-gray-200 hover:scale-105'
        }`}
    >
        Frais
    </button>
</div>


                    
                </div>
            </div>
        </>
    )
}

export default Dashboard