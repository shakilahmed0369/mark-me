import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function CategoryCard() {
    return (
        <div className='relative bg-neutral-50 h-[136px] w-full border border-gray aspect-video rounded-xl p-4 hover:rounded-none hover:-translate-y-1 transition-all duration-300'>
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-bold'>Programming</h1>
                <img className='w-[40px]' src="/assets/icons/folder.svg" alt="" />
            </div>
            <div className='mt-5'>
                <span className='px-3 py-1 bg-black rounded-sm text-white'>10 bookmarks</span>
            </div>
            <div className='absolute bottom-2 right-4'>
                <DropdownMenu>
                    <DropdownMenuTrigger className='cursor-pointer'>
                        <img src="/assets/icons/threedot.svg" alt="action icon" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className='text-red-500'>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
