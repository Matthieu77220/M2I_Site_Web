<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/style.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./Home.jsx"
import FormulaireInscription from "./FormulaireInscription.jsx"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/FormulaireInscription" element={<FormulaireInscription />} />
        </Routes>
      </Router>
=======
import { useState } from "react";
import Connexion from "./Connexion";
import "../public/css/style.css";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <>
      {isLogged ? (
        <h1 className="bg-red-500 text-white text-center p-5 text-3xl">
          Connexion réussie !!
        </h1>
      ) : (
        <Connexion onLogin={setIsLogged} />
      )}
>>>>>>> connexion
    </>
  );
}

<<<<<<< HEAD
export default App
=======
export default App;
>>>>>>> connexion
