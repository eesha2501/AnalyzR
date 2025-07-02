import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../firebase'; // adjust to your path
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); 
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="AnalyzR Logo" className="navbar-logo" />
        
      </div>

      <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`navbar-right ${menuOpen ? 'show' : ''}`}>
        <a href="/home" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="/about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="/feedback" onClick={() => setMenuOpen(false)}>Feedback</a>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
