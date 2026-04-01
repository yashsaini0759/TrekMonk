import type { Region } from '../../../types';
import ImageCard from '../../UI/ImageCard/ImageCard';
import styles from './RegionCard.module.css';

interface RegionCardProps {
    region: Region;
    variant?: 'large' | 'medium' | 'small';
    showDescription?: boolean;
    prefix?: string; // e.g., "Getaways from"
}

const RegionCard: React.FC<RegionCardProps> = ({
    region,
    variant = 'medium',
    showDescription = false,
    prefix,
}) => {
    return (
        <ImageCard
            image={region.banner}
            title={region.name}
            subtitle={prefix}
            href={`/region/${region.slug}`}
            overlay="dark"
            aspectRatio="4/3"
            size={variant === 'large' ? 'lg' : variant === 'small' ? 'sm' : 'md'}
        >
            {showDescription && region.description && (
                <p className={styles.description}>{region.description}</p>
            )}
        </ImageCard>
    );
};

export default RegionCard;
