import React, { useState } from 'react';
import { useTripPlanner } from '../../context/TripPlannerContext';
import { getDestinationData } from '../../data/plannerData';
import { FaCompass, FaCheck } from 'react-icons/fa';

const Step6_Activities: React.FC = () => {
  const { tripPlan, toggleActivityForStop } = useTripPlanner();
  const [activeStopIndex, setActiveStopIndex] = useState(0);

  const activeStop = tripPlan.stops[activeStopIndex];
  if (!activeStop) return null;

  const destData = getDestinationData(activeStop.destinationId);
  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

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
              <FaCompass /> {stop.name}
            </button>
          ))}
        </div>
      )}

      {destData.activities.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#888', background: 'var(--color-bg-tertiary)', borderRadius: '12px' }}>
          No pre-bookable activities available here yet.
        </div>
      ) : (
        <div className="tp-activity-grid">
          {destData.activities.map(act => {
            const isSelected = activeStop.selectedActivities.includes(act.id);
            
            return (
              <div 
                key={act.id} 
                className={`tp-activity-card ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleActivityForStop(activeStop.destinationId, act.id)}
              >
                <div className="tp-activity-icon">{act.icon}</div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{act.name}</h4>
                  <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>
                    {act.duration} • {act.category}
                  </div>
                  <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.85rem', color: '#555', lineHeight: 1.3 }}>
                    {act.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>
                      +{formatPrice(act.price)}
                    </span>
                    
                    <div style={{ 
                      width: '20px', height: '20px', 
                      borderRadius: '4px', 
                      border: `1px solid ${isSelected ? 'var(--color-success)' : '#ccc'}`,
                      background: isSelected ? 'var(--color-success)' : 'transparent',
                      color: 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {isSelected && <FaCheck size={12} />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Step6_Activities;
