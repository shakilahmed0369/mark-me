import CategoryCard from '@/components/category-card'
import CategoryDialog from '@/components/category-dialog'
import ConfirmationDialog from '@/components/confirmation-dialog';
import { Button } from '@/components/ui/button';
import { useCategory } from '@/hooks/useCategory';
import { Category } from '@/types';
import React, { useState } from 'react'

export default function Category() {
    const { categories, deleteCategory } = useCategory();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState<"edit" | "create">("create");
    const [editData, setEditData] = useState<Category | null>(null);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    return (
        <>
            <div className='w-full flex items-center justify-between'>
                <div>
                    <h1 className='text-3xl font-bold'>Categories</h1>
                    <p className='text-lg text-gray-500'>Organize your bookmarks by category</p>
                </div>
                <div className='flex'>
                    <Button onClick={() => {
                        setDialogOpen(true)
                        setDialogMode("create")
                        setEditData(null)
                    }}>Add new</Button>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3'>
                {
                    categories.map((category) => (
                        <CategoryCard key={category.id}
                            category={category}
                            setDialogOpen={setDialogOpen}
                            setEditData={setEditData}
                            setDialogMode={setDialogMode}
                            setConfirmationDialogOpen={setConfirmationDialogOpen}
                            setCategoryToDelete={setCategoryToDelete}
                        />
                    ))
                }

            </div>

            <CategoryDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                dialogMode={dialogMode}
                editData={editData}
            />
            <ConfirmationDialog
                dialogOpen={confirmationDialogOpen}
                setDialogOpen={setConfirmationDialogOpen}
                callback={() => {
                    setConfirmationDialogOpen(false)
                    if (categoryToDelete) {
                        deleteCategory(categoryToDelete.id)
                    }
                    setCategoryToDelete(null);
                }}
            />
        </>
    )
}
