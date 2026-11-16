# Move projects to the homepage

Status: proposed design, awaiting user approval. No application changes made.

## Intent

Show the existing projects directly on the homepage while preserving the site's appearance and individual project pages. Apply the same structure in English and Japanese.

## Agreed direction

- Homepage order: existing name, bio, social icons, then the complete existing project grid.
- Remove the homepage's Projects link and Interests link. Keep a small Projects section heading and the existing localized description above the grid, as shown in the mockups.
- Top navigation contains Home and Interests only, alongside the existing language picker. Remove the Projects tab everywhere.
- Remove the standalone project listing. Keep individual project URLs and external project destinations unchanged.
- Preserve the current six projects and date ordering, two-column grid, previews, mobile title/date treatment, fonts, sizes, colors, theme controls, and cat.
- Preserve automatic slide loading, media controls, zoom, and existing 3D functionality.

## Approaches considered

The initial screenshot mockups placed Interests either below the project grid (A) or above it (B). Removing the homepage Interests link eliminates that difference. The resulting layout puts the grid directly below the existing introduction and socials. No card redesign or curated subset is proposed.

## Proposed routing and implementation details

These are implementation recommendations, rather than separate user requirements:

- Redirect the old localized listing URLs, with and without trailing slashes, to the matching homepage's projects section. Preserve all project detail routes.
- Change project detail back-links to the matching homepage's projects section.
- Reuse a shared grid component to preserve the existing card markup and prevent English/Japanese drift. Keep content in the existing MDX files and retain current sorting.
- Use a semantic section heading with the current mockup's text size. Keep the homepage Home navigation item active; no Projects navigation item remains.
- Do not add smooth scrolling, animations, dependencies, new content, or unrelated cleanup.

## Validation

- Production build and Astro check.
- Compare desktop/mobile screenshots in English/Japanese and light/dark themes.
- Verify all six cards retain their order and destinations, no horizontal overflow, and no homepage Interests link or Projects tab remains.
- Verify legacy listing redirects, project detail back-links, language switching, active navigation, keyboard focus, theme switching, image zoom, automatic slide rendering/controls, video posters, and cat behavior.
- Do not claim 3D interaction verification without an actual placed model; preserve the component.

## Scope boundary

This is a homepage/listing relocation, not a visual redesign or changes to Interests content. Implementation starts after design approval. A separate implementation plan follows approval.
