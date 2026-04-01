import type { Category } from '../../../types';
import CategoryCard from '../../Cards/CategoryCard/CategoryCard';
import styles from './CategoryGrid.module.css';

interface CategoryGridProps {
    title?: string;
    categories: Category[];
    columns?: 2 | 3 | 4;
    variant?: 'default' | 'compact';
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
    title,
    categories,
    columns = 4,
    variant = 'default',
}) => {
    return (
        <section className={styles.section}>
            {title && <h2 className={styles.title}>{title}</h2>}

            <div
                className={styles.grid}
                style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
            >
                {categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        variant={variant}
                        showCount={variant === 'default'}
                    />
                ))}
            </div>
        </section>
    );
};

export default CategoryGrid;
