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
        className="h-screen max-h-screen overflow-hidden flex flex-col bg-blue-600 select-none"
      >
        {/* Outer Frame: Vibrant Royal Blue background matching Image 2 */}
        <div
          suppressHydrationWarning
          className="w-full h-screen max-h-screen p-2 sm:p-3 md:p-4 lg:p-5 flex flex-row gap-2 sm:gap-3 md:gap-4 box-border overflow-hidden"
        >
          {/* Fixed Left Navigation Rail */}
          <Sidebar />

          {/* Main White Elevated Canvas - Only its interior is scrollable */}
          <main className="flex-1 h-full max-h-full bg-white rounded-[24px] sm:rounded-[30px] shadow-[0_20px_60px_rgba(15,23,42,0.22)] border border-white/40 overflow-hidden flex flex-col min-w-0">
            <div className="flex-1 h-full overflow-y-auto p-3.5 sm:p-4 lg:p-5 select-text">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
