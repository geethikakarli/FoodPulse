import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getRegisteredNgos } from '../data/ngoData';
import RealTimeMap from '../components/RealTimeMap';

// Unique, realistic local donor pickup locations for every connected city Organisation
const HYDERABAD_LOCAL_DONATIONS = {
  // --- HYDERABAD ---
  'Hyd Food Centre': {
    id: 'FP-8492',
    donorName: 'Chutneys Restaurant (Banjara Hills)',
    donorType: 'Restaurant',
    donorEmail: 'manager@chutneysbanjara.com',
    food: 'Idli, Vada, Chutneys & Sambar (Breakfast Surplus)',
    qty: '45 portions',
    category: 'Cooked Food',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    prepTime: 'Today, 10:30 AM',
    consumeBy: 'Today, 04:00 PM',
    location: 'Road No 3, Banjara Hills, Hyderabad',
    coords: { lat: 17.4190, lng: 78.4480 },
    ngoCoords: { lat: 17.4156, lng: 78.4350 },
    distance: '1.8',
    eta: '10 mins',
    matchScore: '97%'
  },
  'Cyberabad Rescue': {
    id: 'FP-8501',
    donorName: 'Novotel Hotel Banquet (Hitec City)',
    donorType: 'Hotel',
    donorEmail: 'chef@novotelhyd.com',
    food: 'Buffet Spread: Paneer Butter Masala, Jeera Rice & Rotis',
    qty: '60 meals',
    category: 'Cooked Food',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    prepTime: 'Today, 02:00 PM',
    consumeBy: 'Today, 08:30 PM',
    location: 'Mindspace IT Park, Madhapur, Hitec City, Hyderabad',
    coords: { lat: 17.4330, lng: 78.3810 },
    ngoCoords: { lat: 17.4401, lng: 78.3489 },
    distance: '3.4',
    eta: '14 mins',
    matchScore: '98%'
  },
  'Secunderabad Shelter': {
    id: 'FP-8512',
    donorName: 'Minerva Grand & Paradise Caterers',
    donorType: 'Catering',
    donorEmail: 'events@minervagrand.com',
    food: 'Hyderabadi Veg Pulao, Curries & Sweet Halwa',
    qty: '50 portions',
    category: 'Cooked Food',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    prepTime: 'Today, 12:30 PM',
    consumeBy: 'Today, 06:30 PM',
    location: 'S.D. Road, Near Clock Tower, Secunderabad',
    coords: { lat: 17.4420, lng: 78.4870 },
    ngoCoords: { lat: 17.4399, lng: 78.4983 },
    distance: '2.1',
    eta: '11 mins',
    matchScore: '96%'
  },
  'Charminar Seva': {
    id: 'FP-8524',
    donorName: 'Hotel Shadab & Pista House',
    donorType: 'Restaurant',
    donorEmail: 'orders@shadabcharminar.com',
    food: 'Chicken Dum Biryani & Mirchi Ka Salan Pots',
    qty: '75 portions',
    category: 'Cooked Food',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    prepTime: 'Today, 01:15 PM',
    consumeBy: 'Today, 07:45 PM',
    location: 'Near High Court, Madina Building, Charminar, Hyderabad',
    coords: { lat: 17.3680, lng: 78.4720 },
    ngoCoords: { lat: 17.3616, lng: 78.4747 },
    distance: '1.4',
    eta: '8 mins',
    matchScore: '99%'
  },
  'Kukatpally Relief': {
    id: 'FP-8533',
    donorName: 'Forum Mall Food Plaza (KPHB)',
    donorType: 'Food Court',
    donorEmail: 'foodcourt@kphbmall.com',
    food: 'Fresh Fruit Crates (Apples, Bananas) & Veg Meals',
    qty: '30 kg produce & 40 meals',
    category: 'Fruits & Cooked Meals',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80',
    prepTime: 'Today, 11:00 AM',
    consumeBy: 'Today, 09:00 PM',
    location: 'KPHB 9th Phase, Near JNTU, Kukatpally, Hyderabad',
    coords: { lat: 17.4880, lng: 78.3880 },
    ngoCoords: { lat: 17.4938, lng: 78.3995 },
    distance: '2.6',
    eta: '13 mins',
    matchScore: '95%'
  },
  'LB Nagar Trust': {
    id: 'FP-8547',
    donorName: 'Surya Grand Convention & Banquets',
    donorType: 'Event Organizer',
    donorEmail: 'catering@suryagrand.com',
    food: 'South Indian Wedding Meals (Rice, Sambar, Fry, Sweets)',
    qty: '55 meals',
    category: 'Cooked Food',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    prepTime: 'Today, 01:00 PM',
    consumeBy: 'Today, 07:00 PM',
    location: 'Opposite Metro Station, Kothapet, Dilsukhnagar, Hyderabad',
    coords: { lat: 17.3620, lng: 78.5380 },
    ngoCoords: { lat: 17.3457, lng: 78.5522 },
    distance: '3.1',
    eta: '15 mins',
    matchScore: '96%'
  },

  // --- BENGALURU ---
  'Bangalore Food Bank': {
    id: 'FP-8601',
    donorName: 'Toit & Indiranagar Food Plaza',
    donorType: 'Restaurant',
    donorEmail: 'donations@toit.in',
    food: 'Fresh Bakery Loaves, Sandwiches & Rice Containers',
    qty: '50 portions',
    category: 'Bakery & Meals',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    prepTime: 'Today, 11:30 AM',
    consumeBy: 'Today, 06:00 PM',
    location: '100 Feet Road, Indiranagar, Bengaluru',
    coords: { lat: 12.9784, lng: 77.6408 },
    ngoCoords: { lat: 12.9784, lng: 77.6408 },
    distance: '1.9',
    eta: '9 mins',
    matchScore: '98%'
  },
  'Koramangala Relief': {
    id: 'FP-8610',
    donorName: 'Empire Hotel & MTR Koramangala',
    donorType: 'Hotel',
    donorEmail: 'catering@empireblr.com',
    food: 'Ghee Rice, Paneer Curry & Parathas',
    qty: '65 meals',
    category: 'Cooked Food',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    prepTime: 'Today, 01:00 PM',
    consumeBy: 'Today, 08:00 PM',
    location: '5th Block, Koramangala, Bengaluru',
    coords: { lat: 12.9352, lng: 77.6245 },
    ngoCoords: { lat: 12.9352, lng: 77.6245 },
    distance: '2.2',
    eta: '11 mins',
    matchScore: '96%'
  },
  'Whitefield Care Trust': {
    id: 'FP-8620',
    donorName: 'Sheraton Grand ITPL Banquets',
    donorType: 'Hotel Banquet',
    donorEmail: 'events@sheratonwhitefield.com',
    food: 'Corporate Buffet Surplus (North Indian Meals & Desserts)',
    qty: '70 portions',
    category: 'Cooked Food',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    prepTime: 'Today, 02:15 PM',
    consumeBy: 'Today, 09:00 PM',
    location: 'ITPL Main Road, Whitefield, Bengaluru',
    coords: { lat: 12.9698, lng: 77.7499 },
    ngoCoords: { lat: 12.9698, lng: 77.7499 },
    distance: '3.0',
    eta: '14 mins',
    matchScore: '97%'
  },

  // --- MUMBAI ---
  'Roti Bank Mumbai': {
    id: 'FP-8701',
    donorName: 'Taj Mahal Palace Banquets & Dadar Caterers',
    donorType: 'Hotel & Banquet',
    donorEmail: 'rotibank@tajmumbai.com',
    food: 'Roti, Dal Tadka, Subzi & Jeera Rice',
    qty: '100 portions',
    category: 'Cooked Food',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    prepTime: 'Today, 12:00 PM',
    consumeBy: 'Today, 07:30 PM',
    location: 'Linking Road, Bandra West, Mumbai',
    coords: { lat: 19.0596, lng: 72.8295 },
    ngoCoords: { lat: 19.0596, lng: 72.8295 },
    distance: '2.5',
    eta: '12 mins',
    matchScore: '99%'
  },
  'Dharavi Relief Trust': {
    id: 'FP-8715',
    donorName: 'Sion Hospital Canteen & Local Mart',
    donorType: 'Canteen',
    donorEmail: 'canteen@sionmumbai.gov',
    food: 'Puri Bhaji, Rice Bowls & Fresh Bananas',
    qty: '80 meals & 25 kg produce',
    category: 'Cooked Food',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80',
    prepTime: 'Today, 11:00 AM',
    consumeBy: 'Today, 05:00 PM',
    location: '90 Feet Road, Dharavi, Mumbai',
    coords: { lat: 19.0402, lng: 72.8509 },
    ngoCoords: { lat: 19.0402, lng: 72.8509 },
    distance: '1.5',
    eta: '8 mins',
    matchScore: '97%'
  },

  // --- CHENNAI ---
  'No Food Waste Chennai': {
    id: 'FP-8801',
    donorName: 'Hotel Saravana Bhavan & T. Nagar Hall',
    donorType: 'Restaurant & Wedding Hall',
    donorEmail: 'help@nofoodwastechennai.org',
    food: 'South Indian Meals (Sambar Rice, Poriyal, Appalam & Payasam)',
    qty: '85 portions',
    category: 'Cooked Food',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    prepTime: 'Today, 12:15 PM',
    consumeBy: 'Today, 06:30 PM',
    location: 'Usman Road, T. Nagar, Chennai',
    coords: { lat: 13.0418, lng: 80.2341 },
    ngoCoords: { lat: 13.0418, lng: 80.2341 },
    distance: '2.0',
    eta: '10 mins',
    matchScore: '98%'
  },
  'Adyar Annadhanam Trust': {
    id: 'FP-8812',
    donorName: 'Sangeetha Veg Restaurant & Besant Nagar Hotel',
    donorType: 'Restaurant',
    donorEmail: 'care@adyarannadhanam.org',
    food: 'Idli, Pongal, Chutneys & Fresh Fruits',
    qty: '60 portions',
    category: 'Cooked Food & Fruits',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    prepTime: 'Today, 10:45 AM',
    consumeBy: 'Today, 04:30 PM',
    location: 'LB Road, Adyar, Chennai',
    coords: { lat: 13.0012, lng: 80.2565 },
    ngoCoords: { lat: 13.0012, lng: 80.2565 },
    distance: '1.7',
    eta: '9 mins',
    matchScore: '96%'
  },

  // --- VISAKHAPATNAM ---
  'Vizag Hunger Free': {
    id: 'FP-8901',
    donorName: 'Hotel Green Park & Siripuram Caterers',
    donorType: 'Hotel',
    donorEmail: 'donations@greenparkvizag.com',
    food: 'Andhra Thali Meals (Rice, Pappu, Veg Fry, Curd)',
    qty: '60 portions',
    category: 'Cooked Food',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    prepTime: 'Today, 12:00 PM',
    consumeBy: 'Today, 06:00 PM',
    location: 'RK Beach Road, Siripuram, Visakhapatnam',
    coords: { lat: 17.7101, lng: 83.3163 },
    ngoCoords: { lat: 17.7101, lng: 83.3163 },
    distance: '2.1',
    eta: '10 mins',
    matchScore: '97%'
  },
  'Gajuwaka Seva Society': {
    id: 'FP-8910',
    donorName: 'Steel Plant Canteen & Industrial Catering',
    donorType: 'Canteen',
    donorEmail: 'canteen@vizagsteel.gov.in',
    food: 'Fresh Rice, Sambar, Chapati & Mixed Veg Curry',
    qty: '75 meals',
    category: 'Cooked Food',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    prepTime: 'Today, 01:30 PM',
    consumeBy: 'Today, 08:00 PM',
    location: 'Main Gate, Steel Plant Township, Gajuwaka, Visakhapatnam',
    coords: { lat: 17.6904, lng: 83.2185 },
    ngoCoords: { lat: 17.6904, lng: 83.2185 },
    distance: '2.8',
    eta: '13 mins',
    matchScore: '96%'
  }
};

