# Initialization, migrations and import/export

Read whenever a change touches persistent data or an import.

## Initializing

Fill in missing fields without overwriting inputs, zeros and exceptions. A character with no version may be old: do not automatically treat it as a new sheet. Use the data present and the schema history to choose the path.

Materialize the fields needed for a row's first roll if the context requires it. Do not recreate a row or restore its defaults on every opening.

## Migrating

The character's data version is distinct from the file's publication version. Chain migrations in order, wait for their writes and record the new version after success. A replayed migration must neither double the values nor lose data.

Renaming a public attribute, section or button can affect old sheets, token actions and chat links. Plan a mapping, compatibility or an announced break. Do not migrate data unrelated to the request.

Before a change that risks erasing data, keep a recoverable copy and a representative test character. Preserve manual fields distinct from automatic calculations.

## Import contract

| Mode | Effect |
| --- | --- |
| Add | New rows; a second import may create duplicates |
| Merge | Reuse based on an explicit stable key |
| Replace | Replacement of a clearly defined scope |

Before any deletion or write: parse the JSON, check format/version, types, allowed fields, bounds, volume and relationships. A successful `JSON.parse` or a version of the right type does not validate the content.

Prepare the final data before replacing the old. Old ID→new ID table if rows refer to each other; restore the manual order where it matters. Avoid using imported totals as new authoritative inputs if the bases allow recomputing them.

Wait for the writes, rerun calculations and visual state, then display the result of the import. A batch limit chosen by an old importer is not an established Roll20 quota.

## Export

Define the list of data, version, sections, order and links. Do not include a transient calculation state as source data without reason. Explain the omissions. An export is useful only if its restoration has been tried on a copy.

## Targeted checks

- Old, partially filled character, with no version; zero preserved.
- Reopening after migration: no double conversion.
- Invalid JSON or inconsistent content: no mutation.
- Two identical imports: result consistent with the chosen mode.
- Row relationships and order kept, manual field preserved.
- Interruption/failure: no final version recorded prematurely.

Provenance: design recommendations drawn from the limits encountered in the importers and migrations studied. Native primitives: [workers.md](workers.md), [repeating.md](repeating.md).
