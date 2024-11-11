import React, { useState, useEffect } from 'react';
import productsData from '../mocks/products.json';
import '../styles/ProductCarousel.css';
import { FaArrowLeft } from 'react-icons/fa';
import iconmeli from '../assets/iconmeli.png';
import locales from '../locales-app/locales.json';

const ProductCarousel = ({ onBack, language }) => {
  const [products, setProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    window.addEventListener('resize', handleResize);
    setProducts(productsData.slice(0, isMobile ? 2 : productsData.length));

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const texts = locales[language] || locales["es"]; 

  const handleCardClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="product-carousel-overlay">
      <img src={iconmeli} alt={texts.iconAltText} className="iconmeli" />
      <div className="product-carousel-message">
        <p>{texts.productCarouselMessage}</p>
      </div>
      <div className="carousel-container">
        <FaArrowLeft className="back-arrow-icon" onClick={onBack} />
        {products.map((product) => (
          <div 
            className="card" 
            key={product.id} 
            onClick={() => handleCardClick(product.productUrl)}
          >
            <img src={product.image} alt={product.name} className="card-image" />
            <h2 className="card-title">{product.name}</h2>
            <p className="card-price">{product.price}</p>
            <p className="card-location">{product.location}</p>
            <p className="card-description">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
