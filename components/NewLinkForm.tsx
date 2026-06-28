"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFolderContext } from "@/contexts/FolderContext";
import { useLinkContext } from "@/contexts/LinkContext";

export default function NewLinkForm() {
  const router = useRouter();
  const { folders } = useFolderContext();
  const { addLink } = useLinkContext();

  const [url, setUrl] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "OG 정보를 가져오는 데 실패했습니다.");
        return;
      }

      const folder = folders.find((f) => f.id === Number(selectedFolderId));

      await addLink({
        id: 0,
        title: data.title || url,
        url,
        description: data.description ?? "",
        thumbnail: data.thumbnail || undefined,
        folder: folder?.name ?? "",
        folder_id: folder?.id ?? null,
      });

      router.push("/");
    } catch {
      setError("링크 저장 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-16 px-6">
      <h2 className="text-xl font-semibold text-[var(--text)] mb-8">새 링크 추가</h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="url" className="text-sm font-medium text-[var(--text)]">
            링크 URL
          </label>
          <input
            id="url"
            type="url"
            placeholder="https://example.com"
            className="input-field w-full text-[var(--text)]"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="folder" className="text-sm font-medium text-[var(--text)]">
            폴더
          </label>
          <select
            id="folder"
            className="input-field w-full text-[var(--text)] bg-[var(--card-bg)]"
            value={selectedFolderId}
            onChange={(e) => setSelectedFolderId(e.target.value)}
          >
            <option value="">폴더 선택</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <p className="text-sm text-[var(--error)]">{error}</p>
        )}
        <button
          type="submit"
          disabled={isLoading || !url}
          className="btn-accent mt-2 w-full px-4 py-2 text-white text-sm font-medium rounded-[6px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "저장 중..." : "저장"}
        </button>
      </form>
    </div>
  );
}
