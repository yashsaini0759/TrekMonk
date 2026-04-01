export interface CTAButton {
    text: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
}

export interface HeroProps {
    backgroundImages: string[];
    microTagline?: string;
    headline: string;
    subHeadline?: string;
    primaryCta: CTAButton;
    secondaryCta?: CTAButton;
    transitionInterval?: number; // in milliseconds, default 6000
    enableParticles?: boolean;
    enableReducedMotion?: boolean;
}

export interface BackgroundImage {
    url: string;
    alt: string;
    brightness?: number; // 0-100, for text color adjustment
}
