// app/blog/[postId]/page.tsx
import { GetStaticPaths, GetStaticProps } from "next";

export async function generateStaticParams() {
  // Fetch your list of posts
  const res = await fetch("https://kevinlepiten.com/blog/wp-json/wp/v2/posts");
  const posts = await res.json();

  // Map over posts to get an array of postId parameters
  return posts.map((post: { id: number }) => ({
    postId: post.id.toString(),
  }));
}
interface PostPageProps {
  params: {
    postId: string;
  };
}

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

export default async function PostPage({ params }: PostPageProps) {
  const { postId } = params;
  const res = await fetch(
    `https://kevinlepiten.com/blog/wp-json/wp/v2/posts/${postId}?_embed`
  );

  if (!res.ok) {
    return <div>Post not found</div>;
  }

  const post = await res.json();

  const title = decodeHTML(post.title.rendered);
  const content = post.content.rendered;
  const date = new Date(post.date).toLocaleDateString();
  const author = post._embedded?.author?.[0]?.name || "Unknown Author";
  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
  const categories =
    post._embedded?.["wp:term"]?.[0]
      ?.map((term: string) => term.name)
      .join(", ") || "Uncategorized";

  return (
    <section className="resume-section">
      <div className="resume-section-content">
        <h1 className="mb-5">{title}</h1>

        {/* Display featured image if available */}
        {featuredImage && (
          <img
            src={featuredImage}
            alt={title}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        )}

        <p>
          <strong>Author:</strong> {author} | <strong>Date:</strong> {date} |{" "}
          <strong>Categories:</strong> {categories}
        </p>

        {/* Post content */}
        <div dangerouslySetInnerHTML={{ __html: decodeHTML(content) }} />
      </div>
    </section>
  );
}
