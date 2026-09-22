"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { BookOpen, Sparkles, Download, ExternalLink, FileText, Layers } from "lucide-react";

export default function ResourcesPage() {
  const resources = [
    {
      id: 1,
      title: "Google Front-End System Design Blueprint",
      type: "Architectural Guide",
      pages: "18 pages",
      category: "System Design",
      downloads: "1.4k",
    },
    {
      id: 2,
      title: "React 19 & Next.js Core Concepts Flashcards (120 Cards)",
      type: "AI Flashcards",
      pages: "120 cards",
      category: "Frontend",
      downloads: "2.8k",
    },
    {
      id: 3,
      title: "Stripe API Design Principles & Idempotency Guide",
      type: "Company Cheat Sheet",
      pages: "12 pages",
      category: "Backend",
      downloads: "950",
    },
    {
      id: 4,
      title: "Comprehensive DSA Cheat Sheet: Graphs & Dynamic Programming",
      type: "Reference Manual",
      pages: "24 pages",
      category: "Algorithms",
      downloads: "4.1k",
    },
  ];

  return (
    <div className="space-y-6">
      <Header />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Study Resources &amp; Guides
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            AI-synthesized flashcards, company-specific cheat sheets, and system design templates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {resources.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {res.category}
                </span>
                <span className="text-xs text-slate-400">{res.downloads} learners used</span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{res.title}</h3>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-slate-400" /> {res.type}
                </span>
                <span>•</span>
                <span>{res.pages}</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700">
                <ExternalLink className="w-3.5 h-3.5" /> Read Online
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                <Download className="w-3.5 h-3.5" /> PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
