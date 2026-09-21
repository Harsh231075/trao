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
  ArrowUpRight,
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
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-full shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create Interview Kit</span>
          </button>
          <button
            type="button"
            className="p-2.5 rounded-full border border-slate-200/90 bg-white/90 text-slate-600 hover:bg-slate-50 transition-colors shadow-2xs"
            title="Filter Settings"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top 4 Stat Cards matching Image 2 Layout with Trao Assessment Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
        {/* Card 1: 128 Questions Practiced */}
        <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-4.5 rounded-2xl sm:rounded-3xl border border-[#d8e8fe] shadow-2xs hover:shadow-xs transition-all relative overflow-hidden group min-h-[118px] sm:min-h-[128px] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">128</h3>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-2xs">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-xs sm:text-[13px] font-black text-blue-600 tracking-tight">Questions Practiced</p>
            <div className="flex items-end gap-1.5 h-4.5 mt-2">
              <span className="w-2.5 h-2 bg-blue-300 rounded-xs" />
              <span className="w-2.5 h-3 bg-blue-400 rounded-xs" />
              <span className="w-2.5 h-3.5 bg-blue-500 rounded-xs" />
              <span className="w-2.5 h-4 bg-blue-600 rounded-xs" />
              <span className="w-2.5 h-4.5 bg-blue-700 rounded-xs" />
            </div>
          </div>
        </div>

        {/* Card 2: 03 Coverage Gaps */}
        <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-4.5 rounded-2xl sm:rounded-3xl border border-[#d8e8fe] shadow-2xs hover:shadow-xs transition-all relative overflow-hidden group min-h-[118px] sm:min-h-[128px] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">03</h3>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center border border-rose-100 shadow-2xs">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-xs sm:text-[13px] font-black text-slate-900 tracking-tight">Coverage Gaps</p>
            <p className="text-xs font-extrabold text-rose-600 mt-2">
              Second pass queued
            </p>
          </div>
        </div>

        {/* Card 3: 14 Flashcards Due (Vibrant Lime/Yellow Card) */}
        <div className="bg-[#eefc57] text-slate-900 p-4 sm:p-4.5 rounded-2xl sm:rounded-3xl shadow-2xs hover:shadow-xs transition-all relative overflow-hidden group border-0 min-h-[118px] sm:min-h-[128px] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <h3 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-none">14</h3>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-black/10 text-slate-900 flex items-center justify-center shadow-2xs">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-xs sm:text-[13px] font-black text-slate-950 tracking-tight">Flashcards Due</p>
            <p className="text-xs font-extrabold text-slate-900 mt-2">
              6 mastered • 14 remaining
            </p>
          </div>
        </div>

        {/* Card 4: 05 Active Prep Kits (Royal Blue Card) */}
        <div className="bg-[#2563eb] text-white p-4 sm:p-4.5 rounded-2xl sm:rounded-3xl shadow-2xs hover:shadow-xs transition-all relative overflow-hidden group border-0 min-h-[118px] sm:min-h-[128px] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none">05</h3>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/20 text-white flex items-center justify-center backdrop-blur-xs shadow-2xs">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-xs sm:text-[13px] font-black text-white tracking-tight">Active Prep Kits</p>
            <p className="text-xs font-bold text-blue-100 mt-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>AI Pipeline ready</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left 8 Cols (Table Queue + Separate AI Summary) & Right 4 Cols (Quick Actions + Distribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch">
        {/* Left 8 Cols: Active Interview Kits Queue + Separated AI Summary Banner */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-3 h-full">
          {/* Top Card: Active Interview Kits Queue */}
          <div className="bg-[#dce9fd] border border-[#bfdbfe]/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-2xs flex-1 flex flex-col justify-between">
            {/* Header sitting on #dce9fd */}
            <div className="flex items-center justify-between px-1 mb-2 shrink-0">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
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
            <div className="grid grid-cols-12 gap-2 text-[10px] sm:text-[11px] font-extrabold text-blue-600 tracking-wider uppercase px-4 pb-2 shrink-0">
              <div className="col-span-4 sm:col-span-3">COMPANY &amp; ROLE</div>
              <div className="col-span-2">TIMELINE</div>
              <div className="col-span-3 hidden sm:block">FOCUS &amp; REQUIREMENTS</div>
              <div className="col-span-3 sm:col-span-2">COVERAGE</div>
              <div className="col-span-2 sm:col-span-1 text-center">STATUS</div>
              <div className="col-span-1 text-right">ACTION</div>
            </div>

            {/* Pure White Table Card holding the 3 rows */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xs divide-y divide-slate-100 overflow-hidden flex-1 flex flex-col justify-around my-0.5">
              {queueItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-2 items-center px-4 sm:px-5 py-3 sm:py-3.5 hover:bg-slate-50/70 transition-colors text-xs flex-1"
                >
                  {/* Company & Role */}
                  <div className="col-span-4 sm:col-span-3 flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full ${item.avatarBg} flex items-center justify-center font-black text-xs sm:text-sm text-white shadow-xs shrink-0 ring-2 ring-white`}
                    >
                      {item.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 truncate leading-tight text-xs sm:text-[13px]">
                        {item.company}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate mt-0.5">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Timeline (Days Available) */}
                  <div className="col-span-2 text-slate-800 text-xs">
                    <p className="font-bold leading-tight">{item.timeline}</p>
                    <p className="text-[10px] text-slate-400 font-normal mt-0.5">{item.timelineDate}</p>
                  </div>

                  {/* Focus & Requirements */}
                  <div className="col-span-3 hidden sm:block font-semibold text-slate-800 text-xs sm:text-[12px] truncate">
                    {item.focusReqs}
                  </div>

                  {/* Coverage Metrics (Must-Haves & Question Coverage) */}
                  <div className="col-span-3 sm:col-span-2 text-[10px] sm:text-[11px] space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 font-medium w-6">REQ</span>
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
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 font-medium w-6">COV</span>
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
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold shadow-2xs ${
                        item.status === "In Progress"
                          ? "bg-[#fee2e2]/80 text-[#dc2626] border border-[#fecaca]/70"
                          : item.status === "Ready"
                          ? "bg-[#e0f2fe]/80 text-[#0284c7] border border-[#bae6fd]/70"
                          : "bg-[#dcfce7]/80 text-[#16a34a] border border-[#bbf7d0]/70"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.2]" />
                      <span>{item.status}</span>
                    </span>
                  </div>

                  {/* Action Circular Button */}
                  <div className="col-span-1 flex justify-end">
                    <button
                      type="button"
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all shadow-2xs"
                    >
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Card: AI Summary Banner - Separated & Styled exactly as the reference mockup */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-700 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl sm:rounded-full shadow-md border border-blue-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              {/* ✨ AI Summary with golden yellow sparkle */}
              <div className="flex items-center gap-1.5 shrink-0">
                <Sparkles className="w-4 h-4 text-[#facc15] fill-[#facc15]/30 stroke-[2.5]" />
                <span className="text-[#facc15] font-extrabold text-xs sm:text-sm tracking-tight whitespace-nowrap">
                  AI Summary
                </span>
              </div>

              {/* Subtle Vertical Divider */}
              <div className="h-5 w-px bg-white/30 hidden sm:block shrink-0" />

              {/* Message Description */}
              <p className="text-white text-[11px] sm:text-xs font-normal sm:font-medium leading-snug">
                Crawl completed for Google hiring handbooks. Second pass generated 4 targeted questions for missing requirements.
              </p>
            </div>

            {/* Dark Pill Action Button matching image */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-1.5 bg-[#172554]/90 hover:bg-[#172554] border border-white/20 text-white font-semibold text-[11px] sm:text-xs rounded-full flex items-center justify-center gap-1.5 transition-all shadow-xs shrink-0 self-end sm:self-auto hover:scale-102 active:scale-98 cursor-pointer"
            >
              <span>Review Pipeline</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Right 4 Cols: Quick Actions & Requirement Coverage Distribution */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3 h-full">
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
