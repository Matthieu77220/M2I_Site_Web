import { useNavigate } from "react-router";

// Icon react 
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { FaIdCard } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import { CiSettings } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";
import { GiSoccerField } from "react-icons/gi";
import { RiMoneyEuroCircleFill } from "react-icons/ri";

import axios from "axios";



function NavBar({ open, setOpen }) {// Récupération des useStat depuis le parent

  const navigate = useNavigate();

  async function deconnexionFunction() {

    try {
      await axios.post("/api/auth/deconnexion", {}, { withCredentials: true })
      navigate('/Connexion')

    } catch (err) {
      console.log(err)
    }

  }

  return (
    <>
      <nav className={`fixed left-0 top-0 h-screen p-2 flex flex-col duration-500 bg-[#7CA982] text-white ${open ? 'w-60' : 'w-18'}`}>

        {/* Menu Burger */}
        <div className='p-2 h-20 items-center'>
          <MdMenuOpen size={34} className={`duration-500 cursor-pointer ${!open && ' rotate-180'}`} onClick={() => setOpen(!open)} />
        </div>

        {/* Icon */}
        <ul className='flex flex-col'>

          <li className='px-3 py-2 my-2 hover:bg-green-800 hover:rounded-md cursor-pointer flex gap-5 items-center relative'
            onClick={() => navigate('/Dashboard')}>
            <div><MdOutlineDashboard size={30} /></div>
            <p className={`${!open && 'w-0 translate-x-24'} overflow-hidden duration-700 font-semibold `}>Dashboard</p>
          </li>

          <li className='px-3 py-2 my-2 hover:bg-green-800 hover:rounded-md cursor-pointer flex gap-5 items-center relative'
            onClick={() => navigate('/Abonnement')}>
            <div><RiMoneyEuroCircleFill size={30} /></div>
            <p className={`${!open && 'w-0 translate-x-24'} overflow-hidden duration-900 font-semibold `}>Abonnement</p>
          </li>

          <li className='px-3 py-2 my-2 hover:bg-green-800 hover:rounded-md cursor-pointer flex gap-5 items-center relative'
            onClick={() => navigate('/AdherentLicence')}>
            <div><FaIdCard size={30} /></div>
            <p className={`${!open && 'w-0 translate-x-24'} overflow-hidden duration-900 font-semibold `}>Licence</p>
          </li>

          <li className='px-3 py-2 my-2 hover:bg-green-800 hover:rounded-md cursor-pointer flex gap-5 items-center relative'
            onClick={() => navigate('/Statistique')}>
            <div><ImStatsBars size={30} /></div>
            <p className={`${!open && 'w-0 translate-x-24'} overflow-hidden duration-1100 font-semibold `}>Statistique</p>
          </li>

          <li className='px-3 py-2 my-2 hover:bg-green-800 hover:rounded-md cursor-pointer flex gap-5 items-center relative'
            onClick={() => navigate('/Terrain')}>
            <div><GiSoccerField size={30} /></div>
            <p className={`${!open && 'w-0 translate-x-24'} overflow-hidden duration-1100 font-semibold `}>Terrain</p>
          </li>

          <li className='px-3 py-2 my-2 hover:bg-green-800 hover:rounded-md cursor-pointer flex gap-5 items-center relative'
            onClick={() => navigate('/profile')}>
            <div><CiSettings size={30} /></div>
            <p className={`${!open && 'w-0 translate-x-24'} overflow-hidden duration-1500 font-semibold`}>Paramètre</p>
          </li>
        </ul>

        {/* footer */}
        <div className='flex absolute bottom-0 items-center mt-5 mb-5 gap-5 w-55 p-2 cursor-pointer hover:bg-green-800 hover:[max-width:calc(100%-1rem)] hover:rounded-md' onClick={() => deconnexionFunction()}>
          <div className="flex gap-5"><MdOutlineLogout size={30} />
            <p className={`${!open && 'w-0 translate-x-24'} overflow-hidden duration-1500 font-semibold`}>Déconnexion</p>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
