import './css/style.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router'

// Ajout de l'import
import TerrainPage from "./admin/TerrainPage.jsx";

// Import des pages
import Home from "./Home.jsx"
import FormulaireInscription from "./FormulaireInscription.jsx"
import Connexion from "./Connexion.jsx";
import TestPage from "./TestPage.jsx"
import PannelAdmin from './admin/PannelAdmin.jsx';
import Profile from "./Profile.jsx";
import ModifierProfile from "./ModifierProfile.jsx";
import ModifierMotDePasse from "./ModifierMotDePasse.jsx";
import Abonnement from "./Abonnement.jsx"
import Dashboard from './Dashboard.jsx';
import AdherentLicence from './AdherentLicence.jsx'
import Statistique from './Statistique.jsx'
import AdminTerrains from './admin/AdminTerrains.jsx';
import AdminUsers from './admin/AdminUsers.jsx';
import ProfileAdmin from './admin/ProfileAdmin.jsx';
import Equipements from './admin/Equipements.jsx';
import AdminStats from './admin/AdminStats.jsx';
import PannelSuperAdmin from './superadmin/PannelSuperAdmin.jsx';
import SuperAdminUsers from './superadmin/SuperAdminUsers.jsx';
import SuperAdminClubs from './superadmin/SuperAdminClubs.jsx';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Inscription" element={<FormulaireInscription />} />
          <Route path="/Connexion" element={<Connexion />} />
          <Route path="/TestPage" element={<TestPage />} />
          <Route path='/PannelAdmin'element={<PannelAdmin />} />
          <Route path='/Profile'element={<Profile />} />
          <Route path='/ModifierProfile'element={<ModifierProfile />} />
          <Route path='/ModifierMotDePasse'element={<ModifierMotDePasse />} />
          <Route path='/Abonnement'element={<Abonnement />} />
          <Route path='/Dashboard'element={<Dashboard />} />
          <Route path='/AdherentLicence'element={<AdherentLicence />} />
          <Route path='/Statistique'element={<Statistique />} />
          <Route path='/AdminTerrains' element={<AdminTerrains />} />
          <Route path='/AdminUsers' element={<AdminUsers />} />
          <Route path='/ProfileAdmin' element={<ProfileAdmin />} />
          <Route path='/Equipements' element={<Equipements />} />
          <Route path='/AdminStats' element={<AdminStats/>}/>
          <Route path='/PannelSuperAdmin' element={<PannelSuperAdmin/>}/>
          <Route path='/SuperAdminUsers' element={<SuperAdminUsers/>}/>
          <Route path='/SuperAdminClubs' element={<SuperAdminClubs/>}/>

          {/* Ajoute route des pages Terrains */}
          <Route path="/AdminTerrains/:id" element={<TerrainPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
