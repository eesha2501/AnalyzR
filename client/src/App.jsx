import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingLayout from './components/layout/LandingLayout';
import AppLayout from './components/layout/AppLayout';
import LandingPage from './pages/LandingPage';
import LaAbout from './pages/LaAbout';
import Home from './pages/Home';
import About from './pages/About';
import Feedback from './pages/Feedback';
import LoginPage from './pages/LoginPage';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing layout routes */}
        <Route element={<LandingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/LaAbout" element={<LaAbout />} />
          {/* Login page route */}
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* App layout routes */}
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
