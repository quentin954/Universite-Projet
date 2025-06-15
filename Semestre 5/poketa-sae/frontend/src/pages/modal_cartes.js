import React, { useState, useEffect } from "react";
import CustomModal from "../pages/custom_modal.js";
import '../css/modal_cartes.css';


const ModalComponent = ({ 
  selectedCard, 
  extensions, 
  closeImage, 
  handleAddToCollection, 
  handleRemoveFromCollection,
  currentIndex,
  showNextImage,
  showPrevImage,
  cardQuantity,
  isAuthenticated,
  findCardInCollection
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [actionType, setActionType] = useState("");
  
  const existingCard = selectedCard ? findCardInCollection(selectedCard) : null;

  const handleModalSubmit = async (quantity) => {
    if (actionType === "add") {
      await handleAddToCollection(quantity);
    } else if (actionType === "remove") {
      await handleRemoveFromCollection(quantity);
      if (!findCardInCollection(selectedCard)) {
        closeImage();
      }
    }
    setModalVisible(false);
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

  if (!selectedCard) return null;

  return (
    <div className="image-modal">
      <div className="modal-content">
        <div className="modal-left">
          {/* Colonne gauche avec l'image et le nom */}
          <h3>{selectedCard.name}</h3>
          <div className="image-container">
            <img src={selectedCard.image} alt="Carte agrandie" className="modal-image" />
            {existingCard && existingCard.quantity > 0 && (
              <span className="card-quantity">X{existingCard.quantity}</span>
            )}
          </div>
        </div>

        {/* Barre noire au milieu */}
        <div className="modal-divider"></div>

        <div className="modal-right">
          {/* Colonne droite avec les détails de la carte */}
          <h2>Détails de la carte</h2>
          <p><strong>Numéro du Pokédex:</strong> {selectedCard.numPok}</p>
          <p><strong>Rareté:</strong> {selectedCard.rarity}</p>
          <p><strong>Série:</strong> {extensions[0].name}</p>
          <p><strong>Type:</strong> {renderTypes(selectedCard.type)}</p>
          <button className="close-button" onClick={closeImage}></button>

          {isAuthenticated ? (
            <>
              <button className="bouton ajouter" onClick={() => {
                setModalTitle("Combien de cartes voulez-vous ajouter ?");
                setActionType("add");
                setModalVisible(true);
              }}>
                Ajouter à sa collection
              </button>
              {existingCard && existingCard.quantity > 0 && (
                <button className="bouton supprimer" onClick={() => {
                  setModalTitle("Combien de cartes voulez-vous supprimer ?");
                  setActionType("remove");
                  setModalVisible(true);
                }}>
                  Supprimer de sa collection
                </button>
              )}
            </>
          ) : (
            <p className="auth-message">
              Connectez-vous pour gérer votre collection
            </p>
          )}

          <CustomModal
            isVisible={isModalVisible}
            title={modalTitle}
            onClose={() => setModalVisible(false)}
            onSubmit={handleModalSubmit}
            currentQuantity={existingCard?.quantity || 0}
            actionType={actionType}
          />
        </div>

        <button className="nav-button left" onClick={showPrevImage}>&#10094;</button>
        <button className="nav-button right" onClick={showNextImage}>&#10095;</button>
      </div>
    </div>
  );
};

export default ModalComponent;
