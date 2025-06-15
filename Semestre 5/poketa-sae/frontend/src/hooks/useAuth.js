import { useState, useEffect, useRef } from "react";  // Import des hooks de React
import { 
  login, 
  register, 
  getProfile, 
  updateProfile, 
  updateSettings,
  deleteAccount,
  getAccountStatus,
  verifyEmail,
  changePassword,
  requestPasswordReset,
  resetPassword,
  getAllUsers,
  deleteUserAsAdmin,
  getUserCollection,
  addCardToCollection,
  updateCardQuantity,
  deleteCardFromCollection,
  getAllBlocksAndExtensions,
  getExtensionById,
  searchLiveCards,
  searchCompleteCards
} from "../api/api";  // Import des fonctions API

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const initRef = useRef(false);

  // Fonction pour récupérer le profil une seule fois
  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      const email = localStorage.getItem('email');
      if (response.success) {
        setUser({
          email,
          ...response.data
        });
      }
    } catch (err) {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Initialisation unique
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !initRef.current) {
      initRef.current = true;
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  // Fonction de connexion
  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await login(email, password);
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', email);
        // Au lieu d'appeler fetchProfile, on réinitialise initRef
        // pour que l'useEffect se déclenche
        initRef.current = false;
        setUser(null); // Force le re-render et donc le useEffect
        return response;
      } else {
        setError(response.message);
        setLoading(false);
        return response;
      }
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de la connexion");
      setLoading(false);
      throw err;
    }
  };

  // Fonction pour s'inscrire
  const handleRegister = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await register(username, email, password);
      return response; // Retourner la réponse de l'API
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Mise à jour du profil
  const handleUpdateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await updateProfile(profileData);
      setUser(prevUser => ({...prevUser, profile: data.data}));
      return data;
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  // Mise à jour des paramètres
  const handleUpdateSettings = async (settingsData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await updateSettings(settingsData);
      setUser(prevUser => ({...prevUser, settings: data.data}));
      return data;
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  // Suppression du compte
  const handleDeleteAccount = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteAccount();
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  // Vérification du statut du compte
  const handleGetAccountStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAccountStatus();
      return data;
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  // Vérification de l'email
  const handleVerifyEmail = async (token) => {
    setLoading(true);
    setError(null);
    try {
      const response = await verifyEmail(token);
      return response; // Retourner la réponse pour pouvoir accéder au message
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de la vérification");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Changement de mot de passe
  const handleChangePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      const response = await changePassword(currentPassword, newPassword);
      return response; // Retourner la réponse de l'API
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Demande de réinitialisation du mot de passe
  const handleRequestPasswordReset = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const data = await requestPasswordReset(email);
      return data;
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  // Réinitialisation du mot de passe
  const handleResetPassword = async (token, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      const data = await resetPassword(token, newPassword);
      return data;
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  // Déconnexion
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  // Fonctions d'administration
  const handleGetAllUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllUsers();
      return response;
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUserAsAdmin = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteUserAsAdmin(userId);
      return response;
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Collection functions
  const handleGetUserCollection = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUserCollection();
      return response;
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleAddCardToCollection = async (card) => {
    setLoading(true);
    setError(null);
    try {
      const response = await addCardToCollection(card);
      return response;
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCardQuantity = async (posId, quantity) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateCardQuantity(posId, quantity);
      return response;
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCardFromCollection = async (posId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteCardFromCollection(posId);
      return response;
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Card functions
  const handleGetAllBlocksAndExtensions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllBlocksAndExtensions();
      return response;
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleGetExtensionById = async (extensionId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getExtensionById(extensionId);
      return response;
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSearchLiveCards = async (term) => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchLiveCards(term);
      return response;
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSearchCompleteCards = async (term) => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchCompleteCards(term);
      return response;
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    handleLogin,
    handleRegister,
    handleUpdateProfile,
    handleUpdateSettings,
    handleDeleteAccount,
    handleGetAccountStatus,
    handleVerifyEmail,
    handleChangePassword,
    handleRequestPasswordReset,
    handleResetPassword,
    handleLogout,
    handleGetAllUsers,
    handleDeleteUserAsAdmin,
    handleGetUserCollection,
    handleAddCardToCollection,
    handleUpdateCardQuantity,
    handleDeleteCardFromCollection,
    handleGetAllBlocksAndExtensions,
    handleGetExtensionById,
    handleSearchLiveCards,
    handleSearchCompleteCards,
  };
};
