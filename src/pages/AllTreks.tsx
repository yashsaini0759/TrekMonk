import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { regionData } from '../components/RegionSection/regionsData';
import type { Place } from '../components/RegionSection/regionsData';
import RegionCard from '../components/RegionSection/RegionCard';
import './AllTreks.css';

// ── Types ──────────────────────────────────────────────────────────────────────
type SortKey = 'default' | 'price_asc' | 'price_desc' | 'duration_asc' | 'duration_desc';
type Difficulty = 'All' | 'Easy' | 'Moderate' | 'Difficult';
type TripType = 'All' | 'Group Trip' | 'Backpacking' | 'Weekend' | 'Spiritual';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'default',       label: 'Default'          },
  { value: 'price_asc',    label: 'Price: Low → High' },
  { value: 'price_desc',   label: 'Price: High → Low' },
  { value: 'duration_asc', label: 'Duration: Short first' },
  { value: 'duration_desc',label: 'Duration: Long first'  },
];

const DIFFICULTIES: Difficulty[] = ['All', 'Easy', 'Moderate', 'Difficult'];
const TRIP_TYPES: TripType[]     = ['All', 'Group Trip', 'Backpacking', 'Weekend', 'Spiritual'];

const difficultyDot: Record<string, string> = {
  Easy: '#10b981',
  Moderate: '#f59e0b',
  Difficult: '#ef4444',
};

// ── Sort helper ────────────────────────────────────────────────────────────────
function sortPlaces(places: Place[], key: SortKey): Place[] {
  const arr = [...places];
  switch (key) {
    case 'price_asc':    return arr.sort((a, b) => a.price    - b.price);
    case 'price_desc':   return arr.sort((a, b) => b.price    - a.price);
    case 'duration_asc': return arr.sort((a, b) => a.duration - b.duration);
    case 'duration_desc':return arr.sort((a, b) => b.duration - a.duration);
    default:             return arr;
  }
}

// ── Filter helper ──────────────────────────────────────────────────────────────
function filterPlaces(places: Place[], difficulty: Difficulty, tripType: TripType, maxPrice: number): Place[] {
  return places.filter(p => {
    const matchD  = difficulty === 'All' || p.difficulty === difficulty;
    const matchT  = tripType   === 'All' || p.tag        === tripType;
    const matchP  = p.price <= maxPrice;
    return matchD && matchT && matchP;
  });
}

// ── Component ──────────────────────────────────────────────────────────────────
const AllTreks: React.FC = () => {
  const [sort,       setSort]       = useState<SortKey>('default');
  const [difficulty, setDifficulty] = useState<Difficulty>('All');
  const [tripType,   setTripType]   = useState<TripType>('All');
  const [maxPrice,   setMaxPrice]   = useState<number>(15000);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Compute globally for result count
  const allPlaces = useMemo(
    () => regionData.flatMap(r => r.places),
    []
  );
  const filtered = useMemo(
    () => filterPlaces(allPlaces, difficulty, tripType, maxPrice),
    [allPlaces, difficulty, tripType, maxPrice]
  );

  const totalShown = filtered.length;

  const getProcessedPlaces = (places: Place[]) =>
    sortPlaces(filterPlaces(places, difficulty, tripType, maxPrice), sort);

  const hasActiveFilters = difficulty !== 'All' || tripType !== 'All' || maxPrice < 15000;

  const resetFilters = () => {
    setDifficulty('All');
    setTripType('All');
    setMaxPrice(15000);
    setSort('default');
  };

  return (
    <div className="all-treks-page">
      {/* ── Header ── */}
      <div className="all-treks__header">
        <motion.h1
          className="all-treks__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore All Treks
        </motion.h1>
        <motion.p
          className="all-treks__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Discover our complete collection of handcrafted mountain journeys and expeditions.
        </motion.p>
      </div>

      {/* ── Controls bar ── */}
      <div className="at-controls">
        <div className="at-controls__inner">

          {/* Left: result count + filter toggle */}
          <div className="at-controls__left">
            <span className="at-result-count">
              <span className="at-result-count__num">{totalShown}</span> treks found
            </span>
            <button
              className={`at-filter-toggle ${filtersOpen ? 'active' : ''} ${hasActiveFilters ? 'has-filters' : ''}`}
              onClick={() => setFiltersOpen(o => !o)}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
              </svg>
              Filters
              {hasActiveFilters && <span className="at-filter-dot" />}
            </button>
          </div>

          {/* Right: sort */}
          <div className="at-controls__right">
            <label className="at-select-label" htmlFor="at-sort">Sort by</label>
            <select
              id="at-sort"
              className="at-select"
              value={sort}
              onChange={e => setSort(e.target.value as SortKey)}
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Filter panel ── */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              className="at-filter-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div className="at-filter-panel__inner">

                {/* Difficulty */}
                <div className="at-filter-group">
                  <span className="at-filter-group__label">Difficulty</span>
                  <div className="at-chip-row">
                    {DIFFICULTIES.map(d => (
                      <button
                        key={d}
                        className={`at-chip ${difficulty === d ? 'active' : ''}`}
                        onClick={() => setDifficulty(d)}
                        style={difficulty === d && d !== 'All' ? { borderColor: difficultyDot[d], color: difficultyDot[d] } : {}}
                      >
                        {d !== 'All' && (
                          <span
                            className="at-chip__dot"
                            style={{ background: difficultyDot[d] }}
                          />
                        )}
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trip type */}
                <div className="at-filter-group">
                  <span className="at-filter-group__label">Trip Type</span>
                  <div className="at-chip-row">
                    {TRIP_TYPES.map(t => (
                      <button
                        key={t}
                        className={`at-chip ${tripType === t ? 'active' : ''}`}
                        onClick={() => setTripType(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Max price */}
                <div className="at-filter-group at-filter-group--price">
                  <span className="at-filter-group__label">
                    Max Price&nbsp;
                    <strong>₹{maxPrice.toLocaleString('en-IN')}</strong>
                  </span>
                  <input
                    type="range"
                    className="at-range"
                    min={1500}
                    max={15000}
                    step={500}
                    value={maxPrice}
                    onChange={e => setMaxPrice(Number(e.target.value))}
                  />
                  <div className="at-range-labels">
                    <span>₹1,500</span>
                    <span>₹15,000</span>
                  </div>
                </div>

                {/* Reset */}
                {hasActiveFilters && (
                  <button className="at-reset-btn" onClick={resetFilters}>
                    Reset all filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Grid ── */}
      <div className="all-treks__grid-container">
        {regionData.map((region) => {
          const places = getProcessedPlaces(region.places);
          if (places.length === 0) return null;
          return (
            <div key={region.id} className="all-treks__category">
              <h2 className="all-treks__category-title">
                {region.title}
                <span className="all-treks__category-count">{places.length}</span>
              </h2>
              <AnimatePresence mode="popLayout">
                <div className="all-treks__grid">
                  {places.map((place, index) => (
                    <RegionCard key={place.id} place={place} index={index % 10} />
                  ))}
                </div>
              </AnimatePresence>
            </div>
          );
        })}

        {totalShown === 0 && (
          <motion.div
            className="at-empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="at-empty__icon">🏔️</span>
            <p>No treks match your filters.</p>
            <button className="at-reset-btn" onClick={resetFilters}>Reset Filters</button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllTreks;
