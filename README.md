# Roll20 Sheets — first shareable package

Working version: 2026-11-03. Language of the instructions: English. The same skill folder works with Codex and Claude Code; it contains Markdown instructions and an optional Python tool with no external dependencies.

## What it contains

- [SKILL.md](roll20-sheets/SKILL.md): short entry point, choice of references and invariants.
- Topic references, linked from the entry point. Each topic says when to read it and which checks to select.
- [check_sheet.py](roll20-sheets/scripts/check_sheet.py): read-only static checker, Python 3.10+.
- [Source catalog](roll20-sheets/references/sources.md): official links, consultation date and coverage limits.

The package works without Spirito's sheets, backups or paths. Examples are short and adaptable; personal conventions and observations stay out of this public folder. It is not affiliated with Roll20 and does not reproduce a complete official manual.

## Installing in a project

Copy the **whole** `roll20-sheets` folder, not just `SKILL.md`, to the desired location:

| Tool | Destination in the project |
| --- | --- |
| Codex | `.agents/skills/roll20-sheets/` |
| Claude Code | `.claude/skills/roll20-sheets/` |

Both copies must come from the same version of the package to avoid diverging instructions. Keep this folder as the editable source and re-copy the full folder on update. Do not install several copies of the same skill in the same tool without a reason.

