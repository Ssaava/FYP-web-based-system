"use client";

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
import { useSocketContext } from "@/hooks/useSocketContext";

// --- TYPE DEFINITIONS (or import from a shared file) ---

export default function PotabilityPage() {
  const { error, loading, assessmentData, historyData } = useSocketContext();
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

      {loading && (
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

      {!loading && !error && assessmentData && (
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
      {!loading && !error && !assessmentData && (
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
