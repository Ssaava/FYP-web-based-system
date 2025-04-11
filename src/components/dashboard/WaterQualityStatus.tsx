import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useSensorStore } from "@/store/store";

export function WaterQualityStatus() {
  const [status, setStatus] = useState<"safe" | "warning" | "danger">("safe"); // Can be 'safe', 'warning', or 'danger'
  const score = 85;
  const portability = useSensorStore((state) => state.portability);
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {portability?.status === "safe" && (
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        )}
        {portability?.status === "warning" && (
          <AlertTriangle className="h-8 w-8 text-yellow-500" />
        )}
        {portability?.status === "danger" && (
          <XCircle className="h-8 w-8 text-red-500" />
        )}
        <div>
          <h3 className="font-semibold text-lg">
            {portability?.status === "safe" && "Water is Safe"}
            {portability?.status === "warning" && "Use with Caution"}
            {portability?.status === "danger" && "Water is Unsafe"}
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
        <Progress value={portability?.score} className="h-2" />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Parameters Status</h4>
        <div className="grid gap-2">
          <div className="flex items-center justify-between text-sm">
            <span>pH Level</span>
            <span className="font-medium text-green-500">
              {portability?.ph.status}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Temperature</span>
            <span className="font-medium text-green-500">
              {portability?.temperature.status}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Turbidity</span>
            <span className="font-medium text-green-500">
              {portability?.turbidity.status}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Conductivity</span>
            <span className="font-medium text-green-500">
              {portability?.conductivity.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
