"use client";

import { AlertTriangle, CheckCircle2, Info, ShieldAlert, ShieldCheck, ShieldX } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SafetyRecommendationsProps {
  status: "safe" | "warning" | "unsafe" | null; // Allow null for loading state
}

export function SafetyRecommendations({ status }: SafetyRecommendationsProps) {
  if (status === null) {
    return (
      <Card>
        <CardContent className="pt-6 text-muted-foreground">Awaiting potability assessment...</CardContent>
      </Card>
    );
  }

  let primaryRecommendation = {
    icon: Info,
    title: "General Information",
    text: "Follow general guidelines for water safety.",
    cardClass: "border-blue-200 bg-blue-50",
    iconClass: "text-blue-500",
    titleClass: "text-blue-800",
    textClass: "text-blue-700",
  };

  if (status === "safe") {
    primaryRecommendation = {
      icon: ShieldCheck,
      title: "Safe for Consumption",
      text: "The water is currently assessed as safe for drinking, cooking, and all household uses based on AI analysis.",
      cardClass: "border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/30",
      iconClass: "text-green-500 dark:text-green-400",
      titleClass: "text-green-800 dark:text-green-300",
      textClass: "text-green-700 dark:text-green-400",
    };
  } else if (status === "warning") {
    primaryRecommendation = {
      icon: ShieldAlert,
      title: "Use with Caution",
      text: "Some parameters may be approaching limits or potability is uncertain. Consider boiling water before drinking or using for cooking, especially for vulnerable individuals. Safe for general household uses like cleaning and bathing.",
      cardClass: "border-yellow-200 bg-yellow-50 dark:border-yellow-600 dark:bg-yellow-900/30",
      iconClass: "text-yellow-500 dark:text-yellow-400",
      titleClass: "text-yellow-800 dark:text-yellow-300",
      textClass: "text-yellow-700 dark:text-yellow-400",
    };
  } else if (status === "unsafe") {
    primaryRecommendation = {
      icon: ShieldX,
      title: "Not Safe for Consumption",
      text: "Water is assessed as unsafe. DO NOT consume this water. Use bottled or alternative safe water sources for drinking, cooking, and food preparation. Water may be suitable for flushing toilets or other non-contact uses if local guidance permits.",
      cardClass: "border-red-200 bg-red-50 dark:border-red-600 dark:bg-red-900/30",
      iconClass: "text-red-500 dark:text-red-400",
      titleClass: "text-red-800 dark:text-red-300",
      textClass: "text-red-700 dark:text-red-400",
    };
  }

  const PrimaryIcon = primaryRecommendation.icon;

  return (
    <div className="space-y-4">
      <Card className={primaryRecommendation.cardClass}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <PrimaryIcon className={`h-8 w-8 ${primaryRecommendation.iconClass} mt-0.5 flex-shrink-0`} />
            <div>
              <h3 className={`font-semibold text-lg ${primaryRecommendation.titleClass}`}>
                {primaryRecommendation.title}
              </h3>
              <p className={`text-sm ${primaryRecommendation.textClass} mt-1 leading-relaxed`}>
                {primaryRecommendation.text}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500"/> General Water Safety Tips
            </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-muted-foreground space-y-1.5">
            <li>• Always be aware of local advisories regarding water quality.</li>
            <li>• Ensure your home plumbing is well-maintained to prevent contamination.</li>
            <li>• If you use a private well, test its water regularly.</li>
            <li>• Report any sudden changes in water taste, odor, or appearance to authorities.</li>
            <li>• Store water safely in clean, covered containers if needed.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}