# HTML structure and controls

Read when a sheet's structure or a control changes.

Deliver a fragment, with no enclosing `DOCTYPE`/`html`/`head`/`body` document and no nested form. CSS goes in the CSS output. Sheet JS goes in a `script` block of type `text/worker`; a separate source JS file requires a build that embeds it. Do not invent execution through `onclick` or an external script.

```html
<div class="sheet-demo">
  <label>Strength <input type="number" name="attr_strength" value="0"></label>
  <button type="roll" name="roll_test"
    value="&{template:default} {{name=Test}} {{result=[[1d20+@{strength}]]}}">Test</button>
</div>
```

Placing the templates and then the worker block after the controls is a practical delivery choice. A sheet without JS logic does not need an empty worker; if it has any, group its workers in a single block, resolving name collisions.

## Controls

- `name="attr_..."` provides the binding; an ID alone does not save.
- Select: explicit, stable technical values; translatable labels.
- Radios: same attribute, distinct values, a single checked default.
- Multiline text: textarea. A placeholder does not replace a label.
- `type="action"` corresponds to a `clicked:...` event; `type="roll"` carries a chat command.
- Unique IDs; avoid IDs in repeatable templates. Wrapping an input in its label avoids depending on `for`/`id`.
- Tables for tabular data, Grid/Flex for layout.

## Filtering

Identify CSE/Legacy before diagnosing a removed element: [environment.md](environment.md). The old guide globally forbade `section`, `header` and `footer`; the CSE documentation announces support for semantic HTML. Use simple containers if compatibility is unknown, without turning this caution into a universal prohibition.

If a name or an element disappears, inspect the DOM after loading and reduce to the minimal case. Historical lists of filtered substrings must not trigger a mass rename without a reproduction. A class containing `eval` is not sufficient proof of a CSE bug.

## Targeted checks

- Persistence after closing/reopening.
- Button bound to the right event or the right macro.
- Labels, focus and keyboard input usable.
- No duplicated static ID in a repeating section; no injection of a full form/document.
- Structure tested in the real mode, including the chat if a template changes.

Sources verified on 2026-11-03: [Intro](https://help.roll20.net/hc/en-us/articles/360037773413-Intro-to-Sheet-Development), [CSE](https://help.roll20.net/hc/en-us/articles/360061735034-iFrame-and-Sanitization-Changes), [workers](https://help.roll20.net/hc/en-us/articles/360037773513-Sheet-Worker-Scripts). See environment for their differences in scope.
