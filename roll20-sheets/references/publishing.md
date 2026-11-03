# Publishing a sheet

Read for a submission to the community repository. Distributing this skill is distinct from submitting a sheet to Roll20.

## Deliverable

Check the current requirements before submitting: [Minimum Requirements](https://help.roll20.net/hc/en-us/articles/360037773453-Minimum-Requirements-Best-Practices) and the [repository README](https://github.com/Roll20/roll20-character-sheets/blob/master/README.md), consulted on 2026-11-03.

Prepare HTML, CSS, `sheet.json`, preview and useful translations. File names and their case must match. Strict JSON, boolean `legacy`, LF line endings for submitted files. Generated files must be reproducible from the sources if the project uses a build.

```json
{
  "html": "my-game.html",
  "css": "my-game.css",
  "authors": "Contributor name",
  "roll20userid": "Contributor ID",
  "preview": "preview.png",
  "instructions": "Description of the sheet and its commands.",
  "legacy": false
}
```

This example is a schema to fill in, not metadata ready to submit. Do not reuse the creator identity of an example sheet.

## Contribution quality

Test the usual features, old characters and the requested browsers. Keep the interface readable on resizing; tables are for tabular data. If a gender field is provided, the contribution guide asks for free-text input.

Declare dependencies and ensure basic operation according to the repository's requirements. Preserve attributions and examine the rights to reused content. "Official" status does not follow from a folder name. For guided creation/advancement and rules content, consult the current restrictions rather than deducing permission from an existing sheet.

## AI assistance

The [Roll20 policy](https://help.roll20.net/hc/en-us/articles/43164327041943-AI-Policy-for-Community-Mod-Scripts-Character-Sheets), consulted on 2026-11-03, distinguishes technique, text and visuals in the channels concerned. Read the current version before contributing; code assistance does not exempt you from checking quality and rights. Do not generalize this policy to another publication channel.

## Targeted checks

- Manifest and matching files, real preview, correct identity.
- Compatibility of old data, commands and token actions.
- Real test log recorded; no "tested" based only on a parser.
- Sources, attribution and dependencies identifiable.
- Submission requirements re-read at PR time; do not promise a processing time.
