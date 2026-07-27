"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { YearFinancial } from "@/lib/data/listings";

export function FinancialTrendChart({ data }: { data: YearFinancial[] }) {
  const chartData = data.map((d) => ({
    year: String(d.year),
    Revenue: d.revenuePkrCr,
    Profit: d.profitPkrCr,
  }));

  return (
    <div className="h-64 w-full sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="rgba(12,11,10,0.08)" strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            tick={{ fill: "rgba(12,11,10,0.45)", fontSize: 12 }}
            axisLine={{ stroke: "rgba(12,11,10,0.15)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "rgba(12,11,10,0.45)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={40}
            label={{
              value: "PKR Cr",
              angle: -90,
              position: "insideLeft",
              style: { fill: "rgba(12,11,10,0.4)", fontSize: 11 },
            }}
          />
          <Tooltip
            contentStyle={{
              background: "#f3f1ec",
              border: "1px solid rgba(12,11,10,0.12)",
              borderRadius: 0,
              fontSize: 13,
            }}
            formatter={(value) => {
              const n = typeof value === "number" ? value : Number(value);
              return [`${Number.isFinite(n) ? n.toFixed(2) : value} Cr`, undefined];
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            iconType="plainline"
          />
          <Line
            type="monotone"
            dataKey="Revenue"
            stroke="#c4a35a"
            strokeWidth={2}
            dot={{ r: 3, fill: "#c4a35a" }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Profit"
            stroke="#0c0b0a"
            strokeWidth={2}
            dot={{ r: 3, fill: "#0c0b0a" }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
