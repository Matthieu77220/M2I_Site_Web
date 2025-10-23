import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '../public/css/style.css'
import NavBar from './components/navBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
    </>
  )
}

export default App
