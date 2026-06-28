"use client";

import LinkCard from "./LinkCard";
import { useLinkContext } from "@/contexts/LinkContext";

export default function LinkGrid({ folderName }: { folderName?: string }) {
  const { links } = useLinkContext();

  const filtered =
    folderName !== undefined
      ? links.filter((link) => link.folder === folderName)
      : links;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
      {filtered.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}
