# Homepage Projects Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Move the existing project grid to both homepages, remove the Projects tab and homepage Interests link, and retire the old listing without breaking detail URLs.

**Architecture:** Extract the existing card markup into one localized Astro component. Homepages use it below their unchanged introductions; existing project routes become detail-only, with old listing URLs handled by Cloudflare asset redirects.

**Tech Stack:** Existing Astro 6, MDX, Tailwind, Cloudflare adapter; Node 22 and npm. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-11-16-homepage-projects-design.md`

## Global Constraints

- Apply the same structure in English and Japanese.
- Preserve the current six projects and date ordering, two-column desktop grid and single-column mobile grid (600px and below), previews, mobile title/date treatment, fonts, sizes, colors, theme controls, and cat.
- Preserve automatic slide loading, media controls, zoom, and existing 3D functionality.
- Do not add smooth scrolling, animations, dependencies, new content, or unrelated cleanup.
- Use the existing isolated checkout; do not create another worktree.
- Keep temporary browser checks and screenshot artifacts outside the repository, under `/workspace/.tools/browser` and `/workspace/screenshots`.

## Review Focus

- Japanese home/detail routes must retain Japanese titles, date formatting, back-links, and language destinations.
- External research, knowledge-base, and website cards must keep their external destinations and new-tab behavior.
- Long project titles at 320/390/600px must remain readable without horizontal overflow.
- Both slash variants of each old listing URL must redirect without intercepting project details.
- Moving cards must not disturb automatic slides, image zoom, video posters, keyboard focus, theme switching, or the cat.

## Task 1: Put the existing grid on both homepages

**Files:** Create `src/components/ProjectGrid.astro`; modify `src/pages/en/index.astro` and `src/pages/ja/index.astro`.

**Interfaces:** `ProjectGrid.astro` consumes `Props { locale: 'en' | 'ja' }`. It reads the existing localized project MDX modules and produces the existing `.grid` with six links and `.project-summary` captions. No content-file changes.

- [x] Capture baseline screenshots of both homepages and listings at 390/1280px in both themes using the existing external Playwright installation. Record card order, destinations, and visible dates.
- [x] Run a browser assertion against both current homepages that fails because the new grid is absent: `assert.equal(await page.locator('main #projects .grid > a').count(), 6)`. Also assert `main a[href$='/interests']` has count zero; watch the existing Interests link fail that check.
- [x] Extract the existing grid markup and sorting into `ProjectGrid.astro`. Use separate eager MDX globs for `en` and `ja`, select by `locale`, retain descending string comparison of `startDate`, original external URLs, preview helpers, image loading, classes, and locale-specific date formatting.
- [x] Replace each homepage's `NavList` import, path/section mapping, and rendered link list with the shared grid. Keep introduction/social markup and spacing intact. Render a `section#projects` with `aria-labelledby="projects-heading"`, a small `h2#projects-heading` using the old homepage Projects label's text classes, and the existing localized description from `homeContent.sections[0]`. Match the approved mockup's heading spacing; keep the grid single-column at 600px and below and two-column above 600px.
- [x] Run `npm run build` and `npm run astro -- check` after sourcing `/workspace/.tools/personal-website-env.sh`; start a fresh `npm run preview -- --host 127.0.0.1 --port 4325` from the repository.
- [x] Rerun the browser assertions. For both languages, assert six cards in the recorded order with unchanged destinations and dates, matching the former listing. Assert external links retain `target="_blank"` and `rel="noopener noreferrer"`. Check no overflow at 320/390/600px and that long titles are visible. Verify language switching and responsive image URLs still work.
- [x] Commit only the shared component and two homepage edits with `feat: show projects on localized homepages`.

## Task 2: Retire the listing and update navigation

**Files:** Modify `src/layouts/Base.astro`, `src/pages/en/projects/[...slug].astro`, `src/pages/ja/projects/[...slug].astro`, and `public/_redirects`.

**Interfaces:** Task 1 supplies localized home sections at `/en/#projects` and `/ja/#projects`. Project detail routes continue to consume their existing MDX modules and expose their existing URLs.

