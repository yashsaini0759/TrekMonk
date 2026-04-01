import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import type { Trek } from '../../data/trekData';

interface Props { trek: Trek }

const TrekFAQ: React.FC<Props> = ({ trek }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const faqs = trek.details?.faqs ?? [];

  return (
    <div className="td-section">
      <h2 className="td-section__title">Frequently Asked Questions</h2>
      <div className="td-faq__list">
        {faqs.map((faq, i) => {
          const open = openIdx === i;
          return (
            <div key={i} className="td-faq-item">
              <button className="td-faq-item__q" onClick={() => setOpenIdx(open ? null : i)}>
                {faq.q}
                <FiChevronDown className={`td-faq-item__chevron ${open ? 'open' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    className="td-faq-item__a"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrekFAQ;
