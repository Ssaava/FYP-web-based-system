import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Droplets } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Card className="w-full max-w-lg mx-4">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Droplets className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl">Welcome to AWQMS</CardTitle>
            <CardDescription>
              Affordable Water Quality Monitoring System
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button asChild size="lg" className="w-full">
              <Link href="/dashboard">Login</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/register">Create Account</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
