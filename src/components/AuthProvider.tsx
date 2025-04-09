"use client";
import { useAuthStore } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { LoadingOverlay } from "./common/LoadingOverlay";

export const GuestRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const authenticating = useAuthStore((state) => state.authenticating);
  const refreshAuthToken = useAuthStore((state) => state.refreshAuthToken);
  const authenticated = useAuthStore((state) => state.authenticated);
  useEffect(() => {
    refreshAuthToken();
  }, [refreshAuthToken]);

  useEffect(() => {
    if (!authenticating && authenticated) {
      router.push("/dashboard");
    }
  }, [authenticating, authenticated, router]);

  if (authenticating || authenticated) {
    return <LoadingOverlay />;
  }

  return <>{children}</>;
};

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const authenticating = useAuthStore((state) => state.authenticating);
  const refreshAuthToken = useAuthStore((state) => state.refreshAuthToken);
  const authenticated = useAuthStore((state) => state.authenticated);
  useEffect(() => {
    refreshAuthToken();
  }, [refreshAuthToken]);

  useEffect(() => {
    if (!authenticating && !authenticated) {
      router.push("/login");
    }
  }, [authenticating, authenticated, router]);

  if (authenticating || !authenticated) {
    return <LoadingOverlay />;
  }

  return <>{children}</>;
};