const requirementsMap = {
  'Hyd Food Centre': ['Cooked Meals: 50 portions', 'Rice & Dal: 25 kg', 'Fresh Vegetables: 15 kg', 'Bread: 20 loaves'],
  'Cyberabad Rescue': ['Buffet Surplus: 60 meals', 'Packed Meals: 40 boxes', 'Sandwiches & Bakery: 30 pcs'],
  'Secunderabad Shelter': ['Nutritious Meals: 45 portions', 'Milk & Curd: 15 L', 'Fresh Fruits: 20 kg'],
  'Charminar Seva': ['Hot Meals: 70 portions', 'Biryani / Rice: 35 kg', 'Groceries & Fruits: 20 kg'],
  'Kukatpally Relief': ['Vegetarian Meals: 40 portions', 'Fresh Fruit Crates: 30 kg', 'Vegetables: 25 kg'],
  'LB Nagar Trust': ['Wedding / Banquet Surplus: 50 meals', 'Rice & Sambar: 30 kg', 'Bakery Snacks: 25 pcs'],

  'Bangalore Food Bank': ['Bakery Loaves: 40 pcs', 'Cooked Rice Bowls: 50 portions', 'Fresh Fruits: 20 kg'],
  'Koramangala Relief': ['South Indian Meals: 60 portions', 'Restaurant Surplus: 40 boxes'],
  'Whitefield Care Trust': ['Corporate Buffet Surplus: 70 meals', 'Desserts & Breads: 30 pcs'],
  'Jayanagar Seva': ['Pure Veg Meals: 50 portions', 'Milk: 20 L', 'Fresh Vegetables: 20 kg'],

  'Roti Bank Mumbai': ['Roti & Sabzi: 100 portions', 'Rice Containers: 40 kg', 'Groceries: 25 kg'],
  'Dharavi Relief Trust': ['Hot Puri Bhaji: 80 meals', 'Ration Kits: 30 boxes', 'Bananas: 40 kg'],
  'Andheri Seva Foundation': ['Hotel Buffet Surplus: 60 meals', 'Packed Lunches: 40 boxes'],
  'Colaba Annakshetra': ['Prepared Lunches: 50 meals', 'Dry Bakery Goods: 30 pcs'],

  'No Food Waste Chennai': ['Marriage Surplus: 80 meals', 'Sambar Rice: 40 kg', 'Appalam & Sweets'],
  'Adyar Annadhanam Trust': ['South Indian Breakfast: 60 portions', 'Milk & Curd: 20 L', 'Fruits: 25 kg'],
  'Anna Nagar Seva': ['Fresh Vegetables: 30 kg', 'Cooked Meals: 50 portions'],
  'Marina Relief Centre': ['Hot Tiffin Items: 70 portions', 'Rice Bowls: 40 meals'],

  'Vizag Hunger Free': ['Andhra Thali Meals: 60 portions', 'Rice & Sambar: 30 kg', 'Bananas: 30 kg'],
  'Gajuwaka Seva Society': ['Canteen Surplus: 70 meals', 'Roti & Veg Curries: 40 portions'],
  'MVP Colony Relief': ['Hotel Surplus: 50 meals', 'Bakery Snacks: 30 pcs'],
  'Simhachalam Trust': ['Annadhanam Meals: 80 portions', 'Rice & Curries: 35 kg']
};

