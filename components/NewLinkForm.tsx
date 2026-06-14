import { mockFolders } from "./FolderList";

export default function NewLinkForm() {
  return (
    <div className="max-w-lg mx-auto mt-16 px-6">
      <h2 className="text-xl font-semibold text-[var(--text)] mb-8">새 링크 추가</h2>
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="url" className="text-sm font-medium text-[var(--text)]">
            링크 URL
          </label>
          <input
            id="url"
            type="url"
            placeholder="https://example.com"
            className="input-field w-full text-[var(--text)]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="folder" className="text-sm font-medium text-[var(--text)]">
            폴더
          </label>
          <select
            id="folder"
            className="input-field w-full text-[var(--text)] bg-[var(--card-bg)]"
          >
            <option value="">폴더 선택</option>
            {mockFolders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="btn-accent mt-2 w-full px-4 py-2 text-white text-sm font-medium rounded-[6px]"
        >
          저장
        </button>
      </form>
    </div>
  );
}
