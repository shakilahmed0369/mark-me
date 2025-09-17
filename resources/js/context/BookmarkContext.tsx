import { createContext } from "react";

interface BookmarkContextType {
    getUrlInfo: (url: string) => Promise<void>;
    urlInfoLoading: boolean;
    setUrlInfoLoading: (loading: boolean) => void;
}
export const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);
