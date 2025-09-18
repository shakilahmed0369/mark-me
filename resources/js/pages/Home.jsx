import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import BookmarkCard from "@/components/bookmark-card"

import { useState } from 'react';
import axios from 'axios';
export default function Home() {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        getBookmarks();

    }, [bookmarks]);

    const getBookmarks = async () => {
        const res = await axios.get('/api/bookmarks');
        setBookmarks(res.data);
    }

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
