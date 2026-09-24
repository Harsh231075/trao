"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useAuthForm } from "@/hooks/useAuthForm";
import { Mail, Lock, User as UserIcon, Sparkles, Eye, EyeOff } from "lucide-react";

function AuthForm({ initialMode = "login" }: { initialMode?: "login" | "register" }) {
  const {
    mode,
    setMode,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    error,
    setError,
    isSubmitting,
    handleSubmit,
  } = useAuthForm(initialMode);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#EAF3FF] via-[#BBD8FF] to-[#91B9F8] flex items-center justify-center font-sans py-8 px-4 sm:px-8 lg:px-16 selection:bg-[#2166F3] selection:text-white relative overflow-hidden">
      {/* Subtle Atmospheric Blue Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-blue-400/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* ── SPLIT LAYOUT ── */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

        {/* ── LEFT SIDE: VISUAL BRAND AREA ── */}
        <div className="lg:col-span-6 bg-gradient-to-br from-[#1769F5] via-[#16A9E8] to-[#4C5BFF] rounded-[36px] p-8 sm:p-10 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden min-h-[540px] lg:min-h-[600px]">

          {/* Abstract Light Shapes */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Text Content */}
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.18]">
              Master your next <br />
              tech interview <span className="text-sky-200">with precision.</span>
            </h1>

            <p className="text-blue-100/90 text-sm sm:text-base mt-3.5 leading-relaxed font-normal max-w-md">
              AI-powered preparation built around your role, skills, and interview requirements.
            </p>
          </div>

          {/* Transparent Character Asset */}
          <div className="relative z-10 mt-8 flex justify-center items-center">
            <img
              src="/ChatGPT Image Sep 22, 2026, 09_51_05 PM.png"
              alt="3D Developer Character"
              className="w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] h-auto object-contain filter drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 pointer-events-none"
            />
          </div>
        </div>

        {/* ── RIGHT SIDE: AUTH FORM ── */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start justify-center lg:pl-8 xl:pl-12">

          <div className="w-full max-w-[440px]">

            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-8">
              <Link href="/" className="text-2xl font-extrabold tracking-tight text-[#0F172A]">
                Trao<span className="text-[#2166F3]">.ai</span>
              </Link>
            </div>

            {/* Heading & Subtitle */}
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-sm text-slate-600 mt-1.5 mb-8 font-normal">
              {mode === "login"
                ? "Sign in to continue your interview preparation."
                : "Start your AI-powered interview preparation today."}
            </p>

            {/* Error Banner */}
            {error && (
              <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200/80 rounded-2xl text-red-600 text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full Name (Register Mode Only) */}
              {mode === "register" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Mercer"
                      required
                      className="w-full pl-11 pr-4 py-3.5 text-sm bg-white/90 border border-blue-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2166F3] focus:border-[#2166F3] focus:bg-white transition-all text-[#0F172A] placeholder:text-slate-400 font-medium shadow-none"
                    />
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                    className="w-full pl-11 pr-4 py-3.5 text-sm bg-white/90 border border-blue-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2166F3] focus:border-[#2166F3] focus:bg-white transition-all text-[#0F172A] placeholder:text-slate-400 font-medium shadow-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full pl-11 pr-11 py-3.5 text-sm bg-white/90 border border-blue-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2166F3] focus:border-[#2166F3] focus:bg-white transition-all text-[#0F172A] placeholder:text-slate-400 font-medium shadow-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Register Mode Only) */}
              {mode === "register" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="w-full pl-11 pr-11 py-3.5 text-sm bg-white/90 border border-blue-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2166F3] focus:border-[#2166F3] focus:bg-white transition-all text-[#0F172A] placeholder:text-slate-400 font-medium shadow-none"
                    />
                  </div>
                </div>
              )}

              {/* Demo Fill & Forgot Password */}
              {mode === "login" && (
                <div className="flex justify-between items-center pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setEmail("demo@trao.ai");
                      setPassword("password123");
                    }}
                    className="text-xs font-semibold text-[#2166F3] hover:underline flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#2166F3]" />
                    <span>Fill Demo Account</span>
                  </button>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Password reset instructions sent to your email!");
                    }}
                    className="text-xs font-medium text-slate-600 hover:text-[#2166F3] transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#2166F3] hover:bg-[#1853cc] text-white font-bold text-base rounded-2xl shadow-none hover:shadow-none transition-colors active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed mt-6 cursor-pointer border-none outline-none"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <span>{mode === "login" ? "Login" : "Create Account"}</span>
                    <span className="text-lg leading-none">→</span>
                  </>
                )}
              </button>
            </form>

            {/* Mode Switcher */}
            <div className="mt-8 text-center text-xs sm:text-sm text-slate-600 font-medium">
              {mode === "login" ? (
                <p>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("register");
                      setError("");
                    }}
                    className="font-bold text-[#2166F3] hover:underline cursor-pointer ml-1"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setError("");
                    }}
                    className="font-bold text-[#2166F3] hover:underline cursor-pointer ml-1"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default function AuthPage({ initialMode = "login" }: { initialMode?: "login" | "register" }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f0f4f9] flex items-center justify-center text-xs font-semibold text-slate-400">Loading auth...</div>}>
      <AuthForm initialMode={initialMode} />
    </Suspense>
  );
}
