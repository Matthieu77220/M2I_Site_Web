import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '../public/css/style.css'
import Contact from './contact.jsx' // Ton import déjà présent

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* Affichage du formulaire de contact */}
      <Contact />
    </>
  )
}

export default App
