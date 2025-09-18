
import { useContext } from "react";
import { BookmarkContext } from "../context/BookmarkContext";

export const useBookmark = () => {
    const context = useContext(BookmarkContext);
    if (context === undefined) {
        throw new Error("useBookmark must be used within a BookmarkProvider");
    }
    return context;
};
