import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { DateRangePicker } from "@/components/common/DateRangePicker";
import { QualityTrends } from "@/components/analytics/QualityTrends";
// import { ParameterCorrelation } from "@/components/analytics/ParameterCorrelation";
import { PredictiveAnalysis } from "@/components/analytics/PredictiveAnalysis";

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Advanced analysis and predictions of water quality parameters
          </p>
        </div>
        {/*<DateRangePicker />*/}
      </div>
      {/*<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">*/}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Predictive Analysis</CardTitle>
            <CardDescription>
              7-day forecast of water quality parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <PredictiveAnalysis />
          </CardContent>
        </Card>
        {/*<Card className="col-span-3">*/}
        {/*  <CardHeader>*/}
        {/*    <CardTitle>Parameter Correlation</CardTitle>*/}
        {/*    <CardDescription>*/}
        {/*      Relationship between different parameters*/}
        {/*    </CardDescription>*/}
        {/*  </CardHeader>*/}
        {/*  <CardContent>*/}
        {/*    <ParameterCorrelation />*/}
        {/*  </CardContent>*/}
        {/*</Card>*/}
      {/*</div>*/}
      <Card>
        <CardHeader>
          <CardTitle>Quality Trends</CardTitle>
          <CardDescription>
            Long-term analysis of water quality indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QualityTrends />
        </CardContent>
      </Card>
    </div>
  );
}
