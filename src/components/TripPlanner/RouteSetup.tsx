import React from 'react';
import { useTripPlanner } from '../../context/TripPlannerContext';
import { DEPARTURE_CITIES, PLANNER_DESTINATIONS } from '../../data/routeData';
import type { TransportMode } from '../../types/planner';
import { FaBus, FaTrain, FaTaxi, FaPlane, FaUsers } from 'react-icons/fa';

const RouteSetup: React.FC = () => {
  const { tripPlan, setPickup, setDestination, setTransport, setTravellers, confirmRoute } = useTripPlanner();

  const handleTransportClick = (mode: TransportMode) => {
    setTransport(mode);
  };

  const isReady = tripPlan.pickupId && tripPlan.destinationId && tripPlan.transport;

  return (
    <div className="tp-step-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="tp-step-header text-center">
        <h2>Where do you want to go?</h2>
        <p>Select your starting point, destination, and how you want to travel.</p>
      </div>

      <div className="tp-form-group">
        <label className="tp-label">Number of Travellers</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <FaUsers size={24} style={{ color: 'var(--color-primary)' }} />
          <input 
            type="number" 
            min="1" 
            max="20" 
            className="tp-select" 
            style={{ width: '150px' }}
            value={tripPlan.travellers}
            onChange={(e) => setTravellers(Math.max(1, parseInt(e.target.value) || 1))}
          />
        </div>
      </div>

      <div className="tp-form-group">
        <label className="tp-label">Pickup City</label>
        <select 
          className="tp-select" 
          value={tripPlan.pickupId} 
          onChange={(e) => {
            const city = DEPARTURE_CITIES.find(c => c.id === e.target.value);
            if (city) setPickup(city.id, city.name);
          }}
        >
          <option value="" disabled>Select starting point...</option>
          {DEPARTURE_CITIES.map(city => (
            <option key={city.id} value={city.id}>{city.name}, {city.state}</option>
          ))}
        </select>
      </div>

      <div className="tp-form-group">
        <label className="tp-label">Main Destination</label>
        <select 
          className="tp-select" 
          value={tripPlan.destinationId} 
          onChange={(e) => {
            const dest = PLANNER_DESTINATIONS.find(d => d.id === e.target.value);
            if (dest) setDestination(dest.id, dest.name);
          }}
        >
          <option value="" disabled>Where do you want to go?</option>
          {PLANNER_DESTINATIONS.map(dest => (
            <option key={dest.id} value={dest.id}>{dest.name}, {dest.state}</option>
          ))}
        </select>
      </div>

      {tripPlan.pickupId && tripPlan.destinationId && (
        <div className="tp-form-group" style={{ marginTop: '2rem' }}>
          <label className="tp-label">Preferred Mode of Transport</label>
          <div className="tp-transport-grid">
            
            <div 
              className={`tp-transport-card ${tripPlan.transport === 'bus' ? 'selected' : ''}`}
              onClick={() => handleTransportClick('bus')}
            >
              <div className="tp-transport-icon"><FaBus /></div>
              <span className="tp-transport-name">Volvo Bus</span>
              <span className="tp-transport-price">₹800 – ₹1,500</span>
            </div>

            <div 
              className={`tp-transport-card ${tripPlan.transport === 'train' ? 'selected' : ''}`}
              onClick={() => handleTransportClick('train')}
            >
              <div className="tp-transport-icon"><FaTrain /></div>
              <span className="tp-transport-name">Train</span>
              <span className="tp-transport-price">₹1,200 – ₹2,500</span>
            </div>

            <div 
              className={`tp-transport-card ${tripPlan.transport === 'cab' ? 'selected' : ''}`}
              onClick={() => handleTransportClick('cab')}
            >
              <div className="tp-transport-icon"><FaTaxi /></div>
              <span className="tp-transport-name">Private Cab</span>
              <span className="tp-transport-price">₹3,500 – ₹6,000</span>
            </div>

            <div 
              className={`tp-transport-card ${tripPlan.transport === 'flight' ? 'selected' : ''}`}
              onClick={() => handleTransportClick('flight')}
            >
              <div className="tp-transport-icon"><FaPlane /></div>
              <span className="tp-transport-name">Flight</span>
              <span className="tp-transport-price">₹5,000 – ₹9,000</span>
            </div>

          </div>
        </div>
      )}

      <div className="text-center" style={{ marginTop: '2rem' }}>
        <button 
          className="tp-btn tp-btn-primary" 
          style={{ width: '100%', justifyContent: 'center' }}
          disabled={!isReady}
          onClick={confirmRoute}
        >
          Build My Route
        </button>
      </div>
    </div>
  );
};

export default RouteSetup;
