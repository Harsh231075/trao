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
  Sparkles,
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
    <aside className="w-16 md:w-20 shrink-0 flex flex-col items-center justify-between py-6 px-2 text-white select-none">
      {/* Brand Logo */}
      <div className="flex flex-col items-center gap-6">
        <Link
          href="/"
          className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-white text-blue-600 flex items-center justify-center font-black text-xl shadow-lg shadow-blue-900/30 hover:scale-105 transition-transform group"
          title="PrepAI"
        >
          <span className="font-extrabold text-2xl tracking-tighter text-blue-600">P</span>
        </Link>

        {/* Main Navigation */}
        <nav className="flex flex-col items-center gap-3">
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
                className={`group relative w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? "bg-[#E2FD52] text-slate-950 shadow-md scale-105"
                    : "bg-white/10 text-white/90 hover:bg-white/20 hover:text-white hover:scale-105"
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? "stroke-[2.5]" : ""}`} />
                
                {/* Tooltip */}
                <span className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-medium rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-3">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.name}
              className={`group relative w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                isActive
                  ? "bg-[#E2FD52] text-slate-950 shadow-md scale-105"
                  : "bg-white/10 text-white/90 hover:bg-white/20 hover:text-white hover:scale-105"
              }`}
            >
              <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
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
