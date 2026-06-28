"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { mockLinks, type LinkItem } from "@/lib/linkData";

export type { LinkItem };

type LinkContextType = {
  links: LinkItem[];
  addLink: (link: LinkItem) => void;
  deleteLink: (id: number) => void;
  updateLink: (id: number, fields: Partial<Pick<LinkItem, "title" | "description" | "folder">>) => void;
  linkToDelete: LinkItem | null;
  openDeleteModal: (link: LinkItem) => void;
  closeDeleteModal: () => void;
  linkToEdit: LinkItem | null;
  openEditModal: (link: LinkItem) => void;
  closeEditModal: () => void;
};

const LinkContext = createContext<LinkContextType | null>(null);

export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(mockLinks);
  const [linkToDelete, setLinkToDelete] = useState<LinkItem | null>(null);
  const [linkToEdit, setLinkToEdit] = useState<LinkItem | null>(null);

  function addLink(link: LinkItem) {
    setLinks((prev) => [link, ...prev]);
  }

  function deleteLink(id: number) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  function updateLink(id: number, fields: Partial<Pick<LinkItem, "title" | "description" | "folder">>) {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...fields } : l)));
  }

  return (
    <LinkContext.Provider
      value={{
        links,
        addLink,
        deleteLink,
        updateLink,
        linkToDelete,
        openDeleteModal: (link) => setLinkToDelete(link),
        closeDeleteModal: () => setLinkToDelete(null),
        linkToEdit,
        openEditModal: (link) => setLinkToEdit(link),
        closeEditModal: () => setLinkToEdit(null),
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
