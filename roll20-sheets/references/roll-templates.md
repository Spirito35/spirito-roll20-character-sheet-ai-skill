# Roll templates

Read for chat cards, helpers, criticals or result theming.

For template styles, apply the [delivered CSS convention](css-assets.md#delivered-css-convention), including its checks and project exceptions.

## Name contract

```text
&{template:demo}
<rolltemplate class="sheet-rolltemplate-demo">
.sheet-rolltemplate-demo { ... }
```

Make the three names match. Use double quotes in the templates' HTML attributes. Keep their `sheet-` prefixing and their Legacy constraints even if the sheet is CSE. The chat does not descend from the `.charsheet` root: the palette and styles needed must be defined there.

## Helpers

| Form | Meaning |
| --- | --- |
| `{{#description}}...{{/description}}` | Property present / usable as a condition |
| `{{^description}}...{{/description}}` | Absence branch |
| `{{#rollTotal() roll 10}}...{{/rollTotal() roll 10}}` | Total equal |
| `rollGreater()` / `rollLess()` | Strict comparison |
| `rollBetween()` | Inclusive range |
| `rollWasCrit()` / `rollWasFumble()` | Critical/fumble markers of the roll |
| `{{#allprops() name attack}}...{{/allprops() name attack}}` | Remaining properties, excluding `name` and `attack` |

In `allprops`, use `{{key}}` and `{{value}}`. The parameters are a list of exclusions, not the list of properties to include. Repeat the arguments when closing the helper.

Numeric helpers: pass an appropriate inline roll, and keep apart the results that must be compared independently. Property existence, numeric zero and empty text are three distinct notions. Prefer a display flag separate from the number.

For CRP, use `computed::name` for computed results. Do not assume that replacing only the display also replaces all the critical conditions.

Source verified on 2026-11-03: [How to Make Roll Templates](https://help.roll20.net/hc/en-us/articles/360037257334-How-to-Make-Roll-Templates). CRP details: [rolls-macros.md](rolls-macros.md).

## Advantage, ties and damage

If two results are compared, handle first higher, second higher and tie. Use the kept result for success, critical, confirmation and extra damage. Striking through the rejected result does not automatically exclude it from the other conditions.

A `{{damage=...}}` property does not apply that damage to a pool. A list limited to twenty attacks or thirty items is a generator/template choice, not a universal quota. Change producer, template and styles together if this limit changes.

## Links and descriptions

Omit links whose ID is missing: `[Name]()` is a non-empty string, not an absent link. A link to the journal grants no permission. A descriptive card does not need dice.

Test long and multiline text, localized names, chat width, inline roll classes and themes. A card already published does not become a DOM component editable by the worker.

## Targeted checks

- The three names match, as do blocks and closings.
- Each comparison receives the right result; ties and criticals consistent.
- `allprops` excludes the intended properties, with no leak of technical fields.
- Display without optional property and without dice usable.
- Chat styles and variables self-contained; link permissions verified.
