import CategoryCard from '@/components/category-card'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function Category() {
    return (
        <>
            <div className='w-full flex items-center justify-between'>
                <div>
                    <h1 className='text-3xl font-bold'>Categories</h1>
                    <p className='text-lg text-gray-500'>Organize your bookmarks by category</p>
                </div>
                <div className='flex'>
                    <Button className='h-[50px]'>Add new</Button>
                </div>
            </div>

            <div className='grid grid-cols-5 gap-3'>
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
            </div>
        </>
    )
}
