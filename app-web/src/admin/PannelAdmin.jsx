import {useState} from 'react';
import { Navigate, useNavigate } from 'react-router';
import NavBarAdmin from '../components/NavBarAdmin';

function PannelAdmin() {
    const [open, setOpen] = useState(true)
    const navigate = useNavigate();

    return (  
        <>       
            <div className='flex'>
                <NavBarAdmin open={open} setOpen={setOpen} /> {/* Passe en props les éléments du UseStat (open,setOpen) */}
            </div>

            <div className={`transition-all duration-300 ${open ? 'ml-64' : 'ml-20'}`}>
                <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-spartan text-[#7CA982] underline decoration-solid mt-10 pb-10 md:pb-20 px-4">
                    Dashboard Administrateur
                </h1>

                <section className="flex flex-col items-center justify-center space-y-8 md:space-y-12 lg:space-y-16 px-4 pb-10">
                  
                    <section className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 lg:gap-12 w-full max-w-5xl">
                        <button 
                            onClick={() => navigate("../StatsAdmin")}
                            className="bg-[#7CA982] border-2 border-gray-300 w-full md:w-80 lg:w-96 h-48 md:h-56 lg:h-64 rounded-2xl shadow-lg 
                                       transition-all duration-300 hover:scale-105 hover:-translate-y-2 
                                       active:scale-95 cursor-pointer hover:shadow-2xl flex items-center justify-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-white">Stats</h2>
                        </button>
                        
                        <button 
                            onClick={() => navigate('../Equipements')}
                            className="bg-white border-2 border-gray-300 w-full md:w-80 lg:w-96 h-48 md:h-56 lg:h-64 rounded-2xl shadow-lg 
                                       transition-all duration-300 hover:scale-105 hover:-translate-y-2 
                                       active:scale-95 cursor-pointer hover:shadow-2xl flex items-center justify-center">
                            <h2 className="text-2xl md:text-3xl font-bold">Equipements</h2>
                        </button>
                    </section>

                  
                    <section className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 lg:gap-12 w-full max-w-5xl">
                        <button 
                            onClick={() => navigate('../AdminTerrains')}
                            className="bg-white border-2 border-gray-300 w-full md:w-80 lg:w-96 h-48 md:h-56 lg:h-64 rounded-2xl shadow-lg 
                                       transition-all duration-300 hover:scale-105 hover:-translate-y-2 
                                       active:scale-95 cursor-pointer hover:shadow-2xl flex items-center justify-center">
                            <h2 className="text-2xl md:text-3xl font-bold">Terrains</h2>
                        </button>

                        <button 
                            onClick={() => navigate('../AdminUsers')}
                            className="bg-[#7CA982] border-2 border-gray-300 w-full md:w-80 lg:w-96 h-48 md:h-56 lg:h-64 rounded-2xl shadow-lg 
                                       transition-all duration-300 hover:scale-105 hover:-translate-y-2 
                                       active:scale-95 cursor-pointer hover:shadow-2xl flex items-center justify-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-white">Utilisateurs</h2>
                        </button>
                    </section>
                </section>
            </div>
        </>
    );
}

export default PannelAdmin;