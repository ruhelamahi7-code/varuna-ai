import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/map', label: 'Live Map' },
    { path: '/alerts', label: 'Alerts' },
    { path: '/history', label: 'History' },
  ];

  return (
    <div style={styles.navbar}>
      <div style={styles.logo}>
        <div style={styles.logoDot}></div>
        <span style={styles.logoText}>VARUNA AI</span>
      </div>

      <div style={styles.navLinks}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...styles.navLink,
              ...(location.pathname === item.path ? styles.activeLink : {}),
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div style={styles.status}>
        <div style={styles.statusDot}></div>
        <span style={styles.statusText}>System Active</span>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '60px',
    backgroundColor: '#111827',
    borderBottom: '1px solid #1e3a5f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    zIndex: 1000,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logoDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#378ADD',
  },
  logoText: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#ffffff',
    letterSpacing: '2px',
  },
  navLinks: {
    display: 'flex',
    gap: '8px',
  },
  navLink: {
    padding: '6px 16px',
    borderRadius: '8px',
    color: '#9ca3af',
    textDecoration: 'none',
    fontSize: '14px',
  },
  activeLink: {
    backgroundColor: '#1e3a5f',
    color: '#378ADD',
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#1D9E75',
  },
  statusText: {
    fontSize: '12px',
    color: '#1D9E75',
  },
};

export default Navbar;