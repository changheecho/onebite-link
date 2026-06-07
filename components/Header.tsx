import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shrink-0">
      <span className="text-xl font-bold text-gray-900 tracking-tight">
        한입 링크
      </span>
      <Link
        href="/new"
        className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        <span className="text-base leading-none">+</span>
        <span>새 링크</span>
      </Link>
    </header>
  );
}
