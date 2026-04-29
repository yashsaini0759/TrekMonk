import React, { useState } from 'react';
import { useTripPlanner } from '../../context/TripPlannerContext';
import { FaCheckCircle, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const BookingSummary: React.FC = () => {
  const { tripPlan, priceSummary, setPhase } = useTripPlanner();
  const [isBooking, setIsBooking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const includedStops = tripPlan.stopSelections.filter(s => s.isIncluded);

  const handleBook = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="tp-step-content text-center" style={{ padding: '4rem 2rem' }}>
        <FaCheckCircle size={64} color="var(--color-success)" style={{ margin: '0 auto 1.5rem auto' }} />
        <h2>Booking Confirmed!</h2>
        <p>Your intelligent itinerary has been locked. We will contact you shortly with payment details.</p>
        <button className="tp-btn tp-btn-primary" style={{ margin: '2rem auto 0' }} onClick={() => window.location.href = '/'}>
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="tp-step-content" style={{ padding: '0', background: 'transparent', boxShadow: 'none' }}>
      <div className="tp-step-header text-center" style={{ marginBottom: '2rem' }}>
        <h2>Review & Book</h2>
        <p>Finalize your custom trip details.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem', alignItems: 'start' }}>
        
        {/* Left Column: Itinerary & Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="tp-stop-card" style={{ padding: '1.5rem' }}>
            <h3>Your Itinerary</h3>
            <div style={{ margin: '1rem 0', color: '#666' }}>
              <strong>Route:</strong> {tripPlan.pickupName} → {tripPlan.destinationName} <br/>
              <strong>Transport:</strong> {tripPlan.transport?.toUpperCase()} <br/>
              <strong>Travellers:</strong> {tripPlan.travellers}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {includedStops.map((stop, i) => {
                const cost = priceSummary.stopCosts.find(c => c.stopId === stop.stopId);
                return (
                  <div key={stop.stopId} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                    <div className="flex-between">
                      <strong>{i + 1}. {stop.name}</strong>
                      <span>{stop.days} Days</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
                      Stay: ₹{cost?.stay || 0} • Food: ₹{cost?.food || 0} • Activities: ₹{cost?.activities || 0}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="tp-stop-card" style={{ padding: '1.5rem' }}>
            <h3>Traveller Details</h3>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
              <div className="tp-form-group">
                <label className="tp-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <FaUser style={{ position: 'absolute', top: '12px', left: '12px', color: '#888' }} />
                  <input type="text" className="tp-select" style={{ paddingLeft: '2.5rem' }} placeholder="John Doe" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="tp-form-group">
                  <label className="tp-label">Email</label>
                  <div style={{ position: 'relative' }}>
                    <FaEnvelope style={{ position: 'absolute', top: '12px', left: '12px', color: '#888' }} />
                    <input type="email" className="tp-select" style={{ paddingLeft: '2.5rem' }} placeholder="john@example.com" />
                  </div>
                </div>
                <div className="tp-form-group">
                  <label className="tp-label">Phone</label>
                  <div style={{ position: 'relative' }}>
                    <FaPhone style={{ position: 'absolute', top: '12px', left: '12px', color: '#888' }} />
                    <input type="tel" className="tp-select" style={{ paddingLeft: '2.5rem' }} placeholder="+91 9876543210" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tp-nav-buttons" style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
            <button className="tp-btn tp-btn-secondary" onClick={() => setPhase('customize')}>
              Back to Customizer
            </button>
            <button className="tp-btn tp-btn-primary" onClick={handleBook} disabled={isBooking}>
              {isBooking ? 'Processing...' : `Pay ₹${priceSummary.total.toLocaleString()}`}
            </button>
          </div>
        </div>

        {/* Right Column: Price Summary Panel */}
        <div className="tp-price-panel sticky" style={{ top: '100px' }}>
          <div className="tp-price-header">
            <h3>Price Breakdown</h3>
          </div>
          <div className="tp-price-body">
            <div className="tp-price-row">
              <span>Transport</span>
              <span>₹{priceSummary.transport.toLocaleString()}</span>
            </div>
            <div className="tp-price-row">
              <span>Total Stay</span>
              <span>₹{priceSummary.totalStay.toLocaleString()}</span>
            </div>
            <div className="tp-price-row">
              <span>Total Food</span>
              <span>₹{priceSummary.totalFood.toLocaleString()}</span>
            </div>
            <div className="tp-price-row">
              <span>Total Activities</span>
              <span>₹{priceSummary.totalActivities.toLocaleString()}</span>
            </div>
            
            <div className="tp-price-row" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
              <span style={{ fontWeight: 600 }}>Subtotal</span>
              <span style={{ fontWeight: 600 }}>₹{priceSummary.subtotal.toLocaleString()}</span>
            </div>
            <div className="tp-price-row" style={{ marginTop: '0.5rem' }}>
              <span>Platform Fee (8%)</span>
              <span>₹{priceSummary.convenienceFee.toLocaleString()}</span>
            </div>
            <div className="tp-price-row">
              <span>Taxes (5% GST)</span>
              <span>₹{priceSummary.taxes.toLocaleString()}</span>
            </div>

            <div className="tp-price-row total" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '2px dashed var(--color-border)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
              <span>Total Amount</span>
              <span>₹{priceSummary.total.toLocaleString()}</span>
            </div>
            
            <div className="text-center" style={{ marginTop: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              ₹{priceSummary.perPerson.toLocaleString()} <span style={{ opacity: 0.8 }}>per person</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingSummary;
