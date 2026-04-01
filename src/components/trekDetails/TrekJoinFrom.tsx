import React from 'react';
import type { Trek, CityOption } from '../../data/trekData';

interface Props {
  trek: Trek;
  onCitySelect: (city: CityOption) => void;
  selectedCityId: string;
}

const TrekJoinFrom: React.FC<Props> = ({ trek, onCitySelect, selectedCityId }) => {
  const cities = trek.details?.startingCities ?? [];
  return (
    <div className="td-section">
      <h2 className="td-section__title">Join From</h2>
      <div className="td-join__grid">
        {cities.map(city => (
          <div
            key={city.id}
            className={`td-join-card ${selectedCityId === city.id ? 'active' : ''}`}
            onClick={() => onCitySelect(city)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && onCitySelect(city)}
          >
            <img src={city.image} alt={city.city} className="td-join-card__img" loading="lazy" />
            <div className="td-join-card__body">
              <div className="td-join-card__city">{city.city}</div>
              <div className="td-join-card__meta">{city.duration}</div>
              <div className="td-join-card__price">from ₹{city.price.toLocaleString('en-IN')}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrekJoinFrom;
