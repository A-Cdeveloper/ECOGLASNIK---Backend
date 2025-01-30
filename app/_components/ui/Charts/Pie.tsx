"use client";
import { ResponsivePie } from "@nivo/pie";
import React from "react";

export type PieChartData = {
  id: string;
  label: string;
  value: number;
  color: string;
  percent?: number;
};

const Pie = ({ data }: { data: PieChartData[] }) => {
  return (
    <div className="flex flex-wrap items-center w-full lg:h-[350px] relative justify-start py-4">
      {/* Pie Chart (Left) */}
      <div className="w-[100%] md:w-[50%] h-[350px]">
        <ResponsivePie
          data={data}
          margin={{ top: 0, right: 20, bottom: 60, left: 40 }} // Reduced right margin
          innerRadius={0.6}
          padAngle={0.9}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          colors={({ data }) => data.color}
          enableArcLinkLabels={false}
          arcLabelsTextColor={{ from: "#000" }}
          theme={{
            tooltip: {
              container: {
                background: "#fff",
                color: "#000",
                fontSize: "12px",
                width: "auto",
                inlineSize: "min-content",
              },
            },
          }}
        />
      </div>

      {/* Custom Legend (Right) */}
      <div className="w-[100%] md:w-[50%] h-full  text-white px-4 py-2">
        {data.map((item) => (
          <div key={item.id} className="flex items-center space-x-2 mb-1">
            <span
              className="w-3 h-3 inline-block"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="text-[12px]">
              {item.label} &nbsp;{item.value}{" "}
              {item.percent && `(${item.percent}%)`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pie;
