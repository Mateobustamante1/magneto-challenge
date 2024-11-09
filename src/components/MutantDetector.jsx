import React, { useState } from 'react';
import { isMutant } from '../utils/dnaChecker';
import '../styles/App.css';

const MutantDetector = () => {
  const [dna, setDna] = useState("");
  const [isMutantResult, setIsMutantResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [showErrorModal, setShowErrorModal] = useState(false); 
  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  const [email, setEmail] = useState(""); 
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false); 
  const handleCheckDna = () => {
    setLoading(true); 
    setError(null);  
    setShowErrorModal(false); 
    setShowSuccessModal(false); 


    setTimeout(() => {
      const isValidDna = /^[ATCG]+$/.test(dna);

      if (!isValidDna) {
        setError("Eres un humano, no podes formar parte del clan de Magneto.");
        setIsMutantResult(null); 
        setShowErrorModal(true); 
      } else {
        const result = isMutant(dna);
        setIsMutantResult(result);

        if (result) {
          setShowSuccessModal(true);
        } else {
          setShowErrorModal(true); 
        }
      }

      setLoading(false); 
    }, 3000); 
  };

  const handleChangeDna = (e) => {
    setDna(e.target.value.toUpperCase()); 
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    setIsEmailSubmitted(true);
    setShowSuccessModal(false); 
    console.log("Email enviado: ", email); 
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false); 
    setIsEmailSubmitted(false); 
  };

  return (
    <div className="mutant-detector-container">
      <h2>Detector ADN</h2>
      <p>Ingresá tu código de ADN</p>
      <input
        type="text"
        value={dna}
        onChange={handleChangeDna}
        maxLength={6} 
        placeholder="Ingrese la secuencia"
      />
      <button onClick={handleCheckDna} disabled={loading}>
        {loading ? 'Validando...' : 'Verificar ADN'}
      </button>
      {loading && <div className="spinner"></div>} 
      {error && <p className="error">{error}</p>}
      {isMutantResult !== null && !error && (
        <p>{isMutantResult ? "Felicitaciones, eres un mutante. Completa tu email y Magneto te reclutará en breve." : "No se detectó mutante."}</p>
      )}
      {showErrorModal && (
        <div className="error-modal">
          <div className="error-modal-content">
            <span className="close-btn" onClick={closeErrorModal}>×</span>
            <p>{error}</p>
          </div>
        </div>
      )}
      {showSuccessModal && !isEmailSubmitted && (
        <div className="success-modal">
          <div className="success-modal-content">
            <span className="close-btn" onClick={closeSuccessModal}>×</span>
            <p>Felicitaciones, eres un mutante. Completa tu email y Magneto te reclutará en breve.</p>
            <form onSubmit={handleSubmitEmail}>
              <input
                type="email"
                value={email}
                onChange={handleChangeEmail}
                placeholder="Ingresa tu email"
                required
              />
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      )}
      {isEmailSubmitted && !showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <span className="close-btn" onClick={closeSuccessModal}>×</span> 
            <p>Email enviado exitosamente. ¡Te esperamos, mutante!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MutantDetector;
