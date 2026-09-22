"use client";

import React, { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import api from "@/lib/api";
import {
  Loader2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Zap,
  Target,
  Award,
  Star,
} from "lucide-react";

export default function PracticePage() {
  const [kits, setKits] = useState<any[]>([]);
  const [selectedKitId, setSelectedKitId] = useState<string>("");
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeckLoading, setIsDeckLoading] = useState(false);
  const [ratingSubmitting, setRatingSubmitting] = useState(false);
  const [progress, setProgress] = useState<any>(null);

  // Fetch kits
  useEffect(() => {
    api.get("/kits").then(data => {
      const completedKits = (data.kits || []).filter((k: any) => k.status === "completed");
      setKits(completedKits);
      if (completedKits.length > 0) {
        setSelectedKitId(completedKits[0]._id);
      }
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  // Fetch deck when kit changes
  const fetchDeck = useCallback(async () => {
    if (!selectedKitId) return;
    setIsDeckLoading(true);
    try {
      const data = await api.get(`/kits/${selectedKitId}/practice`);
      setFlashcards(data.flashcards || []);
      setCurrentIndex(0);
      setIsFlipped(false);

      const prog = await api.get(`/kits/${selectedKitId}/practice/progress`);
      setProgress(prog);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeckLoading(false);
    }
  }, [selectedKitId]);

  useEffect(() => { fetchDeck(); }, [fetchDeck]);

  const currentCard = flashcards[currentIndex];

  const handleRate = async (confidence: number) => {
    if (!currentCard || ratingSubmitting) return;
    setRatingSubmitting(true);
    try {
      await api.post(`/kits/${selectedKitId}/practice`, {
        flashcard_id: currentCard.id,
        confidence,
      });
      // Move to next card
      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsFlipped(false);
      } else {
        // Deck complete — refresh
        await fetchDeck();
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setRatingSubmitting(false);
    }
  };

  const ratings = [
    { value: 1, label: "Again", color: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100", icon: RotateCcw },
    { value: 2, label: "Hard", color: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100", icon: Zap },
    { value: 3, label: "Good", color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100", icon: Target },
    { value: 4, label: "Easy", color: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100", icon: CheckCircle2 },
    { value: 5, label: "Mastered", color: "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100", icon: Award },
  ];

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

  return (
    <div className="space-y-6">
      <Header />

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Practice Flashcards
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Spaced repetition deck — rate your confidence to prioritize weak areas.
          </p>
        </div>

        {progress && (
          <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200 flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-current" />
            <span>Avg Confidence: {(progress.average_confidence || 0).toFixed(1)} / 5</span>
          </div>
        )}
      </div>

      {/* Kit Selector */}
      {kits.length > 0 ? (
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Kit:</label>
          <select
            value={selectedKitId}
            onChange={(e) => setSelectedKitId(e.target.value)}
            className="px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
          >
            {kits.map(k => (
              <option key={k._id} value={k._id}>
                {k._computed?.company_name || "Kit"} — {k._computed?.role_title || "Processing"}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <BookOpen className="w-7 h-7" />
          </div>
          <p className="text-sm font-medium text-slate-600">No completed kits yet</p>
          <p className="text-xs text-slate-400">Create and complete a kit to start practicing flashcards.</p>
        </div>
      )}

      {/* Flashcard Area */}
      {isDeckLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : flashcards.length === 0 && selectedKitId ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-400" />
          <p className="text-sm font-medium text-slate-600">All caught up!</p>
          <p className="text-xs text-slate-400">No flashcards to practice right now.</p>
        </div>
      ) : currentCard ? (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500">{currentIndex + 1} / {flashcards.length}</span>
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[300px] bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col items-center justify-center p-8 sm:p-12 text-center relative"
          >
            {/* Card Header */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600">
                {isFlipped ? "ANSWER" : "QUESTION"}
              </span>
              {currentCard.requirement_ids?.length > 0 && (
                <span className="text-[10px] font-medium text-slate-400">
                  {currentCard.requirement_ids.length} req linked
                </span>
              )}
            </div>

            <div className="absolute top-4 right-4">
              <span className="text-[10px] text-slate-400 font-medium">Click to flip</span>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center">
              {!isFlipped ? (
                <p className="text-lg sm:text-xl font-semibold text-slate-900 leading-relaxed">
                  {currentCard.front}
                </p>
              ) : (
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                  {currentCard.back}
                </p>
              )}
            </div>

            {/* Flip indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <Sparkles className="w-4 h-4 text-slate-300" />
            </div>
          </div>

          {/* Rating Buttons — only show when flipped */}
          {isFlipped && (
            <div className="space-y-3">
              <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Rate your confidence
              </p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {ratings.map(r => {
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.value}
                      onClick={() => handleRate(r.value)}
                      disabled={ratingSubmitting}
                      className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl border transition-all active:scale-95 disabled:opacity-50 ${r.color}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Nav */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => { setCurrentIndex(prev => Math.max(0, prev - 1)); setIsFlipped(false); }}
              disabled={currentIndex === 0}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button
              onClick={() => { setCurrentIndex(prev => Math.min(flashcards.length - 1, prev + 1)); setIsFlipped(false); }}
              disabled={currentIndex === flashcards.length - 1}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 disabled:opacity-30"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
