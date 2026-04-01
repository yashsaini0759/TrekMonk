import type { Category } from '../../../types';
import ImageCard from '../../UI/ImageCard/ImageCard';
import styles from './CategoryCard.module.css';

interface CategoryCardProps {
    category: Category;
    variant?: 'default' | 'compact';
    showCount?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
    category,
    variant = 'default',
    showCount = false,
}) => {
    return (
        <ImageCard
            image={category.image}
            title={category.name}
            subtitle={showCount ? `${category.tripCount} trips` : undefined}
            href={`/category/${category.slug}`}
            overlay="gradient"
            aspectRatio={variant === 'compact' ? '16/9' : '4/3'}
            size={variant === 'compact' ? 'sm' : 'md'}
        >
            {variant === 'default' && category.description && (
                <p className={styles.description}>{category.description}</p>
            )}
        </ImageCard>
    );
};

export default CategoryCard;
