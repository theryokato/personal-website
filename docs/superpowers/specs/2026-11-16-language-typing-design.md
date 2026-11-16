# Language text reveal

The user requested fast typing-style replacement on language switching and selected all page text. Apply the previously proposed parallel reveal over 900ms, without a cursor or character-by-character deletion. This supersedes the locale crossfade; ordinary page navigation retains its existing crossfade.

## Approach

Use CSS Custom Highlights and DOM Ranges to reveal existing text by grapheme. This paints text without replacing it, preserving layout, markup, links, selection semantics, and complete screen-reader content. Group text nodes by their existing block layout so paragraphs reveal in reading order through inline links, while separate blocks reveal in parallel. Include navigation, headings, body text, project titles/dates, code text, and footer; image/PDF/video pixels and icon paths are not DOM text.

Alternatives: wrapping every character would alter markup/shaping and potentially wrapping; serial typing of the whole document would delay reading long pages. The selected parallel reveal preserves final layout and finishes quickly. Unsupported browsers retain the existing locale crossfade where available, otherwise immediate normal navigation.

## Behavior

- Only same-origin EN/JA counterparts of the same path trigger typing, including history navigation between locales. Initial visits, reloads, same-language navigation and hash changes do not.
- On destination pagereveal, reserve all final text space and progressively reveal grapheme clusters over 900ms. Never delay anchor navigation or fetch content separately.
- Keyboard focus/input and pointer press reveal everything immediately so users can act without hidden controls. Reduced motion immediately displays complete text and cancels an active reveal.
- Clear highlight/frame state on completion and page exit. Ignore text nodes replaced dynamically by existing components; do not overwrite their content.
- Preserve theme, layout, typography, colors, link behavior, social-name animation, media, and cat. No dependencies or client router.

## Verification

Browser-test real EN/JA changes on home, interests, and project detail pages; assert multiple blocks progress, grapheme-safe offsets, no DOM text changes or geometry shifts, and full cleanup. Check keyboard/pointer interruption, live reduced motion, reload/same-language exclusions, BFCache, unsupported highlights/metadata, and no-JS navigation. Run production build, Astro check, existing media/navigation/theme/name checks, idle screenshot comparisons, and independent review before the preview-branch push.

## Follow-up: pacing and embedded links

The user reported the original 450ms reveal was too fast and letters around embedded links appeared missing or out of order in Brave. Increase the duration to 900ms. Replace independent per-text-node masks with one continuous hidden-suffix range per contiguous block run, spanning inline links in document order. Split runs at nested blocks so ranges do not overlap unrelated content. If any node in a run changes dynamically, expose that run immediately rather than retaining a stale mask. Preserve all original markup, text, geometry, reduced-motion and interaction cancellation. Chromium inspection confirmed the old bio had 14 independently painted ranges; it did not reproduce the reported visual letter loss consistently. Validate the new continuous masking, slower pacing, and unchanged content/layout in both languages at mobile and desktop widths.
