"use client";

import { createContext, useContext, useState } from "react";

const RefreshContext = createContext(null);

export function RefreshProvider({ children }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    console.log("REFRESH TRIGGERED"); // 🔍 debug
    setRefreshKey((k) => k + 1);
  };

  return (
    <RefreshContext.Provider value={{ refresh }}>
      {/* THIS is what forces remount */}
      <div key={refreshKey}>{children}</div>
    </RefreshContext.Provider>
  );
}

export function useRefresh() {
  const ctx = useContext(RefreshContext);
  if (!ctx) {
    throw new Error("useRefresh must be used inside RefreshProvider");
  }
  return ctx;
}
