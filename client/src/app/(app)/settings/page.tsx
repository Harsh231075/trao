"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { Settings, Bell, Shield, Sliders, Sparkles, Check } from "lucide-react";

export default function SettingsPage() {
  const [model, setModel] = useState("Gemini 1.5 Pro");
  const [notifications, setNotifications] = useState(true);
  const [dailyReminder, setDailyReminder] = useState("09:00 AM");

  return (
    <div className="space-y-6">
      <Header />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Settings &amp; Preferences
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Configure your AI companion behavior, reminder alerts, and workspace appearance.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
        {/* AI Model Setting */}
        <div className="space-y-3 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>AI Research &amp; Question Generation Engine</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {["Gemini 1.5 Pro", "Claude 3.5 Sonnet", "GPT-4o"].map((m) => (
              <button
                key={m}
                onClick={() => setModel(m)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  model === m
                    ? "border-blue-600 bg-blue-50/50 text-blue-900 ring-2 ring-blue-100"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{m}</span>
                  {model === m && <Check className="w-4 h-4 text-blue-600" />}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Recommended for code reasoning &amp; system architecture</p>
              </button>
            ))}
          </div>
        </div>

        {/* Daily Notifications */}
        <div className="space-y-3 pb-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-sm font-bold text-slate-900">Daily Study Streak Notifications</span>
              <p className="text-xs text-slate-500">Receive morning notification with today&apos;s 3 practice focus questions.</p>
            </div>
            <button
              type="button"
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                notifications ? "bg-blue-600" : "bg-slate-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  notifications ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* API Backend Connection */}
        <div className="space-y-2">
          <span className="text-sm font-bold text-slate-900">Backend Server Connection</span>
          <p className="text-xs text-slate-500">
            Express server running at <code className="px-2 py-0.5 bg-slate-100 rounded text-blue-600 font-mono">http://localhost:5001</code>
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Connected to Express API
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
