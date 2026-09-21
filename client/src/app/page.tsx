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
  Upload,
  ExternalLink,
  SlidersHorizontal,
  CheckCircle2,
} from "lucide-react";

interface InterviewKit {
  id: number;
  company: string;
  role: string;
  logo: string;
  logoBg: string;
  logoColor: string;
  status: "In Progress" | "Completed" | "Not Started";
  tags: string[];
  progress: number;
  daysLeft: number;
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

  // Interview Kits State
  const [kits, setKits] = useState<InterviewKit[]>([
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
    },
  ]);

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
      },
      ...prev,
    ]);
  };

  return (
    <div suppressHydrationWarning className="space-y-6">
      {/* Top Universal Header */}
      <Header onOpenCreateKit={() => setIsModalOpen(true)} />

      {/* Greeting & Action Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Good morning, Harsh <span className="animate-wiggle">👋</span>
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Let&apos;s prepare for your next opportunity.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create New Interview Kit</span>
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

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Interview Kits */}
        <div className="bg-slate-50/70 hover:bg-white p-5 rounded-2xl border border-slate-150/80 hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center shadow-2xs">
              <FileText className="w-5 h-5" />
            </div>
            {/* Mini Blue Bar Chart Graphic */}
            <div className="flex items-end gap-1 h-7">
              <span className="w-1.5 h-3 bg-blue-200 rounded-xs" />
              <span className="w-1.5 h-4 bg-blue-300 rounded-xs" />
              <span className="w-1.5 h-5 bg-blue-400 rounded-xs" />
              <span className="w-1.5 h-7 bg-blue-600 rounded-xs" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{kits.length}</h3>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">Interview Kits</p>
            <p className="text-xs font-medium text-emerald-600 mt-1 flex items-center gap-1">
              <span>↑ 2 this month</span>
            </p>
          </div>
        </div>

        {/* Card 2: Questions Practiced */}
        <div className="bg-slate-50/70 hover:bg-white p-5 rounded-2xl border border-slate-150/80 hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center shadow-2xs">
              <Target className="w-5 h-5" />
            </div>
            {/* Mini Green Bar Chart Graphic */}
            <div className="flex items-end gap-1 h-7">
              <span className="w-1.5 h-2 bg-emerald-200 rounded-xs" />
              <span className="w-1.5 h-4 bg-emerald-300 rounded-xs" />
              <span className="w-1.5 h-6 bg-emerald-400 rounded-xs" />
              <span className="w-1.5 h-7 bg-emerald-500 rounded-xs" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">128</h3>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">Questions Practiced</p>
            <p className="text-xs font-medium text-emerald-600 mt-1 flex items-center gap-1">
              <span>↑ 24 this week</span>
            </p>
          </div>
        </div>

        {/* Card 3: Days Until Next Interview */}
        <div className="bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-yellow-50/50 hover:bg-white p-5 rounded-2xl border border-amber-150/80 hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-2xs">
              <Calendar className="w-5 h-5" />
            </div>
            {/* Subtle calendar badge */}
            <span className="text-[11px] font-bold text-orange-600 bg-orange-100/80 px-2 py-0.5 rounded-full">
              Next: Google
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">5</h3>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">Days Until Next Interview</p>
            <p className="text-xs font-semibold text-amber-600 mt-1">Stay consistent!</p>
          </div>
        </div>

        {/* Card 4: Overall Preparation */}
        <div className="bg-slate-50/70 hover:bg-white p-5 rounded-2xl border border-slate-150/80 hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-start justify-between">
            {/* Circular Purple Donut Gauge */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-purple-100"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-purple-600"
                  strokeDasharray="72, 100"
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-[10px] font-bold text-purple-700">72</span>
            </div>

            {/* Sparkline Wave */}
            <div className="w-16 h-7 flex items-center">
              <svg className="w-full h-6 text-purple-400" viewBox="0 0 60 20" fill="none">
                <path
                  d="M2 16 C 12 18, 20 4, 32 10 C 44 16, 50 2, 58 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">72%</h3>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">Overall Preparation</p>
            <p className="text-xs font-medium text-emerald-600 mt-1 flex items-center gap-1">
              <span>↑ 18% this week</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left 2 Columns & Right 1 Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side (8 Cols): Hero Banner & Interview Kits */}
        <div className="lg:col-span-8 space-y-6">
          {/* Hero Callout: Create Your Next Interview Kit */}
          <div className="relative rounded-3xl bg-gradient-to-br from-blue-50/90 via-sky-50/70 to-indigo-50/50 border border-blue-100/90 p-6 sm:p-8 overflow-hidden">
            {/* Subtle background ambient blob */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left text */}
              <div className="md:col-span-7 space-y-3.5 z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100/80 text-blue-700 rounded-full text-[11px] font-bold tracking-wide uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  GET STARTED
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Create Your Next <br className="hidden sm:inline" />
                  Interview Kit
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
                  Paste a job description, add the company website, and let AI
                  research, analyse and build your personalised preparation plan.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all active:scale-95"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Create New Interview Kit</span>
                  </button>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold rounded-full border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all"
                  >
                    <Upload className="w-4 h-4 text-slate-500" />
                    <span>Upload Multiple Jobs</span>
                  </button>
                </div>
              </div>

              {/* Right Visual Diagram Illustration */}
              <div className="md:col-span-5 relative flex items-center justify-center z-10">
                <div className="relative w-full max-w-[280px]">
                  {/* Floating Job Description Mock Card */}
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-800">Job Description</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    {/* Simulated Text Lines */}
                    <div className="space-y-1.5 py-2">
                      <div className="w-3/4 h-2 bg-slate-200 rounded-full" />
                      <div className="w-full h-2 bg-slate-100 rounded-full" />
                      <div className="w-5/6 h-2 bg-slate-100 rounded-full" />
                    </div>
                    {/* Pill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-medium rounded-md">
                        <ExternalLink className="w-2.5 h-2.5" /> Company Website
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 text-orange-700 text-[10px] font-medium rounded-md">
                        <Calendar className="w-2.5 h-2.5" /> Interview in 5 days
                      </span>
                    </div>
                  </div>

                  {/* AI Glowing Badge */}
                  <div className="absolute -bottom-3 -right-1 w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-black text-sm shadow-xl ring-4 ring-white animate-pulse">
                    AI
                  </div>

                  {/* Check List Callout */}
                  <div className="mt-3 p-3 bg-white/90 backdrop-blur-xs rounded-xl border border-blue-100 text-[11px] font-medium text-slate-700 space-y-1 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-blue-600 stroke-[3]" /> Company Research
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-blue-600 stroke-[3]" /> Role Analysis
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-blue-600 stroke-[3]" /> Question Bank &amp; Flashcards
                    </div>
                  </div>

                  {/* Handwritten Style Caption */}
                  <p className="text-right text-[11px] font-semibold italic text-blue-600/90 mt-1.5 font-serif">
                    Your AI Interview Companion
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lower Left Section: Your Interview Kits */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Your Interview Kits</h2>
              <Link
                href="/kits"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Kits Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {kits.map((kit) => (
                <div
                  key={kit.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Logo & Status Badge & Menu */}
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-10 h-10 rounded-xl ${kit.logoBg} ${kit.logoColor} flex items-center justify-center font-black text-lg shadow-2xs border border-slate-150`}
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
                          className="text-slate-400 hover:text-slate-600 p-0.5 rounded-sm"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Role & Company */}
                    <div className="mt-3">
                      <h3 className="font-bold text-slate-900 text-sm">{kit.role}</h3>
                      <p className="text-xs text-slate-500 font-medium">{kit.company}</p>
                    </div>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {kit.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-600 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom: Progress & Action */}
                  <div className="mt-5 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-1.5">
                      <span>{kit.daysLeft} days left</span>
                      <span className="font-bold text-slate-800">{kit.progress}%</span>
                    </div>

                    {/* Progress Bar */}
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

                    <Link
                      href={`/kits?id=${kit.id}`}
                      className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-blue-600 bg-blue-50/70 hover:bg-blue-100 rounded-xl transition-colors"
                    >
                      {kit.status === "Completed" ? "View Kit" : "Continue"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side (4 Cols): Today's Focus, Study Streak, Motivation */}
        <div className="lg:col-span-4 space-y-6">
          {/* Panel 1: Today's Focus */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Today&apos;s Focus</h3>
              <span className="text-xs text-slate-400 font-medium">Thu, 18 Sept</span>
            </div>

            {/* Checklist Items */}
            <div className="py-3 space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-start justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                        task.completed
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "border-slate-300 group-hover:border-blue-500"
                      }`}
                    >
                      {task.completed && <Check className="w-3 h-3 stroke-[3]" />}
                    </button>
                    <span
                      className={`text-xs font-medium ${
                        task.completed ? "line-through text-slate-400" : "text-slate-800"
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap">
                    {task.duration}
                  </span>
                </div>
              ))}
            </div>

            {/* Start Practice CTA */}
            <Link
              href="/practice"
              className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Practice</span>
            </Link>
          </div>

          {/* Panel 2: Study Streak */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Study Streak</span>
              </div>
              <span className="text-sm font-extrabold text-amber-600">6 days</span>
            </div>

            {/* Weekly Pills */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {[
                { day: "Mon", date: "15", active: false },
                { day: "Tue", date: "16", active: false },
                { day: "Wed", date: "17", active: false },
                { day: "Thu", date: "18", active: true },
                { day: "Fri", date: "19", active: false },
                { day: "Sat", date: "20", active: false },
                { day: "Sun", date: "21", active: false },
              ].map((item) => (
                <div key={item.day} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-slate-400 font-medium">{item.day}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      item.active
                        ? "bg-blue-600 text-white shadow-sm ring-2 ring-blue-100"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {item.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 3: Motivation Card with Mountain Illustration */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm bg-gradient-to-b from-sky-400 via-blue-600 to-indigo-900 text-white p-5 min-h-[170px] flex flex-col justify-between">
            {/* Mountain SVG Vector Graphic */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <svg
                viewBox="0 0 300 200"
                preserveAspectRatio="none"
                className="w-full h-full object-cover"
              >
                {/* Sun */}
                <circle cx="240" cy="50" r="22" fill="#FEF08A" opacity="0.9" />
                {/* Back Mountain */}
                <polygon points="120,70 20,200 220,200" fill="#1E40AF" opacity="0.5" />
                {/* Front Mountain with flag */}
                <polygon points="210,40 100,200 320,200" fill="#0F172A" opacity="0.7" />
                {/* Flag pole and pennant */}
                <line x1="210" y1="40" x2="210" y2="28" stroke="#FFFFFF" strokeWidth="2" />
                <polygon points="210,28 222,34 210,40" fill="#38BDF8" />
              </svg>
            </div>

            {/* Motivational Quote */}
            <div className="relative z-10 space-y-1">
              <p className="text-sm font-bold leading-snug tracking-tight drop-shadow-xs">
                Discipline today creates opportunities tomorrow.
              </p>
            </div>

            <div className="relative z-10">
              <p className="text-xs font-medium text-sky-100 drop-shadow-2xs">
                Keep going, Harsh!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Creating New Interview Kit */}
      <CreateKitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={handleKitCreated}
      />
    </div>
  );
}
