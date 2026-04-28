import React from 'react';
import { useTripPlanner } from '../../context/TripPlannerContext';
import { motion } from 'framer-motion';

const Step3_Duration: React.FC = () => {
  const { tripPlan, setDaysForStop } = useTripPlanner();

  const totalDays = tripPlan.stops.reduce((sum, stop) => sum + stop.days, 0);

  return (
    <div>
      <div style={{ 
        textAlign: 'center', 
        padding: '1.5rem', 
        background: 'var(--color-bg-tertiary)', 
        borderRadius: '12px',
        marginBottom: '2rem' 
      }}>
        <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-primary)' }}>
          Total Trip: {totalDays} {totalDays === 1 ? 'Day' : 'Days'}
        </h3>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
          Adjust the slider for each location
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {tripPlan.stops.map((stop, index) => (
          <div key={stop.destinationId} style={{ 
            padding: '1.5rem', 
            border: '1px solid var(--color-border)', 
            borderRadius: '12px' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ 
                  background: 'var(--color-secondary)', 
                  color: 'white', 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {index + 1}
                </span>
                <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{stop.name}</h4>
              </div>
              <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>
                {stop.days} Days
              </span>
            </div>

            <div style={{ padding: '0 10px' }}>
              <input 
                type="range" 
                min="1" 
                max="14" 
                value={stop.days}
                onChange={(e) => setDaysForStop(stop.destinationId, parseInt(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--color-primary)',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#888', marginTop: '0.5rem' }}>
                <span>1 Day</span>
                <span>14 Days</span>
              </div>
            </div>
            
            {/* Visual indicator bar */}
            <div style={{ marginTop: '1rem', height: '6px', background: '#eee', borderRadius: '3px', overflow: 'hidden' }}>
              <motion.div 
                initial={false}
                animate={{ width: `${(stop.days / 14) * 100}%` }}
                transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                style={{ height: '100%', background: 'var(--color-primary)' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step3_Duration;
