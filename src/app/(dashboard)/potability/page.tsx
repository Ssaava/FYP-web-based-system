"use client";

import { useEffect, useState } from "react";
import { PotabilityAssessment } from "@/components/potability/PotabilityAssessment";
import { PotabilityHistory } from "@/components/potability/PotabilityHistory";
import { SafetyRecommendations } from "@/components/potability/SafetyRecommendations";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// --- TYPE DEFINITIONS (or import from a shared file) ---
export interface MlModelApiReading {
  Conductivity: number;
  Timestamp: string;
  Turbidity: number;
  ph: number;
  predicted_potability: number;
  temperature: number;
}

export interface PotabilityAssessmentData {
  potabilityScore: number;
  status: "safe" | "warning" | "unsafe";
  latestReading: MlModelApiReading | null;
}

export interface PotabilityHistoryEntry {
  date: string;
  timestamp: number;
  score: number; // 0 or 100
  status: "safe" | "unsafe";
}
// --- END OF TYPE DEFINITIONS ---

export default function PotabilityPage() {
  const [assessmentData, setAssessmentData] =
    useState<PotabilityAssessmentData | null>(null);
  const [historyData, setHistoryData] = useState<PotabilityHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await fetch(`${baseUrl}/api/ml_model`, {
          method: "POST",
        });
        if (!response.ok) {
          const errData = await response
            .json()
            .catch(() => ({ error: "Failed to parse error from /ml_model" }));
          throw new Error(
            errData.error ||
              `Failed to fetch potability data (${response.status})`
          );
        }
        const rawReadings: MlModelApiReading[] = await response.json();

        if (!rawReadings || rawReadings.length === 0) {
          setError("No data received from the API.");
          setIsLoading(false);
          return;
        }

        // Sort by timestamp descending to easily get the latest
        const sortedReadings = rawReadings.sort(
          (a, b) =>
            new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime()
        );
        const latestReading = sortedReadings[0] || null;

        // --- Process for PotabilityAssessment ---
        // Calculate average potability from all readings
        const potabilityValues = sortedReadings.map(
          (r) => r.predicted_potability
        );
        const averagePotability =
          potabilityValues.reduce((sum, val) => sum + val, 0) /
          (potabilityValues.length || 1);
        const potabilityScore = Math.round(averagePotability * 100); // As percentage

        let currentStatus: "safe" | "warning" | "unsafe";
        if (potabilityScore >= 75) {
          // Example thresholds
          currentStatus = "safe";
        } else if (potabilityScore >= 50) {
          currentStatus = "warning";
        } else {
          currentStatus = "unsafe";
        }

        setAssessmentData({
          potabilityScore,
          status: currentStatus,
          latestReading: latestReading,
        });

        // --- Process for PotabilityHistory ---
        const newHistoryData: PotabilityHistoryEntry[] = sortedReadings.map(
          (reading) => {
            const readingTimestamp = new Date(reading.Timestamp).getTime();
            return {
              // Example: "5/7/2025"
              date: new Date(reading.Timestamp).toLocaleDateString(undefined, {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              }),
              timestamp: readingTimestamp,
              score: reading.predicted_potability >= 0.65 ? 100 : 0, // Convert 0/1 to 0/100 for score
              status: reading.predicted_potability >= 0.65 ? "safe" : "unsafe",
            };
          }
        );
        setHistoryData(newHistoryData);
      } catch (err: any) {
        console.error("Error on Potability Page:", err);
        setError(err.message || "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // Optional: Add a timer to refresh data periodically if desired
    // const intervalId = setInterval(fetchData, 60000); // Refresh every 60 seconds
    // return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Water Potability
          </h2>
          <p className="text-muted-foreground">
            AI-powered assessment of water safety for consumption
          </p>
        </div>
      </div>

      {isLoading && (
        <p className="text-center p-10 text-muted-foreground">
          Loading potability data...
        </p>
      )}
      {error && (
        <Card className="border-destructive bg-destructive/10">
          <CardHeader>
            <CardTitle className="text-destructive">
              Error Loading Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive-foreground">{error}</p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && assessmentData && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2 col-span-1 md:col-span-full">
              {" "}
              {/* PotabilityAssessment takes more space */}
              <CardHeader>
                <CardTitle>Current Potability Assessment</CardTitle>
                <CardDescription>
                  Overall evaluation based on recent historical data average and
                  latest parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PotabilityAssessment data={assessmentData} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-1 col-span-1 md:col-span-full">
              <CardHeader>
                <CardTitle>Safety Recommendations</CardTitle>
                <CardDescription>
                  Guidance based on current potability assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* SafetyRecommendations will derive its status from assessmentData */}
                <SafetyRecommendations status={assessmentData.status} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Potability History</CardTitle>
              <CardDescription>
                Historical record of individual water potability predictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PotabilityHistory data={historyData} />
            </CardContent>
          </Card>
        </>
      )}
      {!isLoading && !error && !assessmentData && (
        <Card>
          <CardHeader>
            <CardTitle>No Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              No potability data is currently available.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
