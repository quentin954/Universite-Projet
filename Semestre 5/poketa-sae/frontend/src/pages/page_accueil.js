import React, { useState, useEffect } from 'react';
import '../css/header.css';
import '../css/accueil.css';
import Header from '../pages/header.js';
import { useNavigate } from 'react-router-dom'; 

import pok1 from '../img/pok1.jpg';  
import pok2 from '../img/pok2.jpg'; 
import pok3 from '../img/pok3.jpg'; 

const Accueil = () => {
  const images = [pok1, pok2, pok3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalActive, setIsModalActive] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); 
  }, [images.length]);

  const openModal = () => {
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalActive(false);
  };

  const overlayClick = (event) => {
    if (event.target === document.getElementById('Acc-modalOverlay')) {
      closeModal();
    }
  };

  // Fonction modifiée pour afficher le modal avant de naviguer
  const goToCollection = () => {
    openModal();
  };

  const goToInscription = () => {
    navigate('/inscription');
  };

  const goToConnection = () => {
    navigate('/connection');
  };

  const goToPokédex = () => {
    navigate('/Pokédex'); 
  };

  return (
    <div className='accueil'>
      <Header />

      {/* Modal */}
      <div
        id="Acc-modalOverlay"
        className={`Acc-modal-overlay ${isModalActive ? 'active' : ''}`}
        onClick={overlayClick}
      >
        <div className="Acc-modal">
          <button className="Acc-close-btn" onClick={closeModal}>
            &times;
          </button>
          <h2>\ SE PRÉPARER À JOUER \</h2>
          <p>Vous devez être connecté pour accéder à votre collection.</p>
          <div className="Acc-modal-buttons">
            <button className="Acc-create" onClick={goToInscription}>CRÉER UN COMPTE</button>
            <button className="Acc-login" onClick={goToConnection}>CONNEXION</button>
          </div>
        </div>
      </div>

      {/* Section principale */}
      <div className="background">
        <div className="background-content">
          <h1 className="header__title">L'ENFANCE A SON <br/>RETOUR</h1>
          <p className="lead">Revivez votre enfance en collectionnant des cartes Pokémon. Redécouvrez la magie et l'excitation de chaque nouvelle acquisition, et enrichissez votre collection avec des cartes rares et légendaires.</p>
        </div>
      </div>

      {/* Custom container */}
      <div className="custom-container">
        <div className="custom-text-section">
          <h1 className="custom-title">Collectionner des Cartes Pokémon</h1>
          <p className="custom-description">Plongez dans l'univers fascinant des cartes Pokémon et découvrez l'excitation de collectionner vos Pokémon favoris. Que vous soyez un collectionneur passionné ou un nouveau venu, chaque carte possède son histoire unique et sa rareté. Échangez, collectionnez et construisez votre propre équipe de Pokémon pour dominer les arènes et revivre les aventures emblématiques du monde Pokémon.</p>
        </div>
        <div className="custom-image-section">
          <img
            id="image"
            className="custom-image"
            src={images[currentImageIndex]}
            alt="Changement dynamique"
            width="300"
          />
        </div>
      </div>

      {/* Bouton qui ouvre le modal */}
      <button className="go-to-collection-btn" onClick={goToCollection}>
        Accéder à la Collection
      </button>
    </div>
  );
};

export default Accueil;
