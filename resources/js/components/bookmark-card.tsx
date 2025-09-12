import React from 'react'
import { Button } from './ui/button'
export default function BookmarkCard() {
    return (
        <div className='bg-neutral-50 border border-gray aspect-video rounded-xl p-4 hover:rounded-none hover:-translate-y-1 transition-all duration-300 relative'>

            <div className='flex justify-between '>
                <div className=''>
                    <h2 className='text-lg font-bold'>Slack</h2>
                    <p className='text-sm text-gray-500'>Team communication and collaboration platform.Team communication and collaboration platform.</p>
                </div>
                <div className=''>
                    <img className='w-[70px]' src="/assets/icon.svg" alt="" />
                </div>
            </div>
            <div className='mt-3 flex justify-between items-center'>
                <div>
                    <span className='px-2 py-1 bg-gray-800 rounded text-sm text-white'>Productivity</span>
                </div>
                <div className='flex gap-2'>
                    <Button className=" h-[27px] cursor-pointer px-2 py-0 rounded text-sm text-white" tooltip='Edit bookmark'><img src="/assets/icons/edit.svg" alt="" /></Button>
                    <Button className=" h-[27px] cursor-pointer px-2 py-0 rounded text-sm text-white" tooltip='Share bookmark'><img src="/assets/icons/share.svg" alt="" /></Button>
                    <Button className=" h-[27px] cursor-pointer px-2 py-0 rounded text-sm text-white" tooltip='Delete bookmark'><img src="/assets/icons/trash.svg" alt="" /></Button>
                </div>
            </div>

        </div>
    )
}
