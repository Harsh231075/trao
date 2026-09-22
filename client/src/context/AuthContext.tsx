"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api, setToken as storeToken, clearToken, getToken } from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Validate session on mount
  useEffect(() => {
    const savedToken = getToken();
    if (savedToken) {
      setTokenState(savedToken);
      api
        .get("/auth/session")
        .then((data) => {
          setUser(data.user);
        })
        .catch(() => {
          // Token invalid/expired
          clearToken();
          setTokenState(null);
          setUser(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await api.post(
      "/auth/login",
      { email, password },
      { skipAuth: true }
    );
    storeToken(data.token);
    setTokenState(data.token);
    setUser(data.user);
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const data = await api.post(
        "/auth/register",
        { name, email, password },
        { skipAuth: true }
      );
      storeToken(data.token);
      setTokenState(data.token);
      setUser(data.user);
    },
    []
  );

  const logout = useCallback(() => {
    clearToken();
    setTokenState(null);
    setUser(null);
    // Fire & forget server-side logout
    api.post("/auth/logout").catch(() => {});
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
