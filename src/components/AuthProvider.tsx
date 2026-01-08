"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: any | null;
  authLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  authLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const session = localStorage.getItem("session");

        if (session) {
          setUser(JSON.parse(session));
        } else {
          setUser(null);
        }
      } finally {
        // ✅ VERY IMPORTANT
        setAuthLoading(false);
      }
    };

    loadSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
