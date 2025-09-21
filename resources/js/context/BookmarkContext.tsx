import { createContext, Dispatch, SetStateAction } from "react";
import { Bookmark, BookmarkTypes } from "../types";

interface BookmarkContextType {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    bookmarks: Bookmark[];
    setBookmarks: Dispatch<SetStateAction<Bookmark[]>>;
    getUrlInfo: (url: string) => Promise<any>;
    urlInfoLoading: boolean;
    createBookmark: (bookmark: BookmarkTypes) => Promise<any>;
    getBookmarks: () => Promise<void>;
    getBookmark: (id: number) => Promise<Bookmark | undefined>;
    updateBookmark: (id: number, bookmark: BookmarkTypes) => Promise<Bookmark | undefined>;
    deleteBookmark: (id: number) => Promise<void>;
    confirmationDialog: boolean;
    setConfirmationDialog: Dispatch<SetStateAction<boolean>>;
    deleteId: number | null;
    setDeleteId: Dispatch<SetStateAction<number | null>>;
    searchQuery: string;
    setSearchQuery: Dispatch<SetStateAction<string>>;
}
export const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);
