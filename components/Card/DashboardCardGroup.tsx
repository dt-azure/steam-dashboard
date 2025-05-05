"use server";

import DashboardCard from "@/components/Card/DashboardCard";
import { ProfileProps } from "@/lib/definition";
import { formatNumber } from "@/lib/utils";

export default async function DashboardCardGroup({ profile }: { profile: ProfileProps }) {
    return (
        <>
            <DashboardCard title="Total Matches" data={formatNumber(profile.match_count)} style="red"/>

            <DashboardCard title="Total Wins" data={formatNumber(profile.win_count)} style="blue"/>

            <DashboardCard title="Win Rate" data={`${formatNumber(profile.win_count / profile.match_count * 100)}%`} style="yellow"/>
        </>
    )
}