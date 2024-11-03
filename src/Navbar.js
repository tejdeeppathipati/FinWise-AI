// Navbar.js

import React from 'react';
import './Navbar.css';

const Navbar = ({ onNavigate }) => (
  <div className="navbar">
    <div className="navbar-brand">InvestWise AI</div>
    <ul className="navbar-links">
      <li onClick={() => onNavigate('overview')}>Overview</li>
      <li onClick={() => onNavigate('banking')}>Banking</li>
      <li onClick={() => onNavigate('expenseTracking')}>Expense Tracking</li>
      <li onClick={() => onNavigate('planning')}>Planning</li>
      <li onClick={() => onNavigate('advice')}>Advice</li>
    </ul>
    <button className="sign-out-button" onClick={() => onNavigate('login')}>Sign Out</button>
  </div>
);

export default Navbar;
