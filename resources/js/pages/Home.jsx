import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import BookmarkCard from "@/components/bookmark-card";
import { useBookmark } from '@/hooks/useBookmark';
import Masonry from 'react-masonry-css';

export default function Home() {
    const { bookmarks, getBookmarks } = useBookmark();

    useEffect(() => {
        getBookmarks();
    }, []);

    const breakpointColumnsObj = {
      default: 5,
      1280: 4,
      1024: 3,
      768: 2,
      640: 1
    };

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
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex w-auto -ml-4"
                columnClassName="pl-4 bg-clip-padding"
            >
                {bookmarks.map((bookmark) => (
                    <BookmarkCard key={bookmark.id} bookmark={bookmark} />
                ))}
            </Masonry>
        </>
    )
}