import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import API from '../api/axios';

const categoryClass = (cat) => `fund-category-badge cat-${cat?.toLowerCase() || 'equity'}`;

const riskClass = (risk) => {
  switch (risk) {
    case 'LOW': return 'risk-low';
    case 'MODERATE': return 'risk-moderate';
    case 'HIGH': return 'risk-high';
    case 'VERY_HIGH': return 'risk-very-high';
    default: return '';
  }
};

const renderStars = (rating) => {
  const stars = [];
  const full = Math.floor(rating || 0);
  for (let i = 0; i < 5; i++) {
    stars.push(<span key={i} className={i < full ? 'star' : 'star-empty'}>★</span>);
  }
  return stars;
};

export default function ExploreFunds() {
  const [funds, setFunds] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [compareList, setCompareList] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategoryFilter(cat);
    fetchFunds();
  }, []);

  const fetchFunds = async () => {
    try {
      const res = await API.get('/funds');
      setFunds(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error('Failed to fetch funds', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = [...funds];
    if (search) {
      result = result.filter(f =>
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.fundHouse.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (categoryFilter !== 'ALL') {
      result = result.filter(f => f.category === categoryFilter);
    }
    if (riskFilter !== 'ALL') {
      result = result.filter(f => f.riskLevel === riskFilter);
    }
    setFiltered(result);
  }, [search, categoryFilter, riskFilter, funds]);

  const toggleCompare = (id) => {
    setCompareList(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Explore Mutual Funds</h1>
        <p>Browse and compare top-performing mutual funds across all categories</p>
      </div>

      <div className="search-bar">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="form-input"
            placeholder="Search funds by name or fund house..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <select className="form-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ width: 'auto' }}>
            <option value="ALL">All Categories</option>
            <option value="EQUITY">Equity</option>
            <option value="DEBT">Debt</option>
            <option value="HYBRID">Hybrid</option>
            <option value="INDEX">Index</option>
            <option value="ELSS">ELSS</option>
            <option value="LIQUID">Liquid</option>
            <option value="SECTORAL">Sectoral</option>
          </select>
          <select className="form-select" value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}
            style={{ width: 'auto' }}>
            <option value="ALL">All Risk Levels</option>
            <option value="LOW">Low</option>
            <option value="MODERATE">Moderate</option>
            <option value="HIGH">High</option>
            <option value="VERY_HIGH">Very High</option>
          </select>
        </div>
      </div>

      {compareList.length > 0 && (
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            {compareList.length} fund(s) selected for comparison
          </span>
          <Link to={`/compare?ids=${compareList.join(',')}`} className="btn btn-primary btn-sm">
            Compare Now
          </Link>
          <button className="btn btn-secondary btn-sm" onClick={() => setCompareList([])}>
            Clear
          </button>
        </div>
      )}

      <div style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        Showing {filtered.length} of {funds.length} funds
      </div>

      <div className="grid-3">
        {filtered.map(fund => (
          <div key={fund.id} className="fund-card">
            <div className="fund-card-top">
              <div>
                <div className="fund-name">{fund.name}</div>
                <div className="fund-house">{fund.fundHouse}</div>
              </div>
              <span className={categoryClass(fund.category)}>{fund.category}</span>
            </div>

            <div className="fund-metrics">
              <div className="fund-metric">
                <div className="fund-metric-label">1Y Return</div>
                <div className={`fund-metric-value ${fund.returns1Year >= 0 ? 'stat-positive' : 'stat-negative'}`}>
                  {fund.returns1Year}%
                </div>
              </div>
              <div className="fund-metric">
                <div className="fund-metric-label">3Y Return</div>
                <div className={`fund-metric-value ${fund.returns3Year >= 0 ? 'stat-positive' : 'stat-negative'}`}>
                  {fund.returns3Year}%
                </div>
              </div>
              <div className="fund-metric">
                <div className="fund-metric-label">Risk</div>
                <div className={`fund-metric-value ${riskClass(fund.riskLevel)}`}>
                  {fund.riskLevel?.replace('_', ' ')}
                </div>
              </div>
            </div>

            <div className="fund-card-bottom">
              <div className="fund-nav">
                <div className="fund-nav-label">NAV</div>
                <div className="fund-nav-value">₹{fund.navValue?.toFixed(2)}</div>
              </div>
              <div className="fund-rating">{renderStars(fund.rating)}</div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <Link to={`/funds/${fund.id}`} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                View Details
              </Link>
              <button
                className={`btn btn-sm ${compareList.includes(fund.id) ? 'btn-success' : 'btn-secondary'}`}
                onClick={(e) => { e.stopPropagation(); toggleCompare(fund.id); }}
              >
                {compareList.includes(fund.id) ? '✓' : '⊞'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <h3>No funds found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
