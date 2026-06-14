import LinkCard, { type LinkItem } from "./LinkCard";

export const mockLinks: LinkItem[] = [
  {
    id: 1,
    title: "Next.js 공식 문서",
    url: "https://nextjs.org/docs",
    description: "Next.js App Router의 기능과 API를 다루는 공식 문서입니다.",
    folder: "개발",
  },
  {
    id: 2,
    title: "Tailwind CSS 가이드",
    url: "https://tailwindcss.com/docs",
    description: "유틸리티 퍼스트 CSS 프레임워크인 Tailwind CSS의 공식 문서입니다.",
    folder: "개발",
  },
  {
    id: 3,
    title: "Figma 커뮤니티",
    url: "https://figma.com/community",
    description: "디자이너들이 공유하는 Figma 리소스, 플러그인, 템플릿 모음입니다.",
    folder: "디자인",
  },
  {
    id: 4,
    title: "TypeScript 핸드북",
    url: "https://typescriptlang.org/docs/handbook",
    description: "TypeScript의 주요 개념과 사용법을 설명하는 공식 핸드북입니다.",
    folder: "개발",
  },
  {
    id: 5,
    title: "Vercel 블로그",
    url: "https://vercel.com/blog",
    description: "Vercel 팀이 작성하는 웹 개발 트렌드와 제품 업데이트 소식입니다.",
    folder: "뉴스",
  },
  {
    id: 6,
    title: "Notion 팀 워크스페이스",
    url: "https://notion.so",
    description: "팀 전체 문서와 프로젝트 계획을 관리하는 공유 워크스페이스입니다.",
    folder: "업무",
  },
  {
    id: 7,
    title: "Radix UI 컴포넌트",
    url: "https://radix-ui.com",
    description: "접근성을 고려한 headless UI 컴포넌트 라이브러리입니다.",
    folder: "개발",
  },
  {
    id: 8,
    title: "Smashing Magazine",
    url: "https://smashingmagazine.com",
    description: "웹 디자인과 프론트엔드 개발에 대한 심층 아티클을 제공합니다.",
    folder: "뉴스",
  },
];

export default function LinkGrid({ folderName }: { folderName?: string }) {
  const links = folderName !== undefined
    ? mockLinks.filter((link) => link.folder === folderName)
    : mockLinks;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}
