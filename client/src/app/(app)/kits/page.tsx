"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import CreateKitModal from "@/components/CreateKitModal";
import api from "@/lib/api";
import {
  Plus,
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
    return activeFilter === "All" || status === activeFilter;
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

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-100">
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
            const totalQ = kit._computed?.total_questions || 0;

            return (
              <div
                key={kit._id}
                onClick={() => router.push(`/kits/${kit._id}`)}
                className="group bg-blue-50/70 backdrop-blur-md rounded-3xl border border-blue-200/70 p-5 sm:p-6 shadow-md shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 hover:bg-blue-100/80 hover:border-blue-300 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                {/* Subtle Glow Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/20 transition-colors" />

                <div>
                  <div className="flex items-start justify-between gap-3 relative z-10">
                    <div>
                      <h3 className="font-black text-slate-900 text-base sm:text-lg group-hover:text-blue-700 transition-colors">{roleTitle}</h3>
                      <p className="text-xs font-bold text-slate-600 mt-0.5">{companyName}</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(e, kit._id)}
                      className="text-slate-400 hover:text-red-500 p-1.5 rounded-xl hover:bg-white/80 transition-colors shrink-0 -mr-1 -mt-1"
                      title="Delete kit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-bold text-slate-600 mt-4 pt-3.5 border-t border-blue-200/50 relative z-10">
                    <div className="flex items-center gap-3.5">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        <span>{kit.days_available} days</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span>{totalQ} questions</span>
                      </div>
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${
                      status === "Completed"
                        ? "bg-white/90 text-emerald-700 border-emerald-300/80"
                        : status === "In Progress"
                          ? "bg-white/90 text-blue-700 border-blue-300/80"
                          : status === "Failed"
                            ? "bg-white/90 text-red-700 border-red-300/80"
                            : "bg-white/90 text-slate-700 border-slate-300/80"
                    }`}>
                      {status === "In Progress" && <Loader2 className="w-3 h-3 animate-spin inline mr-1 text-blue-600" />}
                      {status}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-blue-200/50 relative z-10">
                  <button
                    onClick={(e) => { e.stopPropagation(); router.push(`/kits/${kit._id}`); }}
                    className="w-full flex items-center justify-center gap-2 py-3 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl transition-all shadow-md hover:shadow-lg cursor-pointer active:scale-95"
                  >
                    <span>Open Workspace</span>
                    <ArrowRight className="w-4 h-4" />
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
