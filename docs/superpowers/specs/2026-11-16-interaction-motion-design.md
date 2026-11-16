# Minimal interaction motion

Scope authorized by the user's integration request and explicit choice of content crossfade plus EN/JA control feedback. Continue Native execution on the existing feature branch.

- Project preview hover: image-only scale `1.012`, 160ms ease-out, within the existing clipped bounds.
- Standard button press: scale `0.985`, 80ms press and 140ms release. Apply the same feedback to the existing language links.
- Existing text-link underlines: 3px offset normally, 4px on hover, 140ms ease-out. Preserve every link's existing hover color and visible underline.
- Social handle changes: 60ms fade-out followed by 80ms fade-in. Cancel superseded animations; the latest hover target wins and leaving restores the localized original name. Keyboard updates and reduced-motion updates remain immediate. Keep social icons' existing Text Primary hover color and 150ms color transition; no extra icon movement.
- Language switching: 120ms opacity crossfade of main content and the existing language control. Header/footer/cat are not given motion. Limit transitions to same-origin EN/JA counterparts of the same path; other navigation remains immediate.
- Use native cross-document View Transitions with an early head listener, normal anchor navigation, no client router, no navigation-delay timers, and no new dependencies. Unsupported browsers, JavaScript-disabled browsing, and reduced motion retain ordinary immediate navigation.
- Preserve Warm Graphite, light default, saved preferences, layout, fonts, spacing, media behavior, project ordering, and the cat. User-requested name and language motion supersede only the earlier restrictions on those two interactions.

Implementation choices: native transitions progressively enhance the existing multi-page site; a client router would require unrelated lifecycle changes, while timed page fades would delay or compromise normal navigation. Use cancelable Web Animations for name text rather than uncoordinated timeouts. Keyboard focus indicators remain immediate.

Verify actual timings/states, name interruption and restoration, reduced-motion changes mid-animation, EN/JA navigation including detail pages and Back/Forward, ordinary-navigation exclusion, unsupported/no-JS fallback, dark/light preference persistence, media/cat regressions, idle layout snapshots, build and Astro check. Independent final review precedes push. No merge or environment publication.
