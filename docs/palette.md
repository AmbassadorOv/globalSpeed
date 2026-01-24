# Palette Journal

## [2024-05-24] - Accessibility for Icon-only Buttons
In the Global Speed extension, several icon-only buttons in the popup header and speed controls were missing `title` attributes. While they had `aria-label` for screen readers, sighted users lacked visual tooltips on hover.

### Learnings:
- Always pair `aria-label` with `title` for icon-only buttons to ensure both screen-reader and sighted-user accessibility.
- Localized strings should be used for tooltips when available in `gvar.gsm`.
- Standardized the header and speed control buttons to follow this pattern.

### Changes:
- Added `title` to all buttons in `src/popup/Header.tsx`.
- Added `aria-label` and `title` to step buttons in `src/popup/SpeedControl.tsx`.
