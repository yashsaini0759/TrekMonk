import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import { modalBackdrop, modalContent } from '../../../utils/animations';
import { FiX } from 'react-icons/fi';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true,
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    const modalRoot = document.getElementById('modal-root') || document.body;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className={styles.backdrop}
                        variants={modalBackdrop}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        onClick={onClose}
                    />
                    <div className={styles.modalWrapper}>
                        <motion.div
                            className={`${styles.modal} ${styles[size]}`}
                            variants={modalContent}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {(title || showCloseButton) && (
                                <div className={styles.header}>
                                    {title && <h3 className={styles.title}>{title}</h3>}
                                    {showCloseButton && (
                                        <button
                                            className={styles.closeButton}
                                            onClick={onClose}
                                            aria-label="Close modal"
                                        >
                                            <FiX />
                                        </button>
                                    )}
                                </div>
                            )}
                            <div className={styles.content}>{children}</div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        modalRoot
    );
};

export default Modal;
