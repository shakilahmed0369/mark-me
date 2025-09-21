import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCategory } from '@/hooks/useCategory'
import { Category } from '@/types'

interface CategoryCardProps {
    category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
    const { setDialogOpen, setEditData, setDialogMode, setConfirmationDialogOpen, setCategoryToDelete } = useCategory();

    return (
        <div className='relative bg-neutral-50 h-[136px] w-full border border-gray aspect-video rounded-xl p-4 hover:rounded-none hover:-translate-y-1 transition-all duration-300'>
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-bold'>{category.name}</h1>
                <img className='w-[40px]' src={`/assets/default-icons/${category.icon}.svg`} alt="" />
            </div>
            <div className='mt-5'>
                <span className='px-3 py-1 bg-black rounded-sm text-white'>{category.bookmarks_count ?? 0} bookmarks</span>
            </div>
            <div className='absolute bottom-2 right-4'>
                <DropdownMenu>
                    <DropdownMenuTrigger className='cursor-pointer'>
                        <img src="/assets/icons/threedot.svg" alt="action icon" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                            setEditData(category)
                            setDialogMode("edit")
                            setDialogOpen(true)
                        }}>Edit</DropdownMenuItem>
                        <DropdownMenuItem className='text-red-500' onClick={() => {
                            setConfirmationDialogOpen(true)
                            setCategoryToDelete(category)
                        }}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>


        </div>

    )
}
