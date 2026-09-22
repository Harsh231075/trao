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
  CheckCircle2,
  BarChart3,
} from "lucide-react";

export default function SchedulePage() {
  const [kits, setKits] = useState<any[]>([]);
  const [selectedKitId, setSelectedKitId] = useState<string>("");
  const [schedule, setSchedule] = useState<any[]>([]);
  const [daysAvailable, setDaysAvailable] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isScheduleLoading, setIsScheduleLoading] = useState(false);

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

  // Fetch schedule when kit changes
  const fetchSchedule = useCallback(async () => {
    if (!selectedKitId) return;
    setIsScheduleLoading(true);
    try {
      const data = await api.get(`/kits/${selectedKitId}/schedule`);
      setSchedule(data.schedule || []);
      setDaysAvailable(data.days_available || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScheduleLoading(false);
    }
  }, [selectedKitId]);

  useEffect(() => { fetchSchedule(); }, [fetchSchedule]);

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
    <div className="space-y-6">
      <Header />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Day-by-Day Study Schedule
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Arithmetic topic allocation across your preparation window.
          </p>
        </div>
      </div>

      {/* Kit Selector */}
      {kits.length > 0 ? (
        <>
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Kit:</label>
            <select
              value={selectedKitId}
              onChange={(e) => setSelectedKitId(e.target.value)}
              className="px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
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
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-700">{schedule.length}</p>
                <p className="text-xs font-semibold text-blue-600 mt-1">Total Days</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-emerald-700">{totalMinutes}</p>
                <p className="text-xs font-semibold text-emerald-600 mt-1">Total Minutes</p>
              </div>
              <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-violet-700">{totalQuestions}</p>
                <p className="text-xs font-semibold text-violet-600 mt-1">Questions Assigned</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
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
        <div className="space-y-3">
          {schedule.map((day, i) => {
            const isToday = i === 0; // Visual highlight for first day
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl border p-5 transition-all hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isToday ? "border-blue-300 shadow-sm ring-1 ring-blue-100" : "border-slate-200/80 shadow-2xs"
                }`}
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {/* Day Badge */}
                  <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 ${
                    isToday ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}>
                    <span className="text-[10px] font-bold uppercase leading-none">Day</span>
                    <span className="text-xl font-black leading-none">{day.day}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-slate-900">{day.focus}</h3>
                      {isToday && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          TODAY
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {day.minutes} minutes
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="w-3.5 h-3.5 text-slate-400" />
                        {day.question_ids?.length || 0} questions
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${Math.min(100, ((day.minutes || 0) / Math.max(...schedule.map((s: any) => s.minutes || 1))) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 w-10 text-right">
                    {day.minutes}m
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
