"use client";

import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  description?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export default function Toast({ toasts, onDismiss }: ToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-2xl border shadow-xl backdrop-blur-xl transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in ${
            toast.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-100 shadow-emerald-900/20"
              : toast.type === "error"
              ? "bg-rose-950/90 border-rose-500/50 text-rose-100 shadow-rose-900/20"
              : "bg-blue-950/90 border-blue-500/50 text-blue-100 shadow-blue-900/20"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="shrink-0 pt-0.5">
              {toast.type === "success" && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              )}
              {toast.type === "error" && (
                <AlertCircle className="w-5 h-5 text-rose-400" />
              )}
              {toast.type === "info" && (
                <Info className="w-5 h-5 text-blue-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold leading-snug">{toast.title}</h4>
              {toast.description && (
                <p className="text-[11px] font-medium opacity-80 mt-0.5 leading-normal">
                  {toast.description}
                </p>
              )}
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-lg opacity-60 hover:opacity-100 hover:bg-white/10 transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
