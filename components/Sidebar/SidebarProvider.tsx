"use client";

import { Dispatch, SetStateAction, createContext, useContext, useMemo, useState } from "react";

type showSidebarState = [boolean, Dispatch<SetStateAction<boolean>>]

export const SidebarContext = createContext<showSidebarState>([false, () => { }])

export default function SidebarProvider({ children}: { children: React.ReactNode}) {
    const [isShowSidebar, setIsShowSidebar] = useState(false)

    const value: showSidebarState = useMemo(() =>  [isShowSidebar, setIsShowSidebar], [isShowSidebar])

    return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export const useSidebar = () => { 
    const sidebar = useContext(SidebarContext)

    if (sidebar === null) {
        throw new Error('useSidebar hook must be used within SidebarProvider')
    }

    return sidebar
 }