import React from 'react';
import '../css/filtreBloc.css';

const FiltreBloc = ({ bloc, isOpen, handleToggle, handleExtensionClick }) => {
  return (
    <div className="filtre-bloc">
      {bloc.map((set) => (
        <div key={set.name} className="filtre-item">
          <button className="filtre-title" onClick={() => handleToggle(set.name)}>
            {set.name}
          </button>
          {/* Ajout de la classe 'open' si le filtre est ouvert */}
          <div className={`extensions ${isOpen[set.name] ? 'open' : ''}`}>
            {isOpen[set.name] && (
              <div>
                {set.extensions.map((ext) => (
                  <div key={ext.Code} className="extension-item" onClick={() => handleExtensionClick(ext)}>
                    <div className="extension-logo">
                      <img src={ext.symbol} alt={ext.name} />
                    </div>
                    <span className="extension-name">{ext.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};


export default FiltreBloc;