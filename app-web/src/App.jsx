import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '../public/css/style.css'
import Abonnement from './Abonnement'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Abonnement />
    </>
  )
}

export default App
