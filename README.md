# TrekMonk - India's Biggest Adventure Travel Platform

![TrekMonk](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=300&fit=crop)

> **Your Adventure, Your India** 🏔️

A complete, enterprise-grade React + TypeScript web application for adventure travel, combining the best features of TrekPanda, Airbnb Experiences, Thrillophilia, and MakeMyTrip.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at **http://localhost:5173/**

---

## ✨ Features

### 🎯 Core Functionality
- **10+ Pages**: Home, Trips List, Trip Detail, Blog, Auth, Profile, Contact, FAQ
- **Authentication**: Login/Register with protected routes
- **Wishlist**: Save favorite trips with localStorage persistence
- **Toast Notifications**: Real-time feedback for all actions
- **Responsive Design**: Mobile-first, works on all devices
- **Dark Mode Ready**: Theme context with easy toggle implementation

### 🎨 Premium Design
- **Framer Motion Animations**: Smooth page transitions, hover effects, scroll reveals
- **Google Fonts**: Inter + Outfit for modern typography
- **CSS Custom Properties**: 100+ design tokens for consistency
- **Gradient Backgrounds**: Eye-catching hero sections and CTAs
- **Micro-interactions**: Button ripples, card hovers, toast slides

### 🧩 Component Architecture
- **15+ Reusable Components**: Button, Card, Modal, Toast, Navbar, Footer, etc.
- **CSS Modules**: Component-scoped styling for maintainability
- **TypeScript**: Full type safety across the application
- **Context API**: Global state management (Auth, Wishlist, Toast, Theme)

### 📊 Smart Features
- **Recommendation Engine**: Personalized trip suggestions
- **Mock Data**: 3 detailed trips, 6 regions, 12 categories, 4 blogs
- **Helper Functions**: Trip filtering, search, related content

---

## 📁 Project Structure

```
trekmonk/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout/         # Navbar, Footer
│   │   ├── UI/             # Button, Card, Modal, Toast, etc.
│   │   ├── Home/           # Home page sections
│   │   ├── Trips/          # Trip list components
│   │   ├── TripDetail/     # Trip detail sections
│   │   └── Blog/           # Blog components
│   ├── pages/              # Page components
│   │   ├── Home/           # Landing page
│   │   ├── Trips/          # Trips list page
│   │   ├── TripDetail/     # Individual trip page
│   │   ├── Blog/           # Blog list & detail
│   │   ├── Auth/           # Login & Register
│   │   ├── Profile/        # User dashboard
│   │   ├── Contact/        # Contact form
│   │   └── FAQ/            # FAQ page
│   ├── context/            # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── WishlistContext.tsx
│   │   ├── ToastContext.tsx
│   │   └── ThemeContext.tsx
│   ├── data/               # Mock data
│   │   ├── trips.ts
│   │   ├── blogs.ts
│   │   ├── regions.ts
│   │   ├── categories.ts
│   │   └── testimonials.ts
│   ├── types/              # TypeScript interfaces
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   ├── animations.ts   # Framer Motion variants
│   │   └── recommendations.ts  # Smart recommendation logic
│   ├── styles/             # Global styles
│   │   └── globals.css
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
└── package.json
```

---

## 🎨 Design System

### Colors
```css
--color-primary: #FF6B35;      /* Orange */
--color-secondary: #004E89;    /* Blue */
--color-accent: #F7B801;       /* Gold */
--color-success: #10B981;      /* Green */
--color-error: #EF4444;        /* Red */
```

### Typography
- **Headings**: Outfit (Bold, Extrabold)
- **Body**: Inter (Regular, Medium, Semibold)
- **Sizes**: 0.75rem to 3.75rem (responsive)

### Spacing
- **Scale**: 0.25rem, 0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem, 6rem
- **Container**: Max-width 1280px with responsive padding

---

## 🔧 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather Icons)
- **Styling**: CSS Modules + Global CSS
- **State**: React Context API
- **Fonts**: Google Fonts (Inter, Outfit)

---

## 📝 How to Add New Content

### Adding a New Trip

Edit `src/data/trips.ts`:

```typescript
{
  id: '4',
  slug: 'your-trip-slug',
  title: 'Your Trip Name',
  shortDescription: 'Brief description',
  region: 'Region Name',
  regionSlug: 'region-slug',
  difficulty: 'Moderate',
  duration: 5,
  price: 9999,
  // ... add all required fields
}
```

### Adding a New Blog Post

Edit `src/data/blogs.ts`:

```typescript
{
  id: '5',
  slug: 'your-blog-slug',
  title: 'Your Blog Title',
  excerpt: 'Short excerpt',
  content: 'Full blog content...',
  coverImage: 'https://...',
  author: {
    name: 'Author Name',
    avatar: 'https://...'
  },
  date: '2025-11-23',
  readingTime: 10,
  category: 'Category',
  tags: ['tag1', 'tag2']
}
```

### Adding a New Category

Edit `src/data/categories.ts`:

```typescript
{
  id: '13',
  name: 'New Category',
  slug: 'new-category',
  description: 'Category description',
  icon: '🎯',
  image: 'https://...',
  tripCount: 0
}
```

---

## 🎯 Available Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, categories, featured trips |
| `/trips` | All trips list with filtering |
| `/trips/:slug` | Individual trip detail page |
| `/blog` | Blog list page |
| `/blog/:slug` | Individual blog post |
| `/login` | Login page |
| `/register` | Registration page |
| `/profile` | User profile (protected) |
| `/contact` | Contact form |
| `/faq` | Frequently asked questions |

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Environment Variables

Create `.env` file for production:

```env
VITE_API_URL=your-api-url
VITE_RAZORPAY_KEY=your-razorpay-key
```

---

## 🔮 Future Enhancements

### Phase 1: Core Features
- [ ] Advanced trip filtering and search
- [ ] Image gallery lightbox
- [ ] Region detail pages
- [ ] More mock data (20+ trips)

### Phase 2: Backend Integration
- [ ] REST API integration
- [ ] Real authentication with JWT
- [ ] Database for trips and users
- [ ] Payment gateway (Razorpay/Stripe)

### Phase 3: Advanced Features
- [ ] User reviews and ratings
- [ ] Booking management system
- [ ] Email notifications
- [ ] Social media sharing
- [ ] Google Maps integration

### Phase 4: Admin Panel
- [ ] Admin dashboard
- [ ] Trip management
- [ ] User management
- [ ] Booking management
- [ ] Analytics

---

## 📄 License

This project is created for demonstration purposes.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

For questions or support, please contact:
- **Email**: hello@trekmonk.com
- **Phone**: +91 9876543210

---

## 🎉 Acknowledgments

- **Design Inspiration**: TrekPanda, Airbnb Experiences, Thrillophilia
- **Images**: Unsplash
- **Icons**: React Icons (Feather Icons)
- **Fonts**: Google Fonts

---

**Built with ❤️ for adventure travelers across India** 🏔️🌊🏕️
