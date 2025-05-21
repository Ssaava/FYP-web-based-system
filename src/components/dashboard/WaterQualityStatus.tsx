"use client";

import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
// Assuming ProcessedReading is imported from a shared types file or DashboardPage
interface ProcessedReading {
  ph: number;
  temperature: number;
  turbidity: number;
  conductivity: number;
  timestamp: string;
  formattedTimestamp: string;
  predictedPotability: number;
}

interface WaterQualityStatusProps {
  reading: ProcessedReading | null;
}

// Helper to determine individual parameter status (example logic)
const getParameterStatus = (
  value: number,
  normalMin: number,
  normalMax: number,
  highIsBad: boolean = false
) => {
  if (value >= normalMin && value <= normalMax)
    return { text: "Normal", color: "text-green-500" };
  if ((highIsBad && value > normalMax) || (!highIsBad && value < normalMin))
    return { text: "Low", color: "text-yellow-500" }; // Or High, depending on context
  return { text: "High", color: "text-yellow-500" }; // Or Low
  // Could add "Very High/Low" with "text-red-500"
};

export function WaterQualityStatus({ reading }: WaterQualityStatusProps) {
  if (!reading) {
    return (
      <div className="space-y-6 p-4 border rounded-md text-center">
        <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto" />
        <h3 className="font-semibold text-lg">Awaiting Data</h3>
        <p className="text-sm text-muted-foreground">
          No current reading available to assess water quality.
        </p>
      </div>
    );
  }

  const isPotable = reading.predictedPotability === 1;
  const overallStatus: "safe" | "danger" = isPotable ? "safe" : "danger";
  const score = isPotable ? 90 : 30; // Example score based on potability

  // Example: Define normal ranges for parameters for more detailed status
  // These are illustrative and should be adjusted to actual standards
  const phStatus = getParameterStatus(reading.ph, 6.5, 8.5);
  const tempStatus = getParameterStatus(reading.temperature, 5, 27); // Assuming ideal temp range
  const turbidityStatus = getParameterStatus(reading.turbidity, 1.5, 4.5, true);
  const conductivityStatus = getParameterStatus(
    reading.conductivity,
    0,
    500,
    true
  ); // Lower is often better, high is bad for drinking

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {overallStatus === "safe" && (
          <CheckCircle2 className="h-10 w-10 text-green-500 flex-shrink-0" />
        )}
        {overallStatus === "danger" && (
          <XCircle className="h-10 w-10 text-red-500 flex-shrink-0" />
        )}
        <div>
          <h3
            className={`font-semibold text-xl ${
              isPotable ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPotable ? "Water is Potable" : "Water is Not Potable"}
          </h3>
          <p className="text-sm text-muted-foreground">
            Based on ML prediction from latest reading.
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Predicted Quality Score</span>
          <span
            className={`font-medium ${
              isPotable ? "text-green-600" : "text-red-600"
            }`}
          >
            {score}%
          </span>
        </div>
        <Progress
          value={score}
          className={`h-2 ${
            isPotable ? "[&>div]:bg-green-500" : "[&>div]:bg-red-500"
          }`}
        />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Latest Parameters:</h4>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center justify-between">
            <span>
              pH Level:{" "}
              <span className="font-bold">{reading.ph.toFixed(1)}</span>
            </span>
            <span className={`font-medium ${phStatus.color}`}>
              {phStatus.text}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>
              Temperature:{" "}
              <span className="font-bold">
                {reading.temperature.toFixed(1)}°C
              </span>
            </span>
            <span className={`font-medium ${tempStatus.color}`}>
              {tempStatus.text}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>
              Turbidity:{" "}
              <span className="font-bold">
                {reading.turbidity.toFixed(2)} NTU
              </span>
            </span>
            <span className={`font-medium ${turbidityStatus.color}`}>
              {turbidityStatus.text}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>
              Conductivity:{" "}
              <span className="font-bold">
                {reading.conductivity.toFixed(0)} ppm
              </span>
            </span>
            <span className={`font-medium ${conductivityStatus.color}`}>
              {conductivityStatus.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
