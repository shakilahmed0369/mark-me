import React, { useContext, useState } from 'react'
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
import { BookmarkContext } from '@/context/BookmarkContext'
import { Loader2Icon } from 'lucide-react'

export default function CreateBookmark() {
    const { getUrlInfo, urlInfoLoading } = useContext(BookmarkContext);
    const [siteInfo, setSiteInfo] = useState<{
        title: string | null;
        description: string | null;
        favicon: string | null;
    }>({
        title: '',
        description: '',
        favicon: '',
    });

    const [url, setUrl] = useState("");


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSiteInfo({
                ...siteInfo,
                favicon: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    return (
        <>
            <div>
                <div>
                    <h1 className='text-3xl font-bold'>Add New Bookmark</h1>
                    <p className='text-lg text-gray-500'>Save a new bookmark to your collection</p>
                </div>
                <div className='max-w-[600px] mt-5'>
                    <div className="grid gap-3">
                        <Label htmlFor="url">Url</Label>
                        <div className='flex gap-2'>
                            <Input id="url" name="url" placeholder='https://example.com' value={url} onChange={(e) => setUrl(e.target.value)} />
                            {urlInfoLoading ?
                                <Button size="sm" disabled>
                                    <Loader2Icon className="animate-spin" />
                                    Please wait
                                </Button> :
                                <Button onClick={async () => {
                                    setSiteInfo({
                                        title: '',
                                        description: '',
                                        favicon: '',
                                    });

                                    const info = await getUrlInfo(url);
                                    if (info) {
                                        setSiteInfo(info);
                                    }
                                }}>Fetch Website Data</Button>
                            }
                        </div>
                    </div>

                    <form>
                        <div className="grid gap-3 mt-3">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" placeholder='Figma' value={siteInfo.title} onChange={(e) => setSiteInfo({ ...siteInfo, title: e.target.value })} />
                        </div>

                        <div className="grid gap-3 mt-3">
                            <Label htmlFor="url">Description</Label>
                            <Input id="description" name="description" placeholder='UX Design' value={siteInfo.description} onChange={(e) => setSiteInfo({ ...siteInfo, description: e.target.value })} />
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
                        {
                            siteInfo.favicon && (
                                <div className="grid gap-3 mt-3 ">
                                    <Label htmlFor="url">Preview</Label>
                                    <img src={siteInfo.favicon} className='w-[70px] bg-gray-50 border border-1 p-2 rounded-2xl' alt={siteInfo.title} />
                                </div>
                            )
                        }

                        <div className="grid gap-3 mt-3">
                            <Label htmlFor="url">Favicon</Label>
                            <Input name="image" type='file' onChange={handleFileChange} accept='image/*' />
                        </div>

                        <Button className='mt-5 w-full'>Add Bookmark</Button>

                    </form>
                </div>
            </div>
        </>
    )
}
