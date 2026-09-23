"use client";

import React, { useState } from "react";

interface ModernFlashcardProps {
  front: string;
  back: string;
  category?: string;
  requirementCount?: number;
  isFlipped: boolean;
  onFlip: () => void;
  cardIndex?: number;
  totalCards?: number;
}

export default function ModernFlashcard({
  front,
  back,
  category,
  requirementCount,
  isFlipped,
  onFlip,
  cardIndex,
  totalCards,
}: ModernFlashcardProps) {
  const [shockwave, setShockwave] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShockwave(true);
    setTimeout(() => setShockwave(false), 500);
    onFlip();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto my-4 min-h-[360px] sm:min-h-[400px] select-none">
      {/* Shockwave Radial Energy Ripple Overlay */}
      {shockwave && (
        <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center overflow-hidden rounded-3xl">
          <div className="w-full h-full rounded-3xl animate-ping border-2 border-white/80 bg-white/20 shadow-[0_0_60px_rgba(255,255,255,0.8)] opacity-75" />
        </div>
      )}

      {/* 3D Scene Wrapper with 1200px perspective */}
      <div
        className="w-full h-full relative cursor-pointer"
        style={{ perspective: "1200px" }}
        onClick={handleCardClick}
      >
        {/* Card Rotator Container */}
        <div
          className="w-full h-full min-h-[360px] sm:min-h-[400px] relative transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* ================= FRONT FACE (Lighter Blue #5b95f2 Surface) ================= */}
          <div
            className="absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-9 flex flex-col justify-between overflow-hidden bg-[#5b95f2] text-white border-2 border-blue-200/90 shadow-[0_14px_40px_rgba(91,149,242,0.35)] hover:shadow-[0_18px_50px_rgba(91,149,242,0.5)] transition-all duration-300"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
            }}
          >
            {/* Top Bar Navigation & Info */}
            <div className="relative z-10 flex items-center justify-between gap-2 border-b border-white/20 pb-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-slate-950 text-white shadow-md">
                  QUESTION
                </span>
                {category && (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-white border border-white/30">
                    {category}
                  </span>
                )}
              </div>

              {cardIndex !== undefined && totalCards !== undefined && (
                <span className="text-xs font-mono font-bold text-white bg-slate-950/40 px-2.5 py-1 rounded-lg border border-white/20 shadow-sm">
                  {cardIndex + 1} / {totalCards}
                </span>
              )}
            </div>

            {/* Central Question Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center my-6">
              <p className="text-xl sm:text-2xl font-black text-white leading-relaxed tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
                {front}
              </p>
            </div>

            {/* Bottom Interaction Cue */}
            <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-4">
              <div className="text-xs text-white font-semibold">
                Click card or press <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-950 text-white rounded shadow">Space</kbd> to reveal
              </div>
              <div className="px-3 py-1 rounded-xl bg-slate-950 text-white text-xs font-bold shadow-md">
                Reveal Answer
              </div>
            </div>
          </div>

          {/* ================= BACK FACE (Lighter Blue #5b95f2 Surface) ================= */}
          <div
            className="absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-9 flex flex-col justify-between overflow-hidden bg-[#5b95f2] text-white border-2 border-blue-200/90 shadow-[0_14px_40px_rgba(91,149,242,0.35)] hover:shadow-[0_18px_50px_rgba(91,149,242,0.5)] transition-all duration-300"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Top Bar Navigation & Info */}
            <div className="relative z-10 flex items-center justify-between gap-2 border-b border-white/20 pb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-slate-950 text-white shadow-md">
                ANSWER SOLUTION
              </span>

              {cardIndex !== undefined && totalCards !== undefined && (
                <span className="text-xs font-mono font-bold text-white bg-slate-950/40 px-2.5 py-1 rounded-lg border border-white/20 shadow-sm">
                  {cardIndex + 1} / {totalCards}
                </span>
              )}
            </div>

            {/* Central Answer Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center my-4 overflow-y-auto max-h-[220px] sm:max-h-[260px] pr-2 custom-scrollbar">
              <div className="text-base sm:text-lg text-white leading-relaxed font-bold whitespace-pre-wrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
                {back}
              </div>
            </div>

            {/* Bottom Controls / Prompt */}
            <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-4">
              <div className="text-xs text-white font-semibold">
                Rate your confidence below to schedule spaced review
              </div>
              <div className="text-xs font-mono font-bold text-white bg-slate-950 px-2.5 py-1 rounded-lg shadow-md">
                Flipped ✓
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
