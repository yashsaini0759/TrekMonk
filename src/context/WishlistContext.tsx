import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface WishlistContextType {
    wishlist: string[];
    addToWishlist: (tripId: string) => void;
    removeFromWishlist: (tripId: string) => void;
    isInWishlist: (tripId: string) => boolean;
    toggleWishlist: (tripId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within WishlistProvider');
    }
    return context;
};

interface WishlistProviderProps {
    children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
    const [wishlist, setWishlist] = useState<string[]>([]);

    useEffect(() => {
        // Load wishlist from localStorage
        const savedWishlist = localStorage.getItem('trekmonk_wishlist');
        if (savedWishlist) {
            try {
                setWishlist(JSON.parse(savedWishlist));
            } catch {
                setWishlist([]);
            }
        }
    }, []);

    const addToWishlist = (tripId: string) => {
        const updatedWishlist = [...wishlist, tripId];
        setWishlist(updatedWishlist);
        localStorage.setItem('trekmonk_wishlist', JSON.stringify(updatedWishlist));
    };

    const removeFromWishlist = (tripId: string) => {
        const updatedWishlist = wishlist.filter(id => id !== tripId);
        setWishlist(updatedWishlist);
        localStorage.setItem('trekmonk_wishlist', JSON.stringify(updatedWishlist));
    };

    const isInWishlist = (tripId: string) => {
        return wishlist.includes(tripId);
    };

    const toggleWishlist = (tripId: string) => {
        if (isInWishlist(tripId)) {
            removeFromWishlist(tripId);
        } else {
            addToWishlist(tripId);
        }
    };

    const value: WishlistContextType = {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
    };

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
