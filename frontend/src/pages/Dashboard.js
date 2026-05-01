import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';

function Dashboard() {
  const [stats, setStats] = useState({
    vesselsTracked: 47,
    alertsToday: 3,
    zonesMonitored: 5,
    accuracy: 94,
  });

  const [recentAlerts, setRecentAlerts] = useState([
    { id: 'VS-2041', type: 'Zone Intrusion', location: 'Gulf of Mannar', time: '2 mins ago', level: 'HIGH' },
    { id: 'VS-1823', type: 'Transponder Dark', location: 'Lakshadweep Sea', time: '18 mins ago', level: 'HIGH' },
    { id: 'VS-3012', type: 'Abnormal Speed', location: 'Arabian Sea', time: '45 mins ago', level: 'MEDIUM' },
  ]);

  useEffect(() => {
    const alertsRef = ref(database, 'alerts');
    onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const alertList = Object.values(data).slice(-3).reverse();
        setRecentAlerts(alertList);
        setStats(prev => ({
          ...prev,
          alertsToday: Object.values(data).length,
        }));
      }
    });

    const vesselsRef = ref(database, 'vessels');
    onValue(vesselsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setStats(prev => ({
          ...prev,
          vesselsTracked: Object.values(data).length,
        }));
      }
    });
  }, []);

  const cards = [
    { label: 'Vessels Tracked', value: stats.vesselsTracked, unit: 'today', color: '#378ADD' },
    { label: 'Alerts Fired', value: stats.alertsToday, unit: 'today', color: '#ef4444' },
    { label: 'Zones Monitored', value: stats.zonesMonitored, unit: 'active', color: '#1D9E75' },
    { label: 'Model Accuracy', value: stats.accuracy, unit: '%', color: '#EF9F27' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Mission Control</h2>
        <p style={styles.subtitle}>India Coastal Surveillance — Live Overview</p>
      </div>

      <div style={styles.cardGrid}>
        {cards.map((card) => (
          <div key={card.label} style={styles.card}>
            <p style={styles.cardLabel}>{card.label}</p>
            <p style={{ ...styles.cardValue, color: card.color }}>{card.value}</p>
            <p style={styles.cardUnit}>{card.unit}</p>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Recent Alerts</h3>
        <div style={styles.alertList}>
          {recentAlerts.map((alert, index) => (
            <div key={index} style={styles.alertRow}>
              <div style={styles.alertLeft}>
                <span style={{
                  ...styles.levelBadge,
                  backgroundColor: alert.level === 'HIGH' ? '#7f1d1d' : '#78350f',
                  color: alert.level === 'HIGH' ? '#fca5a5' : '#fcd34d',
                }}>
                  {alert.level}
                </span>
                <div>
                  <p style={styles.alertType}>{alert.type}</p>
                  <p style={styles.alertLocation}>{alert.location}</p>
                </div>
              </div>
              <div style={styles.alertRight}>
                <p style={styles.alertId}>{alert.id}</p>
                <p style={styles.alertTime}>{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1000px', margin: '0 auto' },
  header: { marginBottom: '24px' },
  title: { fontSize: '22px', fontWeight: '500', color: '#ffffff', marginBottom: '4px' },
  subtitle: { fontSize: '13px', color: '#9ca3af' },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' },
  card: { backgroundColor: '#111827', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '20px' },
  cardLabel: { fontSize: '12px', color: '#9ca3af', marginBottom: '8px' },
  cardValue: { fontSize: '32px', fontWeight: '500', marginBottom: '4px' },
  cardUnit: { fontSize: '11px', color: '#4b5563' },
  section: { backgroundColor: '#111827', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '20px' },
  sectionTitle: { fontSize: '15px', fontWeight: '500', color: '#ffffff', marginBottom: '16px' },
  alertList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  alertRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#0a0e1a', borderRadius: '8px' },
  alertLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
  levelBadge: { fontSize: '10px', fontWeight: '500', padding: '3px 8px', borderRadius: '20px' },
  alertType: { fontSize: '13px', fontWeight: '500', color: '#ffffff', marginBottom: '2px' },
  alertLocation: { fontSize: '12px', color: '#9ca3af' },
  alertRight: { textAlign: 'right' },
  alertId: { fontSize: '12px', color: '#378ADD', marginBottom: '2px' },
  alertTime: { fontSize: '11px', color: '#4b5563' },
};

export default Dashboard;