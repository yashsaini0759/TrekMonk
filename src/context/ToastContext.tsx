import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { ToastMessage } from '../types';

interface ToastContextType {
    toasts: ToastMessage[];
    addToast: (message: string, type?: ToastMessage['type'], duration?: number) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = (
        message: string,
        type: ToastMessage['type'] = 'info',
        duration: number = 3000
    ) => {
        const id = Date.now().toString() + Math.random().toString(36);
        const newToast: ToastMessage = { id, message, type, duration };

        setToasts(prev => [...prev, newToast]);

        // Auto-remove toast after duration
        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const value: ToastContextType = {
        toasts,
        addToast,
        removeToast,
    };

    return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};
