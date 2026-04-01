import React from 'react';
import { motion } from 'framer-motion';
import { regionData } from '../components/RegionSection/regionsData';
import RegionCard from '../components/RegionSection/RegionCard';
import './AllTreks.css';

const AllTreks: React.FC = () => {
  return (
    <div className="all-treks-page">
      <div className="all-treks__header">
        <motion.h1 
          className="all-treks__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore All Treks
        </motion.h1>
        <motion.p 
          className="all-treks__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Discover our complete collection of handcrafted mountain journeys and expeditions.
        </motion.p>
      </div>

      <div className="all-treks__grid-container">
        {regionData.map((region) => (
          <div key={region.id} className="all-treks__category">
            <h2 className="all-treks__category-title">
              {region.title}
            </h2>
            <div className="all-treks__grid">
              {region.places.map((place, index) => (
                <RegionCard key={`${place.id}-${index}`} place={place} index={index % 10} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTreks;
