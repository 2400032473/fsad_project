import { useState, useEffect } from 'react';
import API from '../api/axios';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [funds, setFunds] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, fundsRes, statsRes] = await Promise.all([
        API.get('/users'),
        API.get('/funds'),
        API.get('/investments/stats')
      ]);
      setUsers(usersRes.data);
      setFunds(fundsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error('Failed to fetch admin data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to deactivate this user?')) return;
    try {
      await API.delete(`/users/${id}`);
      fetchData();
    } catch (err) {
      alert('Failed to deactivate user');
    }
  };

  const handleDeleteFund = async (id) => {
    if (!window.confirm('Are you sure you want to delete this fund?')) return;
    try {
      await API.delete(`/funds/${id}`);
      fetchData();
    } catch (err) {
      alert('Failed to delete fund');
    }
  };

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  const roleBadge = (role) => {
    const cls = { ADMIN: 'badge-admin', INVESTOR: 'badge-investor', FINANCIAL_ADVISOR: 'badge-advisor', DATA_ANALYST: 'badge-analyst' };
    return cls[role] || '';
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Admin Panel</h1>
        <p>Manage platform users, funds, and monitor activities</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Users</div>
          <div className="stat-value">{users.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Funds</div>
          <div className="stat-value">{funds.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Investments</div>
          <div className="stat-value">{stats.totalActiveInvestments || 0}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total AUM</div>
          <div className="stat-value">₹{(stats.totalPlatformInvestment || 0).toLocaleString()}</div>
        </div>
      </div>

      <div className="tabs">
        {['overview', 'users', 'funds'].map(t => (
          <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid-2">
          <div className="card">
            <h3 className="card-title">User Distribution</h3>
            <div style={{ marginTop: '1rem' }}>
              {['ADMIN', 'INVESTOR', 'FINANCIAL_ADVISOR', 'DATA_ANALYST'].map(role => {
                const count = users.filter(u => u.role === role).length;
                const pct = users.length ? ((count / users.length) * 100).toFixed(0) : 0;
                return (
                  <div key={role} style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{role.replace('_', ' ')}</span>
                      <span style={{ fontWeight: 600 }}>{count} ({pct}%)</span>
                    </div>
                    <div style={{ height: '6px', background: 'var(--bg-input)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: 'var(--gradient-1)', borderRadius: '3px', transition: 'width 0.5s ease' }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">Fund Categories</h3>
            <div style={{ marginTop: '1rem' }}>
              {['EQUITY', 'DEBT', 'HYBRID', 'INDEX', 'ELSS', 'LIQUID', 'SECTORAL'].map(cat => {
                const count = funds.filter(f => f.category === cat).length;
                return (
                  <div key={cat} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
                    <span className={`fund-category-badge cat-${cat.toLowerCase()}`}>{cat}</span>
                    <span style={{ fontWeight: 600 }}>{count} funds</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {tab === 'users' && (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user.fullName}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td><span className={`user-badge ${roleBadge(user.role)}`} style={{ fontSize: '0.7rem' }}>{user.role?.replace('_', ' ')}</span></td>
                  <td><span className={`badge ${user.active ? 'badge-green' : 'badge-red'}`}>{user.active ? 'Active' : 'Inactive'}</span></td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user.id)}>Deactivate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'funds' && (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>NAV</th>
                <th>1Y Return</th>
                <th>Risk</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {funds.map(fund => (
                <tr key={fund.id}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{fund.name}</td>
                  <td><span className={`fund-category-badge cat-${fund.category?.toLowerCase()}`}>{fund.category}</span></td>
                  <td>₹{fund.navValue?.toFixed(2)}</td>
                  <td className={fund.returns1Year >= 0 ? 'stat-positive' : 'stat-negative'}>{fund.returns1Year}%</td>
                  <td>{fund.riskLevel?.replace('_', ' ')}</td>
                  <td>{fund.rating}⭐</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteFund(fund.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
