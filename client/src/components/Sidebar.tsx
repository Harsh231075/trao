"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Play,
  Calendar,
  Menu,
  X,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mainNavItems: NavItem[] = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Interview Kits", href: "/kits", icon: FileText },
  { name: "Practice", href: "/practice", icon: Play },
  { name: "Schedule", href: "/schedule", icon: Calendar },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Floating Hamburger Toggle */}
      <div className="sm:hidden fixed top-3.5 left-3.5 z-40">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-10 h-10 rounded-2xl bg-slate-900/90 text-white backdrop-blur-md flex items-center justify-center shadow-lg border border-white/20 active:scale-95 transition-all"
          title="Toggle Navigation Menu"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Slide-Over Navigation Drawer */}
      {isMobileOpen && (
        <div className="sm:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-72 max-w-[82vw] bg-slate-900 text-white h-full p-5 flex flex-col justify-between shadow-2xl z-10 border-r border-white/10 animate-in slide-in-from-left duration-200">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <Link href="/" onClick={() => setIsMobileOpen(false)} className="flex items-baseline font-black tracking-tighter group">
                  <span className="text-3xl sm:text-4xl font-black text-white">Trao</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#eefc57] tracking-tight ml-0.5">
                    .ai
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items Centered */}
              <nav className="mt-8 flex flex-col gap-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
                  Navigation
                </p>
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-sm font-bold transition-all ${isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Rail Sidebar */}
      <aside className="hidden sm:flex w-16 sm:w-18 md:w-20 shrink-0 h-full max-h-full flex-col items-center py-4 text-white select-none relative z-20 overflow-visible">
        {/* Brand Logo at Top - Modern Tech Logo Mark */}
        <div className="w-full flex items-center justify-center px-1 shrink-0">
          <Link
            href="/"
            className="group flex flex-col items-center justify-center transition-all duration-200 py-1"
            title="Trao.ai - AI Interview Prep Kit Platform"
          >
            <div className="flex items-baseline font-black tracking-tighter">
              <span className="text-xl sm:text-xl font-black text-white group-hover:text-blue-100 transition-colors drop-shadow-sm">
                Trao
              </span>
              <span className="text-xl sm:text-xl font-extrabold text-blue-500 tracking-tight ml-0.5 group-hover:text-amber-300 transition-colors">
                .ai
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items Positioned Slightly Above Center */}
        <div className="flex-1 flex flex-col justify-start items-center w-full pt-10 sm:pt-14">
          <nav className="flex flex-col items-center gap-2 sm:gap-2.5 w-full">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (isActive) {
                return (
                  <div key={item.href} className="relative w-full flex items-center justify-end my-0.5">
                    <Link
                      href={item.href}
                      title={item.name}
                      className="relative w-full h-11 sm:h-12 bg-white/70 backdrop-blur-3xl backdrop-saturate-150 rounded-l-2xl sm:rounded-l-3xl flex items-center justify-center text-blue-600 shadow-xs z-30 -mr-px group border-y border-l border-white/60"
                    >
                      <Icon className="w-5 h-5 text-blue-600 stroke-[2.5] transition-transform group-hover:scale-110" />

                      {/* Top Inverted Corner Notch */}
                      <svg
                        className="absolute -top-5 right-0 w-5 h-5 pointer-events-none text-white/70 fill-current z-30"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 0 L20 20 L0 20 Q20 20 20 0 Z" />
                      </svg>

                      {/* Bottom Inverted Corner Notch */}
                      <svg
                        className="absolute -bottom-5 right-0 w-5 h-5 pointer-events-none text-white/70 fill-current z-30"
                        viewBox="0 0 20 20"
                      >
                        <path d="M0 0 L20 0 L20 20 Q20 0 0 0 Z" />
                      </svg>

                      {/* Tooltip */}
                      <span className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-medium rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
                        {item.name}
                      </span>
                    </Link>
                  </div>
                );
              }

              return (
                <div key={item.href} className="w-full flex items-center justify-center px-2 my-0.5">
                  <Link
                    href={item.href}
                    title={item.name}
                    className="group relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center bg-white/18 text-white hover:bg-white/30 hover:text-white backdrop-blur-md border border-white/25 shadow-2xs hover:scale-105 transition-all duration-200 shrink-0"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />

                    {/* Tooltip */}
                    <span className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-medium rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
                      {item.name}
                    </span>
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

