import React from 'react';
import type { Trek } from '../../data/trekData';

interface Props { trek: Trek }

const TrekAttractions: React.FC<Props> = ({ trek }) => {
  const attractions = trek.details?.attractions ?? [];
  return (
    <div className="td-section">
      <h2 className="td-section__title">Attractions</h2>
      <div className="td-attractions__scroll">
        {attractions.map(attr => (
          <div key={attr.name} className="td-attr-card">
            <img src={attr.image} alt={attr.name} className="td-attr-card__img" loading="lazy" />
            <div className="td-attr-card__label">{attr.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrekAttractions;
