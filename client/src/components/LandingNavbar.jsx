import React from 'react';
import { signInWithGoogle } from '../firebase';
import './LandingNavbar.css';

export default function LandingNavbar() {
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <nav className="landing-navbar">
      <a href="/" className="brand">AnalyzR</a>
      <div>
      <a href="/LaAbout" className="nav-link">About</a>
       
        <button className="login-btn" onClick={handleLogin}>Login</button>
        
       
      </div>
    </nav>
  );
}
