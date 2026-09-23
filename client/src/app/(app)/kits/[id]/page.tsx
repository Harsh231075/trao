"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import api from "@/lib/api";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  RefreshCw,
  FileText,
  HelpCircle,
  BookOpen,
  Building2,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  Check,
} from "lucide-react";

function mapStatus(s: string): string {
  switch (s) {
    case "completed": return "Completed";
    case "partial": return "Ready";
    case "failed": return "Failed";
    default: return "In Progress";
  }
}

const PIPELINE_STAGES = [
  { key: "researching", title: "1. Researching Company", desc: "Scraping company website & public interview insights" },
  { key: "extracting", title: "2. Extracting Requirements", desc: "Parsing MUST vs NICE skills from the JD" },
  { key: "generating", title: "3. Generating Questions & Flashcards", desc: "Crafting technical, behavioural & system design questions" },
  { key: "checking_coverage", title: "4. Coverage Verification", desc: "Verifying 100% requirement coverage" },
  { key: "building_schedule", title: "5. Building Study Schedule", desc: "Allocating day-by-day study timeline" },
];

function getStageIndex(status: string) {
  switch (status) {
    case "queued": return 0;
    case "researching": return 0;
    case "extracting": return 1;
    case "generating": return 2;
    case "checking_coverage": return 3;
    case "building_schedule": return 4;
    case "completed":
    case "partial": return 5;
    default: return 0;
  }
}

