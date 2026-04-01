import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { unifiedTrekData as trekData } from '../data/unifiedTrekData';
import TrekDetailsPage from '../components/trekDetails';
import { useUserPreferences } from '../context/UserPreferencesContext';

const TrekDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const trek = trekData.find(t => t.slug === slug);
  const { recordClick } = useUserPreferences();

  useEffect(() => {
    if (trek) {
      recordClick(trek);
    }
  }, [trek, recordClick]);

  if (!trek) return <Navigate to="/all-treks" replace />;

  return <TrekDetailsPage trek={trek} />;
};

export default TrekDetails;
