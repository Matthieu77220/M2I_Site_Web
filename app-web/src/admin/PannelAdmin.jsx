import {useState} from 'react';
import { useNavigate } from 'react-router';
import NavBarAdmin from '../components/NavBarAdmin';

function PannelAdmin() {
    const [open, setOpen] = useState(true)
    
    return (  
        <>       
            <div className='flex'>
                <NavBarAdmin open={open} setOpen={setOpen} /> {/* Passe en props les éléments du UseStat (open,setOpen) */}
            </div>

            <h1 className="text-center text-5xl font-spartan text-[#7CA982] underline decoration-solid mt-10 pb-20">Dashboard Administrateur</h1>


            <section className="flex flex-col justify-center space-y-40">
                <section className="flex justify-center space-x-50">
                    <div className="bg-[#7CA982] border-1 p-20">
                        <h2>Profile</h2>
                    </div>
                    
                    <div className="bg-white border-1 p-20">
                        <h2>Equipements</h2>
                    </div>
                </section>

                <section className="flex justify-center space-x-50">
                    <div className="bg-white border-1 p-20">
                        <h2>Terrains</h2>
                    </div>

                    <div className="bg-[#7CA982] border-1 p-20">
                        <h2>Utilisateurs</h2>
                    </div>
                </section>
            </section>

        </>
    );
}

export default PannelAdmin;