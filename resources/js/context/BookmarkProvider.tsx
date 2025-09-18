import React, { useState } from "react";
import { BookmarkContext } from "./BookmarkContext";
import { getUrlInfo as getUrlInfoApi, createBookmark as createBookmarkApi, getBookmarks as getBookmarksApi } from "../services/api";
import { handleAxiosError } from "../utils/errorHandler";
import { Bookmark, BookmarkTypes } from "../types";

export default function BookmarkProvider({ children }: { children: React.ReactNode }) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [urlInfoLoading, setUrlInfoLoading] = useState(false);

    const getUrlInfo = async (url: string) => {
        try {
            setUrlInfoLoading(true);
            return await getUrlInfoApi(url);
        } catch (error) {
            handleAxiosError(error);
        } finally {
            setUrlInfoLoading(false);
        }
    }

    const createBookmark = async (bookmark: BookmarkTypes) => {
        try {
            return await createBookmarkApi(bookmark);
        } catch (error) {
            handleAxiosError(error);
        }
    }

    const getBookmarks = async () => {
        try {
            const data = await getBookmarksApi();
            setBookmarks(data);
        } catch (error) {
            handleAxiosError(error);
        }
    }

    return (
        <BookmarkContext.Provider value={{
            bookmarks,
            setBookmarks,
            getUrlInfo,
            urlInfoLoading,
            createBookmark,
            getBookmarks,
        }}>
            {children}
        </BookmarkContext.Provider>
    )
}
