import { Link } from "@/i18n/navigation";
import type { Blog } from "@/lib/api/blogs";
import Image from "next/image";

type BlogSidebarProps = {
  latest: Blog[];
  popular?: Blog[];
  isAr: boolean;
};

function formatDate(iso: string | null, isAr: boolean) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString(isAr ? "ar-EG" : "en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function SidebarBlock({
  title,
  posts,
  isAr,
}: {
  title: string;
  posts: Blog[];
  isAr: boolean;
}) {
  if (posts.length === 0) return null;

  return (
    <div className="border border-black/10 bg-white p-5">
      <h3 className="mb-4 border-b border-black/10 pb-3 text-lg font-semibold text-main">
        {title}
      </h3>
      <ul className="space-y-4">
        {posts.map((post) => {
          const postTitle = isAr ? post.titleAr : post.title;
          const date = formatDate(post.publishedAt, isAr);

          return (
            <li key={post.id}>
              <Link
                href={post.href}
                className="group flex gap-3 transition hover:opacity-90"
              >
                {post.image ? (
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-neutral-100">
                    <Image
                      src={post.image}
                      alt={isAr ? post.imageAltAr : post.imageAlt}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="80px"
                    />
                  </div>
                ) : (
                  <div className="flex h-16 w-20 shrink-0 items-center justify-center bg-neutral-100 px-1 text-center text-[10px] text-neutral-500">
                    {postTitle}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-medium leading-snug text-neutral-900 group-hover:text-main">
                    {postTitle}
                  </p>
                  {date ? (
                    <time
                      dateTime={post.publishedAt ?? undefined}
                      className="mt-1 block text-xs text-black/50"
                    >
                      {date}
                    </time>
                  ) : null}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function BlogSidebar({ latest, popular, isAr }: BlogSidebarProps) {
  const labels = isAr
    ? { latest: "أحدث المقالات", popular: "الأكثر رواجاً" }
    : { latest: "Latest articles", popular: "Popular articles" };

  const showPopular =
    popular &&
    popular.length > 0 &&
    popular.some((p) => !latest.find((l) => l.id === p.id));

  return (
    <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
      <SidebarBlock title={labels.latest} posts={latest} isAr={isAr} />
      {showPopular ? (
        <SidebarBlock title={labels.popular} posts={popular!} isAr={isAr} />
      ) : null}
    </aside>
  );
}
