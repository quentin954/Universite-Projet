import React, {useEffect} from "react";
import "../css/custom_modal.css";

const CustomModal = ({ isVisible, title, onClose, onSubmit, currentQuantity, actionType }) => {
  const [inputValue, setInputValue] = React.useState(0);

  useEffect(() => {
    if (isVisible) {
      // Reset the input value to 0 whenever the modal becomes visible
      setInputValue(0);
    }
  }, [isVisible]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      if (actionType === "remove" && currentQuantity) {
        // Ne pas permettre de supprimer plus que la quantité possédée
        setInputValue(Math.min(value, currentQuantity));
      } else {
        setInputValue(value);
      }
    }
  };

  const handleSubmit = () => {
    if (!isNaN(inputValue) && inputValue > 0) {
      onSubmit(Number(inputValue));
    } else {
      alert("Veuillez entrer un nombre valide supérieur à 0.");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <h2>{title}</h2>
        {currentQuantity !== undefined && (
          <p className="current-quantity">
            Vous possédez actuellement {currentQuantity} exemplaire(s)
          </p>
        )}
        <input
          type="number"
          className="modal-input"
          placeholder="Entrez le nombre"
          value={inputValue}
          onChange={handleInputChange}
          min="0"
          max={actionType === "remove" ? currentQuantity : undefined}
        />
        <div className="modal-buttons">
          <button className="btn cancel" onClick={onClose}>
            Annuler
          </button>
          <button 
            className="btn confirm" 
            onClick={handleSubmit}
            disabled={inputValue <= 0 || (actionType === "remove" && inputValue > currentQuantity)}
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;