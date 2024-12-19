"use client";

import { Bar, BarChart, XAxis, CartesianGrid, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Preprocess data to calculate the "difference" field
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
].map((data) => ({
  ...data,
  difference: data.mobile - data.desktop, // Inverted difference (negative)
}));

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
  difference: {
    label: "Difference",
    color: "#f87171", // Red color for negative bars
  },
};

function ChartComponent() {
  return (
    <Card className="w-100 h-[300px]">
      <ChartContainer
        config={chartConfig}
        className="h-full w-[350px]" // Adjust width and height
      >
        <BarChart
          width={400} // Narrow width
          height={400} // Taller height
          accessibilityLayer
          data={chartData}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={true}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => `${value}`}
          />
          {/* Bars */}
          <Bar dataKey="difference" fill="var(--color-difference)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>
      <Card className="mt-20 px-4">
        <Progress value={90} className="mt-10 h-2" />
        <Progress value={90} className="mt-10 h-2" />
        <Progress value={90} className="mt-10 h-2" />
        <Progress value={90} className="mt-10 mb-10 h-2" />
      </Card>
    </Card>
  );
}

export default ChartComponent;
