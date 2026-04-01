import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { pageTransition } from '../../utils/animations';
import Card from '../../components/UI/Card/Card';
import Button from '../../components/UI/Button/Button';

const Profile: React.FC = () => {
    const { user, logout } = useAuth();
    const { wishlist } = useWishlist();

    if (!user) {
        return <div className="container" style={{ padding: '4rem 0' }}><h1>Please login to view your profile</h1></div>;
    }

    return (
        <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
            <div className="container" style={{ padding: '4rem 0' }}>
                <h1>My Profile</h1>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginTop: '2rem' }}>
                    <Card>
                        <div style={{ textAlign: 'center' }}>
                            <img src={user.avatar} alt={user.name} style={{ width: '120px', height: '120px', borderRadius: '50%', marginBottom: '1rem' }} />
                            <h2>{user.name}</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>{user.email}</p>
                            <Button variant="outline" fullWidth style={{ marginTop: '1rem' }} onClick={logout}>Logout</Button>
                        </div>
                    </Card>
                    <div>
                        <Card>
                            <h3>Wishlist ({wishlist.length} trips)</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Your saved trips will appear here</p>
                        </Card>
                        <Card style={{ marginTop: '1.5rem' }}>
                            <h3>Bookings</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Your upcoming and past trips</p>
                        </Card>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
