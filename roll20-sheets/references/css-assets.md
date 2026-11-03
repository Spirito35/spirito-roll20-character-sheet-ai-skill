# CSS, themes and graphic assets

Read for layout, overflow, appearance or asset loading.

## Scope and cascade

Scope sheet styles under `.charsheet` and a project-specific root. The chat uses `.sheet-rolltemplate-NAME`, in a different context. Explicitly keep the classes needed in CSE. Do not impose a `.ui-dialog` ancestor without testing the detached window.

Before adding `!important`: confirm the loaded file, the rendered selector, the computed property, the winning rule, its specificity and its order. A redesign does not justify removing every `!important` without examining its role.

Avoid global resets giving the same width/height to all spans and buttons. Icons, inline values and editable fields do not have the same box.

## Shrinkable columns

```css
.charsheet .sheet-demo-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 64px 64px;
  gap: 6px;
}
.charsheet .sheet-demo-grid > * { min-width: 0; }
.charsheet .sheet-demo-grid input {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}
```

Test long text, zoom and different widths. There is no mandatory universal width of 820px. Provide a usable display at the initial target width. Descriptions must not be truncated by a fixed height chosen for a single example.

Media queries react to the viewport of the rendering context; container queries target the box of a declared container. Choose according to the real structure, testing in the sheet and in the popout. Check `:has`, `@container`, animations and variables separately: "modern CSS" is not a single contract.

## Themes

Centralize a palette, remove the old class before the new one and preserve the manual choice. The operating system's theme, the VTT's and the sheet's can differ. Inspect the theme markers rendered in the current context; current CSE patterns use `body.sheet-darkmode` and a distinct chat context.

Declare the variables needed in the roll template; they do not inherit from the sheet root. Test contrast, readonly fields, focus and success/failure states in each supported theme.

## Images, fonts and icons

- A local resource on the creator's disk is not accessible to players. Use a stable HTTPS file URL, with a fallback.
- A GitHub `blob` URL designates a page, not necessarily an image served directly.
- For an image tied to an attribute, check support and try an empty, invalid and unreachable URL. Do not treat the avatar/token pseudo-attributes as freely modifiable fields; check their contract before writing.
- Background and border: fallback color/border; decoration that does not intercept clicks. Check `border-image` on short and long content.
- Place font imports before ordinary rules. Keep a readable fallback family. Do not automatically apply the old Legacy Google Fonts workarounds to CSE.
- Ligature showing "settings" instead of an icon: examine the font request, family, ligatures, case and spacing. Add an accessible name to the button.
- Repeating controls are generated: inspect `.repcontrol`/`.itemcontrol` and the edit mode before restyling them.

## Delivered CSS convention

By default, do not introduce comments, non-ASCII characters or emojis into delivered CSS, including roll-template styles. Do not hide emojis behind Unicode escapes. Keep explanations in Markdown files; prefer ASCII ligature names or images for icons, and put translated text in HTML.

This is the skill's delivery convention, drawn from loading incidents reported by Spirito, not a universal Roll20 restriction. Explicit project instructions and documented exceptions take precedence. Preserve existing exceptions within their stated scope; do not extend them to other sheets or new occurrences without instruction. Historical occurrences do not authorize a cleanup of the whole sheet.

Textual check, adapted to the delivered file:

```powershell
rg -n -e '/\*' -e '\*/' -e '[^\x09\x0A\x0D\x20-\x7E]' 'path/sheet.css'
```

This check does not detect every escaped emoji. Inspect CSS escapes as well as matches, and compare changes against the existing file and documented exceptions. Do not blindly remove strings, URLs, attributions or required license notices; preserve required notices and document any necessary exception.

## Targeted checks

- Sheet and chat, embedded and detached window, intended themes.
- Long names, many repeating rows, edit/delete buttons.
- Visible focus, non-blocking overlays, unavailable assets.
- Check delivered CSS, including template styles, against the convention and project exceptions above. An empty textual check does not certify VTT compatibility.

CSE framework verified on 2026-11-03: [sanitization](https://help.roll20.net/hc/en-us/articles/360061735034-iFrame-and-Sanitization-Changes). The grid, gauge and width choices are recommendations drawn from work on the local sheets.
