import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const getRoleBadgeClass = () => {
    if (!user) return '';
    switch (user.role) {
      case 'ADMIN': return 'badge-admin';
      case 'INVESTOR': return 'badge-investor';
      case 'FINANCIAL_ADVISOR': return 'badge-advisor';
      case 'DATA_ANALYST': return 'badge-analyst';
      default: return '';
    }
  };

  const getRoleLabel = () => {
    if (!user) return '';
    switch (user.role) {
      case 'ADMIN': return 'Admin';
      case 'INVESTOR': return 'Investor';
      case 'FINANCIAL_ADVISOR': return 'Advisor';
      case 'DATA_ANALYST': return 'Analyst';
      default: return user.role;
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        MutualFund Pro
      </Link>

      <div className="navbar-links">
        <Link to="/funds" className={isActive('/funds')}>Explore Funds</Link>
        <Link to="/learn" className={isActive('/learn')}>Learn</Link>
        {user && (
          <>
            <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
            {(user.role === 'INVESTOR') && (
              <Link to="/investments" className={isActive('/investments')}>My Investments</Link>
            )}
            {(user.role === 'ADMIN') && (
              <Link to="/admin" className={isActive('/admin')}>Admin</Link>
            )}
            {(user.role === 'FINANCIAL_ADVISOR') && (
              <Link to="/advisor" className={isActive('/advisor')}>Advisor Panel</Link>
            )}
            {(user.role === 'DATA_ANALYST') && (
              <Link to="/analyst" className={isActive('/analyst')}>Analytics</Link>
            )}
            <Link to="/reports" className={isActive('/reports')}>Reports</Link>
          </>
        )}
      </div>

      <div className="navbar-user">
        {user ? (
          <>
            <span className={`user-badge ${getRoleBadgeClass()}`}>{getRoleLabel()}</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{user.fullName}</span>
            <button className="btn-logout" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-sm btn-secondary">Login</Link>
            <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
