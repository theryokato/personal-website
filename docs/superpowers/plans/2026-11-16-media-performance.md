# Media Performance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement inline and obtain one independent final review.

**Goal:** Implement the four audited performance improvements approved by the user on the existing localized-404 branch and PR.

**Architecture:** Observe presentations and footer with a 300px viewport margin. Load the existing local runtimes on demand, share one PDF worker and cached document promises, and render canvases to their displayed width multiplied by device pixel ratio. Preserve original markup, visual design, controls, keyboard behavior, automatic loading and reduced motion; no dependencies or original-media changes.

**Tech Stack:** Astro, existing PDF.js 3.11, Piixpal 0.4, IntersectionObserver, ResizeObserver, browser regression harness and Node HTTP tests.

**Spec:** The user's approved four-point performance audit in this conversation: viewport-triggered automatic presentations; shared PDF worker; screen-sized canvases; footer-triggered Roomba runtime (skip it under reduced motion).

## Global Constraints

Continue fix/localized-404-routing and update PR #3; do not merge. Keep the localized404 fix intact. No design/content/dependency changes. Preserve all current media and Roomba controls.

## Review Focus

- Concurrent slide loads must share a worker and avoid duplicate document fetches.
- Resizing during PDF loading/rendering must settle at current display resolution without overlapping canvas renders.
- Loading failures must leave usable PDF links and permit retry.
- Footer visibility/reduced-motion changes during runtime loading must not create an unwanted mascot.
- Back/Forward restoration must preserve functional slides and avoid duplicate Roombas/listeners.

### Task 1: Slides

Modify src/components/ProjectSlides.astro. Existing markup remains unchanged.

- [x] Write browser assertions for no RED PDFs before approaching slides, automatic first-page display after scroll, one worker across both presentations, DPR-correct canvases and responsive redraw, previous/next/click controls, missing-runtime/PDF fallback. Observe failure on current build.
- [x] Add one shared PDFWorker and cache document promises. Trigger first-page loading at 300px from viewport; direct controls can also start loading. Use displayed width × devicePixelRatio for render scale. Redraw initialized canvases after resize without concurrent render tasks. Guard repeated initialization.
- [x] Build/check, restart production preview, and run browser assertions.

### Task 2: Footer runtime

Modify src/components/FooterRoomba.astro. Keep original sprite and keyboard interaction.

- [x] Assert no runtime request on initial homepage or under reduced motion; automatic load on footer approach; live preference changes and Back/Forward cleanup. Observe failure on current build.
- [x] Replace eager script tags with a cached sequential classic-script loader. Gate loading and mascot creation on footer proximity, current reduced-motion preference, and active page lifecycle. Handle failures without breaking the footer or leaving unhandled rejections.
- [x] Run combined performance/control/browser checks, existing localized404 HTTP suite, build and Astro check. Compare settled geometry in both languages/themes and collect before/after resource totals.
- [x] Independent final review, fix material findings, commit/push and rewrite PR #3 around final scope. No merge.

## Audit baseline

Local production preview cold-load transfer before scrolling: homepage0.16–0.33MiB, DRON5.2MiB, RED8.4MiB. RED starts two worker instances (second script load hits browser cache). Every slide canvas1440×810 (~4.4MiB RGBA), including360px displays. Roomba runtime52,355bytes loaded even with reduced motion. Raw results outside repo: /tmp/portfolio-performance-audit.json.

## Verification results

- RED: prior build fetched both offscreen RED PDFs and both Piixpal scripts before scrolling. New checks reproduce these issues before implementation and pass after it.
- Worker failure/retry check also failed before the recovery patch, then passed after clearing failed worker/library initialization. PDF.js retains failed fake-worker state, so the library is reset only on that error path.
- Build and Astro check pass: 0 errors, 0 warnings, 5 existing unused-variable hints. All 12 localized404 HTTP regression tests pass.
- Chromium checks pass for EN/JA, 390px at DPR3 and1280px atDPR1: automatic near-viewport rendering, one shared worker, previous/next, resize, history, and error links. Additional checks cover concurrent loads, resizeduringdownload, repeated initialization, failed-workerretry, reducedmotionduringRoombadownload, pointer/keyboard interaction, and lifecycle cleanup.
- Eight before/after homepage geometry/typography/color comparisons and screenshots pass in both languages/themes. No media markup or CSS changed.
- Independent review found no remaining material issues; verified same-source concurrent fetch deduplication and delayed mascot loading across page lifecycle changes. Browser testing used Chromium; no remote/browser timing claim is made.

Local cold-load transfer before scrolling (same preview/viewport setup):

| Page | Before | After |
| --- | --- | --- |
| Homepage | 0.16–0.33MiB | 0.11–0.28MiB |
| DRON | 5.19–5.26MiB | 5.12–5.13MiB |
| RED | 8.37–8.39MiB | 0.08–0.10MiB |

DRON's first presentation is already within the300px loading margin, so it still starts automatically during the measured initial view. Rendered canvases changed from1440×810 (~4.4MiB RGBA) to1080×608 (~2.5MiB) at360px/DPR3, and630×355 (~0.9MiB) at630px/DPR1. These are pixel-buffer sizes, not total application memory or production bandwidth benchmarks.

Keep PR #3 open with its final scope rewritten around localized404 and media loading. No merge or environment publication.
