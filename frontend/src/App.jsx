import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Login from './pages/Login';
import Register from './pages/Register';
import DonorDashboard from './pages/DonorDashboard';
import ShareFood from './pages/ShareFood';
import NGODashboard from './pages/NGODashboard';
import './App.css';

// Protected Route Component: Only authenticated users can access
function ProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // If not logged in, redirect to login page with notice
    return <Navigate to="/login" state={{ from: location.pathname, message: 'Please log in to donate food or access your dashboard.' }} replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'DONOR' ? '/donor/share-food' : '/ngo/dashboard'} replace />;
  }

  return children;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const isHome = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '0 2rem',
      height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled || !isHome ? 'rgba(255,255,255,0.96)' : 'rgba(240, 253, 244, 0.85)',
      backdropFilter: 'blur(16px)',
      boxShadow: scrolled || !isHome ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
      borderBottom: '1px solid rgba(187, 247, 208, 0.4)',
      transition: 'all 0.3s ease'
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <img src="/logo.png" alt="FoodPulse Logo" style={{ height: '46px', width: 'auto', objectFit: 'contain' }} />
        <span style={{
          fontWeight: '900', fontSize: '1.45rem', letterSpacing: '-0.5px',
          color: '#166534',
          whiteSpace: 'nowrap'
        }}>
          Food<span style={{ color: '#EA580C' }}>Pulse</span>
        </span>
      </Link>

      {/* Desktop Links */}
      <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }} className="nav-desktop">
        <Link to="/about" style={{ padding: '0.5rem 0.9rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.92rem', color: '#166534' }}>
          About
        </Link>
        <Link to="/how-it-works" style={{ padding: '0.5rem 0.9rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.92rem', color: '#166534' }}>
          How It Works
        </Link>

        {/* Dynamic Nav when Logged in vs Logged out */}
        {user ? (
          <>
            {user.role === 'DONOR' ? (
              <>
                <Link to="/donor/share-food" style={{
                  padding: '0.5rem 1.1rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '0.92rem',
                  background: '#16A34A', color: '#fff', marginLeft: '0.4rem', boxShadow: '0 2px 8px rgba(22,163,74,0.25)'
                }}>
                  🍽️ Donate Food
                </Link>
                <Link to="/donor/dashboard" style={{
                  padding: '0.5rem 1rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.92rem',
                  color: '#166534', border: '1.5px solid #166534', marginLeft: '0.3rem'
                }}>
                  📊 Dashboard
                </Link>
              </>
            ) : (
              <Link to="/ngo/dashboard" style={{
                padding: '0.5rem 1.1rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '0.92rem',
                background: '#2563EB', color: '#fff', marginLeft: '0.4rem', boxShadow: '0 2px 8px rgba(37,99,235,0.25)'
              }}>
                🏢 NGO Take Food Portal
              </Link>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.8rem', paddingLeft: '0.8rem', borderLeft: '1.5px solid #E2E8F0' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0F172A' }}>
                👤 {user.name} <span style={{ fontSize: '0.75rem', color: '#166534', background: '#DCFCE7', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>{user.role}</span>
              </span>
              <button onClick={handleLogout} style={{
                padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#F8FAFC',
                color: '#64748B', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer'
              }}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              padding: '0.5rem 1.2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem',
              color: '#166534', border: '2px solid #166534', marginLeft: '0.5rem', transition: 'all 0.2s'
            }}>
              Login
            </Link>
            <Link to="/register" style={{
              padding: '0.5rem 1.2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem',
              background: '#16A34A', color: '#fff', marginLeft: '0.4rem',
              boxShadow: '0 2px 8px rgba(22,163,74,0.25)', transition: 'all 0.2s'
            }}>
              Register
            </Link>
          </>
        )}
      </div>

      {/* Hamburger Menu button */}
      <button onClick={() => setMenuOpen(m => !m)} style={{
        display: 'none', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem',
        color: '#166534'
      }} className="hamburger">☰</button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '64px', left: 0, right: 0,
          background: '#fff', padding: '1.2rem', boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          display: 'flex', flexDirection: 'column', gap: '0.6rem'
        }}>
          <Link to="/" style={{ padding: '0.6rem', color: '#333', textDecoration: 'none', fontWeight: '700' }}>Home</Link>
          <Link to="/about" style={{ padding: '0.6rem', color: '#333', textDecoration: 'none', fontWeight: '700' }}>About</Link>
          <Link to="/how-it-works" style={{ padding: '0.6rem', color: '#333', textDecoration: 'none', fontWeight: '700' }}>How It Works</Link>
          {user ? (
            <>
              {user.role === 'DONOR' ? (
                <>
                  <Link to="/donor/share-food" style={{ padding: '0.6rem', color: '#16A34A', textDecoration: 'none', fontWeight: '800' }}>🍽️ Donate Food</Link>
                  <Link to="/donor/dashboard" style={{ padding: '0.6rem', color: '#333', textDecoration: 'none', fontWeight: '700' }}>📊 Dashboard</Link>
                </>
              ) : (
                <Link to="/ngo/dashboard" style={{ padding: '0.6rem', color: '#2563EB', textDecoration: 'none', fontWeight: '800' }}>🏢 NGO Portal (Take Food)</Link>
              )}
              <button onClick={handleLogout} style={{ padding: '0.6rem', background: '#FEE2E2', color: '#991B1B', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ padding: '0.6rem', color: '#16A34A', textDecoration: 'none', fontWeight: '800' }}>Login</Link>
              <Link to="/register" style={{ padding: '0.6rem', color: '#16A34A', textDecoration: 'none', fontWeight: '800' }}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

function Footer() {
  const location = useLocation();
  if (['/donor/dashboard', '/ngo/dashboard', '/donor/share-food'].includes(location.pathname)) return null;

  return (
    <footer style={{ background: '#0D2818', color: '#fff', padding: '4rem 2rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <img src="/logo.png" alt="FoodPulse Logo" style={{ height: '42px', width: 'auto', background: '#fff', borderRadius: '50%', padding: '2px' }} />
              <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#4CAF50' }}>Food<span style={{ color: '#FB923C' }}>Pulse</span></div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.7', fontSize: '0.9rem' }}>
              Connecting surplus food with organizations that help people in need — powered by AI, driven by compassion.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#fff', marginBottom: '1rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Platform</h4>
            {['Home', 'About', 'How It Works', 'Register'].map(l => (
              <div key={l} style={{ marginBottom: '0.5rem' }}>
                <Link to={l === 'How It Works' ? '/how-it-works' : `/${l.toLowerCase()}`} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.9rem' }}>
                  {l}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ color: '#fff', marginBottom: '1rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>For Donors</h4>
            {['Share Food', 'Donation History', 'Track Status', 'View Map'].map(l => (
              <div key={l} style={{ marginBottom: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{l}</div>
            ))}
          </div>
          <div>
            <h4 style={{ color: '#fff', marginBottom: '1rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>For NGOs</h4>
            {['Find Donations', 'Manage Requirements', 'Pickup Routes', 'Impact Reports'].map(l => (
              <div key={l} style={{ marginBottom: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{l}</div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', margin: 0 }}>© 2026 FoodPulse. All rights reserved.</p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', margin: 0 }}>Made with ❤️ to reduce food waste</p>
        </div>
      </div>
    </footer>
  );
}

function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: isHome ? 0 : '64px' }}>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED DONOR ROUTES: User MUST log in as Donor first */}
          <Route
            path="/donor/share-food"
            element={
              <ProtectedRoute allowedRole="DONOR">
                <ShareFood />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donor/dashboard"
            element={
              <ProtectedRoute allowedRole="DONOR">
                <DonorDashboard />
              </ProtectedRoute>
            }
          />

          {/* PROTECTED NGO ROUTES: User MUST log in as NGO first */}
          <Route
            path="/ngo/dashboard"
            element={
              <ProtectedRoute allowedRole="NGO">
                <NGODashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </Router>
  );
}
