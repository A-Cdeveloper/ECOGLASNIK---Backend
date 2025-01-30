"use client";
import FilterButtons from "@/app/_components/ui/Filters/FilterButtons";
import Headline from "@/app/_components/ui/Headline";
import { ResponsiveBar } from "@nivo/bar";

const data = [
  {
    time: "08:00",
    value1: 30,
    value2: 50,
    value3: 70,
  },
  {
    time: "09:00",
    value1: 40,
    value2: 60,
    value3: 80,
  },
  {
    time: "10:00",
    value1: 50,
    value2: 70,
    value3: 90,
  },
  {
    time: "11:00",
    value1: 50,
    value2: 20,
    value3: 90,
  },
];

const ChartTimeLine = () => {
  return (
    <>
      <div className="flex flex-wrap justify-between items-center border-b border-secondary-100/20 px-0 py-2">
        <Headline level={3} className="normal-case font-thin w-full 3xl:w-auto">
          Prijavljeni problemi
        </Headline>
        <FilterButtons
          filterList={[
            { label: "Svi", value: "" },
            { label: "Aktivni", value: "active" },
            { label: "Rešeni", value: "done" },
            { label: "Arhivirani", value: "archive" },
          ]}
          queryKey="chartFilter"
          className="my-2 xl:my-1 w-full xl:w-auto text-[11px]"
        />
      </div>
      <ResponsiveBar
        data={data}
        keys={["value1", "value2", "value3"]}
        indexBy="time"
        margin={{ top: 50, right: 130, bottom: 80, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        colors={{ scheme: "nivo" }}
        enableGridX={true}
        enableGridY={true}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "#fff" }}
        // ✅ Change X-axis color (labels & lines)
        theme={{
          grid: {
            line: {
              stroke: "#FFF",
              strokeWidth: 0.4,
              strokeDasharray: 2,
              strokeOpacity: 0.7,
            },
          },
          axis: {
            ticks: {
              text: {
                fill: "#fff", // Change X-axis label color to red
                fontSize: 12,
                opacity: 0.5,
              },
            },
            legend: {
              text: {
                fill: "#fff",
                fontSize: 12, // Change legend text color
              },
            },
          },
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Time (HH:mm)",
          legendPosition: "middle",
          legendOffset: 40,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Broj problema",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            itemWidth: 100,
            itemHeight: 20,
            itemsSpacing: 2,
            symbolSize: 20,
            itemTextColor: "#fff",
            itemOpacity: 0.85,
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#fff",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
      />
    </>
  );
};

export default ChartTimeLine;
