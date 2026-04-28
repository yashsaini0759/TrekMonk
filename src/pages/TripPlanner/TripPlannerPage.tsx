import React, { useEffect, useState } from 'react';
import { TripPlannerProvider, useTripPlanner } from '../../context/TripPlannerContext';
import WizardShell from '../../components/TripPlanner/WizardShell';
import Step1_Route from '../../components/TripPlanner/Step1_Route';
import Step2_Stops from '../../components/TripPlanner/Step2_Stops';
import Step3_Duration from '../../components/TripPlanner/Step3_Duration';
import Step4_Hotels from '../../components/TripPlanner/Step4_Hotels';
import Step5_Food from '../../components/TripPlanner/Step5_Food';
import Step6_Activities from '../../components/TripPlanner/Step6_Activities';
import Step7_Review from '../../components/TripPlanner/Step7_Review';
import MultiPlanCompare from '../../components/TripPlanner/MultiPlanCompare';
import '../../components/TripPlanner/TripPlanner.css';

const TripPlannerWizard: React.FC = () => {
  const { currentStep, setCurrentStep, tripPlan, autoBookAll } = useTripPlanner();
  const [showSuccess, setShowSuccess] = useState(false);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final Submit
      autoBookAll();
      setShowSuccess(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (showSuccess) {
    return (
      <div className="tp-container container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', background: 'white', padding: '3rem', borderRadius: '16px', boxShadow: 'var(--shadow-lg)', maxWidth: '500px' }}>
          <div style={{ width: '80px', height: '80px', background: 'var(--color-success)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 1.5rem auto' }}>
            ✓
          </div>
          <h2 style={{ marginBottom: '1rem', color: 'var(--color-success)' }}>Trip Planned Successfully!</h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            We've saved your custom itinerary. A booking simulation has been triggered. In a real application, you would receive an email confirmation and be redirected to a payment gateway.
          </p>
          <button className="tp-btn tp-btn-primary" style={{ margin: '0 auto' }} onClick={() => window.location.href = '/'}>
            Return Home
          </button>
        </div>
      </div>
    );
  }

  // Step Configuration
  const steps = [
    {
      title: 'Where do you want to go?',
      subtitle: 'Select your starting point, destination, and how you want to travel.',
      component: <Step1_Route />,
      isValid: !!(tripPlan.pickup && tripPlan.destinationId && tripPlan.transport),
    },
    {
      title: 'Design Your Route',
      subtitle: 'Add intermediate stops to your journey.',
      component: (
        <>
          <Step2_Stops />
          <MultiPlanCompare onSelect={() => setCurrentStep(3)} />
        </>
      ),
      isValid: tripPlan.stops.length > 0,
    },
    {
      title: 'How long are you staying?',
      subtitle: 'Decide how many days to spend at each stop.',
      component: <Step3_Duration />,
      isValid: true,
    },
    {
      title: 'Choose Your Accommodations',
      subtitle: 'Select the type of hotel for each location.',
      component: <Step4_Hotels />,
      isValid: tripPlan.stops.every(s => s.hotelId !== null), // must select hotel for all stops
    },
    {
      title: 'Meal Preferences',
      subtitle: 'Add meal packages or choose to explore local food.',
      component: <Step5_Food />,
      isValid: true,
    },
    {
      title: 'Activities & Experiences',
      subtitle: 'Pre-book local activities and sightseeing.',
      component: <Step6_Activities />,
      isValid: true,
    },
    {
      title: 'Review Your Itinerary',
      subtitle: 'Double check your custom trip before confirming.',
      component: <Step7_Review />,
      isValid: true,
      nextLabel: 'Confirm & Book',
      showPricePanel: false, // Hidden on review step as it's included in the main view
    },
  ];

  const currentStepConfig = steps[currentStep - 1];

  return (
    <WizardShell
      title={currentStepConfig.title}
      subtitle={currentStepConfig.subtitle}
      onNext={handleNext}
      onBack={handleBack}
      isNextDisabled={!currentStepConfig.isValid}
      nextLabel={currentStepConfig.nextLabel}
      showPricePanel={currentStepConfig.showPricePanel !== false}
    >
      {currentStepConfig.component}
    </WizardShell>
  );
};

const TripPlannerPage: React.FC = () => {
  return (
    <TripPlannerProvider>
      <TripPlannerWizard />
    </TripPlannerProvider>
  );
};

export default TripPlannerPage;
