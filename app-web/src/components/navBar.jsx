import { useNavigate } from "react-router";

// Icon react 
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { FaIdCard } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import { IoLogIn } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";



function NavBar({open,setOpen}) {// Récupération des useStat depuis le parent

  const navigate = useNavigate();

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
                       onClick={() =>{navigate('/Dashboard')}}>
                    <div><MdOutlineDashboard size={30} /></div>
                    <p className={`${!open && 'w-0 translate-x-24'} overflow-hidden duration-700 font-semibold `}>Dashboard</p>
                  </li>

                  <li className='px-3 py-2 my-2 hover:bg-green-800 hover:rounded-md cursor-pointer flex gap-5 items-center relative'>
                    <div><FaIdCard size={30} /></div>
                    <p className={`${!open && 'w-0 translate-x-24'} overflow-hidden duration-900 font-semibold `}>Licence</p>
                  </li>

                  <li className='px-3 py-2 my-2 hover:bg-green-800 hover:rounded-md cursor-pointer flex gap-5 items-center relative'>
                    <div><ImStatsBars size={30} /></div>
                    <p className={`${!open && 'w-0 translate-x-24'} overflow-hidden duration-1100 font-semibold `}>Statistique</p>
                  </li>

                  <li className='px-3 py-2 my-2 hover:bg-green-800 hover:rounded-md cursor-pointer flex gap-5 items-center relative'>
                    <div><IoLogIn size={30} /></div>
                    <p className={`${!open && 'w-0 translate-x-24'} overflow-hidden duration-1300  font-semibold `}>Inscription</p>
                  </li>

                  <li className='px-3 py-2 my-2 hover:bg-green-800 hover:rounded-md cursor-pointer flex gap-5 items-center relative'
                       onClick={() =>{navigate('/profile')}}>
                    <div><CiSettings size={30} /></div>
                    <p className={`${!open && 'w-0 translate-x-24'} overflow-hidden duration-1500 font-semibold`}>Paramètre</p>
                  </li>
                </ul>

                {/* footer */}
                <div className='flex absolute bottom-0 items-center mt-5 mb-5 gap-5 w-55 p-2 hover:bg-green-800 hover:rounded-md' onClick={() =>{navigate('/Connexion')}}>
                  <div className="flex gap-5"><MdOutlineLogout size={30} />
                    <p className={`${!open && 'w-0 translate-x-24'} overflow-hidden duration-1500 font-semibold`}>Déconnexion</p>
                  </div>
                </div>
            </nav>
        </>
     );
}

export default NavBar;