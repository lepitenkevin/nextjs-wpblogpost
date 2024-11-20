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

// Fetch posts with pagination
async function getPosts(page: number, perPage: number): Promise<Post[]> {
  const res = await fetch(
    `https://kevinlepiten.com/blog/wp-json/wp/v2/posts?_embed&page=${page}&per_page=${perPage}`
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
}) => (
  <Link href={`/myblog/${id}`} className="text-xxs">
    {children}
  </Link>
);

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
    <>
      <li key={post.id}>
        <PostFeaturedImage src={featuredImage} alt={title} />
        <PostLink id={post.id}>
          <PostTitle title={title} />
        </PostLink>
        <PostLink id={post.id}>Read More</PostLink>
      </li>
      <br />
    </>
  );
};

// Main page component with pagination
export default async function Posts({
  getStaticProps,
}: {
  getStaticProps: { page?: string };
}) {
  const currentPage = parseInt((await getStaticProps)?.page || "1", 10);
  const postsPerPage = 3; // Number of posts per page
  const posts = await getPosts(currentPage, postsPerPage);

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

          {/* Pagination Controls */}
          <div className="pagination">
            {currentPage > 1 && (
              <Link className="prev" href={`/myblog?page=${currentPage - 1}`}>
                Prev
              </Link>
            )}
            <Link className="next" href={`/myblog?page=${currentPage + 1}`}>
              Next
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
