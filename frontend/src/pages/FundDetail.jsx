import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function FundDetail() {
  const { id } = useParams();
  const [fund, setFund] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInvest, setShowInvest] = useState(false);
  const [investForm, setInvestForm] = useState({ amount: '', investmentType: 'LUMPSUM', sipAmount: '' });
  const [investLoading, setInvestLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFund();
  }, [id]);

  const fetchFund = async () => {
    try {
      const res = await API.get(`/funds/${id}`);
      setFund(res.data);
    } catch (err) {
      console.error('Failed to fetch fund', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInvest = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setInvestLoading(true);
    setMessage('');
    try {
      await API.post('/investments', {
        fundId: fund.id,
        amount: parseFloat(investForm.amount),
        investmentType: investForm.investmentType,
        sipAmount: investForm.sipAmount ? parseFloat(investForm.sipAmount) : null
      });
      setMessage('Investment created successfully!');
      setShowInvest(false);
      setInvestForm({ amount: '', investmentType: 'LUMPSUM', sipAmount: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Investment failed');
    } finally {
      setInvestLoading(false);
    }
  };

  const riskClass = (risk) => {
    switch (risk) {
      case 'LOW': return 'risk-low';
      case 'MODERATE': return 'risk-moderate';
      case 'HIGH': return 'risk-high';
      case 'VERY_HIGH': return 'risk-very-high';
      default: return '';
    }
  };

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;
  if (!fund) return <div className="page-container"><div className="empty-state"><h3>Fund not found</h3></div></div>;

  return (
    <div className="page-container">
      {message && (
        <div style={{ marginBottom: '1rem', padding: '12px 16px', borderRadius: 'var(--radius-sm)',
          background: message.includes('success') ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
          color: message.includes('success') ? 'var(--accent-green)' : 'var(--accent-red)',
          border: `1px solid ${message.includes('success') ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`
        }}>
          {message}
        </div>
      )}

      <div className="detail-hero">
        <div className="detail-top">
          <div className="detail-info">
            <h1>{fund.name}</h1>
            <p>{fund.fundHouse} • Managed by {fund.fundManager}</p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
              <span className={`fund-category-badge cat-${fund.category?.toLowerCase()}`}>{fund.category}</span>
              <span className={`badge ${riskClass(fund.riskLevel)}`} style={{ background: 'var(--bg-input)', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                {fund.riskLevel?.replace('_', ' ')} Risk
              </span>
            </div>
          </div>
          <div className="detail-actions">
            {user && user.role === 'INVESTOR' && (
              <button className="btn btn-primary btn-lg" onClick={() => setShowInvest(true)}>
                Invest Now
              </button>
            )}
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>

        <div className="returns-grid">
          <div className="return-item">
            <div className="return-label">NAV</div>
            <div className="return-value" style={{ color: 'var(--text-primary)' }}>₹{fund.navValue?.toFixed(2)}</div>
          </div>
          <div className="return-item">
            <div className="return-label">1 Year Return</div>
            <div className={`return-value ${fund.returns1Year >= 0 ? 'stat-positive' : 'stat-negative'}`}>
              {fund.returns1Year}%
            </div>
          </div>
          <div className="return-item">
            <div className="return-label">3 Year Return</div>
            <div className={`return-value ${fund.returns3Year >= 0 ? 'stat-positive' : 'stat-negative'}`}>
              {fund.returns3Year}%
            </div>
          </div>
          <div className="return-item">
            <div className="return-label">5 Year Return</div>
            <div className={`return-value ${fund.returns5Year >= 0 ? 'stat-positive' : 'stat-negative'}`}>
              {fund.returns5Year}%
            </div>
          </div>
          <div className="return-item">
            <div className="return-label">Expense Ratio</div>
            <div className="return-value" style={{ color: 'var(--text-primary)' }}>{fund.expenseRatio}%</div>
          </div>
          <div className="return-item">
            <div className="return-label">Fund Size (Cr)</div>
            <div className="return-value" style={{ color: 'var(--text-primary)' }}>₹{fund.fundSize?.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 className="card-title">About This Fund</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: '1rem', fontSize: '0.9rem' }}>
            {fund.description}
          </p>
        </div>

        <div className="card">
          <h3 className="card-title">Fund Details</h3>
          <div style={{ marginTop: '1rem' }}>
            {[
              ['Fund House', fund.fundHouse],
              ['Fund Manager', fund.fundManager],
              ['Category', fund.category],
              ['Risk Level', fund.riskLevel?.replace('_', ' ')],
              ['Min Investment', `₹${fund.minInvestment?.toLocaleString()}`],
              ['Launch Date', fund.launchDate],
              ['Rating', `${fund.rating}/5 ⭐`],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showInvest && (
        <div className="modal-overlay" onClick={() => setShowInvest(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Invest in {fund.name}</h3>
              <button className="modal-close" onClick={() => setShowInvest(false)}>×</button>
            </div>
            <form onSubmit={handleInvest}>
              <div className="form-group">
                <label className="form-label">Investment Type</label>
                <select className="form-select" value={investForm.investmentType}
                  onChange={(e) => setInvestForm({ ...investForm, investmentType: e.target.value })}>
                  <option value="LUMPSUM">Lump Sum</option>
                  <option value="SIP">SIP (Systematic Investment Plan)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Amount (₹)</label>
                <input type="number" className="form-input" value={investForm.amount}
                  onChange={(e) => setInvestForm({ ...investForm, amount: e.target.value })}
                  placeholder={`Min ₹${fund.minInvestment}`} required min={fund.minInvestment} />
              </div>
              {investForm.investmentType === 'SIP' && (
                <div className="form-group">
                  <label className="form-label">Monthly SIP Amount (₹)</label>
                  <input type="number" className="form-input" value={investForm.sipAmount}
                    onChange={(e) => setInvestForm({ ...investForm, sipAmount: e.target.value })}
                    placeholder="Monthly SIP amount" />
                </div>
              )}
              <div style={{ background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', padding: '1rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Estimated Units</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                  {investForm.amount ? (parseFloat(investForm.amount) / fund.navValue).toFixed(4) : '0.0000'} units
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={investLoading}>
                {investLoading ? 'Processing...' : 'Confirm Investment'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
