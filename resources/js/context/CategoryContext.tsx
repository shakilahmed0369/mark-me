import { createContext, Dispatch, SetStateAction } from "react";

interface Category {
    id: string | number;
    name: string;
    icon: string;
}

interface CategoryContextType {
    categories: Category[];
    setCategories: Dispatch<SetStateAction<Category[]>>;
    categoryName: string;
    setCategoryName: Dispatch<SetStateAction<string>>;
    categoryIcon: string;
    setCategoryIcon: Dispatch<SetStateAction<string>>;
}

export const CategoryContext = createContext<CategoryContextType | undefined>(undefined);
