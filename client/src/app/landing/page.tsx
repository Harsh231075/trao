"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  Settings,
  Users,
  Phone,
  FileText,
  Briefcase,
  BarChart3,
  TrendingUp,
  TrendingDown,
  LayoutGrid,
  Bookmark,
  MoreVertical,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Calendar,
  Mail,
  Globe,
  Share2,
  Send,
} from "lucide-react";

export default function LandingPage() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="w-full h-screen overflow-y-auto bg-gradient-to-br from-sky-100/80 via-blue-50/60 to-indigo-50/40 text-slate-800 antialiased selection:bg-blue-500 selection:text-white relative font-sans">

      {/* ─── AMBIENT SOFT LIGHT BLUE GLOW ORBS ─── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-300/30 via-sky-200/20 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-40 left-10 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-60 right-10 w-[450px] h-[450px] bg-sky-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Geometric Mesh Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.07] pointer-events-none -z-10" />

      {/* ─── FLOATING LIGHT-BLUE FROSTED NAVBAR ─── */}
      <header className="sticky top-4 sm:top-6 z-50 max-w-6xl mx-auto px-4">
        <nav className="bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_10px_35px_rgba(59,130,246,0.12)] rounded-full px-5 py-3 flex items-center justify-between transition-all">

          {/* Left Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              T
            </div> */}
            <span className="text-xl font-semibold tracking-tight text-slate-900">
              Trao<span className="text-blue-600">.ai</span>
            </span>
          </Link>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600">
            <Link href="#home" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
              Home
            </Link>
            <Link href="#about" className="hover:text-blue-600 transition-colors">
              About us
            </Link>
            <Link href="#features" className="hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#contact" className="hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <Link href="#jobs" className="hover:text-blue-600 transition-colors">
              Find Job
            </Link>
          </div>

          {/* Right Action Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium rounded-full shadow-md shadow-blue-500/20 transition-all hover:scale-105 cursor-pointer"
            >
              Join With Us
            </Link>
          </div>
        </nav>
      </header>

      {/* ─── HERO SECTION ─── */}
      <section id="home" className="pt-6 pb-3 sm:pt-8 sm:pb-4 px-4 text-center relative z-10 max-w-4xl mx-auto">

        {/* Compact Hero Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900 leading-tight max-w-3xl mx-auto">
          Find Your{" "}
          <span className="text-blue-600 font-medium underline decoration-blue-300/40">
            Dream Jobs
          </span>{" "}
          And plan your next future with us
        </h1>

        {/* Compact Hero Subtitle */}
        <p className="text-xs sm:text-sm text-slate-600 mt-2.5 max-w-xl mx-auto leading-relaxed font-normal">
          Connect with top employers and explore opportunities tailored to your skills.
        </p>

        {/* Compact Hero Action Buttons */}
        <div className="mt-4 sm:mt-5 flex items-center justify-center gap-3.5 flex-wrap">
          <Link
            href="/login"
            className="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm rounded-full shadow-md shadow-blue-500/20 transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
          >
            <span>Download The App</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href="#features"
            className="px-7 py-3 bg-white/90 hover:bg-white text-slate-800 font-medium text-xs sm:text-sm rounded-full border border-slate-200/80 shadow-xs transition-all hover:scale-105 backdrop-blur-sm cursor-pointer"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* ─── HERO PREVIEW CONTAINER WITH TILTED FLOATING MINI CARDS ─── */}
      <section className="max-w-6xl mx-auto px-4 relative pb-20">

        {/* ── LEFT FLOATING TILTED GLASS CARD (Total applicants) ── */}
        <div className="hidden lg:block absolute -left-2 sm:left-4 top-16 z-30 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/90 shadow-xl shadow-blue-500/10 transform -rotate-6 hover:rotate-0 transition-transform duration-300 w-52">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
            <MoreVertical className="w-4 h-4 text-slate-400 cursor-pointer" />
          </div>
          <p className="text-[11px] font-bold text-slate-500">Total applicants</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-black text-slate-900">+140</span>
            <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200/60">
              <TrendingUp className="w-3 h-3 mr-0.5" /> 40%
            </span>
          </div>
          <p className="text-[9px] text-slate-400 mt-1 font-medium">VS last month</p>
          {/* Mini Bar Chart Graphic */}
          <div className="flex items-end gap-1 h-6 mt-2 pt-1 border-t border-slate-100">
            <div className="w-full bg-amber-200 rounded-t h-2" />
            <div className="w-full bg-amber-300 rounded-t h-4" />
            <div className="w-full bg-amber-400 rounded-t h-3" />
            <div className="w-full bg-amber-500 rounded-t h-5" />
          </div>
        </div>

        {/* ── RIGHT FLOATING TILTED GLASS CARD (Total Interviewed + Candidate Tag) ── */}
        <div className="hidden lg:block absolute -right-2 sm:right-4 top-20 z-30 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/90 shadow-xl shadow-blue-500/10 transform rotate-6 hover:rotate-0 transition-transform duration-300 w-52">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <MoreVertical className="w-4 h-4 text-slate-400 cursor-pointer" />
          </div>
          <p className="text-[11px] font-bold text-slate-500">Total Interviewed</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-black text-slate-900">+100</span>
            <span className="inline-flex items-center text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-full border border-rose-200/60">
              <TrendingDown className="w-3 h-3 mr-0.5" /> 20%
            </span>
          </div>
          <p className="text-[9px] text-slate-400 mt-1 font-medium">VS last month</p>
          {/* Mini Bar Chart Graphic */}
          <div className="flex items-end gap-1 h-6 mt-2 pt-1 border-t border-slate-100">
            <div className="w-full bg-purple-200 rounded-t h-4" />
            <div className="w-full bg-purple-300 rounded-t h-2" />
            <div className="w-full bg-purple-400 rounded-t h-5" />
            <div className="w-full bg-purple-500 rounded-t h-3" />
          </div>

          {/* Overlapping Candidate Tag Pill */}
          <div className="absolute -bottom-3 -left-4 px-3 py-1.5 bg-blue-600 text-white text-[11px] font-extrabold rounded-full shadow-lg shadow-blue-500/30 border border-white/60">
            Jack Kalis
          </div>
        </div>

        {/* ── CENTRAL DASHBOARD PREVIEW MOCKUP ── */}
        <div className="bg-slate-50/95 rounded-[28px] sm:rounded-[36px] border-4 border-white/90 shadow-[0_30px_100px_rgba(59,130,246,0.18)] overflow-hidden flex flex-col md:flex-row text-slate-800 max-w-5xl mx-auto my-4 transition-all">

          {/* ── LEFT ICON SIDEBAR ── */}
          <div className="w-full md:w-16 bg-white border-b md:border-b-0 md:border-r border-slate-200/60 p-3 md:py-6 flex md:flex-col items-center justify-between shrink-0">
            <div className="flex md:flex-col items-center gap-5">
              {/* Brand Logo Icon */}
              <div className="w-9 h-9 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-blue-500/20">
                T
              </div>
              <div className="h-px w-full bg-slate-100 hidden md:block" />
              {/* Navigation Rail Icons */}
              <button className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors">
                <Users className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors">
                <Phone className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors">
                <FileText className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors">
                <Briefcase className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors">
                <BarChart3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── MAIN DASHBOARD CONTENT BODY ── */}
          <div className="flex-1 p-4 sm:p-7 flex flex-col gap-6 bg-slate-50/50">

            {/* Top Search & User Profile Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Good Morning Alexandar</h3>
                <p className="text-xs text-slate-400 font-medium">Here is the current status for today</p>
              </div>

              {/* Center Search Input */}
              <div className="w-full sm:w-64 relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Anything Here..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200/80 rounded-full text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs font-medium"
                />
              </div>

              {/* Right Profile & Notifications */}
              <div className="flex items-center gap-3 shrink-0">
                <button className="w-8 h-8 rounded-full bg-white border border-slate-200/80 text-slate-500 flex items-center justify-center shadow-xs">
                  <Settings className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-white border border-slate-200/80 text-slate-500 flex items-center justify-center shadow-xs relative">
                  <Bell className="w-4 h-4" />
                  <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1 right-1" />
                </button>

                {/* Avatar Badge */}
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    AP
                  </div>
                  <div className="hidden xl:block text-left text-xs">
                    <p className="font-bold text-slate-900 leading-tight">Alexandar Paul</p>
                    <p className="text-[10px] text-slate-400 leading-tight">UI/UX Designer</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            </div>

            {/* 3 Metric Stat Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">

              {/* Card 1 */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-600">Total applicants</span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-xl font-black text-slate-900">+140</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200/60">
                      +40%
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 font-medium">VS last month</p>
                </div>
                <MoreVertical className="w-4 h-4 text-slate-300" />
              </div>

              {/* Card 2 */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-600">Total Interviewed</span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-xl font-black text-slate-900">+100</span>
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-full border border-rose-200/60">
                      -20%
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 font-medium">VS last month</p>
                </div>
                <MoreVertical className="w-4 h-4 text-slate-300" />
              </div>

              {/* Card 3 */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Briefcase className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-600">Total Job Offers</span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-xl font-black text-slate-900">+20</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200/60">
                      +50%
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 font-medium">VS last month</p>
                </div>
                <MoreVertical className="w-4 h-4 text-slate-300" />
              </div>
            </div>

            {/* Lower Split Layout: Chart + Jobs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

              {/* Left Column: Vacancy Statistics Bar Chart (7 Cols) */}
              <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-black text-slate-900">Vacancy Statistics</h4>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Application Sent
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Interviewed
                    </span>
                  </div>
                </div>

                {/* Custom CSS Bar Chart Visualizer matching reference image */}
                <div className="relative pt-6 pb-2">

                  {/* Floating Tooltip Box over Active Bar */}
                  <div className="absolute top-0 left-[52%] -translate-x-1/2 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-md z-10 flex flex-col gap-0.5">
                    <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Application Sent: 28</p>
                    <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Interviewed: 24</p>
                  </div>

                  {/* Vertical Bars */}
                  <div className="flex items-end justify-between gap-1.5 h-36 border-b border-slate-100 px-2">
                    {[
                      { m: "Jan", h1: 15, h2: 10 },
                      { m: "Feb", h1: 22, h2: 14 },
                      { m: "Mar", h1: 18, h2: 12 },
                      { m: "Apr", h1: 25, h2: 18 },
                      { m: "May", h1: 20, h2: 15 },
                      { m: "Jun", h1: 32, h2: 26, active: true },
                      { m: "Jul", h1: 28, h2: 22 },
                      { m: "Aug", h1: 24, h2: 19 },
                      { m: "Sep", h1: 29, h2: 21 },
                      { m: "Oct", h1: 26, h2: 17 },
                      { m: "Nov", h1: 21, h2: 15 },
                      { m: "Dec", h1: 19, h2: 13 },
                    ].map((item) => (
                      <div key={item.m} className="flex-1 flex flex-col items-center gap-1 group cursor-pointer">
                        <div className="w-full flex items-end justify-center gap-0.5 h-32 relative">
                          <div
                            className={`w-2.5 rounded-t-full transition-all ${item.active ? "bg-blue-600 shadow-md shadow-blue-500/30" : "bg-blue-200/80 group-hover:bg-blue-400"
                              }`}
                            style={{ height: `${item.h1 * 3}px` }}
                          />
                          <div
                            className={`w-2.5 rounded-t-full transition-all ${item.active ? "bg-amber-500 shadow-md" : "bg-amber-200/80 group-hover:bg-amber-400"
                              }`}
                            style={{ height: `${item.h2 * 3}px` }}
                          />
                        </div>
                        <span className={`text-[10px] font-bold ${item.active ? "text-blue-600 font-extrabold" : "text-slate-400"}`}>
                          {item.m}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Recommended Jobs (5 Cols) */}
              <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs flex flex-col gap-3.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-slate-900">Recommended Jobs</h4>
                  <MoreVertical className="w-4 h-4 text-slate-300" />
                </div>

                {/* Job Card 1: Google */}
                <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center font-black text-blue-600 text-sm">
                        G
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-900 leading-tight">Google</h5>
                        <p className="text-[10px] text-slate-400 leading-tight">Hanric Office</p>
                      </div>
                    </div>
                    <Bookmark className="w-4 h-4 text-slate-300 hover:text-blue-600 cursor-pointer" />
                  </div>

                  <div>
                    <p className="text-xs font-extrabold text-slate-900">Lead UI/UX Designer</p>
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      <span className="px-2 py-0.5 bg-white border border-slate-200/80 rounded-full text-[10px] font-bold text-slate-600">Full Time</span>
                      <span className="px-2 py-0.5 bg-white border border-slate-200/80 rounded-full text-[10px] font-bold text-slate-600">Remote</span>
                      <span className="px-2 py-0.5 bg-white border border-slate-200/80 rounded-full text-[10px] font-bold text-slate-600">Part Time</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                    <span className="text-xs font-black text-slate-900">$70K-$90K <span className="text-[10px] font-normal text-slate-400">/ Year</span></span>
                    <button className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-full transition-colors flex items-center gap-1">
                      <span>Apply</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Job Card 2: Dribbble */}
                <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-pink-500 text-white shadow-xs flex items-center justify-center font-black text-sm">
                        d
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-900 leading-tight">Dribbble</h5>
                        <p className="text-[10px] text-slate-400 leading-tight">Northam Office</p>
                      </div>
                    </div>
                    <Bookmark className="w-4 h-4 text-slate-300 hover:text-blue-600 cursor-pointer" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
      {/* ─── AI PIPELINE ROADMAP & STAGE ASSET SHOWCASE ─── */}
      <section id="roadmap" className="py-16 px-4 max-w-6xl mx-auto z-10 relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
            AI PIPELINE ROADMAP
          </p>
          <h2 className="text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
            From job description to decision-ready.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 font-normal">
            A clear 5-step automated generation process, with AI precision at every step.
          </p>
        </div>

        {/* ── DESKTOP DOUBLE-WAVE ROADMAP TRACK (VISIBLE ON LG SCREENS) ── */}
        <div className="hidden lg:block relative w-full my-6 min-h-[380px]">

          {/* SVG Double-Wave Highway Track with Symmetrical Crests & Troughs */}
          <div className="w-full relative z-0 py-10">
            <svg viewBox="0 0 1000 210" fill="none" className="w-full h-auto drop-shadow-md">
              {/* Outer Dark Highway Track */}
              <path
                d="M 60 140 C 160 140, 180 40, 280 40 C 380 40, 400 170, 500 170 C 600 170, 620 40, 720 40 C 820 40, 840 140, 940 140"
                stroke="#1e293b"
                strokeWidth="26"
                strokeLinecap="round"
              />
              {/* Inner Dashed Lane Divider */}
              <path
                d="M 60 140 C 160 140, 180 40, 280 40 C 380 40, 400 170, 500 170 C 600 170, 620 40, 720 40 C 820 40, 840 140, 940 140"
                stroke="#ffffff"
                strokeWidth="4"
                strokeDasharray="10 10"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* NODE 01: Research (Trough 1, Left 6%, Top 62%) */}
          <div
            onClick={() => setActiveStage(0)}
            className="absolute left-[6%] top-[62%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer group"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${activeStage === 0
              ? "bg-blue-600 text-white ring-4 ring-blue-400/50 shadow-lg scale-110"
              : "bg-white border-2 border-slate-200 text-blue-600 shadow-md group-hover:scale-105 group-hover:border-blue-400"
              }`}>
              01
            </div>
            {/* Text Below */}
            <div className="mt-3 text-center w-48">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">RESEARCH</p>
              <h4 className="text-xs font-semibold text-slate-900 mt-0.5">Scrape Company Signals</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug font-normal">
                Scraping company tech stacks, engineering blogs &amp; insights.
              </p>
            </div>
          </div>

          {/* NODE 02: Extract (Crest 1, Left 28%, Top 18%) */}
          <div
            onClick={() => setActiveStage(1)}
            className="absolute left-[28%] top-[18%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer group"
          >
            {/* Text Above */}
            <div className="mb-3 text-center w-48">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">EXTRACT</p>
              <h4 className="text-xs font-semibold text-slate-900 mt-0.5">Parse Job Requirements</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug font-normal">
                Parsing MUST vs NICE skills directly from the job description.
              </p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${activeStage === 1
              ? "bg-blue-600 text-white ring-4 ring-blue-400/50 shadow-lg scale-110"
              : "bg-white border-2 border-slate-200 text-blue-600 shadow-md group-hover:scale-105 group-hover:border-blue-400"
              }`}>
              02
            </div>
          </div>

          {/* NODE 03: Synthesize (Trough 2, Left 50%, Top 76%) */}
          <div
            onClick={() => setActiveStage(2)}
            className="absolute left-[50%] top-[76%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer group"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${activeStage === 2
              ? "bg-blue-600 text-white ring-4 ring-blue-400/50 shadow-lg scale-110"
              : "bg-white border-2 border-slate-200 text-blue-600 shadow-md group-hover:scale-105 group-hover:border-blue-400"
              }`}>
              03
            </div>
            {/* Text Below */}
            <div className="mt-3 text-center w-48">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">SYNTHESIZE</p>
              <h4 className="text-xs font-semibold text-slate-900 mt-0.5">Generate Questions</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug font-normal">
                Synthesizing technical, system design &amp; behavioral questions.
              </p>
            </div>
          </div>

          {/* NODE 04: Audit (Crest 2, Left 72%, Top 18%) */}
          <div
            onClick={() => setActiveStage(3)}
            className="absolute left-[72%] top-[18%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer group"
          >
            {/* Text Above */}
            <div className="mb-3 text-center w-48">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">AUDIT</p>
              <h4 className="text-xs font-semibold text-slate-900 mt-0.5">Coverage Verification</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug font-normal">
                Automated multi-pass audit verifying 100% requirement coverage.
              </p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${activeStage === 3
              ? "bg-blue-600 text-white ring-4 ring-blue-400/50 shadow-lg scale-110"
              : "bg-white border-2 border-slate-200 text-blue-600 shadow-md group-hover:scale-105 group-hover:border-blue-400"
              }`}>
              04
            </div>
          </div>

          {/* NODE 05: Schedule (Trough 3, Left 94%, Top 62%) */}
          <div
            onClick={() => setActiveStage(4)}
            className="absolute left-[94%] top-[62%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer group"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${activeStage === 4
              ? "bg-blue-600 text-white ring-4 ring-blue-400/50 shadow-lg scale-110"
              : "bg-white border-2 border-slate-200 text-blue-600 shadow-md group-hover:scale-105 group-hover:border-blue-400"
              }`}>
              05
            </div>
            {/* Text Below */}
            <div className="mt-3 text-center w-48">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">FINALIZE</p>
              <h4 className="text-xs font-semibold text-slate-900 mt-0.5">Build Study Schedule</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug font-normal">
                Structuring day-by-day practice timeline &amp; flashcards.
              </p>
            </div>
          </div>
        </div>

        {/* ── MOBILE / TABLET RESPONSIVE STEPPER BAR ── */}
        <div className="lg:hidden grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
          {[
            { step: "01", name: "Research" },
            { step: "02", name: "Extract" },
            { step: "03", name: "Synthesize" },
            { step: "04", name: "Audit" },
            { step: "05", name: "Finalize" },
          ].map((st, idx) => (
            <button
              key={st.step}
              onClick={() => setActiveStage(idx)}
              className={`p-3 rounded-xl text-center border text-xs font-semibold transition-all ${activeStage === idx
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white/80 text-slate-700 border-slate-200 hover:bg-blue-50"
                }`}
            >
              <span className="block text-[10px] opacity-80 uppercase">Step {st.step}</span>
              {st.name}
            </button>
          ))}
        </div>

        {/* ─── DYNAMIC INTERACTIVE STAGE ASSET OUTPUT SHOWCASE ─── */}
        <div className="mt-6 bg-white/90 backdrop-blur-xl rounded-3xl border border-blue-200/80 p-6 sm:p-8 shadow-xl shadow-blue-500/5 transition-all">

          {/* Top Stage Header & Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                0{activeStage + 1}
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  {["STAGE 01 • COMPANY RESEARCH", "STAGE 02 • JD REQUIREMENT PARSER", "STAGE 03 • AI QUESTION SYNTHESIS", "STAGE 04 • 100% COVERAGE AUDIT", "STAGE 05 • FINALIZE STUDY SCHEDULE"][activeStage]}
                </p>
                <h3 className="text-lg font-semibold text-slate-900">
                  {["Scraping Real-Time Company Signals", "Parsing Skill Matrices & Priorities", "Synthesizing AI Question Bank", "Automated Multi-Pass Verification", "Generating Spaced Study Plan & Flashcards"][activeStage]}
                </h3>
              </div>
            </div>

            {/* Quick Stage Switcher Pills */}
            <div className="flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 text-xs font-medium">
              {["01 Research", "02 Extract", "03 Synthesize", "04 Audit", "05 Finalize"].map((label, idx) => (
                <button
                  key={label}
                  onClick={() => setActiveStage(idx)}
                  className={`px-3 py-1.5 rounded-full transition-all text-[11px] font-semibold ${activeStage === idx
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-blue-600 hover:bg-white/60"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Stage Specific Asset UI Output Content */}
          <div className="pt-6">

            {/* STAGE 01: RESEARCH ASSET */}
            {activeStage === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span>Company Tech Stack</span>
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Node.js", "TypeScript", "React", "PostgreSQL", "Kafka", "Docker", "AWS"].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-blue-100/70 text-blue-700 font-medium text-xs border border-blue-200/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span>Engineering Culture Signals</span>
                    <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5 font-normal">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> High concurrency &amp; low-latency focus</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Strong system idempotency standards</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Cross-functional technical leadership</li>
                  </ul>
                </div>

                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span>Interview Insights Scraped</span>
                    <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">System Design Weight</span>
                      <span className="font-bold text-slate-900">45%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full w-[45%]" />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Behavioral STAR Weight</span>
                      <span className="font-bold text-slate-900">35%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-sky-500 h-full w-[35%]" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 02: EXTRACT ASSET */}
            {activeStage === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/60">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-md">MUST-HAVE REQUIREMENTS</span>
                    <span className="text-xs text-slate-400 font-medium">Extracted with 100% Precision</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 font-normal">
                    <li className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="font-medium text-slate-900">Distributed Microservices Architecture</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">REQUIRED</span>
                    </li>
                    <li className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="font-medium text-slate-900">SQL Optimization &amp; Index Tuning</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">REQUIRED</span>
                    </li>
                    <li className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="font-medium text-slate-900">Asynchronous Job Queues (Redis/RabbitMQ)</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">REQUIRED</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/60">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-700 bg-slate-200 px-2.5 py-1 rounded-md">NICE-TO-HAVE SKILLS</span>
                    <span className="text-xs text-slate-400 font-medium">Bonus Scoring Criteria</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 font-normal">
                    <li className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="font-medium text-slate-900">GraphQL Federation Schemas</span>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">BONUS</span>
                    </li>
                    <li className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="font-medium text-slate-900">Kubernetes Helm Deployments</span>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">BONUS</span>
                    </li>
                    <li className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="font-medium text-slate-900">Prometheus Telemetry Monitoring</span>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">BONUS</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* STAGE 03: SYNTHESIZE ASSET */}
            {activeStage === 2 && (
              <div className="space-y-3">
                <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-[10px]">TECHNICAL</span>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-900">Design an Idempotent Payment Queue System</h4>
                      <p className="text-[11px] text-slate-500">Handling 50,000 requests/sec with zero duplicate charges</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200 shrink-0">HARD • SYSTEM DESIGN</span>
                </div>

                <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-lg bg-sky-500 text-white font-bold text-[10px]">BEHAVIORAL</span>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-900">Describe a Production Downtime Incident You Resolved</h4>
                      <p className="text-[11px] text-slate-500">Using the STAR Method (Situation, Task, Action, Result)</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold border border-blue-200 shrink-0">MEDIUM • LEADERSHIP</span>
                </div>

                <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold text-[10px]">COMPANY FIT</span>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-900">How Do You Prioritize Tech Debt vs Feature Delivery?</h4>
                      <p className="text-[11px] text-slate-500">Tailored specifically to target company's engineering values</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 shrink-0">CULTURE FIT</span>
                </div>
              </div>
            )}

            {/* STAGE 04: AUDIT ASSET */}
            {activeStage === 3 && (
              <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/60">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-200/60">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-slate-900">Multi-Pass Quality Audit Shield</h4>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-md">VERIFIED</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">Automated AI auditor verified 100% mapping against job requirements</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-emerald-600">100%</span>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">REQUIREMENT COVERAGE</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-4">
                  {[
                    { label: "Technical Skills", status: "100% Passed" },
                    { label: "System Architecture", status: "100% Passed" },
                    { label: "Behavioral Prompts", status: "100% Passed" },
                    { label: "Company Alignment", status: "100% Passed" },
                  ].map((chk) => (
                    <div key={chk.label} className="p-3 bg-white rounded-xl border border-slate-200/70 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <div>
                        <p className="text-[11px] font-semibold text-slate-800">{chk.label}</p>
                        <p className="text-[10px] text-emerald-600 font-bold">{chk.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STAGE 05: FINALIZE ASSET */}
            {activeStage === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/60">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> 7-DAY STUDY PLAN TIMELINE
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">READY TO EXPORT</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="font-semibold text-slate-800">Day 1 - 2: System Architecture &amp; Scalability</span>
                      <span className="text-[10px] font-bold text-blue-600">3 MODULES</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="font-semibold text-slate-800">Day 3 - 4: Data Structures &amp; Coding Drills</span>
                      <span className="text-[10px] font-bold text-blue-600">4 MODULES</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="font-semibold text-slate-800">Day 5 - 6: STAR Behavioral Mock Practice</span>
                      <span className="text-[10px] font-bold text-blue-600">2 MODULES</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/60 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
                        <Layers className="w-4 h-4" /> SPACED FLASHCARDS DECK
                      </span>
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">24 CARDS</span>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl shadow-md">
                      <span className="text-[9px] font-bold tracking-widest uppercase text-blue-200">FLASHCARD PREVIEW</span>
                      <h4 className="text-xs sm:text-sm font-semibold mt-1">What is the difference between Optimistic &amp; Pessimistic Locking?</h4>
                      <p className="text-[10px] text-blue-100 mt-2 font-normal">Click to flip answer during review mode</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-normal">
                    <span>Target Readiness Score</span>
                    <span className="font-bold text-emerald-600">94% Prepared</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Pipeline Tagline */}
        <p className="text-center text-xs text-slate-400 font-normal mt-10">
          AI kit generation executes end-to-end in ~15 seconds with 100% deterministic requirement coverage.
        </p>
      </section>

      {/* ─── FEATURES & VALUE PROPOSITION SECTION ─── */}
      <section id="features" className="py-16 px-4 max-w-6xl mx-auto border-t border-blue-200/40 z-10 relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100/70 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-3">
            Why Top Candidates Choose Trao
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
            Engineered for <span className="text-blue-600 font-medium">Interview Success</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
            Everything you need to master technical, behavioral, and system design interviews in one AI-powered platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Feature 1 */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white/90 shadow-md shadow-blue-500/5 hover:scale-105 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Real-Time Company Research</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">
              Automatically scrape tech stacks, careers context, and recent public signals to ground every practice question.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white/90 shadow-md shadow-blue-500/5 hover:scale-105 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">5-Stage AI Synthesis</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">
              From requirement extraction to 100% coverage audits, get tailored questions linked directly to job description requirements.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white/90 shadow-md shadow-blue-500/5 hover:scale-105 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Day-by-Day Study Schedule</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">
              Structured daily study timeline matching your available preparation days to ensure 100% readiness before interview day.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FLOATING CARD FOOTER (MIDNIGHT BLUE THEME WITH PERFECT SPACING) ─── */}
      <footer className="max-w-7xl mx-auto my-12 px-4 z-10 relative">
        <div className="bg-[#0B172C] rounded-[36px] sm:rounded-[44px] border border-blue-900/50 shadow-[0_30px_90px_rgba(11,23,44,0.4)] text-white p-6 sm:p-12 relative overflow-hidden">

          {/* Ambient Blue Radial Glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* ── TOP 5-COLUMN GRID (3 + 2 + 2 + 2 + 3 = 12) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 relative z-10 pb-10">

            {/* Column 1: Brand & Mission (3 Cols) */}
            <div className="lg:col-span-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold tracking-tight text-white">
                    Trao<span className="text-blue-400">.ai</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium mt-3">
                  Empowering software engineers and candidates to master interviews with AI-generated kits, real-time company research, and structured practice schedules.
                </p>
              </div>

              {/* 3 Pill Badges */}
              <div className="flex items-center gap-2 mt-6 flex-wrap">
                <span className="px-3.5 py-1.5 bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Research
                </span>
                <span className="px-3.5 py-1.5 bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-xs">
                  <Zap className="w-3.5 h-3.5 text-blue-400" /> Synthesis
                </span>
                <span className="px-3.5 py-1.5 bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Mastery
                </span>
              </div>
            </div>

            {/* Column 2: EXPLORE (2 Cols) */}
            <div className="lg:col-span-2">
              <h5 className="text-[11px] font-bold uppercase tracking-widest text-blue-400 mb-4">
                EXPLORE
              </h5>
              <ul className="space-y-3 text-xs sm:text-sm font-semibold text-slate-300">
                <li><Link href="#home" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="#roadmap" className="hover:text-white transition-colors">AI Pipeline</Link></li>
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Prep Kits</Link></li>
              </ul>
            </div>

            {/* Column 3: RESOURCES (2 Cols) */}
            <div className="lg:col-span-2">
              <h5 className="text-[11px] font-bold uppercase tracking-widest text-blue-400 mb-4">
                RESOURCES
              </h5>
              <ul className="space-y-3 text-xs sm:text-sm font-semibold text-slate-300">
                <li><Link href="/practice" className="hover:text-white transition-colors">Question Bank</Link></li>
                <li><Link href="/practice" className="hover:text-white transition-colors">Flashcards</Link></li>
                <li><Link href="/schedule" className="hover:text-white transition-colors">Study Schedule</Link></li>
                <li><Link href="/analytics" className="hover:text-white transition-colors">Analytics</Link></li>
              </ul>
            </div>

            {/* Column 4: LEGAL (2 Cols) */}
            <div className="lg:col-span-2">
              <h5 className="text-[11px] font-bold uppercase tracking-widest text-blue-400 mb-4">
                LEGAL
              </h5>
              <ul className="space-y-3 text-xs sm:text-sm font-semibold text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Column 5: STAY CONNECTED & VIBRANT BLUE ACTION BUTTON (3 Cols) */}
            <div className="lg:col-span-3 flex flex-col justify-between">
              <div>
                <h5 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2 mb-2 whitespace-nowrap">
                  Stay Connected <Sparkles className="w-4 h-4 text-blue-400" />
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  Get updates on new interview question patterns, tech stack signals, and product releases.
                </p>

                {/* Newsletter Input + Solid Blue Action Button */}
                <div className="mt-4 flex items-center bg-[#050e1c] border border-blue-900/60 rounded-full p-1.5 shadow-inner">
                  <Mail className="w-4 h-4 text-blue-400 ml-2.5 shrink-0" />
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="bg-transparent px-2.5 py-1.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none w-full font-medium"
                  />
                  <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-full shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5 cursor-pointer shrink-0">
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">No spam. Only high-value interview tips.</p>
              </div>
            </div>

          </div>

          {/* ── BOTTOM DIVIDER & COPYRIGHT ROW ── */}
          <div className="pt-6 border-t border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium relative z-10">
            <p>&copy; {new Date().getFullYear()} Trao.ai Platform. All rights reserved.</p>

            {/* Center Tagline */}
            <div className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest text-[10px]">
              <span className="w-8 h-px bg-blue-900" />
              <span>⚡ TAILORED FOR YOUR CAREER</span>
              <span className="w-8 h-px bg-blue-900" />
            </div>

            {/* Right Social Icons */}
            <div className="flex items-center gap-2">
              <a href="#" title="Website" className="w-9 h-9 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-xs">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" title="Share" className="w-9 h-9 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-xs">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" title="Contact" className="w-9 h-9 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-xs">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
