import { createContext, Dispatch, SetStateAction } from "react";
import { Category } from "../types";

interface CategoryContextType {
    categories: Category[];
    setCategories: Dispatch<SetStateAction<Category[]>>;
    createCategory: (data: { name: string; icon: string }) => Promise<boolean>;
    updateCategory: (data: { id: number, name: string, icon: string }) => Promise<boolean>;
    deleteCategory: (id: number) => Promise<boolean>;
    dialogOpen: boolean;
    setDialogOpen: Dispatch<SetStateAction<boolean>>;
    dialogMode: "create" | "edit";
    setDialogMode: Dispatch<SetStateAction<"create" | "edit">>;
    editData: Category | null;
    setEditData: Dispatch<SetStateAction<Category | null>>;
    confirmationDialogOpen: boolean;
    setConfirmationDialogOpen: Dispatch<SetStateAction<boolean>>;
    categoryToDelete: Category | null;
    setCategoryToDelete: Dispatch<SetStateAction<Category | null>>;
}

export const CategoryContext = createContext<CategoryContextType | undefined>(undefined);
