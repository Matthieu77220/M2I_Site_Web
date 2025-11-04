// Icon react 
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { FaIdCard } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import { IoLogIn } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";

// a supprimer plus tard pour remplacer par PDP
import { FaUserCircle } from "react-icons/fa";

function NavBar({open,setOpen}) { // Récupération des useStat depuis le parent

    return (
        <>
            <nav className={`fixed left-0 top-0 h-screen p-2 flex flex-col duration-500 bg-[#7CA982] text-white ${open ? 'w-60' : 'w-18'}`}>

                {/* Menu Burger */}
                <div className='p-2 h-20 items-center'>
                  <MdMenuOpen size={34} className={`duration-500 cursor-pointer ${!open && ' rotate-180'}`} onClick={() => setOpen(!open)} />
                </div>

                {/* Icon */}
                <ul className='flex flex-col'>

                  <li className='px-3 py-2 my-2 hover:bg-green-800 hover:rounded-md cursor-pointer flex gap-5 items-center relative'>
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

                  <li className='px-3 py-2 my-2 hover:bg-green-800 hover:rounded-md cursor-pointer flex gap-5 items-center relative'>
                    <div><CiSettings size={30} /></div>
                    <p className={`${!open && 'w-0 translate-x-24'} overflow-hidden duration-1500 font-semibold`}>Paramètre</p>
                  </li>
                </ul>

                {/* footer */}
                <div className='flex absolute bottom-0 items-center gap-5 p-3'>
                  <div><FaUserCircle size={30} /></div> {/* A remplacer plus tard par l'img */}
                  <div className={`leading-5 ${!open && 'w-0 translate-x-24'} duration-2000 overflow-hidden`}>
                    <p className="text-xs">Martin</p>
                    <span>Dubois</span> {/* A changer plus tard pour remplacer par PDP et nom d'utilisateur */}
                  </div>
                </div>
            </nav>
        </>
     );
}

export default NavBar;