import { useState } from 'react'
import NavBar from './components/navBar'


function Dashboard() {
    const [open, setOpen] = useState(true)
    
    return ( 
        <>
            <div className='flex'>
                <NavBar open={open} setOpen={setOpen} /> {/* Passe en props les éléments du UseStat (open,setOpen) */}
            </div>
            <div className= {`duration-500 ${open ? "pl-60" : "pl-[72px]"}`}>
               <div></div>
            </div>
        </>
     );
}

export default Dashboard;
<>

</>