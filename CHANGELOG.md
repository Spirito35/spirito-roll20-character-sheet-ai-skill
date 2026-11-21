# Changelog

Additions and changes to Spirito Roll20 Character Sheet AI Skill (R20CSAIS), newest first.

## 2026-11-21 - AutoUploaderR20

Added:
- `AutoUploaderR20/`: Chrome extension (v1.4.0) that adds a folder picker to Roll20's Sheet Sandbox window and sends the sheet's HTML, CSS and translation files again on every save. English translation of the author's working French version; the logic is unchanged. The English version is not yet tested in Chrome or Roll20. Icons use the Spirito favicon on a dark background.

Changed:
- `README.md`: section 4 mentions AutoUploaderR20 next to the official Roll20 Autouploader, and links to this changelog.
- `roll20-sheets/references/environment.md`: the optional uploads paragraph mentions AutoUploaderR20.

## 2026-11-21 - First learnings from a real sheet build

Source: feedback and failures recorded while building the Daggerheart sheet (2026-11-10 to 2026-11-20), tested in Roll20.

Added:
- `roll20-sheets/references/roll20-pitfalls.md`: Roll20 behaviors that broke a real sheet.
  - Default Roll20 styles to neutralize (dice glyph on buttons, focus outline, label margins and padding, `appearance: none` radios and checkboxes).
  - Controls that collapse or do not click (radios in grids, selects ignoring `line-height`, tabs).
  - Roll template styles silently ignored in chat because of CSS backslash escapes, with the bisection method that found the cause.
  - Roll template design rules, chat action buttons that target hidden sheet buttons, native inline rolls for damage.
  - Pitfalls of scripted CSS/HTML edits (orphan selectors, brace balance, mixed line endings, control characters) and method rules (backups, say what was not tested, check what a counter means).
- `roll20-sheets/references/author-style-defaults.md`: the author's house design preferences, used as defaults when the user gives no style of their own.
  - Field sizes, buttons and icons, information density, gauges, equipment, grids and repeating controls.
  - Spacing, first-open experience, where settings live, chat card details, fonts, style source and credits.
- `CHANGELOG.md`: this file.

Changed:
- `roll20-sheets/SKILL.md`: two new rows in "Choosing references" for the files above.
- `roll20-sheets/references/diagnostic.md`: four new symptoms (template styles ignored, CSS stopped after a scripted edit, Roll20 default button/input styles, controls that do not click).

Adjusted from the original notes:
- The author's preferences are worded as defaults that the user's own conventions, the game's official sheet and explicit project instructions override.
- The commissioning client's name and a local folder path were removed from the public text.

## 2026-11-03 - v1.0

First public version: skill instructions (`roll20-sheets/`), optional checking script, evaluation scenarios and license. Not yet validated through a complete live Roll20 test.
