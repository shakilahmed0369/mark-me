import { createContext } from "react";
import { BookmarkTypes } from "./BookmarkProvider";

interface BookmarkContextType {
    getUrlInfo: (url: string) => Promise<void>;
    urlInfoLoading: boolean;
    setUrlInfoLoading: (loading: boolean) => void;
    createBookmark: (bookmark: BookmarkTypes) => Promise<void>;
}
export const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);
