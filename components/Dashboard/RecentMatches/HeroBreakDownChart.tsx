"use client";

import { PureComponent } from "react";
import { Bar, BarChart, Pie, PieChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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

export function HeroBreakdownBarChart({ data }: RecentMatchesHeroList) {

    return (
        <ResponsiveContainer width="100%" minHeight={350}>
            <BarChart data={data} margin={{ right: 60, bottom: 40 }}>
                <XAxis dataKey="localized_name" padding={{ left: 20, right: 20, }} style={{ fontSize: "0.8rem", fill: "#dee2e6" }} label={{ value: 'Hero', position: 'insideBottomRight', offset: -10 }} tick={<CustomizedAxisTick />}/>
                <YAxis tick={{ fill: "#dee2e6", fontSize: "0.8rem" }} label={{ value: 'Match Count', angle: -90, position: 'insideLeft', offset: 15 }} />
                <Tooltip content={CustomTooltip} cursor={<CustomChartCursor />} />
                <Bar dataKey="match_played" fill="#d1d5db" />
            </BarChart>
        </ResponsiveContainer>
    )
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="chart-tooltip">
                <h4 className="text-white font-bold">{label}</h4>
                <span className="text-white">Matches played: </span>
                <span className="text-white font-semibold">{payload[0].value}</span>
            </div>
        );
    }

    return null;
};

const CustomChartCursor = (props: any) => {
    const { x, y, width, height } = props;

    return <Rectangle fill="#0dcaf0" x={x} y={y} width={width} height={height} />;
}

const CustomizedAxisTick = (props: any) => {

    const { x, y, stroke, payload } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)" className="hero-chart-tick">
                {payload.value}
            </text>
        </g>
    );

}