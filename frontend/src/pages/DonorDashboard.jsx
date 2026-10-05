import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const defaultDonations = [
  { date: 'Aug 20', food: 'Rice & Curry', qty: '30 meals', ngo: 'Community Food Centre', status: 'Delivered' },
  { date: 'Aug 15', food: 'Fresh Vegetables', qty: '10 kg', ngo: 'Hope Shelter', status: 'Delivered' },
  { date: 'Aug 10', food: 'Fruits', qty: '15 kg', ngo: 'City Orphanage', status: 'Delivered' },
  { date: 'Aug 05', food: 'Bread & Pastries', qty: '20 pcs', ngo: 'Community Food Centre', status: 'Delivered' },
];

const timelineSteps = ['Posted', 'NGO Recommended', 'Accepted', 'Pickup Scheduled', 'Picked Up', 'Delivered'];

export default function DonorDashboard() {
  const { user } = useAuth();
  const [activeDonation, setActiveDonation] = useState(null);
  const [donationsList, setDonationsList] = useState(defaultDonations);

  useEffect(() => {
    // Load last active donation from storage if any
    const saved = localStorage.getItem('foodpulse_active_donation');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setActiveDonation(parsed);
      } catch (e) {}
    }

    const savedList = localStorage.getItem('foodpulse_donations_list');
    if (savedList) {
      try {
        const parsedList = JSON.parse(savedList);
        if (parsedList.length > 0) {
          setDonationsList(parsedList);
        }
      } catch (e) {}
    }
  }, []);

  const donorDisplayName = user?.name || 'Food Donor';
  const donorType = user?.donorType || 'Donor Partner';

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '3rem' }}>
      {/* Welcome Banner */}
      <div style={{ background: 'linear-gradient(135deg, #15803D, #16A34A)', padding: '3rem 2rem', color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.2)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.6rem' }}>
              🏢 {donorType} Portal
            </div>
            <h1 style={{ margin: 0, fontSize: '2.2rem', fontWeight: '900' }}>
              Welcome, {donorDisplayName}! 🍽️
            </h1>
            <p style={{ opacity: 0.9, marginTop: '0.4rem', fontSize: '1.05rem' }}>
              Thank you for reducing food waste and feeding local communities.
            </p>
          </div>
          <Link to="/donor/share-food">
            <button style={{ background: '#FEF08A', color: '#166534', border: 'none', padding: '0.9rem 1.8rem', borderRadius: '10px', fontWeight: '900', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.15)' }}>
              + Share New Food
            </button>
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Donations', value: `${donationsList.length + 14}`, emoji: '🎁', color: '#16A34A', bg: '#DCFCE7' },
            { label: 'Meals Shared', value: '380+', emoji: '🍲', color: '#D97706', bg: '#FEF3C7' },
            { label: 'NGOs Connected', value: '14', emoji: '🏢', color: '#2563EB', bg: '#DBEAFE' },
            { label: 'This Month', value: `${donationsList.length}`, emoji: '📅', color: '#7C3AED', bg: '#EDE9FE' },
          ].map(({ label, value, emoji, color, bg }) => (
            <div key={label} style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', borderLeft: `4px solid ${color}`, border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{emoji}</div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: '900', color, lineHeight: 1 }}>{value}</div>
                <div style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '0.2rem', fontWeight: '600' }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* Last Shared Food */}
          <div style={{ background: '#fff', borderRadius: '18px', padding: '1.8rem', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <h3 style={{ margin: 0, color: '#0F172A', fontSize: '1.15rem', fontWeight: '800' }}>🕐 Latest Shared Food</h3>
              <span style={{ background: '#DCFCE7', color: '#166534', padding: '0.2rem 0.6rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800' }}>
                {activeDonation ? 'Active Donation' : 'Previous Donation'}
              </span>
            </div>

            {activeDonation ? (
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
                <img src={activeDonation.image} alt="Food item" style={{ width: '85px', height: '85px', borderRadius: '12px', objectFit: 'cover', border: '1px solid #CBD5E1' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.3rem', color: '#0F172A', fontSize: '1.1rem', fontWeight: '800' }}>{activeDonation.food}</h4>
                  <p style={{ margin: '0 0 0.3rem', color: '#64748B', fontSize: '0.88rem' }}>📦 Quantity: <strong>{activeDonation.qty}</strong></p>
                  <p style={{ margin: '0 0 0.3rem', color: '#64748B', fontSize: '0.88rem' }}>⏰ Prep Time: {activeDonation.prepTime}</p>
                  <p style={{ margin: '0 0 0.5rem', color: '#2563EB', fontSize: '0.88rem', fontWeight: '700' }}>🏢 Matched NGO: {activeDonation.ngo}</p>
                  <span style={{ display: 'inline-block', background: '#FEF3C7', color: '#D97706', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '800' }}>
                    ⏳ Status: {activeDonation.status || 'Confirmed & Dispatched'}
                  </span>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
                <div style={{ width: '75px', height: '75px', borderRadius: '12px', background: 'linear-gradient(135deg, #DCFCE7, #BBF7D0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.4rem', flexShrink: 0 }}>🍲</div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.3rem', color: '#0F172A', fontSize: '1.1rem', fontWeight: '800' }}>Rice & Curry (Hot Meals)</h4>
                  <p style={{ margin: '0 0 0.3rem', color: '#64748B', fontSize: '0.88rem' }}>📦 Quantity: <strong>40 portions</strong></p>
                  <p style={{ margin: '0 0 0.3rem', color: '#64748B', fontSize: '0.88rem' }}>🏢 Matched NGO: Community Food Centre</p>
                  <span style={{ display: 'inline-block', background: '#DCFCE7', color: '#166534', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '800' }}>
                    ✓ Delivered
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Donation Status Timeline */}
          <div style={{ background: '#fff', borderRadius: '18px', padding: '1.8rem', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', border: '1px solid #E2E8F0' }}>
            <h3 style={{ margin: '0 0 1.2rem', color: '#0F172A', fontSize: '1.15rem', fontWeight: '800' }}>📍 Active Donation Journey</h3>
            <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
              <div style={{ position: 'absolute', left: '10px', top: '10px', bottom: '10px', width: '2px', background: '#E2E8F0' }} />
              {timelineSteps.map((stepName, i) => {
                const isDone = i <= 2;
                const isCurrent = i === 2;
                return (
                  <div key={stepName} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: i < timelineSteps.length - 1 ? '1rem' : 0, position: 'relative' }}>
                    <div style={{
                      width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0, zIndex: 1,
                      background: isDone ? '#16A34A' : '#E2E8F0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: isCurrent ? '0 0 0 4px rgba(22,163,74,0.2)' : 'none'
                    }}>
                      {isDone && <span style={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>✓</span>}
                    </div>
                    <span style={{ fontSize: '0.88rem', color: isDone ? '#0F172A' : '#94A3B8', fontWeight: isCurrent ? '800' : '600' }}>
                      {stepName} {isCurrent && <span style={{ color: '#16A34A', fontSize: '0.78rem' }}>(In Progress)</span>}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Donations Table */}
        <div style={{ background: '#fff', borderRadius: '18px', padding: '1.8rem', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', border: '1px solid #E2E8F0' }}>
          <h3 style={{ margin: '0 0 1.2rem', color: '#0F172A', fontSize: '1.15rem', fontWeight: '800' }}>📋 Donation History</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F1F5F9' }}>
                  {['Date', 'Food Item', 'Quantity', 'Assigned NGO', 'Status'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#64748B', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {donationsList.map((d, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}
                    onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'}
                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1rem', color: '#64748B', fontSize: '0.88rem', fontWeight: '600' }}>{d.date || 'Today'}</td>
                    <td style={{ padding: '1rem', color: '#0F172A', fontWeight: '700', fontSize: '0.92rem' }}>{d.food}</td>
                    <td style={{ padding: '1rem', color: '#64748B', fontSize: '0.88rem' }}>{d.qty}</td>
                    <td style={{ padding: '1rem', color: '#2563EB', fontSize: '0.88rem', fontWeight: '700' }}>{d.ngo || 'Community Food Centre'}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ background: '#DCFCE7', color: '#166534', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '800' }}>
                        {d.status || 'Active'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
