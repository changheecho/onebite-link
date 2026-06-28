"use client";

import { useState, useEffect } from "react";
import { useLinkContext } from "@/contexts/LinkContext";
import { useFolderContext } from "@/contexts/FolderContext";

export default function EditLinkModal() {
  const { linkToEdit, closeEditModal, updateLink } = useLinkContext();
  const { folders } = useFolderContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (linkToEdit) {
      setTitle(linkToEdit.title);
      setDescription(linkToEdit.description);
      setSelectedFolderId(linkToEdit.folder_id ?? null);
    }
  }, [linkToEdit]);

  if (!linkToEdit) return null;

  async function handleSave() {
    if (!title.trim() || saving) return;
    const selectedFolder = folders.find((f) => f.id === selectedFolderId);
    setSaving(true);
    await updateLink(linkToEdit!.id, {
      title: title.trim(),
      description: description.trim(),
      folder_id: selectedFolderId,
      folder: selectedFolder?.name ?? "",
    });
    setSaving(false);
    closeEditModal();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") closeEditModal();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={closeEditModal}
      onKeyDown={handleKeyDown}
    >
      <div
        className="bg-[var(--card-bg)] border border-[var(--border)] rounded-[8px] p-6 w-full max-w-sm mx-4 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold text-[var(--text)]">링크 수정</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--text)]">폴더</label>
            <select
              value={selectedFolderId ?? ""}
              onChange={(e) => setSelectedFolderId(e.target.value ? Number(e.target.value) : null)}
              className="input-field w-full text-[var(--text)] bg-[var(--card-bg)]"
            >
              <option value="">폴더 없음</option>
              {folders.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--text)]">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              className="input-field w-full text-[var(--text)]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--text)]">설명</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="input-field w-full text-[var(--text)] resize-none"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={closeEditModal}
            className="px-4 py-2 text-sm font-medium text-[var(--text)] border border-[var(--border)] rounded-[6px] transition-colors hover:bg-[var(--hover-bg)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!title.trim() || saving}
            className="btn-accent px-4 py-2 text-sm font-medium text-white rounded-[6px] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
