import React, { useState, useEffect } from 'react';
import { useTripPlanner } from '../../context/TripPlannerContext';
import { getDestinationData, PLANNER_DESTINATIONS } from '../../data/plannerData';
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown, FaMagic } from 'react-icons/fa';

const Step2_Stops: React.FC = () => {
  const { tripPlan, addStop, removeStop, reorderStops } = useTripPlanner();
  const [selectedNewStop, setSelectedNewStop] = useState('');
  const [suggested, setSuggested] = useState<string[]>([]);

  useEffect(() => {
    if (tripPlan.destinationId) {
      const data = getDestinationData(tripPlan.destinationId);
      setSuggested(data.suggestedStops || []);
    }
  }, [tripPlan.destinationId]);

  const handleAddStop = () => {
    if (!selectedNewStop) return;
    const dest = PLANNER_DESTINATIONS.find(d => d.id === selectedNewStop);
    if (dest) {
      addStop(dest.id, dest.name);
      setSelectedNewStop('');
    }
  };

  const handleAddSuggested = (destId: string) => {
    const dest = PLANNER_DESTINATIONS.find(d => d.id === destId);
    if (dest) addStop(dest.id, dest.name);
  };

  // Available stops to add (not already in plan, not the main destination)
  const availableToAdd = PLANNER_DESTINATIONS.filter(
    d => d.id !== tripPlan.destinationId && !tripPlan.stops.some(s => s.destinationId === d.id)
  );

  return (
    <div>
      <p style={{ marginBottom: '1.5rem', color: '#555' }}>
        Add intermediate places you'd like to visit along the way. You can reorder them to plan your exact route.
      </p>

      {/* Suggested Stops */}
      {suggested.length > 0 && (
        <div style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(255, 107, 53, 0.05)', borderRadius: '8px', border: '1px dashed var(--color-primary-light)' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
            <FaMagic /> AI Suggested Stops
          </h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {suggested.map(destId => {
              const dest = PLANNER_DESTINATIONS.find(d => d.id === destId);
              const isAdded = tripPlan.stops.some(s => s.destinationId === destId);
              if (!dest || isAdded) return null;
              return (
                <button
                  key={destId}
                  className="tp-btn"
                  style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', background: 'white', border: '1px solid var(--color-primary)' }}
                  onClick={() => handleAddSuggested(destId)}
                >
                  <FaPlus size={10} /> Add {dest.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Current Stops List */}
      <div className="tp-stop-list" style={{ marginBottom: '2rem' }}>
        {tripPlan.stops.map((stop, index) => (
          <div key={stop.destinationId} className="tp-stop-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: index === tripPlan.stops.length - 1 ? 'var(--color-primary)' : '#ccc', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                {index + 1}
              </div>
              <span style={{ fontWeight: stop.destinationId === tripPlan.destinationId ? 700 : 500 }}>
                {stop.name} {stop.destinationId === tripPlan.destinationId ? '(Final Destination)' : ''}
              </span>
            </div>

            <div className="tp-stop-actions">
              <button 
                className="tp-icon-btn" 
                onClick={() => reorderStops(index, index - 1)}
                disabled={index === 0}
                style={{ opacity: index === 0 ? 0.3 : 1 }}
                aria-label="Move up"
              >
                <FaArrowUp />
              </button>
              <button 
                className="tp-icon-btn" 
                onClick={() => reorderStops(index, index + 1)}
                disabled={index === tripPlan.stops.length - 1}
                style={{ opacity: index === tripPlan.stops.length - 1 ? 0.3 : 1 }}
                aria-label="Move down"
              >
                <FaArrowDown />
              </button>
              {stop.destinationId !== tripPlan.destinationId && (
                <button 
                  className="tp-icon-btn" 
                  onClick={() => removeStop(stop.destinationId)}
                  style={{ color: 'var(--color-error)' }}
                  aria-label="Remove stop"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Stop */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <select 
          className="tp-select" 
          value={selectedNewStop}
          onChange={(e) => setSelectedNewStop(e.target.value)}
          style={{ flex: 1 }}
        >
          <option value="">Add another place to visit...</option>
          {availableToAdd.map(dest => (
            <option key={dest.id} value={dest.id}>{dest.name}, {dest.state}</option>
          ))}
        </select>
        <button 
          className="tp-btn tp-btn-secondary"
          onClick={handleAddStop}
          disabled={!selectedNewStop}
        >
          Add
        </button>
      </div>

    </div>
  );
};

export default Step2_Stops;
