import React, { useEffect, useState } from "react";
import { CategoryContext, Category } from "./CategoryContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function CategoryProvider({ children }: { children: React.ReactNode }) {
    const [categories, setCategories] = useState<Category[]>([]);

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

    const createCategory = async (data: { name: string; icon: string }) => {
        try {
            const response = await axios.post('/api/categories', data);
            setCategories((prev) => [...prev, response.data.category]);
            toast.success(response.data.message, { position: 'bottom-right' });
            return true;
        } catch (error: any) {
            console.log(error);
            const errors = error.response.data.errors;
            if (errors) {
                for (const key in errors) {
                    toast.error(errors[key][0], { position: 'bottom-right' });
                }
            } else {
                toast.error("Something went wrong!", { position: 'bottom-right' });
            }

            return false;
        }
    }

    const updateCategory = async (data: { id: number, name: string, icon: string }) => {
        try {
            const response = await axios.put(`/api/categories/${data.id}`, data);
            setCategories((prev) => prev.map((item) => item.id === data.id ? response.data.category : item));
            toast.success(response.data.message, { position: 'bottom-right' });
            console.log(response);
            return true;
        } catch (error) {
            console.log(error);
            const errors = error.response.data.errors;
            if (errors) {
                for (const key in errors) {
                    toast.error(errors[key][0], { position: 'bottom-right' });
                }
            } else {
                toast.error("Something went wrong!", { position: 'bottom-right' });
            }

            return false;
        }
    }

    return (
        <CategoryContext.Provider value={
            {
                categories,
                setCategories,
                createCategory,
                updateCategory
            }
        }>
            {children}
        </CategoryContext.Provider>
    )
}
