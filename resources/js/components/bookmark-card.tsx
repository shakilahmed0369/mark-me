import React, { useState } from 'react'
import { Button } from './ui/button'
import { truncateText } from '@/utils/helper';
import { Link } from 'react-router-dom';
import { useBookmark } from '@/hooks/useBookmark';
import ShareDialog from './share-dialog';
interface BookmarkTypes {
    id: number;
    title: string;
    description: string;
    url: string;
    category: string;
    favicon: string;
    favicon_type: string;
}

export default function BookmarkCard({ bookmark }: { bookmark: BookmarkTypes }) {
    const { setConfirmationDialog, setDeleteId } = useBookmark();
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div className='bg-neutral-50 border border-gray rounded-xl p-4 hover:rounded-none hover:-translate-y-1 transition-all duration-300 relative mb-4'>

            <div className='flex justify-between flex-wrap gap-2'>
                <div className='flex-1 min-w-0'>
                    <h2 className='text-lg font-bold'>{truncateText(bookmark.title, 50)}</h2>
                </div>
                <div className='w-[50px] flex-shrink-0'>
                    <img className='w-[50px] object-cover' src={bookmark.favicon ? bookmark.favicon : '/assets/icon.svg'} alt="" />
                </div>
            </div>

            <p className='text-sm text-gray-500'>{truncateText(bookmark.description, 200)}</p>
            <div className='mt-3 flex justify-between items-center'>
                <div>
                    <span className='px-2 py-1 bg-gray-800 rounded text-sm text-white'>{bookmark.category.name}</span>
                </div>
                <div className='flex gap-2'>
                    <Link to={`/bookmarks/${bookmark.id}/edit`}>
                        <Button className=" h-[27px] cursor-pointer px-2 py-0 rounded text-sm text-white" tooltip='Edit bookmark'><img src="/assets/icons/edit.svg" alt="" /></Button>
                    </Link>
                    <Button onClick={() => setDialogOpen(true)} className=" h-[27px] cursor-pointer px-2 py-0 rounded text-sm text-white" tooltip='Share bookmark'><img src="/assets/icons/share.svg" alt="" /></Button>
                    <Button onClick={() => {
                        setDeleteId(bookmark.id)
                        setConfirmationDialog(true)
                    }} className=" h-[27px] cursor-pointer px-2 py-0 rounded text-sm text-white" tooltip='Delete bookmark'><img src="/assets/icons/trash.svg" alt="" /></Button>
                </div>
            </div>
            <ShareDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} url={bookmark.url} />
        </div>
    )
}
