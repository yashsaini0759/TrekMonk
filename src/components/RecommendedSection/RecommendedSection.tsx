import React, { useMemo, useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiRefreshCw } from 'react-icons/fi';
import { useUserPreferences } from '../../context/UserPreferencesContext';
import { getRecommendations } from '../../engine/recommendationEngine';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import TrekCard from './TrekCard';
import './RecommendedSection.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

const RecommendedSection: React.FC = () => {
  const { preferences, refreshKey, refreshRecommendations } = useUserPreferences();
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const recommendations = useMemo(
    () => getRecommendations(preferences, 8, refreshKey),
    [preferences, refreshKey],
  );

  const hasHistory = preferences.clickedTreks.length > 0;
  const lastViewed = preferences.lastViewedName;

  const scrollLeft  = () => carouselRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  const scrollRight = () => carouselRef.current?.scrollBy({ left: 320, behavior: 'smooth' });

  // Scroll the "currently viewed" card into view whenever the active trek changes
  useEffect(() => {
    if (!preferences.activeTrekId || !carouselRef.current) return;
    const activeCard = carouselRef.current.querySelector('.trek-card--active') as HTMLElement | null;
    if (activeCard) {
      activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [preferences.activeTrekId, refreshKey]);

  const handleRefresh = () => {
    setIsSpinning(true);
    refreshRecommendations();
    setTimeout(() => setIsSpinning(false), 600);
  };

  return (
    <section ref={sectionRef} className="recommended-section">
      <div className="recommended-section__container">
        {/* Header */}
        <motion.div
          className="recommended-section__header"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
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
            onClick={handleRefresh}
            aria-label="Refresh recommendations"
          >
            <FiRefreshCw className={isSpinning ? 'spinning' : ''} />
            <span>Refresh</span>
          </button>
        </motion.div>

        {/* Carousel */}
        <div className="recommended-section__carousel-wrapper">
          <button
            className="recommended-section__nav left"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <FaChevronLeft />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={refreshKey}
              ref={carouselRef}
              className="recommended-section__carousel"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {recommendations.map((trek, i) => (
                <TrekCard
                  key={`${trek.id}-${refreshKey}`}
                  trek={trek}
                  index={i}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          <button
            className="recommended-section__nav right"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecommendedSection;
