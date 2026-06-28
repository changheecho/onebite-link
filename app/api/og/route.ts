import { type NextRequest } from "next/server";

function extractMetaContent(html: string, property: string): string {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, "i"),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1];
  }
  return "";
}

function extractTitle(html: string): string {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return match?.[1]?.trim() ?? "";
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const url = searchParams.get("url");

  if (!url) {
    return Response.json({ error: "url 파라미터가 필요합니다." }, { status: 400 });
  }

  try {
    new URL(url);
  } catch {
    return Response.json({ error: "유효하지 않은 URL입니다." }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LinkBot/1.0)",
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return Response.json({ error: "페이지를 불러올 수 없습니다." }, { status: 502 });
    }

    const html = await response.text();

    const ogTitle = extractMetaContent(html, "og:title");
    const ogDescription = extractMetaContent(html, "og:description");
    const ogImage = extractMetaContent(html, "og:image");

    return Response.json({
      title: ogTitle || extractTitle(html) || url,
      description: ogDescription,
      thumbnail: ogImage,
    });
  } catch {
    return Response.json({ error: "OG 정보를 가져오는 데 실패했습니다." }, { status: 500 });
  }
}
