import React, { useState } from 'react';
import { db } from './firebaseClient';
import { addDoc, collection } from 'firebase/firestore';
import Papa from 'papaparse';
import './FinancialInfoForm.css';

function FinancialInfoForm({ onFinancialInfoSubmitted }) {
  const [csvFile, setCsvFile] = useState(null);
  const [income, setIncome] = useState('');
  const [assets, setAssets] = useState('');
  const [liabilities, setLiabilities] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!csvFile) {
      setMessage('Please upload a CSV file.');
      return;
    }

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async function (results) {
        const data = results.data;

        try {
          for (let row of data) {
            if (row.account_number && row.bank_name && row.account_type && row.balance) {
              await addDoc(collection(db, "bank_accounts"), {
                account_number: row.account_number,
                bank_name: row.bank_name,
                account_type: row.account_type,
                balance: parseFloat(row.balance),
                created_at: new Date(),
              });
            } else {
              console.error('Invalid CSV data format:', row);
            }
          }
          setMessage('Bank details uploaded successfully!');
        } catch (error) {
          setMessage(`Error: ${error.message}`);
          console.error('Error saving data:', error);
        }
      },
    });
  };

  const handleFinancialInfoSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "financial_info"), {
        income: parseFloat(income),
        assets: parseFloat(assets),
        liabilities: parseFloat(liabilities),
        created_at: new Date(),
      });

      setMessage('Financial information added successfully!');
      
      // Call the callback function to proceed to the dashboard
      onFinancialInfoSubmitted();

    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error('Error adding financial info: ', error);
    }
  };

  return (
    <div className="financial-info-container">
      <div className="financial-info-box">
        <h2>Link Your Bank Account and Enter Financial Details</h2>

        {/* CSV File Upload for Bank Account Details */}
        <form className="financial-info-form" onSubmit={handleFileUpload}>
          <div className="input-group">
            <label>Upload CSV File</label>
            <input type="file" accept=".csv" onChange={handleFileChange} />
          </div>
          <button type="submit" className="financial-info-button">Upload Bank Accounts</button>
        </form>

        {/* Form for Financial Information */}
        <form className="financial-info-form" onSubmit={handleFinancialInfoSubmit}>
          <div className="input-group">
            <label>Net Income</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Assets</label>
            <input
              type="number"
              value={assets}
              onChange={(e) => setAssets(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Liabilities</label>
            <input
              type="number"
              value={liabilities}
              onChange={(e) => setLiabilities(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="financial-info-button">Submit Financial Info</button>
        </form>

        {message && <p className="form-message">{message}</p>}
      </div>
    </div>
  );
}

export default FinancialInfoForm;
