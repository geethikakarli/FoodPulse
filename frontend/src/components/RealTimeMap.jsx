import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix standard Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function RealTimeMap({
  donorCoords,
  ngoCoords,
  donorName = 'Your Exact Pickup Spot',
  ngoName = 'Hyderabad Community Food Centre',
  distanceKm = 2.4,
  showRoute = true,
  onLocationChange
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const donorMarkerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const donorLat = donorCoords?.lat || 17.3850;
    const donorLng = donorCoords?.lng || 78.4867;

    const ngoLat = ngoCoords?.lat || (donorLat + 0.016);
    const ngoLng = ngoCoords?.lng || (donorLng + 0.014);

    // Initialize Map
    const map = L.map(mapContainerRef.current, {
      center: [donorLat, donorLng],
      zoom: 14,
      zoomControl: true
    });
    mapInstanceRef.current = map;

    // OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    // GPS Accuracy Circle around Donor
    const accuracyCircle = L.circle([donorLat, donorLng], {
      radius: 200,
      color: '#16A34A',
      fillColor: '#86EFAC',
      fillOpacity: 0.2,
      weight: 1.5
    }).addTo(map);

    // Custom Draggable Donor Marker (Green)
    const donorIcon = L.divIcon({
      className: 'custom-donor-pin',
      html: `<div style="background:#16A34A; color:#fff; width:38px; height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; box-shadow:0 4px 12px rgba(22,163,74,0.45); border:3px solid #fff; cursor:grab;">📍</div>`,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38]
    });

    const donorMarker = L.marker([donorLat, donorLng], {
      icon: donorIcon,
      draggable: !!onLocationChange
    }).addTo(map);
    donorMarkerRef.current = donorMarker;

    donorMarker.bindPopup(`<b>${donorName}</b><br/>Lat: ${donorLat.toFixed(4)}, Lng: ${donorLng.toFixed(4)}<br/><small style="color:#16A34A; font-weight:700;">Drag pin to adjust exact spot</small>`).openPopup();

    if (onLocationChange) {
      donorMarker.on('dragend', (e) => {
        const newPos = e.target.getLatLng();
        onLocationChange({ lat: newPos.lat, lng: newPos.lng });
      });

      map.on('click', (e) => {
        donorMarker.setLatLng(e.latlng);
        onLocationChange({ lat: e.latlng.lat, lng: e.latlng.lng });
      });
    }

    // Custom NGO Marker (Blue)
    const ngoIcon = L.divIcon({
      className: 'custom-ngo-pin',
      html: `<div style="background:#2563EB; color:#fff; width:38px; height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; box-shadow:0 4px 12px rgba(37,99,235,0.45); border:3px solid #fff;">🏢</div>`,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38]
    });

    const ngoMarker = L.marker([ngoLat, ngoLng], { icon: ngoIcon }).addTo(map);
    ngoMarker.bindPopup(`<b>${ngoName}</b><br/>AI-Recommended Organization (${distanceKm} km away)`);

    // Route Line (Dashed Green Path)
    if (showRoute) {
      const midLat = (donorLat + ngoLat) / 2 + 0.002;
      const midLng = (donorLng + ngoLng) / 2 - 0.002;

      const routePoints = [
        [donorLat, donorLng],
        [midLat, midLng],
        [ngoLat, ngoLng]
      ];

      L.polyline(routePoints, {
        color: '#16A34A',
        weight: 4,
        dashArray: '8, 8',
        opacity: 0.9
      }).addTo(map);

      // Fit bounds to show both pins comfortably
      const bounds = L.latLngBounds([ [donorLat, donorLng], [ngoLat, ngoLng] ]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [donorCoords?.lat, donorCoords?.lng, ngoCoords?.lat, ngoCoords?.lng, donorName, ngoName, distanceKm, showRoute]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '300px', borderRadius: '18px', overflow: 'hidden', border: '2px solid #BBF7D0', boxShadow: '0 4px 18px rgba(0,0,0,0.06)' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
      <div style={{
        position: 'absolute', bottom: '10px', left: '10px', zIndex: 500,
        background: 'rgba(255, 255, 255, 0.96)', backdropFilter: 'blur(10px)',
        padding: '0.45rem 0.9rem', borderRadius: '10px', fontSize: '0.78rem',
        fontWeight: '800', color: '#166534', border: '1px solid #86EFAC',
        display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16A34A', display: 'inline-block' }} />
        Live GPS Map Active (Click or Drag Pin to adjust)
      </div>
    </div>
  );
}
