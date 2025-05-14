import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPotabilityStatus = (
  score: number
): "safe" | "warning" | "unsafe" => {
  if (score >= 75) return "safe";
  if (score >= 50) return "warning";
  return "unsafe";
};
