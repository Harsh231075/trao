"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  X,
  AlertCircle,
  Loader2,
  Check,
  Search,
  Brain,
  FileText,
  BarChart3,
} from "lucide-react";
import api from "@/lib/api";

interface CreateKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (kit: any) => void;
}

const VERTICAL_STEPS = [
  {
    step: 1,
    title: "1. Researching Company",
    desc: "Scraping tech stack & public signals",
  },
  {
    step: 2,
    title: "2. Extracting Requirements",
    desc: "Parsing MUST vs NICE skills from JD",
  },
  {
    step: 3,
    title: "3. Generating Questions",
    desc: "Synthesizing technical & behavioral Qs",
  },
  {
    step: 4,
    title: "4. Checking Coverage",
    desc: "Verifying 100% requirement audit pass",
  },
  {
    step: 5,
    title: "5. Building Schedule",
    desc: "Structuring day-by-day study timeline",
  },
];

const STAGE_STATUS_TEXT = [
  "Researching company signals and engineering stack...",
  "Parsing role requirements and MUST vs NICE skills...",
  "Synthesizing technical, system design & behavioural questions...",
  "Verifying 100% requirement coverage audit pass...",
  "Structuring day-by-day practice schedule & timeline...",
];

const STEP5_SUBSTATES = [
  "Structuring day-by-day practice schedule & timeline...",
  "Calibrating difficulty weights & flashcard decks...",
  "Finalizing kit readiness metrics & solution outlines...",
];

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
  const [step5SubIndex, setStep5SubIndex] = useState<number>(0);

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
    setStep5SubIndex(0);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Poll backend for pipeline data (1.2s fast polling)
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
    }, 1200);

    return () => clearInterval(interval);
  }, [createdKitId, isOpen, onCreated]);

  // Balanced Pacing Stage Progression (3.2s per step: 1 → 2 → 3 → 4 → 5 → 6)
  useEffect(() => {
    if (!createdKitId || !isOpen) return;
    if (activeStageScreen < 1 || activeStageScreen >= 6) return;

    const timer = setTimeout(() => {
      setActiveStageScreen((prev) => {
        if (prev < 5) return prev + 1;
        if (prev === 5 && (kitStatus === "completed" || kitStatus === "partial")) {
          return 6;
        }
        return prev;
      });
    }, 3200);

    return () => clearTimeout(timer);
  }, [createdKitId, isOpen, activeStageScreen, kitStatus]);

  // Rotate Step 5 sub-status messages for high user engagement
  useEffect(() => {
    if (activeStageScreen !== 5) return;

    const interval = setInterval(() => {
      setStep5SubIndex((prev) => (prev + 1) % STEP5_SUBSTATES.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [activeStageScreen]);

  // Transition to Celebration screen 6 as soon as backend finishes on stage 5
  useEffect(() => {
    if (activeStageScreen === 5 && (kitStatus === "completed" || kitStatus === "partial")) {
      setActiveStageScreen(6);
    }
  }, [activeStageScreen, kitStatus]);

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
      setActiveStageScreen(1); // Launch processing screens immediately!

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
  const progressPercentage = Math.round((Math.max(1, activeStageScreen) / 5) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
      {/* Main Modal Outer Card - Lighter Vibrant Blue (#3B82F6 / bg-blue-500) */}
      <div className="bg-blue-500 rounded-3xl max-w-5xl w-full border border-blue-300/40 shadow-xl text-white overflow-hidden relative flex flex-col md:flex-row min-h-[560px]">
        
        {/* Top Right Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-blue-100 hover:text-white hover:bg-white/10 transition-all z-30 cursor-pointer"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ─── LEFT SIDEBAR: VERTICAL STEPPER (CLEAN NO LOGO) ─── */}
        <div className="bg-blue-600/60 border-b md:border-b-0 md:border-r border-blue-400/30 p-6 sm:p-8 w-full md:w-72 shrink-0 flex flex-col justify-center relative z-10">
          
          {/* Vertical 5-Step Timeline */}
          <div className="relative space-y-7 my-auto">
            {/* Connecting Vertical Line */}
            <div className="absolute left-[17px] top-4 bottom-4 w-0.5 bg-blue-300/40 -z-10" />

            {VERTICAL_STEPS.map((stg) => {
              const isPassed = activeStageScreen > stg.step || isCompleted;
              const isCurrent = activeStageScreen === stg.step && !isCompleted;
              const isFormScreen = activeStageScreen === 0 && stg.step === 1;

              const isActiveOrPassed = isPassed || isCurrent || isFormScreen;

              return (
                <div key={stg.step} className="flex items-start gap-3.5 group">
                  {/* Circle Node Indicator */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all duration-200 ${
                      isPassed
                        ? "bg-white text-blue-600 shadow-sm"
                        : isCurrent || isFormScreen
                        ? "bg-white text-blue-600 ring-4 ring-white/30 shadow-md scale-105"
                        : "bg-blue-700/60 border border-blue-300/30 text-blue-100"
                    }`}
                  >
                    {isPassed ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : (
                      <span>{stg.step}</span>
                    )}
                  </div>

                  {/* Step Title & Subtext */}
                  <div>
                    <h4
                      className={`text-sm font-bold tracking-tight transition-colors ${
                        isActiveOrPassed ? "text-white" : "text-blue-100/70"
                      }`}
                    >
                      {stg.title}
                    </h4>
                    <p className="text-[11px] text-blue-100/90 font-medium leading-tight mt-0.5">
                      {stg.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── RIGHT MAIN CONTENT AREA ─── */}
        <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between relative z-10 bg-blue-500">

          {/* ─── SCREEN 0: FORM INPUT ─── */}
          {!createdKitId && activeStageScreen === 0 && (
            <div className="space-y-6 my-auto">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-blue-600 border border-blue-300/40 text-white text-xs font-bold mb-3">
                  AI Kit Generator
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Create Your Custom Prep Kit</h2>
                <p className="text-xs sm:text-sm text-blue-100 mt-1 font-medium">
                  Provide your job details &amp; company website. AI will execute a 5-step generation process.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 px-4 py-3 bg-red-500/20 border border-red-300/40 rounded-xl text-white text-xs font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-100" />
                    {error}
                  </div>
                )}

                {/* Company Website */}
                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                    Company Website / Careers URL
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://company.com"
                    required
                    className="w-full px-4 py-3 text-sm bg-blue-600/70 border border-blue-300/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all text-white placeholder:text-blue-100/70 font-medium"
                  />
                </div>

                {/* Days Available */}
                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                    Days Available to Prepare
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={daysUntil}
                    onChange={(e) => setDaysUntil(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-blue-600/70 border border-blue-300/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all text-white font-medium"
                  />
                </div>

                {/* Job Description */}
                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                    Paste Job Description
                  </label>
                  <textarea
                    rows={4}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste full JD text including required technical stack, responsibilities, and qualifications..."
                    required
                    className="w-full px-4 py-3 text-sm bg-blue-600/70 border border-blue-300/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-white resize-none transition-all text-white placeholder:text-blue-100/70 font-medium"
                  />
                </div>

                {/* Clean Sharp Form Actions (No Icons) */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2.5 text-xs font-bold text-blue-100 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-white hover:bg-blue-50 text-blue-600 font-extrabold text-sm rounded-xl shadow-md transition-all disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? "Starting AI Pipeline..." : "Start Creating Kit"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ─── IN-MODAL SCREEN-BY-SCREEN PIPELINE STAGES (SCREENS 1 TO 5) ─── */}
          {isPipelineActive && (
            <div className="space-y-6 my-auto flex flex-col justify-between h-full animate-in fade-in duration-300">
              
              {/* Header Title */}
              <div>
                <div className="text-blue-100 text-xs font-bold mb-1">
                  Creating Your Interview Kit
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  We&apos;re analyzing the job and <span className="underline decoration-white/40">generating</span> your personalized content.
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 mt-1 font-medium">
                  This usually takes less than a minute. You can keep this window open.
                </p>
              </div>

              {/* ── NON-OVERLAPPING CLEAN LAYOUT: 3D AI CHIP + 4 FEATURE CARDS ── */}
              <div className="flex flex-col sm:flex-row items-center gap-5 my-2 p-4 bg-blue-600/50 rounded-2xl border border-blue-300/30">
                
                {/* 3D AI Chip Preview Card (Dedicated Non-Overlapping Slot) */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 relative rounded-2xl overflow-hidden border border-white/40 shadow-lg shrink-0">
                  <Image
                    src="/images/ai_core_chip_3d.jpg"
                    alt="AI Core Chip"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* 4 Feature Cards (2x2 Grid, Clean & High-Contrast) */}
                <div className="grid grid-cols-2 gap-2.5 flex-1 w-full">
                  <div className="bg-blue-700/80 border border-blue-300/40 rounded-xl p-3 shadow-xs flex items-center gap-2">
                    <Search className="w-4 h-4 text-blue-200 shrink-0" />
                    <span className="text-xs font-bold text-white">Analyzing job description</span>
                  </div>

                  <div className="bg-blue-700/80 border border-blue-300/40 rounded-xl p-3 shadow-xs flex items-center gap-2">
                    <Brain className="w-4 h-4 text-blue-200 shrink-0" />
                    <span className="text-xs font-bold text-white">Generating questions</span>
                  </div>

                  <div className="bg-blue-700/80 border border-blue-300/40 rounded-xl p-3 shadow-xs flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-200 shrink-0" />
                    <span className="text-xs font-bold text-white">Extracting requirements</span>
                  </div>

                  <div className="bg-blue-700/80 border border-blue-300/40 rounded-xl p-3 shadow-xs flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-200 shrink-0" />
                    <span className="text-xs font-bold text-white">Creating study schedule</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar & Percentage */}
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-3 bg-blue-700/60 rounded-full p-0.5 border border-blue-300/40 overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-700 ease-out shadow-sm"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-black text-white shrink-0">
                    {progressPercentage}%
                  </span>
                </div>

                {/* Dynamic Floating Status Pill (with dynamic Step 5 sub-states) */}
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/90 border border-blue-300/40 text-white text-xs font-semibold shadow-sm">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>
                      {activeStageScreen === 5
                        ? STEP5_SUBSTATES[step5SubIndex]
                        : STAGE_STATUS_TEXT[activeStageScreen - 1] || STAGE_STATUS_TEXT[0]}
                    </span>
                  </span>
                </div>
              </div>

              {/* Bottom Tip Card ("Did you know?") */}
              <div className="bg-blue-600/70 border border-blue-300/40 rounded-xl p-4 flex items-start gap-3.5 shadow-md">
                <div>
                  <h5 className="text-xs font-bold text-white">Did you know?</h5>
                  <p className="text-[11px] text-blue-100 mt-0.5 leading-relaxed font-medium">
                    Our AI analyzes your job description, company context, and industry trends to create highly relevant and up-to-date interview content.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ─── SCREEN 6: CELEBRATION / COMPLETED SCREEN ─── */}
          {isCompleted && (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-6 my-auto animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-xl">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <div>
                <span className="text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-blue-600/80 text-white border border-blue-300/40 inline-block mb-3">
                  Kit Generation Complete
                </span>
                <h3 className="text-3xl font-black text-white tracking-tight">Your Interview Kit is Ready</h3>
                <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-md font-medium">
                  All 5 stages processed! Tailored technical &amp; behavioural questions, flashcards, and schedule are structured for you.
                </p>
              </div>

              {/* Summary Metrics */}
              {kitDetails?.kit_data && (
                <div className="grid grid-cols-3 gap-3 w-full max-w-md bg-blue-600/70 border border-blue-300/40 rounded-xl p-4 text-center shadow-md">
                  <div>
                    <p className="text-2xl font-black text-white">
                      {Object.values(kitDetails.kit_data.questions || {}).reduce((s: number, a: any) => s + (Array.isArray(a) ? a.length : 0), 0)}
                    </p>
                    <p className="text-[10px] font-bold text-blue-100 uppercase tracking-wider">Questions</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-white">
                      {(kitDetails.kit_data.flashcards || []).length}
                    </p>
                    <p className="text-[10px] font-bold text-blue-100 uppercase tracking-wider">Flashcards</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-white">
                      {kitDetails.days_available || 7} Days
                    </p>
                    <p className="text-[10px] font-bold text-blue-100 uppercase tracking-wider">Schedule</p>
                  </div>
                </div>
              )}

              {/* Clean Sharp Final Action Buttons (No Icons) */}
              <div className="flex items-center gap-3 w-full max-w-md pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3.5 px-4 bg-blue-600/80 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all cursor-pointer border border-blue-300/40"
                >
                  Close Window
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const id = createdKitId;
                    handleClose();
                    router.push(`/kits/${id}`);
                  }}
                  className="flex-1 py-3.5 px-4 bg-white hover:bg-blue-50 text-blue-600 font-extrabold text-sm rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Open Prep Kit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
