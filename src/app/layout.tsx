import { Toaster } from "@/components/ui/toaster";
import { inter } from "@/lib/font";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import AppProvider from "./app-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "4H | Sport Nutrition Supplements",
  description: "4H | Sport Nutrition Supplements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={cn("flex w-full flex-col items-center", inter.className)}
      >
        <Toaster />
        <AppProvider>
          <div className="relative flex w-full flex-col items-center bg-[#EDF0F3]">
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
