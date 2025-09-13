import React from 'react'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CategoryDialog() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Add new</Button>
                </DialogTrigger>
                <DialogContent className="lg:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>Add new category</DialogTitle>
                        <DialogDescription>
                            Add a new category to organize your bookmarks
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Category Name</Label>
                            <Input id="name-1" name="name" defaultValue="" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Choose a Icon</Label>
                            <div className='grid grid-cols-12 gap-2 border p-4'>
                                <span className='border p-1 rounded-sm cursor-pointer hover:bg-gray-100'><img className='max-w-[30px]' src="/assets/default-icons/books.svg" alt="" /></span>
                                <span className='border p-1 rounded-sm cursor-pointer hover:bg-gray-100'><img className='max-w-[30px]' src="/assets/default-icons/Brain.svg" alt="" /></span>
                                <span className='border p-1 rounded-sm cursor-pointer hover:bg-gray-100'><img className='max-w-[30px]' src="/assets/default-icons/Camera.svg" alt="" /></span>
                                <span className='border p-1 rounded-sm cursor-pointer hover:bg-gray-100'><img className='max-w-[30px]' src="/assets/default-icons/Chats.svg" alt="" /></span>
                                <span className='border p-1 rounded-sm cursor-pointer hover:bg-gray-100'><img className='max-w-[30px]' src="/assets/default-icons/Compass.svg" alt="" /></span>
                                <span className='border p-1 rounded-sm cursor-pointer hover:bg-gray-100'><img className='max-w-[30px]' src="/assets/default-icons/CurrencyDollarSimple.svg" alt="" /></span>
                                <span className='border p-1 rounded-sm cursor-pointer hover:bg-gray-100'><img className='max-w-[30px]' src="/assets/default-icons/DeviceMobile.svg" alt="" /></span>
                                <span className='border p-1 rounded-sm cursor-pointer hover:bg-gray-100'><img className='max-w-[30px]' src="/assets/default-icons/FilmStrip.svg" alt="" /></span>
                                <span className='border p-1 rounded-sm cursor-pointer hover:bg-gray-100'><img className='max-w-[30px]' src="/assets/default-icons/GameController.svg" alt="" /></span>
                                <span className='border p-1 rounded-sm cursor-pointer hover:bg-gray-100'><img className='max-w-[30px]' src="/assets/default-icons/Globe.svg" alt="" /></span>
                                <span className='border p-1 rounded-sm cursor-pointer hover:bg-gray-100'><img className='max-w-[30px]' src="/assets/default-icons/Lightbulb.svg" alt="" /></span>
                                <span className='border p-1 rounded-sm cursor-pointer hover:bg-gray-100'><img className='max-w-[30px]' src="/assets/default-icons/MicrophoneStage.svg" alt="" /></span>
                                <span className='border p-1 rounded-sm cursor-pointer hover:bg-gray-100'><img className='max-w-[30px]' src="/assets/default-icons/MusicNotesSimple.svg" alt="" /></span>
                                <span className='border p-1 rounded-sm cursor-pointer hover:bg-gray-100'><img className='max-w-[30px]' src="/assets/default-icons/ShoppingBag.svg" alt="" /></span>
                                <span className='border p-1 rounded-sm cursor-pointer hover:bg-gray-100'><img className='max-w-[30px]' src="/assets/default-icons/Television.svg" alt="" /></span>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
