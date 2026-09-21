"use client";

import React from "react";
import Header from "@/components/Header";
import { BarChart3, TrendingUp, CheckCircle, Target, Award } from "lucide-react";

export default function AnalyticsPage() {
  const skills = [
    { name: "React & Modern Frontend", score: 88, color: "bg-blue-600" },
    { name: "Data Structures & Algorithms", score: 76, color: "bg-emerald-500" },
    { name: "System Design & Architecture", score: 68, color: "bg-indigo-600" },
    { name: "Node.js & API Engineering", score: 82, color: "bg-purple-600" },
    { name: "Databases & Caching", score: 62, color: "bg-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <Header />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Preparation Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Quantitative assessment of your interview readiness across core engineering domains.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-200">
          <Award className="w-4 h-4 text-blue-600" />
          <span>Top 15% Candidate Percentile</span>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Overall Readiness</p>
          <h3 className="text-3xl font-extrabold text-slate-900 mt-1">72%</h3>
          <p className="text-xs text-emerald-600 font-medium mt-1">↑ 18% improvement this week</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Total Solved</p>
          <h3 className="text-3xl font-extrabold text-slate-900 mt-1">128 Qs</h3>
          <p className="text-xs text-slate-400 font-medium mt-1">Target: 200 questions before Google</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Average Mock Score</p>
          <h3 className="text-3xl font-extrabold text-slate-900 mt-1">8.6 / 10</h3>
          <p className="text-xs text-blue-600 font-medium mt-1">Based on 6 evaluated mocks</p>
        </div>
      </div>

      {/* Skill Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Domain Proficiency Breakdown</h3>

        <div className="space-y-4 pt-2">
          {skills.map((s) => (
            <div key={s.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-800">{s.name}</span>
                <span className="text-slate-900">{s.score}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${s.color} transition-all duration-500`}
                  style={{ width: `${s.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
