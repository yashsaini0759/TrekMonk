import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTripPlanner } from '../../context/TripPlannerContext';
import PriceSummaryPanel from './PriceSummaryPanel';
import { FaCheck } from 'react-icons/fa';

interface WizardShellProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  onNext?: () => void;
  onBack?: () => void;
  nextLabel?: string;
  isNextDisabled?: boolean;
  showPricePanel?: boolean;
}

const TOTAL_STEPS = 7;

const WizardShell: React.FC<WizardShellProps> = ({
  children,
  title,
  subtitle,
  onNext,
  onBack,
  nextLabel = 'Continue',
  isNextDisabled = false,
  showPricePanel = true,
}) => {
  const { currentStep } = useTripPlanner();

  const handleNext = () => {
    if (onNext) onNext();
  };

  const handleBack = () => {
    if (onBack) onBack();
  };

  return (
    <div className="tp-container container">
      <div className="tp-header">
        <h1>Design Your Dream Trip</h1>
        <p>Customise every detail. See prices live.</p>
      </div>

      {/* Progress Bar */}
      <div className="tp-progress-bar">
        {Array.from({ length: TOTAL_STEPS }).map((_, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div
              key={stepNum}
              className={`tp-progress-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              {isCompleted ? <FaCheck size={12} /> : stepNum}
            </div>
          );
        })}
      </div>

      <div className="tp-wizard-layout">
        {/* Main Content Area */}
        <div className="tp-step-content">
          <div className="tp-step-header">
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          <div className="tp-step-body">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="tp-nav-buttons">
            <button
              className="tp-btn tp-btn-secondary"
              onClick={handleBack}
              disabled={currentStep === 1}
              style={{ visibility: currentStep === 1 ? 'hidden' : 'visible' }}
            >
              Back
            </button>
            <button
              className="tp-btn tp-btn-primary"
              onClick={handleNext}
              disabled={isNextDisabled}
            >
              {nextLabel}
            </button>
          </div>
        </div>

        {/* Right Sidebar (Price Panel) */}
        <div>
          {showPricePanel && <PriceSummaryPanel />}
        </div>
      </div>
    </div>
  );
};

export default WizardShell;
