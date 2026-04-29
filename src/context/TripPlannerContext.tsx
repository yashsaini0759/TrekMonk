import React, { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import type {
  TripPlan,
  PriceSummary,
  StopSelection,
  TransportMode,
  PlannerPhase,
} from '../types/planner';
import { getRouteConfig, getLegPrice } from '../data/routeData';

interface TripPlannerContextType {
  phase: PlannerPhase;
  setPhase: (phase: PlannerPhase) => void;
  tripPlan: TripPlan;
  priceSummary: PriceSummary;
  
  // Setup Actions
  setPickup: (cityId: string, name: string) => void;
  setDestination: (destId: string, name: string) => void;
  setTransport: (mode: TransportMode) => void;
  setTravellers: (count: number) => void;
  confirmRoute: () => void;
  applyAITrip: (destinationId: string, days: number, budgetTier: 'budget' | 'comfort' | 'luxury') => void;
  
  // Customizer Actions
  toggleStopIncluded: (stopId: string) => void;
  toggleStopCollapsed: (stopId: string) => void;
  updateStopSelection: (stopId: string, updates: Partial<StopSelection>) => void;
  toggleActivity: (stopId: string, activityId: string) => void;
}

const defaultPlan: TripPlan = {
  pickupId: '',
  pickupName: '',
  destinationId: '',
  destinationName: '',
  transport: null,
  travellers: 1,
  stopSelections: [],
};

const TripPlannerContext = createContext<TripPlannerContextType | undefined>(undefined);

export const TripPlannerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [phase, setPhase] = useState<PlannerPhase>('setup');
  const [tripPlan, setTripPlan] = useState<TripPlan>(defaultPlan);

  // --- SETUP ACTIONS ---
  const setPickup = (id: string, name: string) => setTripPlan(prev => ({ ...prev, pickupId: id, pickupName: name }));
  const setDestination = (id: string, name: string) => setTripPlan(prev => ({ ...prev, destinationId: id, destinationName: name }));
  const setTransport = (mode: TransportMode) => setTripPlan(prev => ({ ...prev, transport: mode }));
  const setTravellers = (count: number) => setTripPlan(prev => ({ ...prev, travellers: count }));

  const confirmRoute = () => {
    const route = getRouteConfig(tripPlan.pickupId, tripPlan.destinationId);
    if (!route) {
      alert("Route not supported yet. Try New Delhi -> Kedarkantha Base.");
      return;
    }
    
    // Initialize stop selections based on route graph
    const initialStops: StopSelection[] = route.stops.map(node => ({
      stopId: node.id,
      name: node.name,
      isIncluded: !node.isOptional, // mandatory stops included by default
      isCollapsed: false,
      days: node.id === route.destinationId ? 3 : 1, // 3 days for destination, 1 for stops
      hotelId: null,
      mealPlan: 'none',
      selectedActivityIds: [],
    }));

    setTripPlan(prev => ({ ...prev, stopSelections: initialStops }));
    setPhase('customize');
  };

  const applyAITrip = (destinationId: string, days: number, budgetTier: 'budget' | 'comfort' | 'luxury') => {
    // Default to Delhi for demo
    setPickup('del', 'New Delhi');
    const destName = destinationId === 'dest_kedarkantha' ? 'Kedarkantha Base' : 'Bhrigu Lake';
    setDestination(destinationId, destName);
    setTransport('bus');
    setTravellers(1);

    const route = getRouteConfig('del', destinationId);
    if (!route) return;

    // Distribute days across stops (rough heuristic)
    const totalStops = route.stops.length;
    const daysPerStop = Math.max(1, Math.floor(days / totalStops));

    const initialStops: StopSelection[] = route.stops.map((node, idx) => {
      // Find a hotel matching the budget tier, or just fallback to the first one
      const hotel = node.hotels.find(h => h.tier === budgetTier) || node.hotels[0];
      
      return {
        stopId: node.id,
        name: node.name,
        isIncluded: !node.isOptional,
        isCollapsed: false,
        days: idx === totalStops - 1 ? days - (daysPerStop * (totalStops - 1)) : daysPerStop, 
        hotelId: hotel ? hotel.id : null,
        mealPlan: 'fullboard',
        selectedActivityIds: [],
      };
    });

    // We can't use prev state inside setTripPlan here reliably for pickup/dest because setState is async.
    // So we just override the whole plan.
    setTripPlan({
      pickupId: 'del',
      pickupName: 'New Delhi',
      destinationId,
      destinationName: destName,
      transport: 'bus',
      travellers: 1,
      stopSelections: initialStops
    });

    setPhase('customize');
  };

  // --- CUSTOMIZER ACTIONS ---
  const toggleStopIncluded = (stopId: string) => {
    setTripPlan(prev => ({
      ...prev,
      stopSelections: prev.stopSelections.map(s => 
        s.stopId === stopId ? { ...s, isIncluded: !s.isIncluded } : s
      )
    }));
  };

  const toggleStopCollapsed = (stopId: string) => {
    setTripPlan(prev => ({
      ...prev,
      stopSelections: prev.stopSelections.map(s => 
        s.stopId === stopId ? { ...s, isCollapsed: !s.isCollapsed } : s
      )
    }));
  };

  const updateStopSelection = (stopId: string, updates: Partial<StopSelection>) => {
    setTripPlan(prev => ({
      ...prev,
      stopSelections: prev.stopSelections.map(s => 
        s.stopId === stopId ? { ...s, ...updates } : s
      )
    }));
  };

  const toggleActivity = (stopId: string, activityId: string) => {
    setTripPlan(prev => ({
      ...prev,
      stopSelections: prev.stopSelections.map(s => {
        if (s.stopId !== stopId) return s;
        const has = s.selectedActivityIds.includes(activityId);
        return {
          ...s,
          selectedActivityIds: has 
            ? s.selectedActivityIds.filter(id => id !== activityId)
            : [...s.selectedActivityIds, activityId]
        };
      })
    }));
  };

  // --- PRICING ENGINE ---
  const priceSummary = useMemo<PriceSummary>(() => {
    const route = getRouteConfig(tripPlan.pickupId, tripPlan.destinationId);
    
    let transportTotal = 0;
    let totalStay = 0;
    let totalFood = 0;
    let totalActivities = 0;
    const stopCosts: any[] = [];

    // Calculate transport cost (per leg)
    if (route && tripPlan.transport) {
      let prevId = tripPlan.pickupId;
      route.stops.forEach(node => {
        const selection = tripPlan.stopSelections.find(s => s.stopId === node.id);
        if (selection && selection.isIncluded) {
           const legPrice = getLegPrice(prevId, node.id, tripPlan.transport as any) || 1000; // fallback 1000
           transportTotal += legPrice * tripPlan.travellers;
           prevId = node.id;
        }
      });
    }

    // Calculate per-stop costs
    tripPlan.stopSelections.filter(s => s.isIncluded).forEach(sel => {
      const node = route?.stops.find(n => n.id === sel.stopId);
      if (!node) return;

      let stay = 0;
      if (sel.hotelId) {
        const h = node.hotels.find(x => x.id === sel.hotelId);
        if (h) stay = (h.pricePerNight * sel.days * tripPlan.travellers); 
        // Note: in a real app, hotels might be per room. Here we do per person or total for simplicity.
      }

      let food = 0;
      const m = node.mealPackages.find(x => x.plan === sel.mealPlan);
      if (m) food = m.pricePerDay * sel.days * tripPlan.travellers;

      let activities = 0;
      sel.selectedActivityIds.forEach(actId => {
        const a = node.activities.find(x => x.id === actId);
        if (a) activities += a.price * tripPlan.travellers;
      });

      const stopSubtotal = stay + food + activities;
      stopCosts.push({
        stopId: sel.stopId,
        stopName: sel.name,
        stay,
        food,
        activities,
        subtotal: stopSubtotal
      });

      totalStay += stay;
      totalFood += food;
      totalActivities += activities;
    });

    const subtotal = transportTotal + totalStay + totalFood + totalActivities;
    const convenienceFee = subtotal * 0.08;
    const taxes = subtotal * 0.05;
    const total = subtotal + convenienceFee + taxes;

    return {
      transport: transportTotal,
      stopCosts,
      totalStay,
      totalFood,
      totalActivities,
      subtotal,
      convenienceFee,
      taxes,
      total,
      perPerson: tripPlan.travellers > 0 ? total / tripPlan.travellers : total
    };
  }, [tripPlan]);

  return (
    <TripPlannerContext.Provider
      value={{
        phase,
        setPhase,
        tripPlan,
        priceSummary,
        setPickup,
        setDestination,
        setTransport,
        setTravellers,
        confirmRoute,
        applyAITrip,
        toggleStopIncluded,
        toggleStopCollapsed,
        updateStopSelection,
        toggleActivity
      }}
    >
      {children}
    </TripPlannerContext.Provider>
  );
};

export const useTripPlanner = () => {
  const context = useContext(TripPlannerContext);
  if (!context) {
    throw new Error('useTripPlanner must be used within a TripPlannerProvider');
  }
  return context;
};
