"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Toast from "@/components/Toast";
import ConfirmModal from "@/components/ConfirmModal";
import { useKitDetail } from "@/hooks/useKitDetail";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  RefreshCw,
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
  Edit3,
  Trash2,
  Plus,
  GripVertical,
  X,
  Save,
  Wrench,
} from "lucide-react";

function mapStatus(s: string): string {
  switch (s) {
    case "completed": return "Completed";
    case "partial": return "Ready";
    case "failed": return "Failed";
    default: return "In Progress";
  }
}

export default function KitDetailPage() {
  const params = useParams();
  const router = useRouter();
  const kitId = params.id as string;

  // Consume custom hook containing all business logic & state
  const {
    kit,
    isLoading,
    error,
    expandedSections,
    regenerating,
    toasts,
    removeToast,
    confirmState,
    closeConfirm,
    toggleSection,
    handleRegenerate,
    handleRestartPipeline,
    
    // Question Builder
    editingQuestion,
    setEditingQuestion,
    addingQuestionCategory,
    setAddingQuestionCategory,
    newQText,
    setNewQText,
    newQOutline,
    setNewQOutline,
    newQDiff,
    setNewQDiff,
    saveQuestionEdit,
    saveNewQuestion,
    deleteQuestion,
    moveQuestionCategory,
    reorderQuestionsByIndices,

    // Flashcards Builder
    editingFlashcard,
    setEditingFlashcard,
    isAddingFlashcard,
    setIsAddingFlashcard,
    newFcFront,
    setNewFcFront,
    newFcBack,
    setNewFcBack,
    saveFlashcardEdit,
    saveNewFlashcard,
    deleteFlashcard,

    // Company Brief
    isEditingBrief,
    setIsEditingBrief,
    briefSummary,
    setBriefSummary,
    briefWhatTheyDo,
    setBriefWhatTheyDo,
    saveCompanyBriefEdit,
  } = useKitDetail(kitId);

  // Drag and Drop state for intuitive question reordering
  const [draggedItem, setDraggedItem] = React.useState<{ category: string; index: number } | null>(null);
  const [dragOverItem, setDragOverItem] = React.useState<{ category: string; index: number } | null>(null);

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

  const SectionHeader = ({ title, icon: Icon, sectionKey, count, onRegenerate, onAdd }: any) => (
    <div
      onClick={() => toggleSection(sectionKey)}
      className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4.5 py-3.5 bg-blue-50/70 backdrop-blur-md rounded-2xl border border-blue-200/70 hover:bg-blue-100/80 hover:border-blue-300/90 transition-all group shadow-2xs cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-blue-100/80 text-blue-700 flex items-center justify-center border border-blue-200/80 shadow-2xs">
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-sm font-bold text-slate-900">{title}</span>
        {count !== undefined && (
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100/80 text-blue-800 border border-blue-200/80">{count}</span>
        )}
      </div>
      <div className="flex items-center gap-2 self-end sm:self-auto" onClick={(e) => e.stopPropagation()}>
        {onAdd && status === "Completed" && (
          <button
            type="button"
            onClick={onAdd}
            className="px-3 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 hover:bg-emerald-200/80 border border-emerald-300/80 rounded-lg transition-colors flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Add Handcrafted
          </button>
        )}
        {onRegenerate && status === "Completed" && (
          <button
            type="button"
            onClick={onRegenerate}
            disabled={!!regenerating}
            className="px-3 py-1 text-[11px] font-semibold text-blue-700 bg-blue-100/80 hover:bg-blue-200/80 border border-blue-200/80 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1"
          >
            {regenerating === sectionKey ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
            Regenerate Section
          </button>
        )}
        <button
          type="button"
          onClick={() => toggleSection(sectionKey)}
          className="p-1 text-slate-400 hover:text-slate-600"
        >
          {expandedSections[sectionKey] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 pb-12">
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

      {/* Reshapeable Kit Builder Banner */}
      {status === "Completed" && (
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50/60 to-purple-50 border border-blue-200/80 rounded-2xl p-4 shadow-2xs space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-blue-600 text-white shadow-2xs">
                <Wrench className="w-4 h-4" />
              </span>
              <h2 className="text-sm font-extrabold text-slate-900">
                The Builder — Reshapeable Prep Kit Engine
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold">
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                ✋ Handcrafted
              </span>
              <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-800 border border-violet-300">
                ✏️ Edited
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300">
                🤖 AI Draft
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Edit answer outlines, move/reorder questions, or add handcrafted items. All user edits stay pinned and <strong className="text-slate-900">survive isolated section regeneration</strong>.
          </p>
        </div>
      )}

      {/* Celebratory Banner for Completed Kit */}
      {status === "Completed" && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 border border-emerald-300/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div>
            <p className="text-sm font-bold text-emerald-950">
              ✨ Preparation Kit Ready &amp; Verified
            </p>
            <p className="text-xs text-emerald-700 mt-0.5">
              {Object.values(questions || {}).reduce((s: number, a: any) => s + (Array.isArray(a) ? a.length : 0), 0)} Questions • {flashcards.length} Flashcards • {coverage.covered_count || requirements.filter((r: any) => r.priority === 'must').length} MUST Requirements Covered
            </p>
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
      <SectionHeader title="Company Intelligence & Research Brief" icon={Building2} sectionKey="company_brief" onRegenerate={() => handleRegenerate("company_brief")} />
      {expandedSections.company_brief && (companyBrief.summary || companyBrief.name) && (
        <div className="bg-blue-50/70 backdrop-blur-md rounded-2xl border border-blue-200/70 p-5 space-y-5 shadow-xs">
          
          {/* Header with Logo & Brand Metadata */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-blue-200/50">
            <div className="flex items-center gap-3.5">
              {companyBrief.logo ? (
                <img
                  src={companyBrief.logo}
                  alt={companyBrief.name || "Company Logo"}
                  className="w-12 h-12 rounded-2xl object-contain border border-blue-200/80 p-1 bg-blue-100/60 shadow-2xs"
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
                  <span className="px-2.5 py-0.5 bg-emerald-100/70 text-emerald-900 text-[10px] font-bold rounded-full border border-emerald-300 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-700" /> Verified Signals
                  </span>
                </div>
                {companyBrief.domain && (
                  <p className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1 mt-0.5">
                    {companyBrief.domain}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                setBriefSummary(companyBrief.summary || "");
                setBriefWhatTheyDo(companyBrief.what_they_do || "");
                setIsEditingBrief(true);
              }}
              className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-bold rounded-xl border border-blue-300/60 transition-colors flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Brief
            </button>
          </div>

          {/* Overview & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-100/60 p-4 rounded-xl border border-blue-200/70 shadow-2xs">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-700" /> Executive Overview
              </h4>
              <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-semibold">{companyBrief.summary}</p>
            </div>

            {companyBrief.what_they_do && (
              <div className="bg-blue-100/60 p-4 rounded-xl border border-blue-200/70 shadow-2xs">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-700" /> Core Products &amp; Mission
                </h4>
                <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-semibold">{companyBrief.what_they_do}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Requirements */}
      <SectionHeader title="Requirements" icon={ShieldCheck} sectionKey="requirements" count={requirements.length} />
      {expandedSections.requirements && requirements.length > 0 && (
        <div className="bg-blue-50/70 backdrop-blur-md rounded-2xl border border-blue-200/70 p-4 space-y-2 shadow-xs">
          {requirements.map((req: any, i: number) => (
            <div key={req.id || i} className="flex items-start gap-3 py-2 border-b border-blue-200/40 last:border-0">
              <span className={`mt-0.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                req.priority === "must" ? "bg-red-100/90 text-red-800 border border-red-200" : "bg-blue-100/80 text-blue-900 border border-blue-200/80"
              }`}>
                {(req.priority || "nice").toUpperCase()}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800">{req.text}</p>
                {req.category && (
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-100/80 border border-blue-200/80 px-2 py-0.5 rounded-md mt-1 inline-block">
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
        const catTitle = cat.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());
        return (
          <React.Fragment key={cat}>
            <SectionHeader
              title={`${catTitle} Questions`}
              icon={HelpCircle}
              sectionKey={cat}
              count={catQuestions.length}
              onRegenerate={() => handleRegenerate(cat)}
              onAdd={() => {
                setAddingQuestionCategory(cat);
                setNewQText("");
                setNewQOutline("");
                setNewQDiff(2);
              }}
            />
            {expandedSections[cat] && (
              <div className="bg-blue-50/70 backdrop-blur-md rounded-2xl border border-blue-200/70 p-4 space-y-3 shadow-xs">
                {catQuestions.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-xs text-slate-500 font-medium">No questions in this category yet.</p>
                    <button
                      onClick={() => {
                        setAddingQuestionCategory(cat);
                        setNewQText("");
                        setNewQOutline("");
                      }}
                      className="mt-2 text-xs font-bold text-blue-600 hover:underline"
                    >
                      + Add first question manually
                    </button>
                  </div>
                ) : (
                  catQuestions.map((q: any, i: number) => {
                    const isDragging = draggedItem?.category === cat && draggedItem?.index === i;
                    const isDragOver = dragOverItem?.category === cat && dragOverItem?.index === i;

                    return (
                      <div
                        key={q.id || i}
                        draggable
                        onDragStart={(e) => {
                          setDraggedItem({ category: cat, index: i });
                          e.dataTransfer.effectAllowed = "move";
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          if (draggedItem && draggedItem.category === cat && draggedItem.index !== i) {
                            setDragOverItem({ category: cat, index: i });
                          }
                        }}
                        onDragLeave={() => setDragOverItem(null)}
                        onDragEnd={() => {
                          setDraggedItem(null);
                          setDragOverItem(null);
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (draggedItem && draggedItem.category === cat) {
                            reorderQuestionsByIndices(cat, draggedItem.index, i);
                          }
                          setDraggedItem(null);
                          setDragOverItem(null);
                        }}
                        className={`py-3 px-3.5 rounded-2xl border transition-all space-y-2 ${
                          isDragging
                            ? "opacity-40 border-dashed border-blue-400 bg-blue-100/50 scale-[0.98]"
                            : isDragOver
                            ? "border-blue-500 ring-2 ring-blue-400/80 bg-blue-100/90 shadow-md"
                            : "border-blue-200/50 hover:border-blue-300/80 bg-white/70 hover:bg-white/90 shadow-2xs"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          {/* Drag Handle */}
                          <div
                            className="pt-0.5 text-slate-400 hover:text-blue-600 cursor-grab active:cursor-grabbing shrink-0 transition-colors"
                            title="Drag to reorder"
                          >
                            <GripVertical className="w-4 h-4" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm font-bold text-slate-900 leading-snug">{q.text}</p>
                            </div>

                            {q.answer_outline && (
                              <div className="text-xs text-slate-800 mt-2 leading-relaxed bg-blue-100/60 p-3 rounded-xl border border-blue-200/60 shadow-2xs">
                                <span className="font-bold text-blue-900">Answer Outline: </span>
                                {q.answer_outline}
                              </div>
                            )}
                          </div>

                          {/* Right Actions & Badges */}
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <div className="flex items-center gap-1.5 flex-wrap justify-end">
                              {q.difficulty && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                  q.difficulty === 1 ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    : q.difficulty === 2 ? "bg-amber-50 text-amber-700 border-amber-200"
                                    : "bg-rose-50 text-rose-700 border-rose-200"
                                }`}>
                                  {q.difficulty === 1 ? "Easy" : q.difficulty === 2 ? "Medium" : "Hard"}
                                </span>
                              )}
                              
                              {/* Source Tags */}
                              {q.source === "user" ? (
                                <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                                  ✋ Handcrafted
                                </span>
                              ) : q.source === "user_edited" ? (
                                <span className="text-[10px] font-extrabold text-violet-800 bg-violet-100 border border-violet-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                                  ✏️ Edited
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 border border-blue-200 px-2 py-0.5 rounded-full">
                                  🤖 AI Draft
                                </span>
                              )}
                            </div>

                            {/* Quick Action Controls */}
                            <div className="flex items-center gap-1 bg-white/90 p-1 rounded-xl border border-blue-200/60 shadow-2xs">
                              {/* Category Selector */}
                              <select
                                value={cat}
                                onChange={(e) => moveQuestionCategory(q.id, e.target.value)}
                                className="text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 rounded-lg px-1.5 py-0.5 focus:outline-none cursor-pointer"
                                title="Move Category"
                              >
                                <option value="technical">Technical</option>
                                <option value="behavioural">Behavioural</option>
                                <option value="system_design">System Design</option>
                                <option value="company_fit">Company Fit</option>
                              </select>

                              {/* Edit */}
                              <button
                                type="button"
                                onClick={() => setEditingQuestion({
                                  id: q.id,
                                  category: cat,
                                  text: q.text,
                                  answer_outline: q.answer_outline || "",
                                  difficulty: q.difficulty || 2,
                                })}
                                className="p-1 text-blue-700 hover:text-blue-900 rounded-lg hover:bg-blue-100/80 cursor-pointer"
                                title="Edit Question"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => deleteQuestion(q.id)}
                                className="p-1 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 cursor-pointer"
                                title="Delete Question"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </React.Fragment>
        );
      })}

      {/* Flashcards Section */}
      <SectionHeader
        title="Flashcards"
        icon={BookOpen}
        sectionKey="flashcards"
        count={flashcards.length}
        onRegenerate={() => handleRegenerate("flashcards")}
        onAdd={() => {
          setIsAddingFlashcard(true);
          setNewFcFront("");
          setNewFcBack("");
        }}
      />
      {expandedSections.flashcards && (
        <div className="space-y-3">
          {flashcards.length === 0 ? (
            <div className="bg-blue-50/70 rounded-2xl border border-blue-200/70 p-6 text-center">
              <p className="text-xs text-slate-500 font-medium">No flashcards yet.</p>
              <button
                onClick={() => setIsAddingFlashcard(true)}
                className="mt-2 text-xs font-bold text-blue-600 hover:underline"
              >
                + Add handcrafted flashcard
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {flashcards.map((fc: any, i: number) => (
                <div key={fc.id || i} className="bg-blue-50/70 backdrop-blur-md rounded-2xl border border-blue-200/70 p-4 hover:bg-blue-100/80 transition-all shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-blue-700">Card {i + 1}</span>
                      {fc.source === "user" ? (
                        <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">✋ Handcrafted</span>
                      ) : fc.source === "user_edited" ? (
                        <span className="text-[10px] font-extrabold text-violet-800 bg-violet-100 border border-violet-300 px-2 py-0.5 rounded-full">✏️ Edited</span>
                      ) : (
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-100 border border-blue-200 px-2 py-0.5 rounded-full">🤖 AI Draft</span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditingFlashcard({ id: fc.id, front: fc.front, back: fc.back })}
                        className="p-1 text-blue-700 hover:bg-blue-200/60 rounded-lg"
                        title="Edit Flashcard"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteFlashcard(fc.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded-lg"
                        title="Delete Flashcard"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm font-bold text-slate-900">{fc.front}</p>
                  <p className="text-xs text-slate-800 bg-blue-100/60 p-3 rounded-xl border border-blue-200/60 leading-relaxed shadow-2xs">{fc.back}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Coverage Report */}
      {coverage.covered_count !== undefined && (
        <>
          <SectionHeader title="Coverage Report" icon={CheckCircle2} sectionKey="coverage" />
          {expandedSections.coverage && (
            <div className="bg-blue-50/70 backdrop-blur-md rounded-2xl border border-blue-200/70 p-5 shadow-xs">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 rounded-xl bg-blue-100/60 border border-blue-200/70 shadow-2xs">
                  <p className="text-2xl font-black text-emerald-600">{coverage.covered_count || 0}</p>
                  <p className="text-xs font-bold text-slate-700">Covered</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-blue-100/60 border border-blue-200/70 shadow-2xs">
                  <p className="text-2xl font-black text-red-500">{(coverage.uncovered_must_requirements || []).length}</p>
                  <p className="text-xs font-bold text-slate-700">Uncovered MUST</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-blue-100/60 border border-blue-200/70 shadow-2xs">
                  <p className="text-2xl font-black text-blue-600">{coverage.coverage_passes || 0}</p>
                  <p className="text-xs font-bold text-slate-700">Passes</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Study Schedule Preview */}
      {schedule.length > 0 && (
        <>
          <SectionHeader title="Study Schedule" icon={Calendar} sectionKey="schedule" count={schedule.length + " days"} onRegenerate={() => handleRegenerate("schedule")} />
          {expandedSections.schedule && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {schedule.map((day: any, i: number) => (
                <div key={i} className="bg-blue-50/70 backdrop-blur-md rounded-2xl border border-blue-200/70 p-4 hover:bg-blue-100/80 transition-all shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-800 bg-blue-100/80 border border-blue-200/80 px-2.5 py-1 rounded-full">Day {day.day}</span>
                    <span className="text-xs text-slate-600 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-600" /> {day.minutes} min
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">{day.focus}</p>
                  {day.question_ids && (
                    <p className="text-[11px] text-slate-500 font-semibold mt-1">{day.question_ids.length} questions assigned</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ─── MODALS / INLINE EDITORS ─── */}

      {/* 1. EDIT QUESTION MODAL */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-blue-200 shadow-xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-600" /> Edit Question (The Builder)
              </h3>
              <button onClick={() => setEditingQuestion(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Question Prompt</label>
                <textarea
                  value={editingQuestion.text}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, text: e.target.value })}
                  rows={3}
                  className="w-full p-3 text-xs sm:text-sm font-semibold border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Answer Outline</label>
                <textarea
                  value={editingQuestion.answer_outline}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, answer_outline: e.target.value })}
                  rows={4}
                  className="w-full p-3 text-xs font-medium border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Difficulty</label>
                <select
                  value={editingQuestion.difficulty}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, difficulty: parseInt(e.target.value, 10) })}
                  className="w-full p-2.5 text-xs font-bold border border-blue-200 rounded-xl text-slate-800"
                >
                  <option value={1}>Easy</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Hard</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingQuestion(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveQuestionEdit}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-1.5 shadow-2xs"
              >
                <Save className="w-3.5 h-3.5" /> Save Edits
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. ADD QUESTION MODAL */}
      {addingQuestionCategory && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-blue-200 shadow-xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600" /> Add Handcrafted Question
              </h3>
              <button onClick={() => setAddingQuestionCategory(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Target Category</label>
                <span className="text-xs font-bold text-blue-700 px-3 py-1 bg-blue-50 border border-blue-200 rounded-lg inline-block uppercase">
                  {addingQuestionCategory.replace(/_/g, " ")}
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Question Prompt</label>
                <textarea
                  value={newQText}
                  onChange={(e) => setNewQText(e.target.value)}
                  placeholder="e.g. How do you handle cache invalidation in distributed microservices?"
                  rows={3}
                  className="w-full p-3 text-xs sm:text-sm font-semibold border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Answer Outline</label>
                <textarea
                  value={newQOutline}
                  onChange={(e) => setNewQOutline(e.target.value)}
                  placeholder="Key concepts, talking points, STAR framework steps..."
                  rows={3}
                  className="w-full p-3 text-xs font-medium border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Difficulty</label>
                <select
                  value={newQDiff}
                  onChange={(e) => setNewQDiff(parseInt(e.target.value, 10))}
                  className="w-full p-2.5 text-xs font-bold border border-blue-200 rounded-xl text-slate-800"
                >
                  <option value={1}>Easy</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Hard</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setAddingQuestionCategory(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveNewQuestion}
                disabled={!newQText.trim()}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center gap-1.5 shadow-2xs disabled:opacity-50"
              >
                <Plus className="w-3.5 h-3.5" /> Add Question
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. EDIT FLASHCARD MODAL */}
      {editingFlashcard && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-blue-200 shadow-xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-600" /> Edit Flashcard
              </h3>
              <button onClick={() => setEditingFlashcard(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Front (Concept / Prompt)</label>
                <textarea
                  value={editingFlashcard.front}
                  onChange={(e) => setEditingFlashcard({ ...editingFlashcard, front: e.target.value })}
                  rows={2}
                  className="w-full p-3 text-xs sm:text-sm font-bold border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Back (Explanation / Key Takeaway)</label>
                <textarea
                  value={editingFlashcard.back}
                  onChange={(e) => setEditingFlashcard({ ...editingFlashcard, back: e.target.value })}
                  rows={4}
                  className="w-full p-3 text-xs font-medium border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingFlashcard(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveFlashcardEdit}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-1.5 shadow-2xs"
              >
                <Save className="w-3.5 h-3.5" /> Save Flashcard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. ADD FLASHCARD MODAL */}
      {isAddingFlashcard && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-blue-200 shadow-xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600" /> Add Handcrafted Flashcard
              </h3>
              <button onClick={() => setIsAddingFlashcard(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Front (Prompt)</label>
                <textarea
                  value={newFcFront}
                  onChange={(e) => setNewFcFront(e.target.value)}
                  placeholder="e.g. Difference between CAP Theorem Consistency vs ACID Consistency?"
                  rows={2}
                  className="w-full p-3 text-xs sm:text-sm font-bold border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Back (Answer / Summary)</label>
                <textarea
                  value={newFcBack}
                  onChange={(e) => setNewFcBack(e.target.value)}
                  placeholder="Clear explanation with key technical points..."
                  rows={4}
                  className="w-full p-3 text-xs font-medium border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAddingFlashcard(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveNewFlashcard}
                disabled={!newFcFront.trim() || !newFcBack.trim()}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center gap-1.5 shadow-2xs disabled:opacity-50"
              >
                <Plus className="w-3.5 h-3.5" /> Add Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. EDIT COMPANY BRIEF MODAL */}
      {isEditingBrief && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-blue-200 shadow-xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-600" /> Edit Company Brief
              </h3>
              <button onClick={() => setIsEditingBrief(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Executive Overview Summary</label>
                <textarea
                  value={briefSummary}
                  onChange={(e) => setBriefSummary(e.target.value)}
                  rows={4}
                  className="w-full p-3 text-xs sm:text-sm font-semibold border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Core Products &amp; Mission</label>
                <textarea
                  value={briefWhatTheyDo}
                  onChange={(e) => setBriefWhatTheyDo(e.target.value)}
                  rows={4}
                  className="w-full p-3 text-xs font-semibold border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditingBrief(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveCompanyBriefEdit}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-1.5 shadow-2xs"
              >
                <Save className="w-3.5 h-3.5" /> Save Brief
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications System */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Custom Confirmation UI Modal */}
      <ConfirmModal
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        confirmText={confirmState.confirmText}
        cancelText={confirmState.cancelText}
        variant={confirmState.variant}
        onConfirm={confirmState.onConfirm}
        onCancel={closeConfirm}
      />
    </div>
  );
}
