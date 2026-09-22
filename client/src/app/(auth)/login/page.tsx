"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, User as UserIcon, ArrowRight, Sparkles, Eye, EyeOff } from "lucide-react";

function AuthForm({ initialMode = "login" }: { initialMode?: "login" | "register" }) {
  const searchParams = useSearchParams();
  const modeParam = searchParams.get("mode");
  const [mode, setMode] = useState<"login" | "register">(
    modeParam === "register" ? "register" : initialMode
  );

  const { login, register, isAuthenticated } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "register") {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      router.replace("/");
    } catch (err: any) {
      setError(
        err.message ||
          (mode === "login" ? "Invalid email or password" : "Registration failed. Please try again.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div suppressHydrationWarning className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-sky-100/80 via-blue-50/60 to-indigo-50/40 relative font-sans selection:bg-blue-500 selection:text-white">
      {/* Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-300/30 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-sky-200/40 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Outer Floating Card Container */}
      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-2xl rounded-[36px] sm:rounded-[44px] border border-blue-200/80 p-4 sm:p-6 shadow-[0_25px_80px_rgba(59,130,246,0.12)] grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative overflow-hidden z-10">

        {/* ── LEFT HERO PANEL (BLUE GRADIENT CARD WITH 3D CHARACTER) ── */}
        <div className="md:col-span-6 bg-gradient-to-br from-blue-600 via-sky-500 to-indigo-600 rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 text-white flex flex-col justify-between min-h-[480px] sm:min-h-[540px] relative overflow-hidden shadow-xl">
          
          {/* Subtle Background Mesh Glow */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Headline Text */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-sky-200" />
              <span>AI Interview Co-Pilot</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-white leading-tight">
              Master your next tech interview <span className="font-semibold underline decoration-sky-300/50">with precision.</span>
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-3 leading-relaxed font-normal">
              Real-time company scraping, 5-stage AI synthesis, and 100% requirement coverage.
            </p>
          </div>

          {/* 3D Character Illustration Asset */}
          <div className="relative z-10 mt-6 flex justify-center items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl group-hover:bg-white/30 transition-all pointer-events-none" />
              <img
                src="/auth-hero-character.jpg"
                alt="3D Developer Character"
                className="w-full max-w-[260px] sm:max-w-[290px] h-auto object-cover rounded-3xl shadow-2xl border-2 border-white/40 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT AUTH FORM PANEL ── */}
        <div className="md:col-span-6 px-4 sm:px-8 py-4 flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <Link href="/" className="text-2xl font-bold tracking-tight text-slate-900">
                Trao<span className="text-blue-600">.ai</span>
              </Link>
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal mb-6">
              {mode === "login"
                ? "Please enter your details to sign in to your account"
                : "Start your 100% prepared interview preparation journey today"}
            </p>

            {/* Error Banner */}
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name (Register Mode Only) */}
              {mode === "register" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Harsh Singh"
                      required
                      className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200/90 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400"
                    />
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200/90 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-10 py-3 text-sm bg-slate-50 border border-slate-200/90 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
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
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="w-full pl-10 pr-10 py-3 text-sm bg-slate-50 border border-slate-200/90 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400"
                    />
                  </div>
                </div>
              )}

              {/* Quick Demo Account Button (Login Mode) */}
              {mode === "login" && (
                <button
                  type="button"
                  onClick={() => {
                    setEmail("demo@trao.ai");
                    setPassword("password123");
                  }}
                  className="w-full py-2.5 px-3 bg-blue-50 hover:bg-blue-100/80 text-blue-700 text-xs font-semibold rounded-2xl border border-blue-200/80 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Fill Demo Account (demo@trao.ai)</span>
                </button>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {mode === "login" ? "Login" : "Create Account"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Bottom Mode Toggle Link */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500 font-normal">
            {mode === "login" ? (
              <p>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setError("");
                  }}
                  className="font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer ml-1"
                >
                  Signup
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
                  className="font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer ml-1"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function AuthPage({ initialMode = "login" }: { initialMode?: "login" | "register" }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs font-semibold text-slate-400">Loading auth...</div>}>
      <AuthForm initialMode={initialMode} />
    </Suspense>
  );
}
