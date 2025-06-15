import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../css/connexion.css';
import Poketa from '../img/connection.jpeg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Header from './header.js'

function Connexion() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const { handleLogin, error, loading, user } = useAuth();

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleLogin(formData.email, formData.password);
      if (response.success) {
        navigate('/profil', { replace: true });
      }
      // Réinitialiser le mot de passe en cas d'erreur
      if (!response.success) {
        setFormData(prev => ({
          ...prev,
          password: ''
        }));
      }
    } catch (err) {
      console.error("Erreur de connexion:", err);
      // Réinitialiser le mot de passe en cas d'erreur
      setFormData(prev => ({
        ...prev,
        password: ''
      }));
    }
  };

  return (
    <div className="Conn-back">
      <div className="Conn-background">
        <div className="Conn-container">
          <div className="Conn-form">
            <h2 className="Conn-title">Connexion</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email" className="Conn-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="Conn-input"
                placeholder="Entrez votre email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="password" className="Conn-label">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                className="Conn-input"
                placeholder="Entrez votre mot de passe"
                value={formData.password}
                onChange={handleChange}
                required
              />

              {error && (
                <p className="Conn-error" style={{
                  color: 'red',
                  marginTop: '10px',
                  textAlign: 'center',
                  fontSize: '0.9em'
                }}>
                  {error}
                </p>
              )}

              <button 
                type="submit" 
                className="Conn-submit-btn" 
                disabled={loading}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </form>
            <p className="Conn-text">
              Impossible de vous connecter ? <a href="/inscription" className="Conn-link">Créer un compte</a>
            </p>
            <p className="Conn-text">
              Avez-vous oublié votre mot de passe ? <a href="/modifmdp" className="Conn-link">Mot de passe oublié</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connexion;
