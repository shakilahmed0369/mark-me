
import axios from "axios";
import { BookmarkTypes } from "../types";

const api = axios.create({
    baseURL: "/api",
});

export const getCategories = async () => {
    const response = await api.get("/categories");
    return response.data.data;
};

export const createCategory = async (data: { name: string; icon: string }) => {
    const response = await api.post("/categories", data);
    return response.data;
};

export const updateCategory = async (data: { id: number, name: string, icon: string }) => {
    const response = await api.put(`/categories/${data.id}`, data);
    return response.data;
};

export const deleteCategory = async (id: number) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
};

export const getUrlInfo = async (url: string) => {
    const response = await api.post("/get-url-info", { url });
    return response.data;
};

export const createBookmark = async (bookmark: BookmarkTypes) => {
    const formData = new FormData();
    formData.append("url", bookmark.url);
    formData.append("title", bookmark.title);
    formData.append("description", bookmark.description);
    formData.append("category", bookmark.category ?? "");
    if (bookmark.favicon) {
        formData.append("favicon", bookmark.favicon);
    }

    const response = await api.post("/bookmarks", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const getBookmarks = async () => {
    const response = await api.get("/bookmarks");
    return response.data;
};

export const getBookmark = async (id: number) => {
    const response = await api.get(`/bookmarks/${id}`);
    return response.data;
}

export const updateBookmark = async (id: number, bookmark: BookmarkTypes) => {
    console.log('working', bookmark);
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("url", bookmark.url);
    formData.append("title", bookmark.title);
    formData.append("description", bookmark.description);
    formData.append("category", bookmark.category ?? "");
    if (bookmark.favicon) {
        formData.append("favicon", bookmark.favicon);
    }

    const response = await api.post(`/bookmarks/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}

export const deleteBookmark = async (id: number) => {
    const response = await api.delete(`/bookmarks/${id}`);
    return response.data;
}
