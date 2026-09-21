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
        className="h-screen max-h-screen overflow-hidden flex flex-col select-none"
      >
        {/* Outer Frame: Soft, Luminous Sky-Royal Gradient matching the reference tablet */}
        <div
          suppressHydrationWarning
          className="w-full h-screen max-h-screen p-2 sm:p-3 md:p-4 lg:p-5 flex flex-row box-border overflow-hidden relative"
        >
          {/* Subtle Ambient Glow behind sidebar & canvas */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none" />

          {/* Fixed Left Navigation Rail with Connected Active Tab */}
          <Sidebar />

          {/* Main Elevated Canvas - Seamlessly connected with the active tab */}
          <main className="flex-1 h-full max-h-full bg-white rounded-[26px] sm:rounded-[32px] shadow-[0_25px_70px_rgba(20,50,140,0.18)] border border-white/80 overflow-hidden flex flex-col min-w-0 relative z-10">
            <div className="flex-1 h-full overflow-y-auto p-3.5 sm:p-4 lg:p-5 select-text">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
