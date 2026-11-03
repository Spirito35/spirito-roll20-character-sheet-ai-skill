# Attributes and persistent data

Read before adding a field, fixing a value or changing a calculation.

| Context | Example |
| --- | --- |
| HTML control | `name="attr_strength"` |
| Display | `<span name="attr_strength"></span>` |
| Worker | `getAttrs(["strength"], callback)` ; `setAttrs({strength: 3})` |
| Event | `change:strength` |
| Macro | `@{strength}` |
| Maximum | HTML `attr_hp_max`, worker `hp_max`, macro `@{hp\|max}` |
| Action button | `name="act_rest"` → `clicked:rest` |
| Roll button | `name="roll_attack"` → `%{Character\|attack}` |

The HTML binding prefixes `attr_` and `act_` are not part of the names passed to `getAttrs`/`setAttrs`. For new fields, use stable technical names, preferably lowercase, with no spaces or accents. Preserve historical names or plan a migration.

## A field's contract

Determine source, type, unit, initial value, bounds, who owns the writes, and dependencies. Separate input, bonus, total, presentation and interface state when their roles differ. Two controls with the same name represent the same data: this can be a deliberate mirror.

`placeholder` saves nothing. Changing an HTML `value` does not migrate values already saved. A `<span>` displays data without ensuring its initialization. HTML control limits do not replace validation of imports and calculations.

## Empty and zero

```js
const toNumber = (value, fallback = 0) => {
  if (value == null || String(value).trim() === "") return fallback;
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
```

Use an explicit fallback. `Number(v.hp) || maximum` refills a pool that is at zero. `parseInt("2d6", 10)` accepts a numeric prefix: it is not an integer-input validation. A decimal comma requires an input policy, not an assumed implicit conversion.

Checkbox with `value="1"`: compare explicitly to `"1"`. `Boolean("0")` is true. Before normalizing an old sheet, check whether it stores `on`, a formula or a macro fragment.

## Computed values

For new dynamic calculations, prefer a worker output into a span or a readonly input. Reserve a separate field for the manual bonus. `getAttrs` reads an attribute string; on its own it does not evaluate an `@{...}` formula or dice.

Do not create two competing producers for the same result. A historical auto-calc and a worker can coexist in the same sheet, but a worker must not assume it receives the evaluated value of an auto-calc field. Examine the dependency before converting; do not rewrite all auto-calcs for an unrelated change.

## Targeted checks

- Empty, zero, negative, decimal and out-of-bounds value: explicit behavior, no `NaN`.
- New and old character: no default wrongly reapplied.
- Mirrors: same data; independent fields: distinct names.
- Renamed field: all consumers and the migration handled.

Read contract and events: [Sheet Worker Scripts](https://help.roll20.net/hc/en-us/articles/360037773513-Sheet-Worker-Scripts), verified on 2026-11-03. The naming and separation conventions above are design recommendations.
