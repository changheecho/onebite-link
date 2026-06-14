"use client";

import { useState, useEffect } from "react";
import { useFolderContext } from "@/contexts/FolderContext";

export default function EditFolderModal() {
  const { folderToEdit, closeEditModal, renameFolder } = useFolderContext();
  const [name, setName] = useState("");

  useEffect(() => {
    if (folderToEdit) setName(folderToEdit.name);
  }, [folderToEdit]);

  if (!folderToEdit) return null;

  function handleSave() {
    const trimmed = name.trim();
    if (!trimmed) return;
    renameFolder(folderToEdit!.id, trimmed);
    closeEditModal();
  }

  function handleCancel() {
    closeEditModal();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={handleCancel}
    >
      <div
        className="bg-[var(--card-bg)] border border-[var(--border)] rounded-[8px] p-6 w-full max-w-sm mx-4 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold text-[var(--text)]">폴더 이름 수정</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="input-field w-full text-[var(--text)]"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-[var(--text)] border border-[var(--border)] rounded-[6px] transition-colors hover:bg-[var(--hover-bg)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!name.trim()}
            className="btn-accent px-4 py-2 text-sm font-medium text-white rounded-[6px] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
