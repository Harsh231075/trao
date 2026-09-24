"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useSchedule } from "@/hooks/useSchedule";
import {
  Calendar as CalendarIcon,
  Clock,
  Loader2,
  BookOpen,
  Target,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  X,
  ArrowRight,
  Check,
  Flag,
  Layers,
  Play,
  Lightbulb,
} from "lucide-react";

// Category badge and styling map
function getCategoryInfo(focus: string, categoryAttr?: string) {
  const text = (categoryAttr || focus || "").toLowerCase();

  if (text.includes("company") || text.includes("culture") || text.includes("fit")) {
    return {
      name: "Company Fit",
      badgeClass: "bg-blue-100/90 text-blue-700 border-blue-200/80",
      cardBg: "bg-gradient-to-br from-blue-50/90 via-blue-50/40 to-indigo-50/30 border-blue-200/70",
      iconBg: "bg-blue-100 text-blue-600",
      accentColor: "#2563eb",
    };
  }
  if (text.includes("system") || text.includes("architecture") || text.includes("design")) {
    return {
      name: "System Design",
      badgeClass: "bg-amber-100/90 text-amber-800 border-amber-200/80",
      cardBg: "bg-gradient-to-br from-amber-50/90 via-orange-50/30 to-amber-50/30 border-amber-200/70",
      iconBg: "bg-amber-100 text-amber-600",
      accentColor: "#d97706",
    };
  }
  if (text.includes("behavioural") || text.includes("behavioral") || text.includes("star")) {
    return {
      name: "Behavioural",
      badgeClass: "bg-emerald-100/90 text-emerald-800 border-emerald-200/80",
      cardBg: "bg-gradient-to-br from-emerald-50/90 via-teal-50/30 to-emerald-50/30 border-emerald-200/70",
      iconBg: "bg-emerald-100 text-emerald-600",
      accentColor: "#059669",
    };
  }
  if (text.includes("revision") || text.includes("mock") || text.includes("review") || text.includes("final")) {
    return {
      name: "Final Review",
      badgeClass: "bg-indigo-100/90 text-indigo-800 border-indigo-200/80",
      cardBg: "bg-gradient-to-br from-indigo-50/90 via-violet-50/30 to-blue-50/30 border-indigo-200/70",
      iconBg: "bg-indigo-100 text-indigo-600",
      accentColor: "#4f46e5",
    };
  }
  // Default Technical
  return {
    name: "Technical",
    badgeClass: "bg-cyan-100/90 text-cyan-800 border-cyan-200/80",
    cardBg: "bg-gradient-to-br from-cyan-50/90 via-sky-50/30 to-blue-50/30 border-cyan-200/70",
    iconBg: "bg-cyan-100 text-cyan-600",
    accentColor: "#0891b2",
  };
}

// Generate short descriptive summaries for milestone cards
function getMilestoneDescription(focus: string): string {
  const text = focus.toLowerCase();
  if (text.includes("company")) return "Learn about the company's mission, products, culture, and hiring process.";
  if (text.includes("core technical")) return "Focus on key technical skills and fundamentals from the job description.";
  if (text.includes("deep dive")) return "Practice advanced technical concepts and problem-solving questions.";
  if (text.includes("system design")) return "Learn system design concepts, scalability patterns, and architecture questions.";
  if (text.includes("behavioural")) return "Practice common behavioural questions and structure your responses with STAR.";
  if (text.includes("role specific")) return "Focus on role-specific questions and company technical expectations.";
  if (text.includes("revision") || text.includes("mock")) return "Review key topics, take mock practice, and reinforce weak areas.";
  return "Master daily targeted topics and practice assigned interview questions.";
}

// Handwritten annotation notes
const MILESTONE_ANNOTATIONS: Record<number, { text: string; position: "left" | "right" }> = {
  1: { text: "Start here ⤵", position: "right" },
  3: { text: "Build your core skills ⤴", position: "right" },
  5: { text: "Get interview ready ⤵", position: "right" },
  7: { text: "You're interview ready! 🎉", position: "right" },
};

