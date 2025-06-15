import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import '../css/inscription.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Inscription() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { handleRegister, error: authError, loading } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate('/profil', { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(""); // Réinitialiser l'erreur quand l'utilisateur tape
  };

  // Fonction pour vérifier si tous les champs sont valides
  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Tous les champs doivent être remplis.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return false;
    }
    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Veuillez entrer une adresse email valide.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await handleRegister(
        formData.username,
        formData.email,
        formData.password
      );

      if (response && response.success) {
        setShowModal(true);
      } else {
        setError(response?.message || "Une erreur est survenue lors de l'inscription");
      }
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de l'inscription");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmAndGoToLogin = () => {
    navigate('/connexion');
  };

  return (
    <div className="Insc-back">
      <div className="Insc-background">
        <div className="Insc-container">
          <div className="Insc-form">
            <h2 className="Insc-title">Inscription</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username" className="Insc-label">Nom d'utilisateur</label>
              <input
                type="text"
                id="username"
                name="username"
                className="Insc-input"
                placeholder="Entrez votre nom"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <label htmlFor="email" className="Insc-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="Insc-input"
                placeholder="Entrez votre email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="password" className="Insc-label">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                className="Insc-input"
                placeholder="Entrez votre mot de passe"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <label htmlFor="confirmPassword" className="Insc-label">Confirmer Mot de passe</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="Insc-input"
                placeholder="Confirmer votre mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              {(error || authError) && (
                <p className="error-message" style={{color: 'red', textAlign: 'center'}}>
                  {error || authError}
                </p>
              )}

              <button 
                type="submit" 
                className="Insc-submit-btn" 
                disabled={loading}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </form>

            <p className="Insc-text" style={{ marginTop: '20px', textAlign: 'center' }}>
              Déjà inscrit ? <a 
                onClick={() => navigate('/connexion')} 
                className="Insc-link"
                style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
              >
                Se connecter
              </a>
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="saisiemailmdp-modal-overlay">
          <div className="saisiemailmdp-modal-content">
            <h3>Inscription réussie</h3>
            <p>Un email a été envoyé à l'adresse {formData.email}. Veuillez consulter votre boîte mail et activer votre compte pour commencer.</p>
            <button className="saisiemailmdp-modal-btn" onClick={confirmAndGoToLogin}>
              Aller à la page de connexion
            </button>
            <button className="saisiemailmdp-modal-btn-close" onClick={closeModal}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inscription;
