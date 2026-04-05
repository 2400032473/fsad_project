import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ExploreFunds from './pages/ExploreFunds';
import FundDetail from './pages/FundDetail';
import CompareFunds from './pages/CompareFunds';
import Dashboard from './pages/Dashboard';
import Investments from './pages/Investments';
import Learn from './pages/Learn';
import AdminPanel from './pages/AdminPanel';
import AdvisorPanel from './pages/AdvisorPanel';
import AnalystPanel from './pages/AnalystPanel';
import Reports from './pages/Reports';

function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" />;
  return children;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/funds" element={<ExploreFunds />} />
        <Route path="/funds/:id" element={<FundDetail />} />
        <Route path="/compare" element={<CompareFunds />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/reports" element={<Reports />} />

        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/investments" element={
          <ProtectedRoute roles={['INVESTOR']}><Investments /></ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute roles={['ADMIN']}><AdminPanel /></ProtectedRoute>
        } />
        <Route path="/advisor" element={
          <ProtectedRoute roles={['FINANCIAL_ADVISOR']}><AdvisorPanel /></ProtectedRoute>
        } />
        <Route path="/analyst" element={
          <ProtectedRoute roles={['DATA_ANALYST']}><AnalystPanel /></ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
