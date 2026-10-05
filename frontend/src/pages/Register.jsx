import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerNgoOrg, CONNECTED_CITIES } from '../data/ngoData';

const donorTypes = ['Restaurant', 'Hotel', 'Event Organizer', 'Canteen', 'Supermarket', 'Individual', 'Other'];

export default function Register() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    city: 'Hyderabad',
    donorType: 'Restaurant',
    address: '',
    orgName: '',
    serviceArea: 'Banjara Hills, Hyderabad',
    foodRequirements: 'Rice, Cooked Meals, Vegetables'
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const inputStyle = { width: '100%', padding: '0.85rem 1rem', border: '1.5px solid #CBD5E1', borderRadius: '10px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s', fontFamily: 'inherit', background: '#fff' };

  const handleCompleteRegistration = (e) => {
    e.preventDefault();
    
    if (role === 'DONOR') {
      login({
        name: form.name || 'Donor Partner',
        email: form.email,
        city: form.city,
        role: 'DONOR',
        donorType: form.donorType,
        address: form.address ? `${form.address}, ${form.city}` : form.city
      });
      navigate('/donor/share-food');
    } else {
      // Register NGO organisation to registered list
      const cityObj = CONNECTED_CITIES.find(c => c.name === form.city) || CONNECTED_CITIES[0];
      const newNgo = {
        orgName: form.orgName.trim() || 'New Community NGO',
        city: form.city,
        email: form.email,
        password: form.password,
        serviceArea: form.serviceArea || cityObj.defaultArea,
        requirements: form.foodRequirements || 'Cooked Meals, Produce',
        phone: form.phone,
        coords: cityObj.coords
      };
      registerNgoOrg(newNgo);

      login({
        name: newNgo.orgName,
        orgName: newNgo.orgName,
        city: newNgo.city,
        email: newNgo.email,
        role: 'NGO',
        serviceArea: newNgo.serviceArea,
        requirements: newNgo.requirements
      });
      navigate('/ngo/dashboard');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 50%, #BBF7D0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2.5rem 1rem' }}>
      <div style={{ background: '#fff', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', width: '100%', maxWidth: '580px', overflow: 'hidden', border: '1px solid #BBF7D0' }}>
        
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #15803D, #16A34A)', padding: '2.2rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
            <img src="/logo.png" alt="FoodPulse Logo" style={{ height: '52px', width: 'auto', background: '#fff', borderRadius: '50%', padding: '3px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
            <span style={{ color: '#fff', fontSize: '1.65rem', fontWeight: '900' }}>Food<span style={{ color: '#FEF08A' }}>Pulse</span></span>
          </div>
          <h2 style={{ color: '#fff', margin: 0, fontSize: '1.45rem', fontWeight: '900' }}>
            {role === 'NGO' ? 'Register NGO Organisation' : 'Create Your Account'}
          </h2>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
            {[1, 2, 3].map(s => (
              <React.Fragment key={s}>
                <div style={{
                  width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: step >= s ? '#FEF08A' : 'rgba(255,255,255,0.25)',
                  color: step >= s ? '#166534' : '#fff', fontWeight: '900', fontSize: '0.9rem', transition: 'background 0.3s'
                }}>{step > s ? '✓' : s}</div>
                {s < 3 && <div style={{ width: '45px', height: '3px', background: step > s ? '#FEF08A' : 'rgba(255,255,255,0.25)', borderRadius: '2px', transition: 'background 0.3s' }} />}
              </React.Fragment>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.6rem', paddingLeft: '24px', paddingRight: '24px' }}>
            {['1. Account Type', '2. Credentials', '3. Organisation Profile'].map((lbl, i) => (
              <span key={lbl} style={{ color: step >= i + 1 ? '#FEF08A' : 'rgba(255,255,255,0.8)', fontSize: '0.78rem', fontWeight: '700' }}>{lbl}</span>
            ))}
          </div>
        </div>

        <div style={{ padding: '2.2rem' }}>
          {/* Step 1: Role */}
          {step === 1 && (
            <div>
              <h3 style={{ color: '#0F172A', marginBottom: '0.4rem', fontSize: '1.35rem', fontWeight: '900' }}>Select your role:</h3>
              <p style={{ color: '#64748B', marginBottom: '1.8rem', fontSize: '0.95rem' }}>Are you registering to donate food or registering an NGO organisation to pick up food?</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '2rem' }}>
                {[
                  { r: 'DONOR', title: 'Food Donor', sub: 'Restaurants, hotels & individuals donating surplus food', emoji: '🍽️', btnText: 'Donate Food' },
                  { r: 'NGO', title: 'NGO Organisation', sub: 'Charitable trusts & shelters picking up meals', emoji: '🏢', btnText: 'Take Food' }
                ].map(({ r, title, sub, emoji, btnText }) => (
                  <div key={r} onClick={() => setRole(r)} style={{
                    border: `2.5px solid ${role === r ? '#16A34A' : '#E2E8F0'}`,
                    borderRadius: '18px', padding: '1.8rem 1rem', textAlign: 'center', cursor: 'pointer',
                    background: role === r ? '#F0FDF4' : '#fff', transition: 'all 0.2s',
                    boxShadow: role === r ? '0 0 0 4px rgba(22,163,74,0.15)' : 'none'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.6rem', lineHeight: 1 }}>{emoji}</div>
                    <div style={{ fontWeight: '900', fontSize: '1.1rem', color: '#0F172A' }}>{title}</div>
                    <div style={{ color: '#64748B', fontSize: '0.82rem', marginTop: '0.3rem', minHeight: '34px' }}>{sub}</div>
                    <div style={{ marginTop: '0.8rem', display: 'inline-block', background: role === r ? '#16A34A' : '#F1F5F9', color: role === r ? '#fff' : '#64748B', padding: '0.3rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '800' }}>
                      {role === r ? '✓ Selected' : `Register ${btnText}`}
                    </div>
                  </div>
                ))}
              </div>

              <button type="button" onClick={() => role && setStep(2)} style={{
                width: '100%', padding: '1rem', background: role ? '#16A34A' : '#CBD5E1',
                color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1.05rem', fontWeight: '800',
                cursor: role ? 'pointer' : 'not-allowed', boxShadow: role ? '0 4px 15px rgba(22,163,74,0.3)' : 'none'
              }}>
                Continue to Account Details →
              </button>
            </div>
          )}

          {/* Step 2: Credentials */}
          {step === 2 && (
            <div>
              <h3 style={{ color: '#0F172A', marginBottom: '0.4rem', fontSize: '1.35rem', fontWeight: '900' }}>
                {role === 'DONOR' ? 'Donor Contact Information' : 'NGO Official Credentials'}
              </h3>
              <p style={{ color: '#64748B', marginBottom: '1.8rem', fontSize: '0.95rem' }}>Enter email & password to create your account login</p>
              
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.8rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '700', color: '#0F172A', fontSize: '0.88rem' }}>
                    {role === 'DONOR' ? 'Donor Contact Name' : 'Authorised Representative Name'}
                  </label>
                  <input type="text" placeholder="e.g. Rajesh Sharma" value={form.name} required
                    onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '700', color: '#0F172A', fontSize: '0.88rem' }}>Official Email Address</label>
                  <input type="email" placeholder="contact@organisation.org" value={form.email} required
                    onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '700', color: '#0F172A', fontSize: '0.88rem' }}>Phone Number</label>
                  <input type="tel" placeholder="+91 9876543210" value={form.phone} required
                    onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '700', color: '#0F172A', fontSize: '0.88rem' }}>Create Password</label>
                  <input type="password" placeholder="••••••••" value={form.password} required
                    onChange={e => setForm({ ...form, password: e.target.value })} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setStep(1)} style={{ flex: 1, padding: '0.95rem', background: '#F1F5F9', color: '#64748B', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>
                  ← Back
                </button>
                <button type="button" onClick={() => {
                  if (!form.email || !form.password) {
                    alert('Please enter your email and password.');
                    return;
                  }
                  setStep(3);
                }} style={{ flex: 2, padding: '0.95rem', background: '#16A34A', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 12px rgba(22,163,74,0.25)' }}>
                  Continue to Profile Setup →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Profile & Register Organisation */}
          {step === 3 && (
            <form onSubmit={handleCompleteRegistration}>
              <h3 style={{ color: '#0F172A', marginBottom: '0.4rem', fontSize: '1.35rem', fontWeight: '900' }}>
                {role === 'DONOR' ? '🍽️ Donor Profile' : '🏢 Register Organisation Name & Service Area'}
              </h3>
              <p style={{ color: '#64748B', marginBottom: '1.8rem', fontSize: '0.95rem' }}>
                {role === 'DONOR'
                  ? 'Specify your donor category and location.'
                  : 'Your Organisation Name will appear in the login dropdown and receive matched food donations.'}
              </p>

              <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '800', color: '#0F172A', fontSize: '0.9rem' }}>
                    🏙️ Select City Location
                  </label>
                  <select value={form.city} onChange={e => {
                    const city = e.target.value;
                    const cityObj = CONNECTED_CITIES.find(c => c.name === city);
                    setForm({ ...form, city, serviceArea: cityObj ? cityObj.defaultArea : `${city} Central` });
                  }} style={{ ...inputStyle, border: '2px solid #16A34A', background: '#F0FDF4', fontWeight: '800' }}>
                    {CONNECTED_CITIES.map(c => (
                      <option key={c.id} value={c.name}>
                        📍 {c.name} ({c.state})
                      </option>
                    ))}
                  </select>
                </div>

                {role === 'DONOR' ? (
                  <>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '700', color: '#0F172A', fontSize: '0.88rem' }}>Donor Entity Type</label>
                      <select value={form.donorType} onChange={e => setForm({ ...form, donorType: e.target.value })} style={inputStyle}>
                        {donorTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '700', color: '#0F172A', fontSize: '0.88rem' }}>Pickup Address / Location</label>
                      <textarea rows={3} placeholder="Enter your business or home address..." value={form.address}
                        onChange={e => setForm({ ...form, address: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '800', color: '#0F172A', fontSize: '0.9rem' }}>
                        🏢 Organisation Name (Shown in Login Dropdown & Matches)
                      </label>
                      <input type="text" placeholder="e.g. Robin Hood Army / Seva Shelter" value={form.orgName} required
                        onChange={e => setForm({ ...form, orgName: e.target.value })} style={{ ...inputStyle, border: '2px solid #2563EB', background: '#EFF6FF', fontWeight: '800' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '700', color: '#0F172A', fontSize: '0.88rem' }}>Coverage / Service Area</label>
                      <input type="text" placeholder="e.g. Indiranagar, Koramangala, Whitefield" value={form.serviceArea} required
                        onChange={e => setForm({ ...form, serviceArea: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '700', color: '#0F172A', fontSize: '0.88rem' }}>Accepted Food Requirements</label>
                      <input type="text" placeholder="e.g. Cooked Meals, Vegetables, Packaged Food" value={form.foodRequirements}
                        onChange={e => setForm({ ...form, foodRequirements: e.target.value })} style={inputStyle} />
                    </div>
                  </>
                )}
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setStep(2)} style={{ flex: 1, padding: '0.95rem', background: '#F1F5F9', color: '#64748B', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>
                  ← Back
                </button>
                <button type="submit" style={{
                  flex: 2, padding: '0.95rem', background: role === 'DONOR' ? '#16A34A' : '#2563EB', color: '#fff', border: 'none',
                  borderRadius: '10px', fontWeight: '900', fontSize: '1rem', cursor: 'pointer',
                  boxShadow: role === 'DONOR' ? '0 4px 15px rgba(22,163,74,0.3)' : '0 4px 15px rgba(37,99,235,0.3)'
                }}>
                  {role === 'DONOR' ? '🎉 Register & Donate Food' : '🏢 Register Organisation & Open Portal'}
                </button>
              </div>
            </form>
          )}

          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748B', fontSize: '0.9rem' }}>
            Already registered? <Link to="/login" style={{ color: '#16A34A', fontWeight: '800', textDecoration: 'none' }}>Go to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
