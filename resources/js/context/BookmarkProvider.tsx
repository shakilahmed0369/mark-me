import React, { useState } from "react";
import { BookmarkContext } from "./BookmarkContext";
import { getUrlInfo as getUrlInfoApi, createBookmark as createBookmarkApi, getBookmarks as getBookmarksApi, getBookmark as getBookmarkApi, updateBookmark as updateBookmarkApi, deleteBookmark as deleteBookmarkApi } from "../services/api";
import { handleAxiosError } from "../utils/errorHandler";
import { Bookmark, BookmarkTypes } from "../types";

export default function BookmarkProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [urlInfoLoading, setUrlInfoLoading] = useState(false);
    const [confirmationDialog, setConfirmationDialog] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [order, setOrder] = useState<string>("desc");

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
            const created = await createBookmarkApi(bookmark);
            await getBookmarks(searchQuery, order);
            return created;
        } catch (error) {
            handleAxiosError(error);
        }
    }

    const getBookmarks = async (query?: string, order?: string | null) => {
        try {
            setIsLoading(true);
            const data = await getBookmarksApi(query, order);
            setBookmarks(data);
        } catch (error) {
            handleAxiosError(error);
        } finally {
            setIsLoading(false);
        }
    }

    const getBookmark = async (id: number) => {
        try {
            const data = await getBookmarkApi(id);
            return data;
        } catch (error) {
            handleAxiosError(error);
        }
    }

    const updateBookmark = async (id: number, bookmark: BookmarkTypes) => {
        try {
            const updated = await updateBookmarkApi(id, bookmark);
            await getBookmarks(searchQuery, order);
            return updated;
        } catch (error) {
            handleAxiosError(error);
        }
    }

    const deleteBookmark = async (id: number) => {
        try {
            await deleteBookmarkApi(id);
            await getBookmarks(searchQuery, order);
        } catch (error) {
            handleAxiosError(error);
        }
    }

    return (
        <BookmarkContext.Provider value={{
            isLoading,
            setIsLoading,
            bookmarks,
            setBookmarks,
            getUrlInfo,
            urlInfoLoading,
            createBookmark,
            getBookmarks,
            getBookmark,
            updateBookmark,
            deleteBookmark,
            confirmationDialog,
            setConfirmationDialog,
            deleteId,
            setDeleteId,
            searchQuery,
            setSearchQuery,
            order,
            setOrder
        }}>
            {children}
        </BookmarkContext.Provider>
    )
}
