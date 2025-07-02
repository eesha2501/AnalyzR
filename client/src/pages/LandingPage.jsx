import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle, auth } from '../firebase';
import bgImage from '../assets/bg2.jpg'; // ✅ Make sure this matches exactly
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/home');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGetStarted = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      className="landing-dark"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh'
      }}
    >
      <div className="overlay-dark">
        <section className="hero-dark">
          <div className="hero-content-dark">
            <h1>
              Meet <span className="highlight-dark">AnalyzR</span>
            </h1>
            <p className="subhead-dark">
              Audit your website’s SEO, performance, and accessibility—all in one click. Dark mode. Simple. Powerful.
            </p>
            <button className="cta-btn-dark" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
          <div className="hero-image-dark">
            <img src="logo.png" alt="AnalyzR preview" />
          </div>
        </section>

        <section className="features-dark">
          <h2>What you get with AnalyzR</h2>
          <div className="feature-grid-dark">
            <div className="feature-card-dark">
              <h3>🚀 Lightning Analysis</h3>
              <p>Get instant site audits in a beautiful dark-themed report.</p>
            </div>
            <div className="feature-card-dark">
              <h3>📈 Actionable Insights</h3>
              <p>Step-by-step recommendations tailored to your site.</p>
            </div>
            <div className="feature-card-dark">
              <h3>🌐 SEO & Accessibility</h3>
              <p>Rank higher and deliver a better experience for all users.</p>
            </div>
          </div>
        </section>

        <footer className="footer-dark">
          <p>&copy; {new Date().getFullYear()} AnalyzR. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
