# Verification proportionate to the change

Read when preparing checks or before delivery. An explicit full audit covers all applicable domains; a routine fix covers its scope and the dependencies touched.

## Common baseline

- [ ] Active files and mode identified; recoverable state available if needed.
- [ ] Expected behavior described with an input/output example.
- [ ] Attributes and consumers involved examined; old data preserved.
- [ ] Relevant local checks run and results examined.
- [ ] The change's scenario and neighboring cases tried in Roll20, or explicitly flagged as still to do.
- [ ] Exact summary: changes, verifications, limits.

## Choosing the checklist

| Change | Useful scenarios |
| --- | --- |
| Input/calculation | Empty, zero, negative, limit, new/old character |
| Repeating | Add, edit, order, delete, last row |
| Bonuses/dependencies | Add then remove a source, change choice and value |
| Pool/cost | Zero max, increase/decrease, insufficient, double click |
| Roll/template | Normal, advantage, disadvantage, tie, critical, absent property |
| Privacy | Author, GM and another player; real prefix |
| Interface/CSS | Embedded/detached window, width, zoom, keyboard, themes |
| Translation | Static/dynamic keys, two languages if planned |
| Migration/import | Old/incomplete, repetition, invalid data without mutation |
| Integration | Absent dependency, wrong input type, permissions |
| Printing | Short/long sheet, tabs and notes included |
| Publishing | Manifest, preview, files, current requirements |

Do not tick tests that were not run. Use `validated locally`, `validated in Roll20`, `not applicable` with a reason, or `to test`. The references' checklists spell out the topic's invariants; there is no need to copy them into a multi-page report for a small fix.

## Optional checker

From the skill folder, Python 3.10+:

```text
python scripts/check_sheet.py --html /path/sheet.html --css /path/sheet.css
python scripts/check_sheet.py --sheet-json /path/sheet.json --translation /path/translation.json
```

A `sheet.json` supplies its HTML/CSS paths when they are not passed explicitly. The manifest's relative paths are resolved from its folder. The script reads the files; it modifies nothing and executes no worker.

Checks: UTF-8, strict JSON, type of `legacy`, declared files, dangerous HTML structure, number of worker blocks, duplicated/historical IDs, basic bindings, static i18n keys and matching of literal template names. Warnings require examination, not automatic removal.

Options `--css-ascii` and `--css-no-comments` only if the project adopts these conventions. They detect textual hints, not a complete CSS language nor all encoded emojis. No option authorizes automatic removal.

Exit code: 0 no blocking error detected (warnings possible), 1 errors detected, 2 incorrect usage. Use `--json` for a structured result. These codes never certify rendering, events or game rules in Roll20.

## Other checks

A JS parser can check the syntax of the extracted worker block; counting braces is not enough. A general-purpose HTML linter may not recognize `type="roll"`, `type="action"` and `rolltemplate`: adapt the tool before applying its fixes.

In PowerShell, read files with `Get-Content -Encoding UTF8`. Search for stable functions/attributes rather than memorized line numbers. A local test simulating `getAttrs` does not validate the real platform.

## Recording a useful problem

```text
Date / sheet / version:
Files and mode actually loaded:
Scenario and initial values:
Expected / observed:
Cause and code reference:
Fix / tests run:
Status: hypothesis, confirmed in the code, confirmed in Roll20
```

Keep project-specific history out of the common instructions. Add a short lesson to the skill only if it helps a future task; do not accumulate all past incidents in the main entry point.
