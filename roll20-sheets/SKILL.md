---
name: roll20-sheets
description: Create, modify, debug and verify Roll20 HTML/CSS character sheets with Sheet Workers, repeating sections, macros and roll templates. Use for CSE or Legacy sheets; for Beacon, read the orientation reference before choosing another architecture.
---

# Roll20 Sheets

Work on the requested need, preserving character data and game rules. This skill provides procedures and targeted references; it does not replace the project's own instructions.

## Getting started

For a new sheet or unclear requirements, read [project-brief.md](references/project-brief.md): work from an optional rulebook or a user-defined feature list. For a focused fix, use the existing requirements without restarting onboarding.

1. Identify the files actually in use: sources or build outputs, HTML/CSS, `sheet.json` and any translations. Set aside backups and unrelated variants.
2. Determine the engine: CSE, Legacy or Beacon. If the repository is not enough, state the uncertainty and check the setting actually loaded before making any mode-dependent decision.
3. Locate the attributes, events, macros and selectors involved with targeted searches. Read their producers and consumers, not every sheet in the repository.
4. Read only the references below that are useful. For a creation, start with environment, data and HTML, then add the topics needed. For a fix, follow the cause and its dependencies.

## Choosing references

All paths are relative to this skill's folder. A row says when to read a file, not that everything must be loaded.

| Need | Reference |
| --- | --- |
| Mode, loading, Legacy/CSE migration, Beacon orientation | [environment.md](references/environment.md) |
| Attributes, empty/zero, computed values | [data.md](references/data.md) |
| HTML controls, structure, forms | [html.md](references/html.md) |
| Calculations, events, asynchrony, slowness | [workers.md](references/workers.md) |
| Repeating rows, identity, order, aggregates | [repeating.md](references/repeating.md) |
| Tabs, panels, gauges, `$20` | [interface.md](references/interface.md) |
| Layout, themes, images, fonts | [css-assets.md](references/css-assets.md) |
| Buttons, dice, queries, privacy, CRP | [rolls-macros.md](references/rolls-macros.md) |
| Chat rendering, conditions, computed results | [roll-templates.md](references/roll-templates.md) |
| HP, costs, rests, damage | [resources.md](references/resources.md) |
| Bonuses, caps, parsers, game-specific dependencies | [rules-engines.md](references/rules-engines.md) |
| Renaming, legacy data, import/export | [migrations-import.md](references/migrations-import.md) |
| Translations, keyboard, accessibility, printing | [i18n-accessibility.md](references/i18n-accessibility.md) |
| Compendium, campaign settings, Charactermancer, Mod/API | [integrations.md](references/integrations.md) |
| Submission to the community repository | [publishing.md](references/publishing.md) |
| Cause of a symptom still unknown | [diagnostic.md](references/diagnostic.md) |
| Choosing checks and the delivery checklist | [validation.md](references/validation.md) |
| Uncovered feature, compatibility doubt, source to refresh | [sources.md](references/sources.md) |

## Common invariants

- A persistent attribute name is a data contract. Renaming it requires examining existing characters, macros and integrations.
- Opening a sheet or recalculating must not reset a spent resource or a manual choice. Distinguish absent, empty and zero.
- A worker is neither a web page script nor a campaign Mod/API script. Do not invent native functions or DOM capabilities.
- A display option is not a permission; a value shown in chat is not a change to the pools.
- Distinguish documented rule, design recommendation and project convention. The number of sheets using a technique proves neither its validity nor a platform limit.
- Delivered CSS: by default, introduce no comments, non-ASCII characters or emojis, including escaped emojis and roll-template styles. Follow the [CSS convention and checks](references/css-assets.md#delivered-css-convention); preserve explicit project exceptions and avoid unrelated cleanup.

## Modifying and verifying

Keep a recoverable state before any significant change. Adapt the scope to the need; do not turn a repair into a general rewrite.

Select the checks from the relevant reference and from [validation.md](references/validation.md). If Python 3.10+ is available, the optional checker [check_sheet.py](scripts/check_sheet.py) inspects the files explicitly passed to it without modifying them; see `--help` for its options. It does not certify that anything works in Roll20.

Conclude with the files changed, the resulting behavior, the checks actually run and the Roll20 tests still to be done. Do not report something as partly tested on the basis of a read-through or a syntax check alone.

## Filling a gap

Open the official source for the topic, check its engine and scope, then add a short rule to the right reference with the URL and the date consulted. In case of contradictory documentation, keep the nuance and plan a minimal test. Without access to the source or to the VTT, flag what remains to be confirmed rather than inventing a contract.
