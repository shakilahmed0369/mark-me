import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import BookmarkCard from "@/components/bookmark-card";
import { useBookmark } from '@/hooks/useBookmark';
import Masonry from 'react-masonry-css';
import ConfirmationDialog from '@/components/confirmation-dialog';
import Spinner from '@/components/spinner';

export default function Home() {
    const { isLoading, bookmarks, getBookmarks, confirmationDialog, setConfirmationDialog, deleteBookmark, deleteId, setDeleteId } = useBookmark();


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
                    <Button className='h-[50px] bg-neutral-50 text-black border border-gray-500 shadow-none hover:bg-neutral-50 cursor-pointer'> <img src="/assets/icons/order.svg" alt="order" className="w-6 h-6" /> Sort</Button>
                </div>
            </div>
            {isLoading ?
                <div className='w-full flex items-center justify-center h-48'>
                    <Spinner />
                </div>
                :
                bookmarks.length === 0 ?
                    <div className='w-full flex items-center justify-center h-96'>
                        <img src="/assets/no-email.svg" alt="no email" className='w-96' />
                    </div>
                    :
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="flex w-auto -ml-4"
                        columnClassName="pl-4 bg-clip-padding"
                    >
                        {bookmarks.map((bookmark) => (
                            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
                        ))}
                    </Masonry>
            }

            <ConfirmationDialog dialogOpen={confirmationDialog} setDialogOpen={setConfirmationDialog} callback={() => {
                if (deleteId) {
                    deleteBookmark(deleteId);
                    setDeleteId(null);
                }
                setConfirmationDialog(false);

            }} />
        </>
    )
}
