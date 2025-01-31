"use client";
import React from "react";
import { Tooltip } from "react-leaflet";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "23.01.2025.",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "24.01.2025.",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "25.01.2025.",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "26.01.2025.",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "27.01.2025.",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "28.01.2025.",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "29.01.2025.",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const AreaChartElement = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid
          strokeDasharray="1"
          stroke="#cccccc30"
          strokeWidth={1}
          fillOpacity={0.1}
        />
        <XAxis dataKey="name" tick={{ fill: "#999", fontSize: 11 }} />
        <YAxis tick={{ fill: "#999", fontSize: 11 }} />
        <Tooltip />
        <Area
          type="natural"
          dataKey="uv"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="amt"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartElement;
