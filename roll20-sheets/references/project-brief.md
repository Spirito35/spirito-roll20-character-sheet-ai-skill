# Project brief and optional rulebooks

Read when creating a sheet or clarifying its scope and game mechanics.

## Locate the requirements

Use the user's paths first. Otherwise look for `docs/sheet-brief.md` and, optionally, `docs/rulebooks/` relative to the project root, not the installed skill. These are suggested conventions, not required files. A request in chat can supply the same information; do not require a book or a completed form before helping.

Establish the game and edition (or custom system), sheet type, first-version features, language, existing files and desired automation. Create and fill in `docs/sheet-brief.md` yourself from the accessible sources and the user's request; do not ask the user to complete a template first. If a brief already exists, update relevant sections while preserving agreed choices and manual edits. Keep project-specific rules out of the reusable skill.

## With a rulebook

- When a relevant rulebook is found, draft the brief from it. Identify the game and edition, summarize the mechanics needed for the requested features, and distinguish source-backed facts, proposed scope and open questions. If no features have been specified, propose a small initial scope and ask about priorities; finding a book does not authorize implementing all its contents.
- Identify the source edition, applicable errata and explicit house rules. If sources conflict, ask which applies to the affected mechanic; do not silently merge editions.
- Use the table of contents or targeted searches to read relevant sections, including linked exceptions and tables. Do not load entire books for an isolated feature.
- Record the source filename and page or section for implemented mechanics in the brief. Distinguish printed page numbers from PDF page indices when they differ.
- Check that the available tools can actually read the source. If text extraction or a scanned table is unreliable, request the relevant readable excerpt or clarification and continue independent work. Never claim to have checked unreadable content.
- A rulebook defines mechanics, not implementation scope. Implement the requested subset and distinguish official rules from user overrides. Do not copy source books into the skill or a distributable archive.

## Without a rulebook

Write the brief from the user's feature list or chat description. For each requested mechanic, identify inputs, calculation or roll, output, manual overrides and an example expected result. Help the user supply missing details through focused questions, starting with decisions that affect implementation. Ask only for information not established by accessible sources or earlier decisions, including layout preferences and house rules that a book cannot determine.

Do not infer undocumented rules from the game's name. Clearly label proposed mechanics and assumptions; unresolved game rules stay manual or unimplemented until agreed. Continue with independent, agreed features rather than blocking the whole sheet.

## Ready to implement

Keep the brief concise: requested features, rule sources or agreed custom rules, automation boundaries and unresolved decisions. Reuse it for subsequent changes, reading only affected sections. Verify calculations against its expected examples; a static code check cannot establish that a game rule is correct.
