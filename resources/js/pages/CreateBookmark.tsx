import React, { useEffect, useReducer } from 'react'
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
import { useBookmark } from '@/hooks/useBookmark'
import { useCategory } from '@/hooks/useCategory'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'react-toastify'
import { BookmarkTypes } from '@/types'
import { useNavigate, useParams } from 'react-router-dom'

const initialState: BookmarkTypes & { faviconPreview: string | null } = {
    url: '',
    title: '',
    description: '',
    favicon: null,
    category: null,
    faviconPreview: null,
};

function reducer(state: typeof initialState, action: { type: string; payload?: any }) {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.payload.field]: action.payload.value };
        case 'SET_SITE_INFO':
            return { ...state, ...action.payload };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

export default function CreateBookmark() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getUrlInfo, urlInfoLoading, createBookmark, getBookmark, updateBookmark } = useBookmark();
    const { categories, getCategories } = useCategory();
    const [state, dispatch] = useReducer(reducer, initialState);

    const isEditMode = Boolean(id);

    useEffect(() => {
        dispatch({ type: 'RESET' });
        getCategories();
        if (isEditMode) {
            getBookmark(Number(id)).then((bookmark) => {
                if (bookmark) {
                    dispatch({ type: 'SET_SITE_INFO', payload: { ...bookmark } });
                    dispatch({ type: 'SET_FIELD', payload: { field: 'faviconPreview', value: bookmark.favicon } });
                    dispatch({ type: 'SET_FIELD', payload: { field: 'category', value: bookmark.category } });
                    console.log(bookmark);
                }
            });
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            dispatch({ type: 'SET_FIELD', payload: { field: 'favicon', value: file } });
            dispatch({ type: 'SET_FIELD', payload: { field: 'faviconPreview', value: URL.createObjectURL(file) } });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isEditMode) {
            const response = await createBookmark(state);
            if (response) {
                toast.success('Bookmark created successfully', { position: 'bottom-right' });
                dispatch({ type: 'RESET' });
            }
        }else {

            const response = await updateBookmark(Number(id), state);
            if (response) {
                toast.success('Bookmark updated successfully', { position: 'bottom-right' });
                navigate(`/bookmarks/${id}/edit`);
            }
        }
    }

    const handleFetchWebsiteData = async () => {
        dispatch({ type: 'RESET' });
        const info = await getUrlInfo(state.url);
        if (info) {
            dispatch({ type: 'SET_SITE_INFO', payload: { ...info, url: state.url } });
            if (info.favicon) {
                dispatch({ type: 'SET_FIELD', payload: { field: 'faviconPreview', value: info.favicon } });
            }
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
                            <Input id="url" name="url" placeholder='https://example.com' value={state.url} onChange={(e) => dispatch({ type: 'SET_FIELD', payload: { field: 'url', value: e.target.value } })} />
                            {urlInfoLoading ?
                                <Button size="sm" disabled>
                                    <Loader2Icon className="animate-spin" />
                                    Please wait
                                </Button> :
                                <Button onClick={handleFetchWebsiteData}>Fetch Website Data</Button>
                            }
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-3 mt-3">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" placeholder='Figma' value={state.title} onChange={(e) => dispatch({ type: 'SET_FIELD', payload: { field: 'title', value: e.target.value } })} />
                        </div>

                        <div className="grid gap-3 mt-3">
                            <Label htmlFor="url">Description</Label>
                            <Input id="description" name="description" placeholder='UX Design' value={state.description} onChange={(e) => dispatch({ type: 'SET_FIELD', payload: { field: 'description', value: e.target.value } })} />
                        </div>

                        <div className="grid gap-3 mt-3">
                            <Label htmlFor="url">Category</Label>
                            <Select
                                onValueChange={(value) => dispatch({ type: 'SET_FIELD', payload: { field: 'category', value: value } })}
                                value={state.category || ""}
                                defaultValue={state.category || ""}
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
                            state.faviconPreview && (
                                <div className="grid gap-3 mt-3 ">
                                    <Label htmlFor="url">Preview</Label>
                                    <img src={state.faviconPreview} className='w-[70px] bg-gray-50 border border-1 p-2 rounded-2xl' alt={state.title} />
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
