
export interface Category {
    id: number;
    name: string;
    icon: string;
}

export interface Bookmark {
    id: number;
    url: string;
    title: string;
    description: string;
    favicon: string | null;
    category: Category | null;
}

export interface BookmarkTypes {
    url: string;
    title: string;
    description: string;
    favicon: File | null;
    category: string | null;
}
