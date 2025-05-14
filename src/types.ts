export interface AuthSliceState {
  authenticating: boolean;
  authenticated: boolean;
  user: object | any;
  token: {
    value: string;
    expiresAt: number;
  };
  login: (data: UserLogin) => void;
  logout: () => void;
  signin: (data: UserObject) => void;
  refreshAuthToken: () => void;
  checkAuth: () => void;
}
export type UserObject = {
  email: string;
  password: string;
};
export type UserLogin = {
  email: string;
  password: string;
};

// Interface for data from /api/ml_model (same as used in DashboardPage)
export interface MlModelApiReading {
  Conductivity: number;
  Timestamp: string; // GMT string e.g., "Tue, 06 May 2025 21:48:50 GMT"
  Turbidity: number;
  ph: number;
  predicted_potability: number; // 0 or 1
  temperature: number;
}

export interface ApiReading {
  conductivity: number;
  timestamp: string;
  turbidity: number;
  ph: number;
  predicted_potability: number;
  temperature: number;
}

export interface ApiResponseData {
  Conductivity: number;
  Timestamp: string;
  Turbidity: number;
  ph: number;
  predicted_potability: number;
  temperature: number;
}
// Interface for the processed data used by components
export interface ProcessedReading {
  ph: number;
  temperature: number;
  turbidity: number;
  conductivity: number;
  timestamp: string; // Original timestamp string
  formatted_timestamp: string; // User-friendly timestamp
  predicted_potability: number; // 0 for not potable, 1 for potable
}

export interface PotabilityHistoryEntry {
  date: string;
  timestamp: number;
  score: number; // 0 or 100
  status: "safe" | "unsafe";
}
export interface PotabilityAssessmentData {
  potabilityScore: number;
  status: "safe" | "warning" | "unsafe";
  latestReading: ProcessedReading | null;
}

// For PotabilityHistory component
export interface PotabilityHistoryEntry {
  date: string; // Formatted date string
  timestamp: number; // Milliseconds for sorting
  score: number; // Individual potability prediction (0 or 1 from API, converted to 0/100 for display)
  status: "safe" | "unsafe"; // Based on individual prediction
}
