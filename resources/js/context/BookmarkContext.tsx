import { createContext, Dispatch, SetStateAction } from "react";
import { Bookmark, BookmarkTypes } from "../types";

interface BookmarkContextType {
    bookmarks: Bookmark[];
    setBookmarks: Dispatch<SetStateAction<Bookmark[]>>;
    getUrlInfo: (url: string) => Promise<any>;
    urlInfoLoading: boolean;
    createBookmark: (bookmark: BookmarkTypes) => Promise<any>;
    getBookmarks: () => Promise<void>;
    getBookmark: (id: number) => Promise<Bookmark | undefined>;
    updateBookmark: (id: number, bookmark: BookmarkTypes) => Promise<Bookmark | undefined>;
}
export const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);
