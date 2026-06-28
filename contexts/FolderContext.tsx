"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Folder } from "@/lib/folderData";
import { createClient } from "@/utils/supabase/client";

export type { Folder };

type FolderContextType = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  deleteFolder: (id: number) => void;
  renameFolder: (id: number, name: string) => Promise<void>;
  isAddModalOpen: boolean;
  openAddModal: () => void;
  closeAddModal: () => void;
  folderToDelete: Folder | null;
  openDeleteModal: (folder: Folder) => void;
  closeDeleteModal: () => void;
  folderToEdit: Folder | null;
  openEditModal: (folder: Folder) => void;
  closeEditModal: () => void;
};

const FolderContext = createContext<FolderContextType | null>(null);

export function FolderProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);
  const [folderToEdit, setFolderToEdit] = useState<Folder | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("folder")
      .select("id, name")
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setFolders(data);
      });
  }, []);

  async function addFolder(name: string) {
    const supabase = createClient();
    const { data } = await supabase
      .from("folder")
      .insert({ name })
      .select("id, name")
      .single();
    if (data) setFolders((prev) => [...prev, data]);
  }

  function deleteFolder(id: number) {
    setFolders((prev) => prev.filter((f) => f.id !== id));
  }

  async function renameFolder(id: number, name: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from("folder")
      .update({ name })
      .eq("id", id);
    if (!error) setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, name } : f)));
  }

  return (
    <FolderContext.Provider
      value={{
        folders,
        addFolder,
        deleteFolder,
        renameFolder,
        isAddModalOpen,
        openAddModal: () => setIsAddModalOpen(true),
        closeAddModal: () => setIsAddModalOpen(false),
        folderToDelete,
        openDeleteModal: (folder) => setFolderToDelete(folder),
        closeDeleteModal: () => setFolderToDelete(null),
        folderToEdit,
        openEditModal: (folder) => setFolderToEdit(folder),
        closeEditModal: () => setFolderToEdit(null),
      }}
    >
      {children}
    </FolderContext.Provider>
  );
}

export function useFolderContext() {
  const ctx = useContext(FolderContext);
  if (!ctx) throw new Error("useFolderContext must be used inside FolderProvider");
  return ctx;
}
