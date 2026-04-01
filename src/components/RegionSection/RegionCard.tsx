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

      <span className="region-card__tag" data-type={place.tag}>{place.tag}</span>

      <div className="region-card__content">
        <h3 className="region-card__title">{place.name}</h3>
      </div>
      
      {/* Glow highlight effect */}
      <div className="region-card__glow-highlight" />
    </motion.div>
  );
};

export default RegionCard;
