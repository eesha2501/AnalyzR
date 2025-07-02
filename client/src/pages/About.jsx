import React from "react";
import "./About.css";

export default function About() {
  return (
    <div>
      <div className="about-page">
        <div className="about-hero">
          <h1>🌐 About AnalyzR</h1>
          <p>Your all-in-one tool for website analysis, SEO audits, and performance optimization.</p>
        </div>

        <section className="about-section">
          <h2>✨ What is AnalyzR?</h2>
          <p>
            AnalyzR is a powerful, user-friendly platform designed to analyze any website for SEO,
            security, accessibility, and performance best practices. Whether you're a developer,
            marketer, business owner, or curious learner, AnalyzR gives you actionable insights to
            improve your site's quality and reach.
          </p>
        </section>

        <section className="about-section">
          <h2>⚙️ How Does It Work?</h2>
          <ol>
            <li>🔗 Enter any website URL on our Home page.</li>
            <li>📊 AnalyzR runs a comprehensive audit covering SEO, security, accessibility, technologies used, and performance.</li>
            <li>📝 Instantly receive a beautifully formatted, easy-to-read report with improvement suggestions.</li>
            <li>📥 Download the report as PDF for sharing or record-keeping.</li>
          </ol>
        </section>

        <section className="about-section">
          <h2>🎯 Who Should Use AnalyzR?</h2>
          <ul>
            <li>🌱 Small business owners who want to improve their website visibility and trust.</li>
            <li>🧑‍💻 Developers who need quick diagnostics during development.</li>
            <li>📈 Marketers who want clear SEO and performance insights.</li>
            <li>📚 Students and learners exploring how websites work.</li>
            <li>👥 Anyone curious about what's under the hood of their favorite sites!</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>💡 Why Choose AnalyzR?</h2>
          <p>
            Unlike generic website analyzers, AnalyzR focuses on clear, actionable feedback without
            clutter or noise. Our goal is to help you understand your site's strengths and
            weaknesses, so you can deliver the best possible experience to your users.
          </p>
          <ul>
            <li>✅ Modern, intuitive interface</li>
            <li>✅ Detailed breakdown of SEO, safety, and performance</li>
            <li>✅ Tailored suggestions for real-world improvements</li>
            <li>✅ Free to use and always improving</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>🚀 Future Integrations & Vision</h2>
          <p>
            AnalyzR is just getting started. Here's what we're working on next:
          </p>
          <ul>
            <li>🔍 Advanced keyword research tools</li>
            <li>📈 Competitor site comparisons</li>
            <li>🧩 Plugin and CMS integrations (WordPress, Shopify, etc.)</li>
            <li>📊 Historical performance tracking</li>
            <li>🤖 AI-powered content and SEO recommendations</li>
            <li>💬 Personalized optimization support</li>
          </ul>
          <p>
            Our mission is to democratize website optimization—so anyone can build a faster, safer, and more effective online presence.
          </p>
        </section>

        <section className="about-footer">
          <p>✨ Ready to improve your website? <strong>Head to the <a href="/">Home page</a></strong> and get your free analysis today!</p>
        </section>
      </div>
      <div className="image-card">
       
      </div>
    </div>
  );
}
