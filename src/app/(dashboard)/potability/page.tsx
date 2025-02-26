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

export default function PotabilityPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Current Potability Assessment</CardTitle>
            <CardDescription>
              Real-time evaluation of water safety based on all parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PotabilityAssessment />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Safety Recommendations</CardTitle>
            <CardDescription>
              Guidance based on current water quality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SafetyRecommendations />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Potability History</CardTitle>
          <CardDescription>
            Historical record of water potability assessments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PotabilityHistory />
        </CardContent>
      </Card>
    </div>
  );
}
