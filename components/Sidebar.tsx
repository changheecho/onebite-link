import FolderList from "./FolderList";

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 bg-white overflow-y-auto">
      <nav className="p-3">
        <button className="w-full text-left px-3 py-2 rounded-md text-sm font-medium bg-blue-50 text-blue-600">
          All
        </button>
        <FolderList />
      </nav>
    </aside>
  );
}
