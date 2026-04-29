import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { FaMountain, FaSearch, FaBars, FaTimes, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useUserPreferences } from '../../context/UserPreferencesContext';
import { searchTreks, getMatchedCategories, getMatchedLocations } from '../../utils/searchUtils';
import type { Trek } from '../../data/trekData';
import './Navbar.css';
import type { NavigationItem } from './Navbar.types';

const NAV_ITEMS: NavigationItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Treks', path: '/all-treks' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
];

const POPULAR_REGIONS = ['Himalayas', 'Meghalaya', 'Rajasthan', 'Uttarakhand', 'Kerala'];

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    // --- STATE ---
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const lastScrollY = useRef(0);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const { preferences } = useUserPreferences();

    // Debounce search query 300ms
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Computed search results
    const searchResults = useMemo<Trek[]>(
        () => searchTreks(debouncedQuery, preferences, 5),
        [debouncedQuery, preferences]
    );
    const matchedCategories = useMemo(
        () => getMatchedCategories(debouncedQuery, 3),
        [debouncedQuery]
    );
    const matchedLocations = useMemo(
        () => getMatchedLocations(debouncedQuery, 4),
        [debouncedQuery]
    );
    const hasSearchResults = debouncedQuery.length > 0 && (
        searchResults.length > 0 || matchedCategories.length > 0 || matchedLocations.length > 0
    );

    // --- SCROLL LOGIC ---
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine if scrolled (for color change)
            setIsScrolled(currentScrollY > 50);

            // Determine visibility (hide on down, show on up)
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- SEARCH BEHAVIOR ---
    const handleSearchFocus = () => {
        setIsSearchOpen(true);
    };

    const closeSearch = () => {
        setIsSearchOpen(false);
        searchInputRef.current?.blur();
    };

    // Close search on clicks outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isSearchOpen) {
                const target = event.target as HTMLElement;
                // Check if click is outside search wrapper
                if (!target.closest('.search-wrapper')) {
                    closeSearch();
                }
            }
        };

        if (isSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearchOpen]);

    // --- ANIMATION VARIANTS ---
    const mobileMenuVariants: Variants = {
        closed: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
        open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.1, duration: 0.4 },
        }),
    };

    return (
        <>
            <nav
                className={`navbar-container ${isScrolled ? 'scrolled' : ''} ${!isVisible && !isSearchOpen ? 'hidden' : ''}`}
                aria-label="Main Navigation"
            >
                <div className="navbar-content">

                    {/* 1️⃣ LEFT: BRAND */}
                    <div
                        className="brand-logo"
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            console.log("Navigating Home");
                        }}
                    >
                        <motion.div whileHover={{ rotate: 10 }} whileTap={{ scale: 0.9 }}>
                            <FaMountain />
                        </motion.div>
                        <span>TrekMonk</span>
                    </div>

                    {/* 2️⃣ CENTER: EXPANDING SEARCH */}
                    <div className="search-wrapper">
                        <motion.div
                            className={`search-bar ${isSearchOpen ? 'expanded' : ''}`}
                            initial={false}
                            onClick={() => {
                                if (!isSearchOpen) {
                                    setIsSearchOpen(true);
                                    searchInputRef.current?.focus();
                                }
                            }}
                        >
                            <FaSearch className="search-icon" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                className="search-input"
                                placeholder={isSearchOpen ? "Where do you want to go?" : "Search treks..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={handleSearchFocus}
                                onKeyDown={(e) => e.key === 'Escape' && closeSearch()}
                            />

                            {/* Smart Search Dropdown */}
                            <AnimatePresence>
                                {isSearchOpen && (
                                    <motion.div
                                        className="search-dropdown"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {/* EMPTY STATE: show popular regions */}
                                        {!debouncedQuery && (
                                            <>
                                                <div className="dropdown-section">
                                                    <h4>Popular Regions</h4>
                                                    <div className="regions-pills">
                                                        {POPULAR_REGIONS.map(region => (
                                                            <span key={region} className="region-pill"
                                                                onClick={() => setSearchQuery(region)}>{region}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                {preferences.clickedTreks.length > 0 && preferences.lastViewedName && (
                                                    <div className="dropdown-section">
                                                        <h4>Recently Viewed</h4>
                                                        <div style={{ padding: '0.5rem 0', color: 'var(--color-forest-green)', fontWeight: 600, fontSize: '0.9rem' }}>
                                                            {preferences.lastViewedName}
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}

                                        {/* SEARCH RESULTS */}
                                        {hasSearchResults && (
                                            <>
                                                {searchResults.length > 0 && (
                                                    <div className="dropdown-section">
                                                        <h4>Suggested Treks</h4>
                                                        <div className="suggestions-list">
                                                            {searchResults.map((trek, idx) => (
                                                                <motion.div
                                                                    key={trek.id}
                                                                    className="suggestion-item"
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: idx * 0.04 }}
                                                                    onClick={() => { setSearchQuery(''); closeSearch(); }}
                                                                >
                                                                    <img src={trek.image} alt={trek.name} className="suggestion-thumb" />
                                                                    <div className="suggestion-info">
                                                                        <h5>{trek.name}</h5>
                                                                        <span className="suggestion-meta">
                                                                            <FaMapMarkerAlt size={10} style={{ marginRight: 4 }} />
                                                                            {trek.location} • {trek.duration}D
                                                                        </span>
                                                                    </div>
                                                                    <FaArrowRight style={{ marginLeft: 'auto', opacity: 0.3, fontSize: 12 }} />
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {matchedCategories.length > 0 && (
                                                    <div className="dropdown-section">
                                                        <h4>Categories</h4>
                                                        <div className="regions-pills">
                                                            {matchedCategories.map(cat => (
                                                                <span key={cat} className="region-pill">{cat}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {matchedLocations.length > 0 && (
                                                    <div className="dropdown-section">
                                                        <h4>Locations</h4>
                                                        <div className="regions-pills">
                                                            {matchedLocations.map(loc => (
                                                                <span key={loc} className="region-pill">
                                                                    <FaMapMarkerAlt style={{ marginRight: 4, fontSize: 10 }} />{loc}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}

                                        {/* No results */}
                                        {debouncedQuery && !hasSearchResults && (
                                            <div style={{ padding: '1.5rem', textAlign: 'center', color: '#888' }}>
                                                No results for "{debouncedQuery}"
                                            </div>
                                        )}

                                        <div className="dropdown-footer" style={{ textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '0.5rem' }}>
                                            <small style={{ color: 'var(--color-forest-green)', fontWeight: 600, cursor: 'pointer' }}>View All Treks</small>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* 3️⃣ RIGHT: NAVIGATION */}
                    <div className="nav-actions">
                        <div className="nav-menu">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.path}
                                    className={`nav-link ${item.isActive ? 'active' : ''}`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        <motion.button
                            className="cta-button"
                            whileHover={{ scale: 1.05, boxShadow: "0 6px 25px rgba(45, 106, 79, 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/plan-trip')}
                        >
                            Plan a Trip
                        </motion.button>
                    </div>

                    {/* MOBILE TOGGLES */}
                    <button
                        className="mobile-search-toggle"
                        aria-label="Open Search"
                        onClick={() => setIsMobileSearchOpen(true)}
                    >
                        <FaSearch />
                    </button>

                    <button
                        className="mobile-toggle"
                        aria-label="Toggle Menu"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <FaBars />
                    </button>

                </div>
            </nav>

            {/* 📱 MOBILE MENU FULLSCREEN */}
            <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
                <div
                    className="mobile-menu-backdrop"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
                <motion.div
                    className="mobile-menu-content"
                    variants={mobileMenuVariants}
                    initial="closed"
                    animate={isMobileMenuOpen ? "open" : "closed"}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div className="brand-logo" style={{ color: 'var(--color-text-dark)' }}>
                            <FaMountain style={{ color: 'var(--color-forest-green)' }} /> TrekMonk
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: 'var(--color-text-dark)' }}
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {NAV_ITEMS.map((item, i) => (
                            <motion.a
                                key={item.label}
                                href={item.path}
                                className="mobile-nav-link"
                                custom={i}
                                variants={itemVariants}
                                initial="hidden"
                                animate={isMobileMenuOpen ? "visible" : "hidden"}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </motion.a>
                        ))}
                    </nav>

                    <motion.button
                        className="cta-button mobile-cta"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            navigate('/plan-trip');
                        }}
                    >
                        Plan a Trip
                    </motion.button>
                </motion.div>
            </div>

            {/* 📱 MOBILE SEARCH OVERLAY */}
            <AnimatePresence>
                {isMobileSearchOpen && (
                    <motion.div
                        className="mobile-search-overlay"
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        <div className="mobile-search-header">
                            <button onClick={() => setIsMobileSearchOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem' }}>
                                <FaTimes />
                            </button>
                            <input
                                autoFocus
                                type="text"
                                className="mobile-search-input"
                                placeholder="Search treks..."
                            />
                            <FaSearch />
                        </div>

                        <div className="dropdown-section" style={{ marginTop: '2rem' }}>
                            <h4>Popular Regions</h4>
                            <div className="regions-pills">
                                {POPULAR_REGIONS.map(region => (
                                    <span key={region} className="region-pill">{region}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
