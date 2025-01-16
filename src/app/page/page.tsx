// Allow dynamic rendering

export default async function PagesList() {
  const response = await fetch(
    "https://kevinlepiten.com/blog/wp-json/wp/v2/pages"
  );
  const pages = await response.json();

  return (
    <div>
      <h1>Pages</h1>
      <ul>
        {pages.map((page: any) => (
          <li key={page.id}>
            <a href={`/pages/${page.slug}`}>
              <h2>{page.title.rendered}</h2>
            </a>
            <p>{page.slug}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
