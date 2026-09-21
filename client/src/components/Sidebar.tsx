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
    <aside className="w-16 sm:w-18 md:w-20 shrink-0 h-full max-h-full flex flex-col items-center justify-between py-2 sm:py-3 text-white select-none relative z-20 overflow-visible">
      {/* Brand Logo + Main Navigation */}
      <div className="flex flex-col items-center gap-3 sm:gap-4 w-full">
        {/* Logo */}
        <div className="w-full flex items-center justify-center px-2 shrink-0">
          <Link
            href="/"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white text-blue-600 flex items-center justify-center font-black text-xl shadow-md hover:scale-105 transition-transform shrink-0"
            title="Trao - The AI Interview Prep Kit"
          >
            <span className="font-extrabold text-xl sm:text-2xl tracking-tighter text-blue-600">T</span>
          </Link>
        </div>

        {/* Main Nav Items */}
        <nav className="flex flex-col items-center gap-1 sm:gap-1.5 w-full">
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

      {/* Bottom Actions (Profile & Settings) */}
      <div className="flex flex-col items-center gap-1 sm:gap-1.5 w-full shrink-0 pt-2 border-t border-white/15">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

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
                <span className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-medium rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
                  {item.name}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
