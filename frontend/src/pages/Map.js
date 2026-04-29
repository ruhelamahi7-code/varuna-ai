import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const vessels = [
  { id: 'VS-2041', lat: 8.5, lng: 77.5, status: 'flagged', type: 'Zone Intrusion', speed: 12 },
  { id: 'VS-1823', lat: 10.5, lng: 72.5, status: 'flagged', type: 'Transponder Dark', speed: 0 },
  { id: 'VS-3012', lat: 15.0, lng: 73.5, status: 'suspicious', type: 'Abnormal Speed', speed: 28 },
  { id: 'VS-4521', lat: 12.0, lng: 74.5, status: 'safe', type: 'Normal', speed: 8 },
  { id: 'VS-5231', lat: 9.0,  lng: 76.0, status: 'safe', type: 'Normal', speed: 6 },
  { id: 'VS-6102', lat: 20.0, lng: 71.0, status: 'safe', type: 'Normal', speed: 9 },
  { id: 'VS-7845', lat: 18.0, lng: 72.8, status: 'suspicious', type: 'Night Movement', speed: 15 },
];

const zones = [
  { lat: 8.5, lng: 77.5, radius: 50000, name: 'Gulf of Mannar Reserve' },
  { lat: 10.5, lng: 72.5, radius: 40000, name: 'Lakshadweep Marine Zone' },
  { lat: 20.5, lng: 69.5, radius: 45000, name: 'Marine National Park' },
];

const getColor = (status) => {
  if (status === 'flagged') return '#ef4444';
  if (status === 'suspicious') return '#EF9F27';
  return '#1D9E75';
};

function Map() {
  const [filter, setFilter] = useState('all');

  const filtered = vessels.filter(v => filter === 'all' || v.status === filter);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Live Vessel Map</h2>
        <div style={styles.filters}>
          {['all', 'flagged', 'suspicious', 'safe'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterBtn,
                backgroundColor: filter === f ? '#1e3a5f' : 'transparent',
                color: filter === f ? '#378ADD' : '#9ca3af',
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.legend}>
        <span style={styles.legendItem}><span style={{...styles.dot, background:'#ef4444'}}></span>Flagged</span>
        <span style={styles.legendItem}><span style={{...styles.dot, background:'#EF9F27'}}></span>Suspicious</span>
        <span style={styles.legendItem}><span style={{...styles.dot, background:'#1D9E75'}}></span>Safe</span>
        <span style={styles.legendItem}><span style={{...styles.dot, background:'#378ADD', opacity:0.4}}></span>Protected Zone</span>
      </div>

      <MapContainer
        center={[12.0, 74.0]}
        zoom={5}
        style={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {zones.map((zone, i) => (
          <Circle
            key={i}
            center={[zone.lat, zone.lng]}
            radius={zone.radius}
            pathOptions={{ color: '#378ADD', fillColor: '#378ADD', fillOpacity: 0.1 }}
          />
        ))}

        {filtered.map((vessel) => (
          <Marker key={vessel.id} position={[vessel.lat, vessel.lng]}>
            <Popup>
              <div style={{fontFamily:'sans-serif', minWidth:'160px'}}>
                <p style={{fontWeight:'bold', marginBottom:'4px'}}>{vessel.id}</p>
                <p style={{color: getColor(vessel.status), marginBottom:'4px'}}>● {vessel.status.toUpperCase()}</p>
                <p style={{fontSize:'12px', marginBottom:'2px'}}>Type: {vessel.type}</p>
                <p style={{fontSize:'12px'}}>Speed: {vessel.speed} knots</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1000px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  title: { fontSize: '22px', fontWeight: '500', color: '#ffffff' },
  filters: { display: 'flex', gap: '8px' },
  filterBtn: { padding: '6px 14px', border: '1px solid #1e3a5f', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' },
  legend: { display: 'flex', gap: '16px', marginBottom: '12px' },
  legendItem: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#9ca3af' },
  dot: { width: '10px', height: '10px', borderRadius: '50%', display: 'inline-block' },
  map: { height: '520px', borderRadius: '12px', border: '1px solid #1e3a5f' },
};

export default Map;