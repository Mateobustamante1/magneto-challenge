import React, { useState } from 'react';
import Login from './components/Login';
import MutantDetector from './components/MutantDetector';
import ProductCarousel from './components/ProductCarousel';
import LanguageSwitcher from './components/LanguageSwitcher';
import locales from './locales-app/locales.json';
import './styles/ProductCarousel.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showProductCarousel, setShowProductCarousel] = useState(false);
  const [language, setLanguage] = useState('es');

  const handleHumanDetected = () => {
    setShowProductCarousel(true);
  };

  const handleBackToDetector = () => {
    setShowProductCarousel(false);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="App">
      <LanguageSwitcher onChangeLanguage={handleLanguageChange} />

      {isAuthenticated ? (
        showProductCarousel ? (
          <ProductCarousel onBack={handleBackToDetector} language={language} />
        ) : (
          <MutantDetector onHumanDetected={handleHumanDetected} language={language} />
        )
      ) : (
        <Login onLogin={() => setIsAuthenticated(true)} language={language} />
      )}
    </div>
  );
}

export default App;

