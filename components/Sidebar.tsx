import FolderList from "./FolderList";

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-[var(--border)] bg-[var(--card-bg)] overflow-y-auto">
      <nav className="p-3">
        <button className="nav-item-hover w-full text-left px-3 py-2 rounded-[6px] text-sm font-medium text-[var(--accent)] bg-[var(--hover-bg)] transition-colors">
          전체
        </button>
        <FolderList />
      </nav>
    </aside>
  );
}
