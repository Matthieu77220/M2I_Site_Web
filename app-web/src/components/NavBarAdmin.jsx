import {useNavigate} from 'react-router';


import { MdMenuOpen } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { CiDumbbell } from "react-icons/ci";
import { GiSoccerField } from "react-icons/gi";
import { FaUsersCog } from "react-icons/fa";;
import { MdOutlineLogout } from "react-icons/md";

import axios from "axios";


function NavBarAdmin({open, setOpen}) {

    const navigate = useNavigate();

    async function deconnexionFunction() {

      try {
        await axios.post("http://localhost:3000/api/auth/deconnexion", {}, {withCredentials: true})
        navigate('/Connexion')

      }catch (err) {
        console.log(err)
      }
    
  }

    return (  
        <>

            {/*Navbar*/}
            <nav className={`fixed left-0 top-0 h-screen p-2 flex flex-col duration-500 bg-[#7CA982] text-white ${open ? 'w-60' : 'w-18'}`}>

                {/* Menu Burger */}
                <div className='p-2 h-20 items-center'>
                  <MdMenuOpen size={34} className={`duration-500 cursor-pointer ${!open && ' rotate-180'}`} onClick={() => setOpen(!open)} />
                </div>

                {/* Icon */}
                <ul className='flex flex-col'>

                  <li onClick={() =>{ navigate("/PannelAdmin")}} className='px-3 py-2 my-2 hover:bg-green-800 hover:rounded-md cursor-pointer flex gap-5 items-center relative'>
                    <div><MdOutlineDashboard size={30} /></div>
                    <p className={`${!open && 'w-0 translate-x-24'} overflow-hidden duration-700 font-semibold `}>Dashboard</p>
                  </li>

                  <li  onClick={() =>{navigate("/AdminStats")}}className='px-3 py-2 my-2 hover:bg-green-800 hover:rounded-md cursor-pointer flex gap-5 items-center relative'>
                    <div><FaUserCircle size={30} /></div>
                    <p className={`${!open && 'w-0 translate-x-24'} overflow-hidden duration-900 font-semibold `}>Statistiques</p>
                  </li>

                  <li onClick={() =>{navigate('/Equipements')}} className='px-3 py-2 my-2 hover:bg-green-800 hover:rounded-md cursor-pointer flex gap-5 items-center relative'>
                    <div><CiDumbbell size={30} /></div>
                    <p className={`${!open && 'w-0 translate-x-24'} overflow-hidden duration-1100 font-semibold `}>Equipements</p>
                  </li>

                  <li onClick={() =>{navigate('/AdminTerrains')}} className='px-3 py-2 my-2 hover:bg-green-800 hover:rounded-md cursor-pointer flex gap-5 items-center relative'>
                    <div><GiSoccerField size={30} /></div>
                    <p className={`${!open && 'w-0 translate-x-24'} overflow-hidden duration-1300  font-semibold `}>Terrains</p>
                  </li>

                  <li onClick={() =>{navigate("/AdminUsers")}} className='px-3 py-2 my-2 hover:bg-green-800 hover:rounded-md cursor-pointer flex gap-5 items-center relative'>
                    <div><FaUsersCog size={30} /></div>
                    <p className={`${!open && 'w-0 translate-x-24'} overflow-hidden duration-1500 font-semibold`}>Utilisateurs</p>
                  </li>
                </ul>

                {/* footer */}
                <div className='flex absolute bottom-0 items-center mt-5 mb-5 gap-5 w-55 p-2 cursor-pointer hover:bg-green-800 hover:[max-width:calc(100%-1rem)] hover:rounded-md' onClick={() => deconnexionFunction()}>
                  <div className="flex gap-5"><MdOutlineLogout size={30} />
                    <p className={`${!open && 'w-0 translate-x-24'} overflow-hidden duration-1500 font-semibold`}>Déconnexion</p>
                  </div>
                </div>
            </nav>

            {/*PannelAdmin*/}


        </>
    );
}

export default NavBarAdmin;