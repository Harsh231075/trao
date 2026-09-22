"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import CreateKitModal from "@/components/CreateKitModal";
import api from "@/lib/api";
import {
  Plus,
  Search,
  ArrowRight,
  MoreVertical,
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  Trash2,
  FileText,
} from "lucide-react";

function mapStatus(s: string): string {
  switch (s) {
    case "completed": return "Completed";
    case "partial": return "Ready";
    case "failed": return "Failed";
    default: return "In Progress";
  }
}

function extractDomain(url: string): string {
  try { return new URL(url).hostname.replace("www.", ""); } catch { return url; }
}

const logoBgs = [
  { bg: "bg-red-50", color: "text-red-500" },
  { bg: "bg-emerald-50", color: "text-emerald-600" },
  { bg: "bg-indigo-50", color: "text-indigo-600" },
  { bg: "bg-blue-50", color: "text-blue-600" },
  { bg: "bg-violet-50", color: "text-violet-600" },
  { bg: "bg-amber-50", color: "text-amber-600" },
  { bg: "bg-teal-50", color: "text-teal-600" },
  { bg: "bg-pink-50", color: "text-pink-600" },
];

export default function InterviewKitsPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [kits, setKits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchKits = useCallback(async () => {
    try {
      const data = await api.get("/kits");
      setKits(data.kits || []);
    } catch (err) {
      console.error("Failed to fetch kits:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchKits(); }, [fetchKits]);

  // Poll for in-progress
  useEffect(() => {
    const hasIP = kits.some(k => !["completed", "partial", "failed"].includes(k.status));
    if (!hasIP) return;
    const i = setInterval(fetchKits, 8000);
    return () => clearInterval(i);
  }, [kits, fetchKits]);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm("Delete this interview kit?")) return;
    try {
      await api.delete(`/kits/${id}`);
      setKits(prev => prev.filter(k => k._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredKits = kits.filter((k) => {
    const status = mapStatus(k.status);
    const matchesFilter = activeFilter === "All" || status === activeFilter;
    const companyName = k._computed?.company_name || extractDomain(k.company_url);
    const roleTitle = k._computed?.role_title || "";
    const matchesSearch =
      companyName.toLowerCase().includes(search.toLowerCase()) ||
      roleTitle.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <Header onOpenCreateKit={() => setIsModalOpen(true)} />

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

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {["All", "In Progress", "Completed", "Failed"].map((tab) => (
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
            className="w-full h-9 pl-10 pr-8 text-xs bg-white text-slate-800 placeholder:text-slate-500 rounded-full border border-slate-200/90 shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/80 transition-all"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
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
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : filteredKits.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <FileText className="w-7 h-7" />
          </div>
          <p className="text-sm font-medium text-slate-600">
            {kits.length === 0 ? "No interview kits yet" : "No kits match your filter"}
          </p>
          {kits.length === 0 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-full transition-colors"
            >
              <Plus className="w-3.5 h-3.5 inline mr-1" /> Create Your First Kit
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredKits.map((kit, index) => {
            const status = mapStatus(kit.status);
            const companyName = kit._computed?.company_name || extractDomain(kit.company_url);
            const roleTitle = kit._computed?.role_title || "Processing...";
            const coverage = kit._computed?.coverage_percentage ?? 0;
            const totalQ = kit._computed?.total_questions || 0;
            const lb = logoBgs[index % logoBgs.length];

            return (
              <div
                key={kit._id}
                onClick={() => router.push(`/kits/${kit._id}`)}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className={`w-11 h-11 rounded-xl ${lb.bg} ${lb.color} flex items-center justify-center font-black text-xl shadow-2xs border border-slate-150`}>
                      {companyName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                        status === "Completed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : status === "In Progress"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : status === "Failed"
                              ? "bg-red-50 text-red-700 border border-red-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}>
                        {status === "In Progress" && <Loader2 className="w-3 h-3 animate-spin inline mr-1" />}
                        {status}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleDelete(e, kit._id)}
                        className="text-slate-400 hover:text-red-500 p-1 rounded-sm transition-colors"
                        title="Delete kit"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3.5">
                    <h3 className="font-bold text-slate-900 text-base">{roleTitle}</h3>
                    <p className="text-xs font-semibold text-slate-500">{companyName}</p>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{kit.days_available} days</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{totalQ} questions</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1.5">
                    <span>{kit.days_available} days prep</span>
                    <span className="font-bold text-slate-800">{coverage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full rounded-full ${
                        status === "Completed" ? "bg-emerald-500" : status === "In Progress" ? "bg-blue-600" : "bg-indigo-500"
                      }`}
                      style={{ width: `${Math.min(coverage, 100)}%` }}
                    />
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); router.push(`/kits/${kit._id}`); }}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-blue-600 bg-blue-50/70 hover:bg-blue-100 rounded-xl transition-colors"
                  >
                    Open Workspace
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <CreateKitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={() => fetchKits()}
      />
    </div>
  );
}
