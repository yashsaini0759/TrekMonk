import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaInstagram, FaYoutube, FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "0px 0px -50px 0px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.footer 
      ref={footerRef}
      className="footer"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="footer__wave" aria-hidden="true" />
      
      <div className="footer__container">
        {/* Top CTA Strip */}
        <motion.div className="footer__cta-strip" variants={itemVariants}>
          <div className="footer__cta-content">
            <h3 className="footer__cta-title">Ready for your next adventure?</h3>
            <p className="footer__cta-subtitle">Join thousands of travelers who trust TrekMonk for their mountain journeys.</p>
          </div>
          <Link to="/all-treks" className="footer__cta-btn" style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>Explore Treks</Link>
        </motion.div>

        {/* Main Grid */}
        <div className="footer__main-grid">
          {/* Column 1: Brand */}
          <motion.div className="footer__col footer__col--brand" variants={itemVariants}>
            <h2 className="footer__logo">TrekMonk.</h2>
            <p className="footer__tagline">Explore India with confidence.</p>
            <p className="footer__desc">
              Curating premium, high-trust trekking experiences across the most breathtaking landscapes of India.
            </p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div className="footer__col" variants={itemVariants}>
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/all-treks">Treks</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </motion.div>

          {/* Column 3: Support */}
          <motion.div className="footer__col" variants={itemVariants}>
            <h4 className="footer__col-title">Support</h4>
            <ul className="footer__links">
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/cancellation">Cancellation Policy</a></li>
            </ul>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div className="footer__col footer__col--contact" variants={itemVariants}>
            <h4 className="footer__col-title">Contact Us</h4>
            <ul className="footer__contact-list">
              <li>
                <FaEnvelope className="footer__icon" />
                <a href="mailto:hello@trekmonk.com">hello@trekmonk.com</a>
              </li>
              <li>
                <FaPhoneAlt className="footer__icon" />
                <a href="tel:+919876543210">+91 98765 43210</a>
              </li>
              <li>
                <FaMapMarkerAlt className="footer__icon" />
                <span>Mumbai, Maharashtra</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <motion.div className="footer__bottom" variants={itemVariants}>
          <p className="footer__copyright">© 2026 TrekMonk. All rights reserved.</p>
          <div className="footer__socials">
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </motion.div>
      </div>

      {/* Floating Back to Top Button */}
      <button 
        className="footer__back-to-top" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>
    </motion.footer>
  );
};

export default Footer;
