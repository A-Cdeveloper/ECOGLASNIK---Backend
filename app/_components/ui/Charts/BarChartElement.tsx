"use client";

import tailwindConfig from "../../../../tailwind.config";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BarChartElement = ({ data }: { data: any }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid
          strokeDasharray="1"
          strokeOpacity={1}
          stroke="#cccccc30"
          strokeWidth={1}
          fillOpacity={0.4}
        />
        <XAxis dataKey="date" tick={{ fill: "#999", fontSize: 11 }} />
        <YAxis
          tick={{ fill: "#999", fontSize: 11 }}
          allowDecimals={false}
          allowDataOverflow
        />
        <Tooltip
          contentStyle={{ background: "#2b2d42ae", padding: 10, fontSize: 11 }}
          itemStyle={{ lineHeight: 1 }}
          cursor={{ fill: "#999", opacity: 0.2 }}
        />
        <Legend />
        <Bar
          dataKey="aktivni"
          fill={tailwindConfig.theme.extend.colors.danger[200]}
        />
        <Bar
          dataKey="reseni"
          fill={tailwindConfig.theme.extend.colors.success[200]}
        />
        <Bar
          dataKey="odrada"
          fill={tailwindConfig.theme.extend.colors.skyblue[200]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartElement;
