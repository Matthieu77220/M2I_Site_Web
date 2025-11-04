import './css/style.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// Import des pages
import Home from "./Home.jsx"
import FormulaireInscription from "./FormulaireInscription.jsx"
import Connexion from "./Connexion.jsx";
import TestPage from "./TestPage.jsx"
import PannelAdmin from './PannelAdmin.jsx';
import Profile from "./Profile.jsx";
import ModifierProfile from "./ModifierProfile.jsx";
import MotDePasseOublie from "./MotDePasseOublie.jsx";

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
          <Route path='/Profile'element={<Profile />} />
          <Route path='/ModifierProfile'element={<ModifierProfile />} />
          <Route path='/MotDePasseOublie'element={<MotDePasseOublie />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
