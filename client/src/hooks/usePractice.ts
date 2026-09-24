"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

export function usePractice() {
  const [kits, setKits] = useState<any[]>([]);
  const [selectedKitId, setSelectedKitId] = useState<string>("");
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeckLoading, setIsDeckLoading] = useState(false);
  const [ratingSubmitting, setRatingSubmitting] = useState(false);
  const [progress, setProgress] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Outside click listener for custom dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#custom-kit-select")) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Fetch completed kits
  useEffect(() => {
    api.get("/kits")
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

  // Fetch deck when selected kit changes
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
      console.error("Failed to fetch deck:", err);
    } finally {
      setIsDeckLoading(false);
    }
  }, [selectedKitId]);

  useEffect(() => {
    fetchDeck();
  }, [fetchDeck]);

  const currentCard = flashcards[currentIndex];

  // Submit confidence rating for current card
  const handleRate = async (confidence: number) => {
    if (!currentCard || ratingSubmitting) return;
    setRatingSubmitting(true);
    try {
      await api.post(`/kits/${selectedKitId}/practice`, {
        flashcard_id: currentCard.id,
        confidence,
      });

      // Visually update progress stats
      if (progress) {
        const newTotal = (progress.total_reviews || 0) + 1;
        const newAvg =
          (((progress.average_confidence || 3) * (progress.total_reviews || 0)) + confidence) /
          newTotal;
        setProgress({
          ...progress,
          total_reviews: newTotal,
          average_confidence: newAvg,
        });
      }

      // Move to next card or refresh deck if finished
      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setIsFlipped(false);
      } else {
        await fetchDeck();
      }
    } catch (err) {
      console.error("Failed to rate card:", err);
    } finally {
      setRatingSubmitting(false);
    }
  };

  // Shuffle deck
  const handleShuffle = () => {
    if (flashcards.length <= 1) return;
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // Restart deck
  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
  }, [flashcards.length, isFlipped, currentCard, ratingSubmitting, selectedKitId]);

  return {
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
  };
}
