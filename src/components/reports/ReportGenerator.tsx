"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "../common/DateRangePicker";

export function ReportGenerator() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Report Type</Label>
        <RadioGroup defaultValue="detailed" className="grid grid-cols-3 gap-4">
          <div>
            <RadioGroupItem
              value="summary"
              id="summary"
              className="peer sr-only"
            />
            <Label
              htmlFor="summary"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              Summary
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="detailed"
              id="detailed"
              className="peer sr-only"
            />
            <Label
              htmlFor="detailed"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              Detailed
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="custom"
              id="custom"
              className="peer sr-only"
            />
            <Label
              htmlFor="custom"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              Custom
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-2">
        <Label>Parameters</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select parameters" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Parameters</SelectItem>
            <SelectItem value="ph">pH Level</SelectItem>
            <SelectItem value="temperature">Temperature</SelectItem>
            <SelectItem value="turbidity">Turbidity</SelectItem>
            <SelectItem value="conductivity">Conductivity</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Date Range</Label>
        <DateRangePicker />
      </div>
      <Button className="w-full">Generate Report</Button>
    </div>
  );
}
