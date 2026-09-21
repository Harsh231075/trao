"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  PlusCircle,
  FileText,
  Play,
  Calendar,
  BookOpen,
  BarChart3,
  User,
  Settings,
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
  { name: "Resources", href: "/resources", icon: BookOpen },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

const bottomNavItems: NavItem[] = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-14 sm:w-16 md:w-18 shrink-0 h-full max-h-full flex flex-col items-center justify-between py-1.5 sm:py-2.5 px-1 text-white select-none overflow-hidden">
      {/* Brand Logo + Main Navigation */}
      <div className="flex flex-col items-center gap-3 sm:gap-4 w-full">
        {/* Logo */}
        <Link
          href="/"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white text-blue-600 flex items-center justify-center font-black text-xl shadow-lg shadow-blue-900/30 hover:scale-105 transition-transform shrink-0"
          title="PrepAI"
        >
          <span className="font-extrabold text-xl sm:text-2xl tracking-tighter text-blue-600">P</span>
        </Link>

        {/* Main Nav Items */}
        <nav className="flex flex-col items-center gap-1.5 sm:gap-2 w-full">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.name}
                className={`group relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center transition-all duration-200 shrink-0 ${
                  isActive
                    ? "bg-[#E2FD52] text-slate-950 shadow-md scale-105"
                    : "bg-white/10 text-white/90 hover:bg-white/20 hover:text-white hover:scale-105"
                }`}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 ${isActive ? "stroke-[2.5]" : ""}`} />
                
                {/* Tooltip */}
                <span className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-medium rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions (Profile & Settings) */}
      <div className="flex flex-col items-center gap-1.5 sm:gap-2 w-full shrink-0 pt-2 border-t border-white/10">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.name}
              className={`group relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center transition-all duration-200 shrink-0 ${
                isActive
                  ? "bg-[#E2FD52] text-slate-950 shadow-md scale-105"
                  : "bg-white/10 text-white/90 hover:bg-white/20 hover:text-white hover:scale-105"
              }`}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
              <span className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-medium rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
