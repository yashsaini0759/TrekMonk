import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { pageTransition } from '../../utils/animations';
import Button from '../../components/UI/Button/Button';
import Card from '../../components/UI/Card/Card';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            addToast('Welcome back to TrekMonk!', 'success');
            navigate('/');
        } catch (error) {
            addToast('Login failed. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}
        >
            <div style={{ maxWidth: '400px', width: '100%', padding: '0 1rem' }}>
                <Card>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Login to continue your adventure</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '2px solid var(--color-gray-200)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '1rem',
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '2px solid var(--color-gray-200)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '1rem',
                                }}
                            />
                        </div>

                        <Button type="submit" fullWidth size="lg" loading={loading}>
                            Login
                        </Button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
                        Don't have an account? <a href="/register" style={{ color: 'var(--color-primary)', fontWeight: '500' }}>Register</a>
                    </p>
                </Card>
            </div>
        </motion.div>
    );
};

export default Login;
