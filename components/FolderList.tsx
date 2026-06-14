"use client";

import Link from "next/link";
import { useFolderContext } from "@/contexts/FolderContext";

export default function FolderList() {
  const { folders } = useFolderContext();

  return (
    <div className="mt-4">
      <p className="px-3 mb-1 text-xs font-medium text-[var(--text-sub)] uppercase tracking-wider">
        폴더
      </p>
      <ul className="flex flex-col">
        {folders.map((folder) => (
          <li key={folder.id}>
            <Link
              href={`/folder/${folder.id}`}
              className="nav-item-hover w-full text-left px-3 py-2 rounded-[6px] text-sm text-[var(--text)] transition-colors flex items-center gap-2"
            >
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
              {folder.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
