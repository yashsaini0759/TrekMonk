import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBlogBySlug } from '../../data/blogs';
import { pageTransition } from '../../utils/animations';

const BlogDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const blog = getBlogBySlug(slug || '');

    if (!blog) {
        return <div className="container" style={{ padding: '4rem 0' }}><h1>Blog not found</h1></div>;
    }

    return (
        <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
            <div style={{ width: '100%', height: '400px', overflow: 'hidden' }}>
                <img src={blog.coverImage} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="container-narrow" style={{ padding: '3rem 0' }}>
                <h1>{blog.title}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0 2rem' }}>
                    <img src={blog.author.avatar} alt={blog.author.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                    <div>
                        <p style={{ fontWeight: '500', margin: 0 }}>{blog.author.name}</p>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', margin: 0 }}>{blog.date} • {blog.readingTime} min read</p>
                    </div>
                </div>
                <div style={{ lineHeight: '1.75', fontSize: '1.125rem' }} dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }} />
            </div>
        </motion.div>
    );
};

export default BlogDetail;
