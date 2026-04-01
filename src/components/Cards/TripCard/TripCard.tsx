import type { Trip } from '../../../types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Badge from '../../UI/Badge/Badge';
import { FiClock, FiMapPin, FiStar } from 'react-icons/fi';
import styles from './TripCard.module.css';

interface TripCardProps {
    trip: Trip;
    variant?: 'grid' | 'list' | 'compact';
    showBadge?: boolean;
    showPrice?: boolean;
    showRating?: boolean;
    showDuration?: boolean;
}

const TripCard: React.FC<TripCardProps> = ({
    trip,
    variant = 'grid',
    showBadge = true,
    showPrice = true,
    showRating = true,
    showDuration = true,
}) => {
    return (
        <Link to={`/trips/${trip.slug}`} className={styles.link}>
            <motion.div
                className={`${styles.card} ${styles[variant]}`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
            >
                <div className={styles.imageWrapper}>
                    <img
                        src={trip.coverImage}
                        alt={trip.title}
                        className={styles.image}
                        loading="lazy"
                    />
                    {showBadge && (
                        <div className={styles.badge}>
                            <Badge variant="success" size="sm">
                                Group Trip
                            </Badge>
                        </div>
                    )}
                </div>

                <div className={styles.content}>
                    <h3 className={styles.title}>{trip.title}</h3>

                    {variant !== 'compact' && (
                        <p className={styles.description}>{trip.shortDescription}</p>
                    )}

                    <div className={styles.meta}>
                        {showDuration && (
                            <div className={styles.metaItem}>
                                <FiClock />
                                <span>{trip.duration}N/{trip.duration + 1}D</span>
                            </div>
                        )}
                        <div className={styles.metaItem}>
                            <FiMapPin />
                            <span>{trip.region}</span>
                        </div>
                        {showRating && (
                            <div className={styles.metaItem}>
                                <FiStar />
                                <span>{trip.rating}</span>
                            </div>
                        )}
                    </div>

                    {showPrice && (
                        <div className={styles.priceSection}>
                            {trip.originalPrice && (
                                <span className={styles.originalPrice}>
                                    ₹{trip.originalPrice.toLocaleString()}
                                </span>
                            )}
                            <span className={styles.price}>
                                ₹{trip.price.toLocaleString()}
                            </span>
                            <span className={styles.perPerson}>/ person</span>
                        </div>
                    )}
                </div>
            </motion.div>
        </Link>
    );
};

export default TripCard;
