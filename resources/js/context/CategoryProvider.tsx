import React, { useState } from "react";
import { CategoryContext } from "./CategoryContext";

export default function CategoryProvider({ children }) {
    const [categories, setCategories] = useState([]);
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
