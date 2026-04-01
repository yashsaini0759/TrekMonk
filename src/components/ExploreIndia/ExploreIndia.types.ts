export interface IndiaCategory {
    id: string;
    name: string;
    subtitle?: string;
    slug: string;
    image: string;
    badge?: string;
}

export interface ExploreSectionProps {
    categories?: IndiaCategory[];
    viewMorePath?: string;
    heading?: string;
    subHeading?: string;
}
