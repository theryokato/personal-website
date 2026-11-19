import { projects } from "../utils/projects";
export function GET() {
  const urls = (["en", "ja"] as const).flatMap((lang) =>
    [
      "",
      "projects/",
      "interests/",
      "interests/manga/",
      "interests/anime/",
      ...projects(lang)
        .filter((p) => !p.frontmatter.url)
        .map((p) => "projects/" + p.frontmatter.slug + "/"),
    ].map(
      (path) =>
        "<url><loc>https://theryokato.com/" +
        lang +
        "/" +
        path +
        "</loc></url>",
    ),
  );
  return new Response(
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
      urls.join("") +
      "</urlset>",
    { headers: { "Content-Type": "application/xml" } },
  );
}
