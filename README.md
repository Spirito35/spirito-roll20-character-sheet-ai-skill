# Roll20 Sheets — first shareable package

Working version: 2026-11-03. Language of the instructions: English. The same skill folder works with Codex and Claude Code; it contains Markdown instructions and an optional Python tool with no external dependencies.

## What it contains

- [SKILL.md](roll20-sheets/SKILL.md): short entry point, choice of references and invariants.
- Eighteen references by topic, linked from the entry point. Each topic says when to read it and which checks to select.
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

## Trying it

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
