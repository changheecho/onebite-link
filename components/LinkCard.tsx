"use client";

import { useLinkContext, type LinkItem } from "@/contexts/LinkContext";

export type { LinkItem };

function TrashIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

export default function LinkCard({ link }: { link: LinkItem }) {
  const { openDeleteModal } = useLinkContext();

  return (
    <article className="group card-hover bg-[var(--card-bg)] rounded-[8px] border border-[var(--border)] overflow-hidden flex flex-col transition-colors">
      {link.thumbnail && (
        <div className="w-full aspect-video overflow-hidden">
          <img
            src={link.thumbnail}
            alt={link.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[13px] text-[var(--text-sub)] bg-[var(--hover-bg)] px-2 py-0.5 rounded-[4px] whitespace-nowrap">
            {link.folder}
          </span>
          <button
            type="button"
            onClick={() => openDeleteModal(link)}
            className="p-1 rounded-[4px] text-[var(--text-sub)] hover:text-[var(--error)] hover:bg-[var(--hover-bg)] transition-colors opacity-0 group-hover:opacity-100"
            aria-label={`${link.title} 삭제`}
          >
            <TrashIcon />
          </button>
        </div>
        <h3 className="text-sm font-semibold text-[var(--text)] line-clamp-2 leading-snug">
          {link.title}
        </h3>
        <p className="text-sm text-[var(--text-sub)] line-clamp-2 leading-relaxed">
          {link.description}
        </p>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[var(--accent)] hover:underline truncate mt-auto"
        >
          {link.url}
        </a>
      </div>
    </article>
  );
}
