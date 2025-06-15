import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import '../css/inscription.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleResetPassword, loading } = useAuth();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Extraire le token de l'URL
  const token = new URLSearchParams(location.search).get('token');

  useEffect(() => {
    if (!token) {
      navigate('/modifmdp', { replace: true });
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation du formulaire
    if (formData.newPassword.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await handleResetPassword(token, formData.newPassword);
      if (response && response.success) {
        setSuccess("Mot de passe réinitialisé avec succès !");
        setTimeout(() => {
          navigate('/connexion');
        }, 2000);
      } else {
        setError(response?.message || "Une erreur est survenue");
      }
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de la réinitialisation");
    }
  };

  return (
    <div className="Insc-back">
      <div className="Insc-background">
        <div className="Insc-container">
          <div className="Insc-form">
            <h2 className="Insc-title">Réinitialisation du Mot de Passe</h2>
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

              {success && (
                <p style={{
                  color: 'green',
                  margin: '10px 0',
                  padding: '10px',
                  backgroundColor: '#e8f5e9',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  {success}
                </p>
              )}

              <label htmlFor="newPassword" className="Insc-label">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="Insc-input"
                placeholder="Entrez votre nouveau mot de passe"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />

              <label htmlFor="confirmPassword" className="Insc-label">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="Insc-input"
                placeholder="Confirmez votre nouveau mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <button 
                type="submit" 
                className="Insc-submit-btn"
                disabled={loading}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </form>

            <p className="Insc-text" style={{ marginTop: '20px', textAlign: 'center' }}>
              <a 
                onClick={() => navigate('/connexion')} 
                className="Insc-link"
                style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
              >
                Retour à la connexion
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword; 