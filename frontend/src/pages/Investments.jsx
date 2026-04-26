import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

export default function Investments() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('ACTIVE');

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const res = await API.get('/investments');
      setInvestments(res.data);
    } catch (err) {
      console.error('Failed to fetch investments', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (id) => {
    if (!window.confirm('Are you sure you want to redeem this investment?')) return;
    try {
      await API.put(`/investments/${id}/redeem`);
      fetchInvestments();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to redeem');
    }
  };

  const filtered = investments.filter(inv => {
    if (tab === 'ALL') return true;
    return inv.status === tab;
  });

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Investments</h1>
        <p>Track and manage your mutual fund investments</p>
      </div>

      <div className="tabs">
        {['ALL', 'ACTIVE', 'REDEEMED'].map(t => (
          <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t === 'ALL' ? 'All' : t.charAt(0) + t.slice(1).toLowerCase()}
            {t !== 'ALL' && ` (${investments.filter(i => i.status === t).length})`}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <h3>No {tab.toLowerCase()} investments</h3>
          <p style={{ marginBottom: '1rem' }}>Start investing to build your portfolio</p>
          <Link to="/funds" className="btn btn-primary">Explore Funds</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map(inv => {
            const returnAmt = (inv.currentValue || 0) - (inv.amount || 0);
            const returnPct = inv.amount ? ((returnAmt / inv.amount) * 100).toFixed(2) : 0;
            return (
              <div key={inv.id} className="investment-card">
                <div className="investment-info">
                  <div className="investment-fund-name">
                    <Link to={`/funds/${inv.mutualFund?.id}`} style={{ color: 'inherit' }}>
                      {inv.mutualFund?.name}
                    </Link>
                  </div>
                  <div className="investment-details">
                    <span className={`badge ${inv.status === 'ACTIVE' ? 'badge-green' : 'badge-red'}`} style={{ marginRight: '8px' }}>
                      {inv.status}
                    </span>
                    {inv.investmentType} • {inv.investmentDate} • {inv.units?.toFixed(2)} units
                    {inv.sipAmount && ` • SIP ₹${inv.sipAmount}/mo`}
                  </div>
                </div>
                <div className="investment-values">
                  <div className="investment-value-item">
                    <div className="investment-value-label">Invested</div>
                    <div className="investment-value-amount">₹{inv.amount?.toLocaleString()}</div>
                  </div>
                  <div className="investment-value-item">
                    <div className="investment-value-label">Current Value</div>
                    <div className="investment-value-amount stat-positive">₹{inv.currentValue?.toLocaleString()}</div>
                  </div>
                  <div className="investment-value-item">
                    <div className="investment-value-label">Returns</div>
                    <div className={`investment-value-amount ${returnAmt >= 0 ? 'stat-positive' : 'stat-negative'}`}>
                      {returnAmt >= 0 ? '+' : ''}₹{returnAmt.toLocaleString()} ({returnPct}%)
                    </div>
                  </div>
                  {inv.status === 'ACTIVE' && (
                    <button className="btn btn-danger btn-sm" onClick={() => handleRedeem(inv.id)}>
                      Redeem
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Update: Add unit tests for calculation utilities

// Update: Update axios configuration for production

// Update: Refactor user profile management
