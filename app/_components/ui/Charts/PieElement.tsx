"use client";

import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export type PieChartData = {
  name: string;
  value: number;
  color: string;
  percent?: number;
};

const PieElement = ({ data }: { data: PieChartData[] }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure it only renders on the client-side
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Don't render anything on the server-side
  }

  return (
    <div className="flex items-center justify-center space-x-6">
      {/* Pie Chart Container */}
      <div className="w-1/2 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              label={renderCustomLabel}
              labelLine={false}
              animationBegin={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Container (Manually Placed) */}
      <div className="w-1/2 py-4">
        {data.map((entry, index) => (
          <div
            key={index}
            className="grid grid-cols-[20px_1fr] gap-[4px] mb-1 items-center"
          >
            <span
              className="w-3 h-3"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[12px]">
              {entry.name}: <strong>{entry.value}</strong>{" "}
              {entry.percent && `(${entry.percent}%)`}
            </span>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieElement;

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) / 2; // Position in the middle of the slice
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#111"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      fontWeight={600}
    >
      {`${value}`}
    </text>
  );
};
