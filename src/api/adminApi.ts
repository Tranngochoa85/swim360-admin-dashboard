import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; // Hoặc IP mạng của bạn

// --- HÀM HELPER ĐỂ LẤY HEADERS XÁC THỰC ---
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminAccessToken');
  if (!token) {
    // Ném ra lỗi để các hàm gọi API có thể bắt được
    throw new Error('No admin token found. Please login again.');
  }
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// --- CÁC HÀM GỌI API ---

export const getPendingPools = async () => {
  const response = await axios.get(`${API_URL}/admin/pools/pending`, {
    headers: getAuthHeaders()
  });
  return response.data;
};

export const approvePool = async (poolId: number) => {
  const response = await axios.post(`${API_URL}/admin/pools/${poolId}/approve`, {}, {
    headers: getAuthHeaders()
  });
  return response.data;
};

export const rejectPool = async (poolId: number) => {
  const response = await axios.post(`${API_URL}/admin/pools/${poolId}/reject`, {}, {
    headers: getAuthHeaders()
  });
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/admin/users/`, {
    headers: getAuthHeaders()
  });
  return response.data;
};
export const updateUserRole = async (userId: number, newRole: string) => {
  const response = await axios.patch(`${API_URL}/admin/users/${userId}/role`, 
    { role: newRole }, // Đây là body của request
    {
      headers: getAuthHeaders()
    }
  );
  return response.data;
};
export const getBookings = async () => {
  const response = await axios.get(`${API_URL}/admin/bookings/`, {
    headers: getAuthHeaders()
  });
  return response.data;
};