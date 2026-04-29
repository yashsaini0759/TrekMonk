import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import ExploreIndia from '../components/ExploreIndia';
import { RegionSection } from '../components/RegionSection';
import { Testimonials } from '../components/Testimonials';
import { RecommendedSection } from '../components/RecommendedSection';
import { useUserPreferences } from '../context/UserPreferencesContext';
import { unifiedTrekData } from '../data/unifiedTrekData';

// Helper to convert a Trek to a Place expected by RegionSection
const trekToPlace = (trek: any) => ({
  id: trek.id,
  name: trek.name,
  slug: trek.slug,
  image: trek.image,
  tag: trek.difficulty,
});

const Home: React.FC = () => {
  const { preferences } = useUserPreferences();
  const navigate = useNavigate();

  const heroBackgrounds = [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1920&h=1080&fit=crop&q=80',
    'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1920&h=1080&fit=crop&q=80',
  ];

  const handleStartTrek = () => {
    const exploreSection = document.getElementById('explore-india');
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlanTrip = () => {
    navigate('/plan-trip');
  };

  // Dynamically generate the 4 Region Rows based on what the user searched, clicked, or preferred
  const dynamicRegions = useMemo(() => {
    const { preferredTags, preferredDifficulty } = preferences;
    const rows: any[] = [];
    const usedIds = new Set<string>();

    // Row 1: Preference Tag based (e.g. "Curated Snow Experiences")
    if (preferredTags.length > 0) {
      const topTag = preferredTags[0];
      const tagTreks = unifiedTrekData.filter(t => t.tags.includes(topTag) && !usedIds.has(t.id));
      if (tagTreks.length >= 4) {
        rows.push({
          id: `tag-${topTag}`,
          title: `Curated ${topTag.charAt(0).toUpperCase() + topTag.slice(1)} Experiences`,
          slug: '/all-treks',
          places: tagTreks.slice(0, 10).map(trekToPlace),
        });
        tagTreks.slice(0, 10).forEach(t => usedIds.add(t.id));
      }
    }

    // Row 2: Secondary Preference Tag based
    if (preferredTags.length > 1) {
      const secondTag = preferredTags[1];
      const tagTreks = unifiedTrekData.filter(t => t.tags.includes(secondTag) && !usedIds.has(t.id));
      if (tagTreks.length >= 4) {
        rows.push({
          id: `tag-${secondTag}`,
          title: `Discover ${secondTag.charAt(0).toUpperCase() + secondTag.slice(1)} Treks`,
          slug: '/all-treks',
          places: tagTreks.slice(0, 10).map(trekToPlace),
        });
        tagTreks.slice(0, 10).forEach(t => usedIds.add(t.id));
      }
    }

    // Row 3: Difficulty based (e.g. "Top Easy Adventures")
    if (preferredDifficulty.length > 0) {
      const diff = preferredDifficulty[0];
      const diffTreks = unifiedTrekData.filter(t => t.difficulty === diff && !usedIds.has(t.id));
      if (diffTreks.length >= 4) {
        rows.push({
          id: `diff-${diff}`,
          title: `Trending ${diff.charAt(0).toUpperCase() + diff.slice(1)} Adventures`,
          slug: '/all-treks',
          places: diffTreks.slice(0, 10).map(trekToPlace),
        });
        diffTreks.slice(0, 10).forEach(t => usedIds.add(t.id));
      }
    }

    // Fallbacks to standard geographical regions if we haven't filled 4 rows
    const fallbacks = [
      { title: 'Majestic North India', filter: (t: any) => t.region === 'north' },
      { title: 'Incredible South India', filter: (t: any) => t.region === 'south' },
      { title: 'Mystic North East', filter: (t: any) => t.region === 'north-east' },
      { title: 'Royal Rajasthan', filter: (t: any) => t.region === 'rajasthan' },
    ];

    for (const fb of fallbacks) {
      if (rows.length >= 4) break;
      const treks = unifiedTrekData.filter(t => fb.filter(t) && !usedIds.has(t.id));
      if (treks.length >= 4) {
        rows.push({
          id: fb.title.toLowerCase().replace(/\s+/g, '-'),
          title: fb.title,
          slug: '/all-treks',
          places: treks.slice(0, 10).map(trekToPlace),
        });
        treks.slice(0, 10).forEach(t => usedIds.add(t.id));
      }
    }

    return rows;
  }, [preferences]);

  return (
    <>
      <Hero
        backgroundImages={heroBackgrounds}
        microTagline="India's Trusted Trekking Community"
        headline={`Har Safar,\nEk Naya Nazariya.`}
        subHeadline="Guided treks • Trusted leaders • Real experiences"
        primaryCta={{ text: 'Start Your Trek', onClick: handleStartTrek }}
        secondaryCta={{ text: 'Plan a Trip', onClick: handlePlanTrip }}
        transitionInterval={6000}
        enableParticles={false}
      />

      <RecommendedSection />

      <ExploreIndia />
      
      {dynamicRegions.map((region) => (
        <RegionSection key={region.id} region={region} />
      ))}

      <Testimonials />
    </>
  );
};

export default Home;
