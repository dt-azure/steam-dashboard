"use client";


import { getAccountSummary } from "@/lib/refresh_data";
import React from "react";


export default function DashboardCard({ title, data, id }: { title: string, data: any, id: string | undefined }) {
    return (
        <div className="dashboard-card flex flex-col px-6 py-4 rounded-md">
            <div className="mb-2">
                <span className="card-title">{title}</span>
            </div>
            <div className="card-data flex items-center flex-grow">
                {data}
            </div>

            <button onClick={() => { 
                getAccountSummary(id)
            }}>Click</button>
        </div>
    )
}