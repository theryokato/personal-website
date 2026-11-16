# Smooth Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Make the existing portfolio interactions feel smoother without redesigning it.

**Architecture:** Extend native navigation transitions and refine existing CSS/Web Animations. Theme color transitions are enabled briefly around user toggles; icon opacity follows the existing root theme attribute.

**Tech Stack:** Astro, Tailwind CSS, native View Transitions, Web Animations, external Playwright regression harness.

**Spec:** docs/superpowers/specs/2026-11-16-smooth-motion-design.md

## Global Constraints

Preserve layout, typography, spacing, colors, content, project order, automatic slides, media controls, and cat. No dependencies, router, navigation delays, entrance effects, or choreography. Immediate keyboard focus and reduced-motion fallback.

## Review Focus

- Rapid repeated theme toggles must settle on the final preference without a lingering transition class.
- Navigation between differently sized pages must not stretch screenshots or animate header/footer/cat.
- Back/Forward cache restoration must clear transient state.
- A reduced-motion change during active feedback must cancel ongoing effects.
- No-JS and missing navigation metadata must retain usable normal links and correct initial theme icons.

### Task 1: Coordinated motion

**Files:** Modify src/styles/global.css, src/components/LanguageMotion.astro, src/layouts/Base.astro, src/scripts/social-name.ts. External tests: /workspace/.tools/browser/smooth-motion-check.cjs and existing browser harnesses.

**Interfaces:** Existing root theme attributes and locale anchors remain compatible. Navigation script marks data-page-transition for distinct internal paths, with data-language-transition only for locale counterparts. CSS consumes these flags; completion clears both.

- [x] Capture baseline screenshots at 390px/1280px, EN/JA, light/dark; write browser assertions for 220ms page fades, 240ms theme interpolation/icon opacity, and softened hover/name timings. Run against current build and observe failures.
- [x] Implement 200ms hover colors/underlines/filter, 220ms image hover, 100ms press/180ms release, 90ms/110ms name fades. Use ease-in-out for hover/page/theme, retaining immediate keyboard and reduced-motion behavior.
- [x] Extend native navigation validation to different same-origin localized paths; fade only main content for ordinary navigation and main/control for locale counterparts. Skip same-path, hash, reload, external/missing metadata; clear flags on completion.
- [x] Stack existing theme icons in the same 20px footprint using CSS opacity and root theme. Enable 240ms color/background/border/opacity transitions only during toggle, clean up after completion, page lifecycle, or reduced-motion change. Never transition initial theme selection.
- [x] Run production build and Astro check. Restart production preview and run new browser assertions plus existing name/theme/media/navigation/slides checks. Compare screenshots and idle geometry for all eight combinations.
- [x] Obtain independent final review, address material findings, then commit/push the existing feature branch for Cloudflare preview. No merge or environment publication.

## Verification record

- Browser assertions first failed against the original build: image hover was 160ms rather than 220ms, theme heading color snapped, and ordinary navigation did not crossfade. All pass after implementation.
- Production build: 21 pages; Astro check: 0 errors, 0 warnings, 5 existing unused-variable hints. No repository test script is configured.
- Native Chromium checks: page/language fades, Back/Forward, reload and same-path exclusions, theme interpolation/icons, rapid toggles, reduced-motion cancellation, name cancellation/reset, immediate keyboard feedback.
- Existing media, slides, theme, social-name, homepage navigation/redirect, responsive-grid, and Warm Graphite checks pass.
- Eight homepage before/after screenshots have identical pixels and geometry at rest: EN/JA × 390px/1280px × light/dark. Sixteen broader home/interests geometry and typography comparisons also pass.
- Independent review found no material regressions; true BFCache restoration and fallback paths verified. Browser probes used Chromium; other engines were not independently tested. Committed/pushed to the existing preview branch; no merge or environment publication.
