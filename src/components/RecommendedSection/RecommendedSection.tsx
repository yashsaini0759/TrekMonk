import React, { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiRefreshCw } from 'react-icons/fi';
import { useUserPreferences } from '../../context/UserPreferencesContext';
import { getRecommendations } from '../../engine/recommendationEngine';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import TrekCard from './TrekCard';
import './RecommendedSection.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const RecommendedSection: React.FC = () => {
  const { preferences, refreshKey, refreshRecommendations } = useUserPreferences();
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -80px 0px' });

  const recommendations = useMemo(
    () => getRecommendations(preferences, 8, refreshKey),
    [preferences, refreshKey],
  );

  const hasHistory = preferences.clickedTreks.length > 0;
  const lastViewed = preferences.lastViewedName;

  const scrollLeft = () => carouselRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  const scrollRight = () => carouselRef.current?.scrollBy({ left: 320, behavior: 'smooth' });

  return (
    <section ref={sectionRef} className="recommended-section">
      <div className="recommended-section__container">
        {/* Header */}
        <motion.div
          className="recommended-section__header"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <div className="recommended-section__title-group">
            <h2 className="recommended-section__title">Recommended for You</h2>
            <p className="recommended-section__subtitle">
              {hasHistory && lastViewed
                ? `Because you viewed ${lastViewed}`
                : 'Based on trending treks across India'}
            </p>
          </div>
          <button
            className="recommended-section__refresh"
            onClick={refreshRecommendations}
            aria-label="Refresh recommendations"
          >
            <FiRefreshCw />
            <span>Refresh</span>
          </button>
        </motion.div>

        {/* Carousel */}
        <div className="recommended-section__carousel-wrapper">
          <button className="recommended-section__nav left" onClick={scrollLeft} aria-label="Scroll left">
            <FaChevronLeft />
          </button>

          <motion.div
            ref={carouselRef}
            className="recommended-section__carousel"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {recommendations.map((trek, i) => (
              <TrekCard key={`${trek.id}-${refreshKey}`} trek={trek} index={i} />
            ))}
          </motion.div>

          <button className="recommended-section__nav right" onClick={scrollRight} aria-label="Scroll right">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecommendedSection;
