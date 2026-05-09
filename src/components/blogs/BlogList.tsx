import Cards from "@/components/ui/Cards";
import type { BlogItem } from "@/lib/api/blogs";

type BlogListProps = {
  posts: BlogItem[];
  isAr: boolean;
};

export default function BlogList({ posts, isAr }: BlogListProps) {
  return (
    <div className="grid grid-cols-12 gap-6">
      {posts.map((post) => (
        <article key={post.href} className="col-span-12 md:col-span-4">
          <Cards
            title={isAr ? post.titleAr : post.title}
            description={isAr ? post.descriptionAr : post.description}
            image={post.image}
            imageAlt={isAr ? post.imageAltAr : post.imageAlt}
            href={post.href}
            readmore={isAr ? post.readmoreAr : post.readmore}
          />
        </article>
      ))}
    </div>
  );
}
