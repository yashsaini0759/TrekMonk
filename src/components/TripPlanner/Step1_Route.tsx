import React from 'react';
import { useTripPlanner } from '../../context/TripPlannerContext';
import { DEPARTURE_CITIES, PLANNER_DESTINATIONS, TRANSPORT_PRICES } from '../../data/plannerData';
import type { TransportMode } from '../../types/planner';
import { FaBus, FaTrain, FaTaxi, FaPlane } from 'react-icons/fa';

const Step1_Route: React.FC = () => {
  const { tripPlan, setPickup, setDestination, setTransport, setBudget } = useTripPlanner();

  const handleTransportClick = (mode: TransportMode) => {
    setTransport(mode);
  };

  const budgetOptions = [
    { value: 10000, label: '₹10,000 - Budget' },
    { value: 25000, label: '₹25,000 - Standard' },
    { value: 50000, label: '₹50,000 - Premium' },
    { value: 100000, label: '₹1,00,000+ - Luxury' },
  ];

  return (
    <div>
      <div className="tp-form-group">
        <label className="tp-label">Total Budget Estimate (per person)</label>
        <select 
          className="tp-select" 
          value={tripPlan.budget}
          onChange={(e) => setBudget(Number(e.target.value))}
        >
          {budgetOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>
          We'll use this to recommend the best options for your trip.
        </p>
      </div>

      <div className="tp-form-group">
        <label className="tp-label">Pickup City</label>
        <select 
          className="tp-select" 
          value={tripPlan.pickup} 
          onChange={(e) => setPickup(e.target.value)}
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

      {tripPlan.pickup && tripPlan.destinationId && (
        <div className="tp-form-group" style={{ marginTop: '2rem' }}>
          <label className="tp-label">Mode of Transport</label>
          <div className="tp-transport-grid">
            
            <div 
              className={`tp-transport-card ${tripPlan.transport === 'bus' ? 'selected' : ''}`}
              onClick={() => handleTransportClick('bus')}
            >
              <div className="tp-transport-icon"><FaBus /></div>
              <span className="tp-transport-name">Volvo Bus</span>
              <span className="tp-transport-price">~₹{TRANSPORT_PRICES.bus}</span>
            </div>

            <div 
              className={`tp-transport-card ${tripPlan.transport === 'train' ? 'selected' : ''}`}
              onClick={() => handleTransportClick('train')}
            >
              <div className="tp-transport-icon"><FaTrain /></div>
              <span className="tp-transport-name">Train (3AC)</span>
              <span className="tp-transport-price">~₹{TRANSPORT_PRICES.train}</span>
            </div>

            <div 
              className={`tp-transport-card ${tripPlan.transport === 'cab' ? 'selected' : ''}`}
              onClick={() => handleTransportClick('cab')}
            >
              <div className="tp-transport-icon"><FaTaxi /></div>
              <span className="tp-transport-name">Private Cab</span>
              <span className="tp-transport-price">~₹{TRANSPORT_PRICES.cab}</span>
            </div>

            <div 
              className={`tp-transport-card ${tripPlan.transport === 'flight' ? 'selected' : ''}`}
              onClick={() => handleTransportClick('flight')}
            >
              <div className="tp-transport-icon"><FaPlane /></div>
              <span className="tp-transport-name">Flight</span>
              <span className="tp-transport-price">~₹{TRANSPORT_PRICES.flight}</span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Step1_Route;
