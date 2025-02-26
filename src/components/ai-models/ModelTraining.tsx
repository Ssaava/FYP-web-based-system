"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Upload, Play, Save } from "lucide-react";

export function ModelTraining() {
  const [file, setFile] = useState<string | null>(null);
  const [modelType, setModelType] = useState<string>("lstm");
  const [trainingProgress, setTrainingProgress] = useState<number>(0);
  const [isTraining, setIsTraining] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0].name);
    }
  };

  const startTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);

    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dataset">Upload Dataset</Label>
            <div className="flex items-center gap-2">
              <Input
                id="dataset"
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById("dataset")?.click()}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                {file ? file : "Select File"}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="model-type">Model Type</Label>
            <Select value={modelType} onValueChange={setModelType}>
              <SelectTrigger id="model-type">
                <SelectValue placeholder="Select model type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lstm">
                  LSTM (Long Short-Term Memory)
                </SelectItem>
                <SelectItem value="arima">ARIMA (Time Series)</SelectItem>
                <SelectItem value="random-forest">Random Forest</SelectItem>
                <SelectItem value="neural-network">Neural Network</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Training Parameters</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="epochs" className="text-xs">
                Epochs
              </Label>
              <Input id="epochs" type="number" defaultValue="100" />
            </div>
            <div>
              <Label htmlFor="batch-size" className="text-xs">
                Batch Size
              </Label>
              <Input id="batch-size" type="number" defaultValue="32" />
            </div>
            <div>
              <Label htmlFor="learning-rate" className="text-xs">
                Learning Rate
              </Label>
              <Input
                id="learning-rate"
                type="number"
                defaultValue="0.001"
                step="0.001"
              />
            </div>
          </div>
        </div>
      </div>

      {isTraining && (
        <Card className="border-blue-200">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Training Progress</span>
                <span className="font-medium">{trainingProgress}%</span>
              </div>
              <Progress value={trainingProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {trainingProgress < 100
                  ? "Training in progress. Please wait..."
                  : "Training complete! You can now save the model."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        <Button onClick={startTraining} disabled={!file || isTraining}>
          <Play className="mr-2 h-4 w-4" />
          Start Training
        </Button>
        <Button variant="outline" disabled={trainingProgress < 100}>
          <Save className="mr-2 h-4 w-4" />
          Save Model
        </Button>
      </div>
    </div>
  );
}
