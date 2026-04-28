import React, { useState } from 'react';
import { useTripPlanner } from '../../context/TripPlannerContext';
import { getDestinationData } from '../../data/plannerData';
import type { HotelTier } from '../../types/planner';
import { FaStar, FaCheckCircle, FaBed } from 'react-icons/fa';

const Step4_Hotels: React.FC = () => {
  const { tripPlan, setHotelForStop } = useTripPlanner();
  // Keep track of which stop's tab is currently active
  const [activeStopIndex, setActiveStopIndex] = useState(0);

  const activeStop = tripPlan.stops[activeStopIndex];
  if (!activeStop) return null;

  const destData = getDestinationData(activeStop.destinationId);

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

  const renderHotelTier = (tier: HotelTier, label: string) => {
    const hotel = destData.hotels.find(h => h.tier === tier);
    if (!hotel) return null;

    const isSelected = activeStop.hotelId === hotel.id;

    return (
      <div 
        key={hotel.id}
        className={`tp-hotel-card ${isSelected ? 'selected' : ''}`}
        onClick={() => setHotelForStop(activeStop.destinationId, hotel.id)}
      >
        <div style={{ position: 'relative' }}>
          <img src={hotel.image} alt={hotel.name} className="tp-hotel-img" />
          <div style={{ 
            position: 'absolute', top: '10px', left: '10px', 
            background: 'rgba(0,0,0,0.7)', color: 'white', 
            padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold',
            textTransform: 'uppercase'
          }}>
            {label}
          </div>
          {isSelected && (
            <div style={{
              position: 'absolute', top: '10px', right: '10px',
              background: 'var(--color-primary)', color: 'white',
              width: '28px', height: '28px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}>
              <FaCheckCircle />
            </div>
          )}
        </div>
        
        <div className="tp-hotel-info">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <h4 style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.2 }}>{hotel.name}</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#f59e0b', fontSize: '0.8rem' }}>
              <FaStar /> <span>{hotel.rating}</span>
            </div>
          </div>
          
          <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {hotel.amenities.map(am => (
              <span key={am} style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>{am}</span>
            ))}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                {formatPrice(hotel.pricePerNight)}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#888' }}>per night</div>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                {formatPrice(hotel.pricePerNight * activeStop.days)}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#888' }}>for {activeStop.days} days</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Stop Tabs */}
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
              <FaBed /> {stop.name} ({stop.days} days)
            </button>
          ))}
        </div>
      )}

      {tripPlan.stops.length === 1 && (
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaBed /> Accommodations in {activeStop.name}
        </h3>
      )}

      <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#333' }}>
          Prices shown are for your entire stay of <strong>{activeStop.days} days</strong> at this location.
        </p>
      </div>

      <div className="tp-hotel-grid">
        {renderHotelTier('budget', 'Budget / Hostels')}
        {renderHotelTier('standard', 'Standard Comfort')}
        {renderHotelTier('premium', 'Premium & Luxury')}
      </div>
    </div>
  );
};

export default Step4_Hotels;
