"use client";

import Link from "next/link";
import { useFolderContext, type Folder } from "@/contexts/FolderContext";

function TrashIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg
      className="w-4 h-4 text-[var(--text-sub)] shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
      />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  );
}

function FolderItem({ folder }: { folder: Folder }) {
  const { openDeleteModal, openEditModal } = useFolderContext();

  return (
    <li className="group relative">
      <Link
        href={`/folder/${folder.id}`}
        className="nav-item-hover flex items-center gap-2 px-3 py-2 pr-16 rounded-[6px] text-sm text-[var(--text)] transition-colors"
      >
        <FolderIcon />
        {folder.name}
      </Link>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.preventDefault();
            openEditModal(folder);
          }}
          className="p-1 rounded-[4px] text-[var(--text-sub)] hover:text-[var(--accent)] transition-colors"
          aria-label={`${folder.name} 수정`}
        >
          <PencilIcon />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            openDeleteModal(folder);
          }}
          className="p-1 rounded-[4px] text-[var(--text-sub)] hover:text-[var(--error)] transition-colors"
          aria-label={`${folder.name} 삭제`}
        >
          <TrashIcon />
        </button>
      </div>
    </li>
  );
}

export default function FolderList() {
  const { folders } = useFolderContext();

  return (
    <div className="mt-4">
      <p className="px-3 mb-1 text-xs font-medium text-[var(--text-sub)] uppercase tracking-wider">
        폴더
      </p>
      <ul className="flex flex-col">
        {folders.map((folder) => (
          <FolderItem key={folder.id} folder={folder} />
        ))}
      </ul>
    </div>
  );
}
