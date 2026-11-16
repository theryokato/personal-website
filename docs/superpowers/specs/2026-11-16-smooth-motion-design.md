# Coordinated motion refinement

The user approved the coordinated refinement on November 16: soften page/language navigation, theme changes, hover feedback, and social-name swaps without altering the visible design.

## Approach

Extend the existing native cross-document transitions to internal page navigation. Use a 220ms opacity crossfade on main content; only locale changes also fade the language control. Keep normal anchor navigation, browser history, header/footer/cat placement, and immediate unsupported/no-JS fallback. Exclude reloads, same-path/hash-only changes, and external navigation. No router, navigation-delay timers, movement choreography, or dependencies.

The smaller alternative was only retiming existing effects, leaving ordinary navigation immediate. The user chose the coordinated refinement. A client router or a whole-screen theme snapshot would add lifecycle complexity and interfere with the existing cat/media, so neither is needed.

## Details

- Theme: 240ms ease-in-out color/background/border interpolation across existing elements only during a user toggle, plus an opacity crossfade between the existing sun/moon icons. Preserve saved preferences and the early light-default initialization without a startup transition.
- Hover: 200ms color/underline/filter feedback and 220ms image scale, using a gentle ease-in-out curve. Preserve scale 1.012 and underline offset 3px to 4px.
- Button press: retain scale 0.985, use 100ms press and 180ms release.
- Name: 90ms fade-out and 110ms fade-in, preserving cancellation, latest-intent behavior, immediate keyboard updates, and restoration.
- Keyboard focus stays immediate. CSS and JavaScript respect reduced motion, including changes while an effect is running.
- Preserve all layout, typography, colors, wording, projects, automatic slides, zoom, media controls, and the original cat. No entrance effects or extra movement.

## Verification

Check real native page/language transitions, reload/hash exclusions, Back/Forward, rapid name/theme interactions, persisted theme, reduced-motion toggling, and no-JS fallback. Compare idle screenshots/geometry in EN/JA, light/dark, mobile/desktop. Run production build, Astro check, and existing media/navigation browser checks. Independently review the final change before pushing the existing preview branch.
