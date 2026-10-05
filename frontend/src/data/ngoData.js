// Persistent NGO Organization Registry & Storage - Multi-City (Hyderabad, Bengaluru, Mumbai, Chennai, Visakhapatnam)

export const CONNECTED_CITIES = [
  { id: 'Hyderabad', name: 'Hyderabad', state: 'Telangana', coords: { lat: 17.3850, lng: 78.4867 }, defaultArea: 'Banjara Hills, Hyderabad' },
  { id: 'Bengaluru', name: 'Bengaluru', state: 'Karnataka', coords: { lat: 12.9716, lng: 77.5946 }, defaultArea: 'Indiranagar, Bengaluru' },
  { id: 'Mumbai', name: 'Mumbai', state: 'Maharashtra', coords: { lat: 19.0760, lng: 72.8777 }, defaultArea: 'Bandra West, Mumbai' },
  { id: 'Chennai', name: 'Chennai', state: 'Tamil Nadu', coords: { lat: 13.0827, lng: 80.2707 }, defaultArea: 'T. Nagar, Chennai' },
  { id: 'Visakhapatnam', name: 'Visakhapatnam', state: 'Andhra Pradesh', coords: { lat: 17.6868, lng: 83.2185 }, defaultArea: 'RK Beach Road, Visakhapatnam' }
];

