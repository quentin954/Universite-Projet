import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/pokédex.css";
import Poketa from "../img/Poketa.png";
import CustomModal from '../pages/custom_modal.js'
import Header from '../pages/header.js'
import Filtre from "../pages/filtre.js"; 
import '../css/filtre.css';
import FiltreBloc from '../pages/filtreBloc'; 
import ModalComponent from '../pages/modal_cartes.js';
import { useAuth } from '../hooks/useAuth';

const Pokédex = () => {
  const navigate = useNavigate();
  const { 
    handleGetAllBlocksAndExtensions, 
    handleGetExtensionById, 
    handleGetUserCollection,
    handleAddCardToCollection,
    handleDeleteCardFromCollection,
    handleUpdateCardQuantity,
    user 
  } = useAuth();
  const initRef = useRef(false);
  
  const [selectedElements, setSelectedElements] = useState([]);
  const [selectedRarities, setSelectedRarities] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectedExtension, setSelectedExtension] = useState(null);
  const [isOpen, setIsOpen] = useState({});
  const [bloc, setBloc] = useState([]);
  const [currentExtension, setCurrentExtension] = useState(null);
  const [availableRarities, setAvailableRarities] = useState([]);
  const [userCollection, setUserCollection] = useState(null);

  // Chargement initial des blocs et extensions
  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      const initializePokédex = async () => {
        try {
          const response = await handleGetAllBlocksAndExtensions();
          if (response.success) {
            setBloc(response.data);
            if (response.data.length > 0 && response.data[0].extensions.length > 0) {
              const firstExtension = response.data[0].extensions[0];
              handleExtensionClick(firstExtension);
            }
          }
        } catch (error) {
          console.error("Erreur lors du chargement des blocs:", error);
        }
      };

      initializePokédex();
    }
  }, []);

  // Fonction pour gérer le clic sur l'extension
  const handleExtensionClick = async (extension) => {
    try {
      const response = await handleGetExtensionById(extension.Code);
      if (response.success) {
        setSelectedExtension(extension);
        setCurrentExtension(response.data);
        
        // Calcul des raretés uniques disponibles dans l'extension
        const uniqueRarities = [...new Set(response.data.cards.map(card => card.rarity))];
        setAvailableRarities(uniqueRarities);
        // Reset les raretés sélectionnées quand on change d'extension
        setSelectedRarities([]);
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l'extension:", error);
    }
  };

  const handleToggle = (setName) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [setName]: !prevState[setName]
    }));
  };

  // Filtrage des cartes
  const filteredCards = currentExtension?.cards?.filter((card) => {
    const matchesElement = selectedElements.length === 0 || 
      card.type.some((t) => selectedElements.includes(t));
    const matchesRarity = selectedRarities.length === 0 || 
      selectedRarities.includes(card.rarity);
    return matchesElement && matchesRarity;
  }) || [];

  const handleCardClick = (card, index) => {
    setSelectedCard(card);
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setSelectedCard(null);
    setCurrentIndex(null);
  };

  const showNextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredCards.length;
    setCurrentIndex(nextIndex);
    setSelectedCard(filteredCards[nextIndex]);
  };

  const showPrevImage = () => {
    const prevIndex = (currentIndex - 1 + filteredCards.length) % filteredCards.length;
    setCurrentIndex(prevIndex);
    setSelectedCard(filteredCards[prevIndex]);
  };

  const renderTypes = (types) => {
    return types.map((type, index) => {
      const className = `card-type type-${type.toLowerCase()}`;
      return (
        <span key={index} className={className}>
          {type}
        </span>
      );
    });
  };

  // Fonction pour trouver une carte dans la collection
  const findCardInCollection = (card) => {
    if (!userCollection?.cards || !card) return null;
    
    return userCollection.cards.find(c => 
      c.card.name === card.name && 
      c.card.extension === selectedExtension?.Code &&
      c.card.bloc === bloc.find(b => b.extensions.some(e => e.Code === selectedExtension?.Code))?._id
    );
  };

  const handleAddToCollection = async (quantity) => {
    if (!selectedCard) return;
    
    try {
      const existingCard = findCardInCollection(selectedCard);
      
      if (existingCard) {
        // Mettre à jour la quantité si la carte existe
        const newQuantity = existingCard.quantity + quantity;
        // Trouver l'index de la carte dans la collection
        const cardIndex = userCollection.cards.findIndex(c => 
          c.card.name === existingCard.card.name && 
          c.card.extension === existingCard.card.extension
        );
        const response = await handleUpdateCardQuantity(cardIndex, newQuantity);
        if (response.success) {
          setUserCollection(response.data);
        }
      } else {
        // Trouver le bloc correspondant à l'extension sélectionnée
        const currentBloc = bloc.find(b => 
          b.extensions.some(e => e.Code === selectedExtension.Code)
        );

        // Préparer l'objet carte sans la quantité
        const cardToAdd = {
          name: selectedCard.name,
          type: selectedCard.type,
          rarity: selectedCard.rarity,
          features: selectedCard.features,
          numPok: selectedCard.numPok,
          image: selectedCard.image,
          extension: selectedExtension.Code,
          bloc: currentBloc._id
        };

        // D'abord ajouter la carte
        const addResponse = await handleAddCardToCollection(cardToAdd);
        
        if (addResponse.success && quantity > 1) {
          // Si la quantité demandée est supérieure à 1, mettre à jour la quantité
          // Trouver l'index de la carte nouvellement ajoutée
          const cardIndex = addResponse.data.cards.findIndex(c => 
            c.card.name === selectedCard.name && 
            c.card.extension === selectedExtension.Code
          );
          
          const updateResponse = await handleUpdateCardQuantity(cardIndex, quantity);
          if (updateResponse.success) {
            setUserCollection(updateResponse.data);
          }
        } else if (addResponse.success) {
          setUserCollection(addResponse.data);
        }
      }
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la carte:', err);
    }
  };

  const handleRemoveFromCollection = async (quantity) => {
    if (!selectedCard) return;
    
    try {
      const existingCard = findCardInCollection(selectedCard);
      if (!existingCard) return;

      // Trouver l'index de la carte dans la collection
      const cardIndex = userCollection.cards.findIndex(c => 
        c.card.name === existingCard.card.name && 
        c.card.extension === existingCard.card.extension
      );

      if (quantity >= existingCard.quantity) {
        // Supprimer complètement la carte
        const response = await handleDeleteCardFromCollection(cardIndex);
        if (response.success) {
          setUserCollection(response.data);
        }
      } else {
        // Réduire la quantité
        const newQuantity = existingCard.quantity - quantity;
        const response = await handleUpdateCardQuantity(cardIndex, newQuantity);
        if (response.success) {
          setUserCollection(response.data);
        }
      }
    } catch (err) {
      console.error('Erreur lors de la suppression de la carte:', err);
    }
  };

  // Charger la collection de l'utilisateur si authentifié
  useEffect(() => {
    const loadUserCollection = async () => {
      if (user) {
        try {
          const response = await handleGetUserCollection();
          if (response.success) {
            setUserCollection(response.data);
          }
        } catch (error) {
          console.error('Erreur lors du chargement de la collection:', error);
        }
      }
    };

    loadUserCollection();
  }, [user]);

  return (
    <div className="page-fond">
      <Header />
      <div className="les-cartes-container">
        <FiltreBloc
          bloc={bloc}
          isOpen={isOpen}
          handleToggle={handleToggle}
          handleExtensionClick={handleExtensionClick}
        />
        
        {selectedExtension && (
          <div className="extension-container">
            <img
              src={selectedExtension.logo}
              className="extension-detail-logo"
              alt={selectedExtension.name}
            />
            <div className="extension-info">
              <p><strong>Date de sortie :</strong> {selectedExtension.releaseDate}</p>
              <p><strong>Nombre de cartes :</strong> {selectedExtension.nbCards}</p>
              <p><strong>Cartes secrètes :</strong> {selectedExtension.nbSecrets}</p>
            </div>
          </div>
        )}
        
        <Filtre
          selectedElements={selectedElements}
          setSelectedElements={setSelectedElements}
          selectedRarities={selectedRarities}
          setSelectedRarities={setSelectedRarities}
          availableRarities={availableRarities}
        />
        
        <div className="cartes-grid">
          {filteredCards.map((card, index) => (
            <div 
              key={index} 
              className="carte-slot" 
              onClick={() => handleCardClick(card, index)}
            >
              <img src={card.image} alt={card.name} />
              <p>{card.name}</p>
            </div>
          ))}
        </div>

        <ModalComponent 
          selectedCard={selectedCard} 
          extensions={[{ name: selectedExtension?.name }]} 
          closeImage={closeImage} 
          handleAddToCollection={handleAddToCollection} 
          handleRemoveFromCollection={handleRemoveFromCollection}
          currentIndex={currentIndex}
          showNextImage={showNextImage}
          showPrevImage={showPrevImage}
          isAuthenticated={!!user}
          userCollection={userCollection}
          findCardInCollection={findCardInCollection}
        />
      </div>
    </div>
  );
};

export default Pokédex;
