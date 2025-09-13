import React, { useState } from "react";
import { CategoryContext, Category } from "./CategoryContext";

export default function CategoryProvider({ children }: { children: React.ReactNode }) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryName, setCategoryName] = useState('');
    const [categoryIcon, setCategoryIcon] = useState('');

    return (
        <CategoryContext.Provider value={
            {
                categories,
                setCategories,
                categoryName,
                setCategoryName,
                categoryIcon,
                setCategoryIcon
            }
        }>
            {children}
        </CategoryContext.Provider>
    )
}
