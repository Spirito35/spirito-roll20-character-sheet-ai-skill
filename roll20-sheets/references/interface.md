# Interface: navigation, panels and gauges

Read for a display state or a visual interaction.

## Persisting useful state

Page, PC/NPC mode, theme and useful preferences live in attributes. Classes are only their visual representation, to be rebuilt on opening. Decide separately whether a temporary panel should reopen or close.

`$20` is not jQuery nor a general DOM access. The local techniques examined use `addClass` and `removeClass`. Do not infer `.css`, `.val`, `.append`, `.html` or `document.querySelector` from that. For any additional method, consult its current contract and run a targeted test. This local observation is not an exhaustive list of possible features.

## Panel without a worker

```html
<div class="sheet-details-panel">
  <label><input type="checkbox" class="sheet-toggle"
    name="attr_details_open" value="1">Details</label>
  <div class="sheet-details">Detailed content.</div>
</div>
```

```css
.charsheet .sheet-details-panel .sheet-details { display: none; }
.charsheet .sheet-details-panel:has(.sheet-toggle:checked) .sheet-details { display: block; }
```

CSE example to validate in the target browser. For a setup without `:has`, place the toggle and the panel as siblings, associate an accessible label, then use `:checked ~ .sheet-details`. An intervening wrapper changes the CSS relationship; inspect the structure instead of modifying the worker.

## Attribute-driven navigation

Keep a closed list of pages, a deterministic fallback and selectors limited to the component's container. The click writes `nav_tab`; the change and the opening re-read that attribute and apply the classes. Avoid a global class that simultaneously hides PC, NPC and familiar.

Locally manipulated classes must be rebuilt for other readers from the data. Do not use their presence as mechanical truth or permission.

## Gauge

Decide on a zero maximum, negative values, overflow and the meaning of colors. A high load and a high pool do not mean the same thing.

Observed pattern: visual percentage bounded 0–100, class `sheet-barN`, widths precompiled in the CSS. The worker removes the old classes then adds the one for the current level. Game values stay independent of the percentage. Avoid an invented call to `$20(...).css("width", ...)`.

To put a value on the bar, overlay the text on a positioned parent, without including it in the flow of the fill. Check that decorative layers do not capture clicks.

## Overlaid panels and tracks

Define closing, exclusivity, maximum height and scrolling. Test an old sheet where several "open" states are saved. A visual overlay is not a genuine accessible dialog just because an ARIA role is added.

Cumulative tracks: checking a notch rebuilds the lower notches in one idempotent operation. Cyclic states: keep a stable game value, derive the display. Do not recalculate a cost for every box changed if the action represents a single expense.

## Targeted checks

- Close/reopen and switch character: expected state restored.
- Change value and maximum: consistent gauge, zero maximum handled.
- Two readers, two panels, detached window: no stray state.
- Keyboard, focus, closing and clicks through overlays usable.

Provenance: techniques from the local sheets Solar Rail, Daughters of Lam and Azeroth; design recommendations. CSE compatibility to be cross-checked via [sources.md](sources.md), and not by generalizing from these sheets alone.
