import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../../context/ToastContext';
import styles from './Toast.module.css';
import { toastSlide } from '../../../utils/animations';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX, FiAlertTriangle } from 'react-icons/fi';

const Toast: React.FC = () => {
    const { toasts, removeToast } = useToast();

    const getIcon = (type: string) => {
        switch (type) {
            case 'success':
                return <FiCheckCircle />;
            case 'error':
                return <FiAlertCircle />;
            case 'warning':
                return <FiAlertTriangle />;
            case 'info':
            default:
                return <FiInfo />;
        }
    };

    return (
        <div className={styles.toastContainer}>
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        className={`${styles.toast} ${styles[toast.type]}`}
                        variants={toastSlide}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        layout
                    >
                        <div className={styles.icon}>{getIcon(toast.type)}</div>
                        <p className={styles.message}>{toast.message}</p>
                        <button
                            className={styles.closeButton}
                            onClick={() => removeToast(toast.id)}
                            aria-label="Close notification"
                        >
                            <FiX />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Toast;
