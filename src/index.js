// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RootApp from './RootApp'; // Import the new RootApp
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

reportWebVitals();