interface DrawerTopic {
  number: string;
  title: string;
  questionsCount: number;
  category?: string;
}

export default function SchedulePage() {
  const router = useRouter();
  const {
    kits,
    selectedKitId,
    setSelectedKitId,
    selectedKit,
    schedule,
    isLoading,
    isScheduleLoading,
    activeDayNumber,
    getSubPointsForDay,
    totalMinutes,
    totalQuestions,
  } = useSchedule();

  const [selectedDrawerDay, setSelectedDrawerDay] = useState<any | null>(null);

  // Extract topics for topic detail drawer
  const getTopicsForDay = (day: any): DrawerTopic[] => {
    if (!day) return [];
    
    if (selectedKit?.kit_data?.questions && Array.isArray(day.question_ids) && day.question_ids.length > 0) {
      const matchedQs: any[] = [];
      Object.values(selectedKit.kit_data.questions).forEach((catQs: any) => {
        if (Array.isArray(catQs)) {
          catQs.forEach((q: any) => {
            if (day.question_ids.includes(q.id)) {
              matchedQs.push(q);
            }
          });
        }
      });

      if (matchedQs.length > 0) {
        return matchedQs.map((q, idx) => ({
          number: String(idx + 1).padStart(2, "0"),
          title: q.text || q.question || "Topic Question",
          questionsCount: Math.floor(Math.random() * 2) + 2,
          category: q.category || "Technical",
        }));
      }
    }

    const subPoints = getSubPointsForDay(day);
    const avgQuestions = Math.max(1, Math.round((day.question_ids?.length || 6) / Math.max(1, subPoints.length)));
    return subPoints.map((sp, idx) => ({
      number: String(idx + 1).padStart(2, "0"),
      title: sp,
      questionsCount: avgQuestions,
      category: getCategoryInfo(day.focus).name,
    }));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 relative min-h-screen">
      <Header />

      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
              Interactive Learning Roadmap
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Day-by-Day Study Schedule
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Follow your personalized interview preparation journey and master key topics day by day.
          </p>
        </div>

        {/* Kit Selector Dropdown */}
        {kits.length > 0 && (
          <div className="flex items-center gap-2.5 bg-blue-50/80 backdrop-blur-md p-1.5 rounded-2xl border border-blue-200/80 shadow-2xs self-start sm:self-center">
            <label className="text-xs font-extrabold text-blue-700 uppercase tracking-wider pl-2">Kit:</label>
            <select
              value={selectedKitId}
              onChange={(e) => setSelectedKitId(e.target.value)}
              className="px-3.5 py-1.5 text-xs sm:text-sm bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 font-bold shadow-2xs cursor-pointer"
            >
              {kits.map((k) => (
                <option key={k._id} value={k._id}>
                  {k._computed?.company_name || "Kit"} — {k._computed?.role_title || "Processing"}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Summary Stats Header Bar */}
      {kits.length > 0 && schedule.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-gradient-to-br from-blue-50/90 to-indigo-50/50 backdrop-blur-md border border-blue-200/80 rounded-2xl p-3.5 sm:p-4 text-center shadow-2xs">
            <p className="text-2xl sm:text-3xl font-black text-blue-700 tracking-tight">{schedule.length}</p>
            <p className="text-[11px] sm:text-xs font-bold text-blue-600 mt-0.5">Total Days</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50/90 to-teal-50/50 backdrop-blur-md border border-emerald-200/80 rounded-2xl p-3.5 sm:p-4 text-center shadow-2xs">
            <p className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight">{totalMinutes}</p>
            <p className="text-[11px] sm:text-xs font-bold text-emerald-600 mt-0.5">Total Minutes</p>
          </div>
          <div className="bg-gradient-to-br from-violet-50/90 to-purple-50/50 backdrop-blur-md border border-violet-200/80 rounded-2xl p-3.5 sm:p-4 text-center shadow-2xs">
            <p className="text-2xl sm:text-3xl font-black text-violet-700 tracking-tight">{totalQuestions}</p>
            <p className="text-[11px] sm:text-xs font-bold text-violet-600 mt-0.5">Questions Assigned</p>
          </div>
        </div>
      )}

      {/* Empty / Loading States */}
      {isScheduleLoading ? (
        <div className="flex items-center justify-center py-28">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : kits.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 bg-blue-50/40 rounded-3xl border border-blue-100">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
            <CalendarIcon className="w-7 h-7" />
          </div>
          <p className="text-sm font-semibold text-slate-700">No completed interview kits yet</p>
          <p className="text-xs text-slate-400">Create and generate an interview kit to view your day-by-day learning roadmap.</p>
        </div>
      ) : schedule.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 bg-blue-50/40 rounded-3xl border border-blue-100">
          <CalendarIcon className="w-10 h-10 text-slate-300" />
          <p className="text-sm text-slate-500">No schedule generated for this kit.</p>
        </div>
      ) : (
        /* ==================== LEARNING ROADMAP CONTAINER ==================== */
        <div className="relative pt-6 pb-12 max-w-5xl mx-auto px-2">
          
          {/* Desktop Curved S-Curve Timeline Background Ribbon */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-48 pointer-events-none hidden md:block overflow-hidden">
            <svg
              className="w-full h-full"
              viewBox="0 0 200 1200"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="roadmapPathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="35%" stopColor="#2563eb" />
                  <stop offset="70%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#93c5fd" />
                </linearGradient>
              </defs>
              <path
                d="M 100 30 C 170 180, 30 360, 100 540 C 170 720, 30 900, 100 1080 L 100 1180"
                stroke="url(#roadmapPathGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                opacity="0.8"
              />
              <path
                d="M 100 30 C 170 180, 30 360, 100 540 C 170 720, 30 900, 100 1080 L 100 1180"
                stroke="#ffffff"
                strokeWidth="2"
                strokeDasharray="6 6"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* Desktop Timeline Layout (3 Columns: Left Card | Center Node | Right Card) */}
          <div className="hidden md:flex flex-col space-y-12 relative z-10">
            {schedule.map((day) => {
              const isCompleted = day.day < activeDayNumber;
              const isToday = day.day === activeDayNumber;
              const isUpcoming = day.day > activeDayNumber;
              const subPoints = getSubPointsForDay(day);
              const catInfo = getCategoryInfo(day.focus, day.category);
              const description = getMilestoneDescription(day.focus);
              const annotation = MILESTONE_ANNOTATIONS[day.day];

              const isLeftCard = day.day % 2 !== 0; // Days 1, 3, 5, 7 on left

              return (
                <div key={day.day} className="grid grid-cols-[1fr_90px_1fr] items-center gap-4 group">
                  
                  {/* LEFT COLUMN */}
                  <div className="flex justify-end pr-2">
                    {isLeftCard ? (
                      <MilestoneCard
                        day={day}
                        catInfo={catInfo}
                        description={description}
                        subPointsCount={subPoints.length}
                        isToday={isToday}
                        isCompleted={isCompleted}
                        onViewTopics={() => setSelectedDrawerDay(day)}
                      />
                    ) : annotation ? (
                      <div className="text-right pr-6 py-2 animate-in fade-in duration-300">
                        <span className="inline-block text-blue-600/90 font-serif italic text-sm font-semibold tracking-wide bg-blue-50/80 px-3 py-1.5 rounded-full border border-blue-200/60 shadow-2xs">
                          {annotation.text}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  {/* CENTER COLUMN: CIRCULAR NODE */}
                  <div className="flex flex-col items-center justify-center relative">
                    <div
                      className={`w-16 h-16 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-md cursor-pointer ${
                        isCompleted
                          ? "bg-emerald-500 text-white ring-4 ring-emerald-200 shadow-emerald-500/20"
                          : isToday
                          ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white ring-8 ring-blue-400/40 shadow-xl shadow-blue-500/40 scale-110 animate-pulse-subtle"
                          : "bg-white text-slate-600 border-2 border-blue-200/80 shadow-2xs group-hover:border-blue-400 group-hover:scale-105"
                      }`}
                      onClick={() => setSelectedDrawerDay(day)}
                    >
                      {isCompleted ? (
                        <div className="flex flex-col items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-white stroke-[2.5]" />
                          <span className="text-[9px] font-black uppercase mt-0.5 leading-none">DAY {day.day}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center leading-none">
                          <span className="text-[9px] font-extrabold uppercase tracking-wider opacity-90">DAY</span>
                          <span className="text-xl font-black mt-0.5">{day.day}</span>
                        </div>
                      )}
                    </div>

                    {/* Today Badge underneath center node if today */}
                    {isToday && (
                      <span className="absolute -bottom-5 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-600 text-white shadow-xs z-20">
                        TODAY
                      </span>
                    )}
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="flex justify-start pl-2">
                    {!isLeftCard ? (
                      <MilestoneCard
                        day={day}
                        catInfo={catInfo}
                        description={description}
                        subPointsCount={subPoints.length}
                        isToday={isToday}
                        isCompleted={isCompleted}
                        onViewTopics={() => setSelectedDrawerDay(day)}
                      />
                    ) : annotation ? (
                      <div className="text-left pl-6 py-2 animate-in fade-in duration-300">
                        <span className="inline-block text-blue-600/90 font-serif italic text-sm font-semibold tracking-wide bg-blue-50/80 px-3 py-1.5 rounded-full border border-blue-200/60 shadow-2xs">
                          {annotation.text}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Timeline Layout (Vertical line on left + full width cards) */}
          <div className="md:hidden flex flex-col space-y-6 relative pl-10 border-l-4 border-blue-200/70 ml-4">
            {schedule.map((day) => {
              const isCompleted = day.day < activeDayNumber;
              const isToday = day.day === activeDayNumber;
              const subPoints = getSubPointsForDay(day);
              const catInfo = getCategoryInfo(day.focus, day.category);
              const description = getMilestoneDescription(day.focus);

              return (
                <div key={day.day} className="relative">
                  {/* Mobile Circle Node on Timeline Line */}
                  <div
                    className={`absolute -left-[54px] top-4 w-11 h-11 rounded-full flex flex-col items-center justify-center text-xs font-black shadow-md cursor-pointer ${
                      isCompleted
                        ? "bg-emerald-500 text-white ring-2 ring-emerald-200"
                        : isToday
                        ? "bg-blue-600 text-white ring-4 ring-blue-300 scale-105"
                        : "bg-white text-slate-700 border-2 border-blue-200"
                    }`}
                    onClick={() => setSelectedDrawerDay(day)}
                  >
                    {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : `0${day.day}`}
                  </div>

                  {/* Milestone Card */}
                  <MilestoneCard
                    day={day}
                    catInfo={catInfo}
                    description={description}
                    subPointsCount={subPoints.length}
                    isToday={isToday}
                    isCompleted={isCompleted}
                    onViewTopics={() => setSelectedDrawerDay(day)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================== TOPIC DETAIL DRAWER ==================== */}
      {selectedDrawerDay && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setSelectedDrawerDay(null)}
          />

          {/* Slide-over Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <div className="w-screen max-w-md bg-white border-l border-blue-100 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              
              {/* Drawer Header */}
              <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-slate-50 flex items-start justify-between gap-4 shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getCategoryInfo(selectedDrawerDay.focus, selectedDrawerDay.category).badgeClass}`}>
                      Day {String(selectedDrawerDay.day).padStart(2, "0")} · {getCategoryInfo(selectedDrawerDay.focus, selectedDrawerDay.category).name}
                    </span>
                    {selectedDrawerDay.day === activeDayNumber && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-600 text-white shadow-2xs">
                        Today
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-tight">
                    {selectedDrawerDay.focus}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                    <span>⏱ {selectedDrawerDay.minutes} min</span>
                    <span>•</span>
                    <span>🎯 {selectedDrawerDay.question_ids?.length || 6} questions</span>
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={() => setSelectedDrawerDay(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Topic List */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between mb-3 px-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Topics &amp; Questions ({getTopicsForDay(selectedDrawerDay).length})
                  </p>
                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    Targeted Review
                  </span>
                </div>

                {getTopicsForDay(selectedDrawerDay).map((topic, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-blue-50/70 backdrop-blur-md border border-blue-200/70 hover:bg-blue-100/80 hover:border-blue-300/90 shadow-2xs transition-all flex items-start gap-3.5 group"
                  >
                    {/* Number Box - Styled to match kit card badges */}
                    <div className="w-7 h-7 rounded-lg bg-blue-100/80 text-blue-700 border border-blue-200/80 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                      {topic.number}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Topic Title with Regular / Medium Weight for superior readability */}
                      <h4 className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed group-hover:text-blue-700 transition-colors">
                        {topic.title}
                      </h4>
                      
                      {/* Metadata Row */}
                      <div className="flex items-center gap-2 mt-2 pt-1 border-t border-blue-200/40">
                        <span className="text-[11px] font-normal text-slate-500 flex items-center gap-1">
                          <Target className="w-3 h-3 text-blue-500" />
                          {topic.questionsCount} question{topic.questionsCount > 1 ? "s" : ""}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[11px] font-semibold text-blue-600">
                          {topic.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Drawer Bottom CTA */}
              <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/90 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDrawerDay(null);
                    router.push("/practice");
                  }}
                  className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Start Day {selectedDrawerDay.day} →</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Milestone Card Component
interface MilestoneCardProps {
  day: any;
  catInfo: any;
  description: string;
  subPointsCount: number;
  isToday: boolean;
  isCompleted: boolean;
  onViewTopics: () => void;
}

function MilestoneCard({
  day,
  catInfo,
  description,
  subPointsCount,
  isToday,
  isCompleted,
  onViewTopics,
}: MilestoneCardProps) {
  return (
    <div
      onClick={onViewTopics}
      className={`w-full max-w-sm sm:max-w-md p-5 rounded-2xl sm:rounded-3xl border transition-all duration-200 cursor-pointer relative overflow-hidden group hover:-translate-y-1 ${
        isToday
          ? "bg-blue-100/90 border-2 border-blue-400 shadow-md shadow-blue-500/10 ring-2 ring-blue-300/40"
          : isCompleted
          ? "bg-blue-50/70 backdrop-blur-md border-emerald-200/90 shadow-2xs hover:shadow-md hover:bg-emerald-50/50 hover:border-emerald-300"
          : "bg-blue-50/70 backdrop-blur-md border-blue-200/70 shadow-2xs hover:bg-blue-100/80 hover:border-blue-300"
      }`}
    >
      {/* Top Badges Row */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-2xs ${catInfo.badgeClass}`}>
          {catInfo.name}
        </span>

        {isCompleted ? (
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 stroke-[2.5]" /> Completed
          </span>
        ) : isToday ? (
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-600 text-white shadow-xs">
            TODAY'S FOCUS
          </span>
        ) : null}
      </div>

      {/* Title & Description with clean typography */}
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-blue-700 transition-colors tracking-tight leading-snug">
        {day.focus}
      </h3>
      <p className="text-xs text-slate-500 font-normal mt-1 leading-relaxed line-clamp-2">
        {description}
      </p>

      {/* Details Bar (Duration + Topics Count) */}
      <div className="flex items-center gap-4 text-xs font-medium text-slate-600 mt-4 pt-3 border-t border-blue-200/50">
        <span className="flex items-center gap-1.5 text-slate-600">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          {day.minutes} min
        </span>
        <span className="text-slate-300">•</span>
        <span className="flex items-center gap-1.5 text-slate-600">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          {subPointsCount} topics / questions
        </span>
      </div>

      {/* Action CTA Button */}
      <div className="mt-4 flex items-center justify-end">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onViewTopics();
          }}
          className="px-3.5 py-1.5 rounded-xl bg-white/90 hover:bg-blue-600 hover:text-white border border-blue-200/80 text-blue-700 font-semibold text-xs transition-all shadow-2xs group-hover:border-blue-400 flex items-center gap-1.5 cursor-pointer"
        >
          <span>View Topics</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}

