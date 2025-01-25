import { createContext, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import axios from 'axios';
import './index.css';

// Initialize context with default values
export const Context = createContext({
  token: localStorage.getItem('token') || null,
  setToken: () => {},
});

const AppWrapper = () => {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('token');
    return savedToken || null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // Optional: Validate token here
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Create value object for provider
  const url="https://markus-ai-saas-application.vercel.app"
  //const url="http://localhost:3000"
  const contextValue = {
    token,
    setToken,
    url
  };

  return (
    <Context.Provider value={contextValue}>
      <App />
    </Context.Provider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </StrictMode>
);