Installation sources consulted on 2026-11-03: [Codex](https://learn.chatgpt.com/docs/build-skills), [Claude Code](https://code.claude.com/docs/en/skills). The locations above target local project sessions; Claude.ai, Cowork and cloud environments have their own loading mechanisms, to be checked in their documentation.

The archive `roll20-sheets-v1.zip`, provided next to this file, contains the complete skill folder. Extract it, then place the folder at the appropriate destination. No global installation or project configuration was performed while preparing this V1.

## Start your sheet: with or without a rulebook

A rulebook is optional. The skill explains how to build a Roll20 sheet; you supply the game rules and the features you want. A book does not mean that every rule must be automated.

Keep project documents outside the installed skill folder so updating the skill does not replace them. Suggested layout, relative to your sheet project's root:

```text
my-sheet-project/
  docs/
    sheet-brief.md
    rulebooks/          # Optional: your rulebooks and errata
  sheet.html           # Example output names; existing projects keep theirs
  sheet.css
```

These paths are a convention, not a requirement. If your files are elsewhere, tell the agent their paths. They must be accessible in the agent's workspace; a path on another computer is not enough.

### With a rulebook

1. Put the relevant PDF, Markdown or text files in `docs/rulebooks/`. Keep books you cannot redistribute out of the public repository and release archives; add `/docs/rulebooks/` to your project's `.gitignore` before committing them. This does not untrack files already committed.
2. Ask the agent to start your sheet. When it finds a relevant rulebook, it creates and fills in `docs/sheet-brief.md` itself: game, edition, source filenames, relevant chapters or pages, mechanics and proposed first-version features. You do not need to fill out the template first.
3. The agent asks you about choices the book cannot settle, such as feature priorities, layout and house rules. It reads only the sections needed for the task and records page or section references. If a PDF cannot be read with the available tools, provide a readable excerpt or text export; the agent must flag the gap.

Example request after activating the skill:

```text
Create a Roll20 sheet from docs/rulebooks/core-rules.pdf.
Create and fill in docs/sheet-brief.md from the rulebook yourself.
Start with attributes, skill rolls and health.
Read only the relevant sections, cite their pages or headings,
and ask about unresolved rules before automating them.
```

### Without a rulebook

Describe your feature list in plain language in chat; the agent creates and fills in `docs/sheet-brief.md` from it. You can also write the brief yourself if you prefer. You do not need to know HTML, CSS or the final formulas yet.

For each feature, say what users enter, what the sheet calculates, which buttons they need and what results they expect. Mark unknown rules as undecided. The agent can build agreed parts and ask focused questions about missing mechanics; it should not silently invent a game's rules.

The agent can use this starter for either route, or you can fill it in yourself:

```markdown
# Sheet brief
- Game and edition, or custom system:
- Language and sheet type (PC, NPC, vehicle, etc.):
- Existing sheet files, if any:
- Rulebook paths and relevant sections, or "No rulebook":
- Errata and house rules, if any:

## First-version features
| Feature | User inputs | Calculation or roll | Expected result |
| --- | --- | --- | --- |
| Skill roll | Skill bonus | 1d20 + bonus (example custom rule) | Chat result; bonus 3 and die 10 gives 13 |
| Health | Current and maximum | Manual tracking | Editing maximum does not refill current health |

## Layout and automation
- Sections or tabs wanted:
- Actions to automate and values to keep manual:
- Features to leave for later:

## Open questions
- Rules or behavior still to decide:
```

Replace the example rows with your own rules. With no rulebook, an example request is:

```text
Create a Roll20 sheet. I have no rulebook. I want skill rolls,
manual health tracking and an inventory with a weight total.
Write docs/sheet-brief.md from this list and ask about missing formulas.
Keep undecided mechanics manual until we settle their behavior.
```

## Activating the skill

In Codex:

```text
Use $roll20-sheets to fix the weight total after deleting
the last inventory row in the indicated files.
```

In Claude Code:

```text
/roll20-sheets Fix the weight total after deleting the last
inventory row in the indicated files.
```

The name and description also allow automatic selection depending on the environment. If the skill does not appear, check the destination and the reloading of skills in the version of the tool in use.

To apply a project-specific convention, provide it in the project's usual instructions. Example: "For this project, do not add comments or non-ASCII characters to the delivered CSS; preserve explicitly documented exceptions." This preference is not imposed on the public.

## Scope and limits

V1 mainly covers CSE HTML/CSS creation and maintenance, plus Legacy particularities. It covers the usual decisions around data, workers, repeating sections, CSS, rolls, templates, resources, import/export, translation and validation. Beacon, Charactermancer and Mod/API have dedicated orientation and sources; they are not treated as equivalent to the CSE architecture.

The rules were restructured from Spirito's two guides and cross-checked on targeted points against the listed sources. No access to a Roll20 game was used to validate this V1. The script does not certify a worker, a rendering or a game rule.

## Keeping it efficient

Do not ask the model to read every Markdown file at startup. Let it choose references according to the change. Keep each rule in a single place, incident histories in the project, and long documentation behind targeted links.

After a real failure, add the scenario to the regression checklist and then fix the instruction responsible. Measure the content actually read and the result obtained on comparable tasks. File length is only an indicator; on its own it measures neither the tokens consumed nor the quality.

The [evaluation protocol](EVALUATION.md) provides five representative requests and their success criteria for comparing the two agents.

When editing the references, keep the sources and the evidence qualifications. Do not turn a recommendation into "mandatory" without a platform or project justification.

## About Spirito

I'm [Spirito](https://www.spirito.fr), a graphic designer and tabletop role-playing character sheet creator. I have coded more than a dozen sheets myself, and this project grew out of that work.

The sheet code used to develop this skill came exclusively from my own creations. I chose not to use other authors' sheet code from the Roll20 community repository because I had not obtained their agreement to use their work for this project. The skill also draws on the platform documentation linked in its source catalog; links to repository guidance are documentation references, not a corpus of other creators' sheets.

This is a set of instructions and references for existing AI assistants, not an AI model trained exclusively on my sheets. The provenance described here concerns this skill, not the training data of the models that use it.

## Support my work

Like many creatives, my work has been affected by the arrival of AI. It's here, and we have to find a way to work with it. Sharing this skill is one way I'm putting my experience to use.

If this project helps you and you'd like to say thanks, you can [make a voluntary donation through PayPal](https://www.paypal.com/paypalme/spirito35). Donations support my work as a designer and sheet creator; they are not required to use the skill.

You can also find me and my work at [www.spirito.fr](https://www.spirito.fr).
