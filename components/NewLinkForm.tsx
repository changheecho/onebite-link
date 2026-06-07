import { mockFolders } from "./FolderList";

export default function NewLinkForm() {
  return (
    <div className="max-w-lg mx-auto mt-16 px-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">새 링크 추가</h2>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="url" className="text-sm font-medium text-gray-700">
            링크 URL
          </label>
          <input
            id="url"
            type="url"
            placeholder="https://example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="folder" className="text-sm font-medium text-gray-700">
            폴더
          </label>
          <select
            id="folder"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          className="mt-2 w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          저장
        </button>
      </form>
    </div>
  );
}
