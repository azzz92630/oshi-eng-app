"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const StatsContext = createContext<any>(undefined);

export function StatsProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState({ streak: 1, learnedCount: 0, level: 1 });
  
  useEffect(() => {
    const saved = localStorage.getItem("oshienglish-stats");
    if (saved) {
      try { setStats(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const updateStats = (newStats: any) => {
    setStats(newStats);
    localStorage.setItem("oshienglish-stats", JSON.stringify(newStats));
  };

  return (
    <StatsContext.Provider value={{ ...stats, updateStats }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const context = useContext(StatsContext);
  if (context === undefined) {
    return { streak: 1, learnedCount: 0, level: 1, updateStats: () => {} };
  }
  return context;
}
