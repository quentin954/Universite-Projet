// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./pages/page_accueil";
import Connexion from './pages/page_connexion';
import Collection from "./pages/page_collection";
import Pokedex from "./pages/page_pokédex";
import Inscription from "./pages/page_inscription";
import ModifProfil from './pages/page_modifprofil';
import SaisieMailMDP from './pages/page_mailmotdepasse';
import Profil from './pages/page_profil';
import Admin from './pages/page_admin';
import VerifyEmail from './pages/page_verify_email';
import ResetPassword from './pages/page_resetpassword';
import SearchResults from './pages/search_results';




const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/admin" element={<Admin />} />

          <Route path="/" element={<Accueil />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/pokédex" element={<Pokedex />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/modifprofil" element={<ModifProfil />} />
          <Route path="/modifmdp" element={<SaisieMailMDP />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/search-results" element={<SearchResults />} />



        </Routes>
      </div>
    </Router>
  );
};

export default App;
