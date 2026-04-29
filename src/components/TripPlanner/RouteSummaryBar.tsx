import React, { useEffect, useState } from 'react';
import { useTripPlanner } from '../../context/TripPlannerContext';
import { getRouteConfig } from '../../data/routeData';
import { FaChevronRight, FaCheck } from 'react-icons/fa';

const RouteSummaryBar: React.FC = () => {
  const { tripPlan } = useTripPlanner();
  const route = getRouteConfig(tripPlan.pickupId, tripPlan.destinationId);
  const [activeStopId, setActiveStopId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by top position to find the topmost visible element
          visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          const activeId = visibleEntries[0].target.id.replace('stop-', '');
          setActiveStopId(activeId);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when element is near the top third of the viewport
        threshold: 0,
      }
    );

    const cards = document.querySelectorAll('.tp-stop-card');
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
      observer.disconnect();
    };
  }, [tripPlan.stopSelections]);

  if (!route) return null;

  // Filter out skipped stops for a cleaner UI path
  const includedStops = route.stops.filter(node => {
    const selection = tripPlan.stopSelections.find(s => s.stopId === node.id);
    return selection && selection.isIncluded;
  });

  return (
    <div className="tp-route-bar">
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1rem', overflowX: 'auto', padding: '1rem' }}>
        
        <div className="tp-route-node origin">
          <span className="node-name">{tripPlan.pickupName}</span>
        </div>
        
        <FaChevronRight color="#ccc" />

        {includedStops.map((node, idx) => {
          const selection = tripPlan.stopSelections.find(s => s.stopId === node.id);
          const isFinal = idx === includedStops.length - 1;
          const isActive = activeStopId === node.id;
          
          // Determine if completed (assuming elements before active are completed)
          const nodeIndex = includedStops.findIndex(n => n.id === node.id);
          const activeIndex = includedStops.findIndex(n => n.id === activeStopId);
          const isCompleted = activeIndex > -1 && nodeIndex < activeIndex;

          return (
            <React.Fragment key={node.id}>
              <div 
                className={`tp-route-node ${isActive ? 'active' : ''} ${isFinal ? 'destination' : ''} ${!isActive && !isFinal && isCompleted ? 'completed' : ''}`}
                onClick={() => {
                  const el = document.getElementById(`stop-${node.id}`);
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 150; // Offset for fixed headers
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
              >
                <span className="node-name" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {node.name}
                  {isCompleted && !isFinal && <FaCheck size={10} color="var(--color-success)" />}
                </span>
                {selection && (
                  <span className="node-meta">{selection.days} {selection.days === 1 ? 'day' : 'days'}</span>
                )}
              </div>
              {!isFinal && <FaChevronRight color="#ccc" />}
            </React.Fragment>
          );
        })}

      </div>
    </div>
  );
};

export default RouteSummaryBar;
