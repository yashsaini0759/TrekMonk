import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './ImageCard.module.css';

interface ImageCardProps {
    image: string;
    title: string;
    subtitle?: string;
    badge?: ReactNode;
    badgePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    overlay?: 'gradient' | 'dark' | 'light' | 'none';
    aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    href?: string;
    children?: ReactNode;
    hoverScale?: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({
    image,
    title,
    subtitle,
    badge,
    badgePosition = 'bottom-left',
    overlay = 'gradient',
    aspectRatio = '4/3',
    size = 'md',
    onClick,
    href,
    children,
    hoverScale = true,
}) => {
    const cardContent = (
        <motion.div
            className={`${styles.card} ${styles[size]}`}
            onClick={onClick}
            whileHover={hoverScale ? { scale: 1.03 } : {}}
            transition={{ duration: 0.3 }}
        >
            <div className={styles.imageWrapper} style={{ aspectRatio }}>
                <img src={image} alt={title} className={styles.image} loading="lazy" />
                <div className={`${styles.overlay} ${styles[overlay]}`} />

                {badge && (
                    <div className={`${styles.badge} ${styles[badgePosition]}`}>
                        {badge}
                    </div>
                )}

                <div className={styles.content}>
                    <h3 className={styles.title}>{title}</h3>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                    {children}
                </div>
            </div>
        </motion.div>
    );

    if (href) {
        return (
            <Link to={href} className={styles.link}>
                {cardContent}
            </Link>
        );
    }

    return cardContent;
};

export default ImageCard;
