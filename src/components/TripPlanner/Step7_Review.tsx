import React from 'react';
import { useTripPlanner } from '../../context/TripPlannerContext';
import { getDestinationData } from '../../data/plannerData';
import { FaMapMarkerAlt, FaBed, FaUtensils, FaCompass } from 'react-icons/fa';

const Step7_Review: React.FC = () => {
  const { tripPlan, priceSummary } = useTripPlanner();

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

  let currentDay = 1;

  return (
    <div>
      <div style={{ background: 'var(--color-bg-secondary)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>Itinerary Overview</h3>
        
        {tripPlan.stops.map((stop, index) => {
          const destData = getDestinationData(stop.destinationId);
          const hotel = destData.hotels.find(h => h.id === stop.hotelId);
          const meal = destData.mealPackages.find(m => m.plan === stop.mealPlan);
          const acts = destData.activities.filter(a => stop.selectedActivities.includes(a.id));
          
          const startDay = currentDay;
          const endDay = currentDay + stop.days - 1;
          currentDay += stop.days;

          return (
            <div key={stop.destinationId} style={{ position: 'relative', paddingLeft: '2rem', paddingBottom: '2rem' }}>
              {/* Vertical line connecting timeline nodes */}
              {index < tripPlan.stops.length - 1 && (
                <div style={{ position: 'absolute', left: '7px', top: '24px', bottom: 0, width: '2px', background: 'var(--color-border)' }} />
              )}
              
              {/* Timeline dot */}
              <div style={{ position: 'absolute', left: 0, top: '4px', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--color-primary)' }} />
              
              <div style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Day {startDay} {endDay > startDay ? `- ${endDay}` : ''}
                </span>
                <h4 style={{ margin: '0.25rem 0 0.75rem 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaMapMarkerAlt color="var(--color-secondary)" /> {stop.name}
                </h4>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {hotel && (
                  <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FaBed /> Accommodation
                    </div>
                    <strong>{hotel.name}</strong>
                  </div>
                )}
                
                {meal && meal.plan !== 'none' && (
                  <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FaUtensils /> Meals
                    </div>
                    <strong>{meal.label}</strong>
                  </div>
                )}
                
                {acts.length > 0 && (
                  <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FaCompass /> Activities
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
                      {acts.map(a => <li key={a.id}>{a.name}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ background: 'rgba(39, 174, 96, 0.05)', border: '1px solid var(--color-success)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-success)' }}>Ready to confirm?</h3>
        <p style={{ margin: '0 0 1.5rem 0', color: '#555' }}>
          Your custom trip total is <strong>{formatPrice(priceSummary.total)}</strong>. 
          Click the button below to secure your booking.
        </p>
        <p style={{ fontSize: '0.8rem', color: '#888' }}>
          (Simulation: In a real app, this would open a payment gateway)
        </p>
      </div>
    </div>
  );
};

export default Step7_Review;
