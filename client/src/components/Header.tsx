"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, Mail, ChevronDown, LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface HeaderProps {
  onOpenCreateKit?: () => void;
}

export default function Header({ onOpenCreateKit }: HeaderProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const initials = user?.name
    ? user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "U";

  return (
    <header className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 sm:pb-3.5 border-b border-slate-100 shrink-0">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-xl group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-700">
          <Search className="w-4.5 h-4.5" strokeWidth={1.8} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your kits, questions, topics..."
          className="w-full h-11 pl-11.5 pr-12 bg-white text-slate-800 text-sm placeholder:text-slate-500 placeholder:font-normal rounded-full border border-slate-200/90 shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:border-slate-300 hover:shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/80 transition-all"
        />
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              title="Clear search"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-medium text-slate-400 bg-slate-50 border border-slate-200/80 rounded-md shadow-2xs">
              ⌘K
            </kbd>
          )}
        </div>
      </div>

      {/* Right Controls: Notifications, Messages, User Profile */}
      <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-2.5 shrink-0">
        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 bg-white/90 hover:bg-white rounded-full border border-slate-200/80 shadow-2xs transition-all text-left"
          >
            <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-xs overflow-hidden ring-1 ring-blue-100">
              <span>{initials}</span>
            </div>
            <div className="hidden lg:block pr-1">
              <p className="text-xs font-bold text-slate-900 leading-tight">{user?.name || "User"}</p>
              <p className="text-[10px] text-slate-500 leading-tight">{user?.email || ""}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 text-xs">
              <div className="px-3.5 py-1.5 border-b border-slate-100">
                <p className="font-semibold text-slate-900">{user?.name || "User"}</p>
                <p className="text-[11px] text-slate-500">{user?.email || ""}</p>
              </div>
              <button
                onClick={() => { setShowProfileMenu(false); router.push("/profile"); }}
                className="flex items-center gap-2 w-full text-left px-3.5 py-1.5 text-slate-700 hover:bg-slate-50"
              >
                <User className="w-3.5 h-3.5" /> Profile Details
              </button>
              <div className="border-t border-slate-100 mt-1 pt-1">
                <button
                  onClick={() => { setShowProfileMenu(false); logout(); }}
                  className="flex items-center gap-2 w-full text-left px-3.5 py-1.5 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-3.5 h-3.5" /> Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
