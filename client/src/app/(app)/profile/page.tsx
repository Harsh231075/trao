"use client";

import React from "react";
import Header from "@/components/Header";
import { LogOut, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="space-y-6">
      <Header />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            User Profile
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage your account session and credentials.
          </p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs max-w-xl space-y-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-extrabold text-2xl shadow-md ring-4 ring-blue-50 shrink-0">
            {initials}
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">
              {user?.name || "User"}
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{user?.email || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Action Section - Logout Only */}
        <div className="pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={logout}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

