import React, { useState } from 'react';
import { FiCheck, FiShield, FiPhoneCall, FiMinus, FiPlus } from 'react-icons/fi';
import type { Trek, CityOption } from '../../data/trekData';

interface Props {
  trek: Trek;
  selectedCity: CityOption | null;
  onCityChange: (id: string) => void;
}

const TrekBookingCard: React.FC<Props> = ({ trek, selectedCity, onCityChange }) => {
  const [people, setPeople] = useState(1);
  const cities = trek.details?.startingCities ?? [];
  const pricePerPerson = selectedCity?.price ?? trek.price;
  const total = pricePerPerson * people;
  const seatsLeft = trek.details?.seatsLeft;

  const dec = () => setPeople(p => Math.max(1, p - 1));
  const inc = () => setPeople(p => Math.min(seatsLeft ?? 20, p + 1));

  return (
    <aside>
      <div className="td-booking-card">
        {/* Seats badge */}
        {seatsLeft && seatsLeft <= 8 && (
          <div className="td-booking-card__seats">
            Only {seatsLeft} seats remaining — Book fast!
          </div>
        )}

        {/* Per-person price */}
        <div className="td-booking-card__price-wrap">
          <span className="td-booking-card__from">Price per person</span>
          <span className="td-booking-card__price">₹{pricePerPerson.toLocaleString('en-IN')}</span>
        </div>

        {/* City selector */}
        {cities.length > 0 && (
          <>
            <div className="td-booking-card__city-label">Joining From</div>
            <select
              className="td-booking-card__city-select"
              value={selectedCity?.id ?? ''}
              onChange={e => onCityChange(e.target.value)}
            >
              {cities.map(c => (
                <option key={c.id} value={c.id}>
                  {c.city} — ₹{c.price.toLocaleString('en-IN')} ({c.duration})
                </option>
              ))}
            </select>
          </>
        )}

        {/* People counter */}
        <div className="td-booking-card__city-label">Number of People</div>
        <div className="td-booking-card__people">
          <button
            className="td-booking-card__people-btn"
            onClick={dec}
            disabled={people <= 1}
            aria-label="Decrease"
          >
            <FiMinus size={14} />
          </button>
          <span className="td-booking-card__people-count">{people}</span>
          <button
            className="td-booking-card__people-btn"
            onClick={inc}
            disabled={people >= (seatsLeft ?? 20)}
            aria-label="Increase"
          >
            <FiPlus size={14} />
          </button>
        </div>

        {/* Total */}
        <div className="td-booking-card__total">
          <span className="td-booking-card__total-label">Total</span>
          <span className="td-booking-card__total-price">
            ₹{total.toLocaleString('en-IN')}
          </span>
        </div>

        <button className="td-booking-card__btn">Book Now</button>

        <p className="td-booking-card__note">
          <strong>Free cancellation</strong> up to 7 days before the trek.
          EMI from ₹{Math.round(total / 3).toLocaleString('en-IN')}/mo.
        </p>

        <hr className="td-booking-card__divider" />

        <div className="td-booking-card__perks">
          {[
            { icon: <FiCheck size={14} />, text: 'All meals included' },
            { icon: <FiShield size={14} />, text: 'Safe & secure trekking' },
            { icon: <FiPhoneCall size={14} />, text: '24/7 support on trek' },
          ].map(p => (
            <div key={p.text} className="td-booking-card__perk">
              {p.icon}
              <span>{p.text}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default TrekBookingCard;
