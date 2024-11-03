import React, { useState } from 'react';
import './RootApp.css';
import App from './App';
import SignUp from './SignUp';
import FinancialInfoForm from './FinancialInfoForm';
import Navbar from './Navbar';

const RootApp = () => {
  const [currentView, setCurrentView] = useState('login');

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="app-container">
      {currentView !== 'login' && currentView !== 'signup' && (
        <Navbar onNavigate={handleViewChange} />
      )}
      {currentView === 'signup' ? (
        <SignUp onSignUp={() => handleViewChange('financialInfo')} />
      ) : currentView === 'financialInfo' ? (
        <FinancialInfoForm onFinancialInfoSubmitted={() => handleViewChange('dashboard')} />
      ) : currentView === 'dashboard' ? (
        <div className="dashboard-container">
          <div className="main-content">
            {/* Here you can add the dashboard content directly */}
            <h1>Welcome to Your Dashboard</h1>
            <div className="cards-container">
              {/* Example cards - you can customize these */}
              <div className="card">
                <h3>Net Worth</h3>
                <p>$500,000</p>
              </div>
              <div className="card">
                <h3>Cash Flow</h3>
                <p>$1,500</p>
              </div>
              <div className="card">
                <h3>Investments</h3>
                <p>$350,000</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <App onLogin={() => handleViewChange('dashboard')} onNavigateToSignUp={() => handleViewChange('signup')} />
      )}
    </div>
  );
};

export default RootApp;