export const DEFAULT_NGOS = [
  // --- HYDERABAD NGOS ---
  {
    orgName: 'Hyd Food Centre',
    city: 'Hyderabad',
    email: 'contact@hydfoodcentre.org',
    password: 'password123',
    serviceArea: 'Banjara Hills, Hyderabad',
    requirements: 'Cooked Meals, Rice, Dal, Vegetables',
    phone: '+91 98480 12345',
    registeredDate: 'Verified Partner',
    coords: { lat: 17.4156, lng: 78.4350 }
  },
  {
    orgName: 'Cyberabad Rescue',
    city: 'Hyderabad',
    email: 'help@cyberabadrescue.org',
    password: 'password123',
    serviceArea: 'Hitec City & Gachibowli, Hyderabad',
    requirements: 'Buffet Surplus, Cooked Meals, Packed Food',
    phone: '+91 98490 23456',
    registeredDate: 'Verified Partner',
    coords: { lat: 17.4401, lng: 78.3489 }
  },
  {
    orgName: 'Secunderabad Shelter',
    city: 'Hyderabad',
    email: 'info@secunderabadshelter.org',
    password: 'password123',
    serviceArea: 'Begumpet & Secunderabad, Hyderabad',
    requirements: 'Nutritious Meals, Milk, Fruits, Bakery',
    phone: '+91 98660 34567',
    registeredDate: 'Verified Partner',
    coords: { lat: 17.4399, lng: 78.4983 }
  },
  {
    orgName: 'Charminar Seva',
    city: 'Hyderabad',
    email: 'care@charminarseva.org',
    password: 'password123',
    serviceArea: 'Old City & Charminar, Hyderabad',
    requirements: 'Hot Meals, Biryani, Fruits, Groceries',
    phone: '+91 98850 45678',
    registeredDate: 'Verified Partner',
    coords: { lat: 17.3616, lng: 78.4747 }
  },
  {
    orgName: 'Kukatpally Relief',
    city: 'Hyderabad',
    email: 'support@kukatpallyrelief.org',
    password: 'password123',
    serviceArea: 'KPHB & Kukatpally, Hyderabad',
    requirements: 'Vegetarian Meals, Rice, Vegetables',
    phone: '+91 99080 56789',
    registeredDate: 'Verified Partner',
    coords: { lat: 17.4938, lng: 78.3995 }
  },
  {
    orgName: 'LB Nagar Trust',
    city: 'Hyderabad',
    email: 'contact@lbnagartrust.org',
    password: 'password123',
    serviceArea: 'Dilsukhnagar & LB Nagar, Hyderabad',
    requirements: 'Cooked Food, Groceries, Bakery Goods',
    phone: '+91 99490 67890',
    registeredDate: 'Verified Partner',
    coords: { lat: 17.3457, lng: 78.5522 }
  },

  // --- BENGALURU NGOS ---
  {
    orgName: 'Bangalore Food Bank',
    city: 'Bengaluru',
    email: 'contact@bangalorefoodbank.org',
    password: 'password123',
    serviceArea: 'Indiranagar & Domlur, Bengaluru',
    requirements: 'Cooked Surplus, Packaged Meals, Fruits',
    phone: '+91 98801 11223',
    registeredDate: 'Verified Partner',
    coords: { lat: 12.9784, lng: 77.6408 }
  },
  {
    orgName: 'Koramangala Relief',
    city: 'Bengaluru',
    email: 'help@koramangalarelief.org',
    password: 'password123',
    serviceArea: 'Koramangala & HSR Layout, Bengaluru',
    requirements: 'Restaurant Surplus, South Indian Meals',
    phone: '+91 98802 22334',
    registeredDate: 'Verified Partner',
    coords: { lat: 12.9352, lng: 77.6245 }
  },
  {
    orgName: 'Whitefield Care Trust',
    city: 'Bengaluru',
    email: 'support@whitefieldcare.org',
    password: 'password123',
    serviceArea: 'Whitefield & ITPL, Bengaluru',
    requirements: 'Corporate Catering Surplus, Bakery',
    phone: '+91 98803 33445',
    registeredDate: 'Verified Partner',
    coords: { lat: 12.9698, lng: 77.7499 }
  },
  {
    orgName: 'Jayanagar Seva',
    city: 'Bengaluru',
    email: 'info@jayanagarseva.org',
    password: 'password123',
    serviceArea: 'Jayanagar & JP Nagar, Bengaluru',
    requirements: 'Pure Veg Meals, Milk, Vegetables',
    phone: '+91 98804 44556',
    registeredDate: 'Verified Partner',
    coords: { lat: 12.9250, lng: 77.5938 }
  },

  // --- MUMBAI NGOS ---
  {
    orgName: 'Roti Bank Mumbai',
    city: 'Mumbai',
    email: 'help@rotibankmumbai.org',
    password: 'password123',
    serviceArea: 'Bandra & Dadar, Mumbai',
    requirements: 'Roti, Subzi, Rice, Wedding Catering',
    phone: '+91 98200 11223',
    registeredDate: 'Verified Partner',
    coords: { lat: 19.0596, lng: 72.8295 }
  },
  {
    orgName: 'Dharavi Relief Trust',
    city: 'Mumbai',
    email: 'care@dharavirelief.org',
    password: 'password123',
    serviceArea: 'Dharavi & Sion, Mumbai',
    requirements: 'Nutritious Meals, Ration Kits, Fruits',
    phone: '+91 98201 22334',
    registeredDate: 'Verified Partner',
    coords: { lat: 19.0402, lng: 72.8509 }
  },
  {
    orgName: 'Andheri Seva Foundation',
    city: 'Mumbai',
    email: 'info@andheriseva.org',
    password: 'password123',
    serviceArea: 'Andheri West & Juhu, Mumbai',
    requirements: 'Hotel Buffet Surplus, Cooked Meals',
    phone: '+91 98202 33445',
    registeredDate: 'Verified Partner',
    coords: { lat: 19.1197, lng: 72.8464 }
  },
  {
    orgName: 'Colaba Annakshetra',
    city: 'Mumbai',
    email: 'contact@colabaanna.org',
    password: 'password123',
    serviceArea: 'Colaba & Fort, South Mumbai',
    requirements: 'Prepared Meals, Packaged Foods',
    phone: '+91 98203 44556',
    registeredDate: 'Verified Partner',
    coords: { lat: 18.9067, lng: 72.8147 }
  },

  // --- CHENNAI NGOS ---
  {
    orgName: 'No Food Waste Chennai',
    city: 'Chennai',
    email: 'tnagar@nofoodwaste.org',
    password: 'password123',
    serviceArea: 'T. Nagar & Nungambakkam, Chennai',
    requirements: 'Sambar Rice, Poriyal, Marriage Surplus',
    phone: '+91 98400 11223',
    registeredDate: 'Verified Partner',
    coords: { lat: 13.0418, lng: 80.2341 }
  },
  {
    orgName: 'Adyar Annadhanam Trust',
    city: 'Chennai',
    email: 'help@adyarannadhanam.org',
    password: 'password123',
    serviceArea: 'Adyar & Besant Nagar, Chennai',
    requirements: 'Healthy Veg Meals, Fruits, Milk',
    phone: '+91 98401 22334',
    registeredDate: 'Verified Partner',
    coords: { lat: 13.0012, lng: 80.2565 }
  },
  {
    orgName: 'Anna Nagar Seva',
    city: 'Chennai',
    email: 'info@annanagarseva.org',
    password: 'password123',
    serviceArea: 'Anna Nagar & Koyambedu, Chennai',
    requirements: 'Vegetable Surplus, Fresh Meals',
    phone: '+91 98402 33445',
    registeredDate: 'Verified Partner',
    coords: { lat: 13.0850, lng: 80.2101 }
  },
  {
    orgName: 'Marina Relief Centre',
    city: 'Chennai',
    email: 'contact@marinarelief.org',
    password: 'password123',
    serviceArea: 'Triplicane & Marina, Chennai',
    requirements: 'Hot Meals, Rice, Tiffin Items',
    phone: '+91 98403 44556',
    registeredDate: 'Verified Partner',
    coords: { lat: 13.0583, lng: 80.2757 }
  },

  // --- VISAKHAPATNAM NGOS ---
  {
    orgName: 'Vizag Hunger Free',
    city: 'Visakhapatnam',
    email: 'contact@vizaghungerfree.org',
    password: 'password123',
    serviceArea: 'RK Beach Road & Siripuram, Visakhapatnam',
    requirements: 'Andhra Meals, Rice, Sambar, Bananas',
    phone: '+91 98481 11223',
    registeredDate: 'Verified Partner',
    coords: { lat: 17.7101, lng: 83.3163 }
  },
  {
    orgName: 'Gajuwaka Seva Society',
    city: 'Visakhapatnam',
    email: 'help@gajuwakaseva.org',
    password: 'password123',
    serviceArea: 'Gajuwaka & Steel Plant Area, Visakhapatnam',
    requirements: 'Industrial Canteen Surplus, Cooked Rice',
    phone: '+91 98482 22334',
    registeredDate: 'Verified Partner',
    coords: { lat: 17.6904, lng: 83.2185 }
  },
  {
    orgName: 'MVP Colony Relief',
    city: 'Visakhapatnam',
    email: 'support@mvprelief.org',
    password: 'password123',
    serviceArea: 'MVP Colony & Venojipalem, Visakhapatnam',
    requirements: 'Hotel Surplus, Bakery Snacks, Fruits',
    phone: '+91 98483 33445',
    registeredDate: 'Verified Partner',
    coords: { lat: 17.7412, lng: 83.3325 }
  },
  {
    orgName: 'Simhachalam Trust',
    city: 'Visakhapatnam',
    email: 'info@simhachalamtrust.org',
    password: 'password123',
    serviceArea: 'Simhachalam & Gopalapatnam, Visakhapatnam',
    requirements: 'Annadhanam Meals, Curries, Milk',
    phone: '+91 98484 44556',
    registeredDate: 'Verified Partner',
    coords: { lat: 17.7664, lng: 83.2506 }
  }
];

