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
  Layers,
  SlidersHorizontal,
  ExternalLink,
} from "lucide-react";

interface InterviewQueueItem {
  id: number;
  company: string;
  role: string;
  avatar: string;
  avatarBg: string;
  timeline: string;
  timelineDate: string;
  focusReqs: string;
  vitals: { label1: string; val1: string; label2: string; val2: string; isAlert?: boolean; isWarning?: boolean };
  status: "In Progress" | "Ready" | "Complete";
}

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Active Prep Kits in Queue: Exactly 3 rows to fit single-glance desktop view
  const [queueItems] = useState<InterviewQueueItem[]>([
    {
      id: 1,
      company: "Google",
      role: "Senior Frontend Engineer",
      avatar: "G",
      avatarBg: "bg-red-500 text-white",
      timeline: "5 Days",
      timelineDate: "Interview: Sep 26",
      focusReqs: "React 19 • System Architecture • Mentoring",
      vitals: { label1: "REQ", val1: "8 Must", label2: "COV", val2: "92%", isAlert: true },
      status: "In Progress",
    },
    {
      id: 2,
      company: "OpenAI",
      role: "Backend Engineer",
      avatar: "O",
      avatarBg: "bg-emerald-600 text-white",
      timeline: "12 Days",
      timelineDate: "Interview: Oct 03",
      focusReqs: "Distributed Systems • Python • RAG",
      vitals: { label1: "REQ", val1: "6 Must", label2: "COV", val2: "100%", isWarning: true },
      status: "Ready",
    },
    {
      id: 3,
      company: "Stripe",
      role: "Full Stack Engineer",
      avatar: "S",
      avatarBg: "bg-indigo-600 text-white",
      timeline: "20 Days",
      timelineDate: "Interview: Oct 11",
      focusReqs: "APIs & Idempotency • Node.js • Postgres",
      vitals: { label1: "REQ", val1: "10 Must", label2: "COV", val2: "100%" },
      status: "Complete",
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
            Good Morning, Harsh 👋
          </h1>
          <p className="text-xs text-slate-500">
            Trao AI Interview Prep Kit — Turn job descriptions into structured preparation plans.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-full shadow-xs hover:shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>New Interview Kit</span>
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

      {/* Top 4 Stat Cards matching Image 2 Layout with Trao Assessment Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {/* Card 1: 128 Questions Practiced */}
        <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-[#d8e8fe] shadow-2xs hover:shadow-xs transition-all relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">128</h3>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Activity className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-[11px] font-semibold text-blue-600 mt-0.5">Questions Practiced</p>
          <div className="flex items-end gap-1 h-4 mt-2">
            <span className="w-2 h-1.5 bg-blue-200 rounded-xs" />
            <span className="w-2 h-2.5 bg-blue-300 rounded-xs" />
            <span className="w-2 h-3 bg-blue-400 rounded-xs" />
            <span className="w-2 h-3.5 bg-blue-500 rounded-xs" />
            <span className="w-2 h-4 bg-blue-600 rounded-xs" />
          </div>
        </div>

        {/* Card 2: 03 Coverage Gaps */}
        <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-[#d8e8fe] shadow-2xs hover:shadow-xs transition-all relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">03</h3>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center border border-rose-100">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-[11px] font-semibold text-slate-700 mt-0.5">Coverage Gaps</p>
          <p className="text-[10px] font-medium text-rose-500 mt-2">
            Second pass queued
          </p>
        </div>

        {/* Card 3: 14 Flashcards Due (Vibrant Lime/Yellow Card) */}
        <div className="bg-[#eefc57] text-slate-900 p-3 sm:p-3.5 rounded-2xl shadow-2xs hover:shadow-xs transition-all relative overflow-hidden group border-0">
          <div className="flex items-start justify-between">
            <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight leading-none">14</h3>
            <div className="w-7 h-7 rounded-lg bg-black/10 text-slate-900 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-[11px] font-bold text-slate-900 mt-0.5">Flashcards Due</p>
          <p className="text-[10px] font-semibold text-slate-800/80 mt-2">
            6 mastered • 14 remaining
          </p>
        </div>

        {/* Card 4: 05 Active Prep Kits (Royal Blue Card) */}
        <div className="bg-[#2563eb] text-white p-3 sm:p-3.5 rounded-2xl shadow-2xs hover:shadow-xs transition-all relative overflow-hidden group border-0">
          <div className="flex items-start justify-between">
            <h3 className="text-2xl font-extrabold text-white tracking-tight leading-none">05</h3>
            <div className="w-7 h-7 rounded-lg bg-white/20 text-white flex items-center justify-center backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-[11px] font-semibold text-blue-100 mt-0.5">Active Prep Kits</p>
          <p className="text-[10px] font-medium text-blue-200 mt-2 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>AI Pipeline ready</span>
          </p>
        </div>
      </div>

      {/* Main Grid: Left 8 Cols (Table Queue) & Right 4 Cols (Quick Actions + Distribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
        {/* Left 8 Cols: Active Interview Kits Queue */}
        <div className="lg:col-span-8 space-y-3">
          <div className="bg-[#dce9fd] border border-[#bfdbfe]/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-2xs space-y-2.5">
            {/* Header sitting on #dce9fd */}
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                Active Interview Kits Queue
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
              <div className="col-span-4 sm:col-span-3">COMPANY &amp; ROLE</div>
              <div className="col-span-2">TIMELINE</div>
              <div className="col-span-3 hidden sm:block">FOCUS &amp; REQUIREMENTS</div>
              <div className="col-span-3 sm:col-span-2">COVERAGE</div>
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
                  {/* Company & Role */}
                  <div className="col-span-4 sm:col-span-3 flex items-center gap-2">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${item.avatarBg} flex items-center justify-center font-black text-[10px] sm:text-xs shadow-2xs shrink-0 ring-1 ring-white`}
                    >
                      {item.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 truncate leading-tight text-[11px] sm:text-xs">
                        {item.company}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium truncate">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Timeline (Days Available) */}
                  <div className="col-span-2 font-semibold text-slate-700 text-[11px]">
                    <p className="leading-tight">{item.timeline}</p>
                    <p className="text-[9px] text-slate-400 font-normal">{item.timelineDate}</p>
                  </div>

                  {/* Focus & Requirements */}
                  <div className="col-span-3 hidden sm:block font-semibold text-slate-800 text-[11px] truncate">
                    {item.focusReqs}
                  </div>

                  {/* Coverage Metrics (Must-Haves & Question Coverage) */}
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

                  {/* Status Pill with CheckCircle2 */}
                  <div className="col-span-2 sm:col-span-1 flex justify-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        item.status === "In Progress"
                          ? "bg-[#fee2e2] text-[#dc2626]"
                          : item.status === "Ready"
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

            {/* Bottom AI Summary Banner matching Trao Assessment Research & Generation */}
            <div className="bg-[#2563EB] text-white p-2.5 sm:p-3 rounded-xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-white leading-tight">AI Research &amp; Coverage Engine</h4>
                  <p className="text-[10px] text-blue-100 font-medium leading-tight">
                    Crawl completed for Google hiring handbooks. Second pass generated 4 targeted questions for missing requirements.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-1 bg-blue-900/50 hover:bg-blue-950/70 border border-white/20 text-white font-semibold text-[10px] rounded-lg flex items-center justify-center gap-1 transition-colors shrink-0 self-end sm:self-auto"
              >
                <span>Review Pipeline</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Quick Actions & Requirement Coverage Distribution */}
        <div className="lg:col-span-4 space-y-3">
          {/* Quick Actions Card */}
          <div className="bg-[#dce9fd] border border-[#bfdbfe]/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-2xs space-y-2">
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight px-1">
              Quick Actions
            </h3>

            <div className="space-y-1.5 sm:space-y-2">
              {/* Action 1: Practice Mode */}
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
                      Practise Flashcards
                    </h4>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium">
                      14 cards • Confidence-weighted
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </Link>

              {/* Action 2: Builder & Section Regeneration */}
              <Link
                href="/kits"
                className="bg-white p-2.5 sm:p-3 rounded-xl shadow-2xs hover:shadow-xs transition-all flex items-center justify-between group border border-transparent hover:border-blue-200"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shadow-2xs">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-900 leading-tight">
                      Edit Kit &amp; Regenerate
                    </h4>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium">
                      Preserve pinned &amp; manual edits
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </Link>

              {/* Action 3: Day-by-Day Schedule */}
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
                      Day-by-Day Schedule
                    </h4>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium">
                      Arithmetic topic allocation
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Requirement Coverage Distribution Donut Card */}
          <div className="bg-[#dce9fd] border border-[#bfdbfe]/80 rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 shadow-2xs space-y-2">
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight px-1">
              Requirement Coverage Distribution
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
                  {/* Technical 82% (Blue arc) */}
                  <path
                    className="text-[#2563eb]"
                    strokeDasharray="82, 100"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Behavioural 13% (Yellow arc) */}
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
                  {/* Domain / Company-Fit 5% (Dark/Red arc) */}
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
                    Questions
                  </span>
                </div>
              </div>

              {/* Percentage callouts */}
              <div className="w-full flex items-center justify-between text-[10px] sm:text-xs font-bold pt-2 px-1">
                <div className="text-left">
                  <span className="block text-[#2563eb] text-xs sm:text-sm leading-tight">82%</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium">
                    Technical
                  </span>
                </div>

                <div className="text-center">
                  <span className="block text-[#ca8a04] text-xs sm:text-sm leading-tight">13%</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium">
                    Behavioural
                  </span>
                </div>

                <div className="text-right">
                  <span className="block text-rose-600 text-xs sm:text-sm leading-tight">5%</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium">
                    Company-Fit
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
