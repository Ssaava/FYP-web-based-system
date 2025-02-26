"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const performanceData = [
  { metric: "Accuracy", value: 92 },
  { metric: "Precision", value: 89 },
  { metric: "Recall", value: 87 },
  { metric: "F1 Score", value: 88 },
];

const predictionData = [
  { date: "2024-02-21", actual: 7.2, predicted: 7.3 },
  { date: "2024-02-22", actual: 7.1, predicted: 7.2 },
  { date: "2024-02-23", actual: 7.3, predicted: 7.2 },
  { date: "2024-02-24", actual: 7.4, predicted: 7.3 },
  { date: "2024-02-25", actual: 7.2, predicted: 7.3 },
  { date: "2024-02-26", actual: 7.1, predicted: 7.2 },
  { date: "2024-02-27", actual: 7.0, predicted: 7.1 },
];

export function ModelEvaluation() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Model Performance</h3>
          <p className="text-sm text-muted-foreground">
            Evaluation metrics for the trained model
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="model-select">Model:</Label>
            <Select defaultValue="ph-lstm">
              <SelectTrigger id="model-select" className="w-[180px]">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ph-lstm">pH Prediction (LSTM)</SelectItem>
                <SelectItem value="turbidity-rf">
                  Turbidity (Random Forest)
                </SelectItem>
                <SelectItem value="potability-nn">
                  Potability (Neural Network)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="metrics">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          <TabsTrigger value="predictions">Prediction Accuracy</TabsTrigger>
        </TabsList>
        <TabsContent value="metrics" className="space-y-4 pt-4">
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, "Value"]} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="predictions" className="space-y-4 pt-4">
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[6.5, 7.5]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#3b82f6"
                    name="Actual"
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#ef4444"
                    name="Predicted"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">92%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">0.12</div>
              <div className="text-xs text-muted-foreground">RMSE</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">0.09</div>
              <div className="text-xs text-muted-foreground">MAE</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">0.87</div>
              <div className="text-xs text-muted-foreground">R² Score</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
