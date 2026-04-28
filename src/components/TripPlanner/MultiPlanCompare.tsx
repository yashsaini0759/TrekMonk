import React from 'react';
import { useTripPlanner } from '../../context/TripPlannerContext';
import type { PlanTier } from '../../types/planner';
import { FaCheck } from 'react-icons/fa';

const MultiPlanCompare: React.FC<{ onSelect: () => void }> = ({ onSelect }) => {
  const { tripPlan, setPlanTier, priceSummary } = useTripPlanner();

  const handleSelect = (tier: PlanTier) => {
    setPlanTier(tier);
    // In a full implementation, this would actually mutate the tripPlan (hotels, meals, acts)
    // to match the selected tier's defaults. For this demo, we just set the tier string.
    onSelect();
  };

  const formatPrice = (p: number) => `₹${p.toLocaleString('en-IN')}`;

  const basePrice = priceSummary.total || 15000;

  const plans = [
    {
      tier: 'budget' as PlanTier,
      label: 'Budget Friendly',
      price: Math.round(basePrice * 0.7),
      features: ['Hostels & Budget stays', 'Public transport', 'Self-explore (No guide)', 'Basic breakfast'],
    },
    {
      tier: 'balanced' as PlanTier,
      label: 'Balanced Comfort',
      price: basePrice,
      features: ['3-Star Hotels', 'Private Cab transfers', '1 Guided Activity', 'Half-board meals'],
    },
    {
      tier: 'premium' as PlanTier,
      label: 'Premium Luxury',
      price: Math.round(basePrice * 1.8),
      features: ['4/5-Star Resorts', 'Flight + Premium Cab', 'All Activities Included', 'Full-board meals'],
    }
  ];

  return (
    <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Or choose a pre-designed plan template</h3>
      
      <div className="tp-plans-grid">
        {plans.map(plan => (
          <div 
            key={plan.tier}
            className={`tp-plan-card ${plan.tier} ${tripPlan.selectedTier === plan.tier ? 'selected' : ''}`}
            onClick={() => handleSelect(plan.tier)}
            style={{ cursor: 'pointer' }}
          >
            <h4 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', color: '#666' }}>
              {plan.label}
            </h4>
            <div className="tp-plan-price">{formatPrice(plan.price)}</div>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', textAlign: 'left', fontSize: '0.9rem' }}>
              {plan.features.map((feat, i) => (
                <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#555' }}>
                  <FaCheck color="var(--color-success)" size={12} /> {feat}
                </li>
              ))}
            </ul>
            
            <button className={`tp-btn ${tripPlan.selectedTier === plan.tier ? 'tp-btn-primary' : 'tp-btn-secondary'}`} style={{ width: '100%', justifyContent: 'center' }}>
              {tripPlan.selectedTier === plan.tier ? 'Selected' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiPlanCompare;
