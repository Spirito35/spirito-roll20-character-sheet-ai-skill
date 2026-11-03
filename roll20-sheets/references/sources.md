# Sources, coverage and maintenance

Read to fill a gap, resolve a contradiction or refresh a rule. Do not open this whole catalog for every task.

## Level of evidence

1. Official contract relevant to the engine and function used.
2. Reproducible test in the context actually targeted, with date and files.
3. Observation in existing code: an example to examine, not a certification.
4. Design recommendation or personal convention: explicitly identified.

An official source may contain a historical passage. Example: the introduction forbids IDs and media queries, while the CSE document allows them. Compare the scope, not just the date shown on the page. If a conflict persists, describe the nuance and check a minimal case.

## Primary documentation consulted on 2026-11-03

Pages opened for this first pass; targeted verification of the points used, not a certification of all their APIs.

| Topic to look up | Source |
| --- | --- |
| CSE/Legacy, classes, IDs, chat sanitization | [iFrame and Sanitization Changes](https://help.roll20.net/hc/en-us/articles/360061735034-iFrame-and-Sanitization-Changes) |
| Fragment, attributes, repeating, preview/Sandbox | [Intro to Sheet Development](https://help.roll20.net/hc/en-us/articles/360037773413-Intro-to-Sheet-Development) — historical restrictions to cross-check |
| getAttrs, setAttrs, on, remove, reporder, translation, token | [Sheet Worker Scripts](https://help.roll20.net/hc/en-us/articles/360037773513-Sheet-Worker-Scripts) |
| startRoll, finishRoll, computed, follow-up buttons | [Custom Roll Parsing](https://help.roll20.net/hc/en-us/articles/4403865972503-Custom-Roll-Parsing-for-Character-Sheets) |
| Helpers, allprops, conditions, chat styles | [How to Make Roll Templates](https://help.roll20.net/hc/en-us/articles/360037257334-How-to-Make-Roll-Templates) |
| Dice, rerolls, explosions, thresholds, groupings | [Dice Reference](https://help.roll20.net/hc/en-us/articles/360037773133-Dice-Reference) |
| Macros, queries, references, token actions | [Macros & Token Actions](https://help.roll20.net/hc/en-us/articles/360037256794-Macros-Token-Actions) |
| Audience and chat commands | [Text Chat](https://help.roll20.net/hc/en-us/articles/360039675093-Text-Chat) |
| data-i18n, JSON, dynamic strings | [Character Sheet Translation](https://help.roll20.net/hc/en-us/articles/360037773493-Character-Sheet-Translation) |
| useroptions and defaults | [Default Sheet Settings](https://help.roll20.net/hc/en-us/articles/360041542554-Default-Sheet-Settings) |
| Drop targets, accept, compatibility | [Compendium Integration](https://help.roll20.net/hc/en-us/articles/360043790493-Compendium-Integration) |
| Slides, state, wizard events | [Charactermancer](https://help.roll20.net/hc/en-us/articles/360037257394-Charactermancer) |
| Print CSS and rendering limits | [Print Friendly](https://help.roll20.net/hc/en-us/articles/10823045719063-Making-Your-Character-Sheet-Print-Friendly) |
| Submission requirements | [Minimum Requirements](https://help.roll20.net/hc/en-us/articles/360037773453-Minimum-Requirements-Best-Practices) |
| Repository structure and contribution | [HTML/CSS sheets README](https://github.com/Roll20/roll20-character-sheets/blob/master/README.md) |
| Policy applicable to official channels | [AI Policy](https://help.roll20.net/hc/en-us/articles/43164327041943-AI-Policy-for-Community-Mod-Scripts-Character-Sheets) |
| API boundary, functions and Mod sandbox versions | [Mod Scripts: Function Documentation](https://help.roll20.net/hc/en-us/articles/360037772833-Mod-Scripts-Function-Documentation) |
| Beacon SDK orientation | [Introduction](https://roll20.github.io/beacon-docs/docs/gettingstarted/introduction/), [installation](https://roll20.github.io/beacon-docs/docs/gettingstarted/installing-beacon/), [Beacon repository](https://github.com/Roll20/roll20-beacon-sheets) |

## Inherited supplementary resources

The following links come from the initial guide and serve as leads. Their content was not fully re-verified for this V1. Open and examine the relevant passage before drawing a new obligation from them.

- [Wiki: restrictions](https://wiki.roll20.net/Character_Sheet_Development/Restrictions), [CSE](https://wiki.roll20.net/Character_Sheet_Enhancement), [Legacy sanitization](https://wiki.roll20.net/Legacy_Sheet_Sanitization).
- [Repeating](https://wiki.roll20.net/Character_Sheet_Development/Repeating_Section), [worker examples](https://wiki.roll20.net/Sheet_Worker_Snippets), [auto-calc](https://wiki.roll20.net/Building_Character_Sheets/Auto-Calc).
- [CSS Wizardry](https://wiki.roll20.net/CSS_Wizardry), [images](https://wiki.roll20.net/Image_use_in_character_sheets), [bugs and quirks](https://wiki.roll20.net/Character_Sheet_Development/Bugs_%26_Quirks).
- [Finding our flair](https://app.roll20.net/forum/permalink/10754271/): community explanations around `$20` and classes.

The initial guide had consulted several Wiki pages only through search excerpts because of an access block. This status must not become official proof in the new version.

## Extending without bloating the entry point

Look up the exact function name and its engine in a primary source. Open the page, read the contract and an example, note date/scope. Add a rule or a small example to the topic's reference. Create a new reference only for a distinct need, then link it from `SKILL.md` with a reading condition.

Keep regression cases in the project where they occur. Do not copy entire external documentation; summarize the useful decisions and link the details. An absence from search results or from a repository does not demonstrate a prohibition.

## Scope of this V1

Operational coverage: CSE HTML/CSS sheets, Legacy maintenance, data, workers, repeating sections, interface, rolls/templates, resources, migrations, translation, validation. Integrations, publishing, printing: entry points and targeted checks.

Beacon, advanced Charactermancer and full Mod script development are pointed to their dedicated documentation. This package is not an exhaustive mirror of the whole Roll20 platform. Undocumented internal functions are not offered as a stable base. No VTT test was run during this restructuring.
