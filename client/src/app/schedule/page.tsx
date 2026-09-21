"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { Calendar as CalendarIcon, Clock, Video, Building2, ChevronLeft, ChevronRight, Plus } from "lucide-react";

export default function SchedulePage() {
  const events = [
    {
      id: 1,
      title: "Google Technical Round 1 - DSA & Problem Solving",
      company: "Google",
      date: "Sep 26, 2026",
      time: "2:00 PM - 3:00 PM IST",
      type: "Technical Interview",
      interviewer: "Staff Software Engineer",
      status: "Upcoming",
    },
    {
      id: 2,
      title: "OpenAI System Design Deep Dive",
      company: "OpenAI",
      date: "Oct 03, 2026",
      time: "6:30 PM - 7:30 PM IST",
      type: "System Architecture",
      interviewer: "Engineering Lead",
      status: "Confirmed",
    },
    {
      id: 3,
      title: "Peer Mock Interview - Frontend Performance & React",
      company: "PrepAI Community",
      date: "Sep 23, 2026",
      time: "8:00 PM - 9:00 PM IST",
      type: "Mock Interview",
      interviewer: "Community Partner",
      status: "Today",
    },
  ];

  return (
    <div className="space-y-6">
      <Header />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Schedule &amp; Timeline
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Keep track of your upcoming company interview rounds and practice mock sessions.
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-full shadow-sm hover:shadow-md transition-all self-start sm:self-auto">
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Interview Date</span>
        </button>
      </div>

      {/* Calendar Bar */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">September 2026</h3>
            <p className="text-xs text-slate-500">Week 39 • 3 Scheduled Sessions</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-slate-800 px-3 py-1 bg-white rounded-lg border border-slate-200">
            Today (Sep 21)
          </span>
          <button className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Timeline Events List */}
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    event.status === "Today"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}
                >
                  {event.status}
                </span>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {event.company}
                </span>
                <span className="text-xs text-slate-400">{event.type}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{event.title}</h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="w-3.5 h-3.5 text-slate-400" /> {event.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {event.time}
                </span>
                <span>Interviewer: {event.interviewer}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                <Video className="w-3.5 h-3.5" />
                <span>Join Meeting</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
