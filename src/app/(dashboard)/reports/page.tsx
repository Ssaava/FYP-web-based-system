import { ReportGenerator } from "@/components/reports/ReportGenerator";
import { ReportsList } from "@/components/reports/ReportsList";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileDown, Plus } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            Generate and download water quality reports
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Generated Reports</CardTitle>
            <CardDescription>
              View and download previously generated reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReportsList />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Report Generator</CardTitle>
            <CardDescription>Create a new custom report</CardDescription>
          </CardHeader>
          <CardContent>
            <ReportGenerator />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
