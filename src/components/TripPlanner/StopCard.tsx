import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTripPlanner } from '../../context/TripPlannerContext';
import { getRouteConfig } from '../../data/routeData';
import { FaChevronDown, FaChevronUp, FaHotel, FaUtensils, FaCamera, FaCheckCircle, FaTrash } from 'react-icons/fa';

interface StopCardProps {
  stopId: string;
  index: number;
  totalStops: number;
}

const StopCard: React.FC<StopCardProps> = ({ stopId, index, totalStops }) => {
  const { tripPlan, updateStopSelection, toggleStopCollapsed, toggleStopIncluded, toggleActivity } = useTripPlanner();
  
  const selection = tripPlan.stopSelections.find(s => s.stopId === stopId);
  const route = getRouteConfig(tripPlan.pickupId, tripPlan.destinationId);
  const node = route?.stops.find(s => s.id === stopId);

  if (!selection || !node) return null;

  const isFinalStop = index === totalStops - 1;

  if (!selection.isIncluded) {
    return (
      <div className="tp-stop-card skipped">
        <div className="tp-stop-header flex-between">
          <div>
            <span style={{ color: '#888', textDecoration: 'line-through' }}>{node.name}</span>
            <span style={{ fontSize: '0.8rem', marginLeft: '1rem', color: '#888' }}>Skipped</span>
          </div>
          <button className="tp-btn tp-btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }} onClick={() => toggleStopIncluded(stopId)}>
            + Add back to route
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`tp-stop-card ${selection.isCollapsed ? 'collapsed' : ''}`} id={`stop-${stopId}`}>
      {/* Header (always visible) */}
      <div className="tp-stop-header flex-between" onClick={() => toggleStopCollapsed(stopId)} style={{ cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="tp-stop-badge">{index + 1}</div>
          <div>
            <h3 style={{ margin: 0 }}>{node.name} {isFinalStop && '(Final Destination)'}</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
              {node.travelTimeFromPrevHours} hrs from previous stop • {selection.days} {selection.days === 1 ? 'Day' : 'Days'}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {!isFinalStop && node.isOptional && (
            <button 
              className="tp-icon-btn" 
              onClick={(e) => { e.stopPropagation(); toggleStopIncluded(stopId); }}
              title="Remove this stop"
            >
              <FaTrash />
            </button>
          )}
          {selection.isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
        </div>
      </div>

      {/* Body (Expandable) */}
      <AnimatePresence>
        {!selection.isCollapsed && (
          <motion.div 
            className="tp-stop-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
              
              {/* Duration Slider */}
              <div className="tp-form-group">
                <label className="tp-label">How many days?</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input 
                    type="range" 
                    min="1" 
                    max="7" 
                    value={selection.days}
                    onChange={(e) => updateStopSelection(stopId, { days: parseInt(e.target.value) })}
                    style={{ flex: 1 }}
                  />
                  <span style={{ fontWeight: 'bold', width: '60px' }}>{selection.days} Days</span>
                </div>
              </div>

              {/* Hotels */}
              <div className="tp-form-group" style={{ marginTop: '2rem' }}>
                <label className="tp-label flex" style={{ alignItems: 'center', gap: '0.5rem' }}>
                  <FaHotel color="var(--color-primary)" /> Select Stay ({node.hotels.length} options)
                </label>
                <div className="tp-hotel-grid">
                  {node.hotels.map(hotel => (
                    <div 
                      key={hotel.id}
                      className={`tp-hotel-card ${selection.hotelId === hotel.id ? 'selected' : ''}`}
                      onClick={() => updateStopSelection(stopId, { hotelId: hotel.id })}
                    >
                      <img src={hotel.image} alt={hotel.name} className="tp-hotel-img" />
                      <div className="tp-hotel-info">
                        <div className="flex-between">
                          <span style={{ fontWeight: 'bold' }}>{hotel.name}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)' }}>★ {hotel.rating}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>
                          {hotel.tier.toUpperCase()} • ₹{hotel.pricePerNight}/night
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '4px' }}>
                          {hotel.amenities.join(' • ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meals */}
              <div className="tp-form-group" style={{ marginTop: '2rem' }}>
                <label className="tp-label flex" style={{ alignItems: 'center', gap: '0.5rem' }}>
                  <FaUtensils color="var(--color-primary)" /> Meal Package
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                  {node.mealPackages.map(meal => (
                    <div 
                      key={meal.plan}
                      className={`tp-hotel-card ${selection.mealPlan === meal.plan ? 'selected' : ''}`}
                      style={{ padding: '1rem', cursor: 'pointer', textAlign: 'center' }}
                      onClick={() => updateStopSelection(stopId, { mealPlan: meal.plan })}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{meal.emoji}</div>
                      <div style={{ fontWeight: 'bold' }}>{meal.label}</div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>
                        {meal.pricePerDay === 0 ? 'Explore Local' : `+₹${meal.pricePerDay}/day`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activities */}
              {node.activities.length > 0 && (
                <div className="tp-form-group" style={{ marginTop: '2rem' }}>
                  <label className="tp-label flex" style={{ alignItems: 'center', gap: '0.5rem' }}>
                    <FaCamera color="var(--color-primary)" /> Local Activities
                  </label>
                  <div className="tp-activity-grid">
                    {node.activities.map(act => {
                      const isSelected = selection.selectedActivityIds.includes(act.id);
                      return (
                        <div 
                          key={act.id}
                          className={`tp-activity-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => toggleActivity(stopId, act.id)}
                        >
                          <div className="tp-activity-icon">{act.icon}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{act.name}</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>{act.duration} • ₹{act.price}</div>
                          </div>
                          <div style={{ color: isSelected ? 'var(--color-success)' : '#ccc' }}>
                            <FaCheckCircle />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StopCard;
