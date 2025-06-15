import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../css/pokédex.css";
import Header from './header.js'
import Filtre from "./filtre.js"; 
import ModalComponent from './modal_cartes.js';
import CustomModal from './custom_modal.js';
import { useAuth } from '../hooks/useAuth';

const SearchResults = () => {
  const location = useLocation();
  const searchResults = location.state?.results || [];
  const searchTerm = location.state?.searchTerm || '';
  const { 
    user, 
    handleGetUserCollection,
    handleAddCardToCollection,
    handleUpdateCardQuantity,
    handleDeleteCardFromCollection
  } = useAuth();

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectedElements, setSelectedElements] = useState([]);
  const [selectedRarities, setSelectedRarities] = useState([]);
  const [availableRarities, setAvailableRarities] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [actionType, setActionType] = useState("");
  const [userCollection, setUserCollection] = useState(null);

  // Initialiser les raretés disponibles à partir des résultats de recherche
  React.useEffect(() => {
    const allRarities = new Set();
    searchResults.forEach(bloc => {
      bloc.extensions.forEach(ext => {
        ext.cards.forEach(card => {
          if (card.rarity) allRarities.add(card.rarity);
        });
      });
    });
    setAvailableRarities([...allRarities]);
  }, [searchResults]);

  // Charger la collection de l'utilisateur
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

  // Fonction pour trouver une carte dans la collection
  const findCardInCollection = (card) => {
    if (!userCollection?.cards || !card) return null;
    return userCollection.cards.find(c => 
      c.card.name === card.name && 
      c.card.extension === card.extension
    );
  };

  // Filtrage des cartes
  const filteredCards = React.useMemo(() => {
    const allCards = [];
    searchResults.forEach(bloc => {
      bloc.extensions.forEach(ext => {
        ext.cards.forEach(card => {
          allCards.push({
            ...card,
            extension: ext.Code,
            extensionName: ext.name,
            bloc: bloc.name,
            blocId: bloc._id,
            symbol: ext.symbol
          });
        });
      });
    });

    return allCards.filter(card => {
      const matchesElement = selectedElements.length === 0 || 
        card.type.some((t) => selectedElements.includes(t));
      const matchesRarity = selectedRarities.length === 0 || 
        selectedRarities.includes(card.rarity);
      return matchesElement && matchesRarity;
    });
  }, [searchResults, selectedElements, selectedRarities]);

  const handleCardClick = (card, index) => {
    if (card) {
      setSelectedCard(card);
      setCurrentIndex(index);
    }
  };

  const closeImage = () => {
    setSelectedCard(null);
    setCurrentIndex(null);
  };

  const showNextImage = () => {
    if (filteredCards.length === 0) return;
    const nextIndex = (currentIndex + 1) % filteredCards.length;
    setCurrentIndex(nextIndex);
    setSelectedCard(filteredCards[nextIndex]);
  };

  const showPrevImage = () => {
    if (filteredCards.length === 0) return;
    const prevIndex = (currentIndex - 1 + filteredCards.length) % filteredCards.length;
    setCurrentIndex(prevIndex);
    setSelectedCard(filteredCards[prevIndex]);
  };

  const handleAddToCollection = async (quantity) => {
    if (!selectedCard) return;
    
    try {
      const existingCard = findCardInCollection(selectedCard);
      
      if (existingCard) {
        // Mettre à jour la quantité si la carte existe déjà
        const newQuantity = existingCard.quantity + quantity;
        const cardIndex = userCollection.cards.findIndex(c => 
          c.card.name === existingCard.card.name && 
          c.card.extension === existingCard.card.extension
        );
        const response = await handleUpdateCardQuantity(cardIndex, newQuantity);
        if (response.success) {
          setUserCollection(response.data);
        }
      } else {
        // Préparer la carte dans le bon format pour l'ajout initial
        const cardToAdd = {
          name: selectedCard.name,
          type: selectedCard.type,
          rarity: selectedCard.rarity,
          features: selectedCard.features || [],
          numPok: selectedCard.numPok,
          image: selectedCard.image,
          extension: selectedCard.extension,
          bloc: selectedCard.blocId
        };

        // D'abord ajouter la carte (quantité 1 par défaut)
        const addResponse = await handleAddCardToCollection(cardToAdd);
        
        if (addResponse.success && quantity > 1) {
          // Si la quantité demandée est supérieure à 1, mettre à jour la quantité
          const cardIndex = addResponse.data.cards.findIndex(c => 
            c.card.name === selectedCard.name && 
            c.card.extension === selectedCard.extension
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

      const cardIndex = userCollection.cards.findIndex(c => 
        c.card.name === existingCard.card.name && 
        c.card.extension === existingCard.card.extension
      );

      if (quantity >= existingCard.quantity) {
        // Supprimer complètement la carte
        const response = await handleDeleteCardFromCollection(cardIndex);
        if (response.success) {
          setUserCollection(response.data);
          closeImage();
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

  const handleModalSubmit = (quantity) => {
    if (actionType === "add") {
      console.log(`Adding ${quantity} of card ID ${selectedCard.numPok} to the collection.`);
    } else if (actionType === "remove") {
      console.log(`Removing ${quantity} of card ID ${selectedCard.numPok} from the collection.`);
    }
    setModalVisible(false);
  };

  return (
    <div className="page-fond">
      <Header />
      <div className="les-cartes-container">
        <h2 className="search-results-title">
          Résultats pour "{searchTerm}"
          {filteredCards.length === 0 ? (
            <p>Aucune carte trouvée</p>
          ) : (
            <p>{filteredCards.length} carte(s) trouvée(s)</p>
          )}
        </h2>

        {filteredCards.length > 0 && (
          <>
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
                  key={`${card.extension}-${card.numPok}`}
                  className="carte-slot" 
                  onClick={() => handleCardClick(card, index)}
                >
                  <div className="carte-info">
                    <img src={card.image} alt={card.name} />
                    <p>{card.name}</p>
                    <div className="extension-info">
                      <img src={card.symbol} alt={card.extensionName} className="symbol-icon" />
                      <span>{card.extensionName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {selectedCard && (
          <ModalComponent 
            selectedCard={selectedCard} 
            extensions={[{ name: selectedCard.extensionName }]}
            closeImage={closeImage} 
            handleAddToCollection={handleAddToCollection}
            handleRemoveFromCollection={handleRemoveFromCollection}
            currentIndex={currentIndex}
            showNextImage={showNextImage}
            showPrevImage={showPrevImage}
            isAuthenticated={!!user}
            findCardInCollection={findCardInCollection}
            cardQuantity={findCardInCollection(selectedCard)?.quantity}
          />
        )}

        {isModalVisible && (
          <CustomModal
            title={modalTitle}
            onClose={() => setModalVisible(false)}
            onSubmit={handleModalSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default SearchResults; 