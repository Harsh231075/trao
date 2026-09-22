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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[28px] max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10 cursor-pointer"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ─── STAGE 1: FORM INPUT ─── */}
        {!createdKitId && (
          <>
            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-inner">
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
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400"
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
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
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
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all text-slate-800 placeholder:text-slate-400"
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
                      Build Interview Kit
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}

        {/* ─── STAGE 2: LIVE GENERATION STEPPER ─── */}
        {isPipelineActive && (
          <div className="py-2 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 animate-pulse">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    Live Pipeline Active
                  </span>
                  <span className="text-xs text-slate-400">Auto-updating every 2s</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 truncate mt-0.5">
                  Generating Kit for {extractDomain(website)}
                </h3>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1.5">
                <span>Pipeline Stage {Math.min(currentStageIndex + 1, 5)} of 5</span>
                <span className="text-blue-600 font-bold">{Math.round(((currentStageIndex + 0.5) / 5) * 100)}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${Math.min(100, Math.round(((currentStageIndex + 0.5) / 5) * 100))}%` }}
                />
              </div>
            </div>

            {/* Stepper List */}
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70 space-y-3">
              {PIPELINE_STAGES.map((stage, idx) => {
                const Icon = stage.icon;
                const isPassed = currentStageIndex > idx;
                const isCurrent = currentStageIndex === idx;

                return (
                  <div
                    key={stage.key}
                    className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                      isCurrent
                        ? "bg-white border border-blue-200 shadow-xs"
                        : isPassed
                          ? "opacity-90"
                          : "opacity-40"
                    }`}
                  >
                    {/* Status Circle */}
                    <div className="mt-0.5 shrink-0">
                      {isPassed ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs animate-pulse">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </div>
                      )}
                    </div>

                    {/* Step Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-xs font-bold ${isCurrent ? "text-blue-700" : isPassed ? "text-slate-800" : "text-slate-500"}`}>
                          {stage.title}
                        </p>
                        {isCurrent && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 bg-blue-50 text-blue-600 rounded-md border border-blue-200 animate-pulse">
                            IN PROGRESS
                          </span>
                        )}
                        {isPassed && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 bg-emerald-50 text-emerald-600 rounded-md">
                            DONE
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-1 gap-3">
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
                <span>Generating questions and schedule...</span>
              </p>
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  router.push("/");
                }}
                className="px-4 py-2 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
              >
                Run in Background →
              </button>
            </div>
          </div>
        )}

        {/* ─── STAGE 3: CELEBRATION / READY ─── */}
        {isCompleted && (
          <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 inline-block mb-2">
                ✨ Generation Complete!
              </span>
              <h3 className="text-2xl font-bold text-slate-900">Your Interview Kit is Ready</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-sm">
                Tailored interview questions, confidence-rated flashcards, and a day-by-day study schedule have been prepared.
              </p>
            </div>

            {/* Summary Metrics */}
            {kitDetails?.kit_data && (
              <div className="grid grid-cols-3 gap-2 w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-3 text-center my-2">
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

            {/* CTAs */}
            <div className="flex items-center gap-3 w-full pt-2">
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  router.push("/");
                }}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-all cursor-pointer"
              >
                Go to Dashboard
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
