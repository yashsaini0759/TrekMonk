import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { FiCoffee } from 'react-icons/fi';
import type { Trek } from '../../data/trekData';

interface Props { trek: Trek }

const TrekItinerary: React.FC<Props> = ({ trek }) => {
  const [openDay, setOpenDay] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });
  const days = trek.details?.itinerary ?? [];

  return (
    <div ref={ref} className="td-section">
      <h2 className="td-section__title">Day-wise Itinerary</h2>
      <div className="td-itinerary">
        <div className="td-itinerary__timeline">
          {days.map((day, i) => {
            const isOpen = openDay === i;
            return (
              <motion.div
                key={day.day}
                className="td-itin-day"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.45 }}
              >
                <div className="td-itin-day__dot">{day.day}</div>

                <div
                  className="td-itin-day__header"
                  onClick={() => setOpenDay(isOpen ? null : i)}
                >
                  <span className="td-itin-day__num">Day {day.day}</span>
                  <span className="td-itin-day__title">{day.title}</span>
                  <FiChevronDown className={`td-itin-day__chevron ${isOpen ? 'open' : ''}`} />
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="td-itin-day__body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <ul className="td-itin-day__points">
                        {day.description.map((pt, j) => <li key={j}>{pt}</li>)}
                      </ul>
                      {day.highlights.length > 0 && (
                        <div className="td-itin-day__highlights">
                          {day.highlights.map(h => (
                            <span key={h} className="td-itin-day__highlight">{h}</span>
                          ))}
                        </div>
                      )}
                      {day.meals && (
                        <div className="td-itin-day__meals">
                          <FiCoffee size={13} />
                          <strong>Meals:</strong> {day.meals}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrekItinerary;
