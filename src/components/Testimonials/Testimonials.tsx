import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { reviewsData } from './reviewsData';
import type { Review } from './reviewsData';
import './Testimonials.css';

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={`full-${i}`} className="review-card__star" />);
    }
    if (hasHalfStar) {
        stars.push(<FaStarHalfAlt key="half" className="review-card__star" />);
    }
    // Pad with empty stars if not 5
    while (stars.length < 5) {
        stars.push(<FaStar key={`empty-${stars.length}`} className="review-card__star empty" />);
    }
    
    return stars;
  };

  return (
    <div className="review-card">
      <div className="review-card__header">
        <img src={review.avatar} alt={review.name} className="review-card__avatar" loading="lazy" />
        <div className="review-card__meta">
          <h4 className="review-card__name">{review.name}</h4>
          {review.location && <span className="review-card__location">{review.location}</span>}
        </div>
      </div>
      <div className="review-card__rating">
        {renderStars(review.rating)}
      </div>
      <p className="review-card__content">"{review.content}"</p>
      {review.trekName && <span className="review-card__trek">{review.trekName}</span>}
    </div>
  );
};

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <section ref={sectionRef} className="testimonials-section">
      <div className="testimonials-section__container">
        
        <motion.div 
          className="testimonials-section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="testimonials-section__title-group">
            <h2 className="testimonials-section__title">What Our Travelers Say</h2>
            <p className="testimonials-section__subtitle">Real stories from people who explored with TrekMonk</p>
          </div>
          <div className="testimonials-section__badge">
            <FaStar className="testimonials-section__badge-star" />
            <span>4.8/5 Average Rating</span>
          </div>
        </motion.div>

        <motion.div 
            className="testimonials-section__marquee-wrapper"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
        >
          {/* We duplicate the track to ensure infinite smooth scrolling */}
          <div className="testimonials-section__marquee-track">
            {reviewsData.map((review) => (
              <ReviewCard key={`original-${review.id}`} review={review} />
            ))}
            {/* Duplicated for loop */}
            {reviewsData.map((review) => (
              <ReviewCard key={`duplicate-${review.id}`} review={review} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
