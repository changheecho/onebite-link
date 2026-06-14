import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-[var(--border)] bg-[var(--card-bg)] shrink-0">
      <span className="text-base font-semibold text-[var(--text)] tracking-tight">
        한입 링크
      </span>
      <Link
        href="/new"
        className="btn-accent flex items-center gap-1.5 px-4 py-2 text-white text-sm font-medium rounded-[6px]"
      >
        <span className="text-base leading-none">+</span>
        <span>새 링크</span>
      </Link>
    </header>
  );
}
