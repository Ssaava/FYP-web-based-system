"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  {
    month: "Jan",
    excellent: 65,
    good: 30,
    fair: 5,
  },
  {
    month: "Feb",
    excellent: 70,
    good: 25,
    fair: 5,
  },
  {
    month: "Mar",
    excellent: 60,
    good: 35,
    fair: 5,
  },
  {
    month: "Apr",
    excellent: 75,
    good: 20,
    fair: 5,
  },
]

export function QualityTrends() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="excellent" name="Excellent" fill="#22c55e" stackId="stack" />
        <Bar dataKey="good" name="Good" fill="#eab308" stackId="stack" />
        <Bar dataKey="fair" name="Fair" fill="#ef4444" stackId="stack" />
      </BarChart>
    </ResponsiveContainer>
  )
}

