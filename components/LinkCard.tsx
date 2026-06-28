import { type LinkItem } from "@/lib/linkData";

export type { LinkItem };

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <article className="card-hover bg-[var(--card-bg)] rounded-[8px] border border-[var(--border)] overflow-hidden flex flex-col transition-colors">
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
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-[var(--text)] line-clamp-2 leading-snug">
            {link.title}
          </h3>
          <span className="text-[13px] text-[var(--text)] bg-[var(--hover-bg)] px-2 py-0.5 rounded-[4px] shrink-0 whitespace-nowrap">
            {link.folder}
          </span>
        </div>
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
