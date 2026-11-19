# Portfolio audit and implementation priorities

Baseline is the supplied polish/targeted-website-fixes checkout, including pending slide-viewer and localized project-template edits. Browser captures use the local checkout. The narrow Nord layout, homepage biography and secondary project link conceal role, date and evidence. Both homepages lack a main heading. Two separate catch-all routes repeat untyped listing logic and rank work by start date. Three of six project records lead offsite. The Japanese research and documentation summaries are in English.

Keep stable localized URLs, local media previews, full-resolution originals, slide controls, video, theme preference, and secondary interests. The repository contains a model component but no project uses it. Interest providers with missing configuration redirect to 404. The shared layout lacks canonical and alternate URLs. Presentations currently fetch even when below the fold.

1. Pair an immediately scannable academic profile with the DRON prototype from the team's design review (slide 6). Expose contact and career direction.
2. Present three authored case studies in editorial order. Lead with DRON mechanical integration, then E2's individually attributed diverter design, then BLNC's team controls work. Give leadership, KARURA and research a home section. Keep external records in the index.
3. Share locale-aware templates, extract role summaries into MDX metadata, and place the technical account ahead of document viewers.
4. Test both locales, media, keyboard access, theme, responsive layout and discoverability. Record outstanding evidence separately.

## Production baseline reconciliation

The initial checkout predates the live deployment. Fetched main at 5a29126 already embeds a curated project grid on each homepage, uses Source Sans 3 and a warm palette, and has localized Worker 404s. It sends project-index links to the homepage anchor. The finished branch is based on this newer revision. Browser captures named “live” show the live homepage; “before” captures show main running locally.

Retained the production font, paper backing for diagrams, shared PDF worker and resize handling, 404 behavior, static engineering pages and original media. The homepage anchor still resolves at #projects. The project index now has its own URL and includes the external documentation, lab and repository records. The front page focuses on three personal case studies. Theme and language controls stay in the masthead; pointer-following and typing effects yield to immediate access to the content.
