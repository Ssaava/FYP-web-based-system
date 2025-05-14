import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { ReactNode } from "react";
import { SocketProvider } from "@/hooks/useSocketContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Affordable Water",
  description: "Affordable water quality monitoring system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SocketProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
