export function UserGuide() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Getting Started</h3>
        <p className="text-muted-foreground">
          Welcome to the Affordable Water Quality Monitoring System (AWQMS).
          This guide will help you navigate and use the system effectively.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-medium">Dashboard Overview</h4>
        <p className="text-muted-foreground">
          The dashboard provides a real-time overview of all water quality
          parameters. Here you can:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>
            View current readings for pH, temperature, turbidity, and
            conductivity
          </li>
          <li>Monitor water quality status and potability assessment</li>
          <li>Check recent readings and historical trends</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-medium">Analytics</h4>
        <p className="text-muted-foreground">
          The analytics page offers advanced data visualization and trend
          analysis:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>View predictive analysis for future water quality trends</li>
          <li>Analyze parameter correlations to understand relationships</li>
          <li>
            Explore long-term quality trends with customizable date ranges
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-medium">Potability Assessment</h4>
        <p className="text-muted-foreground">
          The potability page provides AI-powered assessment of water safety:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>View current potability score and status</li>
          <li>Check detailed parameter analysis</li>
          <li>Get safety recommendations based on current readings</li>
          <li>Track historical potability trends</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-medium">Reports & Alerts</h4>
        <p className="text-muted-foreground">
          Generate reports and manage alerts:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>
            Create custom reports with selected parameters and date ranges
          </li>
          <li>Download reports in various formats (PDF, Excel, CSV)</li>
          <li>Configure alert thresholds for different parameters</li>
          <li>Set up notification preferences for alerts</li>
        </ul>
      </div>
    </div>
  );
}
