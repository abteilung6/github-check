import React from "react";
import { ResponsiveLine } from "@nivo/line";

export interface TimeChartProps {
  data: Array<{ x: string; y: number }>;
}

export const TimeChart: React.FC<TimeChartProps> = ({ data }) => {
  const commonProperties = {
    margin: { top: 20, right: 20, bottom: 30, left: 50 },
    pointSize: 8,
    pointColor: { theme: "background" },
    pointBorderWidth: 2,
    pointBorderColor: { theme: "background" },
  };

  const render = (): React.ReactElement => {
    return (
      <ResponsiveLine
        {...commonProperties}
        data={[
          {
            id: "Time Chart",
            data: data,
          },
        ]}
        xScale={{
          type: "time",
          format: "%m/%d/%Y",
          precision: "day",
        }}
        xFormat="time:%m/%d/%Y"
        yScale={{
          type: "linear",
          stacked: false,
        }}
        axisLeft={{
          legend: "Stars",
          legendOffset: 12,
        }}
        axisBottom={{
          format: "%b %Y",
          legend: "Date",
          legendOffset: -12,
        }}
        enablePointLabel={false}
        enableArea={true}
        pointSize={5}
        pointBorderWidth={1}
        pointBorderColor={{
          from: "color",
          modifiers: [["darker", 0.3]],
        }}
        useMesh={true}
        enableSlices={false}
        curve="monotoneX"
      />
    );
  };

  return render();
};
