# Sheet Workers

Read for a calculation, event, asynchrony or performance.

## Useful contract

| API / event | Use |
| --- | --- |
| `on(events, callback)` | Subscriptions; several events separated by spaces |
| `getAttrs(names, callback)` | Asynchronous read |
| `setAttrs(values, options?, callback?)` | Asynchronous write; wait for the callback before a dependent read |
| `{silent: true}` | Avoids propagating the corresponding `change` events |
| `sheet:opened` | Conservative rebuild / initialization |
| `change:name` | Attribute change |
| `eventInfo` | Source, type, old/new values depending on the event; removed data on `remove` |

Event names are lowercase; `sourceAttribute` may lose the case of the RowID. Both `change:x` and `change:x_max` variants can occur: read the data needed and make the calculation idempotent.

Mutable global variables in the worker are scoped per player, not per character. They are neither a persistent store nor a universal character lock. Constants and pure functions can stay global.

Source verified on 2026-11-03: [Sheet Worker Scripts](https://help.roll20.net/hc/en-us/articles/360037773513-Sheet-Worker-Scripts).

## Organizing calculations

Read a calculation's inputs together, compute from the bases, then group the writes. Do not impose "a single getAttrs for the whole sheet": discovering IDs or an indirect dependency may require a preliminary step.

```js
const recalcDefense = () => {
  getAttrs(["agility", "armor_bonus", "defense"], values => {
    const number = value => Number.isFinite(Number(value)) ? Number(value) : 0;
    const next = 10 + number(values.agility) + number(values.armor_bonus);
    if (String(values.defense) !== String(next)) {
      setAttrs({ defense: next }, { silent: true });
    }
  });
};
on("sheet:opened change:agility change:armor_bonus", recalcDefense);
```

This example does not trigger a downstream calculation on `change:defense`. If a gauge or macro depends on it, include it in the orchestration or explicitly choose event propagation.

Two valid strategies: A→B→C propagation by events, or explicit orchestration of B and C from the inputs. Document the local choice. A `silent` added in isolation can break a dependency. A systematic `sourceType !== "sheetworker"` filter can do the same.

## Opening and concurrency

- A recalculation does not double a bonus; start again from the source data.
- `sheet:opened` rebuilds the display and fills in what is missing, without systematically healing or recreating rows.
- Wait for the necessary writes or groups of calculations before publishing a total. An arbitrary delay does not guarantee they have finished.
- Test two rapid clicks and several characters. A chain of callbacks is not a transaction between several players.
- Reduce timers, caches and callbacks detached from the native context. Community setups use `getActiveCharacterId` and internal messages; this skill does not provide them as a guaranteed public API. Examine the framework/version and run a multi-character test before depending on them.

## Diagnostics and performance

Temporarily trace domain, event, RowID, inputs and outputs. A `try/catch` around the asynchronous call does not automatically catch errors from its callback. Remove noisy logs after diagnosis.

Measure calls and writes before optimizing. Reduce overly broad subscriptions, unnecessary cascades and writes of identical values. Compute only the dependents of a modified input; prefer a validation action to a large parser rerun on every keystroke when usage allows.

## Targeted checks

- Same input, same result after two recalculations.
- Immediate update of consumers, including after a silent write.
- Opening an old character without losing a pool or a choice.
- Deletion and empty collection if the calculation depends on repeating sections.
- No cache or cost leaking between characters; no untested multi-client safety promise.
