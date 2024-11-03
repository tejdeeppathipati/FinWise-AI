import React, { useState } from 'react';
import { db } from './firebaseClient'; // Adjust path as per your setup
import { collection, addDoc } from 'firebase/firestore';
import './Planning.css';

function Planning() {
  const [financialGoal, setFinancialGoal] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [age, setAge] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [riskTolerance, setRiskTolerance] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState(''); // State for storing financial advice

  const handlePlanningSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setAdvice(''); // Reset advice on new submission

    try {
      // Store the planning data in the Firebase database
      const docRef = await addDoc(collection(db, "financial_plans"), {
        financial_goal: financialGoal,
        target_amount: parseFloat(targetAmount),
        time_period: parseInt(timePeriod, 10),
        age: parseInt(age, 10),
        annual_income: parseFloat(annualIncome),
        risk_tolerance: riskTolerance,
        created_at: new Date(),
      });

      setMessage('Financial goal saved successfully!');
      
      // Prepare data for backend request
      const data = {
        document_id: docRef.id, // Use Firebase document ID for backend
        financial_goal: financialGoal,
        target_amount: parseFloat(targetAmount),
        time_period: parseInt(timePeriod, 10),
        age: parseInt(age, 10),
        annual_income: parseFloat(annualIncome),
        risk_tolerance: riskTolerance,
      };

      // Call the backend API to generate financial advice based on saved data
      const response = await fetch('http://127.0.0.1:5000/generate_advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setAdvice(result.summary); // Display summary from backend advice
      } else {
        setAdvice('Failed to generate financial advice.');
      }

      // Clear form inputs
      setFinancialGoal('');
      setTargetAmount('');
      setTimePeriod('');
      setAge('');
      setAnnualIncome('');
      setRiskTolerance('');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error('Error saving financial goal: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="planning-container">
      <div className="planning-box">
        <h1>Financial Planning <span role="img" aria-label="target">🎯</span></h1>
        <p>Set your financial goals to achieve your dreams.</p>

        <form className="planning-form" onSubmit={handlePlanningSubmit}>
          <div className="input-group">
            <label>What is your financial goal?</label>
            <input
              type="text"
              placeholder="E.g., Buy a house, Retirement, etc."
              value={financialGoal}
              onChange={(e) => setFinancialGoal(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Target Amount</label>
            <input
              type="number"
              placeholder="E.g., 50000"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Time Period (in years)</label>
            <input
              type="number"
              placeholder="E.g., 10"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Age</label>
            <input
              type="number"
              placeholder="Your current age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Annual Income</label>
            <input
              type="number"
              placeholder="E.g., 60000"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Risk Tolerance</label>
            <select
              value={riskTolerance}
              onChange={(e) => setRiskTolerance(e.target.value)}
              required
            >
              <option value="">Select risk tolerance</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <button type="submit" className="planning-submit-button" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {loading && <div className="spinner"></div>}
        {message && <p className="form-message">{message}</p>}
        {advice && <p className="advice-message">Investment Summary: {advice}</p>}
      </div>
    </div>
  );
}

export default Planning;