import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogs } from '../../data/blogs';
import { pageTransition } from '../../utils/animations';
import Card from '../../components/UI/Card/Card';

const BlogList: React.FC = () => {
    return (
        <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
            <div className="container" style={{ padding: '4rem 0' }}>
                <h1>Travel Blog</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                    {blogs.map((blog) => (
                        <Link key={blog.id} to={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }}>
                            <Card hoverable padding="none">
                                <img src={blog.coverImage} alt={blog.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                <div style={{ padding: '1.5rem' }}>
                                    <h3>{blog.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.5rem 0' }}>{blog.excerpt}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '1rem' }}>
                                        <span>{blog.author.name}</span>
                                        <span>{blog.readingTime} min read</span>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default BlogList;
