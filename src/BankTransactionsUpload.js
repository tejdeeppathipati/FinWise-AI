// BankTransactionsUpload.js
import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import Papa from 'papaparse';

function BankTransactionsUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        const transactions = results.data.map((row) => ({
          user_id: supabase.auth.user().id,
          account_type: row.account_type,
          balance: parseFloat(row.balance),
          bank_name: row.bank_name,
        }));

        const { error } = await supabase.from('bank_transactions').insert(transactions);
        if (error) {
          console.error('Error uploading transactions:', error.message);
        } else {
          console.log('Transactions uploaded successfully!');
        }
      },
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Bank Transactions</button>
    </div>
  );
}

export default BankTransactionsUpload;
