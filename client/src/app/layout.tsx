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
  title: "Trao - AI Interview Preparation Platform",
  description: "AI-powered interview kits, personalized practice, and preparation companion.",
  icons: {
    icon: "/icon.svg",
  },
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
          {/* Subtle Ambient Glows behind canvas for rich frosted blur diffusion */}
          <div className="absolute top-1/4 left-1/3 w-[520px] h-[520px] bg-sky-200/50 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 right-1/4 w-[480px] h-[480px] bg-blue-300/40 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200/45 rounded-full blur-3xl pointer-events-none" />

          {/* Fixed Left Navigation Rail with Connected Active Tab */}
          <Sidebar />

          {/* Main Elevated Canvas - Heavily Blurred Frosted Glass White (Glassmorphism) */}
          <main className="flex-1 h-full max-h-full bg-white/70 backdrop-blur-3xl backdrop-saturate-150 rounded-[26px] sm:rounded-[32px] shadow-[0_25px_80px_rgba(20,50,140,0.18)] border border-white/75 overflow-hidden flex flex-col min-w-0 relative z-10">
            <div className="flex-1 h-full overflow-y-auto p-3.5 sm:p-4 lg:p-5 select-text">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
