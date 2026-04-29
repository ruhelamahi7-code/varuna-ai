import React, { useState } from 'react';

const incidents = [
  { id: 'VS-2041', type: 'Zone Intrusion', location: 'Gulf of Mannar', date: '29 Apr 2026', time: '09:42 AM', level: 'HIGH', status: 'Active' },
  { id: 'VS-1823', type: 'Transponder Dark', location: 'Lakshadweep Sea', date: '29 Apr 2026', time: '09:26 AM', level: 'HIGH', status: 'Active' },
  { id: 'VS-3012', type: 'Abnormal Speed', location: 'Arabian Sea', date: '29 Apr 2026', time: '08:59 AM', level: 'MEDIUM', status: 'Investigating' },
  { id: 'VS-7845', type: 'Night Movement', location: 'Mumbai Coast', date: '29 Apr 2026', time: '02:14 AM', level: 'MEDIUM', status: 'Resolved' },
  { id: 'VS-5531', type: 'Zone Intrusion', location: 'Andaman Sea', date: '28 Apr 2026', time: '11:30 PM', level: 'HIGH', status: 'Resolved' },
  { id: 'VS-4421', type: 'Abnormal Speed', location: 'Bay of Bengal', date: '28 Apr 2026', time: '06:15 PM', level: 'LOW', status: 'Resolved' },
  { id: 'VS-3301', type: 'Zone Intrusion', location: 'Palk Strait', date: '28 Apr 2026', time: '03:45 PM', level: 'HIGH', status: 'Resolved' },
  { id: 'VS-2910', type: 'Transponder Dark', location: 'Arabian Sea', date: '27 Apr 2026', time: '08:22 AM', level: 'MEDIUM', status: 'Resolved' },
];

function History() {
  const [search, setSearch] = useState('');

  const filtered = incidents.filter(i =>
    i.id.toLowerCase().includes(search.toLowerCase()) ||
    i.type.toLowerCase().includes(search.toLowerCase()) ||
    i.location.toLowerCase().includes(search.toLowerCase())
  );

  const getLevelColor = (level) => {
    if (level === 'HIGH') return '#fca5a5';
    if (level === 'MEDIUM') return '#fcd34d';
    return '#86efac';
  };

  const getStatusColor = (status) => {
    if (status === 'Active') return '#ef4444';
    if (status === 'Investigating') return '#EF9F27';
    return '#1D9E75';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Incident History</h2>
        <input
          style={styles.search}
          placeholder="Search by ID, type or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>Vessel ID</th>
              <th style={styles.th}>Threat Type</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Level</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((incident, index) => (
              <tr
                key={incident.id}
                style={{
                  ...styles.tr,
                  backgroundColor: index % 2 === 0 ? '#111827' : '#0a0e1a',
                }}
              >
                <td style={{ ...styles.td, color: '#378ADD' }}>{incident.id}</td>
                <td style={styles.td}>{incident.type}</td>
                <td style={{ ...styles.td, color: '#9ca3af' }}>{incident.location}</td>
                <td style={{ ...styles.td, color: '#9ca3af' }}>{incident.date}</td>
                <td style={{ ...styles.td, color: '#9ca3af' }}>{incident.time}</td>
                <td style={styles.td}>
                  <span style={{ color: getLevelColor(incident.level), fontSize: '12px', fontWeight: '500' }}>
                    {incident.level}
                  </span>
                </td>
                <td style={styles.td}>
                  <span style={{ color: getStatusColor(incident.status), fontSize: '12px' }}>
                    ● {incident.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={styles.count}>Showing {filtered.length} of {incidents.length} incidents</p>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1000px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  title: { fontSize: '22px', fontWeight: '500', color: '#ffffff' },
  search: { padding: '8px 14px', backgroundColor: '#111827', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#ffffff', fontSize: '13px', width: '280px', outline: 'none' },
  tableWrapper: { backgroundColor: '#111827', border: '1px solid #1e3a5f', borderRadius: '12px', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { backgroundColor: '#0a0e1a' },
  th: { padding: '12px 16px', textAlign: 'left', fontSize: '11px', color: '#9ca3af', fontWeight: '500', letterSpacing: '0.05em', textTransform: 'uppercase', borderBottom: '1px solid #1e3a5f' },
  tr: { borderBottom: '1px solid #1e3a5f' },
  td: { padding: '12px 16px', fontSize: '13px', color: '#ffffff' },
  count: { fontSize: '12px', color: '#4b5563', marginTop: '12px', textAlign: 'right' },
};

export default History;