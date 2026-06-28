"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { mockLinks, type LinkItem } from "@/lib/linkData";

export type { LinkItem };

type LinkContextType = {
  links: LinkItem[];
  addLink: (link: LinkItem) => void;
};

const LinkContext = createContext<LinkContextType | null>(null);

export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(mockLinks);

  function addLink(link: LinkItem) {
    setLinks((prev) => [link, ...prev]);
  }

  return (
    <LinkContext.Provider value={{ links, addLink }}>
      {children}
    </LinkContext.Provider>
  );
}

export function useLinkContext() {
  const ctx = useContext(LinkContext);
  if (!ctx) throw new Error("useLinkContext must be used inside LinkProvider");
  return ctx;
}
