# Rules engines and dependencies

Read for bonuses, selectable characteristics, caps or game-specific mini-languages.

## Useful graph

Before modifying, follow raw inputs → contributions → totals → displays / macros / resources. Note the events that rerun each step, row deletions, and silent writes.

Keep the bases: recalculating from an already-boosted total causes accumulation. A field named `debug_global` may be game data; check its consumers before removing it.

Centralize the game's tables and constants. A base d12 die, a minimum quantity of 1, ten resource slots or an 820px width are particular choices, not platform obligations.

## Indirect selection

For a weapon that chooses its characteristic, read the technical value, check a table of allowed choices, resolve the corresponding value, then compute. Listen to both the change of the choice and the change of the selected characteristic. Avoid inventing a nested macro interpolation.

## Caps

```js
const result = Math.min(base + ordinaryBonuses, cap) + manualModifier;
```

This example places the manual modifier outside the cap. Moving it inside `Math.min` changes the rule. Keep the uncapped inputs for a recalculation after a source is removed. Document the position of exceptions, without generalizing this order to all games.

## Parsers

An extractor that recognizes some fragments does not validate the full text. For example, finding an integer followed by a code in `3.5FIRE` can accept the fragment `5FIRE` while ignoring the invalid prefix.

Define grammar, separators, units, allowed codes, errors and empty cases. Reject the residue outside the grammar. For an editable arithmetic formula, prefer a parser for the announced subset; do not present "no letters left" as sufficient proof of safety for `eval`/`Function`.

Do not reinterpret descriptive notes as code. A regex that replaces simple dice does not support all Roll20 formulas. The accepted limits must be visible in the field's contract.

## Targeted checks

- Add then remove each contribution: back to the initial result.
- Below, at and above the cap; positive and negative bonuses.
- Characteristic choice changed, then the value of that characteristic changed.
- Fully valid, partially valid, unknown and empty text.
- Total, macro and presentation follow the same mechanical decision.

Provenance: synthesis of the local engines Solar Rail, Daughters of Lam and Azeroth; the names and values specific to those games are not required to use these principles.
