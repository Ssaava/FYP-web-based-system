import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const readings = [
  {
    timestamp: "2024-02-21 12:30:00",
    ph: 7.2,
    temperature: 23,
    turbidity: 1.2,
    conductivity: 450,
    status: "Normal",
  },
  {
    timestamp: "2024-02-21 12:25:00",
    ph: 7.1,
    temperature: 22,
    turbidity: 1.1,
    conductivity: 445,
    status: "Normal",
  },
  {
    timestamp: "2024-02-21 12:20:00",
    ph: 7.3,
    temperature: 24,
    turbidity: 1.3,
    conductivity: 460,
    status: "Normal",
  },
  {
    timestamp: "2024-02-21 12:15:00",
    ph: 7.2,
    temperature: 23,
    turbidity: 1.2,
    conductivity: 455,
    status: "Normal",
  },
  {
    timestamp: "2024-02-21 12:10:00",
    ph: 7.4,
    temperature: 25,
    turbidity: 1.4,
    conductivity: 465,
    status: "Normal",
  },
];

export function RecentReadings() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>pH Level</TableHead>
            <TableHead>Temperature (°C)</TableHead>
            <TableHead>Turbidity (NTU)</TableHead>
            <TableHead>Conductivity (µS/cm)</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {readings.map((reading) => (
            <TableRow key={reading.timestamp}>
              <TableCell>{reading.timestamp}</TableCell>
              <TableCell>{reading.ph}</TableCell>
              <TableCell>{reading.temperature}</TableCell>
              <TableCell>{reading.turbidity}</TableCell>
              <TableCell>{reading.conductivity}</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-green-600/20 bg-green-50 text-green-700">
                  {reading.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
