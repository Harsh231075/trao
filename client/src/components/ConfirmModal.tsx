"use client";

import React from "react";
import { AlertTriangle, HelpCircle, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-blue-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                variant === "danger"
                  ? "bg-rose-50 border-rose-200 text-rose-600"
                  : variant === "warning"
                  ? "bg-amber-50 border-amber-200 text-amber-600"
                  : "bg-blue-50 border-blue-200 text-blue-600"
              }`}
            >
              {variant === "danger" ? (
                <AlertTriangle className="w-5 h-5" />
              ) : (
                <HelpCircle className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">{title}</h3>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">{message}</p>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 text-xs font-bold text-white rounded-xl shadow-2xs transition-all active:scale-95 cursor-pointer ${
              variant === "danger"
                ? "bg-rose-600 hover:bg-rose-700"
                : variant === "warning"
                ? "bg-amber-600 hover:bg-amber-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
