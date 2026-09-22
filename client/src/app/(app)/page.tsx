"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import CreateKitModal from "@/components/CreateKitModal";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
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
  ArrowUpRight,
  Loader2,
  RefreshCw,
} from "lucide-react";

function mapStatus(backendStatus: string): "In Progress" | "Ready" | "Complete" | "Failed" {
  switch (backendStatus) {
    case "completed": return "Complete";
    case "partial": return "Ready";
    case "failed": return "Failed";
    default: return "In Progress"; // queued, researching, extracting, generating, checking_coverage, building_schedule
  }
}

function getAvatarBg(index: number): string {
  const colors = [
    "bg-red-500 text-white",
    "bg-emerald-600 text-white",
    "bg-indigo-600 text-white",
    "bg-blue-600 text-white",
    "bg-slate-800 text-white",
    "bg-violet-600 text-white",
    "bg-amber-500 text-white",
    "bg-teal-600 text-white",
  ];
  return colors[index % colors.length];
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [kits, setKits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchKits = useCallback(async () => {
    try {
      const data = await api.get("/kits");
      setKits(data.kits || []);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKits();
  }, [fetchKits]);

  // Poll for in-progress kits
  useEffect(() => {
    const hasInProgress = kits.some(k =>
      ["queued", "researching", "extracting", "generating", "checking_coverage", "building_schedule"].includes(k.status)
    );
    if (!hasInProgress) return;

    const interval = setInterval(fetchKits, 8000);
    return () => clearInterval(interval);
  }, [kits, fetchKits]);

  const handleKitCreated = () => {
    fetchKits();
  };

  // Computed stats
  const totalQuestions = kits.reduce((sum, k) => sum + (k._computed?.total_questions || 0), 0);
  const totalFlashcards = kits.reduce((sum, k) => sum + (k._computed?.total_flashcards || 0), 0);
  const coverageGaps = kits.reduce((sum, k) => {
    const must = k._computed?.total_must || 0;
    const cov = k._computed?.coverage_percentage || 100;
    return sum + Math.max(0, must - Math.round((cov / 100) * must));
  }, 0);
  const activeKits = kits.length;

  // Greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div suppressHydrationWarning className="space-y-3 sm:space-y-3.5">
      {/* Top Universal Header */}
      <Header onOpenCreateKit={() => setIsModalOpen(true)} />

      {/* Greeting & Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
            {greeting}, {firstName} 👋
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
            onClick={fetchKits}
            className="p-2.5 rounded-full border border-slate-200/90 bg-white/90 text-slate-600 hover:bg-slate-50 transition-colors shadow-2xs"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
        {/* Card 1: Questions Practiced */}
        <div className="bg-white/95 backdrop-blur-sm p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-[#d8e8fe] shadow-2xs hover:shadow-xs transition-all relative overflow-hidden group min-h-[114px] sm:min-h-[122px] flex flex-col justify-between">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-none">
              {String(totalQuestions).padStart(2, "0")}
            </h3>
          </div>
          <div>
            <p className="text-xs font-semibold text-blue-600">Questions Generated</p>
            <div className="flex items-end gap-1.5 h-3.5 mt-2">
              <span className="w-2 h-2 bg-blue-200 rounded-xs" />
              <span className="w-2 h-2.5 bg-blue-300 rounded-xs" />
              <span className="w-2 h-3 bg-blue-400 rounded-xs" />
              <span className="w-2 h-3.5 bg-blue-500 rounded-xs" />
              <span className="w-2 h-4 bg-blue-600 rounded-xs" />
            </div>
          </div>
        </div>

        {/* Card 2: Coverage Gaps */}
        <div className="bg-white/95 backdrop-blur-sm p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-[#d8e8fe] shadow-2xs hover:shadow-xs transition-all relative overflow-hidden group min-h-[114px] sm:min-h-[122px] flex flex-col justify-between">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-none">
              {String(coverageGaps).padStart(2, "0")}
            </h3>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-700">Coverage Gaps</p>
            <p className="text-[11px] sm:text-xs font-medium text-rose-500 mt-1.5">
              {coverageGaps > 0 ? "Second pass queued" : "All requirements covered"}
            </p>
          </div>
        </div>

        {/* Card 3: Flashcards Due */}
        <div className="bg-[#eefc57] text-slate-900 p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xs hover:shadow-xs transition-all relative overflow-hidden group border-0 min-h-[114px] sm:min-h-[122px] flex flex-col justify-between">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight leading-none">
              {String(totalFlashcards).padStart(2, "0")}
            </h3>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-900">Flashcards Total</p>
            <p className="text-[11px] sm:text-xs font-medium text-slate-800/80 mt-1.5">
              Across all kits
            </p>
          </div>
        </div>

        {/* Card 4: Active Prep Kits */}
        <div className="bg-[#2563eb] text-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xs hover:shadow-xs transition-all relative overflow-hidden group border-0 min-h-[114px] sm:min-h-[122px] flex flex-col justify-between">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">
              {String(activeKits).padStart(2, "0")}
            </h3>
          </div>
          <div>
            <p className="text-xs font-semibold text-blue-100">Active Prep Kits</p>
            <p className="text-[11px] sm:text-xs font-medium text-blue-200 mt-1.5">
              AI Pipeline ready
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch">
        {/* Left 8 Cols */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-3 h-full">
          {/* Active Interview Kits Queue */}
          <div className="bg-[#dce9fd] border border-[#bfdbfe]/80 rounded-2xl sm:rounded-3xl p-4 sm:p-4.5 shadow-2xs flex-1 flex flex-col gap-2">
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

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-12 text-sm text-red-500">
                {error}
              </div>
            ) : kits.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-slate-600">No interview kits yet</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-full transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 inline mr-1" /> Create Your First Kit
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto scrollbar-thin -mx-1 px-1">
                <div className="min-w-[880px] flex flex-col gap-1">
                  {/* Column Headers */}
                  <div className="grid grid-cols-[200px_110px_minmax(180px,1fr)_100px_122px_56px] gap-3 items-center px-5 sm:px-6 pb-2 text-[10px] sm:text-[11px] font-extrabold text-blue-600 tracking-wider uppercase shrink-0">
                    <div>COMPANY &amp; ROLE</div>
                    <div>TIMELINE</div>
                    <div>FOCUS &amp; REQUIREMENTS</div>
                    <div>COVERAGE</div>
                    <div className="text-center">STATUS</div>
                    <div className="text-right">ACTION</div>
                  </div>

                  {/* Rows */}
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xs divide-y divide-slate-100 overflow-hidden border border-white/80 my-1">
                    {kits.slice(0, 5).map((kit, index) => {
                      const status = mapStatus(kit.status);
                      const roleTitle = kit._computed?.role_title || "Processing...";
                      const companyName = kit._computed?.company_name || extractDomain(kit.company_url);
                      const mustCount = kit._computed?.total_must || 0;
                      const coverage = kit._computed?.coverage_percentage ?? 0;
                      const daysLeft = kit.days_available || 0;

                      return (
                        <div
                          key={kit._id}
                          className="grid grid-cols-[200px_110px_minmax(180px,1fr)_100px_122px_56px] gap-3 items-center px-5 sm:px-6 h-[74px] hover:bg-slate-50/70 transition-colors text-xs cursor-pointer"
                          onClick={() => router.push(`/kits/${kit._id}`)}
                        >
                          {/* Company & Role */}
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${getAvatarBg(index)} flex items-center justify-center font-black text-xs sm:text-sm text-white shadow-xs shrink-0 ring-2 ring-white`}
                            >
                              {companyName.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0 flex flex-col justify-center">
                              <p className="font-bold text-slate-900 truncate leading-tight text-xs sm:text-sm">
                                {companyName}
                              </p>
                              <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">
                                {roleTitle}
                              </p>
                            </div>
                          </div>

                          {/* Timeline */}
                          <div className="flex flex-col justify-center min-w-0 text-xs">
                            <p className="font-bold text-slate-900 text-xs sm:text-sm leading-tight truncate">
                              {daysLeft} Days
                            </p>
                            <p className="text-[10px] sm:text-[11px] text-slate-400 font-normal mt-0.5 truncate">
                              Prep window
                            </p>
                          </div>

                          {/* Focus & Requirements */}
                          <div className="min-w-0 pr-2">
                            <p className="font-medium text-slate-700 text-xs sm:text-[13px] truncate">
                              {mustCount} MUST requirements • {kit._computed?.total_questions || 0} questions
                            </p>
                          </div>

                          {/* Coverage */}
                          <div className="flex flex-col justify-center space-y-1 text-xs min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 font-semibold w-7 text-[10px] sm:text-[11px] shrink-0">REQ</span>
                              <span className={`font-bold text-xs ${coverage < 80 ? "text-rose-500" : coverage < 100 ? "text-blue-600" : "text-emerald-600"}`}>
                                {mustCount} Must
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 font-semibold w-7 text-[10px] sm:text-[11px] shrink-0">COV</span>
                              <span className={`font-bold text-xs ${coverage < 80 ? "text-rose-500" : coverage < 100 ? "text-blue-600" : "text-emerald-600"}`}>
                                {coverage}%
                              </span>
                            </div>
                          </div>

                          {/* Status */}
                          <div className="flex items-center justify-center">
                            <span
                              className={`w-[110px] h-7 inline-flex items-center justify-center gap-1.5 rounded-full text-[11px] font-semibold shadow-2xs shrink-0 ${
                                status === "In Progress"
                                  ? "bg-[#fee2e2]/80 text-[#dc2626] border border-[#fecaca]/70"
                                  : status === "Ready"
                                    ? "bg-[#e0f2fe]/80 text-[#0284c7] border border-[#bae6fd]/70"
                                    : status === "Complete"
                                      ? "bg-[#dcfce7]/80 text-[#16a34a] border border-[#bbf7d0]/70"
                                      : "bg-red-100/80 text-red-600 border border-red-200/70"
                              }`}
                            >
                              {status === "In Progress" ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                              ) : (
                                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.2] shrink-0" />
                              )}
                              <span className="truncate">{status}</span>
                            </span>
                          </div>

                          {/* Action */}
                          <div className="flex items-center justify-end">
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); router.push(`/kits/${kit._id}`); }}
                              className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all shadow-2xs shrink-0"
                              title="View Kit"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AI Summary Banner */}
          <div className="w-full bg-gradient-to-r from-[#3575f6] via-[#5d98fa] to-[#9bc4fc] text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-full shadow-[0_4px_16px_rgba(53,117,246,0.18)] border border-white/40 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center gap-2 shrink-0">
                <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#facc15] fill-[#facc15] stroke-[1.5] shrink-0" />
                <span className="text-[#facc15] font-bold text-xs sm:text-sm tracking-tight whitespace-nowrap">
                  AI Summary
                </span>
              </div>
              <div className="h-6 w-px bg-white/40 shrink-0" />
              <p className="text-white text-xs sm:text-[13px] font-medium leading-snug truncate">
                {kits.length > 0
                  ? `${activeKits} active kit${activeKits !== 1 ? "s" : ""} • ${totalQuestions} questions generated • ${totalFlashcards} flashcards ready`
                  : "Create your first interview kit to get AI-generated preparation content."}
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2 sm:py-2.5 bg-[#1849be] hover:bg-[#133d9f] text-white font-semibold text-xs sm:text-[13px] rounded-full flex items-center justify-center gap-1.5 transition-all shadow-xs shrink-0 hover:scale-102 active:scale-98 cursor-pointer"
            >
              <span>{kits.length > 0 ? "Review AI Insights" : "Create Kit"}</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Right 4 Cols */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3 h-full">
          {/* Quick Actions Card */}
          <div className="bg-[#dce9fd] border border-[#bfdbfe]/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-2xs space-y-2 shrink-0">
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight px-1 mb-1.5">
              Quick Actions
            </h3>
            <div className="space-y-1.5 sm:space-y-2">
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
                      {totalFlashcards} cards • Confidence-weighted
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </Link>

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

          {/* Requirement Coverage Distribution */}
          <div className="bg-[#dce9fd] border border-[#bfdbfe]/80 rounded-2xl sm:rounded-3xl p-4 sm:p-4.5 shadow-2xs flex-1 flex flex-col justify-between min-h-[250px] sm:min-h-[280px]">
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight px-1 mb-1 shrink-0">
              Requirement Coverage Distribution
            </h3>
            <div className="relative w-full max-w-[330px] sm:max-w-[360px] mx-auto flex items-center justify-center my-auto py-1 sm:py-2">
              <svg
                className="w-full h-auto min-h-[175px] sm:min-h-[195px] max-h-[215px]"
                viewBox="0 0 260 160"
                fill="none"
              >
                <path d="M 195.5 90.0 A 66 66 0 0 1 188.8 128.0" stroke="#eefc57" strokeWidth="19" strokeLinecap="round" />
                <path d="M 79.4 140.4 A 66 66 0 1 1 195.5 90.0" stroke="#2f70f5" strokeWidth="19" strokeLinecap="round" />
                <path d="M 188.8 128.0 A 66 66 0 0 1 179.0 142.2" stroke="#0f172a" strokeWidth="19" strokeLinecap="round" />
                <circle cx="66.2" cy="80.9" r="3.8" fill="#22d3ee" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="189.8" cy="125.9" r="3" fill="#a3e635" stroke="#ffffff" strokeWidth="1.2" />
                <circle cx="180" cy="132" r="2.5" fill="#94a3b8" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none pb-1">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 leading-none tracking-tight">
                  {totalQuestions}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-700 mt-1">
                  Questions
                </span>
              </div>
              <div className="absolute left-0.5 sm:left-1 top-[44%] -translate-y-1/2 text-left pointer-events-none">
                <span className="block text-[#2f70f5] font-black text-base sm:text-lg lg:text-xl leading-tight">82%</span>
                <span className="block text-slate-800 font-bold text-xs sm:text-[13px] leading-tight mt-0.5">Technical</span>
              </div>
              <div className="absolute right-0.5 sm:right-1 top-[16%] -translate-y-1/2 text-left pointer-events-none">
                <span className="block text-[#2f70f5] font-black text-base sm:text-lg lg:text-xl leading-tight">13%</span>
                <span className="block text-slate-800 font-bold text-xs sm:text-[13px] leading-tight mt-0.5">Behavioural</span>
              </div>
              <div className="absolute right-0.5 sm:right-1 bottom-[8%] translate-y-0 text-left pointer-events-none">
                <span className="block text-[#ef4444] font-black text-base sm:text-lg lg:text-xl leading-tight">5%</span>
                <span className="block text-slate-800 font-bold text-xs sm:text-[13px] leading-tight mt-0.5">Company-Fit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <CreateKitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={handleKitCreated}
      />
    </div>
  );
}
