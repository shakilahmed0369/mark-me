import React, { useState } from "react";
import { BookmarkContext } from "./BookmarkContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function BookmarkProvider({ children }: { children: React.ReactNode }) {
    const [urlInfoLoading, setUrlInfoLoading] = useState(false);
    const getUrlInfo = async (url: string) => {
        try {
            setUrlInfoLoading(true);
            const response = await axios.post('/api/get-url-info', { url });
            return response.data;
        } catch (error) {
            const errors = error.response.data.errors;
            Object.entries(errors).forEach(([key, value]) => {
                toast.error(errors[key][0], { position: 'bottom-right' });
            });
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
