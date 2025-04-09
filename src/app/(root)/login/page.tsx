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

import { toast } from "sonner";
import { z } from "zod";
import { LoginSchema } from "@/schema";
import { useAuthStore } from "@/store/store";
import { Input } from "@/components/common/Input";
import { useRouter } from "next/navigation";

const formDataInitials = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const [formData, setFormData] = useState<z.infer<typeof LoginSchema>>({
    ...formDataInitials,
  });
  const [errors, setErrors] = useState<z.infer<typeof LoginSchema>>({
    ...formDataInitials,
  });
  const authenticating = useAuthStore((state) => state.authenticating);
  const loginUser = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors({ ...formDataInitials });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const validForm = LoginSchema.safeParse(formData);
    if (validForm.success) {
      const response: any = loginUser(formData);
      if (response) {
        toast.success("User logged in Successfully");
        setFormData({ ...formDataInitials });
        router.push("/dashboard");
      } else {
        toast.error("An Error Occurred");
      }
    } else {
      const formErrors = Array(validForm.error.errors)[0];
      formErrors.map((error) => {
        setErrors((prev) => ({
          ...prev,
          [error.path[0]]: error.message,
        }));
      });
    }
  };

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
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Input
              label="Email"
              name="email"
              placeholder="name@example.com"
              onChange={handleInputChange}
              value={formData.email}
              disabled={authenticating}
              error={errors.email}
            />
          </div>
          <div className="grid gap-2">
            <Input
              label="Password"
              placeholder="password..."
              type="password"
              name="password"
              disabled={authenticating}
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            className="w-full block bg-blue-500 py-2 px-6 text-center rounded-md"
            type="submit"
            // disabled={authenticating}
          >
            {authenticating ? "Signing in..." : "Sign in"}
          </Button>
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
