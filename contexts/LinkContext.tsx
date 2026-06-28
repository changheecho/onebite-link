"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { mockLinks, type LinkItem } from "@/lib/linkData";

export type { LinkItem };

type LinkContextType = {
  links: LinkItem[];
  addLink: (link: LinkItem) => void;
  deleteLink: (id: number) => void;
  linkToDelete: LinkItem | null;
  openDeleteModal: (link: LinkItem) => void;
  closeDeleteModal: () => void;
};

const LinkContext = createContext<LinkContextType | null>(null);

export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(mockLinks);
  const [linkToDelete, setLinkToDelete] = useState<LinkItem | null>(null);

  function addLink(link: LinkItem) {
    setLinks((prev) => [link, ...prev]);
  }

  function deleteLink(id: number) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <LinkContext.Provider
      value={{
        links,
        addLink,
        deleteLink,
        linkToDelete,
        openDeleteModal: (link) => setLinkToDelete(link),
        closeDeleteModal: () => setLinkToDelete(null),
      }}
    >
      {children}
    </LinkContext.Provider>
  );
}

export function useLinkContext() {
  const ctx = useContext(LinkContext);
  if (!ctx) throw new Error("useLinkContext must be used inside LinkProvider");
  return ctx;
}
