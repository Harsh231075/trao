"use client";

import React from "react";
import Header from "@/components/Header";
import { User, Mail, Briefcase, MapPin, Globe, Award, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <Header />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Candidate Profile
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Your candidate credentials and target job profiles used by AI to customize interview kits.
          </p>
        </div>
      </div>

      {/* Candidate Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-extrabold text-2xl shadow-lg ring-4 ring-blue-100">
            HS
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              Harsh Singh
              <span className="px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                Active Job Seeker
              </span>
            </h2>
            <p className="text-sm font-medium text-slate-600">Aspiring Full Stack Developer</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> harsh@example.com
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Bengaluru, India
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5" /> 2+ Years Experience
              </span>
            </div>
          </div>
        </div>

        {/* Target Companies & Tech Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Target Roles &amp; Companies
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Google", "OpenAI", "Stripe", "Meta", "Uber"].map((c) => (
                <span key={c} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Core Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {["React 19", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "System Design"].map((t) => (
                <span key={t} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
