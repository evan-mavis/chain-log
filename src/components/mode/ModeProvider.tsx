"use client";

import React from "react";

type AppMode = "real" | "demo";

const ModeContext = React.createContext<{ mode: AppMode }>({ mode: "real" });

export function ModeProvider({
  mode,
  children,
}: {
  mode: AppMode;
  children: React.ReactNode;
}) {
  return <ModeContext.Provider value={{ mode }}>{children}</ModeContext.Provider>;
}

export function useAppMode() {
  return React.useContext(ModeContext);
}


