"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

// Assuming QualityTrendsData is imported or defined in AnalyticsPage
interface QualityTrendsData {
  label: string;
  potable: number;
  nonPotable: number;
}

interface QualityTrendsProps {
  data: QualityTrendsData[];
}

export function QualityTrends({ data }: QualityTrendsProps) {
   if (!data || data.length === 0 || (data[0]?.potable === 0 && data[0]?.nonPotable === 0)) {
    return <div className="h-[350px] flex items-center justify-center text-muted-foreground">No quality trend data available.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.5}/>
        <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis type="category" dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={120}/>
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
          }}
          formatter={(value: number, name: string) => [`${value} periods`, name]}
        />
        <Legend />
        <Bar dataKey="potable" name="Potable Periods" fill="#22c55e" stackId="stack" />
        <Bar dataKey="nonPotable" name="Non-Potable Periods" fill="#ef4444" stackId="stack" />
      </BarChart>
    </ResponsiveContainer>
  );
}