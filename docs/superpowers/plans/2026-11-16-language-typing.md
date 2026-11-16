# Language Typing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reveal all translated page text with a fast, layout-stable typing effect.

**Architecture:** Extend the early classic head navigation script with a Custom Highlight paint effect. Keep real text unchanged and use Intl.Segmenter boundaries within existing block groups; fall back to the current locale crossfade if unsupported.

**Tech Stack:** Astro, CSS Custom Highlights, DOM Ranges, Intl.Segmenter, requestAnimationFrame, existing native View Transitions.

**Spec:** docs/superpowers/specs/2026-11-16-language-typing-design.md

## Global Constraints

450ms parallel block reveal; complete accessible text and original markup at all times. Preserve layout/typography/colors/media/cat. Immediate keyboard, pointer-press, and reduced-motion cancellation. No dependencies, client router, navigation delays, or initial-page effects.

## Review Focus

- Inline links must reveal in paragraph order without splitting grapheme clusters.
- Dynamically replaced text nodes must never throw or be overwritten.
- BFCache and rapid locale switches must not retain invisible text.
- Keyboard/pointer interaction must expose controls immediately.
- Missing highlights, segmentation, or navigation metadata must retain usable pages.

### Task 1: Language reveal

**Files:** src/components/LanguageMotion.astro owns detection, highlights and cleanup; src/styles/global.css owns the named highlight paint rule. External browser test /workspace/.tools/browser/language-typing-check.cjs.

**Interfaces:** Existing normal anchors/theme APIs remain unchanged. A locale counterpart uses typing if CSS.highlights, Highlight, and Intl.Segmenter are available; otherwise existing data-page-transition/data-language-transition flags continue driving native crossfades.

- [x] Write and run browser assertions against the previous production build: destination locale has active hidden-text ranges, moves boundaries on grapheme positions, finishes with no highlights, and preserves complete text and geometry.
- [x] Add a 450ms requestAnimationFrame reveal of text ranges grouped by nearest existing non-inline layout ancestor. Skip non-rendered/script/style/SVG/media text; preserve DOM nodes and their data. Cancel on pagehide/pageswap, keydown/focusin/pointerdown, or live reduced motion; discard stale ranges for changed nodes.
- [x] Route locale counterparts through reveal on pagereveal without relying on a ViewTransition object; retain native ordinary-page crossfades and unsupported-locale fallback. Add ::highlight(language-typing) paint CSS that hides unrevealed text/decorations without reflow.
- [x] Build and run Astro check; restart preview. Verify reveal on EN/JA home, interests and project detail; partial progression, full cleanup, interruption, segmentation, geometry, history, no-JS and fallbacks. Run existing media/theme/name/navigation checks and compare idle screenshots.
- [x] Independent review, fix material findings, commit/push the existing preview branch; no merge or environment publication.

## Verification record

- RED: a real locale change on the previous build never created typing ranges. GREEN: both directions on home, Interests, and DRON reveal grapheme-safe offsets over multiple frames, retain complete text and identical geometry, and clean up fully.
- Keyboard, pointer press, live reduced motion, dynamic social-name updates, reload exclusion, and unsupported highlights/segmentation/navigation metadata/no-JS fallbacks pass. Ordinary page crossfades and Back/Forward behavior remain intact.
- Production build: 21 pages. Astro check: 0 errors, 0 warnings, 5 existing unused-variable hints; no repository test script is configured.
- Existing media, automatic slide rendering/controls, image zoom, video controls, cat, theme, name, responsive grid, redirects, localized detail metadata, and language paths pass their browser checks.
- All eight settled EN/JA × 390px/1280px × light/dark homepage screenshots are pixel-identical to the baseline, with unchanged geometry, typography, and colors. A mid-reveal screenshot confirms progressive text without layout movement.
- Independent review found no blockers; verified real BFCache, five rapid locale switches, inline link order, dynamic node mutation, and live reduced motion. Browser verification uses Chromium; other engines and assistive technology were not independently tested.
- Deferred minor: Chromium may emit native transition-abort console diagnostics on very rapid Back navigation during a locale reveal. Text restores and reveal cleanup still completes. No visible failure was found.
- Committed/pushed to the existing preview branch; no merge or environment publication.
