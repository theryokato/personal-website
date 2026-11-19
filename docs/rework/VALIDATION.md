# Validation

## Build and functional checks

The redesign uses Astro, Tailwind and MDX. Engineering pages are generated at build time. Cloudflare handles localized missing-page responses. Run `npm run build`, then `npm run preview -- --host 127.0.0.1 --port 4335` to review locally.

- Astro production build passed. Astro diagnostics reported zero errors, zero warnings and three unused-variable hints.
- All 12 repository tests passed against the Cloudflare preview. The index test reflects the restored project index; missing-page tests check the HTTP status, language, links and HEAD behavior.
- Chromium/Playwright visited 11 routes per locale at 390, 768 and 1440 pixels, with reduced motion enabled. No horizontal overflow appeared. The 22 localized HTML pages each have one main heading, image alternatives and resolvable local asset and page links.
- A keyboard journey used the skip link, opened DRON, switched to its Japanese counterpart, and persisted dark mode through a reload. On mobile the PDF and MP4 stayed off the initial request list. Video playback, advancing PDF pages, full-size poster zoom and Escape dismissal worked.
- axe-core found zero violations under the WCAG A/AA 2.0, 2.1 AA and 2.2 AA tags on the English homepage, Japanese index, Japanese DRON, English RED and Japanese interests pages in both themes. Screen-reader and human usability evaluation remain outstanding.
- External GET requests returned HTTP 200 for KARURA, TURTLE, HERC, the knowledge base, GitHub, LinkedIn and X. The email link was checked without sending a message.
- Live interest-list data needs provider configuration at build time. In its absence the pages render a localized availability message. The model viewer remains available to authors; no existing case study includes a 3D model.
- Desktop and mobile screenshots are under `screenshots/`. “Live” captures are from theryokato.com. “Before” captures are from main at 5a29126. “After” captures are from the redesign. Japanese dark-mode captures supplement the English light-mode comparisons.

## Lighthouse laboratory measurements

Chromium ran Lighthouse 12.8.2 against the local production preview with default simulated mobile throttling and the desktop preset. These are individual lab runs. Field INP and percentile Core Web Vitals require real visitor data. Recruiter comprehension time has not been user-tested.

| Page and preset | Performance | Accessibility | Best practices | SEO | LCP | CLS | Total blocking time |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| English homepage, mobile | 99 | 100 | 100 | 100 | 1.8 s | 0.001 | 0 ms |
| English homepage, desktop | 100 | 100 | 100 | 100 | 0.5 s | 0.002 | 0 ms |
| Japanese DRON, mobile | 99 | 100 | 100 | 100 | 2.1 s | 0.003 | 0 ms |

The first mobile DRON run measured 2.7 s LCP. The final run above includes high fetch priority for the lead CAD view and a 37 KB video poster derived from the original 93 KB poster.
