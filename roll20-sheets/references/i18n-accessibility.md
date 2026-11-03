# Translation, accessibility and printing

Read for translated text, a shared interface or printed output.

## Translation

```html
<label>
  <span data-i18n="weapon-name">Weapon name</span>
  <input type="text" name="attr_weapon_name"
    placeholder="Name" data-i18n-placeholder="weapon-name">
</label>
```

```json
{ "weapon-name": "Weapon name" }
```

Translate labels and descriptions; keep attribute names and technical values. Actually load `translation.json` in the editor or the Sandbox; its mere presence on disk does not guarantee it is used.

`getTranslationByKey` is for text built in a worker; provide a fallback if the key is missing. `^{key}` is for sheet macros. `data-i18n-dynamic` targets cases where a displayed value is a translation key; check its exact use before substituting it for free text.

Also inventory the keys generated in JS, not only the HTML attributes. Do not save the first reader's translation as the sole truth of the shared character. Test language switching and several readers if the sheet generates persistent localized macros.

Source verified on 2026-11-03: [Character Sheet Translation](https://help.roll20.net/hc/en-us/articles/360037773493-Character-Sheet-Translation).

## Accessibility

A label per control, an accessible name for an icon-only control, visible focus and usable keyboard navigation. A placeholder or a tooltip alone does not replace a label. Essential information must remain accessible without hovering.

Do not use color alone for success, failure or activation. Test contrast, zoom, long text and font size. Give elements the role matching their behavior: a clickable image is not a heading just because `role="heading"` is added.

Hidden controls and overlaid panels must not trap focus in an invisible area. Use native elements when possible; test rather than counting ARIA attributes.

## Printing

Enable only if it is part of the requirements. In CSE, use `@media print` rules, with a light page, unneeded controls hidden, useful sections visible and suitable breaks. Inventory the tabs, filtered lists and off-screen notes to include.

Test a short and a long sheet, from the real print context, then check the PDF. Support for a CSS rule does not guarantee that all the intended data is rendered. The workaround for window styles must stay limited to the printed context.

Source verified on 2026-11-03: [Print Friendly](https://help.roll20.net/hc/en-us/articles/10823045719063-Making-Your-Character-Sheet-Print-Friendly).

## Targeted checks

- Static and dynamic keys resolved; at least two languages if multilingual.
- Technical values not renamed for translation.
- Input, buttons, navigation and closing usable by keyboard.
- Large text/zoom without loss of action or value.
- Printing: expected sections, long lists and legibility of the result.
