import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '../public/css/style.css'
import FormulaireInscription from "./FormulaireInscription";

function App() {
  return (
    <div className='flex flex-col justify-center lg:h-screen bg-[#5E856B]'>
      <FormulaireInscription />
    </div>
  )
}

export default App
