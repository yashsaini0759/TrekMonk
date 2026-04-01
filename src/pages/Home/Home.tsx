import { motion } from 'framer-motion';
import CategoryGrid from '../../components/Sections/CategoryGrid/CategoryGrid';
import RegionSection from '../../components/Sections/RegionSection/RegionSection';
import BlogCard from '../../components/Cards/BlogCard/BlogCard';
import { categories } from '../../data/categories';
import { trips, getFeaturedTrips } from '../../data/trips';
import { blogs } from '../../data/blogs';
import { testimonials } from '../../data/testimonials';
import styles from './Home.module.css';

const Home = () => {
    const featuredTrips = getFeaturedTrips();
    const internationalCategories = categories.slice(0, 8); // First 8 are international/getaways

    return (
        <div className={styles.home}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Your Adventure, Your India
                    </motion.h1>
                    <motion.p
                        className={styles.heroSubtitle}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Discover incredible destinations, create unforgettable memories
                    </motion.p>
                </div>
            </section>

            {/* Curated Categories */}
            <div className="container">
                <CategoryGrid
                    title="Curated Categories"
                    categories={internationalCategories}
                    columns={4}
                />
            </div>

            {/* Majestic Sahyadri */}
            <div className="container">
                <RegionSection
                    title="Majestic Sahyadri"
                    trips={featuredTrips.slice(0, 5)}
                    columns={5}
                />
            </div>

            {/* Featured Trips */}
            <div className="container">
                <RegionSection
                    title="Featured Adventures"
                    trips={featuredTrips}
                    columns={3}
                    viewAllLink="/trips"
                />
            </div>

            {/* Latest Blogs */}
            <div className="container">
                <section className={styles.blogSection}>
                    <h2 className={styles.sectionTitle}>Latest Blogs</h2>
                    <p className={styles.sectionSubtitle}>Discover our stories</p>
                    <div className={styles.blogGrid}>
                        {blogs.slice(0, 3).map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                </section>
            </div>

            {/* Testimonials */}
            <section className={styles.testimonialsSection}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>What Travelers Say</h2>
                    <div className={styles.testimonialsGrid}>
                        {testimonials.slice(0, 3).map((testimonial) => (
                            <motion.div
                                key={testimonial.id}
                                className={styles.testimonialCard}
                                whileHover={{ y: -4 }}
                            >
                                <div className={styles.testimonialHeader}>
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className={styles.testimonialAvatar}
                                    />
                                    <div>
                                        <h4 className={styles.testimonialName}>{testimonial.name}</h4>
                                        <p className={styles.testimonialTrip}>{testimonial.tripName}</p>
                                    </div>
                                </div>
                                <div className={styles.testimonialRating}>
                                    {'⭐'.repeat(testimonial.rating)}
                                </div>
                                <p className={styles.testimonialComment}>{testimonial.comment}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <h2 className={styles.ctaTitle}>Ready for Your Next Adventure?</h2>
                    <p className={styles.ctaText}>
                        Join thousands of travelers who have discovered India with TrekMonk
                    </p>
                    <button className={styles.ctaButton}>Explore All Trips</button>
                </div>
            </section>
        </div>
    );
};

export default Home;
