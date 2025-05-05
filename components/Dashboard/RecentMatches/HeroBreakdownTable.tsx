"use client";

import { convertSecondsToMinutes, formatNumber } from "@/lib/utils";
import { Chip, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from "@nextui-org/react"
import { useCallback, useMemo, useState } from "react";

type RecentMatchesHeroList = {
    data: {
        hero_id: number,
        match_played: number,
        avg_duration: number,
        avg_kills: number,
        avg_deaths: number,
        avg_assists: number,
        avg_last_hits: number,
        avg_denies: number,
        avg_networth: number,
        avg_hero_damage: number,
        avg_tower_damage: number,
        avg_hero_healing: number,
        win_count: number,
        name: string,
        id: number,
        localized_name: string,
        icon: string,
        primary_attr: string,
        attack_type: string,
        roles: string[]
    }[]
}

const statusColorMap: any = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

const columns: any = [
    { name: "Hero", uid: "name" },
    { name: "Match Count", uid: "match_played" },
    { name: "Win Count", uid: "win_count" },
    { name: "Win Rate", uid: "win_rate" },
    { name: "Avg. Duration", uid: "avg_duration" },
    { name: "Avg. Kills", uid: "avg_kills" },
    { name: "Avg. Deaths", uid: "avg_deaths" },
    { name: "Avg. Assists", uid: "avg_assists" },
    { name: "Avg. Last Hits", uid: "avg_last_hits" },
    { name: "Avg. Denies", uid: "avg_denies" },
    { name: "Avg. Networth", uid: "avg_networth" },
    { name: "Avg. Hero Damage", uid: "avg_hero_damage" },
    { name: "Avg. Tower Damage", uid: "avg_tower_damage" },
    { name: "Avg. Hero Healing", uid: "avg_hero_healing" }
]

export function HeroBreakdownTable({ data }: RecentMatchesHeroList) {
    const [page, setPage] = useState(1)
    const rowsPerPage = 8
    const totalPage = Math.ceil(100 / rowsPerPage)

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return data.slice(start, end);
    }, [page, data])

    const renderCell = useCallback((hero: any, columnKey: any) => {
        const cellValue = hero[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: hero.icon }}
                        // description={hero.email}
                        name={hero.localized_name}
                        className="hero-portrait"
                    >
                        {hero.localized_name}
                    </User>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{hero.team}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[hero.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "win_rate":
                return `${formatNumber(cellValue)}%`;
            case "avg_duration":
                return convertSecondsToMinutes(cellValue)
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table isHeaderSticky aria-label="Recent Matches Hero Breakdown" bottomContent={
            <div className="flex w-full justify-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="secondary"
                    page={page}
                    total={totalPage}
                    onChange={(page) => setPage(page)}
                />
            </div>
        }
            classNames={{
                wrapper: "hero-breakdown-table-wrapper"
            }}
        >

            <TableHeader columns={columns}>
                {(column: any) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={items}>
                {(item: any) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}