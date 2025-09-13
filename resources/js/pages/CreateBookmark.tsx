import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function CreateBookmark() {
    return (
        <>
            <div>
                <div>
                    <h1 className='text-3xl font-bold'>Add New Bookmark</h1>
                    <p className='text-lg text-gray-500'>Save a new bookmark to your collection</p>
                </div>
                <div className='max-w-[600px] mt-5'>
                    <form>

                        <div className="grid gap-3">
                            <Label htmlFor="url">Url</Label>
                            <div className='flex gap-2'>
                                <Input id="url" name="url" placeholder='https://example.com' defaultValue="" />
                                <Button>Fetch Website Data</Button>
                            </div>
                        </div>

                        <div className="grid gap-3 mt-3">
                            <Label htmlFor="url">Title</Label>
                            <Input id="title" name="title" placeholder='Figma' />
                        </div>

                        <div className="grid gap-3 mt-3">
                            <Label htmlFor="url">Description</Label>
                            <Input id="description" name="description" placeholder='UX Design' />
                        </div>

                        <div className="grid gap-3 mt-3">
                            <Label htmlFor="url">Category</Label>
                            <Select >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-3 mt-3">
                            <Label htmlFor="url">Description</Label>
                            <Input name="image" type='file' />
                        </div>

                        <Button className='mt-5 w-full'>Add Bookmark</Button>

                    </form>
                </div>
            </div>
        </>
    )
}
