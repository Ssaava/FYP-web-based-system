import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AlertToastProps {
  type: "warning" | "info" | "success" | "error";
  title: string;
  description: string;
  onClose: () => void;
}

export function AlertToast({
  type,
  title,
  description,
  onClose,
}: AlertToastProps) {
  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 w-96 rounded-lg border shadow-lg p-4 flex items-start gap-3 animate-in slide-in-from-right",
        type === "warning" && "bg-yellow-50 border-yellow-200",
        type === "info" && "bg-blue-50 border-blue-200",
        type === "success" && "bg-green-50 border-green-200",
        type === "error" && "bg-red-50 border-red-200"
      )}
    >
      <div className="mt-0.5">
        {type === "warning" && (
          <AlertCircle className="h-5 w-5 text-yellow-500" />
        )}
        {type === "info" && <Info className="h-5 w-5 text-blue-500" />}
        {type === "success" && (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        )}
        {type === "error" && <AlertCircle className="h-5 w-5 text-red-500" />}
      </div>
      <div className="flex-1">
        <h4
          className={cn(
            "text-sm font-medium",
            type === "warning" && "text-yellow-800",
            type === "info" && "text-blue-800",
            type === "success" && "text-green-800",
            type === "error" && "text-red-800"
          )}
        >
          {title}
        </h4>
        <p
          className={cn(
            "text-sm mt-1",
            type === "warning" && "text-yellow-700",
            type === "info" && "text-blue-700",
            type === "success" && "text-green-700",
            type === "error" && "text-red-700"
          )}
        >
          {description}
        </p>
      </div>
      <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
