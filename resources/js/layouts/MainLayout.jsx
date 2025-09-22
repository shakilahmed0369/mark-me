import React, { useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useBookmark } from "@/hooks/useBookmark";
import { useDebounce } from "@/hooks/useDebounce";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, useNavigate } from "react-router-dom";

export default function MainLayout() {
    const navigate = useNavigate();
    const { searchQuery, setSearchQuery, getBookmarks, order } = useBookmark();

    const debouncedQuery = useDebounce(searchQuery, 400);

    useEffect(() => {
        getBookmarks(debouncedQuery, order);
    }, [debouncedQuery, order]);

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

                    <div className="flex justify-between w-full gap-2">
                        <div className="flex-1 min-w-0">
                            <Input
                                placeholder="Search bookmarks"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                }}
                                type="text"
                                className="w-full h-[50px]"
                            />
                        </div>
                        <div>
                            <Button
                                onClick={() => navigate("/create-bookmark")}
                                className="h-[50px] cursor-pointer"
                            >
                                {" "}
                                <img
                                    src="/assets/icons/plus.svg"
                                    alt="plus"
                                    className="w-6 h-6"
                                />{" "}
                                New Bookmark
                            </Button>
                        </div>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
