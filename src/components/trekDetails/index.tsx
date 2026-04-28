import React, { useState } from 'react';
import TrekHero from './TrekHero';
import TrekInfo from './TrekInfo';
import TrekIncludes from './TrekIncludes';
import TrekAbout from './TrekAbout';
import TrekJoinFrom from './TrekJoinFrom';
import TrekItinerary from './TrekItinerary';
import TrekAttractions from './TrekAttractions';
import TrekBookingCard from './TrekBookingCard';
import TrekInquiryForm from './TrekInquiryForm';
import TrekFAQ from './TrekFAQ';
import TrekReviewsPreview from './TrekReviewsPreview';
import TrekRecommendations from './TrekRecommendations';
import type { Trek, CityOption } from '../../data/trekData';
import '../../styles/trekDetails.css';

interface Props { trek: Trek }

const TrekDetailsPage: React.FC<Props> = ({ trek }) => {
  const cities = trek.details?.startingCities ?? [];
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(cities[0] ?? null);

  const handleCitySelect = (city: CityOption) => setSelectedCity(city);
  const handleCityChange = (id: string) => {
    const found = cities.find(c => c.id === id);
    if (found) setSelectedCity(found);
  };
  const price = selectedCity?.price ?? trek.price;

  return (
    <div className="td-page">
      <TrekHero trek={trek} />
      <TrekInfo trek={trek} />

      <div className="td-main">
        {/* Left content column */}
        <div className="td-left">
          <TrekAbout trek={trek} />
          <TrekIncludes trek={trek} />
          <TrekJoinFrom
            trek={trek}
            onCitySelect={handleCitySelect}
            selectedCityId={selectedCity?.id ?? ''}
          />
          <TrekItinerary trek={trek} />
          <TrekAttractions trek={trek} />
          <TrekReviewsPreview trek={trek} />
          <TrekFAQ trek={trek} />
          <TrekRecommendations trek={trek} />
          <TrekInquiryForm />
        </div>

        {/* Right sticky booking card */}
        <div className="td-right">
          <TrekBookingCard
            trek={trek}
            selectedCity={selectedCity}
            onCityChange={handleCityChange}
          />
        </div>
      </div>

      {/* Mobile fixed bottom bar */}
      <div className="td-mobile-book">
        <div>
          <div className="td-mobile-book__price">₹{price.toLocaleString('en-IN')}</div>
          <div className="td-mobile-book__per">per person</div>
        </div>
        <button className="td-mobile-book__btn">Book Now</button>
      </div>
    </div>
  );
};

export default TrekDetailsPage;
