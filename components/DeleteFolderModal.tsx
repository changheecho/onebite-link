"use client";

import { useFolderContext } from "@/contexts/FolderContext";

export default function DeleteFolderModal() {
  const { folderToDelete, closeDeleteModal, deleteFolder } = useFolderContext();

  if (!folderToDelete) return null;

  function handleDelete() {
    if (!folderToDelete) return;
    deleteFolder(folderToDelete.id);
    closeDeleteModal();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={closeDeleteModal}
    >
      <div
        className="bg-[var(--card-bg)] border border-[var(--border)] rounded-[8px] p-6 w-full max-w-sm mx-4 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-1.5">
          <h2 className="text-base font-semibold text-[var(--text)]">폴더 삭제</h2>
          <p className="text-sm text-[var(--text-sub)]">
            <span className="font-medium text-[var(--text)]">{folderToDelete.name}</span> 폴더를 삭제할까요?
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={closeDeleteModal}
            className="px-4 py-2 text-sm font-medium text-[var(--text)] border border-[var(--border)] rounded-[6px] transition-colors hover:bg-[var(--hover-bg)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-[var(--error)] rounded-[6px] transition-opacity hover:opacity-80"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
