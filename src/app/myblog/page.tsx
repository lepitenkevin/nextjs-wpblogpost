// app/posts/page.tsx

import Link from "next/link";
import React from "react";

// Define the Post type
interface Post {
  id: number;
  title: {
    rendered: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
  };
}

// Utility function to decode HTML entities
function decodeHTML(html: string): string {
  return html
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

// Fetch posts with the Next.js fetch API
async function getPosts(): Promise<Post[]> {
  const res = await fetch(
    "https://kevinlepiten.com/blog/wp-json/wp/v2/posts?_embed"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

// Component to render the post title
const PostTitle: React.FC<{ title: string }> = ({ title }) => <h2>{title}</h2>;

// Component to render the post link
const PostLink: React.FC<{ id: number; children: React.ReactNode }> = ({
  id,
  children,
}) => <Link href={`/myblog/${id}`}>{children}</Link>;

// Component to render the post's featured image
const PostFeaturedImage: React.FC<{ src: string | undefined; alt: string }> = ({
  src,
  alt,
}) => {
  return src ? (
    <img src={src} alt={alt} width={200} height={200} />
  ) : (
    <p>No featured image</p>
  );
};

// Main component for displaying individual post details
const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  const title = decodeHTML(post.title.rendered);
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <li key={post.id}>
      <PostFeaturedImage src={featuredImage} alt={title} />
      <PostLink id={post.id}>
        <PostTitle title={title} />
      </PostLink>
    </li>
  );
};

// Main page component that displays the list of posts
export default async function Posts() {
  const posts = await getPosts();

  return (
    <>
      <section className="resume-section">
        <div className="resume-section-content">
          <h1>Blog</h1>
          <ul className="no-bullets">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
