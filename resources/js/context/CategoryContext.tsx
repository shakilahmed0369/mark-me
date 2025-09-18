import { createContext, Dispatch, SetStateAction } from "react";
import { Category } from "../types";

interface CategoryContextType {
    categories: Category[];
    setCategories: Dispatch<SetStateAction<Category[]>>;
    createCategory: (data: { name: string; icon: string }) => Promise<boolean>;
    updateCategory: (data: { id: number, name: string, icon: string }) => Promise<boolean>;
    deleteCategory: (id: number) => Promise<boolean>;
}

export const CategoryContext = createContext<CategoryContextType | undefined>(undefined);
