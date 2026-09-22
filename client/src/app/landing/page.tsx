"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  Settings,
  User,
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
      <section id="roadmap" className="py-16 px-4 max-w-6xl mx-auto z-10 relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
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

        {/* ── DESKTOP WAVY ROADMAP TRACK (VISIBLE ON LG SCREENS) ── */}
        <div className="hidden lg:block relative w-full my-8 min-h-[420px]">

          {/* SVG Curved Highway Track */}
          <div className="w-full relative z-0 py-12">
            <svg viewBox="0 0 1000 220" fill="none" className="w-full h-auto drop-shadow-md">
              {/* Outer Track */}
              <path
                d="M 80 140 C 180 140, 220 40, 340 40 C 460 40, 500 170, 620 170 C 740 170, 780 70, 920 70"
                stroke="#1e293b"
                strokeWidth="28"
                strokeLinecap="round"
              />
              {/* Inner Dashed Line */}
              <path
                d="M 80 140 C 180 140, 220 40, 340 40 C 460 40, 500 170, 620 170 C 740 170, 780 70, 920 70"
                stroke="#ffffff"
                strokeWidth="4"
                strokeDasharray="10 10"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* NODE 01: Research (Bottom Left) */}
          <div className="absolute left-[8%] top-[62%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 shadow-xl flex items-center justify-center font-bold text-blue-600 text-sm ring-4 ring-white/80">
              01
            </div>
            {/* Text Below */}
            <div className="mt-4 text-center w-52">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">RESEARCH</p>
              <h4 className="text-sm font-semibold text-slate-900 mt-0.5">Scrape Company Signals</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug font-normal">
                Scraping company tech stacks, engineering blogs &amp; interview insights.
              </p>
            </div>
          </div>

          {/* NODE 02: Extract (Top Left-Center) */}
          <div className="absolute left-[34%] top-[18%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            {/* Text Above */}
            <div className="mb-4 text-center w-52">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">EXTRACT</p>
              <h4 className="text-sm font-semibold text-slate-900 mt-0.5">Parse Job Requirements</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug font-normal">
                Parsing MUST vs NICE skills directly from the job description.
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 shadow-xl flex items-center justify-center font-bold text-blue-600 text-sm ring-4 ring-white/80">
              02
            </div>
          </div>

          {/* NODE 03: Synthesize (Bottom Center) */}
          <div className="absolute left-[62%] top-[77%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 shadow-xl flex items-center justify-center font-bold text-blue-600 text-sm ring-4 ring-white/80">
              03
            </div>
            {/* Text Below */}
            <div className="mt-4 text-center w-52">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">SYNTHESIZE</p>
              <h4 className="text-sm font-semibold text-slate-900 mt-0.5">Generate Questions</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug font-normal">
                Synthesizing technical, system design &amp; behavioral questions.
              </p>
            </div>
          </div>

          {/* NODE 04: Audit (Top Right-Center) */}
          <div className="absolute left-[78%] top-[31%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            {/* Text Above */}
            <div className="mb-4 text-center w-52">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">AUDIT</p>
              <h4 className="text-sm font-semibold text-slate-900 mt-0.5">Coverage Verification</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug font-normal">
                Automated multi-pass audit verifying 100% requirement coverage.
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 shadow-xl flex items-center justify-center font-bold text-blue-600 text-sm ring-4 ring-white/80">
              04
            </div>
          </div>

          {/* NODE 05: Schedule (Right End) */}
          <div className="absolute left-[92%] top-[31%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 shadow-xl flex items-center justify-center font-bold text-blue-600 text-sm ring-4 ring-white/80">
              05
            </div>
            {/* Text Below */}
            <div className="mt-4 text-center w-52">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">FINALIZE</p>
              <h4 className="text-sm font-semibold text-slate-900 mt-0.5">Build Study Schedule</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug font-normal">
                Structuring day-by-day practice timeline and spaced flashcards.
              </p>
            </div>
          </div>
        </div>

        {/* ── MOBILE / TABLET RESPONSIVE STEPPER (VISIBLE ON SMALL SCREENS) ── */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { step: "01", category: "RESEARCH", title: "Scrape Company Signals", desc: "Scraping company tech stacks, engineering blogs & interview insights." },
            { step: "02", category: "EXTRACT", title: "Parse Job Requirements", desc: "Parsing MUST vs NICE skills directly from the job description." },
            { step: "03", category: "SYNTHESIZE", title: "Generate Questions", desc: "Synthesizing technical, system design & behavioral questions." },
            { step: "04", category: "AUDIT", title: "Coverage Verification", desc: "Automated multi-pass audit verifying 100% requirement coverage." },
            { step: "05", category: "FINALIZE", title: "Build Study Schedule", desc: "Structuring day-by-day practice timeline and spaced flashcards." },
          ].map((stg) => (
            <div key={stg.step} className="bg-white/90 p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                {stg.step}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">{stg.category}</p>
                <h4 className="text-sm font-semibold text-slate-900 mt-0.5">{stg.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-normal">{stg.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Tagline */}
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
      <footer className="max-w-6xl mx-auto my-12 px-4 z-10 relative">
        <div className="bg-[#0B172C] rounded-[36px] sm:rounded-[44px] border border-blue-900/50 shadow-[0_30px_90px_rgba(11,23,44,0.4)] text-white p-6 sm:p-12 relative overflow-hidden">
          
          {/* Ambient Blue Radial Glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* ── TOP 5-COLUMN GRID (3 + 2 + 2 + 2 + 3 = 12) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 relative z-10 pb-10">
            
            {/* Column 1: Brand & Mission (3 Cols) */}
            <div className="lg:col-span-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-blue-500/20">
                    T
                  </div>
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
