import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Preloader.module.css';

const Preloader: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) return null;

    return (
        <motion.div
            className={styles.preloader}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.content}>
                <div className={styles.logo}>
                    <motion.div
                        className={styles.mountain}
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        🏔️
                    </motion.div>
                    <h1 className={styles.brandName}>TrekMonk</h1>
                </div>
                <div className={styles.tagline}>Your Adventure, Your India</div>
                <div className={styles.loader}>
                    <motion.div
                        className={styles.loaderBar}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.8, ease: 'easeInOut' }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;
