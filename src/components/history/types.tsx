// Interface for data from /api/ml_model (same as used elsewhere)
export interface MlModelApiReading {
    Conductivity: number;
    Timestamp: string; // GMT string e.g., "Tue, 06 May 2025 21:48:50 GMT"
    Turbidity: number;
    ph: number;
    predicted_potability: number; // 0 or 1
    temperature: number;
  }
  
  // Transformed data point for HistoricalData (line chart) & HistoricalDataTable
  export interface ProcessedReading {
    id: string; // Unique ID, can be timestamp string or a generated one
    timestampMs: number; // Milliseconds for sorting and calculations
    date: string; // Formatted date string for XAxis (e.g., "YYYY-MM-DD" or "MM/DD HH:mm")
    ph: number;
    temperature: number;
    turbidity: number;
    conductivity: number;
    potability: number; // 0 or 1, from predicted_potability
    status: string; // e.g., "Potable", "Not Potable" - can derive from potability
  }
  
  // For HistoricalComparison (bar chart)
  export interface ComparisonParameterData {
    parameter: string; // 'pH', 'Temperature', etc.
    current?: number;
    previous?: number;
    baseline?: number; // Only if 'baseline' comparisonType is selected
  }