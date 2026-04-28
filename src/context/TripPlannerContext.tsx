import React, { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import type {
  TripPlan,
  PriceSummary,
  PlanStop,
  TransportMode,
  PlanTier,
  MealPlan,
} from '../types/planner';
import { getDestinationData, TRANSPORT_PRICES } from '../data/plannerData';

interface TripPlannerContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  tripPlan: TripPlan;
  priceSummary: PriceSummary;
  setPickup: (cityId: string) => void;
  setDestination: (destId: string, name: string) => void;
  setTransport: (mode: TransportMode) => void;
  setBudget: (budget: number) => void;
  addStop: (destId: string, name: string) => void;
  removeStop: (destId: string) => void;
  reorderStops: (startIndex: number, endIndex: number) => void;
  setDaysForStop: (destId: string, days: number) => void;
  setHotelForStop: (destId: string, hotelId: string | null) => void;
  setMealPlanForStop: (destId: string, mealPlan: MealPlan) => void;
  toggleActivityForStop: (destId: string, activityId: string) => void;
  setPlanTier: (tier: PlanTier) => void;
  autoBookAll: () => void;
}

const defaultPlan: TripPlan = {
  pickup: '',
  destinationId: '',
  transport: null,
  stops: [],
  selectedTier: 'balanced',
  budget: 25000,
};

const TripPlannerContext = createContext<TripPlannerContextType | undefined>(undefined);

export const TripPlannerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tripPlan, setTripPlan] = useState<TripPlan>(defaultPlan);

  // Actions
  const setPickup = (cityId: string) => setTripPlan(prev => ({ ...prev, pickup: cityId }));
  const setTransport = (mode: TransportMode) => setTripPlan(prev => ({ ...prev, transport: mode }));
  const setBudget = (budget: number) => setTripPlan(prev => ({ ...prev, budget }));
  
  const setDestination = (destId: string, name: string) => {
    setTripPlan(prev => ({
      ...prev,
      destinationId: destId,
      // Reset stops and add the main destination as the primary stop
      stops: [{ destinationId: destId, name, days: 3, hotelId: null, selectedActivities: [], mealPlan: 'none' }]
    }));
  };

  const addStop = (destId: string, name: string) => {
    setTripPlan(prev => {
      if (prev.stops.find(s => s.destinationId === destId)) return prev;
      return {
        ...prev,
        stops: [...prev.stops, { destinationId: destId, name, days: 2, hotelId: null, selectedActivities: [], mealPlan: 'none' }]
      };
    });
  };

  const removeStop = (destId: string) => {
    setTripPlan(prev => ({
      ...prev,
      stops: prev.stops.filter(s => s.destinationId !== destId)
    }));
  };

  const reorderStops = (startIndex: number, endIndex: number) => {
    setTripPlan(prev => {
      const newStops = Array.from(prev.stops);
      const [removed] = newStops.splice(startIndex, 1);
      newStops.splice(endIndex, 0, removed);
      return { ...prev, stops: newStops };
    });
  };

  const updateStop = (destId: string, updater: (stop: PlanStop) => PlanStop) => {
    setTripPlan(prev => ({
      ...prev,
      stops: prev.stops.map(s => s.destinationId === destId ? updater(s) : s)
    }));
  };

  const setDaysForStop = (destId: string, days: number) => updateStop(destId, s => ({ ...s, days }));
  const setHotelForStop = (destId: string, hotelId: string | null) => updateStop(destId, s => ({ ...s, hotelId }));
  const setMealPlanForStop = (destId: string, mealPlan: MealPlan) => updateStop(destId, s => ({ ...s, mealPlan }));

  const toggleActivityForStop = (destId: string, activityId: string) => {
    updateStop(destId, s => {
      const has = s.selectedActivities.includes(activityId);
      return {
        ...s,
        selectedActivities: has
          ? s.selectedActivities.filter(id => id !== activityId)
          : [...s.selectedActivities, activityId]
      };
    });
  };

  const setPlanTier = (tier: PlanTier) => setTripPlan(prev => ({ ...prev, selectedTier: tier }));

  const autoBookAll = () => {
    // In a real app, this would call an API.
    // For now, we simulate success.
    console.log("Auto-booking plan:", tripPlan);
  };

  // Compute live price
  const priceSummary = useMemo<PriceSummary>(() => {
    let transport = 0;
    if (tripPlan.transport) {
      transport = TRANSPORT_PRICES[tripPlan.transport] * (tripPlan.stops.length || 1); // rough estimate
    }

    let stay = 0;
    let food = 0;
    let activities = 0;

    tripPlan.stops.forEach(stop => {
      const data = getDestinationData(stop.destinationId);
      
      // Stay
      if (stop.hotelId) {
        const hotel = data.hotels.find(h => h.id === stop.hotelId);
        if (hotel) stay += hotel.pricePerNight * stop.days;
      }

      // Food
      const meal = data.mealPackages.find(m => m.plan === stop.mealPlan);
      if (meal) food += meal.pricePerDay * stop.days;

      // Activities
      stop.selectedActivities.forEach(actId => {
        const act = data.activities.find(a => a.id === actId);
        if (act) activities += act.price;
      });
    });

    const subtotal = transport + stay + food + activities;
    const convenienceFee = Math.round(subtotal * 0.08); // 8% fee
    const personalization = 499; // Flat fee

    return {
      transport,
      stay,
      food,
      activities,
      convenienceFee,
      personalization,
      total: subtotal + convenienceFee + personalization
    };
  }, [tripPlan]);

  return (
    <TripPlannerContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        tripPlan,
        priceSummary,
        setPickup,
        setDestination,
        setTransport,
        setBudget,
        addStop,
        removeStop,
        reorderStops,
        setDaysForStop,
        setHotelForStop,
        setMealPlanForStop,
        toggleActivityForStop,
        setPlanTier,
        autoBookAll,
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
