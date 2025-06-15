import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../css/collection.css';
import Poketa from '../img/Poketa.png';
import CustomModal from '../pages/custom_modal.js';
import Header from '../pages/header.js'
import Filtre from "../pages/filtre.js"; 
import '../css/filtre.css';
import FiltreBloc from '../pages/filtreBloc.js';
import "../css/filtreBloc.css"
import ModalComponent from '../pages/modal_cartes.js';


const Collection = () => {
  const navigate = useNavigate();
  const { 
    handleGetUserCollection, 
    handleAddCardToCollection,
    handleUpdateCardQuantity,
    handleDeleteCardFromCollection,
    handleGetAllBlocksAndExtensions,
    user 
  } = useAuth();

  const [collection, setCollection] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectedElements, setSelectedElements] = useState([]);
  const [selectedRarities, setSelectedRarities] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  const [selectedExtension, setSelectedExtension] = useState(null);
  const [availableRarities, setAvailableRarities] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [blocs, setBlocs] = useState([]);

  // Fonction pour trouver une carte dans la collection
  const findCardInCollection = (card) => {
    if (!collection?.cards || !card) return null;
    return collection.cards.find(c => 
      c.card.name === card.name && 
      c.card.extension === card.extension
    );
  };

  const handleAddToCollection = async (quantity) => {
    if (!selectedCard) return;
    
    try {
      const existingCard = findCardInCollection(selectedCard.card);
      
      if (existingCard) {
        // Mettre à jour la quantité si la carte existe
        const newQuantity = existingCard.quantity + quantity;
        const cardIndex = collection.cards.findIndex(c => 
          c.card.name === existingCard.card.name && 
          c.card.extension === existingCard.card.extension
        );
        const response = await handleUpdateCardQuantity(cardIndex, newQuantity);
        if (response.success) {
          setCollection(response.data);
        }
      }
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la carte:', err);
    }
  };

  const handleRemoveFromCollection = async (quantity) => {
    if (!selectedCard) return;
    
    try {
      const existingCard = findCardInCollection(selectedCard.card);
      if (!existingCard) return;

      const cardIndex = collection.cards.findIndex(c => 
        c.card.name === existingCard.card.name && 
        c.card.extension === existingCard.card.extension
      );

      if (quantity >= existingCard.quantity) {
        // Supprimer complètement la carte
        const response = await handleDeleteCardFromCollection(cardIndex);
        if (response.success) {
          // Mettre à jour la collection en retirant la carte supprimée
          const updatedCollection = {
            ...collection,
            cards: collection.cards.filter((_, index) => index !== cardIndex)
          };
          setCollection(updatedCollection);

          // Mettre à jour les blocs et extensions
          const updatedBlocs = blocs.map(bloc => {
            // Vérifier si le bloc contient des cartes
            const blocCards = updatedCollection.cards.filter(card => 
              card.card.bloc === bloc._id
            );

            if (blocCards.length === 0) {
              // Si le bloc n'a plus de cartes, on le retire
              return null;
            }

            // Filtrer les extensions qui ont encore des cartes
            const updatedExtensions = bloc.extensions.filter(extension =>
              updatedCollection.cards.some(card => 
                card.card.extension === extension.Code
              )
            );

            if (updatedExtensions.length === 0) {
              // Si le bloc n'a plus d'extensions, on le retire
              return null;
            }

            return {
              ...bloc,
              extensions: updatedExtensions
            };
          }).filter(Boolean); // Retirer les blocs null

          setBlocs(updatedBlocs);

          // Si l'extension actuelle n'a plus de cartes, la désélectionner
          if (selectedExtension && !updatedCollection.cards.some(card => 
            card.card.extension === selectedExtension.Code
          )) {
            setSelectedExtension(null);
          }

          closeImage();
        }
      } else {
        // Réduire la quantité
        const newQuantity = existingCard.quantity - quantity;
        const response = await handleUpdateCardQuantity(cardIndex, newQuantity);
        if (response.success) {
          setCollection(response.data);
        }
      }
    } catch (err) {
      console.error('Erreur lors de la suppression de la carte:', err);
    }
  };

  // Filtrage des cartes avec vérification supplémentaire
  const filteredCards = React.useMemo(() => {
    if (!collection?.cards) return [];
    
    return collection.cards.filter((cardData) => {
      const card = cardData.card;
      
      // Vérifier d'abord le filtre d'extension
      const matchesExtension = !selectedExtension || card.extension === selectedExtension.Code;
      
      // Puis les autres filtres
      const matchesElement = selectedElements.length === 0 || 
        card.type.some((t) => selectedElements.includes(t));
      const matchesRarity = selectedRarities.length === 0 || 
        selectedRarities.includes(card.rarity);
      
      return matchesExtension && matchesElement && matchesRarity;
    });
  }, [collection, selectedExtension, selectedElements, selectedRarities]);

  const handleCardClick = (cardData, index) => {
    setSelectedCard(cardData);
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

  // Chargement initial des blocs et de la collection
  useEffect(() => {
    const initializeCollection = async () => {
      try {
        // Charger la collection
        const collectionResponse = await handleGetUserCollection();
        if (collectionResponse.success) {
          setCollection(collectionResponse.data);
          if (collectionResponse.data?.cards) {
            const uniqueRarities = [...new Set(collectionResponse.data.cards.map(cardData => cardData.card.rarity))];
            setAvailableRarities(uniqueRarities);
          }

          // Charger les blocs et extensions
          const blocResponse = await handleGetAllBlocksAndExtensions();
          if (blocResponse.success) {
            const userExtensionCodes = new Set(collectionResponse.data.cards.map(cardData => cardData.card.extension));
            const filteredBlocs = blocResponse.data.map(bloc => ({
              ...bloc,
              extensions: bloc.extensions.filter(extension => userExtensionCodes.has(extension.Code))
            })).filter(bloc => bloc.extensions.length > 0);
            setBlocs(filteredBlocs);
          }
        }
      } catch (err) {
        setError("Erreur lors du chargement des données");
      }
    };

    if (user) {
      initializeCollection();
    }
  }, [user]);

  const renderTypes = (types) => {
    if (!types) return null; // If types is undefined or null, return null 
    return types.map((type, index) => {
      const className = `card-type type-${type.toLowerCase()}`;
      return (
        <span key={index} className={className}>
          {type}
        </span>
      );
    });
  };
  

  // Fonction pour gérer le clic sur l'extension
  const handleExtensionClick = (extension) => {
    // Si on clique sur l'extension déjà sélectionnée, on la désélectionne
    if (selectedExtension && selectedExtension.Code === extension.Code) {
      setSelectedExtension(null);
    } else {
      setSelectedExtension(extension);
    }
  };

  const handleToggle = (setName) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [setName]: !prevState[setName]
    }));
  };

  return (
    <div className="page-fond">
      <Header />
      <div className="les-cartes-container">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <FiltreBloc
          bloc={blocs}
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
          {filteredCards.map((cardData, index) => (
            <div
              key={index}
              className="carte-slot"
              onClick={() => handleCardClick(cardData, index)}
            >
              <img src={cardData.card.image} alt={cardData.card.name} />
              <p>{cardData.card.name}</p>
            </div>
          ))}
        </div>

        <ModalComponent 
          selectedCard={selectedCard?.card} 
          extensions={[{ 
            name: blocs
              .find(b => b.extensions.some(e => e.Code === selectedCard?.card?.extension))
              ?.extensions
              .find(e => e.Code === selectedCard?.card?.extension)
              ?.name || selectedCard?.card?.extension 
          }]}
          closeImage={closeImage} 
          handleAddToCollection={handleAddToCollection} 
          handleRemoveFromCollection={handleRemoveFromCollection}
          currentIndex={currentIndex}
          showNextImage={showNextImage}
          showPrevImage={showPrevImage}
          isAuthenticated={!!user}
          findCardInCollection={findCardInCollection}
          cardQuantity={selectedCard?.quantity}
        />
      </div>
    </div>
  );
};

export default Collection;
