import React from 'react';
import { motion } from 'framer-motion';
import { useTripPlanner } from '../../context/TripPlannerContext';

const PriceSummaryPanel: React.FC = () => {
  const { priceSummary, tripPlan } = useTripPlanner();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!tripPlan.destinationId) return null;

  return (
    <motion.div 
      className="tp-price-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="tp-price-header">
        <h3>Trip Summary</h3>
        <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Live Update</span>
      </div>
      
      <div className="tp-price-body">
        {priceSummary.transport > 0 && (
          <div className="tp-price-row">
            <span>Transport ({tripPlan.transport})</span>
            <span>{formatPrice(priceSummary.transport)}</span>
          </div>
        )}
        
        {priceSummary.stay > 0 && (
          <div className="tp-price-row">
            <span>Hotels & Stay</span>
            <span>{formatPrice(priceSummary.stay)}</span>
          </div>
        )}
        
        {priceSummary.food > 0 && (
          <div className="tp-price-row">
            <span>Meals</span>
            <span>{formatPrice(priceSummary.food)}</span>
          </div>
        )}
        
        {priceSummary.activities > 0 && (
          <div className="tp-price-row">
            <span>Activities</span>
            <span>{formatPrice(priceSummary.activities)}</span>
          </div>
        )}

        <div className="tp-price-row" style={{ marginTop: '0.5rem', color: '#666' }}>
          <span>Taxes & Convenience (8%)</span>
          <span>{formatPrice(priceSummary.convenienceFee)}</span>
        </div>
        
        <div className="tp-price-row" style={{ color: '#666' }}>
          <span>Personalization Fee</span>
          <span>{formatPrice(priceSummary.personalization)}</span>
        </div>

        <div className="tp-price-row total">
          <span>Total Estimate</span>
          <motion.span 
            key={priceSummary.total}
            initial={{ scale: 1.1, color: 'var(--color-primary)' }}
            animate={{ scale: 1, color: 'var(--color-dark)' }}
          >
            {formatPrice(priceSummary.total)}
          </motion.span>
        </div>
        
        <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '1rem', textAlign: 'center' }}>
          *Prices are estimates based on standard rates.
        </p>
      </div>
    </motion.div>
  );
};

export default PriceSummaryPanel;
