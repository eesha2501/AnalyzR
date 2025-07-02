import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../firebase';  // adjust path to your actual firebase.js
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redirect to landing page
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="AnalyzR Logo" className="navbar-logo" />
      </div>
      <div className="navbar-right">
        <a href="/home">Home</a>
        <a href="/about">About</a>
        <a href="/feedback">Feedback</a>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
