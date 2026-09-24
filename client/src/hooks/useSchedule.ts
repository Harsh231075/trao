"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

export function useSchedule() {
  const [kits, setKits] = useState<any[]>([]);
  const [selectedKitId, setSelectedKitId] = useState<string>("");
  const [selectedKit, setSelectedKit] = useState<any>(null);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [daysAvailable, setDaysAvailable] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isScheduleLoading, setIsScheduleLoading] = useState(false);
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({});

  const toggleDayExpand = (dayNum: number) => {
    setExpandedDays(prev => ({
      ...prev,
      [dayNum]: prev[dayNum] !== undefined ? !prev[dayNum] : false
    }));
  };

  // Fetch completed kits
  useEffect(() => {
    api.get("/kits")
      .then(data => {
        const completedKits = (data.kits || []).filter((k: any) => k.status === "completed");
        setKits(completedKits);
        if (completedKits.length > 0) {
          setSelectedKitId(completedKits[0]._id);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // Fetch kit details and schedule when selected kit changes
  const fetchSchedule = useCallback(async () => {
    if (!selectedKitId) return;
    setIsScheduleLoading(true);
    try {
      const data = await api.get(`/kits/${selectedKitId}`);
      const kitData = data.kit || {};
      setSelectedKit(kitData);
      setSchedule(kitData.kit_data?.schedule || []);
      setDaysAvailable(kitData.days_available || 0);
    } catch (err) {
      console.error("Failed to fetch schedule:", err);
    } finally {
      setIsScheduleLoading(false);
    }
  }, [selectedKitId]);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  // Computed dynamic active day based on kit creation date
  const kitCreatedAt = selectedKit?.created_at ? new Date(selectedKit.created_at) : new Date();
  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - kitCreatedAt.getTime());
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const activeDayNumber = Math.min(daysAvailable || 7, Math.max(1, diffDays + 1));

  // Extract sub-points / key topics for a day
  const getSubPointsForDay = (day: any) => {
    const subPoints: string[] = [];
    if (selectedKit?.kit_data?.questions) {
      for (const catQs of Object.values(selectedKit.kit_data.questions)) {
        if (Array.isArray(catQs)) {
          for (const q of catQs as any[]) {
            if (day.question_ids?.includes(q.id)) {
              subPoints.push(q.text);
            }
          }
        }
      }
    }
    if (subPoints.length > 0) return subPoints;

    const focusLower = (day.focus || "").toLowerCase();
    if (focusLower.includes("technical")) {
      return [
        "Review core data structures, algorithms & space-time complexity.",
        "Solve primary coding pattern questions assigned for this role."
      ];
    } else if (focusLower.includes("behavioural")) {
      return [
        "Draft STAR method responses (Situation, Task, Action, Result) for past project challenges.",
        "Review company core values & engineering culture."
      ];
    } else if (focusLower.includes("system")) {
      return [
        "Design high-availability microservices & database partitioning.",
        "Review caching strategies, load balancing & API rate limiting."
      ];
    }
    return [
      "Review essential MUST requirements & company technical stack.",
      "Self-conduct practice response walkthrough."
    ];
  };

  // Computed stats
  const totalMinutes = schedule.reduce((sum, d) => sum + (d.minutes || 0), 0);
  const totalQuestions = schedule.reduce((sum, d) => sum + (d.question_ids?.length || 0), 0);

  return {
    kits,
    selectedKitId,
    setSelectedKitId,
    selectedKit,
    schedule,
    isLoading,
    isScheduleLoading,
    expandedDays,
    toggleDayExpand,
    activeDayNumber,
    getSubPointsForDay,
    totalMinutes,
    totalQuestions,
  };
}
