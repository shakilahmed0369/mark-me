import React, { useState } from "react";
import { BookmarkContext } from "./BookmarkContext";
import axios from "axios";

export default function BookmarkProvider({ children }: { children: React.ReactNode }) {
    const [urlInfoLoading, setUrlInfoLoading] = useState(false);
    const getUrlInfo = async (url: string) => {
        try {
            setUrlInfoLoading(true);
            const response = await axios.post('/api/get-url-info', { url });
            return response.data;
        } catch (error) {
            console.error('Error fetching URL info:', error);
            return null;
        } finally {
            setUrlInfoLoading(false);
        }
    }
    return (
        <BookmarkContext.Provider value={{
            getUrlInfo,
            urlInfoLoading,
            setUrlInfoLoading,
        }}>
            {children}
        </BookmarkContext.Provider>
    )
}
