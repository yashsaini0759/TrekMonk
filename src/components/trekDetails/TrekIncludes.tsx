import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FiCoffee, FiCompass, FiHeart, FiTruck, FiStar, FiHome
} from 'react-icons/fi';
import type { Trek } from '../../data/trekData';

interface Props { trek: Trek }

const ICON_MAP: Record<string, React.ReactNode> = {
  meals:     <FiCoffee />,
  camping:   <FiHome />,
  guide:     <FiCompass />,
  firstaid:  <FiHeart />,
  transport: <FiTruck />,
  tents:     <FiStar />,
};

const TrekIncludes: React.FC<Props> = ({ trek }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });
  const includes = trek.details?.includes ?? [];

  return (
    <div ref={ref} className="td-section">
      <h2 className="td-section__title">What's Included</h2>
      <div className="td-includes__grid">
        {includes.map((item, i) => (
          <motion.div
            key={item.label}
            className="td-include-card"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.07, duration: 0.4 }}
          >
            <div className="td-include-card__icon">
              {ICON_MAP[item.icon] ?? <FiStar />}
            </div>
            <div className="td-include-card__label">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrekIncludes;
