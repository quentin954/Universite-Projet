import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from '../hooks/useAuth';
import '../css/inscription.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function SaisieMailOublieMDP() {
  const navigate = useNavigate();
  const { handleRequestPasswordReset, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(""); // Réinitialiser l'erreur quand l'utilisateur tape
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Veuillez entrer un email valide.");
      return;
    }

    try {
      const response = await handleRequestPasswordReset(email);
      if (response && response.success) {
        setShowModal(true);
      } else {
        setError(response?.message || "Une erreur est survenue lors de l'envoi de l'email");
      }
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de l'envoi de l'email");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const goToConnection = () => {
    navigate("/connexion");
  };

  return (
    <div className="Insc-back">
      <div className="Insc-background">
        <div className="Insc-container">
          <div className="Insc-form">
            <h2 className="Insc-title">Réinitialisation du Mot de Passe</h2>
            <p className="Insc-description">Entrez votre adresse email pour réinitialiser votre mot de passe.</p>
            <form onSubmit={handleSubmit}>
              {error && (
                <p style={{
                  color: 'red',
                  margin: '10px 0',
                  padding: '10px',
                  backgroundColor: '#ffebee',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  {error}
                </p>
              )}

              <label htmlFor="mail" className="Insc-label">Email</label>
              <input
                type="email"
                id="mail"
                className="Insc-input"
                placeholder="Entrez votre email"
                value={email}
                onChange={handleEmailChange}
                required
              />

              <button 
                type="submit" 
                className="Insc-submit-btn"
                disabled={loading}
              >
                <FontAwesomeIcon icon={faArrowRight} />
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal de confirmation */}
      {showModal && (
        <div className="saisiemailmdp-modal-overlay">
          <div className="saisiemailmdp-modal-content">
            <h3>Email envoyé</h3>
            <p>Un lien de réinitialisation a été envoyé à l'adresse {email}. Veuillez consulter vos mails pour réinitialiser votre mot de passe.</p>
            <button className="saisiemailmdp-modal-btn" onClick={goToConnection}>
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

export default SaisieMailOublieMDP;
