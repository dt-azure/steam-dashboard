"use client";

import React from "react";
import { useSidebar } from "../Sidebar/SidebarProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from "@nextui-org/react";
import RefreshButton from "../Button/RefreshButton";
import {  refreshRecentMatches } from "@/app/(dashboard)/_actions/refresh";
import { ProfileProps } from "@/lib/definition";

const tooltipContent = "To avoid spamming the APIs (some have daily limits applied) the data will be refreshed manually by me then pushed to a database."

export default function Header({ profile }: { profile: ProfileProps  | undefined}) {
    const [isShowSidebar, setIsShowSidebar] = useSidebar()



    const toggleSidebar = () => {
        setIsShowSidebar(!isShowSidebar)
    }

    return (
        <header className="header flex p-4">
            <button className="sidebar-toggle mr-6" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} />
            </button>

            <div className="flex-grow flex justify-center items-center">
                <h1 className="main-header mr-20">Steam Account Statistics</h1>
                
            </div>

            <ul className="ml-6 flex gap-10 items-center justify-center">
                <li>
                    <a href="/">About</a>
                </li>

                <li>
                    <a href="/">Settings</a>
                </li>

                <li className="flex items-center">
                    {/* <RefreshButton fetchData={fetchData.bind(null, profile.id)} /> */}
                    {/* <RefreshButton fetchData={refreshRecentMatches.bind(null, profile.id, null)} /> */}
         
                </li>

                <li>
                    <Tooltip content={tooltipContent} delay={0}
                        closeDelay={0}
                        motionProps={{
                            variants: {
                                exit: {
                                    opacity: 0,
                                    transition: {
                                        duration: 0.1,
                                        ease: "easeIn",
                                    }
                                },
                                enter: {
                                    opacity: 1,
                                    transition: {
                                        duration: 0.15,
                                        ease: "easeOut",
                                    }
                                },
                            },
                        }} className="header-tooltip px-6 py-4" radius="sm" size="md">
                        <div className="question-icon flex justify-center items-center"><FontAwesomeIcon icon={faQuestion} /></div>
                    </Tooltip>
                </li>
            </ul>
        </header>
    )
}