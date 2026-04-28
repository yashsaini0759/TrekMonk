import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import type { Trek } from '../../data/trekData';
import { useUserPreferences } from '../../context/UserPreferencesContext';

interface TrekCardProps {
  trek: Trek;
  index: number;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: '#10b981',
  moderate: '#f59e0b',
  hard: '#ef4444',
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const TrekCard: React.FC<TrekCardProps> = ({ trek, index }) => {
  const { recordClick, preferences } = useUserPreferences();
  const navigate = useNavigate();

  const isCurrentlyViewed = preferences.activeTrekId === trek.id;

  const handleClick = () => {
    recordClick(trek);
    navigate(`/trek/${trek.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      className={`trek-card${isCurrentlyViewed ? ' trek-card--active' : ''}`}
      custom={index}
      variants={cardVariants}
      whileHover={{ scale: isCurrentlyViewed ? 1.01 : 1.03, y: -6 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
      aria-label={`View ${trek.name}${isCurrentlyViewed ? ' (currently viewing)' : ''}`}
      aria-current={isCurrentlyViewed ? 'true' : undefined}
    >
      {/* "Currently Viewing" badge */}
      {isCurrentlyViewed && (
        <div className="trek-card__viewing-badge">
          <FiEye />
          <span>Viewing</span>
        </div>
      )}

      {/* Image */}
      <div className="trek-card__image-wrap">
        <motion.img
          src={trek.image}
          alt={trek.name}
          className="trek-card__image"
          loading="lazy"
          decoding="async"
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.5 }}
        />
        <div className="trek-card__gradient" />
      </div>

      {/* Difficulty Badge */}
      <span
        className="trek-card__badge"
        style={{ background: DIFFICULTY_COLORS[trek.difficulty] }}
      >
        {trek.difficulty}
      </span>

      {/* Rating */}
      <div className="trek-card__rating">
        <FaStar className="trek-card__star" />
        <span>{trek.rating.toFixed(1)}</span>
      </div>

      {/* Text */}
      <div className="trek-card__text">
        <p className="trek-card__location">{trek.location} &bull; {trek.duration}D</p>
        <h3 className="trek-card__name">{trek.name}</h3>
        <p className="trek-card__price">from ₹{trek.price.toLocaleString('en-IN')}</p>
      </div>
    </motion.div>
  );
};

export default TrekCard;
