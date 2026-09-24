"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

export interface EditingQuestionState {
  id: string;
  category: string;
  text: string;
  answer_outline: string;
  difficulty: number;
}

export interface EditingFlashcardState {
  id: string;
  front: string;
  back: string;
}

export function useKitDetail(kitId: string) {
  const [kit, setKit] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    company_brief: true,
    requirements: true,
    technical: true,
    behavioural: false,
    system_design: false,
    company_fit: false,
    flashcards: false,
    coverage: false,
    schedule: false,
  });
  const [regenerating, setRegenerating] = useState<string | null>(null);

  // Builder Edit / Add States
  const [editingQuestion, setEditingQuestion] = useState<EditingQuestionState | null>(null);
  const [addingQuestionCategory, setAddingQuestionCategory] = useState<string | null>(null);
  const [newQText, setNewQText] = useState("");
  const [newQOutline, setNewQOutline] = useState("");
  const [newQDiff, setNewQDiff] = useState(2);

  const [editingFlashcard, setEditingFlashcard] = useState<EditingFlashcardState | null>(null);
  const [isAddingFlashcard, setIsAddingFlashcard] = useState(false);
  const [newFcFront, setNewFcFront] = useState("");
  const [newFcBack, setNewFcBack] = useState("");

  const [isEditingBrief, setIsEditingBrief] = useState(false);
  const [briefSummary, setBriefSummary] = useState("");
  const [briefWhatTheyDo, setBriefWhatTheyDo] = useState("");

  // Fetch Kit Details
  const fetchKit = useCallback(async () => {
    if (!kitId) return;
    try {
      const data = await api.get(`/kits/${kitId}`);
      setKit(data.kit);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to fetch kit");
    } finally {
      setIsLoading(false);
    }
  }, [kitId]);

  useEffect(() => {
    fetchKit();
  }, [fetchKit]);

  // Fast polling while status is in-progress (every 2.5s)
  useEffect(() => {
    if (!kit || ["completed", "partial", "failed"].includes(kit.status)) return;
    const interval = setInterval(fetchKit, 2500);
    return () => clearInterval(interval);
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
      alert(err.message || "Failed to regenerate section");
    } finally {
      setRegenerating(null);
    }
  };

  const handleRestartPipeline = async () => {
    try {
      await api.post(`/kits/${kitId}/generate`);
      await fetchKit();
    } catch (err: any) {
      alert(err.message || "Failed to restart generation pipeline");
    }
  };

  // ─── BUILDER API HANDLERS ───

  const saveQuestionEdit = async () => {
    if (!editingQuestion) return;
    try {
      await api.patch(`/kits/${kitId}/questions/${editingQuestion.id}`, {
        text: editingQuestion.text,
        answer_outline: editingQuestion.answer_outline,
        difficulty: editingQuestion.difficulty,
      });
      await fetchKit();
      setEditingQuestion(null);
    } catch (err: any) {
      alert(err.message || "Failed to save question edit");
    }
  };

  const saveNewQuestion = async () => {
    if (!addingQuestionCategory || !newQText.trim()) return;
    try {
      await api.post(`/kits/${kitId}/questions`, {
        category: addingQuestionCategory,
        text: newQText.trim(),
        answer_outline: newQOutline.trim(),
        difficulty: newQDiff,
      });
      await fetchKit();
      setAddingQuestionCategory(null);
      setNewQText("");
      setNewQOutline("");
      setNewQDiff(2);
    } catch (err: any) {
      alert(err.message || "Failed to add new question");
    }
  };

  const deleteQuestion = async (qid: string) => {
    if (!confirm("Delete this question from your prep kit?")) return;
    try {
      await api.delete(`/kits/${kitId}/questions/${qid}`);
      await fetchKit();
    } catch (err: any) {
      alert(err.message || "Failed to delete question");
    }
  };

  const moveQuestionCategory = async (qid: string, targetCategory: string) => {
    try {
      await api.patch(`/kits/${kitId}/questions/${qid}/move`, { target_category: targetCategory });
      await fetchKit();
    } catch (err: any) {
      alert(err.message || "Failed to move question category");
    }
  };

  const reorderQuestion = async (category: string, qid: string, direction: "up" | "down") => {
    const catQuestions = kit?.kit_data?.questions?.[category] || [];
    const idx = catQuestions.findIndex((q: any) => q.id === qid);
    if (idx === -1) return;

    const newIdx = direction === "up" ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= catQuestions.length) return;

    const newOrder = [...catQuestions];
    const [moved] = newOrder.splice(idx, 1);
    newOrder.splice(newIdx, 0, moved);

    const question_ids = newOrder.map((q: any) => q.id);
    try {
      await api.put(`/kits/${kitId}/questions/reorder`, { category, question_ids });
      await fetchKit();
    } catch (err: any) {
      alert(err.message || "Failed to reorder questions");
    }
  };

  const saveFlashcardEdit = async () => {
    if (!editingFlashcard) return;
    try {
      await api.patch(`/kits/${kitId}/flashcards/${editingFlashcard.id}`, {
        front: editingFlashcard.front,
        back: editingFlashcard.back,
      });
      await fetchKit();
      setEditingFlashcard(null);
    } catch (err: any) {
      alert(err.message || "Failed to save flashcard");
    }
  };

  const saveNewFlashcard = async () => {
    if (!newFcFront.trim() || !newFcBack.trim()) return;
    try {
      await api.post(`/kits/${kitId}/flashcards`, {
        front: newFcFront.trim(),
        back: newFcBack.trim(),
      });
      await fetchKit();
      setIsAddingFlashcard(false);
      setNewFcFront("");
      setNewFcBack("");
    } catch (err: any) {
      alert(err.message || "Failed to add flashcard");
    }
  };

  const deleteFlashcard = async (fid: string) => {
    if (!confirm("Delete this flashcard?")) return;
    try {
      await api.delete(`/kits/${kitId}/flashcards/${fid}`);
      await fetchKit();
    } catch (err: any) {
      alert(err.message || "Failed to delete flashcard");
    }
  };

  const saveCompanyBriefEdit = async () => {
    try {
      await api.patch(`/kits/${kitId}/company-brief`, {
        summary: briefSummary,
        what_they_do: briefWhatTheyDo,
      });
      await fetchKit();
      setIsEditingBrief(false);
    } catch (err: any) {
      alert(err.message || "Failed to edit company brief");
    }
  };

  return {
    kit,
    isLoading,
    error,
    expandedSections,
    regenerating,
    toggleSection,
    handleRegenerate,
    handleRestartPipeline,
    
    // Questions
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
    reorderQuestion,

    // Flashcards
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
  };
}
