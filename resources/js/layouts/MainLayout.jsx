import React from "react"
import { AppSidebar } from "@/components/app-sidebar"

import {
    Input
} from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useBookmark } from '@/hooks/useBookmark';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet, useNavigate } from "react-router-dom"

export default function MainLayout() {
    const navigate = useNavigate();
    const { searchQuery, setSearchQuery, getBookmarks } = useBookmark();

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />

                    <div className="flex justify-between w-full">
                        <div>
                            <Input placeholder="Search bookmarks" value={searchQuery} onChange={(e) => {
                                setSearchQuery(e.target.value);
                                getBookmarks(e.target.value);
                            }} type="text" className="lg:w-2xl md:2 sm:w-1/3 w-full h-[50px]" />
                        </div>
                        <div>
                            <Button onClick={() => navigate('/create-bookmark')} className="h-[50px] cursor-pointer"> <img src="/assets/icons/plus.svg" alt="plus" className="w-6 h-6" /> New Bookmark</Button>
                        </div>
                    </div>

                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
