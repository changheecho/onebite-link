"use client";

import Link from "next/link";
import { useFolderContext } from "@/contexts/FolderContext";

export default function Header() {
  const { openAddModal } = useFolderContext();

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-[var(--border)] bg-[var(--card-bg)] shrink-0">
      <span className="text-base font-semibold text-[var(--text)] tracking-tight">
        한입 링크
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[var(--text)] border border-[var(--border)] rounded-[6px] transition-colors hover:bg-[var(--hover-bg)]"
        >
          <span className="text-base leading-none">+</span>
          <span>새 폴더</span>
        </button>
        <Link
          href="/new"
          className="btn-accent flex items-center gap-1.5 px-4 py-2 text-white text-sm font-medium rounded-[6px]"
        >
          <span className="text-base leading-none">+</span>
          <span>새 링크</span>
        </Link>
      </div>
    </header>
  );
}
