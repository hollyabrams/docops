import Link from "next/link";
import { blogPosts } from "@/data/blog/blogPosts";

export default function BlogPage() {
  return (
    <>
      <p className="eyebrow">Blog</p>

      <h1>Ideas about documentation engineering.</h1>

      <p>
        Notes on documentation systems, developer experience, automation,
        operations, and the work behind the words.
      </p>

      <h2>Latest</h2>

      {blogPosts.map((post) => (
        <article key={post.href}>
          <p>
            <Link href={post.href}>
              <strong>{post.title}</strong>
            </Link>
          </p>

          <p>{post.description}</p>
          <p>{post.date}</p>
        </article>
      ))}
    </>
  );
}
