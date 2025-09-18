import React, { useState } from "react";
import { BookmarkContext } from "./BookmarkContext";
import axios from "axios";
import { toast } from "react-toastify";

export interface BookmarkTypes {
    url: string;
    title: string;
    description: string;
    favicon: File | null;
    category: string | null;
}

export default function BookmarkProvider({ children }: { children: React.ReactNode }) {
    const [urlInfoLoading, setUrlInfoLoading] = useState(false);
    const getUrlInfo = async (url: string) => {
        try {
            setUrlInfoLoading(true);
            const response = await axios.post('/api/get-url-info', { url });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errors = error.response?.data?.errors;
                Object.entries(errors).forEach(([key, value]) => {
                    toast.error(errors[key][0], { position: 'bottom-right' });
                });
            } else {
                console.log(error);
                toast.error('Failed to fetch url info', { position: 'bottom-right' });
            }
        } finally {
            setUrlInfoLoading(false);
        }
    }
    const createBookmark = async (bookmark: BookmarkTypes) => {
        console.log('createBookmark', bookmark);
        try {
            const formData = new FormData();
            formData.append('url', bookmark.url);
            formData.append('title', bookmark.title);
            formData.append('description', bookmark.description);
            formData.append('category', bookmark.category ?? '');
            if (bookmark.favicon) {
                formData.append('favicon', bookmark.favicon);
            }
            const response = await axios.post('/api/bookmarks', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (error) {
            const errors = error.response.data.errors;
            Object.entries(errors).forEach(([key, value]) => {
                toast.error(errors[key][0], { position: 'bottom-right' });
            });
        }
    }
    return (
        <BookmarkContext.Provider value={{
            getUrlInfo,
            urlInfoLoading,
            setUrlInfoLoading,
            createBookmark,
        }}>
            {children}
        </BookmarkContext.Provider>
    )
}
