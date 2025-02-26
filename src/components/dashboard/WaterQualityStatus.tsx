import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

export function WaterQualityStatus() {
  const [status, setStaus] = useState<"safe" | "warning" | "danger">("safe"); // Can be 'safe', 'warning', or 'danger'
  const score = 85; // Water quality score out of 100

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {status === "safe" && (
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        )}
        {status === "warning" && (
          <AlertTriangle className="h-8 w-8 text-yellow-500" />
        )}
        {status === "danger" && <XCircle className="h-8 w-8 text-red-500" />}
        <div>
          <h3 className="font-semibold text-lg">
            {status === "safe" && "Water is Safe"}
            {status === "warning" && "Use with Caution"}
            {status === "danger" && "Water is Unsafe"}
          </h3>
          <p className="text-sm text-muted-foreground">
            Based on current readings
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Quality Score</span>
          <span className="font-medium">{score}%</span>
        </div>
        <Progress value={score} className="h-2" />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Parameters Status</h4>
        <div className="grid gap-2">
          <div className="flex items-center justify-between text-sm">
            <span>pH Level</span>
            <span className="font-medium text-green-500">Normal</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Temperature</span>
            <span className="font-medium text-green-500">Normal</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Turbidity</span>
            <span className="font-medium text-green-500">Normal</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Conductivity</span>
            <span className="font-medium text-green-500">Normal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
