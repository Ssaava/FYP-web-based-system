// Interface for data from /api/ml_model (same as used in DashboardPage)
export interface MlModelApiReading {
    Conductivity: number;
    Timestamp: string; // GMT string e.g., "Tue, 06 May 2025 21:48:50 GMT"
    Turbidity: number;
    ph: number;
    predicted_potability: number; // 0 or 1
    temperature: number;
  }
  
  // For PotabilityAssessment component
  export interface PotabilityAssessmentData {
    potabilityScore: number; // Percentage (0-100)
    status: "safe" | "warning" | "unsafe"; // Overall status
    latestReading: MlModelApiReading | null; // For parameter analysis
  }
  
  // For PotabilityHistory component
  export interface PotabilityHistoryEntry {
    date: string; // Formatted date string
    timestamp: number; // Milliseconds for sorting
    score: number; // Individual potability prediction (0 or 1 from API, converted to 0/100 for display)
    status: "safe" | "unsafe"; // Based on individual prediction
  }