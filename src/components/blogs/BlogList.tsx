import Cards from "@/components/ui/Cards";
import type { Blog } from "@/lib/api/blogs";

type BlogListProps = {
  posts: Blog[];
  isAr: boolean;
  readmore?: string;
};

export default function BlogList({
  posts,
  isAr,
  readmore = isAr ? "اقرأ المزيد" : "Read more",
}: BlogListProps) {
  return (
    <div className="grid grid-cols-12 gap-6">
      {posts.map((post) => (
        <article key={post.id} className="col-span-12 md:col-span-4">
          <Cards
            params={{
              title: isAr ? post.titleAr : post.title,
              description: isAr ? post.descriptionAr : post.description,
              image: post.image,
              imageAlt: isAr ? post.imageAltAr : post.imageAlt,
              href: post.href,
              readmore,
            }}
          />
        </article>
      ))}
    </div>
  );
}
