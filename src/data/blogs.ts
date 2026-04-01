import type { Blog } from '../types';

export const blogs: Blog[] = [
    {
        id: '1',
        slug: 'kedarkantha-trek-guide',
        title: 'Complete Guide to Kedarkantha Trek: Everything You Need to Know',
        excerpt: 'Planning your first Himalayan trek? Discover why Kedarkantha is the perfect winter trek for beginners with our comprehensive guide.',
        content: `# Complete Guide to Kedarkantha Trek

Kedarkantha trek is one of the most popular winter treks in India, offering stunning views of snow-covered Himalayan peaks...

## Why Choose Kedarkantha?

- Perfect for beginners
- Accessible year-round
- Spectacular summit views
- Well-marked trails

## Best Time to Visit

December to April is ideal for snow trekking...`,
        coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
        author: {
            name: 'Priya Sharma',
            avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=FF6B35&color=fff',
        },
        date: '2025-11-15',
        readingTime: 8,
        category: 'Trek Guides',
        tags: ['Himalayan Treks', 'Winter Treks', 'Beginner Friendly'],
        relatedBlogs: ['2', '3'],
    },
    {
        id: '2',
        slug: 'essential-trekking-gear',
        title: '15 Essential Items for Your First Himalayan Trek',
        excerpt: 'Don\'t let improper gear ruin your trek! Here\'s a complete packing checklist for Himalayan adventures.',
        content: `# Essential Trekking Gear

Proper gear can make or break your trekking experience...

## Must-Have Items

1. Trekking Shoes
2. Backpack
3. Warm Layers
...`,
        coverImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200',
        author: {
            name: 'Rahul Verma',
            avatar: 'https://ui-avatars.com/api/?name=Rahul+Verma&background=004E89&color=fff',
        },
        date: '2025-11-10',
        readingTime: 6,
        category: 'Gear & Tips',
        tags: ['Trekking Gear', 'Packing List', 'Tips'],
        relatedBlogs: ['1'],
    },
    {
        id: '3',
        slug: 'monsoon-treks-maharashtra',
        title: 'Top 10 Monsoon Treks in Maharashtra You Must Experience',
        excerpt: 'Discover the magic of Sahyadri mountains during monsoon with waterfalls, mist, and lush greenery.',
        content: `# Top Monsoon Treks in Maharashtra

The Western Ghats come alive during monsoon season...

## 1. Harishchandragad
## 2. Rajmachi
## 3. Kalsubai
...`,
        coverImage: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200',
        author: {
            name: 'Sneha Patil',
            avatar: 'https://ui-avatars.com/api/?name=Sneha+Patil&background=F7B801&color=000',
        },
        date: '2025-11-05',
        readingTime: 10,
        category: 'Destinations',
        tags: ['Monsoon', 'Sahyadri', 'Maharashtra'],
        relatedBlogs: ['1', '2'],
    },
    {
        id: '4',
        slug: 'rajasthan-travel-guide',
        title: 'Rajasthan in Winter: A Complete Travel Guide',
        excerpt: 'Experience the royal heritage, desert safaris, and vibrant culture of Rajasthan during the best season.',
        content: `# Rajasthan Winter Travel Guide

Winter is the perfect time to explore Rajasthan...`,
        coverImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200',
        author: {
            name: 'Amit Singh',
            avatar: 'https://ui-avatars.com/api/?name=Amit+Singh&background=FF6B35&color=fff',
        },
        date: '2025-10-28',
        readingTime: 12,
        category: 'Destinations',
        tags: ['Rajasthan', 'Winter', 'Cultural'],
    },
];

export const getBlogBySlug = (slug: string): Blog | undefined => {
    return blogs.find(blog => blog.slug === slug);
};

export const getRelatedBlogs = (blogId: string): Blog[] => {
    const blog = blogs.find(b => b.id === blogId);
    if (!blog?.relatedBlogs) return [];
    return blogs.filter(b => blog.relatedBlogs?.includes(b.id));
};
