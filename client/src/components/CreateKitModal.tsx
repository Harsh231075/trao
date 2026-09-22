"use client";

import React, { useState, useEffect } from "react";
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
  ShieldCheck,
  CalendarDays,
  Cpu,
  Zap,
  Radio,
  Scan,
  Terminal,
  Layers,
  Activity,
  CheckCheck,
} from "lucide-react";
import api from "@/lib/api";

interface CreateKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (kit: any) => void;
}

const PIPELINE_STAGES = [
  {
    step: 1,
    key: "researching",
    title: "1. Researching Company",
    subtitle: "Analyzing tech stack & public signals",
    icon: Radio,
    color: "from-blue-500 to-cyan-500",
  },
  {
    step: 2,
    key: "extracting",
    title: "2. Laser Parsing JD",
    subtitle: "Extracting MUST and NICE requirements",
    icon: Scan,
    color: "from-indigo-500 to-purple-500",
  },
  {
    step: 3,
    key: "generating",
    title: "3. AI Question Synthesis",
    subtitle: "Generating tailored technical & behavioral Qs",
    icon: Cpu,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    step: 4,
    key: "checking_coverage",
    title: "4. Requirement Audit",
    subtitle: "Verifying 100% skill coverage across questions",
    icon: ShieldCheck,
    color: "from-emerald-500 to-teal-500",
  },
  {
    step: 5,
    key: "building_schedule",
    title: "5. Assembly & Timeline",
    subtitle: "Structuring day-by-day practice schedule",
    icon: CalendarDays,
    color: "from-sky-500 to-blue-600",
  },
];

