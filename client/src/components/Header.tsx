"use client";

import React, { useState } from "react";
import { Search, Bell, Mail, ChevronDown, SlidersHorizontal, Plus } from "lucide-react";

interface HeaderProps {
  onOpenCreateKit?: () => void;
}

export default function Header({ onOpenCreateKit }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
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
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 text-sm placeholder-slate-400 rounded-full border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-medium text-slate-400 bg-white border border-slate-200 rounded shadow-2xs">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls: Notifications, Messages, User Profile, CTA */}
      <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4 shrink-0">
        {/* Notification Bell */}
        <button
          type="button"
          className="relative p-2.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Messages / Mail */}
        <button
          type="button"
          className="relative p-2.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Messages"
        >
          <Mail className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1.5 pl-2 hover:bg-slate-50 rounded-full border border-slate-200/60 transition-all text-left"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-sm overflow-hidden ring-2 ring-blue-100">
              {/* Profile Avatar Initials / Image */}
              <span>HS</span>
            </div>
            <div className="hidden lg:block pr-1">
              <p className="text-xs font-bold text-slate-900 leading-tight">Harsh Singh</p>
              <p className="text-[11px] text-slate-500 leading-tight">Aspiring Full Stack Developer</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 text-sm">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="font-semibold text-slate-900">Harsh Singh</p>
                <p className="text-xs text-slate-500">harsh@example.com</p>
              </div>
              <a href="/profile" className="block px-4 py-2 text-slate-700 hover:bg-slate-50">Profile Details</a>
              <a href="/settings" className="block px-4 py-2 text-slate-700 hover:bg-slate-50">Preferences</a>
              <div className="border-t border-slate-100 mt-1 pt-1">
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Button & Filters */}
        <div className="flex items-center gap-2">
          {onOpenCreateKit && (
            <button
              onClick={onOpenCreateKit}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Create New Interview Kit</span>
              <span className="sm:hidden">New Kit</span>
            </button>
          )}

          <button
            type="button"
            className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80 rounded-full transition-colors"
            title="Filter Settings"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
