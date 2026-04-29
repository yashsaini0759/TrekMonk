import React, { useEffect, useState } from 'react';
import { TripPlannerProvider, useTripPlanner } from '../../context/TripPlannerContext';
import RouteSetup from '../../components/TripPlanner/RouteSetup';
import StopCustomizer from '../../components/TripPlanner/StopCustomizer';
import BookingSummary from '../../components/TripPlanner/BookingSummary';
import RouteSummaryBar from '../../components/TripPlanner/RouteSummaryBar';
import PriceSummaryPanel from '../../components/TripPlanner/PriceSummaryPanel';
// import AIChatbot from '../../components/TripPlanner/AIChatbot';
import { AnimatePresence, motion } from 'framer-motion';
import '../../components/TripPlanner/TripPlanner.css';

const TripPlannerFlow: React.FC = () => {
  const { phase } = useTripPlanner();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top on phase change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [phase]);

  // Track scroll for 'Back to Top' button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="tp-container">
      {/* Show horizontal route bar in Phase 2 */}
      {phase === 'customize' && <RouteSummaryBar />}

      <div className="container" style={{ marginTop: phase === 'customize' ? '2rem' : '4rem' }}>
        
        {phase === 'setup' && (
          <div className="tp-header">
            <h1>Design Your Dream Trip</h1>
            <p>Smart geographic routing with custom stays, food, and activities.</p>
          </div>
        )}

        <div className={phase === 'customize' ? 'tp-wizard-layout' : ''}>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%' }}
            >
              {phase === 'setup' && <RouteSetup />}
              {phase === 'customize' && <StopCustomizer />}
              {phase === 'review' && <BookingSummary />}
            </motion.div>
          </AnimatePresence>

          {/* Side Price Panel ONLY in customize phase */}
          {phase === 'customize' && (
            <div>
              <PriceSummaryPanel />
            </div>
          )}

        </div>
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="tp-scroll-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Back to Top"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

const TripPlannerPage: React.FC = () => {
  return (
    <TripPlannerProvider>
      <TripPlannerFlow />
    </TripPlannerProvider>
  );
};

export default TripPlannerPage;
