"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Droplets } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { LoginSchema } from "@/schema";

const formDataInitials = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<z.infer<typeof LoginSchema>>({
    ...formDataInitials,
  });
  const [errors, setErrors] = useState<z.infer<typeof LoginSchema>>({
    ...formDataInitials,
  });

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <Card className="w-full max-w-lg mx-4">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2 mb-2">
          <Droplets className="h-6 w-6 text-blue-500" />
          <CardTitle className="text-2xl">Login</CardTitle>
        </div>
        <CardDescription>
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" disabled={isLoading} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Link
            href="/dashboard"
            className="w-full block bg-blue-500 py-2 px-6 text-center rounded-md"
            type="submit"
            //   disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Link>
          <div className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
