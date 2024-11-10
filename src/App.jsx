import React, { useState } from 'react';
import Login from './components/Login';
import MutantDetector from './components/MutantDetector';
import ProductCarousel from './components/ProductCarousel';
import './styles/ProductCarousel.css'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showProductCarousel, setShowProductCarousel] = useState(false);

  
  const handleHumanDetected = () => {
    setShowProductCarousel(true);
  };

  
  const handleBackToDetector = () => {
    setShowProductCarousel(false);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        showProductCarousel ? (
          <ProductCarousel onBack={handleBackToDetector} />
        ) : (
          <MutantDetector onHumanDetected={handleHumanDetected} />
        )
      ) : (
        <Login onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}

export default App;
