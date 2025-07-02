import React from 'react';
import './ResultDisplay.css';

/**
 * Helper component to render any JSON block nicely
 */
const JsonBlock = ({ data }) => (
  <pre className="json-block">
    {JSON.stringify(data, null, 2)}
  </pre>
);

/**
 * Component to render a table for audits
 */
const AuditTable = ({ audits }) => {
  if (!audits) return <p className="no-data">No audit data available.</p>;

  const auditEntries = Object.entries(audits);
  if (!auditEntries.length) return <p className="no-data">No audit data available.</p>;

  return (
    <table className="perf-table">
      <thead>
        <tr>
          <th>Metric</th>
          <th>Display Value</th>
          <th>Score</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {auditEntries.map(([key, audit]) => (
          <tr key={key}>
            <td>{audit.title ?? key}</td>
            <td>{audit.displayValue ?? 'N/A'}</td>
            <td>{audit.score !== undefined ? audit.score : 'N/A'}</td>
            <td>{audit.description ?? 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

/**
 * Main Result Display
 */
const ResultDisplay = ({ data }) => {
  if (!data) return null;

  return (
    <div className="result-container">
      <h2 className="report-title">📊 Full Analysis Report</h2>

      <div className="result-grid">

        {/* Safety */}
        <div className="result-card">
          <h3>🛡️ Safety</h3>
          <p>Safe: {data.safety?.safe ? '✅ Yes' : '❌ No'}</p>
          <p>HTTPS: {data.safety?.https ? '✅ Yes' : '❌ No'}</p>
          <p>Blocklisted: {data.safety?.blocklisted ? '✅ Yes' : '❌ No'}</p>
        </div>

        {/* Title & Meta */}
        <div className="result-card">
          <h3>🏷️ Title & Meta</h3>
          <p><strong>Title:</strong> {data.title?.text || 'N/A'}</p>
          <p><strong>Description:</strong> {data.meta?.description?.text || 'N/A'}</p>
          <p><strong>Canonical:</strong> {data.meta?.canonical || 'None'}</p>
          <p><strong>Robots:</strong> {data.meta?.robots || 'N/A'}</p>
          <p><strong>Viewport:</strong> {data.meta?.viewport || 'N/A'}</p>
          <p><strong>Language:</strong> {data.lang || 'N/A'}</p>
        </div>

        {/* Headings */}
        <div className="result-card">
          <h3>🔖 Headings</h3>
          <p><strong>H1 Count:</strong> {data.headings?.h1Count ?? 'N/A'}</p>
          {data.headings?.h1?.length > 0 && (
            <>
              <h4>H1</h4>
              <ul>{data.headings.h1.map((h, i) => <li key={i}>{h}</li>)}</ul>
            </>
          )}
          {data.headings?.h2?.length > 0 && (
            <>
              <h4>H2</h4>
              <ul>{data.headings.h2.map((h, i) => <li key={i}>{h}</li>)}</ul>
            </>
          )}
          {data.headings?.h3?.length > 0 && (
            <>
              <h4>H3</h4>
              <ul>{data.headings.h3.map((h, i) => <li key={i}>{h}</li>)}</ul>
            </>
          )}
        </div>

        {/* Technologies */}
        <div className="result-card">
          <h3>🛠️ Technologies Detected</h3>
          {data.technologies?.length ? (
            <ul>{data.technologies.map((tech, i) => <li key={i}>{tech}</li>)}</ul>
          ) : <p>No technologies detected.</p>}
        </div>

        {/* Keywords */}
        <div className="result-card">
          <h3>📝 Top Keywords</h3>
          {data.textAnalysis?.topKeywords?.length ? (
            <ul>{data.textAnalysis.topKeywords.map((kw, i) => <li key={i}>{kw}</li>)}</ul>
          ) : <p>No keywords found.</p>}
          <p><strong>Word Count:</strong> {data.textAnalysis?.wordCount ?? 'N/A'}</p>
        </div>

        {/* SEO Issues */}
        <div className="result-card">
          <h3>⚠️ SEO Issues</h3>
          {data.seoIssues?.length ? (
            <ul>{data.seoIssues.map((issue, i) => <li key={i}>{issue}</li>)}</ul>
          ) : <p>No issues detected.</p>}
        </div>

        {/* Accessibility */}
        {data.accessibility && (
          <div className="result-card">
            <h3>♿ Accessibility</h3>
            <p>Images missing alt: {data.accessibility?.imagesWithoutAlt ?? 'N/A'}</p>
            <p>Links without text: {data.accessibility?.linksWithoutText ?? 'N/A'}</p>
            {data.accessibility?.bestPracticeHints?.length > 0 && (
              <ul>
                {data.accessibility.bestPracticeHints.map((hint, i) => (
                  <li key={i}>{hint}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {data?.twitterCard && typeof data.twitterCard === 'object' && (
  <div className="result-card">
    <h3>✖️ Twitter Card</h3>
    <JsonBlock data={data.twitterCard} />
  </div>
)}

{data?.openGraph && typeof data.openGraph === 'object' && Object.keys(data.openGraph).length > 0 && (
  <div className="result-card">
    <h3>🌐 Open Graph</h3>
    <JsonBlock data={data.openGraph} />
  </div>
)}

{Array.isArray(data?.jsonLd) && data.jsonLd.length > 0 && (
  <div className="result-card">
    <h3>📦 JSON-LD Structured Data</h3>
    <JsonBlock data={data.jsonLd} />
  </div>
)}


        {/* Suggested Improvements */}
        {data.improvementSuggestions && data.improvementSuggestions.length > 0 && (
          <div className="result-card recommendation">
            <h3>🛠️ Suggested Improvements</h3>
            <ul>
              {data.improvementSuggestions.map((item, i) => (
                <li key={i}>
                  <strong>{item.area}:</strong> {item.reason}<br/>
                  <em>Recommended Tools:</em> {item.tools.join(', ')}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 🚀 Performance / PageSpeed */}
        {data.performance && (
          <div className="result-card performance">
            <h3>🚀 Performance / PageSpeed</h3>

            {/* MOBILE */}
            {data.performance.mobile && (
              <div className="platform-section">
                <h4>📱 Mobile</h4>
                <p><strong>Overall Score:</strong> {data.performance.mobile.lighthouseScore !== null ? data.performance.mobile.lighthouseScore * 100 : 'N/A'}</p>
                <AuditTable audits={data.performance.mobile.audits} />
              </div>
            )}

            {/* DESKTOP */}
            {data.performance.desktop && (
              <div className="platform-section">
                <h4>💻 Desktop</h4>
                <p><strong>Overall Score:</strong> {data.performance.desktop.lighthouseScore !== null ? data.performance.desktop.lighthouseScore * 100 : 'N/A'}</p>
                <AuditTable audits={data.performance.desktop.audits} />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="button-row">
        <button className="download-btn" onClick={() => window.print()}>
          📥 Download PDF
        </button>
        <button className="new-analysis-btn" onClick={() => window.location.reload()}>
          🔄 New Analysis
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;
