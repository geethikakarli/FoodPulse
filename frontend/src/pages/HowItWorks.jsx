import React from 'react';
import { Link } from 'react-router-dom';

const steps = [
  {
    num: '01', emoji: '📋', title: 'Register & Create Profile',
    desc: 'Sign up as a Donor or NGO. Donors provide their location and type (Restaurant, Hotel, etc.). NGOs specify their food requirements, capacity, and service area.',
    details: ['Takes less than 2 minutes', 'Free to join', 'Admin verified for NGOs']
  },
  {
    num: '02', emoji: '📸', title: 'Share Food Details',
    desc: 'Donors fill in a simple form: upload a photo, select food category, enter quantity, storage condition, and recommended consumption time.',
    details: ['Food image upload', 'Adaptive time fields', 'GPS location support']
  },
  {
    num: '03', emoji: '🤖', title: 'AI Recommendation Engine',
    desc: 'Our Random Forest ML model analyzes the food details, donor location, NGO locations, their food preferences, and historical acceptance patterns to identify the most suitable NGO.',
    details: ['Multiple factors analyzed', 'Suitability score generated', 'Top match recommended']
  },
  {
    num: '04', emoji: '🔔', title: 'NGO Gets Notified',
    desc: 'The best-matched NGO receives an instant notification with full donation details. They can accept or decline. If declined, the next best match is notified.',
    details: ['Real-time notification', 'Accept or Reject option', 'Auto-fallback to next NGO']
  },
  {
    num: '05', emoji: '🗺️', title: 'Map & Route Planning',
    desc: 'Once accepted, both the donor and NGO see an interactive map with the pickup route, estimated distance, and travel time.',
    details: ['Interactive map', 'Optimized route', 'Estimated pickup time']
  },
  {
    num: '06', emoji: '🎉', title: 'Food Reaches People',
    desc: 'The NGO collects the food and distributes it to people in need. Both parties can track the donation status all the way from "Posted" to "Delivered".',
    details: ['Real-time status tracking', '6-step journey', 'Impact recorded for both parties']
  },
];

export default function HowItWorks() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1B5E20, #388E3C)', padding: '6rem 2rem', textAlign: 'center', color: '#fff' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', margin: '0 0 1rem' }}>How FoodPulse Works</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9, lineHeight: '1.7' }}>
          From surplus to served — a simple, AI-powered 6-step process that ensures food reaches the right hands at the right time.
        </p>
      </section>

      {/* Steps */}
      <section style={{ padding: '5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', alignItems: 'flex-start' }}>
              {/* Number + line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #1B5E20, #2D7D46)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1rem', boxShadow: '0 4px 15px rgba(45,125,70,0.3)' }}>{step.num}</div>
                {i < steps.length - 1 && <div style={{ width: '2px', height: '80px', background: 'linear-gradient(to bottom, #2D7D46, #e0e0e0)', marginTop: '0.5rem' }} />}
              </div>
              {/* Content */}
              <div style={{ flex: 1, paddingTop: '0.8rem', background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', border: '1px solid #e8f5e9' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{step.emoji}</div>
                <h3 style={{ color: '#1a1a1a', margin: '0 0 0.75rem', fontSize: '1.2rem', fontWeight: '700' }}>{step.title}</h3>
                <p style={{ color: '#555', lineHeight: '1.7', marginBottom: '1rem', fontSize: '0.95rem' }}>{step.desc}</p>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {step.details.map(d => (
                    <span key={d} style={{ background: '#e8f5e9', color: '#2D7D46', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>✓ {d}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #F59E0B, #E64A19)', padding: '4rem 2rem', textAlign: 'center', color: '#fff' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>Ready to Get Started?</h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register"><button style={{ background: '#fff', color: '#E64A19', border: 'none', padding: '1rem 2rem', borderRadius: '8px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Register as Donor</button></Link>
          <Link to="/register"><button style={{ background: 'transparent', color: '#fff', border: '2px solid #fff', padding: '1rem 2rem', borderRadius: '8px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>Register as NGO</button></Link>
        </div>
      </section>
    </div>
  );
}
