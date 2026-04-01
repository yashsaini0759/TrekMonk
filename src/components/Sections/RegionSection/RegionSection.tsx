import type { Trip } from '../../../types';
import TripCard from '../../Cards/TripCard/TripCard';
import { Link } from 'react-router-dom';
import styles from './RegionSection.module.css';

interface RegionSectionProps {
    title: string;
    trips: Trip[];
    columns?: 2 | 3 | 4 | 5;
    showViewAll?: boolean;
    viewAllLink?: string;
}

const RegionSection: React.FC<RegionSectionProps> = ({
    title,
    trips,
    columns = 5,
    showViewAll = true,
    viewAllLink = '/trips',
}) => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                {showViewAll && (
                    <Link to={viewAllLink} className={styles.viewAll}>
                        View All →
                    </Link>
                )}
            </div>

            <div
                className={styles.grid}
                style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
            >
                {trips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                ))}
            </div>
        </section>
    );
};

export default RegionSection;
