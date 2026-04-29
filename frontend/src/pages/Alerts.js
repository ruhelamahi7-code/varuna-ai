import React, { useState } from 'react';

const allAlerts = [
  { id: 'VS-2041', type: 'Zone Intrusion', location: 'Gulf of Mannar', time: '09:42 AM', level: 'HIGH', status: 'Active', lat: '8.5°N', lng: '77.5°E', speed: 12 },
  { id: 'VS-1823', type: 'Transponder Dark', location: 'Lakshadweep Sea', time: '09:26 AM', level: 'HIGH', status: 'Active', lat: '10.5°N', lng: '72.5°E', speed: 0 },
  { id: 'VS-3012', type: 'Abnormal Speed', location: 'Arabian Sea', time: '08:59 AM', level: 'MEDIUM', status: 'Investigating', lat: '15.0°N', lng: '73.5°E', speed: 28 },
  { id: 'VS-7845', type: 'Night Movement', location: 'Mumbai Coast', time: '02:14 AM', level: 'MEDIUM', status: 'Resolved', lat: '18.0°N', lng: '72.8°E', speed: 15 },
  { id: 'VS-5531', type: 'Zone Intrusion', location: 'Andaman Sea', time: '01:30 AM', level: 'HIGH', status: 'Resolved', lat: '11.0°N', lng: '92.5°E', speed: 10 },
  { id: 'VS-4421', type: 'Abnormal Speed', location: 'Bay of Bengal', time: 'Yesterday', level: 'LOW', status: 'Resolved', lat: '14.0°N', lng: '80.5°E', speed: 22 },
];

function Alerts() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const filters = ['All', 'HIGH', 'MEDIUM', 'LOW'];

  const filtered = allAlerts.filter(a =>
    filter === 'All' ? true : a.level === filter
  );

  const getLevelStyle = (level) => {
    if (level === 'HIGH') return { bg: '#7f1d1d', color: '#fca5a5' };
    if (level === 'MEDIUM') return { bg: '#78350f', color: '#fcd34d' };
    return { bg: '#14532d', color: '#86efac' };
  };

  const getStatusStyle = (status) => {
    if (status === 'Active') return '#ef4444';
    if (status === 'Investigating') return '#EF9F27';
    return '#1D9E75';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Alerts Panel</h2>
        <div style={styles.filters}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterBtn,
                backgroundColor: filter === f ? '#1e3a5f' : 'transparent',
                color: filter === f ? '#378ADD' : '#9ca3af',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.layout}>
        <div style={styles.alertList}>
          {filtered.map((alert) => {
            const lvl = getLevelStyle(alert.level);
            return (
              <div
                key={alert.id}
                onClick={() => setSelected(alert)}
                style={{
                  ...styles.alertCard,
                  border: selected?.id === alert.id
                    ? '1px solid #378ADD'
                    : '1px solid #1e3a5f',
                }}
              >
                <div style={styles.cardTop}>
                  <span style={{ ...styles.badge, backgroundColor: lvl.bg, color: lvl.color }}>
                    {alert.level}
                  </span>
                  <span style={{ ...styles.statusDot, color: getStatusStyle(alert.status) }}>
                    ● {alert.status}
                  </span>
                </div>
                <p style={styles.alertType}>{alert.type}</p>
                <p style={styles.alertLocation}>{alert.location}</p>
                <div style={styles.cardBottom}>
                  <span style={styles.alertId}>{alert.id}</span>
                  <span style={styles.alertTime}>{alert.time}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={styles.detail}>
          {selected ? (
            <>
              <p style={styles.detailTitle}>Alert Detail</p>
              <div style={styles.detailCard}>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Vessel ID</span>
                  <span style={styles.detailValue}>{selected.id}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Threat Type</span>
                  <span style={styles.detailValue}>{selected.type}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Location</span>
                  <span style={styles.detailValue}>{selected.location}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Coordinates</span>
                  <span style={styles.detailValue}>{selected.lat}, {selected.lng}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Speed</span>
                  <span style={styles.detailValue}>{selected.speed} knots</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Time</span>
                  <span style={styles.detailValue}>{selected.time}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Status</span>
                  <span style={{ ...styles.detailValue, color: getStatusStyle(selected.status) }}>
                    {selected.status}
                  </span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Threat Level</span>
                  <span style={{ ...styles.detailValue, color: getLevelStyle(selected.level).color }}>
                    {selected.level}
                  </span>
                </div>
              </div>
              <button
                style={styles.resolveBtn}
                onClick={() => setSelected(null)}
              >
                Mark as Resolved
              </button>
            </>
          ) : (
            <div style={styles.noSelect}>
              <p style={styles.noSelectText}>Click an alert to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1000px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  title: { fontSize: '22px', fontWeight: '500', color: '#ffffff' },
  filters: { display: 'flex', gap: '8px' },
  filterBtn: { padding: '6px 14px', border: '1px solid #1e3a5f', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 340px', gap: '16px' },
  alertList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  alertCard: { backgroundColor: '#111827', borderRadius: '12px', padding: '16px', cursor: 'pointer' },
  cardTop: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' },
  badge: { fontSize: '10px', fontWeight: '500', padding: '3px 8px', borderRadius: '20px' },
  statusDot: { fontSize: '12px' },
  alertType: { fontSize: '14px', fontWeight: '500', color: '#ffffff', marginBottom: '4px' },
  alertLocation: { fontSize: '12px', color: '#9ca3af', marginBottom: '10px' },
  cardBottom: { display: 'flex', justifyContent: 'space-between' },
  alertId: { fontSize: '12px', color: '#378ADD' },
  alertTime: { fontSize: '11px', color: '#4b5563' },
  detail: { backgroundColor: '#111827', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '20px' },
  detailTitle: { fontSize: '15px', fontWeight: '500', color: '#ffffff', marginBottom: '16px' },
  detailCard: { display: 'flex', flexDirection: 'column', gap: '12px' },
  detailRow: { display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e3a5f', paddingBottom: '10px' },
  detailLabel: { fontSize: '12px', color: '#9ca3af' },
  detailValue: { fontSize: '13px', color: '#ffffff', fontWeight: '500' },
  resolveBtn: { marginTop: '20px', width: '100%', padding: '10px', backgroundColor: '#1D9E75', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' },
  noSelect: { height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  noSelectText: { color: '#4b5563', fontSize: '13px' },
};

export default Alerts;