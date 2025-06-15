import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import "../css/profil.css";
import pok1 from "../img/pok1.jpg";
import pok2 from "../img/pok2.jpg";
import pok3 from "../img/pok3.jpg";

function Profil() {
  const navigate = useNavigate();
  const { 
    user, 
    handleChangePassword, 
    handleDeleteAccount,
    handleLogout,
    error,
    loading,
    handleGetUserCollection
  } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [userCards, setUserCards] = useState([]);
  const initRef = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/connexion', { replace: true });
    } else if (!initRef.current) {
      initRef.current = true;
      const fetchUserCards = async () => {
        try {
          const response = await handleGetUserCollection();
          if (response.success) {
            setUserCards(response.data.cards.slice(0, 5));
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des cartes:', error);
        }
      };

      fetchUserCards();
    }
  }, [navigate]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return null;
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPasswordError("Les nouveaux mots de passe ne correspondent pas !");
      return;
    }

    try {
      const response = await handleChangePassword(
        passwordData.currentPassword, 
        passwordData.newPassword
      );
      
      if (response && response.success) {
        setPasswordSuccess("Mot de passe mis à jour avec succès !");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setTimeout(() => {
          setShowModal(false);
          setPasswordSuccess("");
        }, 2000);
      } else {
        setPasswordError(response?.message || "Une erreur est survenue");
      }
    } catch (err) {
      setPasswordError(err.message || "Une erreur est survenue lors du changement de mot de passe");
    }
  };

  const confirmDeleteAccount = async () => {
    try {
      await handleDeleteAccount();
      handleLogout();
      navigate('/');
    } catch (err) {
      alert(error || "Erreur lors de la suppression du compte");
    }
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/connexion', { replace: true });
  };

  return (
    <div className="profil_global-container">
      <div className="profil_app-container">
        <div className="profil_dashboard-container">
          {/* Sidebar */}
          <aside className="profil_sidebar">
            <h2>Bienvenue</h2>
            <nav>
              <ul>
                <li><a href="#" className="active">🏠 Profil</a></li>
                <li>
                  <a 
                    onClick={() => navigate('/collection')} 
                    style={{ cursor: 'pointer' }}
                  >
                    📜 Voir Cartes
                  </a>
                </li>
                <li>
                  <a 
                    onClick={() => navigate('/Pokédex')} 
                    style={{ cursor: 'pointer' }}
                  >
                    📖 Mon Pokédex
                  </a>
                </li>
                {user.role === 'Admin' && (
                  <li>
                    <a 
                      onClick={() => navigate('/admin')} 
                      style={{ cursor: 'pointer' }}
                    >
                      👑 Admin
                    </a>
                  </li>
                )}
              </ul>
            </nav>
            <div className="profil_delivery">
              <button onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>
                Déconnexion
              </button>
            </div>
          </aside>

          {/* Contenu principal */}
          <main className="profil_main-content">
            <header>
              <h1>Mon Profil</h1>
              <input
                type="text"
                placeholder="Rechercher une carte Pokémon..."
                className="profil_search-bar"
              />
            </header>

            {/* Profil Info */}
            <section className="profil_profile-info">
              <div className="profil_avatar"></div>
              <div className="profil_details">
                <h3>
                  Nom du Dresseur: <span>
                    {(user?.firstName || user?.lastName) 
                      ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                      : "Non spécifié"}
                  </span>
                </h3>
                <p>Email: {user?.email}</p>
                <button onClick={() => navigate('/modifprofil')}>Modifier le Profil</button>
                <button 
                  onClick={() => setShowModal(true)} 
                  style={{
                    backgroundColor: "green", 
                    color: "white", 
                    marginLeft: "10px"
                  }}
                >
                  Modifier le Mot de Passe
                </button>
                <button 
                  onClick={() => setShowDeleteModal(true)} 
                  style={{ backgroundColor: "red", color: "white", marginLeft: "10px" }}
                >
                  Supprimer le Compte
                </button>
              </div>
            </section>

            {/* Cartes Pokémon */}
            <section className="profil_pokemon-cards">
              <div className="profil_section-header">
                <h2>Mes Cartes Pokémon</h2>
                <Link to="/collection" className="profil_next-section">
                  ➡️
                </Link>
              </div>
              <div className="profil_cards">
                {userCards.map((card, index) => (
                  <div key={index} className="profil_card">
                    <img src={card.card.image} alt={card.card.name} />
                    <p>{card.card.name}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Modal pour modifier le mot de passe */}
      {showModal && (
        <div className="profil_modal">
          <div className="profil_modal-content">
            <h2>Modifier le Mot de Passe</h2>
            <form onSubmit={handlePasswordSubmit}>
              {passwordError && (
                <p style={{
                  color: 'red',
                  margin: '10px 0',
                  padding: '10px',
                  backgroundColor: '#ffebee',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  {passwordError}
                </p>
              )}
              {passwordSuccess && (
                <p style={{
                  color: 'green',
                  margin: '10px 0',
                  padding: '10px',
                  backgroundColor: '#e8f5e9',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  {passwordSuccess}
                </p>
              )}
              <label>
                Ancien Mot de Passe:
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </label>
              <label>
                Nouveau Mot de Passe:
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </label>
              <label>
                Confirmer Nouveau Mot de Passe:
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={passwordData.confirmNewPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </label>
              <div className="profil_modal-actions">
                <button type="submit" className="profil_modal-save-btn">
                  Enregistrer
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowModal(false);
                    setPasswordError("");
                    setPasswordSuccess("");
                    setPasswordData({
                      currentPassword: "",
                      newPassword: "",
                      confirmNewPassword: "",
                    });
                  }} 
                  className="profil_modal-cancel-btn"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Nouveau Modal pour la suppression du compte */}
      {showDeleteModal && (
        <div className="profil_modal">
          <div className="profil_modal-content">
            <h2>Supprimer le Compte</h2>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <p style={{ color: 'red', marginBottom: '15px' }}>
                Attention ! Cette action est irréversible.
              </p>
              <p>
                Êtes-vous sûr de vouloir supprimer votre compte ? 
                Toutes vos données seront définitivement perdues.
              </p>
            </div>
            <div className="profil_modal-actions">
              <button 
                onClick={confirmDeleteAccount}
                className="profil_modal-save-btn"
                style={{ backgroundColor: 'red' }}
              >
                Confirmer la suppression
              </button>
              <button 
                onClick={() => setShowDeleteModal(false)} 
                className="profil_modal-cancel-btn"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profil;
