"use client";

import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";

export function CustomSessionProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render SessionProvider on the client to avoid hydration issues
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <SessionProvider
      refetchInterval={0}
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  );
}
