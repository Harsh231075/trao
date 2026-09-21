"use client";

import { useState } from "react";
import { Search, Bell, Mail, ChevronDown } from "lucide-react";

interface HeaderProps {
  onOpenCreateKit?: () => void;
}

export default function Header({ onOpenCreateKit }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 sm:pb-3.5 border-b border-slate-100 shrink-0">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-xl">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your kits, questions, topics..."
          className="w-full pl-10 pr-12 py-2 bg-white/95 focus:bg-white text-slate-800 text-xs sm:text-sm placeholder-slate-400 rounded-full border border-slate-200/90 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-medium text-slate-400 bg-white border border-slate-200 rounded shadow-2xs">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls: Notifications, Messages, User Profile */}
      <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-2.5 shrink-0">
        {/* Notification Bell */}
        <button
          type="button"
          className="relative w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white border border-slate-200/80 text-slate-600 hover:text-slate-900 flex items-center justify-center shadow-2xs transition-all"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Messages / Mail */}
        <button
          type="button"
          className="relative w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white border border-slate-200/80 text-slate-600 hover:text-slate-900 flex items-center justify-center shadow-2xs transition-all"
          title="Messages"
        >
          <Mail className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 bg-white/90 hover:bg-white rounded-full border border-slate-200/80 shadow-2xs transition-all text-left"
          >
            <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-xs overflow-hidden ring-1 ring-blue-100">
              <span>HS</span>
            </div>
            <div className="hidden lg:block pr-1">
              <p className="text-xs font-bold text-slate-900 leading-tight">Harsh Singh</p>
              <p className="text-[10px] text-slate-500 leading-tight">Aspiring Full Stack Developer</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 text-xs">
              <div className="px-3.5 py-1.5 border-b border-slate-100">
                <p className="font-semibold text-slate-900">Harsh Singh</p>
                <p className="text-[11px] text-slate-500">harsh@example.com</p>
              </div>
              <a href="/profile" className="block px-3.5 py-1.5 text-slate-700 hover:bg-slate-50">Profile Details</a>
              <a href="/settings" className="block px-3.5 py-1.5 text-slate-700 hover:bg-slate-50">Preferences</a>
              <div className="border-t border-slate-100 mt-1 pt-1">
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="block w-full text-left px-3.5 py-1.5 text-red-600 hover:bg-red-50"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
