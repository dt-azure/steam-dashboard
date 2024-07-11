"use client";

import React from "react";
import { useSidebar } from "./SidebarProvider";

export default function Sidebar({children}: {children: React.ReactNode}) {
    const [isShowSidebar, setIsShowSidebar] = useSidebar()

    const toggleSidebar = () => {
        setIsShowSidebar(!isShowSidebar)
    }

    return (
        <div className={`sidebar position-fixed top-0 ${isShowSidebar ? 'show' : ''}`}>
            <button onClick={toggleSidebar}>Click</button>
            <div>
                {children}
            </div>
        </div>
    )
}