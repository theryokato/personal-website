import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export type Locale = "en" | "ja";
export interface Project {
  slug: string;
  title: string;
  url: string;
  description: string;
  role: string;
  startDate: string;
  endDate: string;
  image?: string;
  caption?: string;
  featured?: boolean;
  tags: string[];
}
interface ProjectFile {
  frontmatter: Project;
  Content: AstroComponentFactory;
}
const files = import.meta.glob<ProjectFile>("../content/projects/*/*.mdx", {
  eager: true,
});
const order = new Map(
  ["dron", "red", "blnc", "herc", "kb", "website"].map((slug, i) => [slug, i]),
);
export function projects(locale: Locale) {
  return Object.entries(files)
    .filter(([path]) => path.includes("/" + locale + "/"))
    .map(([, file]) => file)
    .sort(
      (a, b) =>
        (order.get(a.frontmatter.slug) ?? order.size) -
          (order.get(b.frontmatter.slug) ?? order.size) ||
        (b.frontmatter.startDate ?? "").localeCompare(
          a.frontmatter.startDate ?? "",
        ),
    );
}
