import axios from "axios";

// Configurer une instance Axios pour l'API
const api = axios.create({
  baseURL: "http://localhost:5000/mypokemonlist/v1", // URL de l'API
  headers: {
    "Content-Type": "application/json",
  },
});

// Fonction pour ajouter le token aux requêtes authentifiées
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fonction pour se connecter
export const login = async (email, password) => {
  try {
    const response = await api.post("/users/login", { email, password });
    return response.data;  // Retourne la réponse de l'API
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

// Fonction pour s'inscrire
export const register = async (username, email, password) => {
  try {
    const response = await api.post("/users/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

// Fonction pour récupérer le profil de l'utilisateur
export const getProfile = async () => {
  try {
    const response = await api.get("/users/profile", {
      headers: getAuthHeader(),
    });
    return response.data;  // Retourner la donnée du profil
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await api.put("/users/profile", 
      { profile: profileData },
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

export const updateSettings = async (settingsData) => {
  try {
    const response = await api.put("/users/settings",
      { settings: settingsData },
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

// Gestion du compte
export const deleteAccount = async () => {
  try {
    const response = await api.delete("/users/account", {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

export const getAccountStatus = async () => {
  try {
    const response = await api.get("/users/status", {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

// Vérification email
export const verifyEmail = async (token) => {
  try {
    const response = await api.post("/users/verify-email", { token });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

// Gestion du mot de passe
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.put("/users/change-password",
      { currentPassword, newPassword },
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await api.post("/users/reset-password", { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post("/users/reset-password/confirm", {
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

// Fonctions d'administration
export const getAllUsers = async () => {
  try {
    const response = await api.get("/admin/users", {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

export const deleteUserAsAdmin = async (userId) => {
  try {
    const response = await api.delete(`/admin/users/${userId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

// Collection API
export const getUserCollection = async () => {
  try {
    const response = await api.get("/collections", {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

export const addCardToCollection = async (card) => {
  try {
    const response = await api.post("/collections/card", 
      { card },
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

export const updateCardQuantity = async (posId, quantity) => {
  try {
    const response = await api.put(`/collections/card/${posId}`,
      { quantity },
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

export const deleteCardFromCollection = async (posId) => {
  try {
    const response = await api.delete(`/collections/card/${posId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

// Card API
export const getAllBlocksAndExtensions = async () => {
  try {
    const response = await api.get("/cards/blocs-extensions");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

export const getExtensionById = async (extensionId) => {
  try {
    const response = await api.get(`/cards/extensions/${extensionId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

export const searchLiveCards = async (term) => {
  try {
    const response = await api.post("/cards/search/live", { term });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

export const searchCompleteCards = async (term) => {
  try {
    const response = await api.post("/cards/search/complete", { term });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};
