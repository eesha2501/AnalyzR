import React, { useState } from 'react';
import { signInWithGoogle } from '../firebase';
import './LandingNavbar.css';

export default function LandingNavbar() {
  const [open, setOpen] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      setOpen(false); // close menu on login
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <nav className="landing-navbar">
      <a href="/" className="brand">AnalyzR</a>

      <button
        className={`hamburger ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-links ${open ? 'active' : ''}`}>
        <a href="/LaAbout" onClick={() => setOpen(false)}>About</a>
        <button className="login-btn" onClick={handleLogin}>Login</button>
      </div>
    </nav>
  );
}
