import { useState, useEffect } from 'react'; // Thêm useState, useEffect
import { Link, useNavigate } from 'react-router-dom';
import { getPendingPools, approvePool, rejectPool } from '../api/adminApi';

// Khai báo kiểu dữ liệu cho pool
interface Pool {
  id: number;
  name: string;
  address: string;
  status: string;
  owner_id: number;
}

export const AdminDashboardPage = () => {
  const [pendingPools, setPendingPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchPools = async () => {
    try {
      setLoading(true);
      const data = await getPendingPools();
      setPendingPools(data);
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('adminAccessToken');
        navigate('/login');
      } else {
        setError('Failed to fetch pending pools.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPools();
  }, [navigate]);

  const handleApprove = async (poolId: number) => {
    if (!window.confirm("Bạn có chắc muốn PHÊ DUYỆT hồ bơi này?")) return;
    try {
      await approvePool(poolId);
      fetchPools();
    } catch (err) {
      alert("Có lỗi xảy ra khi phê duyệt.");
      console.error(err);
    }
  };

  const handleReject = async (poolId: number) => {
    if (!window.confirm("Bạn có chắc muốn TỪ CHỐI hồ bơi này?")) return;
    try {
      await rejectPool(poolId);
      fetchPools();
    } catch (err) {
      alert("Có lỗi xảy ra khi từ chối.");
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAccessToken');
    navigate('/login');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
        <Link to="/users"><button>Manage Users</button></Link>
        <Link to="/bookings"><button>Manage Bookings</button></Link>
      </div>
      <hr />
      <h3>Hồ bơi đang chờ duyệt ({pendingPools.length})</h3>
      {pendingPools.length === 0 ? (
        <p>Không có hồ bơi nào đang chờ duyệt.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Tên Hồ bơi</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Địa chỉ</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {pendingPools.map((pool: Pool) => ( // Thêm kiểu dữ liệu cho pool
              <tr key={pool.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px' }}>{pool.id}</td>
                <td style={{ padding: '8px' }}>{pool.name}</td>
                <td style={{ padding: '8px' }}>{pool.address}</td>
                <td style={{ padding: '8px', display: 'flex', gap: '5px' }}>
                  <button onClick={() => handleApprove(pool.id)} style={{ backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer', padding: '5px 10px' }}>Duyệt</button>
                  <button onClick={() => handleReject(pool.id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer', padding: '5px 10px' }}>Từ chối</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};