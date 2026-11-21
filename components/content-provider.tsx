"use client";

import { createContext, useContext, type ReactNode } from "react";
import { LOCAL_CONTENT, type SiteContent } from "@/lib/content-local";

// Defaults to the local content, so components still render outside the provider.
const ContentContext = createContext<SiteContent>(LOCAL_CONTENT);

export function ContentProvider({ value, children }: { value: SiteContent; children: ReactNode }) {
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

/** Site content (from Sanity when configured, otherwise local) for client components. */
export function useContent() {
  return useContext(ContentContext);
}
