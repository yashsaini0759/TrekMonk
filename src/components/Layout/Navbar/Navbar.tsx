import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';
import { FiMenu, FiX, FiSearch, FiUser, FiHeart, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../UI/Button/Button';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Trips', path: '/trips' },
        { name: 'Regions', path: '/regions' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <motion.nav
            className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="container">
                <div className={styles.navContent}>
                    {/* Logo */}
                    <Link to="/" className={styles.logo}>
                        <span className={styles.logoIcon}>🏔️</span>
                        <span className={styles.logoText}>TrekMonk</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className={styles.navLinks}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`${styles.navLink} ${location.pathname === link.path ? styles.active : ''
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className={styles.navActions}>
                        <button className={styles.iconButton} aria-label="Search">
                            <FiSearch />
                        </button>

                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" className={styles.iconButton} aria-label="Wishlist">
                                    <FiHeart />
                                </Link>
                                <div className={styles.userMenu}>
                                    <Link to="/profile" className={styles.userButton}>
                                        <img src={user?.avatar} alt={user?.name} className={styles.avatar} />
                                        <span className={styles.userName}>{user?.name}</span>
                                    </Link>
                                    <button onClick={logout} className={styles.iconButton} aria-label="Logout">
                                        <FiLogOut />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <Link to="/login">
                                <Button size="sm">
                                    <FiUser /> Login
                                </Button>
                            </Link>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            className={styles.mobileMenuToggle}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`${styles.mobileNavLink} ${location.pathname === link.path ? styles.active : ''
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {!isAuthenticated && (
                            <Link to="/login" className={styles.mobileNavLink}>
                                Login
                            </Link>
                        )}
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
};

export default Navbar;
