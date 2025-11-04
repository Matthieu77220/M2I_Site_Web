<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/style.css'
=======
>>>>>>> dbd2d801980461e20e69e194931be728becdcd08
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import './css/style.css'

// Import des pages
import Home from "./Home.jsx"
import FormulaireInscription from "./FormulaireInscription.jsx"
import Connexion from "./Connexion.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/FormulaireInscription" element={<FormulaireInscription />} />
          <Route path="/Connexion" element={<Connexion />} />
        </Routes>
      </Router>
    </>
  );
}

<<<<<<< HEAD
export default App
=======
export default App;
>>>>>>> dbd2d801980461e20e69e194931be728becdcd08
