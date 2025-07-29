import React, { useState, useEffect } from 'react';
import { getUsers, updateUserRole } from '../api/adminApi'; // Thêm updateUserRole
import { Link } from 'react-router-dom';

interface User {
  id: number;
  full_name: string;
  email: string;
  role: string;
}

export const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user: User) => {
    setEditingUserId(user.id);
    setSelectedRole(user.role);
  };

  const handleSaveClick = async (userId: number) => {
    try {
      await updateUserRole(userId, selectedRole);
      setEditingUserId(null); // Thoát khỏi chế độ chỉnh sửa
      fetchUsers(); // Tải lại danh sách để cập nhật
    } catch (error) {
      console.error("Failed to update user role", error);
      alert("Cập nhật vai trò thất bại!");
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/">&larr; Back to Dashboard</Link>
      <h2 style={{ marginTop: '20px' }}>User Management</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Full Name</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Role</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px' }}>{user.id}</td>
              <td style={{ padding: '8px' }}>{user.full_name}</td>
              <td style={{ padding: '8px' }}>{user.email}</td>
              <td style={{ padding: '8px' }}>
                {editingUserId === user.id ? (
                  <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                    <option value="learner">learner</option>
                    <option value="coach">coach</option>
                    <option value="pool_owner">pool_owner</option>
                    <option value="admin">admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td style={{ padding: '8px' }}>
                {editingUserId === user.id ? (
                  <>
                    <button onClick={() => handleSaveClick(user.id)} style={{marginRight: '5px'}}>Save</button>
                    <button onClick={() => setEditingUserId(null)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEditClick(user)}>Edit Role</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};