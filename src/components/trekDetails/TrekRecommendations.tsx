import React, { useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaChevronLeft, FaChevronRight, FaTag } from 'react-icons/fa';
import { FiCompass } from 'react-icons/fi';
import { getCardRecommendations } from '../../engine/recommendationEngine';
import { useUserPreferences } from '../../context/UserPreferencesContext';
import type { Trek } from '../../data/trekData';
import './TrekRecommendations.css';

interface Props {
  trek: Trek;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: '#10b981',
  moderate: '#f59e0b',
  hard: '#ef4444',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.48, ease: 'easeOut' as const },
  }),
};

/** Identify shared attributes between source and a recommendation for display */
function getMatchReasons(source: Trek, rec: Trek): string[] {
  const reasons: string[] = [];
  if (source.region === rec.region) reasons.push('Same region');
  if (source.difficulty === rec.difficulty) reasons.push(rec.difficulty);
  const sharedTags = source.tags.filter(t =>
    rec.tags.some(rt => rt.toLowerCase() === t.toLowerCase())
  );
  if (sharedTags.length > 0) reasons.push(sharedTags[0]);
  return reasons.slice(0, 2);
}

const TrekRecommendations: React.FC<Props> = ({ trek }) => {
  const { recordClick } = useUserPreferences();
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);

  const recommendations = useMemo(
    () => getCardRecommendations(trek, 8),
    [trek.id], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const scrollLeft  = () => carouselRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  const scrollRight = () => carouselRef.current?.scrollBy({ left:  320, behavior: 'smooth' });

  const handleClick = (rec: Trek) => {
    recordClick(rec);
    navigate(`/trek/${rec.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!recommendations.length) return null;

  return (
    <section className="tr-section td-section">
      {/* Header */}
      <div className="tr-header">
        <div className="tr-header__left">
          <span className="tr-header__icon"><FiCompass /></span>
          <div>
            <h2 className="tr-header__title">Similar Treks You'll Love</h2>
            <p className="tr-header__sub">Based on {trek.name}</p>
          </div>
        </div>
        <div className="tr-header__count">
          {recommendations.length} picks
        </div>
      </div>

      {/* Carousel */}
      <div className="tr-carousel-wrap">
        <button className="tr-nav left"  onClick={scrollLeft}  aria-label="Scroll left">
          <FaChevronLeft />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={trek.id}
            ref={carouselRef}
            className="tr-carousel"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {recommendations.map((rec, i) => {
              const matchReasons = getMatchReasons(trek, rec);
              return (
                <motion.div
                  key={rec.id}
                  className="tr-card"
                  custom={i}
                  variants={cardVariants}
                  whileHover={{ scale: 1.03, y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleClick(rec)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && handleClick(rec)}
                  aria-label={`View ${rec.name}`}
                >
                  {/* Image */}
                  <div className="tr-card__img-wrap">
                    <motion.img
                      src={rec.image}
                      alt={rec.name}
                      className="tr-card__img"
                      loading="lazy"
                      decoding="async"
                      whileHover={{ scale: 1.07 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="tr-card__gradient" />
                  </div>

                  {/* Difficulty badge */}
                  <span
                    className="tr-card__badge"
                    style={{ background: DIFFICULTY_COLORS[rec.difficulty] }}
                  >
                    {rec.difficulty}
                  </span>

                  {/* Rating */}
                  <div className="tr-card__rating">
                    <FaStar className="tr-card__star" />
                    <span>{rec.rating.toFixed(1)}</span>
                  </div>

                  {/* Match reasons pills */}
                  {matchReasons.length > 0 && (
                    <div className="tr-card__reasons">
                      {matchReasons.map(r => (
                        <span key={r} className="tr-card__reason-pill">
                          <FaTag /> {r}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Text */}
                  <div className="tr-card__text">
                    <p className="tr-card__location">{rec.location} &bull; {rec.duration}D</p>
                    <h3 className="tr-card__name">{rec.name}</h3>
                    <p className="tr-card__price">from ₹{rec.price.toLocaleString('en-IN')}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <button className="tr-nav right" onClick={scrollRight} aria-label="Scroll right">
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default TrekRecommendations;
