import React, { useState } from 'react';
import { authenticate } from '../utils/mockAuth';
import locales from '../locales-app/locales.json';
import '../styles/Login.css';
import iconmeli from '../assets/iconmeli.png';

const Login = ({ onLogin, language }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authenticate(username, password)) {
      onLogin();
    } else {
      setError(locales[language].loginError);
    }
  };

  return (
    <div className="login-container">
      <img src={iconmeli} alt={locales[language].iconAltText} className="iconmeli" />
      <h2>{locales[language].loginTitle}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={locales[language].usernamePlaceholder}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
