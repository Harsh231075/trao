import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrepAI - Interview Preparation Platform",
  description: "AI-powered interview kits, personalized practice, and preparation companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col justify-center bg-blue-600"
      >
        {/* Outer Frame: Vibrant Royal Blue background matching Image 2 */}
        <div
          suppressHydrationWarning
          className="w-full min-h-screen p-2 sm:p-4 md:p-5 lg:p-6 flex flex-row gap-2 sm:gap-4 md:gap-5 box-border"
        >
          {/* Left Navigation Rail */}
          <Sidebar />

          {/* Main White Elevated Canvas */}
          <main className="flex-1 bg-white rounded-[26px] sm:rounded-[32px] shadow-[0_20px_60px_rgba(15,23,42,0.22)] border border-white/40 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
