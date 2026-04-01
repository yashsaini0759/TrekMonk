import type { Blog } from '../../../types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock } from 'react-icons/fi';
import styles from './BlogCard.module.css';

interface BlogCardProps {
    blog: Blog;
    variant?: 'horizontal' | 'vertical';
    showAuthor?: boolean;
    showDate?: boolean;
    showExcerpt?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({
    blog,
    variant = 'vertical',
    showAuthor = true,
    showDate = true,
    showExcerpt = true,
}) => {
    return (
        <Link to={`/blog/${blog.slug}`} className={styles.link}>
            <motion.div
                className={`${styles.card} ${styles[variant]}`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
            >
                <div className={styles.imageWrapper}>
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className={styles.image}
                        loading="lazy"
                    />
                </div>

                <div className={styles.content}>
                    <h3 className={styles.title}>{blog.title}</h3>

                    {showExcerpt && (
                        <p className={styles.excerpt}>{blog.excerpt}</p>
                    )}

                    <div className={styles.meta}>
                        {showAuthor && (
                            <div className={styles.author}>
                                <img
                                    src={blog.author.avatar}
                                    alt={blog.author.name}
                                    className={styles.avatar}
                                />
                                <span>By {blog.author.name}</span>
                            </div>
                        )}

                        <div className={styles.metaRight}>
                            {showDate && (
                                <div className={styles.metaItem}>
                                    <FiCalendar />
                                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                                </div>
                            )}
                            <div className={styles.metaItem}>
                                <FiClock />
                                <span>{blog.readingTime} min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default BlogCard;
