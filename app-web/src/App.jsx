import './css/style.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// Import des pages
import Home from "./Home.jsx"
import FormulaireInscription from "./FormulaireInscription.jsx"
import Connexion from "./Connexion.jsx";
import TestPage from "./TestPage.jsx"
import PannelAdmin from './admin/PannelAdmin.jsx';
import AdminTerrains from './admin/AdminTerrains.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/FormulaireInscription" element={<FormulaireInscription />} />
          <Route path="/Connexion" element={<Connexion />} />
          <Route path="/TestPage" element={<TestPage />} />
          <Route path='/PannelAdmin'element={<PannelAdmin />} />
          <Route path='/AdminTerrains' element={<AdminTerrains />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
