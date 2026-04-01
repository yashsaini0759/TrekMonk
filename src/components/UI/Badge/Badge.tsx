import type { ReactNode } from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
    children: ReactNode;
    variant?: 'success' | 'primary' | 'warning' | 'info';
    size?: 'sm' | 'md' | 'lg';
    icon?: ReactNode;
    rounded?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'success',
    size = 'md',
    icon,
    rounded = false,
}) => {
    return (
        <span
            className={`${styles.badge} ${styles[variant]} ${styles[size]} ${rounded ? styles.rounded : ''
                }`}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            {children}
        </span>
    );
};

export default Badge;
