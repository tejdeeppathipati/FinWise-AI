// MainApp.js
import React, { useState } from 'react';
import Navbar from './Navbar';
import Overview from './Overview';
import Banking from './Banking';
import ExpenseTracking from './ExpenseTracking';
import Planning from './Planning';

function MainApp() {
  const [currentView, setCurrentView] = useState('Overview');

  // Function to handle navigation between different views
  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  let content;
  switch (currentView) {
    case 'Overview':
      content = <Overview />;
      break;
    case 'Banking':
      content = <Banking />;
      break;
    case 'Expense Tracking':
      content = <ExpenseTracking />;
      break;
    case 'Planning':
      content = <Planning />;
      break;
    default:
      content = <Overview />;
  }

  return (
    <div className="main-container">
      {/* Ensure Navbar is included */}
      <Navbar onNavigate={handleNavigation} />
      <div className="content-area">
        {content}
      </div>
    </div>
  );
}

export default MainApp;
