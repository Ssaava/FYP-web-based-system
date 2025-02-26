"use client";

import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export function SafetyRecommendations() {
  // Sample data - in a real app, this would be based on actual water quality data
  const [status, setStatus] = useState<"safe" | "warning" | "unsafe">("safe");

  return (
    <div className="space-y-4">
      {status === "safe" && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-800">
                  Safe for Consumption
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  The water is safe for drinking, cooking, and all household
                  uses.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {status === "warning" && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-yellow-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800">
                  Use with Caution
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Consider boiling water before drinking or using for cooking.
                  Safe for other household uses.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {status === "unsafe" && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-red-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-800">
                  Not Safe for Consumption
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  Do not consume this water. Use alternative water sources for
                  drinking and cooking.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Info className="h-6 w-6 text-blue-500 mt-0.5" />
            <div>
              <h3 className="font-medium">Recommendations</h3>
              <ul className="text-sm text-muted-foreground mt-2 space-y-2">
                <li>
                  • Continue regular monitoring of water quality parameters
                </li>
                <li>• Ensure proper maintenance of water treatment systems</li>
                <li>• Check for any changes in source water conditions</li>
                <li>• Review historical data for any concerning trends</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
