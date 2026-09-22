"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, User as UserIcon, Sparkles, Eye, EyeOff } from "lucide-react";

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
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#f0f4f9] font-sans selection:bg-sky-500 selection:text-white">
      {/* Outer Floating White Card Container */}
      <div className="w-full max-w-4xl bg-white rounded-[32px] sm:rounded-[40px] shadow-[0_20px_70px_rgba(0,0,0,0.06)] border border-slate-100 p-3 sm:p-4 md:p-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch relative overflow-hidden">

        {/* ── LEFT HERO PANEL (SOLID SKY BLUE CARD WITH HEADING & 3D CHARACTERS) ── */}
        <div className="md:col-span-6 bg-gradient-to-b from-[#38bdf8] via-[#0284c7] to-[#0369a1] rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 md:p-10 text-white flex flex-col justify-between relative overflow-hidden min-h-[460px] sm:min-h-[500px]">

          {/* Top Headline & Subtitle */}
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-[1.2] tracking-tight">
              Simplify interview prep with our{" "}
              <span className="relative inline-block">
                dashboard.
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-2 text-sky-200"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,8 Q50,0 100,8"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-sky-100/90 mt-4 leading-relaxed font-medium">
              Simplify your coding & system design interview prep with our user-friendly AI co-pilot dashboard.
            </p>
          </div>

          {/* 3D Character Illustration Asset at Bottom */}
          <div className="relative z-10 mt-6 flex justify-center items-end -mb-6 sm:-mb-8 -mx-6 sm:-mx-8">
            <img
              src="/auth-hero-character.jpg"
              alt="3D Developer Characters"
              className="w-full max-w-[340px] sm:max-w-[380px] h-auto object-cover object-bottom rounded-b-[24px] sm:rounded-b-[32px] drop-shadow-xl"
            />
          </div>
        </div>

        {/* ── RIGHT AUTH FORM PANEL (DIRECTLY ON MAIN WHITE CONTAINER) ── */}
        <div className="md:col-span-6 px-3 sm:px-6 md:px-8 py-4 sm:py-6 flex flex-col justify-center">

          {/* Logo Badge */}
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-[#38bdf8] text-white flex items-center justify-center font-extrabold text-lg shadow-md shadow-sky-400/30">
              T
            </div>
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-slate-900">
              Trao<span className="text-sky-500">.ai</span>
            </Link>
          </div>

          {/* Title & Subtitle */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium mb-6">
            {mode === "login"
              ? "Please login to your account"
              : "Please enter your details to create an account"}
          </p>

          {/* Error Banner */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">

            {/* Full Name (Register Mode Only) */}
            {mode === "register" && (
              <div>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    required
                    className="w-full pl-11 pr-4 py-3.5 text-sm bg-[#f4f6fa] border border-transparent focus:border-sky-300 focus:bg-white rounded-xl focus:outline-none focus:ring-4 focus:ring-sky-100 transition-all text-slate-800 placeholder:text-slate-400 font-medium"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="w-full pl-11 pr-4 py-3.5 text-sm bg-[#f4f6fa] border border-transparent focus:border-sky-300 focus:bg-white rounded-xl focus:outline-none focus:ring-4 focus:ring-sky-100 transition-all text-slate-800 placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  minLength={6}
                  className="w-full pl-11 pr-11 py-3.5 text-sm bg-[#f4f6fa] border border-transparent focus:border-sky-300 focus:bg-white rounded-xl focus:outline-none focus:ring-4 focus:ring-sky-100 transition-all text-slate-800 placeholder:text-slate-400 font-medium"
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
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    minLength={6}
                    className="w-full pl-11 pr-11 py-3.5 text-sm bg-[#f4f6fa] border border-transparent focus:border-sky-300 focus:bg-white rounded-xl focus:outline-none focus:ring-4 focus:ring-sky-100 transition-all text-slate-800 placeholder:text-slate-400 font-medium"
                  />
                </div>
              </div>
            )}

            {/* Forgot Password Link */}
            {mode === "login" && (
              <div className="flex justify-between items-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setEmail("demo@trao.ai");
                    setPassword("password123");
                  }}
                  className="text-xs font-semibold text-sky-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-sky-500" />
                  <span>Fill Demo Account</span>
                </button>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Password reset feature coming soon!");
                  }}
                  className="text-xs font-medium text-slate-400 hover:text-sky-600 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#38bdf8] hover:bg-[#0284c7] text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-sky-400/25 hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>{mode === "login" ? "Login" : "Create Account"}</>
              )}
            </button>
          </form>

          {/* Bottom Mode Toggle Link */}
          <div className="mt-8 text-center text-xs sm:text-sm text-slate-400 font-medium">
            {mode === "login" ? (
              <p>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setError("");
                  }}
                  className="font-bold text-sky-500 hover:text-sky-600 hover:underline cursor-pointer ml-1"
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
                  className="font-bold text-sky-500 hover:text-sky-600 hover:underline cursor-pointer ml-1"
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
    <Suspense fallback={<div className="min-h-screen bg-[#f0f4f9] flex items-center justify-center text-xs font-semibold text-slate-400">Loading auth...</div>}>
      <AuthForm initialMode={initialMode} />
    </Suspense>
  );
}
