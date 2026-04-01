import React from 'react';
import { FiClock, FiAward, FiMapPin, FiUsers, FiSun } from 'react-icons/fi';
import type { Trek } from '../../data/trekData';

interface Props { trek: Trek }

const TrekInfo: React.FC<Props> = ({ trek }) => {
  const items = [
    { icon: <FiClock />, label: 'Duration', value: `${trek.duration} Days` },
    { icon: <FiAward />, label: 'Difficulty', value: trek.difficulty.charAt(0).toUpperCase() + trek.difficulty.slice(1) },
    { icon: <FiMapPin />, label: 'Max Altitude', value: `${trek.altitude.toLocaleString()}m` },
    { icon: <FiUsers />, label: 'Age Group', value: trek.details?.ageGroup ?? '12–55 years' },
    { icon: <FiSun />, label: 'Best Season', value: trek.season.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ') },
  ];

  return (
    <div className="td-info-strip">
      <div className="td-info-strip__inner">
        {items.map((item) => (
          <div key={item.label} className="td-info-item">
            <div className="td-info-item__icon">{item.icon}</div>
            <div>
              <div className="td-info-item__label">{item.label}</div>
              <div className="td-info-item__value">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrekInfo;
