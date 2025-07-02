import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Feedback.css';

export default function Feedback() {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_jteg0z5',     // Replace with EmailJS Service ID
      'template_2u5mcx8', // Replace with EmailJS Template ID
      form.current,
      '3L2Ri-xpK7qyphKwQ'      // Replace with EmailJS Public Key
    ).then(
      () => {
        setStatus('✅ Thank you! Your feedback has been sent.');
        form.current.reset();
      },
      (error) => {
        console.error(error.text);
        setStatus('❌ Sorry, there was a problem sending your feedback. Please try again.');
      }
    );
  };

  return (
    <div className="feedback-container">
      <h2>📣 Feedback</h2>
      <p>We'd love to hear from you. Please fill in the form below.</p>
      <form ref={form} onSubmit={sendEmail} className="feedback-form">
        <label>
          Name *
          <input type="text" name="user_name" required />
        </label>
        <label>
          Email *
          <input type="email" name="user_email" required />
        </label>
        <label>
          Phone (optional)
          <input type="tel" name="user_phone" />
        </label>
        <label>
          Message *
          <textarea name="message" required rows="5"></textarea>
        </label>
        <button type="submit">Send Feedback</button>
      </form>
      {status && <p className="feedback-status">{status}</p>}
    </div>
  );
}
