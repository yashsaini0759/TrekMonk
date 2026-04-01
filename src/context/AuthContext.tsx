import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Load user from localStorage on mount
        const savedUser = localStorage.getItem('trekmonk_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (email: string, password: string) => {
        // Mock login - in production, this would call an API
        const mockUser: User = {
            id: '1',
            name: 'Adventure Seeker',
            email,
            avatar: 'https://ui-avatars.com/api/?name=Adventure+Seeker&background=FF6B35&color=fff',
            phone: '+91 9876543210',
            wishlist: [],
            bookings: [],
            badges: [],
            joinedDate: new Date().toISOString(),
        };

        setUser(mockUser);
        localStorage.setItem('trekmonk_user', JSON.stringify(mockUser));
    };

    const register = async (name: string, email: string, password: string) => {
        // Mock registration - in production, this would call an API
        const mockUser: User = {
            id: Date.now().toString(),
            name,
            email,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FF6B35&color=fff`,
            wishlist: [],
            bookings: [],
            badges: [],
            joinedDate: new Date().toISOString(),
        };

        setUser(mockUser);
        localStorage.setItem('trekmonk_user', JSON.stringify(mockUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('trekmonk_user');
    };

    const updateUser = (updates: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...updates };
            setUser(updatedUser);
            localStorage.setItem('trekmonk_user', JSON.stringify(updatedUser));
        }
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
