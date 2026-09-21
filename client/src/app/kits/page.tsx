"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import CreateKitModal from "@/components/CreateKitModal";
import {
  Plus,
  Search,
  Filter,
  ArrowRight,
  MoreVertical,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";

export default function InterviewKitsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [kits, setKits] = useState([
    {
      id: 1,
      company: "Google",
      role: "Frontend Engineer",
      logo: "G",
      logoBg: "bg-red-50",
      logoColor: "text-red-500",
      status: "In Progress",
      tags: ["React", "JavaScript", "System Design"],
      progress: 64,
      daysLeft: 5,
      questionsCount: 45,
      interviewDate: "26 Sept 2026",
    },
    {
      id: 2,
      company: "OpenAI",
      role: "Backend Engineer",
      logo: "❇",
      logoBg: "bg-emerald-50",
      logoColor: "text-emerald-600",
      status: "Completed",
      tags: ["Node.js", "Databases", "APIs"],
      progress: 100,
      daysLeft: 12,
      questionsCount: 60,
      interviewDate: "03 Oct 2026",
    },
    {
      id: 3,
      company: "Stripe",
      role: "Full Stack Engineer",
      logo: "S",
      logoBg: "bg-indigo-50",
      logoColor: "text-indigo-600",
      status: "Not Started",
      tags: ["React", "Node.js", "System Design"],
      progress: 20,
      daysLeft: 20,
      questionsCount: 50,
      interviewDate: "11 Oct 2026",
    },
    {
      id: 4,
      company: "Meta",
      role: "Software Engineer - Product",
      logo: "M",
      logoBg: "bg-blue-50",
      logoColor: "text-blue-600",
      status: "In Progress",
      tags: ["GraphQL", "React", "Algorithms"],
      progress: 40,
      daysLeft: 18,
      questionsCount: 55,
      interviewDate: "09 Oct 2026",
    },
  ]);

  const filteredKits = kits.filter((k) => {
    const matchesFilter = activeFilter === "All" || k.status === activeFilter;
    const matchesSearch =
      k.company.toLowerCase().includes(search.toLowerCase()) ||
      k.role.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleKitCreated = (newKit: any) => {
    setKits((prev) => [
      {
        id: Date.now(),
        company: newKit.company,
        role: newKit.role,
        logo: newKit.company.charAt(0).toUpperCase(),
        logoBg: "bg-blue-50",
        logoColor: "text-blue-600",
        status: "In Progress",
        tags: newKit.tags || ["General", "System Design"],
        progress: 0,
        daysLeft: newKit.daysLeft || 7,
        questionsCount: 40,
        interviewDate: "Next Month",
      },
      ...prev,
    ]);
  };

  return (
    <div className="space-y-6">
      <Header onOpenCreateKit={() => setIsModalOpen(true)} />

      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Interview Kits
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage your company-specific preparation workspaces and study plans.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-full shadow-sm hover:shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Kit</span>
        </button>
      </div>

      {/* Filter Tabs & Local Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {["All", "In Progress", "Completed", "Not Started"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${
                activeFilter === tab
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full group">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-700 pointer-events-none" strokeWidth={1.8} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company or role..."
            className="w-full h-9 pl-10 pr-8 text-xs bg-white text-slate-800 placeholder:text-slate-500 placeholder:font-normal rounded-full border border-slate-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/80 transition-all"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              title="Clear search"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Kits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredKits.map((kit) => (
          <div
            key={kit.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div
                  className={`w-11 h-11 rounded-xl ${kit.logoBg} ${kit.logoColor} flex items-center justify-center font-black text-xl shadow-2xs border border-slate-150`}
                >
                  {kit.logo}
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      kit.status === "Completed"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : kit.status === "In Progress"
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    {kit.status}
                  </span>
                  <button
                    type="button"
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-sm"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-3.5">
                <h3 className="font-bold text-slate-900 text-base">{kit.role}</h3>
                <p className="text-xs font-semibold text-slate-500">{kit.company}</p>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{kit.interviewDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{kit.questionsCount} questions</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {kit.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-600 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1.5">
                <span>{kit.daysLeft} days left</span>
                <span className="font-bold text-slate-800">{kit.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full rounded-full ${
                    kit.status === "Completed"
                      ? "bg-emerald-500"
                      : kit.status === "In Progress"
                      ? "bg-blue-600"
                      : "bg-indigo-500"
                  }`}
                  style={{ width: `${kit.progress}%` }}
                />
              </div>

              <button className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-blue-600 bg-blue-50/70 hover:bg-blue-100 rounded-xl transition-colors">
                Open Workspace
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <CreateKitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={handleKitCreated}
      />
    </div>
  );
}
