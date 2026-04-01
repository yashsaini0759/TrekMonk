import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    {/* Brand Section */}
                    <div className={styles.footerSection}>
                        <div className={styles.brand}>
                            <span className={styles.logoIcon}>🏔️</span>
                            <span className={styles.logoText}>TrekMonk</span>
                        </div>
                        <p className={styles.tagline}>Your Adventure, Your India</p>
                        <p className={styles.description}>
                            India's biggest adventure travel platform connecting you with unforgettable experiences across the country.
                        </p>
                        <div className={styles.socialLinks}>
                            <a href="#" className={styles.socialLink} aria-label="Facebook">
                                <FiFacebook />
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="Instagram">
                                <FiInstagram />
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="Twitter">
                                <FiTwitter />
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="YouTube">
                                <FiYoutube />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.footerSection}>
                        <h4 className={styles.sectionTitle}>Quick Links</h4>
                        <ul className={styles.linkList}>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/trips">All Trips</Link></li>
                            <li><Link to="/regions">Regions</Link></li>
                            <li><Link to="/blog">Travel Blog</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Popular Categories */}
                    <div className={styles.footerSection}>
                        <h4 className={styles.sectionTitle}>Popular Adventures</h4>
                        <ul className={styles.linkList}>
                            <li><Link to="/trips?category=himalayan-treks">Himalayan Treks</Link></li>
                            <li><Link to="/trips?category=sahyadri-treks">Sahyadri Treks</Link></li>
                            <li><Link to="/trips?category=weekend-getaways">Weekend Getaways</Link></li>
                            <li><Link to="/trips?category=wildlife-safaris">Wildlife Safaris</Link></li>
                            <li><Link to="/trips?category=bike-trips">Bike Road Trips</Link></li>
                            <li><Link to="/trips?category=international">International Trips</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className={styles.footerSection}>
                        <h4 className={styles.sectionTitle}>Get in Touch</h4>
                        <ul className={styles.contactList}>
                            <li>
                                <FiMapPin />
                                <span>Mumbai, Maharashtra, India</span>
                            </li>
                            <li>
                                <FiPhone />
                                <span>+91 9876543210</span>
                            </li>
                            <li>
                                <FiMail />
                                <span>hello@trekmonk.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={styles.footerBottom}>
                    <p className={styles.copyright}>
                        © {currentYear} TrekMonk. All rights reserved.
                    </p>
                    <div className={styles.legalLinks}>
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms & Conditions</Link>
                        <Link to="/cancellation">Cancellation Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
