import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const reports = [
  {
    id: 1,
    name: "Monthly Water Quality Report",
    date: "2024-02-21",
    type: "PDF",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "Weekly Analysis Summary",
    date: "2024-02-14",
    type: "Excel",
    size: "1.8 MB",
  },
  {
    id: 3,
    name: "Parameter Trends Report",
    date: "2024-02-07",
    type: "PDF",
    size: "3.1 MB",
  },
  {
    id: 4,
    name: "Quality Metrics Export",
    date: "2024-02-01",
    type: "CSV",
    size: "956 KB",
  },
];

export function ReportsList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Report Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.name}</TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>{report.type}</TableCell>
              <TableCell>{report.size}</TableCell>
              <TableCell>
                <Button size="sm" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
