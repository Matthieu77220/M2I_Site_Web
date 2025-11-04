import './css/style.css'
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

export default App;
