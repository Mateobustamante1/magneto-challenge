import React, { useState, useEffect, useCallback, useMemo, useRef, useReducer } from 'react';
import '../styles/LanguageSwitcher.css';
import locales from '../locales-app/locales.json';

const LanguageSwitcher = ({ onChangeLanguage }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const [changeCount, incrementChangeCount] = useReducer((count) => count + 1, 0);

 
  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prevState => !prevState);
    console.log('Dropdown toggled');
  }, []);

  
  const availableLanguages = useMemo(() => {
    console.log('Available languages recalculated');
    return Object.keys(locales).filter(lang => lang !== selectedLanguage);
  }, [selectedLanguage]);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    onChangeLanguage(lang);
    setIsDropdownOpen(false);
    incrementChangeCount();
    console.log(`Language changed to: ${lang}`);
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    console.log('Dropdown clicked');
  };

  const handleOutsideClick = (e) => {
    if (isDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
      console.log('Outside click detected, closing dropdown');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isDropdownOpen]);

  useEffect(() => {
    console.log('LanguageSwitcher component rendered');
  });

  
  useEffect(() => {
    if (changeCount > 0) {
      console.log(`Language has been changed ${changeCount} times.`);
    }
  }, [changeCount]);

  return (
    <div className="language-switcher" onClick={handleDropdownClick} ref={dropdownRef}>
      <button className="language-button" onClick={toggleDropdown}>
        {locales[selectedLanguage].label}
      </button>
      {isDropdownOpen && (
        <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
          {availableLanguages.map((lang) => (
            <button
              key={lang}
              className="dropdown-item"
              onClick={() => handleLanguageChange(lang)}
            >
              {locales[lang].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
