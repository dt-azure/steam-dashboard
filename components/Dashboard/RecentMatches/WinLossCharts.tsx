"use client";

import { Pie, PieChart, Rectangle, ResponsiveContainer, Tooltip } from "recharts";

type WinLossStatsProps = {
    data: {
        win_count: number,
        total_matches: number,
        radiant_count: number,
        radiant_win_count: number,
        dire_win_count: number,
        unique_heroes_count: number
    }
}

export function WinLossPieChart({ data }: WinLossStatsProps) {
    const winLossData = [{
        name: 'Win', value: data.win_count * 1
    },
    {
        name: 'Loss', value: data.total_matches * 1 - data.win_count * 1
    }]

    return (
        <ResponsiveContainer minWidth={300} minHeight={300}>
            <PieChart>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={winLossData}
                    outerRadius={120}
                    fill="#0dcaf0"
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                />
                <Tooltip content={CustomTooltip} cursor={<CustomChartCursor />} />
            </PieChart>
        </ResponsiveContainer>
    )
}

export function RadiantDirePieChart({ data }: WinLossStatsProps) {
    const chartData = [{
        name: 'Radiant', value: data.radiant_count * 1
    },
    {
        name: 'Dire', value: data.total_matches * 1 - data.radiant_count * 1
    }]

    return (
        <ResponsiveContainer minWidth={300} minHeight={300}>
            <PieChart>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={chartData}
                    outerRadius={120}
                    fill="#ffc107"
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                />
                <Tooltip content={CustomTooltip} cursor={<CustomChartCursor />} />
            </PieChart>
        </ResponsiveContainer>
    )
}

export function RadiantWinRatePieChart({ data }: WinLossStatsProps) {
    const chartData = [{
        name: 'Win', value: data.radiant_win_count * 1
    },
    {
        name: 'Loss', value: data.radiant_count * 1 - data.radiant_win_count * 1
    }]

    return (
        <ResponsiveContainer minWidth={300} minHeight={300}>
            <PieChart>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={chartData}
                    outerRadius={120}
                    fill="#dc3545"
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                />
                <Tooltip content={CustomTooltip} cursor={<CustomChartCursor />} />
            </PieChart>
        </ResponsiveContainer>
    )
}

export function DireWinRatePieChart({ data }: WinLossStatsProps) {
    const chartData = [{
        name: 'Win', value: data.dire_win_count * 1
    },
    {
        name: 'Loss', value: data.total_matches * 1 - data.radiant_count * 1 - data.dire_win_count * 1
    }]

    return (
        <ResponsiveContainer minWidth={300} minHeight={300}>
            <PieChart>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={chartData}
                    outerRadius={120}
                    fill="#0d6efd"
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                />
                <Tooltip content={CustomTooltip} cursor={<CustomChartCursor />} />
            </PieChart>
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
          <span className="text-white">{payload[0].name}: </span>
          <span className="text-white font-semibold">{payload[0].value} matches</span>
        </div>
      );
    }
  
    return null;
  };
  
  const CustomChartCursor = (props: any) => {
    const { x, y, width, height } = props;
  
    return <Rectangle fill="#0dcaf0" x={x} y={y} width={width} height={height} />;
  }
  