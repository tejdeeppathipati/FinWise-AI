import React, { useEffect, useState } from 'react';
import { db } from './firebaseClient'; // Update if needed based on your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';
import './Sidebar.css';

function Sidebar() {
  const [netWorth, setNetWorth] = useState(0);
  const [assets, setAssets] = useState(0);
  const [liabilities, setLiabilities] = useState(0);
  const [cash, setCash] = useState(0);
  const [credit, setCredit] = useState(0);

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
            setAssets(data.assets);
            setLiabilities(data.liabilities);
            setNetWorth(data.assets - data.liabilities);
          }
        }

        // Fetching bank accounts info from Firebase
        const bankAccountsSnapshot = await getDocs(collection(db, 'bank_accounts'));
        if (!bankAccountsSnapshot.empty) {
          let cashTotal = 0;
          let creditTotal = 0;

          bankAccountsSnapshot.forEach(doc => {
            const account = doc.data();
            if (account.account_type.toLowerCase() === 'cash') {
              cashTotal += parseFloat(account.balance);
            } else if (account.account_type.toLowerCase() === 'credit') {
              creditTotal += parseFloat(account.balance);
            }
          });

          setCash(cashTotal);
          setCredit(creditTotal);
        }
      } catch (error) {
        console.error('Error fetching financial data:', error);
      }
    };

    fetchFinancialData();
  }, []);

  return (
    <div className="sidebar">
      <h2>Net Worth</h2>
      <div className="net-worth">
        <h3>${netWorth}</h3>
      </div>
      <div className="section">
        <h4 className="section-title">ASSETS</h4>
        <p className="section-amount positive">${assets}</p>
      </div>
      <div className="section">
        <h4 className="section-title">LIABILITIES</h4>
        <p className="section-amount negative">-${liabilities}</p>
      </div>
      <div className="sub-section">
        <h4 className="sub-title">CASH</h4>
        <p className="sub-amount">${cash}</p>
      </div>
      <div className="sub-section">
        <h4 className="sub-title">CREDIT</h4>
        <p className="sub-amount negative">-${credit}</p>
      </div>
    </div>
  );
}

export default Sidebar;
