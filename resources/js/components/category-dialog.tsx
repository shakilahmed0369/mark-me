import React, { useContext, useEffect, useState } from 'react'

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
import { Category, CategoryContext } from '@/context/CategoryContext'

interface CategoryDialogProps {
    dialogOpen: boolean
    setDialogOpen: (dialogOpen: boolean) => void
    dialogMode: "edit" | "create"
    editData: Category | null
}

export default function CategoryDialog({ dialogOpen, setDialogOpen, dialogMode, editData }: CategoryDialogProps) {

    const { createCategory, updateCategory } = useContext(CategoryContext);
    const [categoryName, setCategoryName] = useState('');
    const [categoryIcon, setCategoryIcon] = useState('');

    const defaultIcons = [
        { name: 'books', filename: 'books.svg', path: '/assets/default-icons/books.svg' },
        { name: 'Brain', filename: 'Brain.svg', path: '/assets/default-icons/Brain.svg' },
        { name: 'Camera', filename: 'Camera.svg', path: '/assets/default-icons/Camera.svg' },
        { name: 'Chats', filename: 'Chats.svg', path: '/assets/default-icons/Chats.svg' },
        { name: 'Compass', filename: 'Compass.svg', path: '/assets/default-icons/Compass.svg' },
        { name: 'CurrencyDollarSimple', filename: 'CurrencyDollarSimple.svg', path: '/assets/default-icons/CurrencyDollarSimple.svg' },
        { name: 'DeviceMobile', filename: 'DeviceMobile.svg', path: '/assets/default-icons/DeviceMobile.svg' },
        { name: 'FilmStrip', filename: 'FilmStrip.svg', path: '/assets/default-icons/FilmStrip.svg' },
        { name: 'GameController', filename: 'GameController.svg', path: '/assets/default-icons/GameController.svg' },
        { name: 'Globe', filename: 'Globe.svg', path: '/assets/default-icons/Globe.svg' },
        { name: 'Lightbulb', filename: 'Lightbulb.svg', path: '/assets/default-icons/Lightbulb.svg' },
        { name: 'MicrophoneStage', filename: 'MicrophoneStage.svg', path: '/assets/default-icons/MicrophoneStage.svg' },
        { name: 'MusicNotesSimple', filename: 'MusicNotesSimple.svg', path: '/assets/default-icons/MusicNotesSimple.svg' },
        { name: 'ShoppingBag', filename: 'ShoppingBag.svg', path: '/assets/default-icons/ShoppingBag.svg' },
        { name: 'Television', filename: 'Television.svg', path: '/assets/default-icons/Television.svg' },
    ];

    useEffect(() => {
        if (editData) {
            setCategoryName(editData.name)
            setCategoryIcon(editData.icon)
        }
    }, [editData])

    const handleSubmit = async () => {
        if (dialogMode == "create") {
            const success = await createCategory({
                name: categoryName,
                icon: categoryIcon,
            });
            if (success) {
                setCategoryName("");
                setCategoryIcon("");
                setDialogOpen(false);
            }
        } else {
            if (editData) {
                const success = await updateCategory({
                    id: editData.id,
                    name: categoryName,
                    icon: categoryIcon,
                });
                if (success) {
                    setDialogOpen(false);
                }
            }
        }
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="lg:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>
                        {dialogMode === "create" ? "Add new category" : "Edit category"}
                    </DialogTitle>
                    <DialogDescription>
                        {dialogMode === "create"
                            ? "Add a new category to organize your bookmarks"
                            : "Edit category details"}
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        await handleSubmit();
                    }}
                    className="grid gap-4"
                >
                    <div className="grid gap-3">
                        <Label htmlFor="name-1">Category Name</Label>
                        <Input
                            id="name-1"
                            name="name"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label>Choose an Icon</Label>
                        <div className="grid grid-cols-12 gap-2 border p-4">
                            {defaultIcons.map((icon) => (
                                <span
                                    key={icon.name}
                                    className={`border p-1 rounded-sm cursor-pointer hover:bg-gray-100 ${categoryIcon === icon.name ? "ring-2 ring-blue-500" : ""
                                        }`}
                                    onClick={() => setCategoryIcon(icon.name)}
                                >
                                    <img className="max-w-[30px]" src={icon.path} alt={icon.name} />
                                </span>
                            ))}
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

    )
}
