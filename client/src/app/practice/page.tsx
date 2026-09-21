"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { Play, CheckCircle2, Clock, Code2, Sparkles, Filter, ChevronRight, BookOpen } from "lucide-react";

export default function PracticePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const questions = [
    {
      id: 1,
      title: "Design a Rate Limiter with Sliding Window Counter",
      category: "System Design",
      difficulty: "Medium",
      company: "Stripe",
      time: "25 min",
      completed: false,
    },
    {
      id: 2,
      title: "Implement Custom React useMemo & useCallback Hooks",
      category: "React & Frontend",
      difficulty: "Hard",
      company: "Google",
      time: "30 min",
      completed: true,
    },
    {
      id: 3,
      title: "LRU Cache Implementation with Doubly Linked List",
      category: "Data Structures & Algorithms",
      difficulty: "Medium",
      company: "OpenAI",
      time: "20 min",
      completed: true,
    },
    {
      id: 4,
      title: "Microservices Event-Driven Architecture with Kafka",
      category: "System Design",
      difficulty: "Hard",
      company: "Uber",
      time: "40 min",
      completed: false,
    },
    {
      id: 5,
      title: "Virtual DOM Reconciliation & Fiber Architecture Explanation",
      category: "React & Frontend",
      difficulty: "Medium",
      company: "Meta",
      time: "15 min",
      completed: false,
    },
  ];

  const filteredQuestions = questions.filter((q) => {
    const matchCat = activeCategory === "All" || q.category === activeCategory;
    const matchDiff = selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
    return matchCat && matchDiff;
  });

  return (
    <div className="space-y-6">
      <Header />

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Practice &amp; Question Bank
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Targeted technical interview questions curated by AI from recent interview rounds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>2 / 5 Today&apos;s Goal Completed</span>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-100">
        {["All", "Data Structures & Algorithms", "System Design", "React & Frontend"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
              activeCategory === cat
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    q.difficulty === "Easy"
                      ? "bg-emerald-50 text-emerald-700"
                      : q.difficulty === "Medium"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-rose-50 text-rose-700"
                  }`}
                >
                  {q.difficulty}
                </span>
                <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {q.category}
                </span>
                <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {q.company}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{q.title}</h3>

              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {q.time}
                </span>
                <span>•</span>
                <span>{q.completed ? "Completed" : "Not yet attempted"}</span>
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors self-start sm:self-auto shrink-0">
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{q.completed ? "Review Solution" : "Solve Challenge"}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
