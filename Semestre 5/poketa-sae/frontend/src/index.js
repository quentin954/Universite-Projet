import React from 'react';
import ReactDOM from 'react-dom/client'; // Utilisé pour les versions récentes de React (18+)
import './index.css'; // Si vous avez un fichier CSS global
import App from './App'; // Votre composant principal

// Création de la racine et rendu de l'application
const root = ReactDOM.createRoot(document.getElementById('root')); // Assurez-vous que 'root' correspond à l'ID de l'élément HTML dans votre index.html

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

