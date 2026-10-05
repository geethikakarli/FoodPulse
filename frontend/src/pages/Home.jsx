import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AnimatedCounter({ target, suffix = '', label, emoji }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = Math.ceil(target / 80);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(start);
        }, 20);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '2.5rem 1.5rem', background: '#fff',
      borderRadius: '16px', border: '1px solid #e8f5e9',
      boxShadow: '0 4px 16px rgba(45,125,70,0.07)'
    }}>
      <span style={{ fontSize: '1.8rem', lineHeight: 1, marginBottom: '0.8rem' }}>{emoji}</span>
      <span style={{ fontSize: '2.6rem', fontWeight: '900', color: '#2D7D46', lineHeight: 1, letterSpacing: '-1px' }}>
        {count.toLocaleString()}{suffix}
      </span>
      <span style={{ color: '#666', fontSize: '0.95rem', fontWeight: '600', marginTop: '0.5rem', textAlign: 'center' }}>{label}</span>
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();
  return (
    <div>
      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 45%, #D1FAE5 100%)',
        position: 'relative', overflow: 'hidden',
        borderBottom: '1px solid #BBF7D0'
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.25,
          backgroundImage: 'radial-gradient(circle, #16A34A 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem 4rem', display: 'flex', alignItems: 'center', gap: '3.5rem', width: '100%', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <div style={{ flex: '1', minWidth: '320px', animation: 'fadeInUp 0.8s ease' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#fff', color: '#166534', padding: '0.4rem 1.1rem 0.4rem 0.6rem', borderRadius: '30px', fontSize: '0.88rem', fontWeight: '800', marginBottom: '1.4rem', border: '1.5px solid #86EFAC', boxShadow: '0 4px 12px rgba(22,101,52,0.08)' }}>
              <img src="/logo.png" alt="FoodPulse Logo" style={{ height: '28px', width: 'auto' }} />
              <span>AI-Powered Food Redistribution Platform</span>
            </div>
            <h1 style={{ color: '#0F172A', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: '900', lineHeight: '1.15', margin: '0 0 1.2rem', textAlign: 'left' }}>
              Share Surplus Food.<br />
              <span style={{
                color: '#16A34A',
                borderBottom: '5px solid #F59E0B',
                paddingBottom: '2px',
                display: 'inline'
              }}>
                Feed Someone in Need.
              </span>
            </h1>
            <p style={{ color: '#334155', fontSize: '1.15rem', maxWidth: '520px', lineHeight: '1.75', marginBottom: '2.5rem', textAlign: 'left', fontWeight: '500' }}>
              Connect your surplus food with organizations that help people in need — intelligently matched by AI, delivered with care.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              <Link to={user ? (user.role === 'DONOR' ? '/donor/share-food' : '/donor/share-food') : '/login'} state={{ message: 'Please log in as a Donor to share food.' }}>
                <button style={{ background: '#16A34A', color: '#fff', border: 'none', padding: '1rem 2.2rem', borderRadius: '10px', fontSize: '1.1rem', fontWeight: '800', cursor: 'pointer', boxShadow: '0 6px 20px rgba(22,163,74,0.3)', transition: 'all 0.2s' }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = '#15803D'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(22,163,74,0.4)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#16A34A'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(22,163,74,0.3)'; }}>
                  🍽️ Donate Food
                </button>
              </Link>
              <Link to={user ? (user.role === 'NGO' ? '/ngo/dashboard' : '/ngo/dashboard') : '/login'} state={{ message: 'Please log in as an NGO to claim food donations.' }}>
                <button style={{ background: '#fff', color: '#166534', border: '2px solid #166534', padding: '1rem 2.2rem', borderRadius: '10px', fontSize: '1.1rem', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', transition: 'all 0.2s' }}
                  onMouseOver={e => { e.currentTarget.style.background = '#DCFCE7'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseOut={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  🏢 Find Food (NGO Portal)
                </button>
              </Link>
            </div>
          </div>
          {/* Live Activity Feed */}
          <div style={{ flex: '1', minWidth: '320px', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              background: '#ffffff', borderRadius: '24px',
              padding: '1.6rem', border: '1.5px solid #BBF7D0', width: '340px',
              animation: 'float 4s ease-in-out infinite', boxShadow: '0 20px 45px rgba(22,101,52,0.1)'
            }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#16A34A', display: 'inline-block', boxShadow: '0 0 0 4px rgba(34,197,94,0.25)', animation: 'pulse 1.5s ease-in-out infinite' }} />
                <span style={{ color: '#0F172A', fontWeight: '800', fontSize: '1rem', letterSpacing: '-0.2px' }}>Live Activity Feed</span>
                <span style={{ marginLeft: 'auto', background: '#F0FDF4', color: '#166534', fontSize: '0.75rem', fontWeight: '800', padding: '0.25rem 0.65rem', borderRadius: '12px', border: '1px solid #BBF7D0' }}>Live Updates</span>
              </div>

              {/* Activity Items */}
              {[
                { emoji: '🍛', donor: 'Hotel Sunrise', food: 'Biryani', qty: '60 meals', ngo: 'Hope Shelter', time: '2 min ago', status: 'Delivered', color: '#15803D', badgeBg: '#DCFCE7' },
                { emoji: '🥦', donor: 'Green Mart', food: 'Vegetables', qty: '15 kg', ngo: 'City Orphanage', time: '18 min ago', status: 'Picked Up', color: '#1D4ED8', badgeBg: '#DBEAFE' },
                { emoji: '🍞', donor: 'Sunrise Bakery', food: 'Bread & Pastries', qty: '40 pcs', ngo: 'Community Centre', time: '45 min ago', status: 'Accepted', color: '#B45309', badgeBg: '#FEF3C7' },
              ].map((item, i) => (
                <div key={i} style={{ background: '#F8FAFC', borderRadius: '14px', padding: '0.95rem', marginBottom: '0.75rem', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.6rem', flexShrink: 0, marginTop: '2px' }}>{item.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                        <span style={{ color: '#0F172A', fontWeight: '800', fontSize: '0.92rem' }}>{item.food}</span>
                        <span style={{ color: item.color, fontSize: '0.72rem', fontWeight: '800', background: item.badgeBg, padding: '0.2rem 0.55rem', borderRadius: '8px', flexShrink: 0 }}>{item.status}</span>
                      </div>
                      <div style={{ color: '#64748B', fontSize: '0.8rem', marginBottom: '0.3rem' }}>{item.qty} · {item.donor}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>→</span>
                        <span style={{ color: '#166534', fontSize: '0.8rem', fontWeight: '700' }}>{item.ngo}</span>
                        <span style={{ color: '#94A3B8', fontSize: '0.72rem', marginLeft: 'auto' }}>{item.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Footer */}
              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#64748B', fontSize: '0.82rem', fontWeight: '600' }}>🍽️ 47 donations today</span>
                <Link to="/donor/dashboard" style={{
                  color: '#166534', fontSize: '0.85rem', fontWeight: '800', textDecoration: 'none',
                  background: '#DCFCE7', padding: '0.35rem 0.85rem', borderRadius: '10px',
                  display: 'inline-flex', alignItems: 'center', gap: '0.25rem', transition: 'all 0.2s',
                  border: '1px solid #86EFAC'
                }}
                  onMouseOver={e => { e.currentTarget.style.background = '#BBF7D0'; }}
                  onMouseOut={e => { e.currentTarget.style.background = '#DCFCE7'; }}>
                  View all →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: '#F4F8F4', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '0.5rem' }}>Our Impact So Far</h2>
          <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '3rem' }}>Every donation creates a ripple of change</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <AnimatedCounter target={15000} suffix="+" label="Meals Donated" emoji="🍽️" />
            <AnimatedCounter target={20} suffix="+" label="NGOs Connected" emoji="🏢" />
            <AnimatedCounter target={5000} suffix="+" label="Families Fed" emoji="👨‍👩‍👧‍👦" />
            <AnimatedCounter target={5} suffix="+" label="Connected Cities" emoji="🏙️" />
          </div>
        </div>
      </section>

      {/* CONNECTED CITIES NETWORK */}
      <section style={{ background: '#ffffff', padding: '5rem 2rem', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#DCFCE7', color: '#166534', padding: '0.35rem 1rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '800', marginBottom: '1rem' }}>
            🌐 Multi-City Redistribution Network
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0F172A', marginBottom: '0.5rem' }}>
            Active Food Redistribution Cities
          </h2>
          <p style={{ color: '#64748B', fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Connecting donors and verified NGOs across major metropolitan hubs in India
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1.4rem', alignItems: 'stretch' }}>
            {[
              { name: 'Hyderabad', state: 'Telangana', ngos: '6 Verified NGOs', emoji: '🕌', areas: 'Banjara Hills, Hitec City, Secunderabad, Charminar, KPHB, LB Nagar' },
              { name: 'Bengaluru', state: 'Karnataka', ngos: '4 Verified NGOs', emoji: '🌳', areas: 'Indiranagar, Koramangala, Whitefield, Jayanagar' },
              { name: 'Mumbai', state: 'Maharashtra', ngos: '4 Verified NGOs', emoji: '🌊', areas: 'Bandra, Dharavi, Andheri West, Colaba' },
              { name: 'Chennai', state: 'Tamil Nadu', ngos: '4 Verified NGOs', emoji: '🏛️', areas: 'T. Nagar, Adyar, Anna Nagar, Marina' },
              { name: 'Visakhapatnam', state: 'Andhra Pradesh', ngos: '4 Verified NGOs', emoji: '⚓', areas: 'RK Beach, Gajuwaka, MVP Colony, Simhachalam' },
            ].map((c, i) => (
              <Link key={i} to="/login" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{
                  background: '#F8FAFC', borderRadius: '18px', padding: '1.8rem 1.2rem', textAlign: 'left',
                  border: '1.5px solid #E2E8F0', transition: 'all 0.25s ease', cursor: 'pointer',
                  flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', boxSizing: 'border-box'
                }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = '#16A34A'; e.currentTarget.style.boxShadow = '0 12px 25px rgba(22,163,74,0.12)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.6rem' }}>{c.emoji}</div>
                    <h3 style={{ margin: '0 0 0.2rem', color: '#0F172A', fontSize: '1.25rem', fontWeight: '900' }}>{c.name}</h3>
                    <div style={{ color: '#16A34A', fontSize: '0.82rem', fontWeight: '800', marginBottom: '0.6rem' }}>{c.state} &bull; {c.ngos}</div>
                  </div>
                  <p style={{ color: '#64748B', fontSize: '0.78rem', margin: 0, lineHeight: '1.4' }}>📍 {c.areas}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: '#F9FBF7', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '0.5rem' }}>How FoodPulse Works</h2>
          <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '4rem' }}>Simple. Smart. Impactful.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {[
              { step: '01', emoji: '📸', title: 'Share Food', desc: 'Upload food details and a photo of your surplus food' },
              { step: '02', emoji: '🤖', title: 'AI Matches', desc: 'Our system intelligently finds the most suitable NGO' },
              { step: '03', emoji: '🔔', title: 'NGO Notified', desc: 'The matched NGO receives an instant notification' },
              { step: '04', emoji: '🚗', title: 'Pickup & Deliver', desc: 'Food is collected and distributed to those in need' },
            ].map((item, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: '16px', padding: '2rem', position: 'relative',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e8f5e9',
                transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default'
              }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(45,125,70,0.15)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'; }}>
                <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: '#2D7D46', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.85rem' }}>{item.step}</div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem', marginTop: '0.5rem' }}>{item.emoji}</div>
                <h3 style={{ color: '#1a1a1a', margin: '0 0 0.5rem', fontSize: '1.2rem' }}>{item.title}</h3>
                <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOD CATEGORIES */}
      <section style={{ background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#166534', marginBottom: '0.5rem' }}>We Accept All Types of Food</h2>
          <p style={{ color: '#15803D', fontSize: '1.1rem', marginBottom: '3rem', fontWeight: '500' }}>From cooked meals to fresh produce — every bite matters</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.5rem' }}>
            {[
              { emoji: '🍲', label: 'Cooked Food' },
              { emoji: '🥦', label: 'Vegetables' },
              { emoji: '🍎', label: 'Fruits' },
              { emoji: '🥖', label: 'Bakery Items' },
              { emoji: '📦', label: 'Packaged Food' },
              { emoji: '🥗', label: 'Other' },
            ].map((cat, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: '18px',
                padding: '2.2rem 1rem', cursor: 'pointer', border: '1.5px solid #BBF7D0',
                boxShadow: '0 4px 15px rgba(22,101,52,0.06)',
                transition: 'all 0.25s ease'
              }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = '#16A34A'; e.currentTarget.style.boxShadow = '0 12px 25px rgba(22,101,52,0.12)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#BBF7D0'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(22,101,52,0.06)'; }}>
                <div style={{ fontSize: '2.8rem', marginBottom: '0.75rem', lineHeight: 1 }}>{cat.emoji}</div>
                <div style={{ color: '#166534', fontWeight: '700', fontSize: '1rem' }}>{cat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: '#fff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '0.5rem' }}>What People Say</h2>
          <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '3rem' }}>Stories from our community</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { name: 'Ramesh Kumar', role: 'Restaurant Owner', initials: 'RK', color: '#16A34A', quote: 'FoodPulse made it so easy to donate our leftover food every evening. The AI matching is incredibly fast and accurate.' },
              { name: 'Sunita Sharma', role: 'NGO Coordinator', initials: 'SS', color: '#2563EB', quote: 'We receive exactly the food requirements we need, right on time. FoodPulse has transformed how we serve our community.' },
              { name: 'Anil Patel', role: 'Event Organizer', initials: 'AP', color: '#D97706', quote: 'After large catering events, instead of edible food going to waste, it directly feeds shelters within the hour.' },
            ].map((t, i) => (
              <div key={i} style={{
                background: '#F9FBF7', borderRadius: '20px', padding: '2.2rem 1.8rem', textAlign: 'left',
                border: '1px solid #E2E8F0', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)', transition: 'all 0.25s ease'
              }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.07)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.03)'; }}>
                <div>
                  <div style={{ color: '#F59E0B', fontSize: '1rem', marginBottom: '1rem', letterSpacing: '2px' }}>★★★★★</div>
                  <p style={{ color: '#334155', lineHeight: '1.7', marginBottom: '1.5rem', fontSize: '0.98rem' }}>"{t.quote}"</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', paddingTop: '1rem', borderTop: '1px solid #EDF2F7' }}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '50%', background: t.color,
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: '800', fontSize: '0.95rem', flexShrink: 0
                  }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', color: '#0F172A', fontSize: '0.95rem' }}>{t.name}</div>
                    <div style={{ color: '#16A34A', fontSize: '0.82rem', fontWeight: '600' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: 'linear-gradient(135deg, #F59E0B, #E64A19)',
        padding: '5rem 2rem', textAlign: 'center'
      }}>
        <h2 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem' }}>Ready to Make a Difference?</h2>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', marginBottom: '2.5rem' }}>Join thousands of donors and NGOs already making an impact</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register"><button style={{ background: '#fff', color: '#E64A19', border: 'none', padding: '1rem 2.5rem', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer' }}>Start Donating</button></Link>
          <Link to="/register"><button style={{ background: 'transparent', color: '#fff', border: '2px solid #fff', padding: '1rem 2.5rem', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer' }}>Register Your NGO</button></Link>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
