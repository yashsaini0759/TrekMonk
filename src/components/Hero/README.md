# Hero Component

## Overview
The Hero component is a full-viewport, immersive section designed to create an emotional first impression for the TrekMonk website. It features smooth background transitions with curated Indian mountain landscapes, progressive text reveals, and seamless integration with the animated navbar.

## Features

### 🎨 Visual Design
- **Background Slideshow**: Smooth cross-fade transitions between curated mountain landscape images
- **Cinematic Breathing Effect**: Subtle zoom-in animation on background images
- **Gradient Overlay**: Dark green/black gradient for optimal text contrast
- **Optional Particles**: Floating light particles for enhanced atmosphere

### ✨ Content & Animations
- **Progressive Reveal**: Staggered animations for micro tagline, headline, subheadline, and CTAs
- **Responsive Typography**: Scales beautifully from mobile to desktop
- **Bilingual Support**: Supports multi-line headlines (e.g., Hindi + English)
- **Scroll Indicator**: Animated chevron that guides users to scroll

### 📱 Responsive & Accessible
- **Mobile-First**: Optimized layouts for all screen sizes
- **Reduced Motion**: Respects user's motion preferences
- **Performance Optimized**: Image preloading, intersection observer for visibility tracking
- **Touch-Friendly**: Proper button spacing and tap feedback

## Usage

```tsx
import Hero from './components/Hero';

const App = () => {
  const heroBackgrounds = [
    'https://example.com/himalaya.jpg',
    'https://example.com/kashmir.jpg',
    'https://example.com/meghalaya.jpg',
  ];

  const handleStartTrek = () => {
    // Scroll to treks section or navigate
  };

  const handleBookNow = () => {
    // Open booking modal or navigate to booking page
  };

  return (
    <Hero
      backgroundImages={heroBackgrounds}
      microTagline="India's Trusted Trekking Community"
      headline={`Har Safar,\nEk Naya Nazariya.`}
      subHeadline="Guided treks • Trusted leaders • Real experiences"
      primaryCta={{
        text: 'Start Your Trek',
        onClick: handleStartTrek,
      }}
      secondaryCta={{
        text: 'Book Now',
        onClick: handleBookNow,
      }}
      transitionInterval={6000}
      enableParticles={false}
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backgroundImages` | `string[]` | Required | Array of image URLs for the background slideshow |
| `microTagline` | `string` | `"India's Trusted Trekking Community"` | Small tagline above the headline |
| `headline` | `string` | Required | Main headline (use `\n` for line breaks) |
| `subHeadline` | `string` | Optional | Supporting text below headline |
| `primaryCta` | `CTAButton` | Required | Primary call-to-action button |
| `secondaryCta` | `CTAButton` | Optional | Secondary call-to-action button |
| `transitionInterval` | `number` | `6000` | Background transition interval in milliseconds |
| `enableParticles` | `boolean` | `false` | Enable floating particle effects |
| `enableReducedMotion` | `boolean` | `false` | Force reduced motion mode |

### CTAButton Type
```typescript
interface CTAButton {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}
```

## Customization

### Background Images
For best results, use high-quality landscape images (1920x1080 or higher) with:
- Clear focal points
- Good contrast for text overlay
- Consistent color tones across the set

### Headline Formatting
Use `\n` for multi-line headlines:
```tsx
headline={`Har Safar,\nEk Naya Nazariya.`}
```

### Color Customization
The component uses CSS custom properties. Override in your global CSS:
```css
:root {
  --color-forest-green: #2d6a4f;
  --color-light-green: #d8f3dc;
}
```

## Performance Considerations

1. **Image Optimization**: Use optimized images (WebP format recommended)
2. **Preloading**: Images are preloaded on component mount
3. **Visibility Tracking**: Animations pause when hero is not in viewport
4. **Reduced Motion**: Respects `prefers-reduced-motion` media query

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (with `-webkit-` prefixes)
- Mobile browsers: ✅ Optimized for touch

## Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Screen reader friendly
- Respects motion preferences

## Integration with Navbar

The Hero component is designed to work seamlessly with the TrekMonk Navbar:
- Navbar remains transparent over the hero
- Navbar becomes solid when scrolling past the hero
- Hero height is calculated for smooth scroll-to-content functionality

## Examples

### Minimal Setup
```tsx
<Hero
  backgroundImages={['/hero-bg.jpg']}
  headline="Discover Adventure"
  primaryCta={{ text: 'Explore', onClick: handleExplore }}
/>
```

### Full Configuration
```tsx
<Hero
  backgroundImages={backgrounds}
  microTagline="Since 2020"
  headline={`Your Journey\nStarts Here`}
  subHeadline="Professional guides • Safe adventures • Unforgettable memories"
  primaryCta={{ text: 'Start Exploring', onClick: handleStart }}
  secondaryCta={{ text: 'Learn More', onClick: handleLearn }}
  transitionInterval={7000}
  enableParticles={true}
/>
```

## File Structure
```
src/components/Hero/
├── Hero.tsx           # Main component logic
├── Hero.css           # Styles and animations
├── Hero.types.ts      # TypeScript interfaces
└── index.ts           # Barrel export
```

## Credits

Built with:
- React + TypeScript
- Framer Motion for animations
- React Icons for UI elements
