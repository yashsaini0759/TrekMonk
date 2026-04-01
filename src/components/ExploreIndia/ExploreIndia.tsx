import React, { useEffect, useRef, useState, useMemo } from 'react';
import type { ExploreSectionProps, IndiaCategory } from './ExploreIndia.types';
import { unifiedTrekData } from '../../data/unifiedTrekData';
import { useNavigate } from 'react-router-dom';
import './ExploreIndia.css';

const CategoryCard: React.FC<{
    category: IndiaCategory;
    index: number;
    isVisible: boolean;
}> = ({ category, index, isVisible }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/trek/${category.slug}`);
    };

    return (
        <div
            className={`explore-card ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: `${index * 0.08}s` }}
            onClick={handleNavigate}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleNavigate()}
            aria-label={`Explore ${category.name}`}
        >
            {/* Image */}
            <div className="explore-card__image-wrap">
                <img
                    src={category.image}
                    alt={category.name}
                    className="explore-card__image"
                    loading="lazy"
                    decoding="async"
                />
                <div className="explore-card__overlay" />
            </div>

            {/* Badge */}
            {category.badge && (
                <span className="explore-card__badge">{category.badge}</span>
            )}

            {/* Text */}
            <div className="explore-card__text">
                {category.subtitle && (
                    <p className="explore-card__subtitle">{category.subtitle}</p>
                )}
                <h3 className="explore-card__title">{category.name}</h3>
            </div>

            {/* Arrow */}
            <div className="explore-card__arrow">→</div>
        </div>
    );
};

const ExploreIndia: React.FC<ExploreSectionProps> = ({
    viewMorePath = '/all-treks',
    heading = 'Explore Incredible India',
    subHeading = 'Handpicked journeys across the most breathtaking landscapes of India.',
}) => {
    const sectionRef = useRef<HTMLElement>(null);
    const [visibleCards, setVisibleCards] = useState(false);

    // Dynamically generate categories from the connected unifiedTrekData
    // We want a mix: 2 from North, 2 from South, 2 from NE, 2 from Rajasthan
    const connectedCategories = useMemo(() => {
        const regions = ['north', 'south', 'north-east', 'rajasthan'];
        const mixedCategories: IndiaCategory[] = [];
        
        regions.forEach(region => {
            // Get treks for this region
            const regionTreks = unifiedTrekData.filter(t => t.region === region);
            
            // Randomly shuffle using a simple sort
            const shuffled = [...regionTreks].sort(() => 0.5 - Math.random());
            
            // Take top 2
            shuffled.slice(0, 2).forEach(trek => {
                mixedCategories.push({
                    id: trek.id,
                    name: trek.name,
                    subtitle: trek.location,
                    slug: trek.slug,
                    image: trek.image,
                    badge: trek.tags[0] // Use first tag as badge
                });
            });
        });
        
        // Final shuffle of the 8 cards so they aren't completely grouped by region in the grid
        return mixedCategories.sort(() => 0.5 - Math.random());
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisibleCards(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="explore-india" id="explore-india">
            {/* Section Divider */}
            <div className="explore-india__divider" aria-hidden="true" />

            <div className="explore-india__container">
                <div className={`explore-india__header ${visibleCards ? 'visible' : ''}`}>
                    <div className="explore-india__heading-group">
                        <h2 className="explore-india__heading">{heading}</h2>
                        <p className="explore-india__subheading">{subHeading}</p>
                    </div>

                    <a
                        href={viewMorePath}
                        className="explore-india__view-more"
                        aria-label="View all India trips"
                    >
                        View More <span className="explore-india__arrow">→</span>
                    </a>
                </div>

                {/* Cards Grid */}
                <div className="explore-india__grid">
                    {connectedCategories.map((cat, i) => (
                        <CategoryCard
                            key={cat.id}
                            category={cat}
                            index={i}
                            isVisible={visibleCards}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExploreIndia;
