import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/UI/Button/Button';
import './Contact.css';
import { useNavigate } from 'react-router-dom';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast("Message sent successfully! We'll get back to you soon.", 'success');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <motion.div 
      className="contact-page"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      {/* 1. HERO SECTION */}
      <section className="contact-hero">
        <div className="contact-hero-overlay"></div>
        <div className="container contact-hero-content text-center">
          <h1 className="contact-hero-title">Contact Us</h1>
          <p className="contact-hero-subtitle">
            We’re here to help you plan your next adventure.
          </p>
        </div>
      </section>

      {/* 2. CONTACT SECTION MAIN */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">
            
            {/* LEFT SIDE: INFO CARD */}
            <div className="contact-info-card">
              <h2>Get in Touch</h2>
              <p className="contact-info-desc">
                Have questions about our treks or need help planning your trip? 
                Reach out to us and our team will be happy to assist you in making 
                your adventure unforgettable.
              </p>
              
              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="detail-icon"><FiMail /></div>
                  <div className="detail-text">
                    <h4>Email</h4>
                    <p>vermaaditi593@gmail.com</p>
                  </div>
                </div>
                
                <div className="contact-detail-item">
                  <div className="detail-icon"><FiPhone /></div>
                  <div className="detail-text">
                    <h4>Phone</h4>
                    <p>+91 9876543210</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="detail-icon"><FiMapPin /></div>
                  <div className="detail-text">
                    <h4>Address</h4>
                    <p>Mumbai, Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: CONTACT FORM */}
            <div className="contact-form-card">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    placeholder="john@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone"
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    required 
                    placeholder="+91 98765 43210"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message"
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    required 
                    rows={4}
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  fullWidth 
                  size="lg" 
                  className="submit-btn"
                >
                  Send Message
                </Button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CTA SECTION */}
      <section className="contact-cta">
        <div className="container text-center">
          <h2>Ready to explore?</h2>
          <Button onClick={() => navigate('/all-treks')} size="lg" className="cta-btn">
            Browse Treks
          </Button>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
