import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [portfolioRes, investmentsRes] = await Promise.all([
        API.get('/investments/portfolio'),
        API.get('/investments/active')
      ]);
      setPortfolio(portfolioRes.data);
      setInvestments(investmentsRes.data);
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  const totalInvested = portfolio?.totalInvested || 0;
  const currentValue = portfolio?.currentValue || 0;
  const totalReturns = portfolio?.totalReturns || 0;
  const returnPct = totalInvested > 0 ? ((totalReturns / totalInvested) * 100).toFixed(2) : 0;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Welcome, {user?.fullName}</h1>
        <p>Here's your investment overview and portfolio summary</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Invested</div>
          <div className="stat-value">₹{totalInvested.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Current Value</div>
          <div className="stat-value">₹{currentValue.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Returns</div>
          <div className="stat-value">₹{totalReturns.toLocaleString()}</div>
          <div className={`stat-change ${totalReturns >= 0 ? 'stat-positive' : 'stat-negative'}`}>
            {totalReturns >= 0 ? '↑' : '↓'} {returnPct}%
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Investments</div>
          <div className="stat-value">{portfolio?.activeInvestments || 0}</div>
        </div>
      </div>

      <div className="grid-2">
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Active Investments</h2>
            <Link to="/investments" className="btn btn-secondary btn-sm">View All</Link>
          </div>

          {investments.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>No active investments yet</p>
              <Link to="/funds" className="btn btn-primary">Explore Funds</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {investments.slice(0, 5).map(inv => (
                <div key={inv.id} className="investment-card">
                  <div className="investment-info">
                    <div className="investment-fund-name">{inv.mutualFund?.name}</div>
                    <div className="investment-details">
                      {inv.investmentType} • {inv.investmentDate} • {inv.units?.toFixed(2)} units
                    </div>
                  </div>
                  <div className="investment-values">
                    <div className="investment-value-item">
                      <div className="investment-value-label">Invested</div>
                      <div className="investment-value-amount">₹{inv.amount?.toLocaleString()}</div>
                    </div>
                    <div className="investment-value-item">
                      <div className="investment-value-label">Current</div>
                      <div className="investment-value-amount stat-positive">₹{inv.currentValue?.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="section-title">Quick Actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/funds" className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
              <span style={{ fontSize: '2rem' }}>📊</span>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Explore Funds</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Browse and compare mutual funds</div>
              </div>
            </Link>
            <Link to="/learn" className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
              <span style={{ fontSize: '2rem' }}>📚</span>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Learn About Investing</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Educational content from experts</div>
              </div>
            </Link>
            <Link to="/reports" className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
              <span style={{ fontSize: '2rem' }}>📈</span>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Market Reports</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Latest analysis and insights</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
