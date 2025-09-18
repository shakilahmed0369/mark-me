import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import BookmarkCard from "@/components/bookmark-card"
import { useBookmark } from '@/hooks/useBookmark';

export default function Home() {
    const { bookmarks, getBookmarks } = useBookmark();

    useEffect(() => {
        getBookmarks();
    }, []);

    return (
        <>
            <div className='w-full flex items-center justify-between'>
                <div>
                    <h1 className='text-3xl font-bold'>Home</h1>
                    <p className='text-lg text-gray-500'>Effortless Bookmark Management</p>
                </div>
                <div className='flex'>
                    <Button className='h-[50px] bg-neutral-50 text-black border  border-gray-500 shadow-none'>Sort</Button>
                </div>
            </div>
            <div className='grid auto-rows-min gap-4 grip-cols-1 md:grid-cols-3 lg:grid-cols-5'>
                {bookmarks.map((bookmark) => (
                    <BookmarkCard key={bookmark.id} bookmark={bookmark} />
                ))}
            </div>
        </>
    )
}
