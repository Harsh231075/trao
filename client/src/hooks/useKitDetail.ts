"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";
import { ToastMessage } from "@/components/Toast";

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

export interface ConfirmState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  onConfirm: () => void;
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

  // Toast System State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "info", title: string, description?: string) => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    const newToast: ToastMessage = { id, type, title, description };
    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Custom Confirmation Modal State
  const [confirmState, setConfirmState] = useState<ConfirmState>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const openConfirm = (
    title: string,
    message: string,
    onConfirmAction: () => void,
    options?: { confirmText?: string; cancelText?: string; variant?: "danger" | "warning" | "info" }
  ) => {
    setConfirmState({
      isOpen: true,
      title,
      message,
      confirmText: options?.confirmText || "Confirm",
      cancelText: options?.cancelText || "Cancel",
      variant: options?.variant || "danger",
      onConfirm: () => {
        setConfirmState((prev) => ({ ...prev, isOpen: false }));
        onConfirmAction();
      },
    });
  };

  const closeConfirm = () => {
    setConfirmState((prev) => ({ ...prev, isOpen: false }));
  };

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
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRegenerate = async (section: string) => {
    openConfirm(
      `Regenerate "${section.replace(/_/g, " ")}"?`,
      "AI will generate fresh items for this section while preserving your handcrafted & edited items.",
      async () => {
        setRegenerating(section);
        try {
          await api.post(`/kits/${kitId}/regenerate`, { section });
          await fetchKit();
          addToast(
            "success",
            `Section "${section.replace(/_/g, " ")}" Regenerated!`,
            "AI content refreshed. All handcrafted and user-edited items remain pinned and intact."
          );
        } catch (err: any) {
          addToast("error", "Regeneration Failed", err.message || "Unable to regenerate section");
        } finally {
          setRegenerating(null);
        }
      },
      { confirmText: "Regenerate Section", variant: "warning" }
    );
  };

  const handleRestartPipeline = async () => {
    openConfirm(
      "Restart Generation Pipeline?",
      "This will re-run full company research, requirement parsing, and question generation.",
      async () => {
        try {
          await api.post(`/kits/${kitId}/generate`);
          await fetchKit();
          addToast("info", "Pipeline Restarted", "AI pipeline is re-building your kit...");
        } catch (err: any) {
          addToast("error", "Restart Failed", err.message || "Failed to restart pipeline");
        }
      },
      { confirmText: "Restart Pipeline", variant: "warning" }
    );
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
      addToast("success", "Question Edit Saved", "Question prompt and answer outline updated.");
    } catch (err: any) {
      addToast("error", "Save Failed", err.message || "Failed to save question edit");
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
      addToast("success", "Handcrafted Question Added", "Question added to your prep kit deck.");
    } catch (err: any) {
      addToast("error", "Add Failed", err.message || "Failed to add question");
    }
  };

  const deleteQuestion = async (qid: string) => {
    openConfirm(
      "Delete Question?",
      "Are you sure you want to delete this question from your prep kit?",
      async () => {
        try {
          await api.delete(`/kits/${kitId}/questions/${qid}`);
          await fetchKit();
          addToast("info", "Question Removed", "Question deleted from prep kit.");
        } catch (err: any) {
          addToast("error", "Delete Failed", err.message || "Failed to delete question");
        }
      },
      { confirmText: "Delete", variant: "danger" }
    );
  };

  const moveQuestionCategory = async (qid: string, targetCategory: string) => {
    try {
      await api.patch(`/kits/${kitId}/questions/${qid}/move`, { target_category: targetCategory });
      await fetchKit();
      addToast(
        "success",
        "Question Category Moved",
        `Transferred to ${targetCategory.replace(/_/g, " ")} section.`
      );
    } catch (err: any) {
      addToast("error", "Move Failed", err.message || "Failed to move category");
    }
  };

  const reorderQuestionsByIndices = async (category: string, fromIndex: number, toIndex: number) => {
    const catQuestions = kit?.kit_data?.questions?.[category] || [];
    if (
      fromIndex < 0 ||
      fromIndex >= catQuestions.length ||
      toIndex < 0 ||
      toIndex >= catQuestions.length ||
      fromIndex === toIndex
    ) {
      return;
    }

    const newOrder = [...catQuestions];
    const [moved] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, moved);

    // Optimistically update local kit state
    setKit((prev: any) => {
      if (!prev || !prev.kit_data) return prev;
      return {
        ...prev,
        kit_data: {
          ...prev.kit_data,
          questions: {
            ...prev.kit_data.questions,
            [category]: newOrder,
          },
        },
      };
    });

    const question_ids = newOrder.map((q: any) => q.id);
    try {
      await api.put(`/kits/${kitId}/questions/reorder`, { category, question_ids });
      await fetchKit();
      addToast("info", "Order Updated", "Questions reordered successfully.");
    } catch (err: any) {
      addToast("error", "Reorder Failed", err.message || "Failed to reorder questions");
      await fetchKit();
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
      addToast("success", "Flashcard Updated", "Flashcard front and back saved.");
    } catch (err: any) {
      addToast("error", "Save Failed", err.message || "Failed to save flashcard");
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
      addToast("success", "Handcrafted Flashcard Added", "Flashcard added to your deck.");
    } catch (err: any) {
      addToast("error", "Add Failed", err.message || "Failed to add flashcard");
    }
  };

  const deleteFlashcard = async (fid: string) => {
    openConfirm(
      "Delete Flashcard?",
      "Are you sure you want to remove this flashcard from your deck?",
      async () => {
        try {
          await api.delete(`/kits/${kitId}/flashcards/${fid}`);
          await fetchKit();
          addToast("info", "Flashcard Removed", "Flashcard deleted.");
        } catch (err: any) {
          addToast("error", "Delete Failed", err.message || "Failed to delete flashcard");
        }
      },
      { confirmText: "Delete", variant: "danger" }
    );
  };

  const saveCompanyBriefEdit = async () => {
    try {
      await api.patch(`/kits/${kitId}/company-brief`, {
        summary: briefSummary,
        what_they_do: briefWhatTheyDo,
      });
      await fetchKit();
      setIsEditingBrief(false);
      addToast("success", "Company Brief Saved", "Overview summary and products updated.");
    } catch (err: any) {
      addToast("error", "Save Failed", err.message || "Failed to edit company brief");
    }
  };

  return {
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
    reorderQuestionsByIndices,

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
