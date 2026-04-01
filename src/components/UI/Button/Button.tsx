import React, { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';
import { buttonTap } from '../../../utils/animations';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    icon,
    children,
    className = '',
    disabled,
    ...props
}) => {
    const classNames = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : '',
        loading ? styles.loading : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <motion.button
            className={classNames}
            disabled={disabled || loading}
            whileTap={!disabled && !loading ? buttonTap : undefined}
            {...props}
        >
            {loading && <span className={styles.spinner} />}
            {icon && !loading && <span className={styles.icon}>{icon}</span>}
            <span className={styles.text}>{children}</span>
        </motion.button>
    );
};

export default Button;
