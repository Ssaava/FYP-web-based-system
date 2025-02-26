"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { useState } from "react";

export function PotabilityAssessment() {
  // Sample data for potability assessment
  const potabilityScore = 85;
  const [status, setStatus] = useState<"safe" | "warning" | "unsafe">("safe");
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="col-span-1 md:col-span-1">
        <CardContent className="pt-6 flex flex-col items-center justify-center">
          <div className="w-48 h-48">
            <CircularProgressbar
              value={potabilityScore}
              text={`${potabilityScore}%`}
              styles={buildStyles({
                textSize: "16px",
                pathColor:
                  status === "safe"
                    ? "#22c55e"
                    : status === "warning"
                    ? "#eab308"
                    : "#ef4444",
                textColor: "#1f2937",
                trailColor: "#e5e7eb",
              })}
            />
          </div>
          <h3 className="mt-4 text-xl font-semibold">Potability Score</h3>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            {status === "safe" && (
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            )}
            {status === "warning" && (
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            )}
            {status === "unsafe" && (
              <XCircle className="h-8 w-8 text-red-500" />
            )}
            <div>
              <h3 className="font-semibold text-lg">
                {status === "safe" && "Water is Safe for Consumption"}
                {status === "warning" && "Use Water with Caution"}
                {status === "unsafe" && "Water is Unsafe for Consumption"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Based on current readings and AI analysis
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <h4 className="font-medium text-sm">Parameter Analysis</h4>
            <div className="grid gap-3">
              <div className="flex items-center justify-between text-sm">
                <span>pH Level (7.2)</span>
                <span className="font-medium text-green-500">Normal</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Temperature (23°C)</span>
                <span className="font-medium text-green-500">Normal</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Turbidity (1.2 NTU)</span>
                <span className="font-medium text-green-500">Normal</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Conductivity (450 µS/cm)</span>
                <span className="font-medium text-green-500">Normal</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Total Dissolved Solids (225 mg/L)</span>
                <span className="font-medium text-green-500">Normal</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