// Initialize and get all persistent registered NGOs across all cities
export function getRegisteredNgos() {
  const saved = localStorage.getItem('foodpulse_registered_ngos_v2');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const combined = [...parsed];
        DEFAULT_NGOS.forEach(def => {
          if (!combined.some(c => c.orgName.toLowerCase().trim() === def.orgName.toLowerCase().trim())) {
            combined.push(def);
          }
        });
        return combined;
      }
    } catch (e) {
      console.error('Error parsing stored NGOs:', e);
    }
  }

  // Persist multi-city defaults
  localStorage.setItem('foodpulse_registered_ngos_v2', JSON.stringify(DEFAULT_NGOS));
  localStorage.setItem('foodpulse_registered_ngos_short_hyd', JSON.stringify(DEFAULT_NGOS));
  return DEFAULT_NGOS;
}

// Permanently register and save a new NGO organisation
export function registerNgoOrg(newNgo) {
  const currentList = getRegisteredNgos();
  const city = newNgo.city || 'Hyderabad';
  const formattedNgo = {
    ...newNgo,
    city: city,
    serviceArea: newNgo.serviceArea.includes(city) ? newNgo.serviceArea : `${newNgo.serviceArea}, ${city}`,
    registeredDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    coords: newNgo.coords || CONNECTED_CITIES.find(c => c.name === city)?.coords || { lat: 17.3850, lng: 78.4867 }
  };

  const updatedList = [
    formattedNgo,
    ...currentList.filter(n => n.orgName.toLowerCase().trim() !== newNgo.orgName.toLowerCase().trim())
  ];

  localStorage.setItem('foodpulse_registered_ngos_v2', JSON.stringify(updatedList));
  localStorage.setItem('foodpulse_registered_ngos_short_hyd', JSON.stringify(updatedList));
  localStorage.setItem('foodpulse_last_used_ngo', formattedNgo.orgName);
  return updatedList;
}

// Get the last used/selected NGO organisation name
export function getLastUsedNgo() {
  const last = localStorage.getItem('foodpulse_last_used_ngo');
  const list = getRegisteredNgos();
  if (last && list.some(n => n.orgName === last)) {
    return last;
  }
  return list.length > 0 ? list[0].orgName : 'Hyd Food Centre';
}

// Save the last used/selected NGO organisation name
export function setLastUsedNgo(orgName) {
  if (orgName) {
    localStorage.setItem('foodpulse_last_used_ngo', orgName);
  }
}
