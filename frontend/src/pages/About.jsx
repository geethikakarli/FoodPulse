import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1B5E20, #2D7D46)', padding: '6rem 2rem', textAlign: 'center', color: '#fff' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', margin: '0 0 1rem' }}>Our Mission</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9, lineHeight: '1.7' }}>
          FoodPulse exists to eliminate food waste while feeding communities in need — powered by technology, driven by compassion.
        </p>
      </section>

      {/* Problem & Solution */}
      <section style={{ padding: '5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '1rem' }}>The Problem We're Solving</h2>
            <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '1rem' }}>
              Over <strong>30% of food produced globally is wasted</strong>, while <strong>800 million people</strong> go hungry every day. Restaurants, hotels, events, and households generate enormous quantities of edible surplus food that ends up in landfills.
            </p>
            <p style={{ color: '#555', lineHeight: '1.8' }}>
              Existing donation processes rely on manual calls, WhatsApp messages, and guesswork — resulting in slow, inefficient allocation and spoilage before the food even reaches someone in need.
            </p>
          </div>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { icon: '🍽️', stat: '1.3 Billion Tons', desc: 'of food wasted globally each year' },
              { icon: '😔', stat: '828 Million', desc: 'people suffer from hunger worldwide' },
              { icon: '💚', stat: '30%', desc: 'of food can be saved through better redistribution' },
            ].map(({ icon, stat, desc }) => (
              <div key={stat} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: '#F9FBF7', borderRadius: '12px', padding: '1.2rem', border: '1px solid #e8f5e9' }}>
                <span style={{ fontSize: '2rem' }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '1.2rem', color: '#2D7D46' }}>{stat}</div>
                  <div style={{ color: '#555', fontSize: '0.9rem' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '5rem 2rem', background: '#F9FBF7' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '0.5rem' }}>Our Core Values</h2>
          <p style={{ color: '#666', marginBottom: '3rem' }}>The principles that guide everything we do</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { emoji: '❤️', title: 'Compassion', desc: 'Every person deserves access to nutritious food. We act with empathy and care.' },
              { emoji: '🤖', title: 'Innovation', desc: 'We use AI and technology to solve an age-old problem in a smarter way.' },
              { emoji: '🤝', title: 'Community', desc: 'We believe in the power of connection — between donors, NGOs, and those in need.' },
              { emoji: '🌿', title: 'Sustainability', desc: "Reducing food waste is not just charitable — it's essential for our planet." },
            ].map(({ emoji, title, desc }) => (
              <div key={title} style={{ background: '#fff', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', border: '1px solid #e8f5e9' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{emoji}</div>
                <h3 style={{ color: '#1a1a1a', margin: '0 0 0.5rem', fontSize: '1.1rem' }}>{title}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#2D7D46', padding: '4rem 2rem', textAlign: 'center', color: '#fff' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>Join the FoodPulse Movement</h2>
        <p style={{ opacity: 0.9, marginBottom: '2rem', fontSize: '1.1rem' }}>Whether you have food to share or communities to serve, we have a place for you.</p>
        <Link to="/register"><button style={{ background: '#F59E0B', color: '#fff', border: 'none', padding: '1rem 2.5rem', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer' }}>Get Started Today</button></Link>
      </section>
    </div>
  );
}
