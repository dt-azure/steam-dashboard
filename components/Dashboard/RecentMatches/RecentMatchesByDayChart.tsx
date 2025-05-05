"use client";

import { Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


type RecentMatchesChartProps = {
  data: {
    match_count: number,
    data: Date
  }[]
}


export function RecentMatchesChart({ data }: RecentMatchesChartProps) {
  return (
    <ResponsiveContainer width="100%" minHeight={350}>
      <BarChart data={data} margin={{ right: 60, bottom: 40 }}>
        <XAxis dataKey="date" name="date" padding={{ left: 20, right: 20, }} style={{ fontSize: "0.8rem", fill: "#dee2e6" }} label={{ value: 'Date', position: 'insideBottomRight', offset: -10 }}/>
        <YAxis tick={{fill: "#dee2e6", fontSize: "0.8rem"}} label={{ value: 'Match Count', angle: -90, position: 'insideLeft', offset: 15 }}/>
        <Tooltip content={CustomTooltip} cursor={<CustomChartCursor />} />
        <Bar dataKey="match_count" fill="#d1d5db" />
      </BarChart>
    </ResponsiveContainer>
  )

}

const CustomTooltip = ({ active, payload, label }: any) => {

  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <h4 className="text-white font-bold">{label}</h4>
        <span className="text-white">Matches: </span>
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
