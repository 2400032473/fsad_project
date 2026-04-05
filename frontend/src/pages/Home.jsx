import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div className="hero-section">
        <h1>Smart Investing Starts Here</h1>
        <p>
          Explore, compare, and invest in mutual funds with confidence. 
          Get detailed insights on fund performance, risk analysis, and expert recommendations 
          to make informed investment decisions.
        </p>
        <div className="hero-actions">
          <Link to="/funds" className="btn btn-primary btn-lg">Explore Funds</Link>
          {!user && <Link to="/register" className="btn btn-secondary btn-lg">Get Started Free</Link>}
          {user && <Link to="/dashboard" className="btn btn-secondary btn-lg">Go to Dashboard</Link>}
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Detailed Fund Analysis</h3>
          <p>Get comprehensive data on NAV, returns, risk levels, expense ratios, and fund manager track records for every mutual fund.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚖️</div>
          <h3>Compare & Decide</h3>
          <p>Side-by-side comparison of multiple funds to help you make the best investment choice based on your goals and risk appetite.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>Risk Assessment</h3>
          <p>Understand risk levels from Low to Very High, and find funds that match your risk tolerance and investment horizon.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>Expert Education</h3>
          <p>Learn from financial advisors about mutual fund basics, investment strategies, tax benefits, and portfolio management.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💼</div>
          <h3>Portfolio Management</h3>
          <p>Track your investments, monitor returns, and manage your portfolio with real-time updates and performance analytics.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h3>Market Insights</h3>
          <p>Access data-driven reports on investment trends, category performance, and investor behavior analysis from our analysts.</p>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 className="section-title" style={{ background: 'var(--gradient-2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Fund Categories Available
        </h2>
        <div className="grid-4" style={{ maxWidth: '900px', margin: '1.5rem auto 0' }}>
          {[
            { name: 'Equity', icon: '🏢', desc: 'Large, Mid & Small Cap' },
            { name: 'Debt', icon: '🏦', desc: 'Corporate & Govt Bonds' },
            { name: 'Hybrid', icon: '⚡', desc: 'Balanced Allocation' },
            { name: 'ELSS', icon: '💰', desc: 'Tax Saving Funds' },
            { name: 'Index', icon: '📉', desc: 'Nifty & Sensex Tracking' },
            { name: 'Liquid', icon: '💧', desc: 'Short-term Parking' },
            { name: 'Sectoral', icon: '🔬', desc: 'Industry-specific' },
          ].map((cat) => (
            <Link to={`/funds?category=${cat.name.toUpperCase()}`} key={cat.name} className="feature-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{cat.icon}</div>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{cat.name}</h3>
              <p style={{ fontSize: '0.8rem' }}>{cat.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
