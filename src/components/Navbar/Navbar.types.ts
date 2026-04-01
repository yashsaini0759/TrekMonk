export interface NavigationItem {
    label: string;
    path: string;
    isActive?: boolean;
}

export interface TripSuggestion {
    id: string;
    thumbnail: string;
    name: string;
    region: string;
    duration: string;
    price?: string;
    slug: string;
}

export interface SearchResult {
    query: string;
    timestamp: number;
}

export interface NavbarProps {
    transparentAtTop?: boolean;
}
