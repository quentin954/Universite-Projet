import React, { useState } from "react";

const Filtre = ({ 
  selectedElements, 
  setSelectedElements, 
  selectedRarities, 
  setSelectedRarities,
  availableRarities
}) => {
  const [isFilterBoardVisible, setFilterBoardVisible] = useState(false);

  const handleElementToggle = (element) => {
    setSelectedElements((prevSelected) => {
      if (prevSelected.includes(element)) {
        return prevSelected.filter((item) => item !== element);
      }
      return [...prevSelected, element];
    });
  };

  const handleRarityToggle = (rarity) => {
    setSelectedRarities((prevSelected) => {
      if (prevSelected.includes(rarity)) {
        return prevSelected.filter((item) => item !== rarity);
      }
      return [...prevSelected, rarity];
    });
  };

  return (
    <div>
      {/* Filter Button */}
      <div className="filter-button-container">
        <button
          className="filter-button"
          onClick={() => setFilterBoardVisible(!isFilterBoardVisible)}
        >
          {isFilterBoardVisible ? "Fermer le Filtre" : "Filtre"}
        </button>
      </div>

      {/* Filter Board */}
      <div className={`filter-board ${isFilterBoardVisible ? "visible" : ""}`}>
        <div className="filter-row">
          <p><strong>Types:</strong></p>
          {["Plante", "Feu", "Eau", "Electrik","Psy", "Combat" ,"Obscur","Métal","Fée","Dragon"].map(
            (element) => (
              <button
                key={element}
                className={`filter-element ${element} ${
                  selectedElements.includes(element) ? "active" : ""
                }`}
                onClick={() => handleElementToggle(element)}
              >
                <img src={`../types/${element.toLowerCase()}.png`} alt={element} />
              </button>
            )
          )}
        </div>

        <div className="filter-row">
          <p><strong>Rareté:</strong></p>
          {availableRarities.map((rarity) => (
            <button
              key={rarity}
              className={`filter-rarity ${rarity} ${
                selectedRarities.includes(rarity) ? "active" : ""
              }`}
              onClick={() => handleRarityToggle(rarity)}
            >
              {rarity}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filtre;