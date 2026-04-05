import { useState, useEffect } from 'react';
import API from '../api/axios';

export default function AnalystPanel() {
  const [reports, setReports] = useState([]);
  const [funds, setFunds] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', reportType: 'QUARTERLY_PERFORMANCE', reportData: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [reportsRes, fundsRes, statsRes] = await Promise.all([
        API.get('/reports'),
        API.get('/funds'),
        API.get('/investments/stats')
      ]);
      setReports(reportsRes.data);
      setFunds(fundsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error('Error', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/reports', form);
      setShowForm(false);
      setForm({ title: '', description: '', reportType: 'QUARTERLY_PERFORMANCE', reportData: '' });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create report');
    }
  };

  const handleUpdateNav = async (fundId, newNav) => {
    try {
      await API.put(`/funds/${fundId}`, { navValue: parseFloat(newNav) });
      fetchData();
    } catch (err) {
      alert('Failed to update NAV');
    }
  };

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  const avgReturn = funds.length ? (funds.reduce((s, f) => s + (f.returns1Year || 0), 0) / funds.length).toFixed(1) : 0;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Data Analyst Panel</h1>
        <p>Analyze investment trends, update fund data, and generate reports</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Funds Tracked</div>
          <div className="stat-value">{funds.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg 1Y Return</div>
          <div className="stat-value stat-positive">{avgReturn}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Platform AUM</div>
          <div className="stat-value">₹{(stats.totalPlatformInvestment || 0).toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Reports Generated</div>
          <div className="stat-value">{reports.length}</div>
        </div>
      </div>

      <div className="grid-2">
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Fund Performance Data</h2>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Fund</th>
                  <th>NAV</th>
                  <th>1Y</th>
                  <th>3Y</th>
                  <th>5Y</th>
                  <th>Update NAV</th>
                </tr>
              </thead>
              <tbody>
                {funds.map(fund => (
                  <tr key={fund.id}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)', maxWidth: '200px' }}>{fund.name}</td>
                    <td>₹{fund.navValue?.toFixed(2)}</td>
                    <td className={fund.returns1Year >= 0 ? 'stat-positive' : 'stat-negative'}>{fund.returns1Year}%</td>
                    <td className={fund.returns3Year >= 0 ? 'stat-positive' : 'stat-negative'}>{fund.returns3Year}%</td>
                    <td className={fund.returns5Year >= 0 ? 'stat-positive' : 'stat-negative'}>{fund.returns5Year}%</td>
                    <td>
                      <input type="number" step="0.01" className="form-input"
                        style={{ width: '100px', padding: '4px 8px', fontSize: '0.8rem' }}
                        placeholder="New NAV"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleUpdateNav(fund.id, e.target.value);
                        }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Reports</h2>
            <button className="btn btn-primary btn-sm" onClick={() => setShowForm(true)}>+ New Report</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {reports.map(report => (
              <div key={report.id} className="report-card">
                <span className="report-type-badge">{report.reportType?.replace('_', ' ')}</span>
                <h3 style={{ marginTop: '0.5rem', fontWeight: 700, fontSize: '1rem' }}>{report.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{report.description}</p>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  {report.generatedBy?.fullName} • {new Date(report.generatedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Generate New Report</h3>
              <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Report Title</label>
                <input type="text" className="form-input" value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Report Type</label>
                <select className="form-select" value={form.reportType}
                  onChange={(e) => setForm({ ...form, reportType: e.target.value })}>
                  <option value="QUARTERLY_PERFORMANCE">Quarterly Performance</option>
                  <option value="INVESTOR_BEHAVIOR">Investor Behavior</option>
                  <option value="CATEGORY_COMPARISON">Category Comparison</option>
                  <option value="RISK_ANALYSIS">Risk Analysis</option>
                  <option value="MARKET_TRENDS">Market Trends</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })} required
                  style={{ minHeight: '100px' }} />
              </div>
              <div className="form-group">
                <label className="form-label">Report Data (JSON)</label>
                <textarea className="form-textarea" value={form.reportData}
                  onChange={(e) => setForm({ ...form, reportData: e.target.value })}
                  placeholder='{"key": "value"}'
                  style={{ minHeight: '80px', fontFamily: 'monospace', fontSize: '0.85rem' }} />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Generate Report</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
