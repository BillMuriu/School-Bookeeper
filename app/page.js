"use client";

import { Bar, BarChart, XAxis, CartesianGrid, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Chart Data
const chartData = [
  { month: "Term1", desktop: 186, mobile: 80 },
  { month: "Term2", desktop: 305, mobile: 200 },
  { month: "Term3", desktop: 237, mobile: 120 },
].map((data) => ({
  ...data,
  difference: data.mobile - data.desktop, // Inverted difference (negative)
}));

// Fee Collection Data
const feeCollectionData = {
  overall: {
    collected: 1200000,
    expected: 1500000,
  },
  forms: [
    { form: "Form 1", collected: 300000, expected: 400000 },
    { form: "Form 2", collected: 400000, expected: 450000 },
    { form: "Form 3", collected: 200000, expected: 300000 },
    { form: "Form 4", collected: 300000, expected: 350000 },
  ],
};

// Chart Configuration
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
    color: "#f87171",
  },
};

// Balance Data
const balances = {
  total: 100000,
  cash: 40000,
  bank: 60000,
};

function ChartComponent() {
  const { overall, forms } = feeCollectionData;

  // Calculate Overall Progress
  const overallProgress = (overall.collected / overall.expected) * 100;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Balance Cards */}
        {[
          {
            title: "Total Balance",
            value: balances.total,
            color: "text-green-600",
            description: "Available funds",
          },
          {
            title: "Cash Balance",
            value: balances.cash,
            color: "text-blue-600",
            description: "Cash on hand",
          },
          {
            title: "Bank Balance",
            value: balances.bank,
            color: "text-gray-500",
            description: "Banked funds",
          },
        ].map(({ title, value, color, description }, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${color}`}>
                KES {value.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row items-start justify-end mt-10 gap-4">
        <Card className="w-full h-full">
          {/* Chart Section */}
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
              width={400}
              height={400}
              accessibilityLayer
              data={chartData}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={true}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 5)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) => `${value}`}
              />
              {/* Bars */}
              <Bar
                dataKey="difference"
                fill="var(--color-difference)"
                radius={4}
              />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            </BarChart>
          </ChartContainer>
        </Card>
        {/* Fee Collection Section */}
        <Card className=" px-4 py-6 h-[310px] w-full">
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <div className="text-sm font-semibold mr-2">Total Collected:</div>
              <div className="text-xs text-green-600">
                KES {overall.collected.toLocaleString()}
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-sm font-semibold mr-2">Amount Expected:</div>
              <div className="text-xs text-blue-600">
                KES {overall.expected.toLocaleString()}
              </div>
            </div>
          </div>

          {forms.map(({ form, collected, expected }, index) => {
            const progress = (collected / expected) * 100;
            return (
              <div key={index} className="mb-6">
                <div className="text-xs mb-2">
                  <span className="font-bold">{form}:</span>{" "}
                  <span className="text-green-600">
                    KES {collected.toLocaleString()}
                  </span>{" "}
                  out of{" "}
                  <span className="text-blue-600">
                    KES {expected.toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={progress}
                  className="h-2 bg-gray-200 rounded-md"
                />
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}

export default ChartComponent;
