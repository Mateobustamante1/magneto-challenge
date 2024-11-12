import React, { useState, useEffect, useCallback, useMemo, useRef, useReducer } from 'react';
import { authenticate } from '../utils/mockAuth';
import locales from '../locales-app/locales.json';
import '../styles/Login.css';
import iconmeli from '../assets/iconmeli.png';

const Login = ({ onLogin, language }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const inputRef = useRef(null); 
  const [submitAttempts, incrementSubmitAttempts] = useReducer((count) => count + 1, 0);

 
  const title = useMemo(() => {
    console.log(`Memoized title for language: ${language}`);
    return locales[language].loginTitle;
  }, [language]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    incrementSubmitAttempts(); 
    console.log('Form submitted');

    if (authenticate(username, password)) {
      console.log('Authentication successful');
      onLogin();
    } else {
      setError(locales[language].loginError);
      console.log('Authentication failed');
    }
  }, [username, password, language, onLogin]);

  
  useEffect(() => {
    console.log('Component mounted, focusing on username input');
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    console.log(`Username changed to: ${username}`);
  }, [username]);

  useEffect(() => {
    console.log(`Password changed`);
  }, [password]);

  return (
    <div className="login-container">
      <img src={iconmeli} alt={locales[language].iconAltText} className="iconmeli" />
      <h2>{title}</h2> 
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={locales[language].usernamePlaceholder}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          ref={inputRef} 
          required
        />
        <input
          type="password"
          placeholder={locales[language].passwordPlaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{locales[language].loginButton}</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
