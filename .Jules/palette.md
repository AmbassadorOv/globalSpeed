# Palette's UX & Accessibility Journal

## [2026-05-20] Tooltips for Icon-Only Buttons
- **Issue**: The extension header uses several icon-only buttons. While they have `aria-label` for screen readers, sighted users don't get a visual hint on hover (except for the Pin button which already had a custom tooltip mechanism via GSM tokens).
- **Improvement**: Added `title` attributes to all icon-only buttons in the popup header.
- **Learning**: `title` provides a native tooltip that complements `aria-label`. For the Pin button, I used the existing GSM token to maintain consistency with the localized tooltip.
- **Accessibility**: Improved "Operable" and "Understandable" principles for sighted keyboard and mouse users.
