"use client";

import React, { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import api from "@/lib/api";
import {
  Calendar as CalendarIcon,
  Clock,
  Loader2,
  BookOpen,
  Target,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function SchedulePage() {
  const [kits, setKits] = useState<any[]>([]);
  const [selectedKitId, setSelectedKitId] = useState<string>("");
  const [selectedKit, setSelectedKit] = useState<any>(null);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [daysAvailable, setDaysAvailable] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isScheduleLoading, setIsScheduleLoading] = useState(false);
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({});

  const toggleDayExpand = (dayNum: number) => {
    setExpandedDays(prev => ({
      ...prev,
      [dayNum]: prev[dayNum] !== undefined ? !prev[dayNum] : false
    }));
  };

  // Fetch kits
  useEffect(() => {
    api.get("/kits").then(data => {
      const completedKits = (data.kits || []).filter((k: any) => k.status === "completed");
      setKits(completedKits);
      if (completedKits.length > 0) {
        setSelectedKitId(completedKits[0]._id);
      }
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  // Fetch kit details and schedule when selected kit changes
  const fetchSchedule = useCallback(async () => {
    if (!selectedKitId) return;
    setIsScheduleLoading(true);
    try {
      const data = await api.get(`/kits/${selectedKitId}`);
      const kitData = data.kit || {};
      setSelectedKit(kitData);
      setSchedule(kitData.kit_data?.schedule || []);
      setDaysAvailable(kitData.days_available || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScheduleLoading(false);
    }
  }, [selectedKitId]);

  useEffect(() => { fetchSchedule(); }, [fetchSchedule]);

  // Computed dynamic active day based on kit creation date
  const kitCreatedAt = selectedKit?.created_at ? new Date(selectedKit.created_at) : new Date();
  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - kitCreatedAt.getTime());
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const activeDayNumber = Math.min(daysAvailable || 7, Math.max(1, diffDays + 1));

  // Extract sub-points / key topics for a day
  const getSubPointsForDay = (day: any) => {
    const subPoints: string[] = [];
    if (selectedKit?.kit_data?.questions) {
      for (const catQs of Object.values(selectedKit.kit_data.questions)) {
        if (Array.isArray(catQs)) {
          for (const q of catQs) {
            if (day.question_ids?.includes(q.id)) {
              subPoints.push(q.text);
            }
          }
        }
      }
    }
    if (subPoints.length > 0) return subPoints;

    const focusLower = (day.focus || "").toLowerCase();
    if (focusLower.includes("technical")) {
      return [
        "Review core data structures, algorithms & space-time complexity.",
        "Solve primary coding pattern questions assigned for this role."
      ];
    } else if (focusLower.includes("behavioural")) {
      return [
        "Draft STAR method responses (Situation, Task, Action, Result) for past project challenges.",
        "Review company core values & engineering culture."
      ];
    } else if (focusLower.includes("system")) {
      return [
        "Design high-availability microservices & database partitioning.",
        "Review caching strategies, load balancing & API rate limiting."
      ];
    }
    return [
      "Review essential MUST requirements & company technical stack.",
      "Self-conduct practice response walkthrough."
    ];
  };

  // Computed stats
  const totalMinutes = schedule.reduce((sum, d) => sum + (d.minutes || 0), 0);
  const totalQuestions = schedule.reduce((sum, d) => sum + (d.question_ids?.length || 0), 0);

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
    <div className="space-y-6 pb-12">
      <Header />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Day-by-Day Study Schedule
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Dynamic preparation roadmap with topic sub-points and daily target tracking.
          </p>
        </div>
      </div>

      {/* Kit Selector */}
      {kits.length > 0 ? (
        <>
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Kit:</label>
            <select
              value={selectedKitId}
              onChange={(e) => setSelectedKitId(e.target.value)}
              className="px-4 py-2 text-sm bg-blue-50/70 backdrop-blur-md border border-blue-200/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 font-bold shadow-2xs"
            >
              {kits.map(k => (
                <option key={k._id} value={k._id}>
                  {k._computed?.company_name || "Kit"} — {k._computed?.role_title || "Processing"}
                </option>
              ))}
            </select>
          </div>

          {/* Summary Stats */}
          {schedule.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-blue-50/70 backdrop-blur-md border border-blue-200/70 rounded-2xl p-4 text-center shadow-2xs">
                <p className="text-2xl font-black text-blue-700">{schedule.length}</p>
                <p className="text-xs font-bold text-blue-600 mt-1">Total Days</p>
              </div>
              <div className="bg-emerald-50/70 backdrop-blur-md border border-emerald-200/70 rounded-2xl p-4 text-center shadow-2xs">
                <p className="text-2xl font-black text-emerald-700">{totalMinutes}</p>
                <p className="text-xs font-bold text-emerald-600 mt-1">Total Minutes</p>
              </div>
              <div className="bg-violet-50/70 backdrop-blur-md border border-violet-200/70 rounded-2xl p-4 text-center shadow-2xs">
                <p className="text-2xl font-black text-violet-700">{totalQuestions}</p>
                <p className="text-xs font-bold text-violet-600 mt-1">Questions Assigned</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center">
            <CalendarIcon className="w-7 h-7" />
          </div>
          <p className="text-sm font-medium text-slate-600">No completed kits yet</p>
          <p className="text-xs text-slate-400">Create and complete a kit to see your study schedule.</p>
        </div>
      )}

      {/* Schedule Cards */}
      {isScheduleLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : schedule.length === 0 && selectedKitId ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <CalendarIcon className="w-10 h-10 text-slate-300" />
          <p className="text-sm text-slate-500">No schedule generated yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {schedule.map((day, i) => {
            const isToday = day.day === activeDayNumber;
            const subPoints = getSubPointsForDay(day);
            const isExpanded = expandedDays[day.day] ?? true;

            return (
              <div
                key={i}
                className={`bg-blue-50/70 backdrop-blur-md rounded-2xl border p-5 transition-all hover:bg-blue-100/80 hover:shadow-md space-y-3 ${isToday
                    ? "border-blue-400/90 shadow-md ring-2 ring-blue-300/40 bg-blue-100/60"
                    : "border-blue-200/70 shadow-2xs"
                  }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div
                    onClick={() => toggleDayExpand(day.day)}
                    className="flex items-start gap-4 flex-1 min-w-0 cursor-pointer group"
                  >
                    {/* Day Badge */}
                    <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 ${isToday ? "bg-blue-600 text-white shadow-md ring-2 ring-blue-400" : "bg-blue-100/80 text-blue-900 border border-blue-200/80"
                      }`}>
                      <span className="text-[10px] font-bold uppercase leading-none">Day</span>
                      <span className="text-xl font-black leading-none">{day.day}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">{day.focus}</h3>
                        {isToday && (
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-600 text-white shadow-2xs">
                            TODAY'S FOCUS
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600 mt-1.5">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-blue-600" />
                          {day.minutes} minutes
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5 text-blue-600" />
                          {subPoints.length} topics / questions
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expand / Collapse Toggle Button */}
                  <button
                    type="button"
                    onClick={() => toggleDayExpand(day.day)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-100/80 hover:bg-blue-200/90 text-blue-800 text-xs font-bold transition-all shrink-0 self-start sm:self-center shadow-2xs border border-blue-200/60"
                  >
                    <span>{isExpanded ? "Collapse" : "Expand"}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-blue-700" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-blue-700" />
                    )}
                  </button>
                </div>

                {/* Sub-points / What to study today */}
                {isExpanded && (
                  <div className="pt-3 border-t border-blue-200/50 space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      What To Study Today (Roadmap Sub-points):
                    </p>
                    <ul className="space-y-1.5">
                      {subPoints.map((sp, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-800 bg-white/80 p-2.5 rounded-xl border border-blue-200/50 shadow-2xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                          <span className="flex-1 leading-snug">{sp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
