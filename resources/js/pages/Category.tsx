import CategoryCard from '@/components/category-card'
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
                                        <div className='flex gap-2 border p-4'>
                                            <span className='border p-1 rounded-sm cursor-pointer hover:bg-gray-100'><img className='max-w-[30px]' src="/assets/icons/folder.svg" alt="" /></span>
                                            <span className='border p-1 rounded-sm cursor-pointer hover:bg-gray-100'><img className='max-w-[30px]' src="/assets/icons/folder.svg" alt="" /></span>
                                            <span className='border p-1 rounded-sm cursor-pointer hover:bg-gray-100'><img className='max-w-[30px]' src="/assets/icons/folder.svg" alt="" /></span>
                                            <span className='border p-1 rounded-sm cursor-pointer hover:bg-gray-100'><img className='max-w-[30px]' src="/assets/icons/folder.svg" alt="" /></span>
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
