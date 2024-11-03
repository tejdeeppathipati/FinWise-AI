// Header.js
import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1>Dashboard</h1>
      <input type="text" className="search-bar" placeholder="Search..." />
      <div className="header-icons">
        <button className="sign-in-button">Sign in</button>
      </div>
    </header>
  );
}

export default Header;
