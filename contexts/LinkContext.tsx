"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type LinkItem } from "@/lib/linkData";
import { createClient } from "@/utils/supabase/client";

export type { LinkItem };

type LinkContextType = {
  links: LinkItem[];
  addLink: (link: LinkItem) => Promise<void>;
  deleteLink: (id: number) => void;
  updateLink: (id: number, fields: Partial<Pick<LinkItem, "title" | "description" | "folder" | "folder_id">>) => Promise<void>;
  linkToDelete: LinkItem | null;
  openDeleteModal: (link: LinkItem) => void;
  closeDeleteModal: () => void;
  linkToEdit: LinkItem | null;
  openEditModal: (link: LinkItem) => void;
  closeEditModal: () => void;
};

const LinkContext = createContext<LinkContextType | null>(null);

export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [linkToDelete, setLinkToDelete] = useState<LinkItem | null>(null);
  const [linkToEdit, setLinkToEdit] = useState<LinkItem | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("link")
      .select("id, url, title, description, thumbnail_url, folder_id, folder:folder_id(name)")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) {
          setLinks(
            data.map((item) => ({
              id: item.id as number,
              url: item.url as string,
              title: (item.title as string | null) ?? (item.url as string),
              description: (item.description as string | null) ?? "",
              thumbnail: (item.thumbnail_url as string | null) ?? undefined,
              folder: ((item.folder as { name: string } | null)?.name) ?? "",
              folder_id: (item.folder_id as number | null) ?? null,
            }))
          );
        }
      });
  }, []);

  async function addLink(link: LinkItem) {
    const supabase = createClient();
    const { data } = await supabase
      .from("link")
      .insert({
        url: link.url,
        title: link.title || null,
        description: link.description || null,
        thumbnail_url: link.thumbnail || null,
        folder_id: link.folder_id ?? null,
      })
      .select("id, url, title, description, thumbnail_url, folder_id, folder:folder_id(name)")
      .single();
    if (data) {
      setLinks((prev) => [
        {
          id: data.id as number,
          url: data.url as string,
          title: (data.title as string | null) ?? (data.url as string),
          description: (data.description as string | null) ?? "",
          thumbnail: (data.thumbnail_url as string | null) ?? undefined,
          folder: ((data.folder as { name: string } | null)?.name) ?? "",
          folder_id: (data.folder_id as number | null) ?? null,
        },
        ...prev,
      ]);
    }
  }

  function deleteLink(id: number) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  async function updateLink(id: number, fields: Partial<Pick<LinkItem, "title" | "description" | "folder" | "folder_id">>) {
    const supabase = createClient();
    const { error } = await supabase
      .from("link")
      .update({
        title: fields.title,
        description: fields.description || null,
        folder_id: fields.folder_id ?? null,
      })
      .eq("id", id);
    if (!error) setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...fields } : l)));
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
