import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getTripBySlug } from '../../data/trips';
import { pageTransition } from '../../utils/animations';
import Button from '../../components/UI/Button/Button';
import { FiCalendar, FiUsers, FiMapPin, FiCheck, FiX } from 'react-icons/fi';

const TripDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const trip = getTripBySlug(slug || '');

    if (!trip) {
        return <div className="container" style={{ padding: '4rem 0' }}><h1>Trip not found</h1></div>;
    }

    return (
        <motion.div
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div style={{ width: '100%', height: '400px', overflow: 'hidden' }}>
                <img src={trip.coverImage} alt={trip.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="container" style={{ padding: '3rem 0' }}>
                <h1>{trip.title}</h1>
                <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', margin: '1rem 0 2rem' }}>{trip.shortDescription}</p>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
                    <div>
                        <h2>Itinerary</h2>
                        {trip.itinerary.map((day) => (
                            <div key={day.day} style={{ marginBottom: '2rem', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
                                <h3>Day {day.day}: {day.title}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{day.description}</p>
                                <ul style={{ marginTop: '1rem' }}>
                                    {day.highlights.map((highlight, i) => (
                                        <li key={i} style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>• {highlight}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <h2 style={{ marginTop: '3rem' }}>What's Included</h2>
                        <ul style={{ marginTop: '1rem' }}>
                            {trip.includes.map((item, i) => (
                                <li key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <FiCheck style={{ color: 'var(--color-success)', marginTop: '0.25rem' }} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <h2 style={{ marginTop: '2rem' }}>What's Excluded</h2>
                        <ul style={{ marginTop: '1rem' }}>
                            {trip.excludes.map((item, i) => (
                                <li key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <FiX style={{ color: 'var(--color-error)', marginTop: '0.25rem' }} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div style={{ position: 'sticky', top: '100px', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xl)' }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                {trip.originalPrice && (
                                    <span style={{ textDecoration: 'line-through', color: 'var(--text-tertiary)', marginRight: '0.5rem' }}>₹{trip.originalPrice}</span>
                                )}
                                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>₹{trip.price}</span>
                                <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>per person</span>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                    <FiCalendar />
                                    <span>{trip.duration} days</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                    <FiUsers />
                                    <span>Group size: {trip.groupSize.min}-{trip.groupSize.max}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FiMapPin />
                                    <span>{trip.region}</span>
                                </div>
                            </div>

                            <Button fullWidth size="lg">Book Now</Button>
                            <Button fullWidth variant="outline" size="lg" style={{ marginTop: '1rem' }}>Send Inquiry</Button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TripDetail;
