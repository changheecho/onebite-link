"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { initialFolders, type Folder } from "@/lib/folderData";

export type { Folder };

type FolderContextType = {
  folders: Folder[];
  addFolder: (name: string) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const FolderContext = createContext<FolderContextType | null>(null);

export function FolderProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function addFolder(name: string) {
    setFolders((prev) => [...prev, { id: Date.now(), name }]);
  }

  return (
    <FolderContext.Provider
      value={{
        folders,
        addFolder,
        isModalOpen,
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
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
