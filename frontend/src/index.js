import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import setupInterceptors from './interceptor';
import { AuthContextProvider } from './context/AuthContext';
import { PredmetContextProvider } from './context/PredmetContext';

setupInterceptors();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <PredmetContextProvider>
          <App />
        </PredmetContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
