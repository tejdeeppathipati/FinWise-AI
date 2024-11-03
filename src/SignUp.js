import React, { useState } from 'react';
import { db } from './firebaseClient';
import { collection, addDoc } from 'firebase/firestore';
import './SignUp.css';

function SignUp({ onSignUp }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    try {
      // Add user profile data to Firestore
      await addDoc(collection(db, "profiles"), {
        full_name: fullName,
        email: email,
        password: password,
        created_at: new Date(),
      });

      setMessage('Sign up successful!');
      onSignUp(); // Call the onSignUp function to proceed to the next step
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Create Your Account<span role="img" aria-label="wave">👋</span></h1>
        <p>Start your journey to financial success. Sign up today!</p>

        <form className="signup-form" onSubmit={handleSignUp}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Your Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Example@gmail.com"
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

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="sign-up-button">Sign up</button>
        </form>

        {message && <p className="signup-message">{message}</p>}

        <p className="login-redirect">
          Already have an account? <a href="#" onClick={onSignUp}>Log in</a>
        </p>

        <footer>© 2024 ALL RIGHTS RESERVED</footer>
      </div>
    </div>
  );
}

export default SignUp;
