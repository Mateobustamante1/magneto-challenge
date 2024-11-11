import React, { useState } from 'react';
import { isMutant } from '../utils/dnaChecker';
import locales from '../locales-app/locales.json';
import '../styles/App.css';
import iconmeli from '../assets/iconmeli.png';

const MutantDetector = ({ onHumanDetected, language }) => {
  const [dna, setDna] = useState("");
  const [isMutantResult, setIsMutantResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

  const texts = locales[language] || locales["es"]; 

  const handleCheckDna = () => {
    setLoading(true);
    setError(null);
    setShowErrorModal(false);
    setShowSuccessModal(false);

    setTimeout(() => {
      const isValidDna = /^[ATCG]+$/.test(dna);

      if (!isValidDna) {
        setError(texts.humanError); 
        setIsMutantResult(null);
        setShowErrorModal(true);
        onHumanDetected(); 
      } else {
        const result = isMutant(dna);
        setIsMutantResult(result);

        if (result) {
          setShowSuccessModal(true);
        } else {
          setShowErrorModal(true);
          onHumanDetected(); 
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
    <div className={`mutant-detector-container fade-in ${showErrorModal ? "fade-out" : ""}`}>
      <img src={iconmeli} alt={texts.iconAltText} className="iconmeli" />
      <h2>{texts.mutantDetectorTitle}</h2>
      <p>{texts.dnaPrompt}</p>
      <input
        type="text"
        value={dna}
        onChange={handleChangeDna}
        maxLength={6}
        placeholder={texts.dnaPlaceholder}
      />
      <button onClick={handleCheckDna} disabled={loading}>
        {loading ? texts.loadingText : texts.verifyDnaButton}
      </button>
      {loading && <div className="spinner"></div>}
      {error && <p className="error">{error}</p>}
      {isMutantResult !== null && !error && (
        <p>{isMutantResult ? texts.mutantSuccess : texts.noMutantDetected}</p>
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
            <p>{texts.mutantSuccess}</p>
            <form onSubmit={handleSubmitEmail}>
              <input
                type="email"
                value={email}
                onChange={handleChangeEmail}
                placeholder={texts.emailPlaceholder}
                required
              />
              <button type="submit">{texts.sendButton}</button>
            </form>
          </div>
        </div>
      )}
      {isEmailSubmitted && !showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <span className="close-btn" onClick={closeSuccessModal}>×</span>
            <p>{texts.emailSuccess}</p> 
          </div>
        </div>
      )}
    </div>
  );
};

export default MutantDetector;
