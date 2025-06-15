import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import "../css/admin.css";

function Admin() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const navigate = useNavigate();
  const { user, handleGetAllUsers, handleDeleteUserAsAdmin, loading } = useAuth();
  const initRef = useRef(false);

  // Vérifier que l'utilisateur est admin et charger les utilisateurs
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/connexion', { replace: true });
      return;
    }

    const initializeAdmin = async () => {
      if (user && !initRef.current) {
        if (user.role !== 'Admin') {
          navigate('/profil', { replace: true });
          return;
        }
        // Charger la liste des utilisateurs seulement si l'utilisateur est admin
        try {
          initRef.current = true;
          const response = await handleGetAllUsers();
          if (response.success) {
            setUsers(response.data);
          } else {
            setError("Erreur lors du chargement des utilisateurs");
          }
        } catch (err) {
          setError(err.message || "Erreur lors du chargement des utilisateurs");
        }
      }
    };

    initializeAdmin();
  }, [user, navigate]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setError("");
    setSuccess("");
  };

  const deleteUser = async (userId) => {
    try {
      const response = await handleDeleteUserAsAdmin(userId);
      if (response.success) {
        setSuccess("Utilisateur supprimé avec succès");
        // Recharger la liste des utilisateurs
        const usersResponse = await handleGetAllUsers();
        if (usersResponse.success) {
          setUsers(usersResponse.data);
        }
      } else {
        setError(response.message || "Erreur lors de la suppression");
      }
    } catch (err) {
      setError(err.message || "Erreur lors de la suppression de l'utilisateur");
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="admin_global-container">
      <div className="admin_app-container">
        <div className="admin_dashboard-container">
          {/* Sidebar */}
          <aside className="admin_sidebar">
            <h2>Tableau de Bord</h2>
            <nav>
              <ul>
                <li>
                  <a 
                    onClick={() => navigate('/profil')} 
                    style={{ cursor: 'pointer' }}
                  >
                    🏠 Retour au Profil
                  </a>
                </li>
                <li><a href="#" className="active">👥 Gestion Utilisateurs</a></li>
              </ul>
            </nav>
          </aside>

          {/* Contenu principal */}
          <main className="admin_main-content">
            <header>
              <h1>Gestion des Utilisateurs</h1>
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                className="admin_search-bar"
                value={search}
                onChange={handleSearchChange}
              />
            </header>

            {/* Messages d'erreur et de succès */}
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

            {/* Liste des utilisateurs */}
            <section className="admin_user-list">
              {users
                .filter(u => u._id !== user._id)
                .filter(u => 
                  u.username?.toLowerCase().includes(search.toLowerCase()) || 
                  u.email?.toLowerCase().includes(search.toLowerCase())
                )
                .map((u) => (
                  <div className="admin_user-item" key={u._id}>
                    <div>
                      <p><strong>{u.username}</strong></p>
                      <p>{u.email}</p>
                      <p>Rôle: {u.role || 'User'}</p>
                    </div>
                    <div className="admin_user-actions">
                      <button 
                        onClick={() => {
                          if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
                            deleteUser(u._id);
                          }
                        }}
                        style={{ backgroundColor: 'red', color: 'white' }}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Admin;
