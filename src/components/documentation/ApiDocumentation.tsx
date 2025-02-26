export function ApiDocumentation() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">API Documentation</h3>
        <p className="text-muted-foreground">
          The AWQMS provides a RESTful API for integrating with other systems
          and applications.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-medium">Authentication</h4>
        <p className="text-muted-foreground">
          All API requests require authentication using an API key. Include the
          API key in the request header:
        </p>
        <pre className="bg-muted p-4 rounded-md text-sm mt-2 overflow-x-auto">
          <code>{`Authorization: Bearer YOUR_API_KEY`}</code>
        </pre>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-medium">Endpoints</h4>

        <div className="mt-4 border rounded-md p-4">
          <h5 className="font-medium">GET /api/readings</h5>
          <p className="text-sm text-muted-foreground mt-1">
            Retrieve water quality readings with optional filtering.
          </p>
          <p className="text-sm font-medium mt-3">Parameters:</p>
          <ul className="text-sm text-muted-foreground mt-1 space-y-1">
            <li>
              <code>parameter</code> - Filter by parameter (ph, temperature,
              turbidity, conductivity)
            </li>
            <li>
              <code>start_date</code> - Start date for filtering (YYYY-MM-DD)
            </li>
            <li>
              <code>end_date</code> - End date for filtering (YYYY-MM-DD)
            </li>
            <li>
              <code>limit</code> - Maximum number of readings to return
              (default: 100)
            </li>
          </ul>
          <p className="text-sm font-medium mt-3">Response:</p>
          <pre className="bg-muted p-2 rounded-md text-xs mt-1 overflow-x-auto">
            <code>
              {`{
    "readings": [
      {
        "id": 1,
        "timestamp": "2024-02-21T12:30:00Z",
        "parameter": "ph",
        "value": 7.2,
        "unit": "pH",
        "status": "normal"
      },
      ...
    ],
    "count": 100,
    "total": 1250
  }`}
            </code>
          </pre>
        </div>

        <div className="mt-4 border rounded-md p-4">
          <h5 className="font-medium">GET /api/potability</h5>
          <p className="text-sm text-muted-foreground mt-1">
            Get water potability assessment.
          </p>
          <p className="text-sm font-medium mt-3">Parameters:</p>
          <ul className="text-sm text-muted-foreground mt-1 space-y-1">
            <li>
              <code>date</code> - Date for assessment (YYYY-MM-DD, default:
              today)
            </li>
          </ul>
          <p className="text-sm font-medium mt-3">Response:</p>
          <pre className="bg-muted p-2 rounded-md text-xs mt-1 overflow-x-auto">
            <code>
              {`{
    "date": "2024-02-21",
    "score": 85,
    "status": "safe",
    "parameters": {
      "ph": { "value": 7.2, "status": "normal" },
      "temperature": { "value": 23, "status": "normal" },
      "turbidity": { "value": 1.2, "status": "normal" },
      "conductivity": { "value": 450, "status": "normal" }
    },
    "recommendations": [
      "Water is safe for consumption",
      "Continue regular monitoring"
    ]
  }`}
            </code>
          </pre>
        </div>

        <div className="mt-4 border rounded-md p-4">
          <h5 className="font-medium">POST /api/readings</h5>
          <p className="text-sm text-muted-foreground mt-1">
            Submit new sensor readings (for sensor devices).
          </p>
          <p className="text-sm font-medium mt-3">Request Body:</p>
          <pre className="bg-muted p-2 rounded-md text-xs mt-1 overflow-x-auto">
            <code>
              {`{
    "device_id": "sensor-001",
    "timestamp": "2024-02-21T12:30:00Z",
    "readings": [
      { "parameter": "ph", "value": 7.2 },
      { "parameter": "temperature", "value": 23 },
      { "parameter": "turbidity", "value": 1.2 },
      { "parameter": "conductivity", "value": 450 }
    ]
  }`}
            </code>
          </pre>
          <p className="text-sm font-medium mt-3">Response:</p>
          <pre className="bg-muted p-2 rounded-md text-xs mt-1 overflow-x-auto">
            <code>
              {`{
    "success": true,
    "message": "Readings saved successfully",
    "reading_ids": [1001, 1002, 1003, 1004]
  }`}
            </code>
          </pre>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-medium">Error Handling</h4>
        <p className="text-muted-foreground">
          The API uses standard HTTP status codes and returns error details in
          the response body:
        </p>
        <pre className="bg-muted p-2 rounded-md text-xs mt-2 overflow-x-auto">
          <code>
            {`{
    "error": true,
    "code": "invalid_parameter",
    "message": "Invalid parameter value",
    "details": "pH value must be between 0 and 14"
  }`}
          </code>
        </pre>
      </div>
    </div>
  );
}
