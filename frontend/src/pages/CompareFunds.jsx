import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import API from '../api/axios';

export default function CompareFunds() {
  const [searchParams] = useSearchParams();
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = searchParams.get('ids');
    if (ids) fetchFunds(ids);
  }, [searchParams]);

  const fetchFunds = async (ids) => {
    try {
      const res = await API.get(`/funds/compare?ids=${ids}`);
      setFunds(res.data);
    } catch (err) {
      console.error('Failed to compare funds', err);
    } finally {
      setLoading(false);
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

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Compare Mutual Funds</h1>
        <p>Side-by-side comparison of selected funds</p>
      </div>

      <Link to="/funds" className="btn btn-secondary btn-sm" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
        ← Back to Funds
      </Link>

      {funds.length === 0 ? (
        <div className="empty-state">
          <h3>No funds selected for comparison</h3>
          <p>Go back to the funds page and select funds to compare</p>
        </div>
      ) : (
        <div className="table-container" style={{ overflowX: 'auto' }}>
          <table className="compare-table">
            <thead>
              <tr>
                <th>Parameter</th>
                {funds.map(f => <th key={f.id}>{f.name}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Fund House</strong></td>
                {funds.map(f => <td key={f.id}>{f.fundHouse}</td>)}
              </tr>
              <tr>
                <td><strong>Category</strong></td>
                {funds.map(f => <td key={f.id}>
                  <span className={`fund-category-badge cat-${f.category?.toLowerCase()}`}>{f.category}</span>
                </td>)}
              </tr>
              <tr>
                <td><strong>Risk Level</strong></td>
                {funds.map(f => <td key={f.id}>
                  <span className={riskClass(f.riskLevel)} style={{ fontWeight: 600 }}>
                    {f.riskLevel?.replace('_', ' ')}
                  </span>
                </td>)}
              </tr>
              <tr>
                <td><strong>NAV (₹)</strong></td>
                {funds.map(f => <td key={f.id} style={{ fontWeight: 700 }}>₹{f.navValue?.toFixed(2)}</td>)}
              </tr>
              <tr>
                <td><strong>1 Year Return</strong></td>
                {funds.map(f => <td key={f.id} className={f.returns1Year >= 0 ? 'stat-positive' : 'stat-negative'} style={{ fontWeight: 700 }}>
                  {f.returns1Year}%
                </td>)}
              </tr>
              <tr>
                <td><strong>3 Year Return</strong></td>
                {funds.map(f => <td key={f.id} className={f.returns3Year >= 0 ? 'stat-positive' : 'stat-negative'} style={{ fontWeight: 700 }}>
                  {f.returns3Year}%
                </td>)}
              </tr>
              <tr>
                <td><strong>5 Year Return</strong></td>
                {funds.map(f => <td key={f.id} className={f.returns5Year >= 0 ? 'stat-positive' : 'stat-negative'} style={{ fontWeight: 700 }}>
                  {f.returns5Year}%
                </td>)}
              </tr>
              <tr>
                <td><strong>Expense Ratio</strong></td>
                {funds.map(f => <td key={f.id}>{f.expenseRatio}%</td>)}
              </tr>
              <tr>
                <td><strong>Min Investment</strong></td>
                {funds.map(f => <td key={f.id}>₹{f.minInvestment?.toLocaleString()}</td>)}
              </tr>
              <tr>
                <td><strong>Fund Size (Cr)</strong></td>
                {funds.map(f => <td key={f.id}>₹{f.fundSize?.toLocaleString()}</td>)}
              </tr>
              <tr>
                <td><strong>Fund Manager</strong></td>
                {funds.map(f => <td key={f.id}>{f.fundManager}</td>)}
              </tr>
              <tr>
                <td><strong>Rating</strong></td>
                {funds.map(f => <td key={f.id} style={{ color: 'var(--accent-orange)', fontWeight: 700 }}>
                  {f.rating}/5 ⭐
                </td>)}
              </tr>
              <tr>
                <td><strong>Actions</strong></td>
                {funds.map(f => <td key={f.id}>
                  <Link to={`/funds/${f.id}`} className="btn btn-primary btn-sm">View Details</Link>
                </td>)}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
