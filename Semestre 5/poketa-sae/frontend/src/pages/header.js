import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Poketa from '../img/Poketa.png';
import '../css/header.css';

const Header = () => {
  const navigate = useNavigate();
  const { user, handleSearchLiveCards, handleSearchCompleteCards } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);
  const searchTimeout = useRef(null);

  useEffect(() => {
    // Gestionnaire de clic en dehors de la barre de recherche
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
        setSearchQuery('');
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Recherche en direct avec debounce
  const handleInputChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Clear le timeout précédent
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (query.length > 0) {
      // Définir un nouveau timeout pour la recherche
      searchTimeout.current = setTimeout(async () => {
        try {
          const response = await handleSearchLiveCards(query);
          if (response.success) {
            setSuggestions(response.data);
          }
        } catch (error) {
          console.error('Erreur lors de la recherche:', error);
          setSuggestions([]);
        }
      }, 300); // Délai de 300ms
    } else {
      setSuggestions([]);
    }
  };

  // Recherche complète lors du clic sur une suggestion
  const handleSuggestionClick = async (suggestion) => {
    try {
      const response = await handleSearchCompleteCards(suggestion.term);
      if (response.success) {
        setSearchQuery('');
        setSuggestions([]);
        navigate('/search-results', { 
          state: { 
            results: response.data,
            searchTerm: suggestion.term 
          } 
        });
      }
    } catch (error) {
      console.error('Erreur lors de la recherche complète:', error);
    }
  };

  // Recherche complète lors de l'appui sur Entrée
  const handleKeyPress = async (event) => {
    if (event.key === 'Enter' && searchQuery) {
      try {
        const response = await handleSearchCompleteCards(searchQuery);
        if (response.success) {
          setSearchQuery('');
          setSuggestions([]);
          navigate('/search-results', { 
            state: { 
              results: response.data,
              searchTerm: searchQuery 
            } 
          });
        }
      } catch (error) {
        console.error('Erreur lors de la recherche complète:', error);
      }
    }
  };

  const handleCollectionClick = () => {
    if (user) {
      navigate('/profil');
    } else {
      setIsModalActive(true);
    }
  };

  const closeModal = () => {
    setIsModalActive(false);
  };

  const overlayClick = (event) => {
    if (event.target === document.getElementById('Header-modalOverlay')) {
      closeModal();
    }
  };

  return (
    <div className="bar">
      <img src={Poketa} className="logo" alt="Poketa" onClick={() => navigate('/')} />
      <div className="search-container" ref={searchContainerRef}>
        <input
          type="search"
          className={`search-bar ${searchQuery && isSearchFocused ? 'active' : ''}`}
          placeholder="Rechercher une carte, un Pokémon..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsSearchFocused(true)}
          onKeyPress={handleKeyPress}
        />
        {suggestions.length > 0 && isSearchFocused && (
          <div className="suggestions">
            {suggestions.map((suggestion) => (
              <div 
                key={suggestion._id} 
                className="suggestion-item" 
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <img 
                  src={suggestion.preview} 
                  alt={suggestion.term} 
                  className="suggestion-image"
                />
                <span className="suggestion-text">{suggestion.term}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bar-right">
        <a className="active" onClick={handleCollectionClick}>
          {user ? 'Mon Profil' : 'Collectionner'}
        </a>
        <a className="active" onClick={() => navigate('/collection')}>Ma Collection</a>
        <a className="active" onClick={() => navigate('/Pokédex')}>Pokédex</a>
      </div>

      {!user && isModalActive && (
        <div
          id="Header-modalOverlay"
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
              <button className="Acc-create" onClick={() => navigate('/inscription')}>CRÉER UN COMPTE</button>
              <button className="Acc-login" onClick={() => navigate('/connexion')}>CONNEXION</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
