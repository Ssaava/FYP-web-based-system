export function AdminGuide() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">System Administration Guide</h3>
        <p className="text-muted-foreground">
          This guide provides technical information for system administrators to
          manage and maintain the AWQMS.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-medium">System Architecture</h4>
        <p className="text-muted-foreground">
          The AWQMS consists of the following components:
        </p>

        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>
            Sensor Network: pH, temperature, turbidity, and conductivity sensors
          </li>
          <li>Microcontroller (Arduino): Collects data from sensors</li>
          <li>GSM Module: Transmits data to the server</li>
          <li>Web Server: Hosts the application and API</li>
          <li>Database: Stores sensor readings and system data</li>
          <li>Machine Learning Models: For prediction and analysis</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-medium">Sensor Calibration</h4>
        <p className="text-muted-foreground">
          Regular sensor calibration is essential for accurate readings:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>pH Sensor: Calibrate using buffer solutions (pH 4, 7, and 10)</li>
          <li>
            Turbidity Sensor: Calibrate using standard solutions with known NTU
            values
          </li>
          <li>
            Conductivity Sensor: Calibrate using solutions of known conductivity
          </li>
          <li>Temperature Sensor: Compare with a reference thermometer</li>
        </ul>
        <p className="text-muted-foreground mt-2">
          Recommended calibration frequency: Once every 30 days or after any
          maintenance.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-medium">System Maintenance</h4>
        <p className="text-muted-foreground">
          Regular maintenance tasks include:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>
            Database backup: Automated daily backups with 30-day retention
          </li>
          <li>Log rotation: System logs are rotated weekly</li>
          <li>
            Model retraining: ML models should be retrained monthly with new
            data
          </li>
          <li>Sensor cleaning: Physical cleaning of sensors every 2 weeks</li>
          <li>
            Battery replacement: Check and replace batteries in remote units
            quarterly
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-medium">Troubleshooting</h4>
        <p className="text-muted-foreground">Common issues and solutions:</p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>
            <span className="font-medium">No data transmission:</span> Check GSM
            signal strength and SIM card status
          </li>
          <li>
            <span className="font-medium">Erratic readings:</span> Verify sensor
            connections and calibration
          </li>
          <li>
            <span className="font-medium">System alerts not working:</span>{" "}
            Check notification settings and network connectivity
          </li>
          <li>
            <span className="font-medium">ML model errors:</span> Review
            training data quality and model parameters
          </li>
        </ul>
      </div>
    </div>
  );
}
