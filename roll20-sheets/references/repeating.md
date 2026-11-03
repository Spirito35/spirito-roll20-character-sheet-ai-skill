# Repeating sections

Read for inventories, lists, aggregates and row actions.

## Structure and identity

```html
<fieldset class="repeating_inventory">
  <label>Item <input type="text" name="attr_name"></label>
  <label>Quantity <input type="number" name="attr_quantity" value="1" min="0"></label>
  <label>Weight <input type="number" name="attr_weight" value="0" min="0" step="0.1"></label>
</fieldset>
```

The saved name becomes `repeating_inventory_<RowID>_weight`. Choose a section name with no internal underscore after `repeating_`. Preserve historical names until an explicit migration. Parent/child relationships use collections linked by IDs, not nested sections.

RowID = durable identity; `$0` = position. Do not use position as a persistent reference to a weapon or resource.

| Need | API / event |
| --- | --- |
| Enumerate IDs | `getSectionIDs("repeating_inventory", callback)` |
| Listen to quantity | `change:repeating_inventory:quantity` |
| Listen to the section | `change:repeating_inventory` |
| Deletion | `remove:repeating_inventory` |
| Row button | `clicked:repeating_inventory:use` |
| Order changed | `change:_reporder:inventory` |
| Create an ID | `generateRowID()` then write the complete attributes |
| Delete | `removeRepeatingRow("repeating_inventory_" + id)` |

Sources verified on 2026-11-03: [workers](https://help.roll20.net/hc/en-us/articles/360037773513-Sheet-Worker-Scripts), [structure](https://help.roll20.net/hc/en-us/articles/360037773413-Intro-to-Sheet-Development).

## Minimal aggregate

```js
const recalcWeight = () => {
  getSectionIDs("repeating_inventory", ids => {
    if (!ids.length) {
      setAttrs({ weight_total: 0 }, { silent: true });
      return;
    }
    const fields = ids.flatMap(id => [
      `repeating_inventory_${id}_quantity`, `repeating_inventory_${id}_weight`
    ]);
    getAttrs(fields, values => {
      const nonnegative = (value, fallback) => {
        if (value == null || String(value).trim() === "") return fallback;
        const parsed = Number(value);
        return Number.isFinite(parsed) ? Math.max(0, parsed) : fallback;
      };
      const total = ids.reduce((sum, id) => {
        const prefix = `repeating_inventory_${id}_`;
        return sum + nonnegative(values[prefix + "quantity"], 1)
          * nonnegative(values[prefix + "weight"], 0);
      }, 0);
      setAttrs({ weight_total: Math.round(total * 100) / 100 }, { silent: true });
    });
  });
};
on("sheet:opened change:repeating_inventory:quantity " +
   "change:repeating_inventory:weight remove:repeating_inventory", recalcWeight);
```

Game-specific choices in this example: zero quantity allowed, non-negative weight, rounding to two decimals. Adapt these choices to the game. If the total feeds another output, orchestrate its recalculation after the silent write.

## Extracting and finding a row

Inspect the real `eventInfo` of the action. Remove the section prefix and the exact field/action suffix; avoid a greedy regex or fixed indices tied to the length of the name. Retrieve the canonical case through `getSectionIDs` if needed. On `remove`, `sourceAttribute` designates the row, with no field suffix, and `removedInfo` can provide the removed values.

Create a row with `generateRowID` + `setAttrs` of its explicit fields. Do not depend on an `add:repeating_*` event not established in the contract in use. Recalculate after the write callback if the creation requires it.

## Order, mirrors and projections

`getSectionIDs` does not guarantee manual order. Read `_reporder_repeating_inventory`, keep the IDs still present, then complete with the IDs absent from that order using a deterministic policy. Keep the IDs canonical.

For two views of the same collection, keep the section name and attribute names; differentiate the display classes. Test adding, editing, deleting and ordering from each view. The generated DOM (`.repcontainer`, `.repitem`) may differ from the source fieldset.

Projection to fixed slots: store the slot→RowID mapping, clear a slot whose row disappears, announce the display limit. A local limit of ten bars is not a Roll20 limit. A round-trip synchronization requires an authoritative source and loop prevention.

## Targeted checks

- Add, edit, move, delete, then delete the last row.
- Click an action after reordering: same RowID targeted.
- Test two rows with the same name and a new row with no prior input.
- Repeat the test on an old character and on mirror views, if present.
- Handle links to a row deleted or recreated by an import.
