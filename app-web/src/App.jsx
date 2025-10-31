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
    </>
  );
}

export default App;
