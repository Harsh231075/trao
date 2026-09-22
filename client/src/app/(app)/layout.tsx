"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/landing");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E40AF]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white text-blue-600 flex items-center justify-center font-black text-2xl shadow-lg">
            T
          </div>
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AuthGuard>
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
      </AuthGuard>
    </AuthProvider>
  );
}
