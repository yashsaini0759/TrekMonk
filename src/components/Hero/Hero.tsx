import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import type { HeroProps } from './Hero.types';
import './Hero.css';

const Hero: React.FC<HeroProps> = ({
    backgroundImages,
    microTagline = "India's Trusted Trekking Community",
    headline,
    subHeadline,
    primaryCta,
    secondaryCta,
    transitionInterval = 6000,
    enableParticles = false,
    enableReducedMotion = false,
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const heroRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const shouldReduceMotion = enableReducedMotion || prefersReducedMotion;

    // Background image rotation
    useEffect(() => {
        if (shouldReduceMotion || backgroundImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        }, transitionInterval);

        return () => clearInterval(interval);
    }, [backgroundImages.length, transitionInterval, shouldReduceMotion]);

    // Track hero visibility for performance
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        return () => {
            if (heroRef.current) {
                observer.unobserve(heroRef.current);
            }
        };
    }, []);

    // Preload images
    useEffect(() => {
        backgroundImages.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, [backgroundImages]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    const microTaglineVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
            },
        },
    };

    const scrollToContent = () => {
        const heroHeight = heroRef.current?.offsetHeight || 0;
        window.scrollTo({
            top: heroHeight,
            behavior: 'smooth',
        });
    };

    return (
        <div ref={heroRef} className="hero-container">
            {/* Background Image Slideshow */}
            <div className="hero-background">
                <AnimatePresence mode="sync">
                    {backgroundImages.map((image, index) => (
                        index === currentImageIndex && (
                            <motion.div
                                key={`bg-${index}`}
                                className={`hero-bg-image ${!shouldReduceMotion && isVisible ? 'zoom-effect' : ''}`}
                                style={{ backgroundImage: `url(${image})` }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5 }}
                            />
                        )
                    ))}
                </AnimatePresence>

                {/* Gradient Overlay */}
                <div className="hero-overlay" />
            </div>

            {/* Optional Particles */}
            {enableParticles && !shouldReduceMotion && (
                <div className="hero-particles">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={`particle-${i}`}
                            className="particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${15 + Math.random() * 10}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Hero Content */}
            <motion.div
                className="hero-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Text Content Container */}
                <div className="hero-text-content">
                    {/* Micro Tagline */}
                    {microTagline && (
                        <motion.p
                            className="hero-micro-tagline"
                            variants={microTaglineVariants}
                        >
                            {microTagline}
                        </motion.p>
                    )}

                    {/* Main Headline */}
                    <motion.h1 className="hero-headline" variants={itemVariants}>
                        {headline.split('\n').map((line, i) => (
                            <span key={i} className="headline-line">
                                {line}
                            </span>
                        ))}
                    </motion.h1>

                    {/* Sub Headline */}
                    {subHeadline && (
                        <motion.p className="hero-subheadline" variants={itemVariants}>
                            {subHeadline}
                        </motion.p>
                    )}
                </div>

                {/* CTA Container */}
                <div className="hero-cta-container">
                    <motion.div className="hero-cta-group" variants={itemVariants}>
                        <motion.button
                            className="hero-cta-primary"
                            onClick={primaryCta.onClick}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        >
                            {primaryCta.text}
                        </motion.button>

                        {secondaryCta && (
                            <motion.button
                                className="hero-cta-secondary"
                                onClick={secondaryCta.onClick}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            >
                                {secondaryCta.text}
                            </motion.button>
                        )}
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="hero-scroll-indicator"
                onClick={scrollToContent}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            >
                <FaChevronDown />
            </motion.div>
        </div>
    );
};

export default Hero;
