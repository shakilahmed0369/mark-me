import React, { useContext, useEffect, useState } from 'react'
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
import axios from 'axios'
import { toast } from 'react-toastify'

export default function CreateBookmark() {
    const { getUrlInfo, urlInfoLoading, createBookmark } = useContext(BookmarkContext);
    const [siteInfo, setSiteInfo] = useState<{
        url: string;
        title: string;
        description: string;
        favicon: File | string | null;
        category: string | null;
    }>({
        url: '',
        title: '',
        description: '',
        favicon: null,
        category: null,
    });
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [faviconPreview, setFaviconPreview] = useState<string | null>(null);
    const [url, setUrl] = useState("");

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const response = await axios.get('/api/categories');
            // console.log('categories', response.data.data);
            setCategories(response.data.data);
        } catch (error) {
            console.log(error);
            toast.error('Failed to fetch categories', { position: 'bottom-right' });
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSiteInfo({
                ...siteInfo,
                favicon: file,
            });
            setFaviconPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await createBookmark(siteInfo);
        if (response) {
            toast.success('Bookmark created successfully', { position: 'bottom-right' });
            setSiteInfo({
                url: '',
                title: '',
                description: '',
                favicon: null,
                category: '',
            });
            setFaviconPreview(null);
            setUrl('');
        }
    }

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
                                        url: '',
                                        title: '',
                                        description: '',
                                        favicon: null,
                                        category: null,
                                    });
                                    setFaviconPreview(null);
                                    const info = await getUrlInfo(url);
                                    if (info) {
                                        info.url = url;
                                        setSiteInfo(info);
                                        if (info.favicon) {
                                            setFaviconPreview(info.favicon);
                                        }
                                    }
                                }}>Fetch Website Data</Button>
                            }
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
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
                            <Select
                                onValueChange={(value) => setSiteInfo({ ...siteInfo, category: value })}
                                value={siteInfo.category || ""}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={String(category.id)}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                        </div>
                        {
                            faviconPreview && (
                                <div className="grid gap-3 mt-3 ">
                                    <Label htmlFor="url">Preview</Label>
                                    <img src={faviconPreview} className='w-[70px] bg-gray-50 border border-1 p-2 rounded-2xl' alt={siteInfo.title} />
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
