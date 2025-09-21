import CategoryCard from '@/components/category-card'
import CategoryDialog from '@/components/category-dialog'
import ConfirmationDialog from '@/components/confirmation-dialog';
import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { useCategory } from '@/hooks/useCategory';
import React, { useEffect } from 'react'

export default function Category() {
    const {
        isLoading,
        categories,
        deleteCategory,
        dialogOpen,
        setDialogOpen,
        setDialogMode,
        setEditData,
        confirmationDialogOpen,
        setConfirmationDialogOpen,
        categoryToDelete,
        setCategoryToDelete,
        getCategories
    } = useCategory();

    useEffect(() => {
        getCategories();
    }, []);

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
            {
                categories.length === 0 ?
                    <div className='w-full flex items-center justify-center h-96'>
                        <img src="/assets/no-email.svg" alt="no email" className='w-96' />
                    </div> :
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3'>
                        {
                            isLoading ?
                                <div className='w-full flex items-center justify-center h-96'>
                                    <Spinner />
                                </div> :
                                categories.map((category) => (
                                    <CategoryCard key={category.id}
                                        category={category}
                                    />
                                ))
                        }

                    </div>
            }


            <CategoryDialog />
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
