import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { RegionProps } from './regionsData';
import RegionCard from './RegionCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './RegionSection.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const RegionSection: React.FC<{ region: RegionProps }> = ({ region }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -100px 0px" });

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="region-section" id={region.id}>
      <div className="region-section__divider" />
      
      <div className="region-section__container">
        <motion.div 
          className="region-section__header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="region-section__title-wrap">
            <h2 className="region-section__title">{region.title}</h2>
          </div>
          <a href={region.slug} className="region-section__view-all">
            View All <span className="region-section__arrow">→</span>
          </a>
        </motion.div>

        <div className="region-section__carousel-wrapper">
          <button className="region-section__nav-btn left" onClick={scrollLeft} aria-label="Scroll Left">
            <FaChevronLeft />
          </button>
          
          <motion.div 
            ref={carouselRef}
            className="region-section__carousel"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {region.places.map((place, index) => (
              <RegionCard key={place.id} place={place} index={index} />
            ))}
          </motion.div>

          <button className="region-section__nav-btn right" onClick={scrollRight} aria-label="Scroll Right">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RegionSection;
