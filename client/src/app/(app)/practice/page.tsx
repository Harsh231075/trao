"use client";

import React, { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import ModernFlashcard from "@/components/ModernFlashcard";
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
  Shuffle,
  Layers,
  Keyboard,
  TrendingUp
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
    api
      .get("/kits")
      .then((data) => {
        const completedKits = (data.kits || []).filter((k: any) => k.status === "completed");
        setKits(completedKits);
        if (completedKits.length > 0) {
          setSelectedKitId(completedKits[0]._id);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
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

  useEffect(() => {
    fetchDeck();
  }, [fetchDeck]);

  const currentCard = flashcards[currentIndex];

  const handleRate = async (confidence: number) => {
    if (!currentCard || ratingSubmitting) return;
    setRatingSubmitting(true);
    try {
      await api.post(`/kits/${selectedKitId}/practice`, {
        flashcard_id: currentCard.id,
        confidence,
      });
      
      // Update local progress counter visually
      if (progress) {
        const newTotal = (progress.total_reviews || 0) + 1;
        const newAvg = (((progress.average_confidence || 3) * (progress.total_reviews || 0)) + confidence) / newTotal;
        setProgress({
          ...progress,
          total_reviews: newTotal,
          average_confidence: newAvg
        });
      }

      // Move to next card
      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setIsFlipped(false);
      } else {
        // Deck completed — refresh deck
        await fetchDeck();
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setRatingSubmitting(false);
    }
  };

  // Shuffle Deck function
  const handleShuffle = () => {
    if (flashcards.length <= 1) return;
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // Restart Deck function
  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // Global Keyboard Navigation Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key combinations inside input or select elements
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        setCurrentIndex((prev) => Math.max(0, prev - 1));
        setIsFlipped(false);
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        setCurrentIndex((prev) => Math.min(flashcards.length - 1, prev + 1));
        setIsFlipped(false);
      } else if (isFlipped && ["1", "2", "3", "4", "5"].includes(e.key)) {
        e.preventDefault();
        handleRate(parseInt(e.key, 10));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [flashcards.length, isFlipped, currentCard, ratingSubmitting]);

  // 5 Glowing Neon Rating Buttons with distinct Cyber HSL/Hex themes
  const ratings = [
    {
      value: 1,
      label: "Again",
      shortcut: "1",
      icon: RotateCcw,
      style:
        "bg-rose-950/60 text-rose-300 border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.25)] hover:bg-rose-900/80 hover:border-rose-400 hover:shadow-[0_0_30px_rgba(244,63,94,0.45)] hover:scale-105",
    },
    {
      value: 2,
      label: "Hard",
      shortcut: "2",
      icon: Zap,
      style:
        "bg-amber-950/60 text-amber-300 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:bg-amber-900/80 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.45)] hover:scale-105",
    },
    {
      value: 3,
      label: "Good",
      shortcut: "3",
      icon: Target,
      style:
        "bg-cyan-950/60 text-cyan-300 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:bg-cyan-900/80 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.45)] hover:scale-105",
    },
    {
      value: 4,
      label: "Easy",
      shortcut: "4",
      icon: CheckCircle2,
      style:
        "bg-emerald-950/60 text-emerald-300 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:bg-emerald-900/80 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.45)] hover:scale-105",
    },
    {
      value: 5,
      label: "Mastered",
      shortcut: "5",
      icon: Award,
      style:
        "bg-violet-950/60 text-violet-300 border-violet-500/50 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:bg-violet-900/80 hover:border-violet-400 hover:shadow-[0_0_35px_rgba(139,92,246,0.55)] hover:scale-105",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="flex flex-col items-center justify-center py-32 gap-3">
          <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
          <p className="text-sm font-medium text-slate-400">Loading study deck...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
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
            <Star className="w-4 h-4 fill-current text-emerald-600" />
            <span>Avg Confidence: {(progress.average_confidence || 0).toFixed(1)} / 5</span>
          </div>
        )}
      </div>

      {/* Kit Selector Bar */}
      {kits.length > 0 ? (
        <div className="flex items-center justify-between gap-4 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-500" />
              Kit:
            </label>
            <select
              value={selectedKitId}
              onChange={(e) => setSelectedKitId(e.target.value)}
              className="px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-800 font-medium"
            >
              {kits.map((k) => (
                <option key={k._id} value={k._id}>
                  {k._computed?.company_name || "Kit"} — {k._computed?.role_title || "Processing"}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Deck Actions */}
          {flashcards.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShuffle}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-600 border border-slate-200 transition-all active:scale-95"
                title="Shuffle flashcard deck"
              >
                <Shuffle className="w-3.5 h-3.5 text-amber-500" />
                <span>Shuffle</span>
              </button>
              <button
                type="button"
                onClick={handleRestart}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200 transition-all active:scale-95"
                title="Restart deck from start"
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-500" />
                <span>Restart</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-3 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-sm">
            <BookOpen className="w-7 h-7" />
          </div>
          <p className="text-sm font-semibold text-slate-700">No completed kits yet</p>
          <p className="text-xs text-slate-400">Create and complete a kit to start practicing flashcards.</p>
        </div>
      )}

      {/* Main Flashcard Interactive Stage */}
      {isDeckLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
          <p className="text-xs font-medium text-slate-400">Loading flashcards...</p>
        </div>
      ) : flashcards.length === 0 && selectedKitId ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 bg-slate-950/40 rounded-3xl border border-slate-800">
          <CheckCircle2 className="w-14 h-14 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]" />
          <p className="text-lg font-bold text-slate-200">All Deck Cards Completed!</p>
          <p className="text-xs text-slate-400">Great job! You have reviewed all flashcards in this deck.</p>
          <button
            onClick={() => fetchDeck()}
            className="mt-2 px-5 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 font-semibold text-xs border border-cyan-500/40 hover:bg-cyan-500/30 transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          >
            Practice Again
          </button>
        </div>
      ) : currentCard ? (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Deck Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Layers className="w-3.5 h-3.5" /> Card {currentIndex + 1} of {flashcards.length}
              </span>
              <span>{Math.round(((currentIndex + 1) / flashcards.length) * 100)}% Completed</span>
            </div>
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
              />
            </div>
          </div>

          {/* 3D Vibrant Flashcard */}
          <ModernFlashcard
            front={currentCard.front}
            back={currentCard.back}
            category={currentCard.category}
            requirementCount={currentCard.requirement_ids?.length}
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped(!isFlipped)}
            cardIndex={currentIndex}
            totalCards={flashcards.length}
          />

          {/* Rating Buttons Stage — Active when flipped */}
          <div className="min-h-[100px] flex flex-col items-center justify-center transition-all duration-300">
            {isFlipped ? (
              <div className="w-full space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Rate Your Recall Confidence
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {ratings.map((r) => {
                    const Icon = r.icon;
                    return (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => handleRate(r.value)}
                        disabled={ratingSubmitting}
                        className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-2xl border text-xs font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 ${r.style}`}
                      >
                        <div className="flex items-center gap-1">
                          <Icon className="w-4 h-4" />
                          <span className="font-mono text-[10px] opacity-80">[{r.shortcut}]</span>
                        </div>
                        <span>{r.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-2 px-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center justify-center gap-2">
                <Keyboard className="w-4 h-4 text-cyan-400" />
                <span>Tip: Use <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-900 text-slate-200 border border-slate-700 rounded">Space</kbd> to flip, <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-900 text-slate-200 border border-slate-700 rounded">←</kbd> <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-900 text-slate-200 border border-slate-700 rounded">→</kbd> to navigate, and keys <kbd className="px-1 py-0.5 text-[10px] font-mono bg-slate-900 text-slate-200 border border-slate-700 rounded">1-5</kbd> to rate</span>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
            <button
              type="button"
              onClick={() => {
                setCurrentIndex((prev) => Math.max(0, prev - 1));
                setIsFlipped(false);
              }}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white disabled:opacity-30 disabled:hover:border-slate-800 transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <span className="text-xs font-mono text-slate-400">
              {currentIndex + 1} / {flashcards.length}
            </span>

            <button
              type="button"
              onClick={() => {
                setCurrentIndex((prev) => Math.min(flashcards.length - 1, prev + 1));
                setIsFlipped(false);
              }}
              disabled={currentIndex === flashcards.length - 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white disabled:opacity-30 disabled:hover:border-slate-800 transition-all"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
