"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import CreateKitModal from "@/components/CreateKitModal";
import {
  FileText,
  Calendar,
  Sparkles,
  Plus,
  MoreVertical,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Activity,
  ListTodo,
  SlidersHorizontal,
  ExternalLink,
} from "lucide-react";

interface InterviewQueueItem {
  id: number;
  name: string;
  subtitle: string;
  avatar: string;
  avatarBg: string;
  room: string;
  condition: string;
  vitals: { label1: string; val1: string; label2: string; val2: string; isAlert?: boolean; isWarning?: boolean };
  status: "Critical" | "Watch" | "Stable";
}

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Queue Items: Exactly 3 rows as requested to fit in single glance
  const [queueItems] = useState<InterviewQueueItem[]>([
    {
      id: 1,
      name: "James Wilson",
      subtitle: "Male, 72 yrs",
      avatar: "JW",
      avatarBg: "bg-amber-100 text-amber-800",
      room: "ICU-204",
      condition: "Post-Op CABG",
      vitals: { label1: "HR", val1: "112", label2: "SpO2", val2: "89%", isAlert: true },
      status: "Critical",
    },
    {
      id: 2,
      name: "Elena Rostova",
      subtitle: "Female, 29 yrs",
      avatar: "ER",
      avatarBg: "bg-purple-100 text-purple-800",
      room: "ER-102",
      condition: "Ketoacidosis",
      vitals: { label1: "HR", val1: "118", label2: "Temp", val2: "101°F", isAlert: true },
      status: "Critical",
    },
    {
      id: 3,
      name: "Sarah Jenkins",
      subtitle: "Female, 54 yrs",
      avatar: "SJ",
      avatarBg: "bg-rose-100 text-rose-800",
      room: "W-412",
      condition: "Acute Pneumonia",
      vitals: { label1: "HR", val1: "95", label2: "SpO2", val2: "92%", isWarning: true },
      status: "Watch",
    },
  ]);

  return (
    <div suppressHydrationWarning className="space-y-3 sm:space-y-3.5">
      {/* Top Universal Header */}
      <Header onOpenCreateKit={() => setIsModalOpen(true)} />

      {/* Greeting & Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
            Good Morning, Dr. Roberts 👋
          </h1>
          <p className="text-xs text-slate-500">
            Real-time candidate queue, vital metrics &amp; AI insights.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-full shadow-xs hover:shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>New Patient</span>
          </button>
          <button
            type="button"
            className="p-1.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            title="Filter Settings"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Top 4 Stat Cards matching Image 2 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {/* Card 1: 128 Active Patients */}
        <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-[#d8e8fe] shadow-2xs hover:shadow-xs transition-all relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">128</h3>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Activity className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-[11px] font-semibold text-blue-600 mt-0.5">Active Patients</p>
          <div className="flex items-end gap-1 h-4 mt-2">
            <span className="w-2 h-1.5 bg-blue-200 rounded-xs" />
            <span className="w-2 h-2.5 bg-blue-300 rounded-xs" />
            <span className="w-2 h-3 bg-blue-400 rounded-xs" />
            <span className="w-2 h-3.5 bg-blue-500 rounded-xs" />
            <span className="w-2 h-4 bg-blue-600 rounded-xs" />
          </div>
        </div>

        {/* Card 2: 07 Urgent Cases */}
        <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-[#d8e8fe] shadow-2xs hover:shadow-xs transition-all relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">07</h3>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center border border-rose-100">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-[11px] font-semibold text-slate-700 mt-0.5">7 Urgent Cases</p>
          <p className="text-[10px] font-medium text-rose-500 mt-2">
            ~ +2 in last hour
          </p>
        </div>

        {/* Card 3: 14 Pending Reviews (Vibrant Lime/Yellow Card) */}
        <div className="bg-[#eefc57] text-slate-900 p-3 sm:p-3.5 rounded-2xl shadow-2xs hover:shadow-xs transition-all relative overflow-hidden group border-0">
          <div className="flex items-start justify-between">
            <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight leading-none">14</h3>
            <div className="w-7 h-7 rounded-lg bg-black/10 text-slate-900 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-[11px] font-bold text-slate-900 mt-0.5">Pending Reviews</p>
          <p className="text-[10px] font-semibold text-slate-800/80 mt-2">
            6 completed • 14 remaining
          </p>
        </div>

        {/* Card 4: 23 Patients on AI Watchlist (Royal Blue Card) */}
        <div className="bg-[#2563eb] text-white p-3 sm:p-3.5 rounded-2xl shadow-2xs hover:shadow-xs transition-all relative overflow-hidden group border-0">
          <div className="flex items-start justify-between">
            <h3 className="text-2xl font-extrabold text-white tracking-tight leading-none">23</h3>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white flex items-center justify-center backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-[11px] font-semibold text-blue-100 mt-0.5">Patients on AI Watchlist</p>
          <p className="text-[10px] font-medium text-blue-200 mt-2 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>4 new insights</span>
          </p>
        </div>
      </div>

      {/* Main Grid: Left 8 Cols (Table) & Right 4 Cols (Quick Actions + Donut Distribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
        {/* Left 8 Cols: Priority Patient Queue (3 rows only to fit single view) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="bg-[#dce9fd] border border-[#bfdbfe]/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-2xs space-y-2.5">
            {/* Header sitting on #dce9fd */}
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                Priority Patient Queue
              </h2>
              <Link
                href="/kits"
                className="text-xs font-bold text-slate-800 hover:text-blue-700 hover:underline"
              >
                View All
              </Link>
            </div>

            {/* Column Headers directly on #dce9fd */}
            <div className="grid grid-cols-12 gap-2 text-[10px] font-extrabold text-blue-600 tracking-wider uppercase px-3 pt-0.5">
              <div className="col-span-4 sm:col-span-3">PATIENT</div>
              <div className="col-span-2">ROOM</div>
              <div className="col-span-3 hidden sm:block">CONDITION</div>
              <div className="col-span-3 sm:col-span-2">VITALS</div>
              <div className="col-span-2 sm:col-span-1 text-center">STATUS</div>
              <div className="col-span-1 text-right">ACTION</div>
            </div>

            {/* Pure White Table Card holding the 3 rows */}
            <div className="bg-white rounded-xl shadow-2xs divide-y divide-slate-100 overflow-hidden">
              {queueItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-2 items-center px-3 py-2 sm:py-2.5 hover:bg-slate-50/70 transition-colors text-xs"
                >
                  {/* Patient Info */}
                  <div className="col-span-4 sm:col-span-3 flex items-center gap-2">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${item.avatarBg} flex items-center justify-center font-black text-[10px] sm:text-xs shadow-2xs shrink-0 ring-1 ring-white`}
                    >
                      {item.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 truncate leading-tight text-[11px] sm:text-xs">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Room */}
                  <div className="col-span-2 font-semibold text-slate-700 text-[11px]">
                    {item.room}
                  </div>

                  {/* Condition */}
                  <div className="col-span-3 hidden sm:block font-semibold text-slate-800 text-[11px] truncate">
                    {item.condition}
                  </div>

                  {/* Vitals */}
                  <div className="col-span-3 sm:col-span-2 text-[10px] space-y-0.5">
                    <div className="flex items-center gap-1">
                      <span className="text-slate-400 font-medium">{item.vitals.label1}</span>
                      <span
                        className={`font-bold ${
                          item.vitals.isAlert
                            ? "text-rose-500"
                            : item.vitals.isWarning
                            ? "text-blue-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {item.vitals.val1}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-slate-400 font-medium">{item.vitals.label2}</span>
                      <span
                        className={`font-bold ${
                          item.vitals.isAlert
                            ? "text-rose-500"
                            : item.vitals.isWarning
                            ? "text-blue-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {item.vitals.val2}
                      </span>
                    </div>
                  </div>

                  {/* Status Pill */}
                  <div className="col-span-2 sm:col-span-1 flex justify-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        item.status === "Critical"
                          ? "bg-[#fee2e2] text-[#dc2626]"
                          : item.status === "Watch"
                          ? "bg-[#e0f2fe] text-[#0284c7]"
                          : "bg-[#dcfce7] text-[#16a34a]"
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{item.status}</span>
                    </span>
                  </div>

                  {/* Action Circular Button */}
                  <div className="col-span-1 flex justify-end">
                    <button
                      type="button"
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors shadow-2xs"
                    >
                      <MoreVertical className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom AI Summary Banner */}
            <div className="bg-[#2563EB] text-white p-2.5 sm:p-3 rounded-xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-white leading-tight">AI Summary</h4>
                  <p className="text-[10px] text-blue-100 font-medium leading-tight">
                    7 patients need immediate attention. Early intervention can improve outcomes.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-1 bg-blue-900/50 hover:bg-blue-950/70 border border-white/20 text-white font-semibold text-[10px] rounded-lg flex items-center justify-center gap-1 transition-colors shrink-0 self-end sm:self-auto"
              >
                <span>Review AI Insights</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Quick Actions & Patient Risk Distribution */}
        <div className="lg:col-span-4 space-y-3">
          {/* Quick Actions Card */}
          <div className="bg-[#dce9fd] border border-[#bfdbfe]/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-2xs space-y-2">
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight px-1">
              Quick Actions
            </h3>

            <div className="space-y-1.5 sm:space-y-2">
              {/* Action 1 */}
              <Link
                href="/practice"
                className="bg-white p-2.5 sm:p-3 rounded-xl shadow-2xs hover:shadow-xs transition-all flex items-center justify-between group border border-transparent hover:border-blue-200"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shadow-2xs">
                    <ListTodo className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-900 leading-tight">
                      Today&apos;s Care Tasks
                    </h4>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium">
                      12 tasks pending
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </Link>

              {/* Action 2 */}
              <Link
                href="/practice"
                className="bg-white p-2.5 sm:p-3 rounded-xl shadow-2xs hover:shadow-xs transition-all flex items-center justify-between group border border-transparent hover:border-blue-200"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shadow-2xs">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-900 leading-tight">
                      Medication Reviews
                    </h4>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium">
                      5 require signature
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </Link>

              {/* Action 3 */}
              <Link
                href="/schedule"
                className="bg-white p-2.5 sm:p-3 rounded-xl shadow-2xs hover:shadow-xs transition-all flex items-center justify-between group border border-transparent hover:border-blue-200"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shadow-2xs">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-900 leading-tight">
                      Upcoming Appointments
                    </h4>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium">
                      Next at 11:30 AM
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Patient Risk Distribution Donut Card */}
          <div className="bg-[#dce9fd] border border-[#bfdbfe]/80 rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 shadow-2xs space-y-2">
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight px-1">
              Patient Risk Distribution
            </h3>

            <div className="bg-white rounded-xl p-3 shadow-2xs flex flex-col items-center justify-center">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                <svg className="w-28 h-28 sm:w-32 sm:h-32 transform -rotate-90" viewBox="0 0 36 36">
                  {/* Base Track */}
                  <path
                    className="text-slate-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Stable 82% (Blue arc) */}
                  <path
                    className="text-[#2563eb]"
                    strokeDasharray="82, 100"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Watch 13% (Yellow arc) */}
                  <path
                    className="text-[#facc15]"
                    strokeDasharray="13, 100"
                    strokeDashoffset="-82"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Critical 5% (Red/Black arc) */}
                  <path
                    className="text-slate-950"
                    strokeDasharray="5, 100"
                    strokeDashoffset="-95"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>

                {/* Center Number matching Image 2 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-none">
                    128
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 mt-0.5">
                    Patient
                  </span>
                </div>
              </div>

              {/* Percentage callouts matching Image 2 */}
              <div className="w-full flex items-center justify-between text-[10px] sm:text-xs font-bold pt-2 px-1">
                <div className="text-left">
                  <span className="block text-[#2563eb] text-xs sm:text-sm leading-tight">82%</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium">
                    Stable
                  </span>
                </div>

                <div className="text-center">
                  <span className="block text-[#ca8a04] text-xs sm:text-sm leading-tight">13%</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium">
                    Watch
                  </span>
                </div>

                <div className="text-right">
                  <span className="block text-rose-600 text-xs sm:text-sm leading-tight">5%</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium">
                    Critical
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Creating New Interview Kit */}
      <CreateKitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
