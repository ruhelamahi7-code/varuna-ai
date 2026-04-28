import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === 'admin@varuna.ai' && password === 'varuna123') {
      onLogin();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>

        <div style={styles.logoRow}>
          <div style={styles.logoDot}></div>
          <h1 style={styles.logoText}>VARUNA AI</h1>
        </div>

        <p style={styles.subtitle}>Coastal Ocean Protection System</p>
        <p style={styles.sdg}>SDG 14 · SDG 16 · Powered by Firebase</p>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            type="email"
            placeholder="admin@varuna.ai"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.button} onClick={handleLogin}>
          Login to Dashboard
        </button>

        <p style={styles.hint}>Use admin@varuna.ai / varuna123</p>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0e1a',
  },
  box: {
    backgroundColor: '#111827',
    padding: '40px',
    borderRadius: '16px',
    width: '400px',
    border: '1px solid #1e3a5f',
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
  },
  logoDot: {
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    backgroundColor: '#378ADD',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: '500',
    color: '#ffffff',
    letterSpacing: '3px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#9ca3af',
    marginBottom: '6px',
  },
  sdg: {
    fontSize: '11px',
    color: '#378ADD',
    marginBottom: '30px',
  },
  inputGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '12px',
    color: '#9ca3af',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    backgroundColor: '#1f2937',
    border: '1px solid #374151',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
  },
  error: {
    color: '#ef4444',
    fontSize: '13px',
    marginBottom: '12px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#185FA5',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '8px',
  },
  hint: {
    fontSize: '11px',
    color: '#4b5563',
    textAlign: 'center',
    marginTop: '12px',
  },
};

export default Login;