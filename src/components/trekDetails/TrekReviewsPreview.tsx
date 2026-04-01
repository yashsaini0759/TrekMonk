import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { reviewsData } from '../Testimonials/reviewsData';
import type { Trek } from '../../data/trekData';

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<FaStar key={i} />);
    else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} />);
    else stars.push(<FaRegStar key={i} />);
  }
  return stars;
  return stars;
};

interface Props {
  trek: Trek;
}

const TrekReviewsPreview: React.FC<Props> = ({ trek }) => {
  const reviews = trek.details?.reviews || [];
  const subset = reviews.length > 0 ? reviews : reviewsData.slice(0, 4);

  return (
    <div className="td-section">
      <h2 className="td-section__title">Traveler Reviews</h2>
      <div className="td-reviews__grid">
        {subset.map((r, idx) => (
          <div key={(r as any).id || idx} className="td-review-card">
            <div className="td-review-card__header">
              <img src={r.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=random`} alt={r.name} className="td-review-card__avatar" loading="lazy" />
              <div>
                <div className="td-review-card__name">{r.name}</div>
                <div className="td-review-card__loc">{(r as any).location || (r as any).city}</div>
              </div>
            </div>
            <div className="td-review-card__stars">{renderStars(r.rating)}</div>
            <p className="td-review-card__text">"{r.content}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrekReviewsPreview;
