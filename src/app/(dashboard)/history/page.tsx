import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import { DateRangePicker } from "@/components/common/DateRangePicker";
import { ParameterFilter } from "@/components/history/ParameterFilter";
import { HistoricalDataTable } from "@/components/history/HistoricalDataTable";
import { HistoricalComparison } from "@/components/history/HistoricalComparison";
import { HistoricalData } from "@/components/history/HistoricalData";

export default function HistoryPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Historical Data</h2>
          <p className="text-muted-foreground">
            View and analyze historical water quality measurements
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ParameterFilter />
          <DateRangePicker />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Historical Trends</CardTitle>
            <CardDescription>
              Long-term water quality parameter trends
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <HistoricalData />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Period Comparison</CardTitle>
            <CardDescription>
              Compare data across different time periods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <HistoricalComparison />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Data Table</CardTitle>
            <CardDescription>Detailed historical readings</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </CardHeader>
        <CardContent>
          <HistoricalDataTable />
        </CardContent>
      </Card>
    </div>
  );
}
