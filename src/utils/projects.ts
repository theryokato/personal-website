export interface Project {
  slug: string;
  title: string;
  description?: string;
  image?: string;
  startDate?: string;
  endDate?: string;
  url?: string;
}

type ProjectModule = { frontmatter: Project };

const modules: Record<'en' | 'ja', Record<string, ProjectModule>> = {
  en: import.meta.glob<ProjectModule>('../content/projects/en/*.mdx', { eager: true }),
  ja: import.meta.glob<ProjectModule>('../content/projects/ja/*.mdx', { eager: true }),
};

// Lead with engineering work; keep the same editorial order in both languages.
const projectOrder = new Map(
  ['dron', 'blnc', 'red', 'herc', 'kb', 'website'].map((slug, index) => [slug, index])
);

export function projectsFor(locale: 'en' | 'ja'): Project[] {
  return Object.values(modules[locale])
    .map(module => module.frontmatter)
    .sort((a, b) =>
      (projectOrder.get(a.slug) ?? projectOrder.size) - (projectOrder.get(b.slug) ?? projectOrder.size)
      || (b.startDate ?? '').localeCompare(a.startDate ?? '')
    );
}

/** The project after `slug` in display order, wrapping to the first. */
export function nextProject(locale: 'en' | 'ja', slug: string): Project | undefined {
  const projects = projectsFor(locale);
  const index = projects.findIndex(project => project.slug === slug);
  return index === -1 ? undefined : projects[(index + 1) % projects.length];
}
