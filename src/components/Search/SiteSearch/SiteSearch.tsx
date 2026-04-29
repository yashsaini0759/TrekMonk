import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX, FiTrendingUp, FiClock } from 'react-icons/fi';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { searchTreks, getSearchRecommendations, getRelatedByIds } from '../../../engine/recommendationEngine';
import { useUserPreferences } from '../../../context/UserPreferencesContext';
import { unifiedTrekData } from '../../../data/unifiedTrekData';
import type { Trek } from '../../../data/trekData';
import './SiteSearch.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: '#10b981',
  moderate: '#f59e0b',
  hard: '#ef4444',
};

const POPULAR_TAGS = ['snow', 'beach', 'desert', 'forest', 'monastery', 'wildlife', 'heritage', 'backpacking'];

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit:   { opacity: 0, transition: { duration: 0.18 } },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: 'easeOut' as const } },
  exit:   { opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.18 } },
};

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.28 } },
};

const SiteSearch: React.FC<Props> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { recordClick, recordSearch, preferences } = useUserPreferences();
  const navigate = useNavigate();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setQuery('');
      setDebouncedQuery('');
    }
  }, [isOpen]);

  // Keyboard: Esc to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Debounce query
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 220);
    return () => clearTimeout(id);
  }, [query]);

  // ── Compute results ──────────────────────────────────────────────────────
  const results = useMemo(() => searchTreks(debouncedQuery), [debouncedQuery]);

  // Search recommendations — content-based, excluding the direct results
  const sideRecs = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    const excludeIds = results.slice(0, 8).map(t => t.id);
    return getSearchRecommendations(debouncedQuery, 5, excludeIds);
  }, [debouncedQuery, results]);

  // ── Recently viewed — look up actual Trek objects from IDs ───────────────
  const recentTreks = useMemo<Trek[]>(() => {
    if (debouncedQuery.trim()) return [];
    const { clickedTreks } = preferences;
    return clickedTreks
      .slice(0, 4)
      .map(id => unifiedTrekData.find(t => t.id === id))
      .filter((t): t is Trek => t !== undefined);
  }, [preferences, debouncedQuery]);

  // Treks similar to recently viewed (excludes already-shown recent treks)
  const recentRecs = useMemo<Trek[]>(() => {
    if (debouncedQuery.trim() || !recentTreks.length) return [];
    return getRelatedByIds(
      recentTreks.map(t => t.id),
      5,
      recentTreks.map(t => t.id),
    );
  }, [recentTreks, debouncedQuery]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleSelectTrek = useCallback((trek: Trek) => {
    recordClick(trek);
    if (debouncedQuery) recordSearch(debouncedQuery);
    navigate(`/trek/${trek.slug}`);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [recordClick, recordSearch, debouncedQuery, navigate, onClose]);

  const handleTagClick = (tag: string) => {
    setQuery(tag);
  };

  const showResults = debouncedQuery.trim().length > 0;
  const hasResults  = results.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="ss-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-label="Site search"
        >
          <motion.div
            className="ss-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={e => e.stopPropagation()}
          >
            {/* Search bar */}
            <div className="ss-bar">
              <FiSearch className="ss-bar__icon" />
              <input
                ref={inputRef}
                type="text"
                className="ss-bar__input"
                placeholder="Search treks, places, regions..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                aria-label="Search treks"
                id="site-search-input"
                autoComplete="off"
              />
              {query && (
                <button
                  className="ss-bar__clear"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
              <button className="ss-bar__close" onClick={onClose} aria-label="Close search">
                <FiX /> <span>Esc</span>
              </button>
            </div>

            {/* Body */}
            <div className="ss-body">
              {/* ─── Empty state ─── */}
              {!showResults && (
                <div className="ss-empty">
                  {/* Popular tags */}
                  <div className="ss-tags-section">
                    <p className="ss-section-label">
                      <FiTrendingUp /> Popular Searches
                    </p>
                    <div className="ss-tags">
                      {POPULAR_TAGS.map(tag => (
                        <button
                          key={tag}
                          className="ss-tag"
                          onClick={() => handleTagClick(tag)}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recently viewed */}
                  {recentTreks.length > 0 && (
                    <div className="ss-recent">
                      <p className="ss-section-label">
                        <FiClock /> Recently Viewed
                      </p>
                      <motion.ul
                        className="ss-result-list"
                        variants={listVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {recentTreks.map(trek => (
                          <motion.li key={trek.id} variants={itemVariants}>
                            <button
                              className="ss-result-item"
                              onClick={() => handleSelectTrek(trek)}
                              id={`recent-${trek.id}`}
                            >
                              <div className="ss-result-img-wrap">
                                <img
                                  src={trek.image}
                                  alt={trek.name}
                                  className="ss-result-img"
                                  loading="lazy"
                                />
                              </div>
                              <div className="ss-result-info">
                                <div className="ss-result-top">
                                  <h3 className="ss-result-name">{trek.name}</h3>
                                  <span
                                    className="ss-result-badge"
                                    style={{ background: DIFFICULTY_COLORS[trek.difficulty] }}
                                  >
                                    {trek.difficulty}
                                  </span>
                                </div>
                                <p className="ss-result-loc">
                                  <FaMapMarkerAlt />
                                  {trek.location} &bull; {trek.duration}D
                                </p>
                                <div className="ss-result-meta">
                                  <span className="ss-result-price">
                                    ₹{trek.price.toLocaleString('en-IN')}
                                  </span>
                                  <span className="ss-result-rating">
                                    <FaStar /> {trek.rating.toFixed(1)}
                                  </span>
                                </div>
                              </div>
                            </button>
                          </motion.li>
                        ))}
                      </motion.ul>

                      {/* "You might also like" based on recent views */}
                      {recentRecs.length > 0 && (
                        <div className="ss-recent-recs">
                          <p className="ss-section-label" style={{ marginTop: '1.5rem' }}>
                            <HiSparkles /> You Might Also Like
                          </p>
                          <div className="ss-tags">
                            {recentRecs.map(trek => (
                              <button
                                key={trek.id}
                                className="ss-tag"
                                onClick={() => handleSelectTrek(trek)}
                              >
                                {trek.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {recentTreks.length === 0 && (
                    <p className="ss-hint">Start typing to search all destinations across India</p>
                  )}
                </div>
              )}

              {/* ─── Results ─── */}
              {showResults && (
                <div className="ss-results-wrap">
                  {/* Left: Search results */}
                  <div className="ss-results">
                    <p className="ss-section-label">
                      <FiSearch />
                      {hasResults
                        ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${debouncedQuery}"`
                        : `No results for "${debouncedQuery}"`}
                    </p>

                    {hasResults ? (
                      <motion.ul
                        className="ss-result-list"
                        variants={listVariants}
                        initial="hidden"
                        animate="visible"
                        key={debouncedQuery}
                      >
                        {results.slice(0, 8).map(trek => (
                          <motion.li key={trek.id} variants={itemVariants}>
                            <button
                              className="ss-result-item"
                              onClick={() => handleSelectTrek(trek)}
                              id={`search-result-${trek.id}`}
                            >
                              <div className="ss-result-img-wrap">
                                <img
                                  src={trek.image}
                                  alt={trek.name}
                                  className="ss-result-img"
                                  loading="lazy"
                                />
                              </div>
                              <div className="ss-result-info">
                                <div className="ss-result-top">
                                  <h3 className="ss-result-name">{trek.name}</h3>
                                  <span
                                    className="ss-result-badge"
                                    style={{ background: DIFFICULTY_COLORS[trek.difficulty] }}
                                  >
                                    {trek.difficulty}
                                  </span>
                                </div>
                                <p className="ss-result-loc">
                                  <FaMapMarkerAlt />
                                  {trek.location} &bull; {trek.duration}D
                                </p>
                                <div className="ss-result-meta">
                                  <span className="ss-result-price">
                                    ₹{trek.price.toLocaleString('en-IN')}
                                  </span>
                                  <span className="ss-result-rating">
                                    <FaStar /> {trek.rating.toFixed(1)}
                                  </span>
                                </div>
                              </div>
                            </button>
                          </motion.li>
                        ))}
                      </motion.ul>
                    ) : (
                      <div className="ss-no-results">
                        <span className="ss-no-results__emoji">🏔️</span>
                        <p>No treks matched your search.</p>
                        <p className="ss-no-results__hint">Try "Himalayas", "beach", "easy" or a state name.</p>
                        <div className="ss-tags" style={{ justifyContent: 'center', marginTop: '1rem' }}>
                          {POPULAR_TAGS.slice(0, 4).map(tag => (
                            <button key={tag} className="ss-tag" onClick={() => handleTagClick(tag)}>
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Content-based recommendations */}
                  {sideRecs.length > 0 && (
                    <div className="ss-sidebar">
                      <p className="ss-section-label">
                        <HiSparkles /> Similar Picks
                      </p>
                      <motion.ul
                        className="ss-rec-list"
                        variants={listVariants}
                        initial="hidden"
                        animate="visible"
                        key={`rec-${debouncedQuery}`}
                      >
                        {sideRecs.map(trek => (
                          <motion.li key={trek.id} variants={itemVariants}>
                            <button
                              className="ss-rec-item"
                              onClick={() => handleSelectTrek(trek)}
                              id={`search-rec-${trek.id}`}
                            >
                              <div className="ss-rec-img-wrap">
                                <img
                                  src={trek.image}
                                  alt={trek.name}
                                  className="ss-rec-img"
                                  loading="lazy"
                                />
                                <div className="ss-rec-img-overlay" />
                              </div>
                              <div className="ss-rec-info">
                                <h4 className="ss-rec-name">{trek.name}</h4>
                                <p className="ss-rec-loc">{trek.location}</p>
                                <div className="ss-rec-bottom">
                                  <span
                                    className="ss-rec-diff"
                                    style={{ color: DIFFICULTY_COLORS[trek.difficulty] }}
                                  >
                                    {trek.difficulty}
                                  </span>
                                  <span className="ss-rec-price">
                                    ₹{trek.price.toLocaleString('en-IN')}
                                  </span>
                                </div>
                              </div>
                            </button>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SiteSearch;
