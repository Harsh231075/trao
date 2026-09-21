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

  // Active Prep Kits in Queue
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
    {
      id: 4,
      company: "Meta",
      role: "Software Engineer — Infra",
      avatar: "M",
      avatarBg: "bg-blue-600 text-white",
      timeline: "18 Days",
      timelineDate: "Interview: Oct 09",
      focusReqs: "Graph APIs • React • Algorithms",
      vitals: { label1: "REQ", val1: "9 Must", label2: "COV", val2: "74%", isAlert: true },
      status: "In Progress",
    },
    {
      id: 5,
      company: "Notion",
      role: "Product Engineer",
      avatar: "N",
      avatarBg: "bg-slate-800 text-white",
      timeline: "28 Days",
      timelineDate: "Interview: Oct 19",
      focusReqs: "TypeScript • Collab UX • Perf Optim.",
      vitals: { label1: "REQ", val1: "7 Must", label2: "COV", val2: "55%", isWarning: true },
      status: "Ready",
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
        <div className="bg-white/95 backdrop-blur-sm p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-[#d8e8fe] shadow-2xs hover:shadow-xs transition-all relative overflow-hidden group min-h-[114px] sm:min-h-[122px] flex flex-col justify-between">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-none">128</h3>
          </div>
          <div>
            <p className="text-xs font-semibold text-blue-600">Questions Practiced</p>
            <div className="flex items-end gap-1.5 h-3.5 mt-2">
              <span className="w-2 h-2 bg-blue-200 rounded-xs" />
              <span className="w-2 h-2.5 bg-blue-300 rounded-xs" />
              <span className="w-2 h-3 bg-blue-400 rounded-xs" />
              <span className="w-2 h-3.5 bg-blue-500 rounded-xs" />
              <span className="w-2 h-4 bg-blue-600 rounded-xs" />
            </div>
          </div>
        </div>

        {/* Card 2: 03 Coverage Gaps */}
        <div className="bg-white/95 backdrop-blur-sm p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-[#d8e8fe] shadow-2xs hover:shadow-xs transition-all relative overflow-hidden group min-h-[114px] sm:min-h-[122px] flex flex-col justify-between">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-none">03</h3>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-700">Coverage Gaps</p>
            <p className="text-[11px] sm:text-xs font-medium text-rose-500 mt-1.5">
              Second pass queued
            </p>
          </div>
        </div>

        {/* Card 3: 14 Flashcards Due (Vibrant Lime/Yellow Card) */}
        <div className="bg-[#eefc57] text-slate-900 p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xs hover:shadow-xs transition-all relative overflow-hidden group border-0 min-h-[114px] sm:min-h-[122px] flex flex-col justify-between">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight leading-none">14</h3>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-900">Flashcards Due</p>
            <p className="text-[11px] sm:text-xs font-medium text-slate-800/80 mt-1.5">
              6 mastered • 14 remaining
            </p>
          </div>
        </div>

        {/* Card 4: 05 Active Prep Kits (Royal Blue Card) */}
        <div className="bg-[#2563eb] text-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xs hover:shadow-xs transition-all relative overflow-hidden group border-0 min-h-[114px] sm:min-h-[122px] flex flex-col justify-between">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">05</h3>
          </div>
          <div>
            <p className="text-xs font-semibold text-blue-100">Active Prep Kits</p>
            <p className="text-[11px] sm:text-xs font-medium text-blue-200 mt-1.5">
              AI Pipeline ready
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left 8 Cols (Table Queue + Separate AI Summary) & Right 4 Cols (Quick Actions + Distribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch">
        {/* Left 8 Cols: Active Interview Kits Queue + Separated AI Summary Banner */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-3 h-full">
          {/* Top Card: Active Interview Kits Queue */}
          <div className="bg-[#dce9fd] border border-[#bfdbfe]/80 rounded-2xl sm:rounded-3xl p-4 sm:p-4.5 shadow-2xs flex-1 flex flex-col gap-2">
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

            {/* Column Headers & Table Rows in synchronized horizontal scroll container */}
            <div className="overflow-x-auto scrollbar-thin -mx-1 px-1">
              <div className="min-w-[880px] flex flex-col gap-1">
                {/* Fixed Column Headers directly on #dce9fd */}
                <div className="grid grid-cols-[200px_110px_minmax(180px,1fr)_100px_122px_56px] gap-3 items-center px-5 sm:px-6 pb-2 text-[10px] sm:text-[11px] font-extrabold text-blue-600 tracking-wider uppercase shrink-0">
                  <div>COMPANY &amp; ROLE</div>
                  <div>TIMELINE</div>
                  <div>FOCUS &amp; REQUIREMENTS</div>
                  <div>COVERAGE</div>
                  <div className="text-center">STATUS</div>
                  <div className="text-right">ACTION</div>
                </div>

                {/* Pure White Table Card holding the 3 rows */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xs divide-y divide-slate-100 overflow-hidden border border-white/80 my-1">
                  {queueItems.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[200px_110px_minmax(180px,1fr)_100px_122px_56px] gap-3 items-center px-5 sm:px-6 h-[74px] hover:bg-slate-50/70 transition-colors text-xs"
                    >
                      {/* 1. Company & Role (Stacked) */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${item.avatarBg} flex items-center justify-center font-black text-xs sm:text-sm text-white shadow-xs shrink-0 ring-2 ring-white`}
                        >
                          {item.avatar}
                        </div>
                        <div className="min-w-0 flex flex-col justify-center">
                          <p className="font-bold text-slate-900 truncate leading-tight text-xs sm:text-sm">
                            {item.company}
                          </p>
                          <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">
                            {item.role}
                          </p>
                        </div>
                      </div>

                      {/* 2. Timeline (Stacked) */}
                      <div className="flex flex-col justify-center min-w-0 text-slate-800 text-xs">
                        <p className="font-bold text-slate-900 text-xs sm:text-sm leading-tight truncate">
                          {item.timeline}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-slate-400 font-normal mt-0.5 truncate">
                          {item.timelineDate}
                        </p>
                      </div>

                      {/* 3. Focus & Requirements (Constrained with ellipsis) */}
                      <div className="min-w-0 pr-2">
                        <p
                          className="font-medium text-slate-700 text-xs sm:text-[13px] truncate"
                          title={item.focusReqs}
                        >
                          {item.focusReqs}
                        </p>
                      </div>

                      {/* 4. Coverage Metrics (Vertically aligned REQ/COV) */}
                      <div className="flex flex-col justify-center space-y-1 text-xs min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 font-semibold w-7 text-[10px] sm:text-[11px] shrink-0">
                            REQ
                          </span>
                          <span
                            className={`font-bold text-xs ${
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
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 font-semibold w-7 text-[10px] sm:text-[11px] shrink-0">
                            COV
                          </span>
                          <span
                            className={`font-bold text-xs ${
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

                      {/* 5. Status (Fixed-width badge) */}
                      <div className="flex items-center justify-center">
                        <span
                          className={`w-[110px] h-7 inline-flex items-center justify-center gap-1.5 rounded-full text-[11px] font-semibold shadow-2xs shrink-0 ${
                            item.status === "In Progress"
                              ? "bg-[#fee2e2]/80 text-[#dc2626] border border-[#fecaca]/70"
                              : item.status === "Ready"
                                ? "bg-[#e0f2fe]/80 text-[#0284c7] border border-[#bae6fd]/70"
                                : "bg-[#dcfce7]/80 text-[#16a34a] border border-[#bbf7d0]/70"
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.2] shrink-0" />
                          <span className="truncate">{item.status}</span>
                        </span>
                      </div>

                      {/* 6. Action (Fixed-width menu button) */}
                      <div className="flex items-center justify-end">
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all shadow-2xs shrink-0"
                          title="Actions"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card: AI Summary Banner - Matched exactly to the reference image */}
          <div className="w-full bg-gradient-to-r from-[#3575f6] via-[#5d98fa] to-[#9bc4fc] text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-full shadow-[0_4px_16px_rgba(53,117,246,0.18)] border border-white/40 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              {/* ✨ AI Summary with golden yellow sparkle */}
              <div className="flex items-center gap-2 shrink-0">
                <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#facc15] fill-[#facc15] stroke-[1.5] shrink-0" />
                <span className="text-[#facc15] font-bold text-xs sm:text-sm tracking-tight whitespace-nowrap">
                  AI Summary
                </span>
              </div>

              {/* Vertical Divider */}
              <div className="h-6 w-px bg-white/40 shrink-0" />

              {/* Message Description */}
              <p className="text-white text-xs sm:text-[13px] font-medium leading-snug truncate">
                Crawl completed for Google hiring handbooks. Second pass generated 4 targeted questions.
              </p>
            </div>

            {/* Dark Royal Blue Pill Action Button matching image */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2 sm:py-2.5 bg-[#1849be] hover:bg-[#133d9f] text-white font-semibold text-xs sm:text-[13px] rounded-full flex items-center justify-center gap-1.5 transition-all shadow-xs shrink-0 hover:scale-102 active:scale-98 cursor-pointer"
            >
              <span>Review AI Insights</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Right 4 Cols: Quick Actions & Requirement Coverage Distribution */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3 h-full">
          {/* Quick Actions Card */}
          <div className="bg-[#dce9fd] border border-[#bfdbfe]/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-2xs space-y-2 shrink-0">
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight px-1 mb-1.5">
              Quick Actions
            </h3>

            <div className="space-y-1.5 sm:space-y-2">
              {/* Action 1: Practice Mode */}
              <Link
                href="/practice"
                className="bg-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-2xs hover:shadow-xs transition-all flex items-center justify-between group border border-transparent hover:border-blue-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-2xs">
                    <ListTodo className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight">
                      Practise Flashcards
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5">
                      14 cards • Confidence-weighted
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </Link>

              {/* Action 2: Builder & Section Regeneration */}
              <Link
                href="/kits"
                className="bg-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-2xs hover:shadow-xs transition-all flex items-center justify-between group border border-transparent hover:border-blue-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-2xs">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight">
                      Edit Kit &amp; Regenerate
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5">
                      Preserve pinned &amp; manual edits
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </Link>

              {/* Action 3: Day-by-Day Schedule */}
              <Link
                href="/schedule"
                className="bg-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-2xs hover:shadow-xs transition-all flex items-center justify-between group border border-transparent hover:border-blue-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-2xs">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight">
                      Day-by-Day Schedule
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5">
                      Arithmetic topic allocation
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Requirement Coverage Distribution - Matched 1:1 to Open Arch Gauge Reference Image */}
          <div className="bg-[#dce9fd] border border-[#bfdbfe]/80 rounded-2xl sm:rounded-3xl p-4 sm:p-4.5 shadow-2xs flex-1 flex flex-col justify-between min-h-[250px] sm:min-h-[280px]">
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight px-1 mb-1 shrink-0">
              Requirement Coverage Distribution
            </h3>

            {/* Gauge Area with Open Horseshoe Arch and Floating Callouts */}
            <div className="relative w-full max-w-[330px] sm:max-w-[360px] mx-auto flex items-center justify-center my-auto py-1 sm:py-2">
              <svg
                className="w-full h-auto min-h-[175px] sm:min-h-[195px] max-h-[215px]"
                viewBox="0 0 260 160"
                fill="none"
              >
                {/* Yellow Arc (13%) - curves from 1:30 to 4:00 */}
                <path
                  d="M 195.5 90.0 A 66 66 0 0 1 188.8 128.0"
                  stroke="#eefc57"
                  strokeWidth="19"
                  strokeLinecap="round"
                />

                {/* Blue Arc (82%) - curves from 7:30 all the way over top to 1:30 */}
                <path
                  d="M 79.4 140.4 A 66 66 0 1 1 195.5 90.0"
                  stroke="#2f70f5"
                  strokeWidth="19"
                  strokeLinecap="round"
                />

                {/* Black Arc Pill (5%) - dark pill at bottom right */}
                <path
                  d="M 188.8 128.0 A 66 66 0 0 1 179.0 142.2"
                  stroke="#0f172a"
                  strokeWidth="19"
                  strokeLinecap="round"
                />

                {/* Decorative Pin Dots matching reference mockup */}
                <circle cx="66.2" cy="80.9" r="3.8" fill="#22d3ee" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="189.8" cy="125.9" r="3" fill="#a3e635" stroke="#ffffff" strokeWidth="1.2" />
                <circle cx="180" cy="132" r="2.5" fill="#94a3b8" />
              </svg>

              {/* Center Number & Label inside the Horseshoe Opening */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none pb-1">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 leading-none tracking-tight">
                  128
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-700 mt-1">
                  Questions
                </span>
              </div>

              {/* Left Callout: 82% Technical */}
              <div className="absolute left-0.5 sm:left-1 top-[44%] -translate-y-1/2 text-left pointer-events-none">
                <span className="block text-[#2f70f5] font-black text-base sm:text-lg lg:text-xl leading-tight">
                  82%
                </span>
                <span className="block text-slate-800 font-bold text-xs sm:text-[13px] leading-tight mt-0.5">
                  Technical
                </span>
              </div>

              {/* Top-Right Callout: 13% Behavioural */}
              <div className="absolute right-0.5 sm:right-1 top-[16%] -translate-y-1/2 text-left pointer-events-none">
                <span className="block text-[#2f70f5] font-black text-base sm:text-lg lg:text-xl leading-tight">
                  13%
                </span>
                <span className="block text-slate-800 font-bold text-xs sm:text-[13px] leading-tight mt-0.5">
                  Behavioural
                </span>
              </div>

              {/* Bottom-Right Callout: 5% Company-Fit */}
              <div className="absolute right-0.5 sm:right-1 bottom-[8%] translate-y-0 text-left pointer-events-none">
                <span className="block text-[#ef4444] font-black text-base sm:text-lg lg:text-xl leading-tight">
                  5%
                </span>
                <span className="block text-slate-800 font-bold text-xs sm:text-[13px] leading-tight mt-0.5">
                  Company-Fit
                </span>
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
