"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { initialFolders, type Folder } from "@/lib/folderData";

export type { Folder };

type FolderContextType = {
  folders: Folder[];
  addFolder: (name: string) => void;
  deleteFolder: (id: number) => void;
  renameFolder: (id: number, name: string) => void;
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
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);
  const [folderToEdit, setFolderToEdit] = useState<Folder | null>(null);

  function addFolder(name: string) {
    setFolders((prev) => [...prev, { id: Date.now(), name }]);
  }

  function deleteFolder(id: number) {
    setFolders((prev) => prev.filter((f) => f.id !== id));
  }

  function renameFolder(id: number, name: string) {
    setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, name } : f)));
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
