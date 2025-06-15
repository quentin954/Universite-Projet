import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../css/connexion.css';  // On réutilise le style de connexion
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleVerifyEmail, loading } = useAuth();
  const [verificationStatus, setVerificationStatus] = useState({
    done: false,
    success: false,
    message: ''
  });
  const verificationDone = useRef(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (verificationDone.current) return;
      verificationDone.current = true;
      
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');
      
      if (!token) {
        setVerificationStatus({
          done: true,
          success: false,
          message: "Token de vérification manquant."
        });
        return;
      }

      try {
        const response = await handleVerifyEmail(token);
        setVerificationStatus({
          done: true,
          success: response.success,
          message: response.message
        });
      } catch (err) {
        setVerificationStatus({
          done: true,
          success: false,
          message: err.message || "Une erreur est survenue lors de la vérification."
        });
      }
    };

    verifyEmail();
  }, [location.search, handleVerifyEmail]);

  const goToLogin = () => {
    navigate('/connexion');
  };

  return (
    <div className="Conn-back">
      <div className="Conn-background">
        <div className="Conn-container">
          <div className="Conn-form">
            <h2 className="Conn-title">Vérification Email</h2>
            
            {loading && !verificationStatus.done && (
              <p style={{
                textAlign: 'center',
                margin: '20px 0'
              }}>
                Vérification en cours...
              </p>
            )}

            {verificationStatus.done && (
              <div style={{textAlign: 'center'}}>
                <p style={{
                  color: verificationStatus.success ? 'green' : 'red',
                  margin: '20px 0',
                  padding: '10px',
                  backgroundColor: verificationStatus.success ? '#e8f5e9' : '#ffebee',
                  borderRadius: '4px'
                }}>
                  {verificationStatus.message}
                </p>

                <button 
                  onClick={goToLogin}
                  className="Conn-submit-btn2"
                  style={{
                    width: 'auto',
                    padding: '10px 20px',
                    marginTop: '20px'
                  }}
                >
                  Aller à la page de connexion <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail; 