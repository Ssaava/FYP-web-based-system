// components/LoadingOverlay.tsx
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  text?: string;
  spinnerSize?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingOverlay = ({
  text = "Loading...",
  spinnerSize = "md",
  className,
}: LoadingOverlayProps) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-[3px]",
    lg: "h-12 w-12 border-[4px]",
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 dark:bg-gray-900/90",
        className
      )}
    >
      <div
        className={cn(
          "inline-block animate-spin rounded-full border-t-primary-500 border-transparent",
          sizeClasses[spinnerSize]
        )}
        aria-hidden="true"
      />
      {text && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{text}</p>
      )}
    </div>
  );
};

// Simple spinner-only version
export const LoadingSpinner = ({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-[3px]",
    lg: "h-8 w-8 border-[4px]",
  };

  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-t-primary-500 border-transparent",
        sizeClasses[size],
        className
      )}
      aria-hidden="true"
    />
  );
};