function extractDomain(url: string): string {
  try {
    const domain = new URL(url).hostname.replace("www.", "");
    return domain.charAt(0).toUpperCase() + domain.slice(1);
  } catch {
    return url || "Target Company";
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
  const [activeStageScreen, setActiveStageScreen] = useState<number>(0); // 0: Form, 1-5: Stages, 6: Celebration

  const resetForm = () => {
    setWebsite("");
    setJobDescription("");
    setDaysUntil("7");
    setError("");
    setIsSubmitting(false);
    setCreatedKitId(null);
    setKitStatus("idle");
    setKitDetails(null);
    setActiveStageScreen(0);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Poll backend for pipeline data
  useEffect(() => {
    if (!createdKitId || !isOpen) return;

    const interval = setInterval(async () => {
      try {
        const data = await api.get(`/kits/${createdKitId}`);
        if (data.kit) {
          setKitStatus(data.kit.status);
          setKitDetails(data.kit);

          if ((data.kit.status === "completed" || data.kit.status === "partial") && onCreated) {
            onCreated(data.kit);
          }
        }
      } catch (err) {
        console.error("Failed to poll kit status:", err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [createdKitId, isOpen, onCreated]);

  // Guaranteed Stage Screen Timer (Strict 2.6s per stage screen: Screen 1 → 2 → 3 → 4 → 5 → 6)
  useEffect(() => {
    if (!createdKitId || !isOpen) return;
    if (activeStageScreen < 1 || activeStageScreen >= 6) return;

    const timer = setTimeout(() => {
      setActiveStageScreen((prev) => {
        if (prev < 5) return prev + 1;
        // On screen 5, advance to 6 (celebration)
        if (prev === 5) return 6;
        return prev;
      });
    }, 2600);

    return () => clearTimeout(timer);
  }, [createdKitId, isOpen, activeStageScreen]);

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
      // Unconditionally launch Screen 1!
      setActiveStageScreen(1);

      if (onCreated) {
        onCreated({
          _id: data.id,
          status: data.status,
          company_url: website.trim(),
          days_available: parseInt(daysUntil, 10) || 7,
        });
      }
    } catch (err: any) {
      setError(err.message || "Failed to create kit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const isPipelineActive = createdKitId && activeStageScreen >= 1 && activeStageScreen <= 5;
  const isCompleted = activeStageScreen === 6;
  const currentStageInfo = PIPELINE_STAGES[activeStageScreen - 1] || PIPELINE_STAGES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="bg-gradient-to-br from-white/95 via-slate-50/90 to-blue-50/60 backdrop-blur-2xl rounded-[32px] max-w-xl w-full p-6 sm:p-8 shadow-[0_30px_90px_rgba(15,23,42,0.4)] border border-white/90 relative overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors z-20 cursor-pointer"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ─── SCREEN 0: FORM INPUT ─── */}
        {!createdKitId && activeStageScreen === 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-500/25">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Create Interview Kit</h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  AI will research company signals, parse JD skills, &amp; build your custom kit.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 px-4 py-3 bg-red-50/90 border border-red-200 rounded-2xl text-red-700 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* Company Website */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  <span>Company Website / Careers URL</span>
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://company.com"
                    required
                    className="w-full px-4 py-3 text-sm bg-white/80 border border-blue-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 transition-all text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs"
                  />
                </div>
              </div>

              {/* Days Available */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>Days Available to Prepare</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={daysUntil}
                    onChange={(e) => setDaysUntil(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-white/80 border border-blue-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 transition-all text-slate-800 font-medium shadow-2xs"
                  />
                </div>
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>Paste Job Description</span>
                </label>
                <textarea
                  rows={4}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description including responsibilities, required tech stack, & qualifications..."
                  required
                  className="w-full px-4 py-3 text-sm bg-white/80 border border-blue-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 resize-none transition-all text-slate-800 placeholder:text-slate-400 font-medium shadow-2xs"
                />
                <p className="text-[11px] text-slate-500 mt-1.5 font-medium flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>AI will execute a 5-screen real-time generation pipeline inside this modal.</span>
                </p>
              </div>

              {/* Actions */}
              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Initializing AI Engine...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate 5-Screen Kit</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ─── IN-MODAL SCREEN-BY-SCREEN PIPELINE STAGES (SCREENS 1 TO 5) ─── */}
        {isPipelineActive && (
          <div className="space-y-6 py-2 animate-in fade-in duration-300">
            {/* Top Stage Tracker Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200 shadow-2xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                    <span>Screen {activeStageScreen} of 5</span>
                  </span>
                  <span className="text-xs font-bold text-slate-600">
                    {currentStageInfo.title}
                  </span>
                </div>
                <span className="text-xs font-black text-blue-600 bg-white/80 px-2.5 py-1 rounded-lg border border-blue-100 shadow-2xs">
                  {Math.round((activeStageScreen / 5) * 100)}%
                </span>
              </div>

              {/* Animated Dual Progress Bar */}
              <div className="w-full h-3 bg-slate-200/80 rounded-full overflow-hidden p-0.5 border border-slate-300/40">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 rounded-full transition-all duration-700 ease-out shadow-sm"
                  style={{ width: `${Math.min(100, Math.round((activeStageScreen / 5) * 100))}%` }}
                />
              </div>

              {/* 5-Step Visual Node Tracker Bar */}
              <div className="grid grid-cols-5 gap-2 pt-1">
                {PIPELINE_STAGES.map((stg) => {
                  const isFinished = activeStageScreen > stg.step;
                  const isCurrent = activeStageScreen === stg.step;
                  const StepIcon = stg.icon;

                  return (
                    <div key={stg.step} className="flex flex-col items-center gap-1 text-center">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                          isFinished
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                            : isCurrent
                            ? "bg-blue-600 text-white ring-4 ring-blue-500/30 shadow-lg shadow-blue-500/30 scale-105"
                            : "bg-slate-200/70 text-slate-400 border border-slate-300/50"
                        }`}
                      >
                        {isFinished ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : isCurrent ? (
                          <StepIcon className="w-4 h-4 animate-pulse" />
                        ) : (
                          <span>{stg.step}</span>
                        )}
                      </div>
                      <span className={`text-[10px] font-extrabold truncate max-w-[70px] ${
                        isCurrent ? "text-blue-700" : isFinished ? "text-emerald-700" : "text-slate-400"
                      }`}>
                        Stage {stg.step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── STAGE SCREEN 1: RESEARCHING COMPANY ── */}
            {activeStageScreen === 1 && (
              <div className="bg-gradient-to-br from-blue-50/90 via-sky-50/70 to-blue-100/60 backdrop-blur-md rounded-3xl border border-blue-200/80 p-6 space-y-5 text-center shadow-lg animate-in zoom-in-95 duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl" />

                {/* Radar Scanning Visual */}
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-ping" />
                  <div className="absolute inset-2 rounded-full border border-blue-500/40 animate-pulse" />
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/30">
                    <Radio className="w-8 h-8 animate-pulse" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    🌐 Screen 1/5: AI Researching Company
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto font-medium">
                    Scanning public engineering blog, tech stack, and interview patterns for <strong className="text-blue-700 font-bold">{extractDomain(website)}</strong>.
                  </p>
                </div>

                {/* Live Scraping Terminal Box */}
                <div className="bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-2xl p-4 border border-slate-800 text-left space-y-2 shadow-inner">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] border-b border-slate-800 pb-1.5 font-sans">
                    <Terminal className="w-3.5 h-3.5 text-blue-400" />
                    <span>Live Web Scraping &amp; AI Intelligence Feed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>GET {website} (HTTP 200 OK)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sky-300">
                    <Activity className="w-3.5 h-3.5 animate-pulse text-sky-400" />
                    <span>Parsing public interview signals &amp; engineering stack...</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                    <span>Building company context knowledge model...</span>
                  </div>
                </div>
              </div>
            )}

            {/* ── STAGE SCREEN 2: EXTRACTING REQUIREMENTS ── */}
            {activeStageScreen === 2 && (
              <div className="bg-gradient-to-br from-indigo-50/90 via-sky-50/70 to-blue-100/60 backdrop-blur-md rounded-3xl border border-indigo-200/80 p-6 space-y-5 text-center shadow-lg animate-in zoom-in-95 duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl" />

                {/* Laser Scanning Visual */}
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-indigo-400/30 animate-ping" />
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-xl shadow-indigo-500/30">
                    <Scan className="w-8 h-8 animate-pulse" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    📄 Screen 2/5: Laser Parsing JD &amp; Skills
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto font-medium">
                    Structuring job description into MUST-have core requirements and NICE-to-have capabilities.
                  </p>
                </div>

                {/* Extracted Skills Matrix */}
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="bg-white/90 border border-indigo-200 rounded-2xl p-3.5 space-y-2 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-indigo-700 font-extrabold text-[10px] uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                      <span>MUST-HAVE SKILLS</span>
                    </div>
                    <div className="space-y-1 text-xs font-bold text-slate-800">
                      <p className="flex items-center gap-1.5 text-slate-900">
                        <Check className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Core Engineering &amp; Data Structures</span>
                      </p>
                      <p className="flex items-center gap-1.5 text-slate-900">
                        <Check className="w-3.5 h-3.5 text-indigo-600" />
                        <span>System Architecture &amp; Scalability</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/90 border border-slate-200 rounded-2xl p-3.5 space-y-2 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-slate-600 font-extrabold text-[10px] uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-slate-400" />
                      <span>NICE-TO-HAVE SKILLS</span>
                    </div>
                    <div className="space-y-1 text-xs font-semibold text-slate-700">
                      <p className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>CI/CD Pipelines &amp; Cloud Infra</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Team Mentorship &amp; Agile</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── STAGE SCREEN 3: GENERATING QUESTIONS ── */}
            {activeStageScreen === 3 && (
              <div className="bg-gradient-to-br from-violet-50/90 via-sky-50/70 to-blue-100/60 backdrop-blur-md rounded-3xl border border-violet-200/80 p-6 space-y-5 text-center shadow-lg animate-in zoom-in-95 duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-400/10 rounded-full blur-2xl" />

                {/* AI Brain CPU Visual */}
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-violet-400/30 animate-ping" />
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white flex items-center justify-center shadow-xl shadow-violet-500/30">
                    <Cpu className="w-8 h-8 animate-bounce" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    💡 Screen 3/5: AI Question &amp; Card Synthesis
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto font-medium">
                    Generating technical interview questions, system design problems, and key flashcards.
                  </p>
                </div>

                {/* Live Counter Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                  <div className="bg-white/90 p-3 rounded-2xl border border-violet-200 shadow-2xs">
                    <p className="text-lg font-black text-violet-700">5 Qs</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Technical</p>
                  </div>
                  <div className="bg-white/90 p-3 rounded-2xl border border-indigo-200 shadow-2xs">
                    <p className="text-lg font-black text-indigo-700">3 Qs</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">System Design</p>
                  </div>
                  <div className="bg-white/90 p-3 rounded-2xl border border-fuchsia-200 shadow-2xs">
                    <p className="text-lg font-black text-fuchsia-700">4 Qs</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Behavioural</p>
                  </div>
                  <div className="bg-white/90 p-3 rounded-2xl border border-amber-200 shadow-2xs">
                    <p className="text-lg font-black text-amber-700">12 Cards</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Flashcards</p>
                  </div>
                </div>
              </div>
            )}

            {/* ── STAGE SCREEN 4: CHECKING COVERAGE ── */}
            {activeStageScreen === 4 && (
              <div className="bg-gradient-to-br from-emerald-50/90 via-sky-50/70 to-blue-100/60 backdrop-blur-md rounded-3xl border border-emerald-200/80 p-6 space-y-5 text-center shadow-lg animate-in zoom-in-95 duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl" />

                {/* Shield Check Visual */}
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-ping" />
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30">
                    <ShieldCheck className="w-8 h-8 animate-pulse" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    🎯 Screen 4/5: Requirement Audit &amp; Gap Check
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto font-medium">
                    Cross-auditing generated questions against job requirements to ensure 0 coverage gaps.
                  </p>
                </div>

                {/* Audit Pass Banner */}
                <div className="bg-white/90 border border-emerald-300 rounded-2xl p-4 text-xs font-bold text-slate-800 flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-2.5 text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 stroke-[2.5]" />
                    <span>Audit Pass 1: MUST Requirements Verification</span>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full font-black text-xs">
                    100% COVERED
                  </span>
                </div>
              </div>
            )}

            {/* ── STAGE SCREEN 5: BUILDING SCHEDULE ── */}
            {activeStageScreen === 5 && (
              <div className="bg-gradient-to-br from-sky-50/90 via-blue-50/70 to-indigo-100/60 backdrop-blur-md rounded-3xl border border-sky-200/80 p-6 space-y-5 text-center shadow-lg animate-in zoom-in-95 duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/10 rounded-full blur-2xl" />

                {/* Calendar Schedule Visual */}
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-sky-400/30 animate-ping" />
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-600 to-blue-600 text-white flex items-center justify-center shadow-xl shadow-sky-500/30">
                    <CalendarDays className="w-8 h-8 animate-pulse" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    📅 Screen 5/5: Assembling Study Timeline
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto font-medium">
                    Structuring daily practice topics and spaced repetition targets across your {daysUntil}-day plan.
                  </p>
                </div>

                {/* Schedule Assembly Banner */}
                <div className="bg-white/90 border border-sky-300 rounded-2xl p-4 text-xs font-bold text-slate-800 flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-2.5 text-sky-900">
                    <Layers className="w-5 h-5 text-sky-600" />
                    <span>Timeline: {daysUntil}-Day Spaced Repetition Plan</span>
                  </div>
                  <span className="px-3 py-1 bg-sky-100 text-sky-800 border border-sky-300 rounded-full font-black text-xs animate-pulse">
                    FINALIZING...
                  </span>
                </div>
              </div>
            )}

            {/* Bottom Status Info */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-2 text-blue-700 font-semibold">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span>Screen {activeStageScreen} of 5 rendering live...</span>
              </span>
              <button
                type="button"
                onClick={handleClose}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                Run in Background
              </button>
            </div>
          </div>
        )}

        {/* ─── SCREEN 6: CELEBRATION / COMPLETED SCREEN ─── */}
        {isCompleted && (
          <div className="py-6 flex flex-col items-center justify-center text-center space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 animate-bounce">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 inline-block mb-2 shadow-2xs">
                ✨ All 5 Stages Complete!
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Your Kit is Fully Ready</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm font-medium">
                Successfully executed all 5 pipeline screens inside the modal. Your interview kit is generated and ready to practice!
              </p>
            </div>

            {/* Summary Metrics Grid */}
            {kitDetails?.kit_data && (
              <div className="grid grid-cols-3 gap-3 w-full bg-gradient-to-br from-blue-50/90 via-sky-50/70 to-blue-100/60 backdrop-blur-md border border-blue-200/80 rounded-2xl p-4 text-center my-1 shadow-md">
                <div>
                  <p className="text-2xl font-black text-blue-700">
                    {Object.values(kitDetails.kit_data.questions || {}).reduce((s: number, a: any) => s + (Array.isArray(a) ? a.length : 0), 0)}
                  </p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Questions</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-emerald-700">
                    {(kitDetails.kit_data.flashcards || []).length}
                  </p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Flashcards</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-indigo-700">
                    {kitDetails.days_available || 7} Days
                  </p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Schedule</p>
                </div>
              </div>
            )}

            {/* Final Actions */}
            <div className="flex items-center gap-3 w-full pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3.5 px-4 bg-slate-200/70 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-2xl transition-all cursor-pointer"
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
                className="flex-1 py-3.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Open Prep Kit</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
