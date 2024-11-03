import React, { useEffect, useState } from 'react';
import { db } from './firebaseClient'; // Adjust as per your firebaseClient file path
import { collection, getDocs } from 'firebase/firestore';
import './DashboardMain.css';

function DashboardMain() {
  const [netWorth, setNetWorth] = useState(0);
  const [cashFlow, setCashFlow] = useState(0);
  const [budgeting, setBudgeting] = useState(0);
  const [retirementSavings, setRetirementSavings] = useState(0);

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        // Fetching financial info from Firebase
        const financialInfoSnapshot = await getDocs(collection(db, 'financial_info'));
        if (!financialInfoSnapshot.empty) {
          let data = null;
          financialInfoSnapshot.forEach(doc => {
            data = doc.data(); // Fetching data from Firestore
          });

          if (data) {
            setNetWorth(data.assets - data.liabilities); // Calculate net worth
            setCashFlow(data.cashFlow || 0); // If cashFlow is present
            setBudgeting(data.budgeting || 0); // Fetch budgeting details if available
            setRetirementSavings(data.retirementSavings || 0); // Fetch retirement savings if available
          }
        }
      } catch (error) {
        console.error('Error fetching financial data:', error);
      }
    };

    fetchFinancialData();
  }, []);

  return (
    <div className="dashboard-main">
      {/* Portfolio Balances */}
      <div className="card portfolio-balances">
        <h2>Net Worth</h2>
        <p>${netWorth}</p>
      </div>

      {/* Cash Flow Section */}
      <div className="card cash-flow">
        <h2>Cash Flow</h2>
        <p>${cashFlow}</p>
      </div>

      {/* Budgeting Section */}
      <div className="card budgeting">
        <h2>Budgeting</h2>
        <p>${budgeting} / $8,000</p> {/* Assuming a target value */}
      </div>

      {/* Retirement Savings */}
      <div className="card retirement-savings">
        <h2>Retirement Savings</h2>
        <p>${retirementSavings}</p>
      </div>
    </div>
  );
}

export default DashboardMain;
