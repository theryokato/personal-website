# Minimal Interaction Motion Implementation Plan

> Use superpowers:executing-plans for Native execution; user authorization and the selected language scope are recorded in the spec.

**Spec:** `docs/superpowers/specs/2026-11-16-interaction-motion-design.md`
**Goal:** Add the selected interaction motion without changing the site's resting appearance or navigation architecture.
**Architecture:** CSS refines existing gestures; a shared cancelable name animation handles pointer interaction; a classic early head script scopes native cross-document transitions to locale changes.
**Constraints:** Same cloud checkout/branch; no dependencies, client router, scroll/entrance effects, layout changes, palette changes, or delayed keyboard focus. Immediate reduced-motion/no-JS/unsupported fallbacks.

## Task 1 — Existing gestures and social name

- [x] Record baseline build identity and meaningful failures for the requested scale/timing/underline/name animation behavior using external Playwright checks.
- [x] Update `src/components/ProjectGrid.astro` to image hover scale1.012/160ms ease-out.
- [x] Update `src/styles/global.css` for press0.985/80ms/release140ms and existing underline3→4px/140ms; reduced motion disables transforms, including CSS individual scale, and underline movement.
- [x] Update `src/scripts/social-name.ts` with cancelable60ms-out/80ms-in pointer fades, immediate keyboard/reduced-motion updates, latest-target handling, and safe restoration on leave/BFCache.
- [x] Build/type-check; verify all four social handles in both locales, rapid movement, focus/hover overlap, cancellation, reduced-motion changes, row geometry, unchanged hover colors, press/release and image clipping. Commit the gesture changes.

## Task 2 — Locale navigation motion

- [x] Verify a locale change currently lacks the requested scoped content/control crossfade.
- [x] Add a shared early-inline-head component `src/components/LanguageMotion.astro`, included from `src/layouts/Base.astro`. Use pageswap/pagereveal and NavigationActivation metadata; require different EN/JA locale with the same normalized path and origin. Skip all other transitions and reduced motion; clean names after completion for BFCache.
- [x] Add only a styling hook to `src/components/LanguagePicker.astro`. CSS gives the existing control press feedback and named opacity transitions; disable root/group motion and preserve main snapshot proportions. Add no router or navigation interception.
- [x] Build/type-check; test native transitions on home/detail locale links, normal navigation exclusion, same-locale clicks, Back/Forward, JavaScript-disabled and unavailable metadata fallbacks, reduced motion, no residual flags/animations, preserved themes, and cat count/lifecycle.
- [x] Run relevant existing grid, routes, Warm Graphite, media and theme checks, updating only expectations intentionally changed by this motion spec. Compare idle geometry/screenshots in both languages/themes at desktop/mobile sizes.
- [x] Obtain one independent read-only review of the complete motion change; fix important findings with regression evidence. Commit and push the feature branch, then report actual Cloudflare state and preview link.

Keep temporary checks, recordings, and the progress ledger outside the repository under `/workspace/.tools/motion-plan` and `/workspace/screenshots/interaction-motion`.

## Verification record

- Production build passed:21pages; Astrocheck0errors/0warnings/5existinghints.
- Gesture checks passed bothlocales: image1.012/160ms; press.985/80ms/release140ms; underline3→4px/140ms; name60/80ms/cancellation/reset; immediatekeyboard/reducedmotion.
- Native locale checks passed home/detail/back/forward; normal andsame-locale navigation excluded; noJS/metadatafallback/reducedmotion preserve immediate navigation andthecat.
- Sixteen idle geometry/font comparisons and Warm GraphiteAA/token checks passed, as did all four socialhandles withbothmotionpreferences, route/grid/theme/slide/media regressions.
- Environment reconnect preservedallfiles but reapedpreview/sessionhandles; restartedpreview andreran theunreadregressiongroup successfully.
- Imagehover usesplaintransform becausecompiledresetofindividualscale didnotcancel theTailwindhover scale.
- Independentfinalreviewpassedwithnofindings: actualBFCache restoration, interruptedfades, keyboard/hoveroverlap andlive reduced-motion cancellation allverified inChromium. Otherbrowsers retain progressivefallback; remotedeploymentstate isreported inchat afterpush.
