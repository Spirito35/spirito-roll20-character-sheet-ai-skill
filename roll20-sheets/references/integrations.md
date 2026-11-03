# Roll20 settings and integrations

Read only for the requested integration. These features are not prerequisites for a simple sheet.

## Campaign settings

`sheet.json` can declare `useroptions`. An option designates an attribute without the `attr_` prefix, a control type, labels and an initial value. Separate technical value and translation.

Changing a default value does not automatically migrate existing characters. Plan an explicit action if the product must apply the new settings to data already created. Do not overwrite individual choices on every `sheet:opened`.

Source verified on 2026-11-03: [Default Sheet Settings](https://help.roll20.net/hc/en-us/articles/360041542554-Default-Sheet-Settings).

## Compendium

Declare compatibility through the appropriate `compendium` field in `sheet.json`, or through the game setting for a custom sheet. Examine the real schema of the entry to be imported.

```html
<fieldset class="repeating_items">
  <div class="compendium-drop-target">
    <input type="text" name="attr_name" accept="Name">
    <input type="text" name="attr_category" accept="Category">
  </div>
</fieldset>
```

The `accept` values must match the properties of the chosen compendium; `Name` and `Category` do not promise a universal schema. Examine the data received before building additional processing. If several fields arrive, do not assume that the first change means the whole drop is complete.

Source verified on 2026-11-03: [Compendium Integration](https://help.roll20.net/hc/en-us/articles/360043790493-Compendium-Integration).

## Default token

`setDefaultToken` is a specialized function of the compendium drop workflow. Check the properties allowed and the documented events. It is not a general access to all campaign tokens. See [Sheet Worker Scripts](https://help.roll20.net/hc/en-us/articles/360037773513-Sheet-Worker-Scripts).

## Charactermancer

The creation wizard has its own steps, temporary state, events and dedicated functions. Before implementing, read the lifecycle, slides, output and resumption in the [Charactermancer documentation](https://help.roll20.net/hc/en-us/articles/360037257394-Charactermancer), consulted on 2026-11-03.

Separate temporary choices from their final application. Test going back, cancelling, resuming, missing data and repeated final application. Also check the contribution rules if the sheet is to be submitted publicly. This reference is an orientation, not a complete manual of the Charactermancer API.

## Mod/API scripts

`sendChat`, access to campaign objects and modification of another target belong to an environment distinct from Sheet Workers. A `!name` command assumes the corresponding script and its permissions; document the dependency and its behavior when absent.

An attribute write by a Mod may require a suitable mechanism to trigger the workers. Examine the current contract of the API and of the sheet type, notably for Beacon. Do not assume that a data call reproduces the events of a UI input.

For a Mod implementation, consult the entry points in [sources.md](sources.md). This skill covers the boundary with sheets; it does not provide a fictional campaign API in the worker.

## Targeted checks

- Defaults on a new character and preservation of choices on an existing character.
- Drop of a complete, incomplete and incompatible entry; real property names.
- No premature overwrite on a partial event.
- Absent integration or missing permission: explicit behavior.
- Charactermancer: cancellation without unwanted final mutation, application without duplicates.
