"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { setCookie, TokenStorageKey } from "../hook/setCookie";

export function CustomProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setCookie(
      TokenStorageKey.accessToken,
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJTV0VBViIsImlhdCI6MTc0NDQ1ODYzMSwiZXhwIjoyMDU1NDk4NjMxLCJ1c2VySWQiOjc0MjY1Njg2OTU1Nzg2MjR9.G9KRCpW2MTyCxWJKJc8BfosK_pUa5xgyqBu-Rd80M1tNu8nxYsxxaDta536ugzmj67cfXFtlIqjc6thWt_6REQ"
    );
  }, []);
  const queryClient = new QueryClient();
  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider />
        {children}
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
