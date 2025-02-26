"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  readingInterval: z.string(),
  dataRetention: z.string(),
  measurementUnit: z.string(),
  calibrationReminder: z.string(),
});

export function SystemSettings() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      readingInterval: "5",
      dataRetention: "30",
      measurementUnit: "metric",
      calibrationReminder: "7",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="readingInterval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reading Interval (minutes)</FormLabel>
              <FormControl>
                <Input {...field} type="number" min="1" max="60" />
              </FormControl>
              <FormDescription>
                How often the system should take readings
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dataRetention"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data Retention (days)</FormLabel>
              <FormControl>
                <Input {...field} type="number" min="1" max="365" />
              </FormControl>
              <FormDescription>
                How long to keep historical data
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="measurementUnit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Measurement Units</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select measurement unit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="metric">Metric</SelectItem>
                  <SelectItem value="imperial">Imperial</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose your preferred measurement system
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="calibrationReminder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calibration Reminder (days)</FormLabel>
              <FormControl>
                <Input {...field} type="number" min="1" max="90" />
              </FormControl>
              <FormDescription>
                How often to remind about sensor calibration
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save system settings</Button>
      </form>
    </Form>
  );
}
