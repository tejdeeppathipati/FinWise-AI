import React, { useEffect, useState } from 'react';
import { db } from './firebaseClient';
import { collection, getDocs } from 'firebase/firestore';
import './Overview.css';
import Navbar from './Navbar';
import Planning from './Planning.css';


function Overview() {
  const [financialData, setFinancialData] = useState({
    netWorth: 0,
    assets: 0,
    liabilities: 0,
    cash: 0,
    investments: 0,
    credit: 0,
    cashFlow: 0,
    investableCash: 0,
    budgeting: { current: 5812, goal: 8000, breakdown: [40, 30, 30] }, // percentages for breakdown
    portfolioBalance: 0,
    retirementSavings: 15706,
    marketMovers: {
      index: "12%",
      sp500: "6%",
      dow: "4%",
      foreign: "9%",
      usBond: "2%"
    }
  });

  useEffect(() => {
    const fetchFinancialData = async () => {
      const financialInfoSnapshot = await getDocs(collection(db, 'financial_info'));
      if (!financialInfoSnapshot.empty) {
        const data = financialInfoSnapshot.docs[0].data();
        setFinancialData(prevState => ({
          ...prevState,
          netWorth: data.assets - data.liabilities,
          assets: data.assets,
          liabilities: data.liabilities,
          cash: data.cash,
          credit: data.credit,
        }));
      }
    };
    fetchFinancialData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        {/* Top Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Net Worth</span>
              <div className="trend-indicator trend-up">+2.5%</div>
            </div>
            <div className="stat-card-value">
              ${financialData.netWorth?.toLocaleString() || '0'}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Total Assets</span>
              <div className="trend-indicator trend-up">+1.8%</div>
            </div>
            <div className="stat-card-value positive">
              ${financialData.assets?.toLocaleString() || '0'}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Total Liabilities</span>
              <div className="trend-indicator trend-down">-0.5%</div>
            </div>
            <div className="stat-card-value negative">
              ${financialData.liabilities?.toLocaleString() || '0'}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Cash Balance</span>
              <div className="trend-indicator trend-up">+3.2%</div>
            </div>
            <div className="stat-card-value">
              ${financialData.cash?.toLocaleString() || '0'}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="main-grid">
          {/* Market Movers Card */}
          <div className="card span-4">
            <div className="card-header">
              <h3 className="card-title">Market Movers</h3>
            </div>
            <div className="market-movers-list">
              {Object.entries(financialData.marketMovers).map(([key, value]) => (
                <div key={key} className="market-item">
                  <span className="text-secondary">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span>{value || '0%'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Overview Card */}
          <div className="card span-8">
            <div className="card-header">
              <h3 className="card-title">Budget Overview</h3>
            </div>
            <div className="budget-progress">
              <div className="text-secondary mb-4">
                ${financialData.budgeting.current.toLocaleString()} / 
                ${financialData.budgeting.goal.toLocaleString()}
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-value" 
                  style={{
                    width: `${(financialData.budgeting.current / financialData.budgeting.goal) * 100}%`
                  }}
                ></div>
              </div>
            </div>
            <div className="budget-breakdown">
              {financialData.budgeting.breakdown.map((percentage, index) => (
                <div key={index} className="breakdown-item">
                  <div className="breakdown-value">{percentage}%</div>
                  <div className="breakdown-label">
                    {index === 0 ? 'Necessities' : index === 1 ? 'Savings' : 'Discretionary'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Balance Card */}
          <div className="card span-6">
            <div className="card-header">
              <h3 className="card-title">Portfolio Balance</h3>
            </div>
            <div className="stat-card-value">
              ${financialData.portfolioBalance?.toLocaleString() || '0'}
            </div>
            <div className="graph-container">
              {/* Placeholder for future graph implementation */}
            </div>
          </div>

          {/* Retirement Savings Card */}
          <div className="card span-6">
            <div className="card-header">
              <h3 className="card-title">Retirement Savings</h3>
            </div>
            <div className="stat-card-value">
              ${financialData.retirementSavings?.toLocaleString() || '0'}
            </div>
            <div className="graph-container">
              {/* Placeholder for future graph implementation */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Overview;