import React, { useState, useEffect } from 'react';
import ResultDisplay from '../components/ResultDisplay';
import './Home.css';

function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    let interval;
    if (loading) {
      setShowProgress(true);
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) return prev + 2;
          return prev;
        });
      }, 200);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      setProgress(100);
      setResult(data);
    } catch (err) {
      setError('Error analyzing the URL. Please check your server.');
    } finally {
      setLoading(false);
      setTimeout(() => setShowProgress(false), 800);
    }
  };

  return (
    <div className={`home-wrapper ${!result ? 'no-result' : ''}`}>
      <h1 className="home-header">Welcome to AnalyzR</h1>

      {showProgress && (
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="home-content">
        <div className="analyze-form-card">
          <h2>🔎 Enter Website URL</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>

      {result && (
        <div className="result-card">
          <ResultDisplay data={result} />
        </div>
      )}
    </div>
  );
}

export default Home;
