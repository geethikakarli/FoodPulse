import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRegisteredNgos, getLastUsedNgo, setLastUsedNgo, CONNECTED_CITIES } from '../data/ngoData';

export default function Login() {
  const [role, setRole] = useState('DONOR');
  const [loading, setLoading] = useState(false);
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPassword, setDonorPassword] = useState('');

  // NGO Specific Login States & City Filter
  const [registeredNgos, setRegisteredNgos] = useState([]);
  const [selectedCityFilter, setSelectedCityFilter] = useState('All');
  const [selectedNgoOrg, setSelectedNgoOrg] = useState('');
  const [ngoPassword, setNgoPassword] = useState('');

  const [focused, setFocused] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectNotice = location.state?.message;

  // Load registered organisations
  useEffect(() => {
    const ngos = getRegisteredNgos();
    setRegisteredNgos(ngos);
    setSelectedNgoOrg('');
  }, []);

  // Reset selected organisation when city filter changes so user chooses explicitly
  useEffect(() => {
    if (registeredNgos.length === 0) return;
    const filtered = registeredNgos.filter(ngo => 
      selectedCityFilter === 'All' || ngo.city === selectedCityFilter || ngo.serviceArea?.includes(selectedCityFilter)
    );
    if (filtered.length > 0) {
      const isValid = filtered.some(n => n.orgName === selectedNgoOrg);
      if (!isValid) {
        setSelectedNgoOrg('');
      }
    }
  }, [selectedCityFilter, registeredNgos, selectedNgoOrg]);

  const handleNgoSelection = (orgName) => {
    setSelectedNgoOrg(orgName);
    if (orgName) {
      setLastUsedNgo(orgName);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (role === 'DONOR') {
        const donorName = donorEmail ? donorEmail.split('@')[0].toUpperCase() : 'Donor Partner';
        login({
          email: donorEmail,
          name: donorName,
          role: 'DONOR',
          donorType: 'Restaurant'
        });
        navigate('/donor/share-food');
      } else {
        if (!selectedNgoOrg) {
          alert('Please select a registered organisation from the dropdown.');
          return;
        }

        // Find selected NGO details
        const ngoDetails = registeredNgos.find(n => n.orgName === selectedNgoOrg) || {
          orgName: selectedNgoOrg,
          serviceArea: 'Central Bengaluru',
          email: `${selectedNgoOrg.toLowerCase().replace(/[^a-z0-9]/g, '')}@ngo.org`
        };

        // Remember this organisation for future visits
        setLastUsedNgo(selectedNgoOrg);

        login({
          name: ngoDetails.orgName,
          orgName: ngoDetails.orgName,
          email: ngoDetails.email,
          role: 'NGO',
          serviceArea: ngoDetails.serviceArea,
          requirements: ngoDetails.requirements
        });
        navigate('/ngo/dashboard');
      }
    }, 600);
  };

  const inputStyle = (field) => ({
    width: '100%', padding: '0.9rem 1rem', fontSize: '0.95rem',
    border: `2px solid ${focused[field] ? '#16A34A' : '#E2E8F0'}`,
    borderRadius: '10px', outline: 'none', background: '#fff',
    transition: 'border-color 0.2s', boxSizing: 'border-box',
    fontFamily: 'inherit'
  });

  const selectedNgoInfo = registeredNgos.find(n => n.orgName === selectedNgoOrg);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Left Panel */}
      <div style={{
        flex: 1, background: 'linear-gradient(145deg, #15803D, #16A34A)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        alignItems: 'center', padding: '3rem', color: '#fff', minWidth: '320px'
      }}>
        <img src="/logo.png" alt="FoodPulse Logo" style={{ width: '140px', height: '140px', objectFit: 'contain', background: '#fff', borderRadius: '50%', padding: '10px', boxShadow: '0 12px 35px rgba(0,0,0,0.2)', marginBottom: '1.4rem' }} />
        <h2 style={{ fontSize: '2.2rem', fontWeight: '900', textAlign: 'center', marginBottom: '0.8rem', lineHeight: '1.2' }}>
          {role === 'DONOR' ? 'Donate Food.\nSave Lives.' : 'NGO Organisation\nPickup Portal.'}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.9)', textAlign: 'center', lineHeight: '1.7', marginBottom: '2.2rem', maxWidth: '340px', fontSize: '1.02rem' }}>
          {role === 'DONOR'
            ? 'Sign in as a Donor to share surplus food and coordinate AI matching with local NGOs.'
            : 'Select your registered Organisation name to manage incoming donation pickups.'}
        </p>
        
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '18px', padding: '1.4rem', width: '100%', maxWidth: '340px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <div style={{ fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'space-between' }}>
            <span>🏢 Registered Organisations ({registeredNgos.filter(ngo => selectedCityFilter === 'All' || ngo.city === selectedCityFilter || ngo.serviceArea?.includes(selectedCityFilter)).length})</span>
            {selectedCityFilter !== 'All' && (
              <span style={{ fontSize: '0.72rem', background: '#FEF08A', color: '#166534', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: '800' }}>{selectedCityFilter}</span>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', maxHeight: '190px', overflowY: 'auto', paddingRight: '4px' }}>
            {registeredNgos
              .filter(ngo => selectedCityFilter === 'All' || ngo.city === selectedCityFilter || ngo.serviceArea?.includes(selectedCityFilter))
              .map(n => (
                <div key={n.orgName} style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.22)', padding: '0.45rem 0.75rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '800', color: '#fff' }}>{n.orgName}</span>
                  <span style={{ opacity: 0.9, fontSize: '0.74rem', background: 'rgba(0,0,0,0.2)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>{n.city || n.serviceArea?.split(',').pop()?.trim() || 'Hyderabad'}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2.5rem', background: '#F8FAFC' }}>
        <div style={{ width: '100%', maxWidth: '460px', background: '#fff', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #E2E8F0' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
            <img src="/logo.png" alt="FoodPulse Logo" style={{ height: '42px', width: 'auto', objectFit: 'contain' }} />
            <span style={{ fontWeight: '900', color: '#166534', fontSize: '1.35rem', letterSpacing: '-0.3px' }}>
              Food<span style={{ color: '#EA580C' }}>Pulse</span>
            </span>
          </div>

          {redirectNotice && (
            <div style={{ background: '#FEF3C7', border: '1.5px solid #FCD34D', color: '#92400E', padding: '0.75rem 1rem', borderRadius: '12px', fontSize: '0.88rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🔒</span> {redirectNotice}
            </div>
          )}

          <h2 style={{ fontSize: '1.85rem', fontWeight: '900', color: '#0F172A', marginBottom: '0.3rem' }}>
            {role === 'DONOR' ? 'Donor Account Login' : 'NGO Organisation Login'}
          </h2>
          <p style={{ color: '#64748B', marginBottom: '1.8rem', fontSize: '0.95rem' }}>
            {role === 'DONOR' ? 'Enter credentials to donate food' : 'Select your Organisation from previous registrations to accept food'}
          </p>

          {/* Role Selection Tabs */}
          <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '12px', padding: '4px', marginBottom: '1.8rem' }}>
            {['DONOR', 'NGO'].map(r => (
              <button key={r} type="button" onClick={() => setRole(r)} style={{
                flex: 1, padding: '0.75rem', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '800', fontSize: '0.92rem',
                background: role === r ? (r === 'DONOR' ? '#16A34A' : '#2563EB') : 'transparent',
                color: role === r ? '#fff' : '#64748B',
                boxShadow: role === r ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
                transition: 'all 0.2s'
              }}>
                {r === 'DONOR' ? '🍽️ Food Donor' : '🏢 NGO (Take Food)'}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin}>
            {/* DONOR LOGIN FIELDS */}
            {role === 'DONOR' ? (
              <>
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', color: '#0F172A', fontSize: '0.9rem' }}>Donor Email Address</label>
                  <input type="email" required placeholder="donor@restaurant.com" value={donorEmail}
                    onChange={e => setDonorEmail(e.target.value)}
                    onFocus={() => setFocused({ ...focused, donorEmail: true })}
                    onBlur={() => setFocused({ ...focused, donorEmail: false })}
                    style={inputStyle('donorEmail')} />
                </div>
                <div style={{ marginBottom: '1.6rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', color: '#0F172A', fontSize: '0.9rem' }}>Password</label>
                  <input type="password" required placeholder="••••••••" value={donorPassword}
                    onChange={e => setDonorPassword(e.target.value)}
                    onFocus={() => setFocused({ ...focused, donorPassword: true })}
                    onBlur={() => setFocused({ ...focused, donorPassword: false })}
                    style={inputStyle('donorPassword')} />
                </div>
              </>
            ) : (
              /* NGO LOGIN FIELDS: ORGANISATION DROPDOWN & PASSWORD */
              <>
                <div style={{ marginBottom: '1.2rem' }}>
                  {/* CITY SELECTION FILTER DROPDOWN (DOWN SCROLLABLE) */}
                  <div style={{ marginBottom: '0.9rem' }}>
                    <label style={{ display: 'block', fontWeight: '800', color: '#0F172A', fontSize: '0.88rem', marginBottom: '0.35rem' }}>
                      📍 Filter NGOs by Connected City:
                    </label>
                    <select
                      value={selectedCityFilter}
                      onChange={e => setSelectedCityFilter(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        background: '#F8FAFC',
                        color: '#1E40AF',
                        fontWeight: '800',
                        fontSize: '0.92rem',
                        outline: 'none',
                        cursor: 'pointer',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit'
                      }}
                    >
                      <option value="All">🌐 All Cities (Show All Registered NGOs)</option>
                      {CONNECTED_CITIES.map(c => (
                        <option key={c.id} value={c.name}>
                          🏙️ {c.name} ({c.state})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <label style={{ fontWeight: '800', color: '#0F172A', fontSize: '0.9rem' }}>
                      🏢 Select Registered Organisation
                    </label>
                    <Link to="/register" style={{ color: '#2563EB', fontSize: '0.78rem', fontWeight: '800', textDecoration: 'none' }}>
                      + Register New Org
                    </Link>
                  </div>
                  
                  <select value={selectedNgoOrg} onChange={e => handleNgoSelection(e.target.value)} style={{ ...inputStyle('selectedNgoOrg'), cursor: 'pointer', fontWeight: '800', color: selectedNgoOrg ? '#1E40AF' : '#64748B', background: '#EFF6FF', fontSize: '0.95rem' }}>
                    <option value="">-- Select Registered Organisation --</option>
                    {registeredNgos
                      .filter(ngo => selectedCityFilter === 'All' || ngo.city === selectedCityFilter || ngo.serviceArea?.includes(selectedCityFilter))
                      .map(ngo => (
                        <option key={ngo.orgName} value={ngo.orgName}>
                          {ngo.orgName} ({ngo.city || ngo.serviceArea?.split(',').pop()?.trim() || 'Hyderabad'}) — {ngo.serviceArea}
                        </option>
                      ))}
                  </select>



                  {/* Selected Org Info Card */}
                  {selectedNgoInfo && (
                    <div style={{ marginTop: '0.8rem', padding: '0.65rem 0.85rem', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '0.8rem', color: '#334155', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
                      <span>🏙️ City: <strong>{selectedNgoInfo.city || 'Hyderabad'}</strong></span>
                      <span>📍 Area: <strong>{selectedNgoInfo.serviceArea}</strong></span>
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '1.6rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '700', color: '#0F172A', fontSize: '0.9rem' }}>Organisation Password</label>
                  <input type="password" required placeholder="Enter password (e.g. password123)" value={ngoPassword}
                    onChange={e => setNgoPassword(e.target.value)}
                    onFocus={() => setFocused({ ...focused, ngoPassword: true })}
                    onBlur={() => setFocused({ ...focused, ngoPassword: false })}
                    style={inputStyle('ngoPassword')} />
                  <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.3rem' }}>
                    Hint: Default test password is <code>password123</code>
                  </div>
                </div>
              </>
            )}

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '1rem', background: loading ? '#86EFAC' : (role === 'DONOR' ? '#16A34A' : '#2563EB'),
              color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1.05rem', fontWeight: '800',
              cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
              boxShadow: role === 'DONOR' ? '0 4px 15px rgba(22,163,74,0.3)' : '0 4px 15px rgba(37,99,235,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
            }}>
              {loading ? (
                <><span style={{ display: 'inline-block', width: '18px', height: '18px', border: '3px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Signing in...</>
              ) : role === 'DONOR' ? '🍽️ Sign in & Open Donate Food' : `🏢 Login as ${selectedNgoOrg || 'NGO'}`}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748B', fontSize: '0.92rem' }}>
            {role === 'DONOR' ? (
              <>
                New Food Donor?{' '}
                <Link to="/register" style={{ color: '#16A34A', fontWeight: '800', textDecoration: 'none' }}>
                  Register
                </Link>
              </>
            ) : (
              <>
                New NGO Organisation?{' '}
                <Link to="/register" style={{ color: '#2563EB', fontWeight: '800', textDecoration: 'none' }}>
                  Register
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
