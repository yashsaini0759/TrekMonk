import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { Place } from './regionsData';

interface RegionCardProps {
  place: Place;
  index: number;
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  }),
};

const difficultyColors: Record<string, string> = {
  Easy: 'rgba(16, 185, 129, 0.88)',
  Moderate: 'rgba(245, 158, 11, 0.88)',
  Difficult: 'rgba(239, 68, 68, 0.88)',
};

const RegionCard: React.FC<RegionCardProps> = ({ place, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/trek/${place.slug}`);
  };

  return (
    <motion.div
      className="region-card"
      custom={index}
      variants={itemVariants}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      style={{ cursor: 'pointer' }}
    >
      <div className="region-card__image-wrap">
        <motion.img
          src={place.image}
          alt={place.name}
          className="region-card__image"
          loading="lazy"
          decoding="async"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7 }}
        />
        <div className="region-card__gradient" />
      </div>

      {/* Trip type tag — top left */}
      <span className="region-card__tag" data-type={place.tag}>{place.tag}</span>

      {/* Price badge — top right */}
      {place.price > 0 && (
        <span className="region-card__price">₹{place.price.toLocaleString('en-IN')}</span>
      )}

      <div className="region-card__content">
        <h3 className="region-card__title">{place.name}</h3>

        {/* Meta row: duration + difficulty */}
        <div className="region-card__meta">
          {place.duration > 0 && (
            <span className="region-card__meta-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {place.duration}D
            </span>
          )}
          {place.difficulty && (
            <span
              className="region-card__meta-item region-card__difficulty"
              style={{ background: difficultyColors[place.difficulty] ?? 'rgba(100,100,100,0.8)' }}
            >
              {place.difficulty}
            </span>
          )}
        </div>
      </div>

      {/* Glow highlight effect */}
      <div className="region-card__glow-highlight" />
    </motion.div>
  );
};

export default RegionCard;
