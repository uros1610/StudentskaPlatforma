import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; 
import setupInterceptors from './interceptor';
import { AuthContextProvider } from './context/AuthContext';
import { PredmetContextProvider } from './context/PredmetContext';




const root = ReactDOM.createRoot(document.getElementById('root'));
setupInterceptors();

root.render(
  <React.StrictMode>
  <Router>
  <AuthContextProvider>
    <PredmetContextProvider>

  <App />
  
  </PredmetContextProvider>
  </AuthContextProvider>
  

  </Router>
  
</React.StrictMode>
);


