import React, { useState } from 'react';
import '../styles/LanguageSwitcher.css';
import locales from '../locales-app/locales.json';

const LanguageSwitcher = ({ onChangeLanguage }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    onChangeLanguage(lang);
    setIsDropdownOpen(false); 
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

 
  const handleDropdownClick = (e) => {
    e.stopPropagation(); 
  };

 
  const handleOutsideClick = (e) => {
    if (isDropdownOpen && !e.target.closest('.language-switcher')) {
      setIsDropdownOpen(false);
    }
  };

  
  React.useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isDropdownOpen]);

  return (
    <div className="language-switcher" onClick={handleDropdownClick}>
      <button
        className="language-button"
        onClick={toggleDropdown}
      >
        {locales[selectedLanguage].label}
      </button>
      {isDropdownOpen && (
        <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
          {Object.keys(locales).map((lang) => (
            lang !== selectedLanguage && (
              <button
                key={lang}
                className="dropdown-item"
                onClick={() => handleLanguageChange(lang)}
              >
                {locales[lang].label}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
