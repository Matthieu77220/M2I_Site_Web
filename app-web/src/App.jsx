import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '../public/css/style.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <section>
     <h1 className="text-[#7CA982] text-3xl font-bold">M2I Le five entre amis !</h1>
    </section>

    <section>
      <p className="text-[#7CA982] text-5xl font-bold">Un ballon, <br /> des potes, <br />des émotions:<br /> rejoins le match !</p>
    </section>

    <section>
      <button 
      type="button"
      className="bg-linear-to-r from-[#7CA982] to-[#a4ebad] rounded-xl ml-10 text-white p-1"
      >
        Rejoins-nous !
      </button>
    </section>

    <section>
      <img src="../public/img/landing-img.jpeg" alt="football is life" />
    </section>
    </>
  )
}

export default App
