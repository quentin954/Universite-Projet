import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../css/modifprofil.css';

const ModifProfil = () => {
  const navigate = useNavigate();
  const { user, handleUpdateProfile, loading, error: authError } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    avatarUrl: '',
    bio: '',
    dateOfBirth: ''
  });

  // Vérifier l'authentification et charger les données
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/connexion', { replace: true });
      return;
    }

    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        avatarUrl: user.avatarUrl || '',
        bio: user.bio || '',
        dateOfBirth: user.dateOfBirth || ''
      });
    }
  }, [user, navigate]);

  // Si en cours de chargement, afficher le loader
  if (loading) {
    return <div>Chargement...</div>;
  }

  // Si pas d'utilisateur mais pas en cours de chargement, ne rien afficher
  if (!user && !loading) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await handleUpdateProfile(formData);
      if (response && response.success) {
        setSuccess("Profil mis à jour avec succès !");
        setTimeout(() => {
          navigate('/profil');
        }, 2000);
      } else {
        setError(response?.message || "Erreur lors de la mise à jour du profil");
      }
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de la mise à jour");
    }
  };

  return (
    <div className="modif-profil-container">
      <div className="modif-profil-card">
        <h1 className="modif-profil-title">Modifier mon profil</h1>
        <form onSubmit={handleSubmit} className="modif-profil-form">
          {error && (
            <p style={{
              color: 'red',
              margin: '10px 0',
              padding: '10px',
              backgroundColor: '#ffebee',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              {error || authError}
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

          {/* Nom */}
          <div>
            <label htmlFor="lastName">Nom</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Prénom */}
          <div>
            <label htmlFor="firstName">Prénom</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          {/* Avatar (URL) */}
          <div>
            <label htmlFor="avatarUrl">Avatar (URL)</label>
            <input
              type="text"
              id="avatarUrl"
              name="avatarUrl"
              value={formData.avatarUrl}
              onChange={handleChange}
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          {/* Date de naissance */}
          <div>
            <label htmlFor="dateOfBirth">Date de naissance</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          {/* Boutons avec le même style que page_profil.js */}
          <div className="profil_modal-actions">
            <button 
              type="submit" 
              className="profil_modal-save-btn"
              disabled={loading}
            >
              Enregistrer
            </button>
            <button 
              type="button" 
              onClick={() => {
                navigate('/profil');
                setError("");
                setSuccess("");
                setFormData({
                  firstName: user?.firstName || '',
                  lastName: user?.lastName || '',
                  avatarUrl: user?.avatarUrl || '',
                  bio: user?.bio || '',
                  dateOfBirth: user?.dateOfBirth || ''
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
  );
};

export default ModifProfil;