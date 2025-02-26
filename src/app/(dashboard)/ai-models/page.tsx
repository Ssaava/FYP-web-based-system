import { AnomalyDetection } from "@/components/ai-models/AnomalyDetection";
import { ModelEvaluation } from "@/components/ai-models/ModelEvaluation";
import { ModelTraining } from "@/components/ai-models/ModelTraining";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AIModelsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            AI & Machine Learning
          </h2>
          <p className="text-muted-foreground">
            Train, evaluate, and deploy machine learning models for water
            quality analysis
          </p>
        </div>
      </div>

      <Tabs defaultValue="training">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="training">Model Training</TabsTrigger>
          <TabsTrigger value="evaluation">Model Evaluation</TabsTrigger>
          <TabsTrigger value="anomaly">Anomaly Detection</TabsTrigger>
        </TabsList>
        <TabsContent value="training" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Train Machine Learning Models</CardTitle>
              <CardDescription>
                Upload data and train models for water quality prediction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ModelTraining />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="evaluation" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Evaluation</CardTitle>
              <CardDescription>
                Evaluate model performance and accuracy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ModelEvaluation />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="anomaly" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Anomaly Detection</CardTitle>
              <CardDescription>
                Detect and analyze anomalies in water quality data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnomalyDetection />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
