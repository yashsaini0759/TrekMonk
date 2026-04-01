import React from 'react';
import { motion } from 'framer-motion';
import styles from './Card.module.css';
import { cardHover } from '../../../utils/animations';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hoverable?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    onClick,
    hoverable = true,
    padding = 'md',
}) => {
    const classNames = [
        styles.card,
        styles[`padding-${padding}`],
        onClick ? styles.clickable : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const MotionCard = motion.div;

    return (
        <MotionCard
            className={classNames}
            onClick={onClick}
            variants={hoverable ? cardHover : undefined}
            initial="rest"
            whileHover={hoverable ? "hover" : undefined}
            transition={{ duration: 0.3 }}
        >
            {children}
        </MotionCard>
    );
};

export default Card;
