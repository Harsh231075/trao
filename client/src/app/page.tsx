"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import CreateKitModal from "@/components/CreateKitModal";
import {
  FileText,
  Target,
  Calendar,
  Sparkles,
  Plus,
  ArrowRight,
  MoreVertical,
  Play,
  Flame,
  Check,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Activity,
  ShieldAlert,
  ListTodo,
  Layers,
  SlidersHorizontal,
  ExternalLink,
} from "lucide-react";

interface InterviewQueueItem {
  id: number;
  candidate: string;
  avatar: string;
  avatarBg: string;
  role: string;
  reqCode: string;
  techStack: string;
  metric1Label: string;
  metric1Val: string;
  metric1Color: string;
  metric2Label: string;
  metric2Val: string;
  metric2Color: string;
  status: "Critical" | "Watch" | "Stable";
}

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Today's Focus Checklist State
  const [tasks, setTasks] = useState([
    { id: 1, title: "Practice 10 DSA questions", duration: "~ 15 min", completed: false },
    { id: 2, title: "Solve 5 system design questions", duration: "~ 25 min", completed: false },
    { id: 3, title: "Revise React concepts", duration: "~ 20 min", completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Queue Items matching Image 2 Table
  const [queueItems] = useState<InterviewQueueItem[]>([
    {
      id: 1,
      candidate: "Google Frontend Kit",
      avatar: "G",
      avatarBg: "bg-red-500 text-white",
      role: "Frontend Engineer (Google)",
      reqCode: "FE-204",
      techStack: "React + System Design",
      metric1Label: "SCORE",
      metric1Val: "64%",
      metric1Color: "text-red-500",
      metric2Label: "DAYS",
      metric2Val: "5d left",
      metric2Color: "text-red-500",
      status: "Critical",
    },
    {
      id: 2,
      candidate: "OpenAI Backend Kit",
      avatar: "❇",
      avatarBg: "bg-emerald-600 text-white",
      role: "Backend Engineer (OpenAI)",
      reqCode: "BE-102",
      techStack: "Node.js + Databases",
      metric1Label: "SCORE",
      metric1Val: "100%",
      metric1Color: "text-emerald-600",
      metric2Label: "DAYS",
      metric2Val: "12d left",
      metric2Color: "text-emerald-600",
      status: "Stable",
    },
    {
      id: 3,
      candidate: "Stripe Full Stack Kit",
      avatar: "S",
      avatarBg: "bg-indigo-600 text-white",
      role: "Full Stack Engineer (Stripe)",
      reqCode: "FS-412",
      techStack: "React + Node.js",
      metric1Label: "SCORE",
      metric1Val: "20%",
      metric1Color: "text-blue-600",
      metric2Label: "DAYS",
      metric2Val: "20d left",
      metric2Color: "text-blue-600",
      status: "Watch",
    },
    {
      id: 4,
      candidate: "Meta Product Engineer Kit",
      avatar: "M",
      avatarBg: "bg-blue-600 text-white",
      role: "Product Engineer (Meta)",
      reqCode: "PE-215",
      techStack: "GraphQL + Algorithms",
      metric1Label: "SCORE",
      metric1Val: "45%",
      metric1Color: "text-blue-600",
      metric2Label: "DAYS",
      metric2Val: "18d left",
      metric2Color: "text-blue-600",
      status: "Watch",
    },
    {
      id: 5,
      candidate: "Amazon System Architect",
      avatar: "A",
      avatarBg: "bg-amber-500 text-white",
      role: "System Architect (Amazon)",
      reqCode: "SA-305",
      techStack: "AWS + Microservices",
      metric1Label: "SCORE",
      metric1Val: "80%",
      metric1Color: "text-emerald-600",
      metric2Label: "DAYS",
      metric2Val: "8d left",
      metric2Color: "text-emerald-600",
      status: "Stable",
    },
  ]);

  return (
    <div suppressHydrationWarning className="space-y-6">
      {/* Top Universal Header */}
      <Header onOpenCreateKit={() => setIsModalOpen(true)} />

      {/* Greeting & Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Good Morning, Harsh 👋
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Personalized AI preparation companion &amp; queue monitor.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create New Kit</span>
          </button>
          <button
            type="button"
            className="p-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            title="Filter Settings"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top 4 Stat Cards matching Image 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Kits (Soft Blue) */}
        <div className="bg-blue-50/80 hover:bg-blue-100/60 p-5 rounded-2xl shadow-2xs hover:shadow-md transition-all relative overflow-hidden group border-0">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex items-end gap-1 h-7">
              <span className="w-1.5 h-3 bg-blue-200 rounded-xs" />
              <span className="w-1.5 h-4 bg-blue-300 rounded-xs" />
              <span className="w-1.5 h-5 bg-blue-400 rounded-xs" />
              <span className="w-1.5 h-7 bg-blue-600 rounded-xs" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">128</h3>
            <p className="text-xs font-semibold text-blue-700 mt-0.5">Active Questions</p>
          </div>
        </div>

        {/* Card 2: Urgent Cases (Soft Peach Alert) */}
        <div className="bg-rose-50/80 hover:bg-rose-100/60 p-5 rounded-2xl shadow-2xs hover:shadow-md transition-all relative overflow-hidden group border-0">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-white text-rose-500 flex items-center justify-center shadow-xs">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">07</h3>
            <p className="text-xs font-semibold text-rose-700 mt-0.5">7 Urgent Topics</p>
            <p className="text-xs font-medium text-rose-600 mt-1">
              ~ +2 in last hour
            </p>
          </div>
        </div>

        {/* Card 3: Pending Reviews (Soft Lime/Yellow matching Image 2) */}
        <div className="bg-[#f7fee7] hover:bg-[#ecfccb] p-5 rounded-2xl shadow-2xs hover:shadow-md transition-all relative overflow-hidden group border-0">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-white text-lime-700 flex items-center justify-center shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">14</h3>
            <p className="text-xs font-semibold text-lime-800 mt-0.5">Pending Reviews</p>
            <p className="text-xs font-medium text-lime-700 mt-1">
              6 completed • 14 remaining
            </p>
          </div>
        </div>

        {/* Card 4: AI Watchlist (Royal Blue Card matching Image 2) */}
        <div className="bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group border-0">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center shadow-2xs backdrop-blur-xs">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-white tracking-tight">23</h3>
            <p className="text-xs font-semibold text-blue-100 mt-0.5">Kits on AI Watchlist</p>
            <p className="text-xs font-medium text-blue-200 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>4 new insights</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left 8 Cols (Table Queue) & Right 4 Cols (Quick Actions + Distribution Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Priority Interview Queue Table Card */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-50/70 rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
            {/* Table Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Priority Interview Queue
              </h2>
              <Link
                href="/kits"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline"
              >
                View All
              </Link>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/60 text-[11px] font-bold text-blue-600 tracking-wider uppercase">
                    <th className="py-2.5 px-3">CANDIDATE / KIT</th>
                    <th className="py-2.5 px-3">REQ</th>
                    <th className="py-2.5 px-3">TECH STACK</th>
                    <th className="py-2.5 px-3">VITALS / METRICS</th>
                    <th className="py-2.5 px-3">STATUS</th>
                    <th className="py-2.5 px-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {queueItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-white/80 transition-colors group"
                    >
                      {/* Avatar & Candidate Name */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-full ${item.avatarBg} flex items-center justify-center font-black text-xs shadow-2xs shrink-0`}
                          >
                            {item.avatar}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 leading-tight">
                              {item.candidate}
                            </p>
                            <p className="text-[11px] text-slate-500 font-medium">
                              {item.role}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Requisition Code */}
                      <td className="py-3.5 px-3 font-semibold text-slate-700">
                        {item.reqCode}
                      </td>

                      {/* Tech Stack */}
                      <td className="py-3.5 px-3 font-medium text-slate-600">
                        {item.techStack}
                      </td>

                      {/* Vitals / Metrics */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3 text-[11px]">
                          <div>
                            <span className="text-slate-400 font-medium mr-1">
                              {item.metric1Label}
                            </span>
                            <span className={`font-extrabold ${item.metric1Color}`}>
                              {item.metric1Val}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-medium mr-1">
                              {item.metric2Label}
                            </span>
                            <span className={`font-extrabold ${item.metric2Color}`}>
                              {item.metric2Val}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Status Pill matching Image 2 */}
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold ${
                            item.status === "Critical"
                              ? "bg-rose-100/80 text-rose-700 border border-rose-200"
                              : item.status === "Watch"
                              ? "bg-blue-100/80 text-blue-700 border border-blue-200"
                              : "bg-emerald-100/80 text-emerald-700 border border-emerald-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.status === "Critical"
                                ? "bg-rose-500"
                                : item.status === "Watch"
                                ? "bg-blue-500"
                                : "bg-emerald-500"
                            }`}
                          />
                          {item.status}
                        </span>
                      </td>

                      {/* Action 3-dots */}
                      <td className="py-3.5 px-3 text-right">
                        <button
                          type="button"
                          className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom AI Summary Banner matching Image 2 */}
            <div className="bg-[#2563EB] text-white p-4 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">AI Summary</h4>
                  <p className="text-xs text-blue-100 font-medium">
                    7 interview topics need immediate attention. Early revision improves performance.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-900/40 hover:bg-blue-950/60 border border-white/20 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shrink-0"
              >
                <span>Review AI Insights</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Quick Actions & Interview Readiness Distribution */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Actions Card matching Image 2 */}
          <div className="bg-slate-50/70 rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm tracking-tight">
              Quick Actions
            </h3>

            <div className="space-y-3">
              {/* Action 1: Today's Practice Focus */}
              <Link
                href="/practice"
                className="bg-white p-3.5 rounded-2xl border border-slate-200/60 hover:border-blue-300 shadow-2xs hover:shadow-md transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-2xs">
                    <ListTodo className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      Today&apos;s Focus Tasks
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      3 tasks pending
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </Link>

              {/* Action 2: System Design Reviews */}
              <Link
                href="/practice"
                className="bg-white p-3.5 rounded-2xl border border-slate-200/60 hover:border-blue-300 shadow-2xs hover:shadow-md transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-2xs">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      System Design Reviews
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      5 require signature / review
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </Link>

              {/* Action 3: Upcoming Mock Appointments */}
              <Link
                href="/schedule"
                className="bg-white p-3.5 rounded-2xl border border-slate-200/60 hover:border-blue-300 shadow-2xs hover:shadow-md transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-2xs">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      Upcoming Mock Interviews
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Next at 11:30 AM IST
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Interview Readiness Distribution Donut Card matching Image 2 */}
          <div className="bg-slate-50/70 rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm tracking-tight">
              Candidate Readiness Distribution
            </h3>

            <div className="relative flex flex-col items-center justify-center py-4">
              {/* Multi-segmented Donut Arc Gauge */}
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 36 36">
                  {/* Outer Track */}
                  <path
                    className="text-slate-200"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Stable Segment (Blue 82%) */}
                  <path
                    className="text-blue-600"
                    strokeDasharray="82, 100"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Lime/Yellow Segment (13%) */}
                  <path
                    className="text-lime-500"
                    strokeDasharray="13, 100"
                    strokeDashoffset="-82"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Coral/Red Segment (5%) */}
                  <path
                    className="text-rose-500"
                    strokeDasharray="5, 100"
                    strokeDashoffset="-95"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>

                {/* Center Number matching Image 2 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-extrabold text-slate-900 leading-none">
                    128
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 mt-1">
                    Questions
                  </span>
                </div>
              </div>

              {/* Percentage callouts matching Image 2 */}
              <div className="w-full flex items-center justify-between text-xs font-bold pt-4 px-2">
                <div className="text-left">
                  <span className="block text-blue-600 text-sm">82%</span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Stable / High
                  </span>
                </div>

                <div className="text-center">
                  <span className="block text-lime-700 text-sm">13%</span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    In Watch
                  </span>
                </div>

                <div className="text-right">
                  <span className="block text-rose-600 text-sm">5%</span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Needs Review
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Creating New Interview Kit */}
      <CreateKitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
