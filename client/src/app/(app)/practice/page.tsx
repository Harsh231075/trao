"use client";

import React from "react";
import Header from "@/components/Header";
import ModernFlashcard from "@/components/ModernFlashcard";
import { usePractice } from "@/hooks/usePractice";
import {
  Loader2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  BookOpen,
  CheckCircle2,
  Star,
  Shuffle,
  Layers,
  Keyboard,
} from "lucide-react";

export default function PracticePage() {
  const {
    kits,
    selectedKitId,
    setSelectedKitId,
    flashcards,
    currentIndex,
    setCurrentIndex,
    isFlipped,
    setIsFlipped,
    isLoading,
    isDeckLoading,
    ratingSubmitting,
    progress,
    isDropdownOpen,
    setIsDropdownOpen,
    currentCard,
    handleRate,
    handleShuffle,
    handleRestart,
  } = usePractice();

  const ratings = [
    { value: 1, label: "Again", shortcut: "1" },
    { value: 2, label: "Hard", shortcut: "2" },
    { value: 3, label: "Good", shortcut: "3" },
    { value: 4, label: "Easy", shortcut: "4" },
    { value: 5, label: "Mastered", shortcut: "5" },
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

  const selectedKit = kits.find((k) => k._id === selectedKitId) || kits[0];

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

      {/* Kit Selector Bar — Translucent Glass Studio Bar */}
      {kits.length > 0 ? (
        <div className="relative z-40 max-w-2xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-blue-50/70 backdrop-blur-md p-2.5 sm:px-3.5 rounded-2xl border border-blue-200/70 shadow-xs">

          {/* Custom Sleek Dropdown */}
          <div id="custom-kit-select" className="relative flex-1 min-w-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen((prev) => !prev);
              }}
              className="w-full flex items-center justify-between gap-2 bg-white hover:bg-blue-50/60 text-slate-800 font-medium text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-blue-200/80 shadow-2xs transition-all cursor-pointer truncate"
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="truncate">
                  {selectedKit ? `${selectedKit._computed?.company_name || "Kit"} — ${selectedKit._computed?.role_title || "Processing"}` : "Select Interview Kit"}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-blue-600 shrink-0 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Custom Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 z-50 w-full min-w-[280px] bg-white border border-blue-200 shadow-2xl rounded-2xl p-1.5 animate-in fade-in zoom-in-95 duration-150 space-y-1 ring-1 ring-blue-500/10">
                {kits.map((k) => {
                  const isSelected = k._id === selectedKitId;
                  return (
                    <button
                      key={k._id}
                      type="button"
                      onClick={() => {
                        setSelectedKitId(k._id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between gap-3 px-3.5 py-2 text-xs font-medium rounded-xl transition-all text-left cursor-pointer ${isSelected
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-800 hover:bg-blue-50"
                        }`}
                    >
                      <div className="truncate">
                        <span className="block font-semibold truncate">{k._computed?.company_name || "Kit"}</span>
                        <span className={`block text-[11px] font-normal truncate ${isSelected ? "text-blue-100" : "text-slate-500"}`}>
                          {k._computed?.role_title || "Processing"}
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-white shrink-0 stroke-[2]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Deck Actions */}
          {flashcards.length > 0 && (
            <div className="flex items-center gap-2 justify-end shrink-0">
              <button
                type="button"
                onClick={handleShuffle}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl bg-white/90 hover:bg-blue-600 text-blue-800 hover:text-white border border-blue-200/80 transition-all active:scale-95 shadow-2xs cursor-pointer"
                title="Shuffle flashcard deck"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Shuffle</span>
              </button>
              <button
                type="button"
                onClick={handleRestart}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl bg-white/90 hover:bg-blue-600 text-blue-800 hover:text-white border border-blue-200/80 transition-all active:scale-95 shadow-2xs cursor-pointer"
                title="Restart deck from start"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center py-16 gap-3 bg-blue-50/70 backdrop-blur-md rounded-3xl border border-blue-200/70 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-blue-100/80 border border-blue-200/80 text-blue-600 flex items-center justify-center shadow-xs">
            <BookOpen className="w-7 h-7" />
          </div>
          <p className="text-sm font-bold text-slate-900">No completed kits yet</p>
          <p className="text-xs font-semibold text-slate-500">Create and complete a kit to start practicing flashcards.</p>
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
        </div>
      ) : currentCard ? (
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          {/* Deck Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900">
              <span className="flex items-center gap-1.5 text-slate-950 font-black">
                <Layers className="w-3.5 h-3.5 text-blue-600" /> Card {currentIndex + 1} of {flashcards.length}
              </span>
              <span className="text-slate-700 font-bold">{Math.round(((currentIndex + 1) / flashcards.length) * 100)}% Completed</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden p-0.5 border border-slate-300/60 shadow-xs">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
              />
            </div>
          </div>

          {/* 3D Vibrant Flashcard with Left & Right Circular Arrow Navigation Buttons */}
          <div className="relative flex items-center gap-3 sm:gap-5">
            {/* Left Previous Arrow Button */}
            <button
              type="button"
              onClick={() => {
                setCurrentIndex((prev) => Math.max(0, prev - 1));
                setIsFlipped(false);
              }}
              disabled={currentIndex === 0}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-200 disabled:text-slate-400 shadow-md hover:shadow-lg disabled:shadow-none transition-all hover:scale-110 active:scale-95 cursor-pointer shrink-0"
              title="Previous Card (←)"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* Card Container */}
            <div className="flex-1 min-w-0">
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
            </div>

            {/* Right Next Arrow Button */}
            <button
              type="button"
              onClick={() => {
                setCurrentIndex((prev) => Math.min(flashcards.length - 1, prev + 1));
                setIsFlipped(false);
              }}
              disabled={currentIndex === flashcards.length - 1}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-200 disabled:text-slate-400 shadow-md hover:shadow-lg disabled:shadow-none transition-all hover:scale-110 active:scale-95 cursor-pointer shrink-0"
              title="Next Card (→)"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

          {/* Rating Buttons Stage — Active when flipped */}
          <div className="min-h-[70px] flex flex-col items-center justify-center transition-all duration-300">
            {isFlipped ? (
              <div className="w-full space-y-2.5 animate-in fade-in slide-in-from-bottom-3 duration-300">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-700">
                    Rate Recall Confidence
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                  {ratings.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => handleRate(r.value)}
                      disabled={ratingSubmitting}
                      className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200/90 font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="opacity-60 text-[10px] font-mono">[{r.shortcut}]</span>
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full py-2.5 px-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-xs text-blue-900 font-medium flex items-center justify-center gap-2 shadow-xs">
                <Keyboard className="w-4 h-4 text-blue-600" />
                <span>Tip: Use <kbd className="px-2 py-0.5 text-[10px] font-mono bg-blue-600 text-white rounded shadow-xs">Space</kbd> to flip, <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-blue-600 text-white rounded shadow-xs">←</kbd> <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-blue-600 text-white rounded shadow-xs">→</kbd> to navigate, and keys <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-blue-600 text-white rounded shadow-xs">1-5</kbd> to rate</span>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
