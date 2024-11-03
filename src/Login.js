import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db } from './firebaseClient';
import { collection, getDocs, query, where } from "firebase/firestore";
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const usersCollection = collection(db, "profiles");
      const q = query(usersCollection, where("email", "==", email), where("password", "==", password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setMessage('Login successful!');
        onLogin(); // Trigger the login state change in App.js
        navigate('/financial-info'); // Redirect to financial info after successful login
      } else {
        setMessage('Invalid email or password.');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error('Error logging in: ', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome Back, Investor<span role="img" aria-label="wave">👋</span></h1>
        <p>New day, new gains. Sign in to grow your wealth.</p>

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

        <p className="sign-up-redirect">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>

        <footer>©️ 2024 ALL RIGHTS RESERVED</footer>
      </div>
    </div>
  );
}

export default Login;