export default function KitDetailPage() {
  const params = useParams();
  const router = useRouter();
  const kitId = params.id as string;

  const [kit, setKit] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    company_brief: true,
    requirements: true,
    technical: false,
    behavioural: false,
    system_design: false,
    company_fit: false,
    flashcards: false,
    coverage: false,
  });
  const [regenerating, setRegenerating] = useState<string | null>(null);

  const fetchKit = useCallback(async () => {
    try {
      const data = await api.get(`/kits/${kitId}`);
      setKit(data.kit);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [kitId]);

  useEffect(() => { fetchKit(); }, [fetchKit]);

  // Fast polling while in progress (2.5s)
  useEffect(() => {
    if (!kit || ["completed", "partial", "failed"].includes(kit.status)) return;
    const i = setInterval(fetchKit, 2500);
    return () => clearInterval(i);
  }, [kit, fetchKit]);

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRegenerate = async (section: string) => {
    setRegenerating(section);
    try {
      await api.post(`/kits/${kitId}/regenerate`, { section });
      await fetchKit();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setRegenerating(null);
    }
  };

  const handleRestartPipeline = async () => {
    try {
      await api.post(`/kits/${kitId}/generate`);
      await fetchKit();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !kit) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="flex flex-col items-center justify-center py-32 gap-3">
          <AlertTriangle className="w-8 h-8 text-red-400" />
          <p className="text-sm text-red-500">{error || "Kit not found"}</p>
          <button onClick={() => router.push("/kits")} className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-full">
            Back to Kits
          </button>
        </div>
      </div>
    );
  }

  const kitData = kit.kit_data || {};
  const status = mapStatus(kit.status);
  const role = kitData.role || {};
  const companyBrief = kitData.company_brief || {};
  const requirements = role.requirements || [];
  const questions = kitData.questions || {};
  const flashcards = kitData.flashcards || [];
  const coverage = kitData.coverage || {};
  const schedule = kitData.schedule || [];
  if (status === "In Progress") {
    return (
      <div className="space-y-6">
        <Header />
        <div className="flex flex-col items-center justify-center py-28 gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/10">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Finalizing Your Interview Kit</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              AI pipeline is writing your custom questions, flashcards, and study schedule...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const SectionHeader = ({ title, icon: Icon, sectionKey, count, onRegenerate }: any) => (
    <button
      onClick={() => toggleSection(sectionKey)}
      className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-slate-200/80 hover:border-blue-200 transition-all group"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-sm font-bold text-slate-900">{title}</span>
        {count !== undefined && (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{count}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {onRegenerate && status === "Completed" && (
          <button
            onClick={(e) => { e.stopPropagation(); onRegenerate(); }}
            disabled={!!regenerating}
            className="px-3 py-1 text-[11px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-50"
          >
            {regenerating === sectionKey ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3 inline mr-1" />}
            Regenerate
          </button>
        )}
        {expandedSections[sectionKey] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </div>
    </button>
  );

  return (
    <div className="space-y-4">
      <Header />

      {/* Back + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/kits")}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight truncate">
              {role.title || "Processing..."}
            </h1>
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
              status === "Completed" ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : status === "In Progress" ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {status === "In Progress" && <Loader2 className="w-3 h-3 animate-spin inline mr-1" />}
              {status}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {companyBrief.name || kit.company_url} • {kit.days_available} days prep window
          </p>
        </div>
        {status === "Failed" && (
          <button
            onClick={handleRestartPipeline}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-full flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry Pipeline
          </button>
        )}
      </div>



      {/* Celebratory Banner for Completed Kit */}
      {status === "Completed" && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 border border-emerald-300/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-950">
                ✨ Preparation Kit Ready &amp; Verified
              </p>
              <p className="text-xs text-emerald-700 mt-0.5">
                {Object.values(questions || {}).reduce((s: number, a: any) => s + (Array.isArray(a) ? a.length : 0), 0)} Questions • {flashcards.length} Flashcards • {coverage.covered_count || requirements.filter((r: any) => r.priority === 'must').length} MUST Requirements Covered
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => router.push('/practice')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full shadow-xs transition-all cursor-pointer"
            >
              Practice Flashcards →
            </button>
            <button
              onClick={() => router.push('/schedule')}
              className="px-3.5 py-2 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold rounded-full transition-all cursor-pointer"
            >
              Study Schedule
            </button>
          </div>
        </div>
      )}

      {/* Company Brief & Verified Intelligence */}
      <SectionHeader title="Company Intelligence & Research Brief" icon={Building2} sectionKey="company_brief" />
      {expandedSections.company_brief && (companyBrief.summary || companyBrief.name) && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-5 shadow-xs">
          
          {/* Header with Logo & Brand Metadata */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3.5">
              {companyBrief.logo ? (
                <img
                  src={companyBrief.logo}
                  alt={companyBrief.name || "Company Logo"}
                  className="w-12 h-12 rounded-2xl object-contain border border-slate-200/80 p-1 bg-white shadow-2xs"
                  onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
                />
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                  {(companyBrief.name || "C")[0]}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-slate-900">{companyBrief.name || "Target Company"}</h3>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Signals
                  </span>
                </div>
                {companyBrief.domain && (
                  <p className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1 mt-0.5">
                    {companyBrief.domain}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Overview & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/60">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-600" /> Executive Overview
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">{companyBrief.summary}</p>
            </div>

            {companyBrief.what_they_do && (
              <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/60">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Core Products &amp; Mission
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">{companyBrief.what_they_do}</p>
              </div>
            )}
          </div>

          {/* Engineering Culture & Work Environment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Engineering Culture */}
            <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200/60">
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Engineering Culture &amp; Priorities
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {(companyBrief.engineering_culture || ["High Scale Focus", "System Quality Standards"]).map((item: string, i: number) => (
                  <span key={i} className="px-2.5 py-1 bg-white text-blue-800 text-xs font-semibold rounded-lg border border-blue-200/80 shadow-2xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Work Environment */}
            <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-200/60">
              <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-600" /> Work Environment &amp; Team Speed
              </h4>
              <p className="text-xs text-indigo-950 leading-relaxed font-normal">
                {companyBrief.work_environment || "Fast-paced engineering environment with focus on continuous delivery and cross-functional ownership."}
              </p>
            </div>
          </div>

          {/* Verified Source Citations & Links */}
          {companyBrief.verified_sources && companyBrief.verified_sources.length > 0 && (
            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Intelligence &amp; Source Links ({companyBrief.verified_sources.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {companyBrief.verified_sources.map((src: any, idx: number) => (
                  <a
                    key={idx}
                    href={src.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-50 hover:bg-blue-50/80 rounded-xl border border-slate-200/80 hover:border-blue-300 transition-all flex items-start justify-between gap-2 group"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                          {src.category || "Official Source"}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400 truncate">
                          {src.domain}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                        {src.title}
                      </p>
                      {src.snippet && (
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                          {src.snippet}
                        </p>
                      )}
                    </div>
                    <span className="text-slate-400 group-hover:text-blue-600 shrink-0 pt-0.5">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Requirements */}
      <SectionHeader title="Requirements" icon={ShieldCheck} sectionKey="requirements" count={requirements.length} />
      {expandedSections.requirements && requirements.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 space-y-2">
          {requirements.map((req: any, i: number) => (
            <div key={req.id || i} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
              <span className={`mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                req.priority === "must" ? "bg-red-50 text-red-700" : "bg-slate-100 text-slate-600"
              }`}>
                {(req.priority || "nice").toUpperCase()}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-800">{req.text}</p>
                {req.category && (
                  <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                    {req.category}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Question Categories */}
      {["technical", "behavioural", "system_design", "company_fit"].map(cat => {
        const catQuestions = questions[cat] || [];
        if (catQuestions.length === 0 && status !== "Completed") return null;
        const catTitle = cat.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());
        return (
          <React.Fragment key={cat}>
            <SectionHeader
              title={`${catTitle} Questions`}
              icon={HelpCircle}
              sectionKey={cat}
              count={catQuestions.length}
              onRegenerate={() => handleRegenerate(cat)}
            />
            {expandedSections[cat] && catQuestions.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 space-y-3">
                {catQuestions.map((q: any, i: number) => (
                  <div key={q.id || i} className="py-3 border-b border-slate-100 last:border-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{q.text}</p>
                        {q.answer_outline && (
                          <p className="text-xs text-slate-500 mt-2 leading-relaxed bg-slate-50 p-3 rounded-lg">
                            <span className="font-semibold text-slate-600">Answer Outline: </span>
                            {q.answer_outline}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {q.difficulty && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            q.difficulty === 1 ? "bg-emerald-50 text-emerald-700"
                              : q.difficulty === 2 ? "bg-amber-50 text-amber-700"
                              : "bg-rose-50 text-rose-700"
                          }`}>
                            {q.difficulty === 1 ? "Easy" : q.difficulty === 2 ? "Medium" : "Hard"}
                          </span>
                        )}
                        {q.source === "user_edited" && (
                          <span className="text-[10px] font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">Edited</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </React.Fragment>
        );
      })}

      {/* Flashcards */}
      <SectionHeader title="Flashcards" icon={BookOpen} sectionKey="flashcards" count={flashcards.length} />
      {expandedSections.flashcards && flashcards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {flashcards.map((fc: any, i: number) => (
            <div key={fc.id || i} className="bg-white rounded-xl border border-slate-200/80 p-4 hover:shadow-xs transition-all">
              <div className="text-xs font-semibold text-blue-600 mb-2">Card {i + 1}</div>
              <p className="text-sm font-medium text-slate-900 mb-2">{fc.front}</p>
              <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg leading-relaxed">{fc.back}</p>
            </div>
          ))}
        </div>
      )}

      {/* Coverage */}
      {coverage.covered_count !== undefined && (
        <>
          <SectionHeader title="Coverage Report" icon={CheckCircle2} sectionKey="coverage" />
          {expandedSections.coverage && (
            <div className="bg-white rounded-xl border border-slate-200/80 p-5">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">{coverage.covered_count || 0}</p>
                  <p className="text-xs text-slate-500">Covered</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-500">{(coverage.uncovered_must_requirements || []).length}</p>
                  <p className="text-xs text-slate-500">Uncovered MUST</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{coverage.coverage_passes || 0}</p>
                  <p className="text-xs text-slate-500">Passes</p>
                </div>
              </div>
              {(coverage.uncovered_must_requirements || []).length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2">Uncovered MUST Requirements</h4>
                  <ul className="space-y-1">
                    {coverage.uncovered_must_requirements.map((r: any, i: number) => (
                      <li key={i} className="text-sm text-red-700 bg-red-50 px-3 py-1.5 rounded-lg">{typeof r === 'string' ? r : r.text || r.id}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Schedule Preview */}
      {schedule.length > 0 && (
        <>
          <SectionHeader title="Study Schedule" icon={Calendar} sectionKey="schedule" count={schedule.length + " days"} />
          {expandedSections.schedule && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {schedule.map((day: any, i: number) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200/80 p-4 hover:shadow-xs transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">Day {day.day}</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {day.minutes} min
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{day.focus}</p>
                  {day.question_ids && (
                    <p className="text-[11px] text-slate-400 mt-1">{day.question_ids.length} questions assigned</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
