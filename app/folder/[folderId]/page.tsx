import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LinkGrid from "@/components/LinkGrid";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: folder } = await supabase
    .from("folder")
    .select("name")
    .eq("id", Number(folderId))
    .single();

  return (
    <div className="flex flex-col h-screen bg-[var(--bg)]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <LinkGrid folderName={folder?.name ?? ""} />
        </main>
      </div>
    </div>
  );
}