- [x] Before edits, run browser checks that fail on the existing Projects tab and listing: assert the top navigation's link text is exactly `['home', 'interests']` in English and `['ホーム', '興味']` in Japanese; assert each listing URL returns a 301 to the localized homepage's `#projects` section.
- [x] Remove only the Projects item and its labels from the shared top navigation. Preserve Home, Interests, language picker, and existing classes/active semantics.
- [x] Make each project route detail-only: keep its existing MDX glob/filter/map, return only named internal project paths, remove the index path and listing-only grid/data/branch, and render the existing detail body. Keep image helper imports needed by the detail hero. Change the back-link to `/${locale}/#projects`, retain its wording, and omit `activeNav` on project detail pages because no tab represents the current detail URL.
- [x] Preserve the existing root redirect and add four exact 301 rules in `public/_redirects`: `/en/projects` and `/en/projects/` to `/en/#projects`, `/ja/projects` and `/ja/projects/` to `/ja/#projects`. Do not add wildcard rules that would redirect details.
- [x] Build and type-check again; restart the preview so it serves the new build. Assert all four redirects with redirect-following disabled, then follow each redirect and confirm the target grid exists. Assert the six internal detail pages (BLNC, DRON, RED in each language) return 200, retain descriptions/media, and link back to their localized homepage section. Check Home is active on homepages, Interests on Interests pages, and no inappropriate page-active link on details.
- [x] Compare final homepage screenshots to baselines/mockups at 390/1280px, both languages and both themes. Verify header text, fonts, content width, grid/card styles, ordering, footer/theme controls, and no overflow. Confirm removal of the homepage Interests link and Projects tab on home, Interests, and detail pages.
- [x] Rerun existing external browser media checks with new back-link expectations: automatic first-slide rendering and previous/next, zoom, video poster/preload, focus, theme toggle, stable name, and cat. Keep reduced-motion checks. No placed 3D model exists: report that limitation and verify its component remains untouched.
- [x] Run `git diff --check`; review the diff for unrelated changes and dependency/lockfile edits. Commit with `refactor: retire project listings and update navigation`.
- [x] Push the existing feature branch without force; inspect its Cloudflare build check and provide the updated preview URL. Do not merge or publish the cloud environment.

## Completion Evidence

Record build/check exit status (do not invent a test suite; none is configured), browser assertion outcomes, screenshot paths, commit IDs, and observed Cloudflare deployment state. The user approved Native execution on 2026-11-16.


## Execution Results

- Task 1 commit: `a1bce09`; Task 2 commit: `34e0c29`.
- Build passed with 21 pages (two old listing pages removed); Astro check passed with zero errors/warnings and five existing hints.
- External browser checks passed for six-card order/copy/destinations/dates in both locales; four listing redirects; six project detail URLs; active navigation; locale switching; previews; no overflow at 320/390/600/601/1280px.
- Automatic slide rendering and previous/next controls passed on DRON/RED in both locales. Zoom, Escape after viewer readiness, video controls/poster/preload, theme persistence, immediate keyboard focus, stable name, pointer-following cat, and reduced motion passed.
- Eight final screenshots and sixteen baselines are under `/workspace/screenshots/homepage-move/`. Sampled introduction regions are pixel-identical in all eight language/theme/viewport combinations; media/3D/cat/dependency files are unchanged.
- No placed 3D model exists for an interaction check. Final independent review found no Critical, Important, or Minor issues, including the mobile follow-up. Cloudflare deployment status is reported in the task conversation.

## User-requested mobile follow-up

- [x] Verify the new one-column assertion fails on the two-column mobile grid.
- [x] Change only grid breakpoint classes and responsive image sizes; preserve desktop styling.
- [x] Rebuild and rerun browser geometry checks at 320, 390, 600, 601, and 1280px in both locales, regenerate final screenshots, and have the final reviewer inspect the follow-up.

Mobile follow-up verified: one column at 320/390/600px and two at 601/1280px in both locales; the existing 600px breakpoint and full-width mobile preview sizes are retained. Full browser checks and the 21-page build/type check passed again. Dark-mode colors remain unchanged; Mocha examples were browser-only mockups.
