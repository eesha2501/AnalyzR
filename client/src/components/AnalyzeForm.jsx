import React, { useState } from 'react';
import axios from 'axios';
import './AnalyzeForm.css';

const AnalyzeForm = ({ setResult }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setResult(null);

    try {
      // Only call analyze and performance APIs
      const [analyzeRes, performanceRes] = await Promise.all([
        axios.post('http://localhost:5000/api/analyze', { url }),
        axios.post('http://localhost:5000/api/performance', { url })
      ]);

      const combinedData = {
        ...analyzeRes.data,
        performance: performanceRes.data
      };

      setResult(combinedData);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="analyze-form">
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
      {error && <p className="error-text">{error}</p>}
    </form>
  );
};

export default AnalyzeForm;
