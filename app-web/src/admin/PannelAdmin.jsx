import {useState} from 'react';
import NavBarAdmin from '../components/NavBarAdmin';

function PannelAdmin() {
    const [open, setOpen] = useState(true)
    
    return (  
        <>
            <div className='flex'>
                <NavBarAdmin open={open} setOpen={setOpen} /> {/* Passe en props les éléments du UseStat (open,setOpen) */}
            </div>
        </>
    );
}

export default PannelAdmin;