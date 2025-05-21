"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import {
  PotabilityAssessmentData,
  MlModelApiReading,
} from "@/components/potability/types"; // Adjust path if types are elsewhere

interface PotabilityAssessmentProps {
  data: PotabilityAssessmentData | null;
}

// Helper to determine individual parameter status (example logic)
// You might want to centralize this if used elsewhere
const getParameterDisplay = (
  value: number | undefined,
  unit: string,
  normalMin?: number,
  normalMax?: number
) => {
  if (value === undefined)
    return { text: "N/A", color: "text-muted-foreground", valueText: "N/A" };

  const valueText = `${value.toFixed(1)}${unit}`;
  if (normalMin === undefined || normalMax === undefined) {
    return { text: "Info", color: "text-blue-500", valueText };
  }

  if (value >= normalMin && value <= normalMax)
    return { text: "Normal", color: "text-green-500", valueText };
  return { text: "Alert", color: "text-yellow-600", valueText }; // Or "text-red-500" for critical
};

export function PotabilityAssessment({ data }: PotabilityAssessmentProps) {
  if (!data) {
    return (
      <div className="text-center p-6 text-muted-foreground">
        Awaiting assessment data...
      </div>
    );
  }

  const { potabilityScore, status, latestReading } = data;

  // Parameter details from latest reading
  const phDetails = getParameterDisplay(latestReading?.ph, "", 6.5, 8.5);
  const tempDetails = getParameterDisplay(
    latestReading?.temperature,
    "°C",
    5,
    27
  ); // Example range
  const turbidityDetails = getParameterDisplay(
    latestReading?.Turbidity,
    " NTU",
    0.5,
    4.5
  );
  const conductivityDetails = getParameterDisplay(
    latestReading?.Conductivity,
    " ppm",
    0,
    500
  ); // Example range
  // const tdsDetails = getParameterDisplay(latestReading?.TotalDissolvedSolids, " mg/L", 0, 500); // If you add TDS

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="col-span-1 md:col-span-1 flex flex-col items-center justify-center">
        <CardContent className="pt-6 flex flex-col items-center justify-center">
          <div className="w-40 h-40 md:w-48 md:h-48">
            {" "}
            {/* Adjusted size */}
            <CircularProgressbar
              value={potabilityScore}
              text={`${potabilityScore}%`}
              styles={buildStyles({
                textSize: "18px",
                pathTransitionDuration: 0.5,
                pathColor:
                  status === "safe"
                    ? "hsl(var(--success))" // Using CSS variables if defined
                    : status === "warning"
                    ? "hsl(var(--warning))"
                    : "hsl(var(--destructive))",
                textColor: "hsl(var(--foreground))",
                trailColor: "hsl(var(--muted))",
                backgroundColor: "transparent",
              })}
            />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-center">
            Overall Potability Score
          </h3>
          <p className="text-sm text-muted-foreground text-center">
            (Average of recent predictions)
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-6">
            {status === "safe" && (
              <CheckCircle2 className="h-10 w-10 text-green-500 flex-shrink-0" />
            )}
            {status === "warning" && (
              <AlertTriangle className="h-10 w-10 text-yellow-500 flex-shrink-0" />
            )}
            {status === "unsafe" && (
              <XCircle className="h-10 w-10 text-red-500 flex-shrink-0" />
            )}
            <div>
              <h3
                className={`font-semibold text-xl ${
                  status === "safe"
                    ? "text-green-600"
                    : status === "warning"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {status === "safe" && "Water Quality: Good"}
                {status === "warning" && "Water Quality: Caution Advised"}
                {status === "unsafe" && "Water Quality: Poor"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Based on AI analysis of recent water quality data.
              </p>
            </div>
          </div>

          <h4 className="font-medium text-md mb-1">
            Latest Parameter Analysis:
          </h4>
          <p className="text-xs text-muted-foreground mb-3">
            {latestReading
              ? `Reading from: ${new Date(
                  latestReading.Timestamp
                ).toLocaleString()}`
              : "No latest reading available."}
          </p>
          {latestReading ? (
            <div className="grid gap-3 text-sm">
              <div className="flex items-center justify-between">
                <span>
                  pH Level:{" "}
                  <span className="font-bold">{phDetails.valueText}</span>
                </span>
                <span className={`font-medium ${phDetails.color}`}>
                  {phDetails.text}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>
                  Temperature:{" "}
                  <span className="font-bold">{tempDetails.valueText}</span>
                </span>
                <span className={`font-medium ${tempDetails.color}`}>
                  {tempDetails.text}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>
                  Turbidity:{" "}
                  <span className="font-bold">
                    {turbidityDetails.valueText}
                  </span>
                </span>
                <span className={`font-medium ${turbidityDetails.color}`}>
                  {turbidityDetails.text}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>
                  Conductivity:{" "}
                  <span className="font-bold">
                    {conductivityDetails.valueText}
                  </span>
                </span>
                <span className={`font-medium ${conductivityDetails.color}`}>
                  {conductivityDetails.text}
                </span>
              </div>
              {/* Add other parameters like TDS if available */}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Detailed parameter analysis not available.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
