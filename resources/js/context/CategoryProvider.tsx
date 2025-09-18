import React, { useEffect, useState } from "react";
import { CategoryContext } from "./CategoryContext";
import { Category } from "../types";
import { getCategories as getCategoriesApi, createCategory as createCategoryApi, updateCategory as updateCategoryApi, deleteCategory as deleteCategoryApi } from "../services/api";
import { handleAxiosError } from "../utils/errorHandler";

export default function CategoryProvider({ children }: { children: React.ReactNode }) {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const data = await getCategoriesApi();
            setCategories(data);
        } catch (error) {
            handleAxiosError(error);
        }
    }

    const createCategory = async (data: { name: string; icon: string }) => {
        try {
            const response = await createCategoryApi(data);
            setCategories((prev) => [...prev, response.category]);
            return true;
        } catch (error) {
            handleAxiosError(error);
            return false;
        }
    }

    const updateCategory = async (data: { id: number, name: string, icon: string }) => {
        try {
            const response = await updateCategoryApi(data);
            setCategories((prev) => prev.map((item) => item.id === data.id ? response.category : item));
            return true;
        } catch (error) {
            handleAxiosError(error);
            return false;
        }
    }

    const deleteCategory = async (id: number) => {
        try {
            await deleteCategoryApi(id);
            setCategories((prev) => prev.filter((item) => item.id !== id));
            return true;
        } catch (error) {
            handleAxiosError(error);
            return false;
        }
    }

    return (
        <CategoryContext.Provider value={{
            categories,
            setCategories,
            createCategory,
            updateCategory,
            deleteCategory
        }}>
            {children}
        </CategoryContext.Provider>
    )
}
