# Environment and compatibility

Read for a creation, a loading problem or an engine migration.

## Identifying the target

| Target | Indicators | Consequence |
| --- | --- | --- |
| CSE HTML/CSS sheet | HTML fragment, workers, `legacy: false` or CSE setting | Use this skill's references |
| Legacy HTML/CSS sheet | `legacy: true`, Legacy Sanitization box checked | Keep the Legacy constraints until a migration is requested |
| Beacon | Beacon SDK dependency and a dedicated web project | Read the SDK documentation; do not paste CSE workers into this architecture |

The absence of `sheet.json` does not establish the game's setting. A game name containing "Beacon" does not prove SDK use. A V3/V4 in the name does not designate the Roll20 engine.

## CSE and Legacy

The CSE migration documentation notably allows IDs, breakpoints, animations and semantic HTML, with remaining restrictions. The older introductory texts still forbid several of these elements: apply the contract of the targeted engine, not all the historical prohibitions at once. Roll templates keep a Legacy sanitization, even in a CSE sheet.

In CSE, match the HTML/CSS classes explicitly. Keeping `sheet-` is possible if both sides agree; do not remove this prefix globally. Scope styles to the sheet and handle the chat separately. IDs must be unique, with no static ID in a repeating row template.

For a migration: back up the active pair, switch the mode deliberately, compare the classes and rendered styles, then test sheet, chat and detached window. There is no need to rename persistent attributes for this migration alone.

Source verified on 2026-11-03: [iFrame and Sanitization Changes](https://help.roll20.net/hc/en-us/articles/360061735034-iFrame-and-Sanitization-Changes).

## Three distinct contexts

- Custom Sheet Sandbox: load and try a sheet.
- Sheet Workers: calculations and events on character attributes.
- Mod/API: campaign automation in a separate environment.

A local HTML preview gives an approximate rendering; it does not implement Roll20 services. The editor's Preview is not enough for workers. Load the files, save, refresh the game and open a character for functional acceptance. See [Intro to Sheet Development](https://help.roll20.net/hc/en-us/articles/360037773413-Intro-to-Sheet-Development), consulted on 2026-11-03; its historical restrictions must be cross-checked against CSE.

## Beacon orientation

Beacon has its own development chain. Identify the installed version, the sources, the build and the data model before implementing. The CSE chapters of this package do not describe its API.

Entry points: [SDK introduction](https://roll20.github.io/beacon-docs/docs/gettingstarted/introduction/), [installation](https://roll20.github.io/beacon-docs/docs/gettingstarted/installing-beacon/), [Beacon sheets](https://github.com/Roll20/roll20-beacon-sheets). This V1 points toward Beacon; it does not claim to cover its whole implementation.
