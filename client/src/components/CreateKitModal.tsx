"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Sparkles,
  Globe,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Loader2,
  ArrowRight,
  Check,
  Search,
  FileText,
  Lightbulb,
  ShieldCheck,
  CalendarDays,
  ExternalLink,
} from "lucide-react";
import api from "@/lib/api";

interface CreateKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (kit: any) => void;
}

const PIPELINE_STAGES = [
  {
    key: "researching",
    title: "1. Researching Company",
    desc: "Analyzing company website & public interview insights",
    icon: Search,
  },
  {
    key: "extracting",
    title: "2. Extracting Requirements",
    desc: "Extracting MUST and NICE requirements from the JD",
    icon: FileText,
  },
  {
    key: "generating",
    title: "3. Generating Questions & Flashcards",
    desc: "Creating technical, behavioural, and system design questions",
    icon: Lightbulb,
  },
  {
    key: "checking_coverage",
    title: "4. Coverage Verification & Gaps",
    desc: "Verifying 100% requirement coverage across questions",
    icon: ShieldCheck,
  },
  {
    key: "building_schedule",
    title: "5. Building Study Schedule",
    desc: "Allocating day-by-day practice timeline & study targets",
    icon: CalendarDays,
  },
];

function getStageIndex(status: string) {
  switch (status) {
    case "queued": return 0;
    case "researching": return 0;
    case "extracting": return 1;
    case "generating": return 2;
    case "checking_coverage": return 3;
    case "building_schedule": return 4;
    case "completed":
    case "partial": return 5;
    default: return 0;
  }
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export default function CreateKitModal({ isOpen, onClose, onCreated }: CreateKitModalProps) {
  const router = useRouter();
  const [website, setWebsite] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [daysUntil, setDaysUntil] = useState("7");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Pipeline tracking state
  const [createdKitId, setCreatedKitId] = useState<string | null>(null);
  const [kitStatus, setKitStatus] = useState<string>("idle");
  const [kitDetails, setKitDetails] = useState<any>(null);

  const resetForm = () => {
    setWebsite("");
    setJobDescription("");
    setDaysUntil("7");
    setError("");
    setIsSubmitting(false);
    setCreatedKitId(null);
    setKitStatus("idle");
    setKitDetails(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Poll for pipeline progress when kit is created
  useEffect(() => {
    if (!createdKitId || !isOpen) return;
    if (kitStatus === "completed" || kitStatus === "partial" || kitStatus === "failed") return;

    const interval = setInterval(async () => {
      try {
        const data = await api.get(`/kits/${createdKitId}`);
        if (data.kit) {
          setKitStatus(data.kit.status);
          setKitDetails(data.kit);

          if (data.kit.status === "completed" || data.kit.status === "partial") {
            if (onCreated) onCreated(data.kit);
          }
        }
      } catch (err) {
        console.error("Failed to poll kit status:", err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [createdKitId, kitStatus, isOpen, onCreated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!jobDescription.trim()) {
      setError("Job description is required");
      return;
    }
    if (!website.trim()) {
      setError("Company website URL is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await api.post("/kits", {
        job_description: jobDescription.trim(),
        company_url: website.trim(),
        days_available: parseInt(daysUntil, 10) || 7,
      });

      setCreatedKitId(data.id);
      setKitStatus(data.status || "queued");

      if (onCreated) {
        onCreated({ _id: data.id, status: data.status, company_url: website.trim(), days_available: parseInt(daysUntil, 10) || 7 });
      }
    } catch (err: any) {
      setError(err.message || "Failed to create kit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const currentStageIndex = getStageIndex(kitStatus);
  const isPipelineActive = createdKitId && ["queued", "researching", "extracting", "generating", "checking_coverage", "building_schedule"].includes(kitStatus);
  const isCompleted = kitStatus === "completed" || kitStatus === "partial";

  const stageTitles = [
    "Stage 1: Researching Company & Industry",
    "Stage 2: Extracting Role Requirements",
    "Stage 3: Generating Questions & Flashcards",
    "Stage 4: Checking Requirement Coverage",
    "Stage 5: Building Day-by-Day Schedule",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-white/95 via-slate-50/90 to-blue-50/40 backdrop-blur-2xl rounded-[28px] max-w-xl w-full p-6 sm:p-8 shadow-[0_25px_80px_rgba(15,23,42,0.35)] border border-white/90 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10 cursor-pointer"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ─── SCREEN 0: FORM INPUT ─── */}
        {!createdKitId && (
          <>
            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50/90 text-blue-600 flex items-center justify-center font-bold shadow-inner border border-blue-100">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Create Interview Kit</h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  AI will analyze the JD, research the company, and generate your tailored prep kit.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* Company Website */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Company Website / Careers URL
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://company.com"
                    required
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Days Left Countdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Days Available to Prepare
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={daysUntil}
                    onChange={(e) => setDaysUntil(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
                  />
                </div>
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Paste Job Description
                </label>
                <div className="relative">
                  <textarea
                    rows={5}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the full job description including requirements, responsibilities, tech stack..."
                    required
                    className="w-full px-3.5 py-2.5 text-sm bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all text-slate-800 placeholder:text-slate-400"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  The AI pipeline executes 5 stages: Research → Extraction → Generation → Coverage Audit → Scheduling.
                </p>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Starting Pipeline...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Build Prep Kit
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}

        {/* ─── IN-MODAL SCREEN-BY-SCREEN PIPELINE STAGES (SCREENS 1 TO 5) ─── */}
        {isPipelineActive && (
          <div className="py-2 space-y-5 animate-in fade-in duration-300">
            {/* Top Stage Tracker Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 border border-blue-200">
                  {stageTitles[currentStageIndex] || "Processing Stage"}
                </span>
                <span className="text-xs font-extrabold text-blue-600">
                  {Math.min(currentStageIndex + 1, 5)} / 5 ({Math.round(((currentStageIndex + 1) / 5) * 100)}%)
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${Math.min(100, Math.round(((currentStageIndex + 1) / 5) * 100))}%` }}
                />
              </div>

              {/* 5 Step Indicator Pills */}
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                {PIPELINE_STAGES.map((s, idx) => {
                  const isPassed = currentStageIndex > idx;
                  const isCurrent = currentStageIndex === idx;
                  return (
                    <div
                      key={s.key}
                      className={`h-1.5 rounded-full transition-all ${
                        isPassed ? "bg-emerald-500" : isCurrent ? "bg-blue-600 animate-pulse" : "bg-slate-200"
                      }`}
                      title={s.title}
                    />
                  );
                })}
              </div>
            </div>

            {/* ── SCREEN 1: RESEARCHING ── */}
            {currentStageIndex === 0 && (
              <div className="bg-gradient-to-br from-blue-50/80 via-sky-50/60 to-blue-100/40 backdrop-blur-md rounded-2xl border border-blue-200/80 p-6 space-y-4 text-center">
                <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-500/30">
                    <Search className="w-7 h-7" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">🔍 Researching Company &amp; Industry</h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                    Analyzing company domain <strong className="text-blue-700">{extractDomain(website)}</strong>, tech stack, and public engineering interview insights.
                  </p>
                </div>
                <div className="bg-white/80 rounded-xl p-3 border border-blue-100 text-left space-y-2 text-xs font-medium text-slate-700 shadow-2xs">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Domain validation &amp; structure verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 animate-pulse">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                    <span>Scraping engineering blog &amp; career signals...</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <div className="w-4 h-4 rounded-full border border-slate-300" />
                    <span>Compiling company research context bundle...</span>
                  </div>
                </div>
              </div>
            )}

            {/* ── SCREEN 2: EXTRACTING ── */}
            {currentStageIndex === 1 && (
              <div className="bg-gradient-to-br from-blue-50/80 via-sky-50/60 to-blue-100/40 backdrop-blur-md rounded-2xl border border-blue-200/80 p-6 space-y-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-500/30 mx-auto animate-pulse">
                  <FileText className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">📋 Extracting Role Requirements</h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                    Parsing your Job Description to extract MUST-have and NICE-to-have engineering qualifications.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-left">
                  <div className="bg-red-50/80 border border-red-200 rounded-xl p-3 space-y-1">
                    <span className="font-bold text-red-700 text-[10px] uppercase">MUST HAVE SKILLS</span>
                    <p className="text-slate-800 font-semibold truncate">Parsing Core Stack...</p>
                  </div>
                  <div className="bg-slate-100/80 border border-slate-200 rounded-xl p-3 space-y-1">
                    <span className="font-bold text-slate-600 text-[10px] uppercase">NICE TO HAVE</span>
                    <p className="text-slate-700 font-semibold truncate">Extracting Bonus Tools...</p>
                  </div>
                </div>
              </div>
            )}

            {/* ── SCREEN 3: GENERATING ── */}
            {currentStageIndex === 2 && (
              <div className="bg-gradient-to-br from-blue-50/80 via-sky-50/60 to-blue-100/40 backdrop-blur-md rounded-2xl border border-blue-200/80 p-6 space-y-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-violet-600 text-white flex items-center justify-center font-bold shadow-lg shadow-violet-500/30 mx-auto animate-pulse">
                  <Lightbulb className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">💡 Generating Questions &amp; Flashcards</h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                    Synthesizing company-tailored Technical, System Design, and Behavioural questions with answer outlines.
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-2 text-[10px] font-bold text-slate-700">
                  <div className="bg-white/80 p-2 rounded-xl border border-blue-100 animate-pulse text-blue-700">Technical Qs</div>
                  <div className="bg-white/80 p-2 rounded-xl border border-blue-100 animate-pulse text-indigo-700">System Design</div>
                  <div className="bg-white/80 p-2 rounded-xl border border-blue-100 animate-pulse text-purple-700">Behavioural</div>
                  <div className="bg-white/80 p-2 rounded-xl border border-blue-100 animate-pulse text-amber-700">Flashcards</div>
                </div>
              </div>
            )}

            {/* ── SCREEN 4: CHECKING COVERAGE ── */}
            {currentStageIndex === 3 && (
              <div className="bg-gradient-to-br from-blue-50/80 via-sky-50/60 to-blue-100/40 backdrop-blur-md rounded-2xl border border-blue-200/80 p-6 space-y-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-500/30 mx-auto animate-pulse">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">🎯 Verifying Requirement Coverage</h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                    Audit engine cross-referencing generated questions against parsed MUST requirements.
                  </p>
                </div>
                <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 text-xs font-semibold text-emerald-800">
                  Pass 1: Checking MUST requirements mapping... (100% coverage target)
                </div>
              </div>
            )}

            {/* ── SCREEN 5: BUILDING SCHEDULE ── */}
            {currentStageIndex === 4 && (
              <div className="bg-gradient-to-br from-blue-50/80 via-sky-50/60 to-blue-100/40 backdrop-blur-md rounded-2xl border border-blue-200/80 p-6 space-y-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-500/30 mx-auto animate-pulse">
                  <CalendarDays className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">📅 Building Day-by-Day Schedule</h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                    Allocating practice topics and questions across your {daysUntil}-day preparation window.
                  </p>
                </div>
                <div className="bg-white/80 border border-blue-100 rounded-xl p-3 text-xs font-medium text-slate-700">
                  Structuring daily minutes and spaced repetition flashcard review targets...
                </div>
              </div>
            )}

            {/* In-Modal Footer Action */}
            <div className="flex items-center justify-between pt-1">
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                <span>Processing pipeline live...</span>
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Run in Background
              </button>
            </div>
          </div>
        )}

        {/* ─── SCREEN 6: CELEBRATION / COMPLETED SCREEN ─── */}
        {isCompleted && (
          <div className="py-6 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 inline-block mb-2">
                ✨ Generation Complete!
              </span>
              <h3 className="text-2xl font-bold text-slate-900">Your Interview Kit is Ready</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-sm">
                All 5 stages completed inside modal! Tailored questions, flashcards, and schedule are ready.
              </p>
            </div>

            {/* Summary Metrics */}
            {kitDetails?.kit_data && (
              <div className="grid grid-cols-3 gap-2 w-full bg-white/80 border border-slate-200/80 rounded-2xl p-3 text-center my-2 shadow-2xs">
                <div>
                  <p className="text-xl font-extrabold text-blue-600">
                    {Object.values(kitDetails.kit_data.questions || {}).reduce((s: number, a: any) => s + (Array.isArray(a) ? a.length : 0), 0)}
                  </p>
                  <p className="text-[10px] font-semibold text-slate-500">Questions</p>
                </div>
                <div>
                  <p className="text-xl font-extrabold text-emerald-600">
                    {(kitDetails.kit_data.flashcards || []).length}
                  </p>
                  <p className="text-[10px] font-semibold text-slate-500">Flashcards</p>
                </div>
                <div>
                  <p className="text-xl font-extrabold text-indigo-600">
                    {kitDetails.days_available || 7} Days
                  </p>
                  <p className="text-[10px] font-semibold text-slate-500">Schedule</p>
                </div>
              </div>
            )}

            {/* Final CTAs */}
            <div className="flex items-center gap-3 w-full pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-all cursor-pointer"
              >
                Close Modal
              </button>
              <button
                type="button"
                onClick={() => {
                  const id = createdKitId;
                  handleClose();
                  router.push(`/kits/${id}`);
                }}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Open Prep Kit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
