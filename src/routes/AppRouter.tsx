import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLoginPage } from '../pages/AdminLoginPage';
import { AdminDashboardPage } from '../pages/AdminDashboardPage';
import { AdminUsersPage } from '../pages/AdminUsersPage';
import { AdminBookingsPage } from '../pages/AdminBookingsPage';
import { AdminTransactionsPage } from '../pages/AdminTransactionsPage'; // Import trang mới

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem('adminAccessToken');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/" element={<PrivateRoute><AdminDashboardPage /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><AdminUsersPage /></PrivateRoute>} />
        <Route path="/bookings" element={<PrivateRoute><AdminBookingsPage /></PrivateRoute>} />
        {/* Thêm Route mới cho trang Transactions */}
        <Route path="/transactions" element={<PrivateRoute><AdminTransactionsPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};