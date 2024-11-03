import React, { useState } from 'react';
import { db } from './firebaseClient'; // Import Firebase
import { collection, query, where, getDocs } from 'firebase/firestore';
import Dashboard from './Overview';
import SignUp from './SignUp';
import FinancialInfoForm from './FinancialInfoForm';
import './App.css';
import Navbar from './Navbar';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentView, setCurrentView] = useState('login'); // 'login', 'signup', 'financialInfo', 'dashboard'
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const usersCollection = collection(db, "profiles");
      const q = query(usersCollection, where("email", "==", email), where("password", "==", password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Login successful, proceed to dashboard
        setCurrentView('dashboard');
      } else {
        // Login failed, user not found or incorrect credentials
        setMessage('Invalid email or password. Please check your credentials or sign up.');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error('Error logging in: ', error);
    }
  };

  // Handle SignUp
  const handleSignUpTransition = () => {
    setCurrentView('signup');
  };

  // Handle transition to financial info page after successful sign-up
  const handleSignUp = () => {
    setCurrentView('financialInfo');
  };

  // Handle transition to dashboard after financial information is added
  const handleFinancialInfoSubmit = () => {
    setCurrentView('dashboard');
  };

  // Conditional Rendering based on state
  if (currentView === 'dashboard') {
    return <Dashboard />;
  } else if (currentView === 'financialInfo') {
    return <FinancialInfoForm onFinancialInfoSubmitted={handleFinancialInfoSubmit} />;
  } else if (currentView === 'signup') {
    return <SignUp onSignUp={handleSignUp} />;
  }

  // Otherwise, render the login form
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome Back <span role="img" aria-label="wave">👋</span></h1>
        <p>Today is a new day. It's your day. You shape it. Sign in to start managing your projects.</p>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <a href="#" className="forgot-password">Forgot Password?</a>

          <button type="submit" className="sign-in-button">Sign in</button>
        </form>

        {message && <p className="login-message">{message}</p>}

        <div className="or-container">
          <span className="line"></span>
          <span className="or-text">Or</span>
          <span className="line"></span>
        </div>

        <button className="social-button google-button">
          <img src="google-logo.png" alt="Google Logo" /> Sign in with Google
        </button>
        <button className="social-button facebook-button">
          <img src="facebook-logo.png" alt="Facebook Logo" /> Sign in with Facebook
        </button>

        <p className="sign-up">
          Don't have an account? <a href="#" onClick={handleSignUpTransition}>Sign up</a>
        </p>

        <footer>©️ 2024 ALL RIGHTS RESERVED</footer>
      </div>
    </div>
  );
}

export default App;
