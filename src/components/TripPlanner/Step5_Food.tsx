import React, { useState } from 'react';
import { useTripPlanner } from '../../context/TripPlannerContext';
import { getDestinationData } from '../../data/plannerData';
import type { MealPlan } from '../../types/planner';
import { FaUtensils, FaCheckCircle, FaStar } from 'react-icons/fa';

const Step5_Food: React.FC = () => {
  const { tripPlan, setMealPlanForStop } = useTripPlanner();
  const [activeStopIndex, setActiveStopIndex] = useState(0);

  const activeStop = tripPlan.stops[activeStopIndex];
  if (!activeStop) return null;

  const destData = getDestinationData(activeStop.destinationId);

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

  const renderMealPlan = (mealPlan: MealPlan) => {
    const pkg = destData.mealPackages.find(m => m.plan === mealPlan);
    if (!pkg) return null;

    const isSelected = activeStop.mealPlan === mealPlan;
    const totalCost = pkg.pricePerDay * activeStop.days;

    return (
      <div 
        key={pkg.plan}
        className={`tp-transport-card ${isSelected ? 'selected' : ''}`}
        onClick={() => setMealPlanForStop(activeStop.destinationId, mealPlan)}
        style={{ padding: '1.5rem', textAlign: 'left', display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div style={{ fontSize: '2rem' }}>{pkg.emoji}</div>
          {isSelected && (
            <div style={{ color: 'var(--color-primary)' }}>
              <FaCheckCircle size={24} />
            </div>
          )}
        </div>
        
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{pkg.label}</h4>
        
        <div style={{ flex: 1 }}>
          {pkg.includes.length > 0 ? (
            <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.9rem', color: '#555' }}>
              {pkg.includes.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '0.25rem' }}>{item}</li>
              ))}
            </ul>
          ) : (
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#888' }}>Explore local food on your own</p>
          )}
        </div>
        
        <div style={{ marginTop: '1.5rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
              +{formatPrice(totalCost)}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#888' }}>
              ({formatPrice(pkg.pricePerDay)}/day)
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {tripPlan.stops.length > 1 && (
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {tripPlan.stops.map((stop, idx) => (
            <button
              key={stop.destinationId}
              onClick={() => setActiveStopIndex(idx)}
              style={{
                padding: '0.5rem 1rem',
                border: 'none',
                background: activeStopIndex === idx ? 'var(--color-primary)' : 'var(--color-bg-tertiary)',
                color: activeStopIndex === idx ? 'white' : 'inherit',
                borderRadius: '50px',
                fontWeight: 600,
                fontSize: '0.9rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <FaUtensils /> {stop.name}
            </button>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {renderMealPlan('none')}
        {renderMealPlan('basic')}
        {renderMealPlan('fullboard')}
      </div>

      {destData.restaurants.length > 0 && (
        <div style={{ background: 'var(--color-bg-secondary)', padding: '1.5rem', borderRadius: '12px' }}>
          <h4 style={{ margin: '0 0 1rem 0' }}>Top Rated Places to Eat Here</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {destData.restaurants.map((rest, idx) => (
              <div key={idx} style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <strong style={{ fontSize: '0.95rem' }}>{rest.name}</strong>
                  <span style={{ color: '#f59e0b', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <FaStar /> {rest.rating}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#666' }}>
                  <span>{rest.cuisine}</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--color-success)' }}>{rest.priceRange}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Step5_Food;
