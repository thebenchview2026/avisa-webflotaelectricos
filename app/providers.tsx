"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../client/src/lib/queryClient";
import { TooltipProvider } from "../client/src/components/ui/tooltip";
import { Toaster } from "../client/src/components/ui/toaster";
import CookieConsent from "../client/src/components/CookieConsent";
import ChatbotWidget from "../client/src/components/ChatbotWidget";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {children}
        <CookieConsent />
        <ChatbotWidget />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
