import React from 'react';
import { useTripPlanner } from '../../context/TripPlannerContext';
import StopCard from './StopCard';
import { getRouteConfig } from '../../data/routeData';

const StopCustomizer: React.FC = () => {
  const { tripPlan, setPhase } = useTripPlanner();
  const route = getRouteConfig(tripPlan.pickupId, tripPlan.destinationId);

  if (!route) return null;

  // Validation: are all included stops configured? (i.e. hotel selected)
  const isReady = tripPlan.stopSelections
    .filter(s => s.isIncluded)
    .every(s => s.hotelId !== null);

  return (
    <div className="tp-step-content" style={{ padding: '0', background: 'transparent', boxShadow: 'none' }}>
      <div className="tp-step-header text-center" style={{ marginBottom: '2rem' }}>
        <h2>Customize Your Stops</h2>
        <p>Your route is set. Now configure your stay, meals, and activities for each stop.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {route.stops
          .filter(node => tripPlan.stopSelections.find(s => s.stopId === node.id)?.isIncluded)
          .map((node, index, arr) => (
            <StopCard 
              key={node.id} 
              stopId={node.id} 
              index={index} 
              totalStops={arr.length} 
            />
          ))
        }
      </div>

      <div className="tp-nav-buttons" style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', marginTop: '2rem', boxShadow: 'var(--shadow-sm)' }}>
        <button className="tp-btn tp-btn-secondary" onClick={() => setPhase('setup')}>
          Back to Route
        </button>
        <button 
          className="tp-btn tp-btn-primary" 
          disabled={!isReady}
          onClick={() => setPhase('review')}
        >
          {isReady ? 'Review & Book' : 'Please select a hotel for all stops'}
        </button>
      </div>
    </div>
  );
};

export default StopCustomizer;
