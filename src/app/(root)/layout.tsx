import { GuestRoute } from "@/components/AuthProvider";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <GuestRoute>
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        {children}
      </div>
    </GuestRoute>
  );
};

export default layout;
