import { useState, useEffect } from 'react';
import { getTransactions } from '../api/adminApi';
import { Link } from 'react-router-dom';

interface Transaction {
  id: number;
  amount: number;
  platform_fee: number;
  status: string;
  created_at: string;
  booking: {
    id: number;
  };
}

export const AdminTransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  if (loading) return <div>Loading transactions...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/">&larr; Back to Dashboard</Link>
      <h2 style={{ marginTop: '20px' }}>Transaction Management</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Booking ID</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Amount</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Platform Fee</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? transactions.map(tx => (
            <tr key={tx.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px' }}>{tx.id}</td>
              <td style={{ padding: '8px' }}>{tx.booking.id}</td>
              <td style={{ padding: '8px' }}>{tx.amount.toLocaleString('vi-VN')} VND</td>
              <td style={{ padding: '8px' }}>{tx.platform_fee.toLocaleString('vi-VN')} VND</td>
              <td style={{ padding: '8px' }}>{tx.status}</td>
              <td style={{ padding: '8px' }}>{new Date(tx.created_at).toLocaleString('vi-VN')}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan={6} style={{ padding: '8px', textAlign: 'center' }}>No transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};