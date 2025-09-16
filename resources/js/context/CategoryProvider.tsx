import React, { useEffect, useState } from "react";
import { CategoryContext, Category } from "./CategoryContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function CategoryProvider({ children }: { children: React.ReactNode }) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryName, setCategoryName] = useState('');
    const [categoryIcon, setCategoryIcon] = useState('');


    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        await axios.get('/api/categories').then(function (response) {
            console.log(response.data.data);
            setCategories(response.data.data);
        }).catch(function (error) {
            console.log(error);
            toast.error(error.response.data.message, { position: 'bottom-right' });
        });
    }

    const createCategory = async (onSuccess?: () => void) => {
        await axios.post('/api/categories', {
            name: categoryName,
            icon: categoryIcon
        }).then(function (response) {
            toast.success(response.data.message, { position: 'bottom-right' });
            setCategoryName('');
            setCategoryIcon('');
            if(onSuccess) {
                onSuccess();
            }
        }).catch(function (error) {
            console.log(error.response.data.errors);
            const errors = error.response.data.errors;
            for (const key in errors) {
                toast.error(errors[key][0], { position: 'bottom-right' });
            }
        });
    }

    return (
        <CategoryContext.Provider value={
            {
                categories,
                setCategories,
                categoryName,
                setCategoryName,
                categoryIcon,
                setCategoryIcon,
                createCategory
            }
        }>
            {children}
        </CategoryContext.Provider>
    )
}
