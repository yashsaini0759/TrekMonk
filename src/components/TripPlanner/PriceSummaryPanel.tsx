import React from 'react';
import { useTripPlanner } from '../../context/TripPlannerContext';

const PriceSummaryPanel: React.FC = () => {
  const { priceSummary, tripPlan } = useTripPlanner();

  return (
    <div className="tp-price-panel sticky" style={{ top: '180px', zIndex: 10 }}>
      <div className="tp-price-header">
        <h3>Live Price Estimate</h3>
      </div>
      <div className="tp-price-body">
        
        {tripPlan.transport && (
          <div className="tp-price-row">
            <span>Transport ({tripPlan.transport})</span>
            <span>₹{priceSummary.transport.toLocaleString()}</span>
          </div>
        )}
        
        {priceSummary.stopCosts.map((stop, i) => (
          <div key={stop.stopId} style={{ marginTop: '1rem', paddingBottom: '1rem', borderBottom: '1px dashed #ddd' }}>
            <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              {i + 1}. {stop.stopName}
            </div>
            <div className="tp-price-row" style={{ paddingLeft: '1rem', fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>
              <span>Stay</span>
              <span>₹{stop.stay.toLocaleString()}</span>
            </div>
            <div className="tp-price-row" style={{ paddingLeft: '1rem', fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>
              <span>Food</span>
              <span>₹{stop.food.toLocaleString()}</span>
            </div>
            <div className="tp-price-row" style={{ paddingLeft: '1rem', fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>
              <span>Activities</span>
              <span>₹{stop.activities.toLocaleString()}</span>
            </div>
          </div>
        ))}
        
        {priceSummary.stopCosts.length > 0 && (
          <>
            <div className="tp-price-row" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
              <span style={{ fontWeight: 600 }}>Subtotal</span>
              <span style={{ fontWeight: 600 }}>₹{priceSummary.subtotal.toLocaleString()}</span>
            </div>
            <div className="tp-price-row" style={{ marginTop: '0.5rem' }}>
              <span>Platform Fee (8%)</span>
              <span>₹{priceSummary.convenienceFee.toLocaleString()}</span>
            </div>
            <div className="tp-price-row">
              <span>Taxes (5% GST)</span>
              <span>₹{priceSummary.taxes.toLocaleString()}</span>
            </div>
          </>
        )}

        <div className="tp-price-row total" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '2px dashed var(--color-border)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
          <span>Total</span>
          <span>₹{priceSummary.total.toLocaleString()}</span>
        </div>
        
        <div className="text-center" style={{ marginTop: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
          ₹{priceSummary.perPerson.toLocaleString()} <span style={{ opacity: 0.8 }}>per person</span>
        </div>
        
      </div>
    </div>
  );
};

export default PriceSummaryPanel;
