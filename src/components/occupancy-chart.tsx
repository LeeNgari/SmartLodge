"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function OccupancyChart() {
  const data = [
    { date: "Mar 1", occupancy: 65 },
    { date: "Mar 5", occupancy: 68 },
    { date: "Mar 10", occupancy: 75 },
    { date: "Mar 15", occupancy: 82 },
    { date: "Mar 20", occupancy: 78 },
    { date: "Mar 25", occupancy: 80 },
    { date: "Mar 30", occupancy: 85 },
  ]

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="occupancy"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

