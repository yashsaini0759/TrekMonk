import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import type { Trek } from '../../data/trekData';

interface Props { trek: Trek }

const DIFFICULTY_COLORS = { easy: '#16a34a', moderate: '#d97706', hard: '#dc2626' };

const TrekHero: React.FC<Props> = ({ trek }) => {
  const d = trek.details;
  return (
    <section className="td-hero">
      <motion.img
        src={trek.image}
        alt={trek.name}
        className="td-hero__img"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
      <div className="td-hero__gradient" />
      <motion.div
        className="td-hero__content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="td-hero__breadcrumb">
          <Link to="/">Home</Link>
          <FiChevronRight size={12} />
          <Link to="/all-treks">Treks</Link>
          <FiChevronRight size={12} />
          <span style={{ color: 'white' }}>{trek.name}</span>
        </div>

        <div className="td-hero__tags">
          <span className="td-hero__tag" style={{ background: DIFFICULTY_COLORS[trek.difficulty] }}>
            {trek.difficulty}
          </span>
          {d?.bestTime && (
            <span className="td-hero__tag">Best: {d.bestTime}</span>
          )}
          {d?.seatsLeft && d.seatsLeft <= 8 && (
            <span className="td-hero__tag td-hero__tag--seats">Only {d.seatsLeft} seats left</span>
          )}
        </div>

        <h1 className="td-hero__title">{trek.name}</h1>
        <p className="td-hero__subtitle">
          {trek.location} &bull; {trek.duration} Days &bull; {trek.altitude.toLocaleString()}m altitude
        </p>
      </motion.div>
    </section>
  );
};

export default TrekHero;
