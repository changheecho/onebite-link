export type LinkItem = {
  id: number;
  title: string;
  url: string;
  description: string;
  folder: string;
};

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
          {link.title}
        </h3>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
          {link.folder}
        </span>
      </div>
      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
        {link.description}
      </p>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-blue-500 hover:text-blue-700 truncate"
      >
        {link.url}
      </a>
    </article>
  );
}
