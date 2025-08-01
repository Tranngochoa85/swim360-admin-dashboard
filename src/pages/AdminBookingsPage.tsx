import { useState, useEffect } from 'react';
import { getBookings } from '../api/adminApi';
import { Link } from 'react-router-dom';

// Định nghĩa các kiểu dữ liệu lồng nhau cho một Khóa học
interface UserSimple {
  id: number;
  full_name: string | null;
  email: string;
}
interface PoolSimple {
  id: number;
  name: string;
}
interface Booking {
  id: number;
  status: string;
  created_at: string;
  learner: UserSimple;
  coach: UserSimple;
  pool: PoolSimple;
}

export const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div>Loading bookings...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/">&larr; Back to Dashboard</Link>
      <h2 style={{ marginTop: '20px' }}>Booking Management</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Learner</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Coach</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Pool</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? bookings.map(booking => (
            <tr key={booking.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px' }}>{booking.id}</td>
              {/* Truy cập vào các trường dữ liệu lồng nhau */}
              <td style={{ padding: '8px' }}>{booking.learner.email}</td>
              <td style={{ padding: '8px' }}>{booking.coach.email}</td>
              <td style={{ padding: '8px' }}>{booking.pool.name}</td>
              <td style={{ padding: '8px' }}>{booking.status}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan={5} style={{ padding: '8px', textAlign: 'center' }}>No bookings found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};