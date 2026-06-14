"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { initialFolders, type Folder } from "@/lib/folderData";

export type { Folder };

type FolderContextType = {
  folders: Folder[];
  addFolder: (name: string) => void;
  deleteFolder: (id: number) => void;
  isAddModalOpen: boolean;
  openAddModal: () => void;
  closeAddModal: () => void;
  folderToDelete: Folder | null;
  openDeleteModal: (folder: Folder) => void;
  closeDeleteModal: () => void;
};

const FolderContext = createContext<FolderContextType | null>(null);

export function FolderProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);

  function addFolder(name: string) {
    setFolders((prev) => [...prev, { id: Date.now(), name }]);
  }

  function deleteFolder(id: number) {
    setFolders((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <FolderContext.Provider
      value={{
        folders,
        addFolder,
        deleteFolder,
        isAddModalOpen,
        openAddModal: () => setIsAddModalOpen(true),
        closeAddModal: () => setIsAddModalOpen(false),
        folderToDelete,
        openDeleteModal: (folder) => setFolderToDelete(folder),
        closeDeleteModal: () => setFolderToDelete(null),
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