export default function NGODashboard() {
  const { user } = useAuth();
  const [accepted, setAccepted] = useState(null);
  const [incomingDonation, setIncomingDonation] = useState(null);

  const currentOrgName = user?.orgName || user?.name || 'Hyd Food Centre';
  const allNgos = getRegisteredNgos();
  const matchedOrgMeta = allNgos.find(n => n.orgName === currentOrgName) || allNgos[0] || {
    orgName: currentOrgName,
    serviceArea: 'Banjara Hills, Hyderabad',
    coords: { lat: 17.4156, lng: 78.4350 }
  };

  useEffect(() => {
    // Check if there is an active live donation from local donor
    const saved = localStorage.getItem('foodpulse_active_donation');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed.ngo &&
          (parsed.ngo.toLowerCase().trim() === currentOrgName.toLowerCase().trim() ||
           currentOrgName.toLowerCase().includes(parsed.ngo.toLowerCase()) ||
           parsed.ngo.toLowerCase().includes(currentOrgName.toLowerCase()))
        ) {
          setIncomingDonation(parsed);
          return;
        }
      } catch (e) {}
    }

    // Default to this organisation's distinct local Hyderabad donor location
    const tailoredDonation = HYDERABAD_LOCAL_DONATIONS[currentOrgName] || {
      id: `FP-${Math.floor(8000 + Math.random() * 900)}`,
      donorName: `Local Donor Partner (${matchedOrgMeta.serviceArea?.split(',')[0] || 'Hyderabad'})`,
      donorType: 'Restaurant',
      donorEmail: 'contact@localdonor.com',
      food: 'Fresh Hot Meals & Dal',
      qty: '40 portions',
      category: 'Cooked Food',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      prepTime: 'Today, 12:00 PM',
      consumeBy: 'Today, 06:30 PM',
      location: `${matchedOrgMeta.serviceArea || 'Banjara Hills, Hyderabad'}`,
      coords: {
        lat: (matchedOrgMeta.coords?.lat || 17.4156) + 0.008,
        lng: (matchedOrgMeta.coords?.lng || 78.4350) + 0.006
      },
      ngoCoords: matchedOrgMeta.coords || { lat: 17.4156, lng: 78.4350 },
      distance: '2.2',
      eta: '12 mins',
      ngo: currentOrgName,
      status: 'Posted',
      matchScore: '96%'
    };

    setIncomingDonation(tailoredDonation);
    setAccepted(null);
  }, [currentOrgName]);

  const isDonationMatchedToThisNgo =
    incomingDonation &&
    (incomingDonation.ngo === currentOrgName ||
     !incomingDonation.ngo ||
     incomingDonation.ngo.toLowerCase().trim() === currentOrgName.toLowerCase().trim() ||
     currentOrgName.toLowerCase().includes(incomingDonation.ngo.toLowerCase()));

  const handleAccept = () => {
    setAccepted(true);
    if (incomingDonation) {
      const updated = { ...incomingDonation, status: `Accepted by ${currentOrgName}` };
      localStorage.setItem('foodpulse_active_donation', JSON.stringify(updated));
    }
  };

  const handleReject = () => {
    setAccepted(false);
  };

  const donorCoordinates = incomingDonation?.coords || { lat: 17.4190, lng: 78.4480 };
  const ngoCoordinates = incomingDonation?.ngoCoords || matchedOrgMeta.coords || { lat: 17.4156, lng: 78.4350 };
  const routeDistance = incomingDonation?.distance || '2.2';
  const routeEta = incomingDonation?.eta || '12 mins';
  const orgRequirements = requirementsMap[currentOrgName] || ['Cooked Meals: 40 portions', 'Rice & Curries: 25 kg', 'Fresh Vegetables: 15 kg'];

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '3rem' }}>
      {/* Welcome Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1E40AF, #2563EB)', padding: '3rem 2rem', color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.2)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.6rem' }}>
              🏢 Registered Hyderabad NGO Organisation
            </div>
            <h1 style={{ margin: 0, fontSize: '2.2rem', fontWeight: '900' }}>
              {currentOrgName}
            </h1>
            <p style={{ opacity: 0.9, marginTop: '0.4rem', fontSize: '1.05rem' }}>
              Viewing donations specifically routed in <strong>{matchedOrgMeta.serviceArea || 'Hyderabad'}</strong>.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.8rem 1.4rem', borderRadius: '12px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <span style={{ fontSize: '0.85rem', opacity: 0.9 }}>Organisation Base & Service Area:</span>
            <div style={{ fontWeight: '800', fontSize: '1.05rem' }}>{matchedOrgMeta.serviceArea || 'Hyderabad'}</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        
        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
          {[
            { label: 'Assigned to Your Org', value: isDonationMatchedToThisNgo ? '1 Active' : '0 Pending', emoji: '📦', color: '#16A34A', bg: '#DCFCE7' },
            { label: 'Claimed in Area', value: '28 Meals', emoji: '✅', color: '#2563EB', bg: '#DBEAFE' },
            { label: 'Scheduled Pickups', value: accepted ? '1 Active' : '0', emoji: '🚗', color: '#D97706', bg: '#FEF3C7' },
            { label: 'People Served', value: '2,450+', emoji: '🏆', color: '#7C3AED', bg: '#EDE9FE' },
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

        {/* ------------------------------------------------------------- */}
        {/* TARGETED INCOMING DONATION WITH DISTINCT LOCATION             */}
        {/* ------------------------------------------------------------- */}
        {isDonationMatchedToThisNgo && incomingDonation ? (
          <div style={{
            background: '#fff', borderRadius: '20px', padding: '2rem', boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
            border: '2.5px solid #2563EB', position: 'relative', overflow: 'hidden', marginBottom: '2rem'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #2563EB, #16A34A, #2563EB)', backgroundSize: '200% 100%', animation: 'shimmer 2s linear infinite' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ background: '#EF4444', color: '#fff', padding: '0.25rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '800', animation: 'pulse 1.5s infinite' }}>
                  🔔 INCOMING DONATION FOR {currentOrgName.toUpperCase()}
                </span>
                <span style={{ color: '#64748B', fontSize: '0.9rem', fontWeight: '600' }}>
                  Matched from {incomingDonation.location?.split(',')[0] || matchedOrgMeta.serviceArea?.split(',')[0]}
                </span>
              </div>
              <span style={{ background: '#DCFCE7', color: '#166534', padding: '0.35rem 0.9rem', borderRadius: '20px', fontWeight: '800', fontSize: '0.88rem' }}>
                🎯 {incomingDonation.matchScore || '96%'} Match Score
              </span>
            </div>

            {/* DONOR INFORMATION CARD */}
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr auto', gap: '1.5rem', alignItems: 'center', background: '#F8FAFC', padding: '1.4rem', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '1.4rem' }}>
              
              {/* Actual Uploaded Food Image */}
              <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1.5px solid #CBD5E1' }}>
                <img src={incomingDonation.image} alt={incomingDonation.food} style={{ width: '140px', height: '115px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(22,101,52,0.85)', color: '#fff', fontSize: '0.68rem', fontWeight: '800', padding: '0.2rem', textAlign: 'center' }}>
                  ✓ AI Verified Food
                </div>
              </div>

              {/* Donor & Food Details */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0F172A' }}>{incomingDonation.food}</span>
                  <span style={{ background: '#DBEAFE', color: '#1E40AF', padding: '0.15rem 0.6rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '800' }}>
                    {incomingDonation.qty}
                  </span>
                </div>
                
                {/* Specific Donor who updated the food */}
                <div style={{ color: '#15803D', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                  👤 Donated by: {incomingDonation.donorName} <span style={{ color: '#64748B', fontWeight: '600', fontSize: '0.85rem' }}>({incomingDonation.donorType || 'Donor Partner'})</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem', fontSize: '0.85rem', color: '#334155' }}>
                  <div>⏰ <strong>Prep Time:</strong> {incomingDonation.prepTime || 'Fresh'}</div>
                  <div>⏳ <strong>Best Before:</strong> {incomingDonation.consumeBy}</div>
                  <div>📍 <strong>Pickup Spot:</strong> {incomingDonation.location}</div>
                  <div>🚗 <strong>Distance:</strong> {routeDistance} km away ({routeEta} ETA)</div>
                </div>
              </div>

              {/* Action Buttons */}
              {accepted === null && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <button onClick={handleAccept} style={{
                    padding: '0.85rem 1.8rem', background: '#16A34A', color: '#fff', border: 'none',
                    borderRadius: '10px', fontWeight: '900', cursor: 'pointer', fontSize: '1rem',
                    boxShadow: '0 4px 15px rgba(22,163,74,0.3)', whiteSpace: 'nowrap'
                  }}>
                    ✓ Accept & Pick Up
                  </button>
                  <button onClick={handleReject} style={{
                    padding: '0.65rem 1.8rem', background: '#fff', border: '1.5px solid #EF4444',
                    color: '#EF4444', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', fontSize: '0.9rem',
                    whiteSpace: 'nowrap'
                  }}>
                    ✕ Decline
                  </button>
                </div>
              )}
            </div>

            {/* ACCEPTED STATE WITH REAL-TIME MAP */}
            {accepted === true && (
              <div style={{ background: '#F0FDF4', borderRadius: '14px', padding: '1.4rem', border: '1.5px solid #86EFAC', animation: 'fadeInUp 0.4s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.2rem', color: '#166534', fontSize: '1.15rem', fontWeight: '900' }}>
                      🎉 Donation Accepted by {currentOrgName}!
                    </h4>
                    <p style={{ margin: 0, color: '#334155', fontSize: '0.88rem' }}>
                      <strong>{incomingDonation.donorName}</strong> at <strong>{incomingDonation.location}</strong> has been notified that your pickup vehicle is on the way.
                    </p>
                  </div>
                  <span style={{ background: '#16A34A', color: '#fff', padding: '0.35rem 0.9rem', borderRadius: '10px', fontWeight: '800', fontSize: '0.85rem' }}>
                    🚗 Live Route Assigned: ~{routeEta}
                  </span>
                </div>

                {/* Real-time Map with Route to Specific Donor Location */}
                <RealTimeMap
                  donorCoords={donorCoordinates}
                  ngoCoords={ngoCoordinates}
                  donorName={`${incomingDonation.donorName} (${incomingDonation.location?.split(',')[0]})`}
                  ngoName={currentOrgName}
                  distanceKm={routeDistance}
                  showRoute={true}
                />
              </div>
            )}

            {accepted === false && (
              <div style={{ background: '#FEF3C7', borderRadius: '12px', padding: '1rem', border: '1px solid #FCD34D', textAlign: 'center', color: '#92400E', fontWeight: '700', fontSize: '0.92rem' }}>
                Donation declined by {currentOrgName}. FoodPulse AI is automatically re-routing to another nearby Hyderabad shelter.
              </div>
            )}

          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: '20px', padding: '2.5rem 2rem', border: '1.5px solid #E2E8F0', textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏢</div>
            <h3 style={{ color: '#0F172A', fontSize: '1.3rem', fontWeight: '800', margin: '0 0 0.4rem' }}>
              No Active Pickups for {currentOrgName}
            </h3>
            <p style={{ color: '#64748B', maxWidth: '520px', margin: '0 auto', fontSize: '0.95rem' }}>
              When food donors in {matchedOrgMeta.serviceArea || 'your area'} share food, pickup notifications will appear here.
            </p>
          </div>
        )}

        {/* Requirements & Past Pickups Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          
          {/* Organization Requirements */}
          <div style={{ background: '#fff', borderRadius: '18px', padding: '1.8rem', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <h3 style={{ margin: 0, color: '#0F172A', fontSize: '1.15rem', fontWeight: '800' }}>📋 {currentOrgName}'s Requirements</h3>
              <button style={{ background: '#F1F5F9', border: '1px solid #CBD5E1', color: '#1E40AF', padding: '0.35rem 0.85rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '800' }}>
                ✏️ Update
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1rem' }}>
              {orgRequirements.map((req, i) => (
                <span key={i} style={{ background: '#EFF6FF', color: '#1E40AF', padding: '0.45rem 1rem', borderRadius: '20px', fontSize: '0.88rem', fontWeight: '700', border: '1px solid #BFDBFE' }}>
                  {req}
                </span>
              ))}
            </div>
            <p style={{ color: '#64748B', fontSize: '0.85rem', margin: 0 }}>These preferences train the AI to route food from {matchedOrgMeta.serviceArea?.split(',')[0] || 'local'} donors directly to {currentOrgName}.</p>
          </div>

          {/* Past Pickups Log */}
          <div style={{ background: '#fff', borderRadius: '18px', padding: '1.8rem', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', border: '1px solid #E2E8F0' }}>
            <h3 style={{ margin: '0 0 1.2rem', color: '#0F172A', fontSize: '1.15rem', fontWeight: '800' }}>🚗 {currentOrgName}'s Recent Pickups</h3>
            {[
              { food: 'Fresh Meals & Rice', qty: '40 meals', donor: `Banquets (${matchedOrgMeta.serviceArea?.split(',')[0] || 'Hyderabad'})`, time: 'Yesterday 2:30 PM', status: 'Delivered' },
              { food: 'Produce Crates', qty: '20 kg', donor: `Vegetable Mart (${matchedOrgMeta.serviceArea?.split(',')[0] || 'Hyderabad'})`, time: 'Aug 19, 4:00 PM', status: 'Delivered' },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.9rem', background: '#F8FAFC', borderRadius: '12px', marginBottom: '0.7rem', border: '1px solid #E2E8F0' }}>
                <div>
                  <div style={{ fontWeight: '800', color: '#0F172A', fontSize: '0.92rem' }}>{p.food} <span style={{ color: '#64748B', fontWeight: '600', fontSize: '0.82rem' }}>({p.qty})</span></div>
                  <div style={{ color: '#16A34A', fontSize: '0.82rem', fontWeight: '700', marginTop: '0.15rem' }}>From: {p.donor}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#64748B', fontSize: '0.78rem' }}>{p.time}</div>
                  <span style={{ background: '#DCFCE7', color: '#166534', padding: '0.15rem 0.55rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800' }}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
