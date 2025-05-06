"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

interface PredictiveChartDataPoint {
  date: string;
  timestamp: number;
  ph_actual?: number | null;
  ph_forecast?: number | null;
  turbidity_actual?: number | null;
  turbidity_forecast?: number | null;
  conductivity_actual?: number | null;
  conductivity_forecast?: number | null;
  temperature_actual?: number | null;
  temperature_forecast?: number | null;
}

interface PredictiveAnalysisProps {
  data: PredictiveChartDataPoint[];
}

// Define colors for consistency
const COLORS = {
  ph: "#3b82f6", // Blue
  turbidity: "#f59e0b", // Amber
  conductivity: "#10b981", // Emerald
  temperature: "#ef4444", // Red
};

export function PredictiveAnalysis({ data }: PredictiveAnalysisProps) {
  if (!data || data.length === 0) {
    return <div className="h-[350px] flex items-center justify-center text-muted-foreground">No data for predictive analysis.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 45 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.5}/>
        <XAxis
          dataKey="date"
          stroke="hsl(var(--muted-foreground))"
          fontSize={10}
          tickLine={false}
          axisLine={true}
          interval={data.length > 10 ? Math.floor(data.length / 6) : 0}
          angle={-35}
          textAnchor="end"
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          // You might need multiple Y-axes if scales differ significantly
          // yAxisId="left"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
          labelFormatter={(label, payload) => {
            if (payload && payload.length > 0 && payload[0].payload.timestamp) {
              return new Date(payload[0].payload.timestamp).toLocaleString(undefined, {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: 'numeric', minute: '2-digit', second: '2-digit'
              });
            }
            return label;
          }}
          formatter={(value, name, props) => {
            let unit = "";
            if (name.toString().toLowerCase().includes("temperature")) unit = "°C";
            else if (name.toString().toLowerCase().includes("turbidity")) unit = " NTU";
            else if (name.toString().toLowerCase().includes("conductivity")) unit = " µS/cm";
            else if (name.toString().toLowerCase().includes("ph")) unit = ""; // pH unitless

            const displayValue = typeof value === 'number' ? value.toFixed(2) : 'N/A';
            
            // Remove "_actual" or "_forecast" for display name
            const displayName = String(name).replace(/_actual|_forecast/gi, ''); 
            return [`${displayValue}${unit}`, displayName];
          }}
          // Filter out items from tooltip if their value is null
          filterNull={true}
        />
        <Legend wrapperStyle={{ paddingTop: '30px' }}/>

        {/* pH Lines */}
        <Line type="monotone" dataKey="ph_actual" name="pH (Actual)" stroke={COLORS.ph} strokeWidth={2} dot={false} connectNulls={false} />
        <Line type="monotone" dataKey="ph_forecast" name="pH (Forecast)" stroke={COLORS.ph} strokeWidth={2} strokeDasharray="5 5" dot={false} connectNulls={true} />

        {/* Turbidity Lines */}
        <Line type="monotone" dataKey="turbidity_actual" name="Turbidity (Actual)" stroke={COLORS.turbidity} strokeWidth={2} dot={false} connectNulls={false} />
        <Line type="monotone" dataKey="turbidity_forecast" name="Turbidity (Forecast)" stroke={COLORS.turbidity} strokeWidth={2} strokeDasharray="5 5" dot={false} connectNulls={true} />

        {/* Conductivity Lines */}
        <Line type="monotone" dataKey="conductivity_actual" name="Conductivity (Actual)" stroke={COLORS.conductivity} strokeWidth={2} dot={false} connectNulls={false} />
        <Line type="monotone" dataKey="conductivity_forecast" name="Conductivity (Forecast)" stroke={COLORS.conductivity} strokeWidth={2} strokeDasharray="5 5" dot={false} connectNulls={true} />

        {/* Temperature Lines */}
        <Line type="monotone" dataKey="temperature_actual" name="Temperature (Actual)" stroke={COLORS.temperature} strokeWidth={2} dot={false} connectNulls={false} />
        <Line type="monotone" dataKey="temperature_forecast" name="Temperature (Forecast)" stroke={COLORS.temperature} strokeWidth={2} strokeDasharray="5 5" dot={false} connectNulls={true} />

      </LineChart>
    </ResponsiveContainer>
  );
}