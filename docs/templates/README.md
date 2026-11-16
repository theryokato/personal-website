# Engineering project-page templates

Copy the [English starter](project-page.en.mdx) and [Japanese starter](project-page.ja.mdx)
into `src/content/projects/en/<slug>.mdx` and `src/content/projects/ja/<slug>.mdx`.
Keep matching slugs and factual claims across languages. These source templates live outside
the content glob so they do not create sample cards or public pages.

## Writing the page

Give the first screen a concise explanation of the project, your ownership, and the outcome
or current stage. Follow with constraints, consequential decisions, validation, and lessons.
Use first-person statements for your work and explicitly attribute team or collaborator work.
Delete prompts and sections that do not apply; the headings are a guide, not a required form.

Prefer a few purposeful visuals to a repeated gallery: a system overview, an annotated
subsystem view, and validation evidence are useful starting points. Put captions near the
figure that explain the decision or result it supports. A successful prototype is not required:
honest limitations and the reasoning behind an iteration can demonstrate engineering judgment.

Keep the main story understandable without navigating a presentation. Put full slide decks
and other supporting files after it. Mention tools where they explain a decision or method.

## Frontmatter and publishing

- Replace every `REPLACE` prompt, including the slug, title, and metadata description.
- Fill `startDate` with the real `YYYY-MM` or `YYYY-MM-DD`. Use `Present` only for ongoing
  work; otherwise set `endDate` to the actual ending month/date. Dates are not auto-generated.
- Keep `url: ""` for a project hosted on this site. A nonempty URL makes the card an external
  link and prevents generation of its local detail page.
- `image` is optional. Leave it empty until an appropriate asset exists. The layout renders
  the project title and dates, so do not add a second page title or duplicate date block.
- `description` supplies page metadata; it does not add a short description to the homepage card.
- Existing projects have a curated order in `src/components/ProjectGrid.astro`. New slugs appear
  after that list, ordered by start date. Edit `projectOrder` only when intentionally promoting work.

## Media

Use the existing `ProjectImage`, `ProjectVideo`, `ProjectSlides`, or `ProjectModel` components.
Import a component only when you use it, at the top of the copied MDX file after frontmatter:

```mdx
import ProjectImage from '../../../components/ProjectImage.astro';
import ProjectVideo from '../../../components/ProjectVideo.astro';
import ProjectSlides from '../../../components/ProjectSlides.astro';
```

Store original files in `public/assets/<PROJECT>/`; public URLs start with `/assets/`.
For `image` and `ProjectImage`, create the matching previews with
`node scripts/generate-previews.mjs`. The current generator covers PNG and SVG originals;
use unique filenames across project folders because previews are keyed by basename. It
regenerates previews across the asset directory, so inspect the resulting diff.
`ProjectImage` needs the original's actual pixel `width` and `height`, descriptive `alt`,
and a caption; its link retains the full-resolution original.

A `ProjectVideo` needs a real video `src`, valid `poster`, and caption. Preserve native controls
and the component's `preload="none"` behavior. `ProjectSlides` needs a real PDF `src`, accurate
`totalPages`, and caption; loading remains automatic near the viewport. See the existing
project MDX files for working usages and the root README for `ProjectModel` props.

## Before publishing

- Replace all prompts and draft metadata; remove optional sections with no supporting material.
- Verify each contribution, unit, date, and outcome. Label estimates, simulations, and measurements
  separately; distinguish a design target from a demonstrated result. Do not invent metrics.
- Check the English and Japanese versions have the same slug and faithful facts.
- Verify originals, previews, posters, PDF page counts, links, and image dimensions.
- Run `npm run build` and `npm run astro -- check`, then inspect the page in the production preview
  at mobile/desktop widths and in both themes. Check language switching and media controls.

## Research basis

The structure synthesizes these primary examples and guidance; it is not evidence that one
page layout causes hiring success. Page length should follow the engineering story.

- [MIT MechE Communication Lab](https://mitcommlab.mit.edu/meche/commkit/portfolio/): inverted
  pyramid, individual contribution, results against objectives, and 2–6 nonredundant visuals.
- [Katie Hughes — Quadruped Crowd Navigation](https://katie-hughes.github.io/crowdnav/): explicit
  ownership, algorithm attribution, implementation decisions, and benchmark conditions.
- [Reagan Bagnol — Total Artificial Heart](https://reaganbagnol.com/projects/total-artificial-heart):
  requirements, personal subsystems, iterations, test evidence, and detailed supporting material.
- [Anna Garverick — BallBot](https://algarv.github.io/Portfolio/BallBot/): failed approaches,
  control/sensing tradeoffs, an honest result, and the next iteration.
- [Thanh Tran — Tesla internship](https://thanhvtran.com/portfolio/tesla-internship/): specific
  responsibilities, methods, and delivered work.
