import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { trips } from '../../data/trips';
import { pageTransition } from '../../utils/animations';
import Card from '../../components/UI/Card/Card';
import Button from '../../components/UI/Button/Button';


const TripsList: React.FC = () => {
    return (
        <motion.div
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ padding: '4rem 0' }}
        >
            <div className="container">
                <h1 style={{ marginBottom: '2rem' }}>All Trips</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                    {trips.map((trip) => (
                        <Link key={trip.id} to={`/trips/${trip.slug}`} style={{ textDecoration: 'none' }}>
                            <Card hoverable padding="none">
                                <div>
                                    <img src={trip.coverImage} alt={trip.title} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                                    <div style={{ padding: '1.5rem' }}>
                                        <h3>{trip.title}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.5rem 0' }}>{trip.shortDescription}</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>₹{trip.price}</span>
                                            <Button size="sm">View Details</Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default TripsList;
