import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios'; // Import thư viện axios

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Cấu hình dữ liệu gửi đi dạng form
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    try {
      // Gửi request đến API backend
      const response = await axios.post('http://172.20.10.2:8000/login', params);

      const accessToken = response.data.access_token;
      console.log('Admin đăng nhập thành công! Token:', accessToken);
      localStorage.setItem('adminAccessToken', accessToken); // Lưu token của Admin

      navigate('/');

    } catch (error) {
      console.error('Lỗi đăng nhập Admin:', error);
      alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 20px 0' }}>Swim360 Admin Panel</h2>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '12px' }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '12px' }}
          required
        />
        <button type="submit" style={{ padding: '12px', cursor: 'pointer', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Login
        </button>
      </form>
    </div>
  );
};