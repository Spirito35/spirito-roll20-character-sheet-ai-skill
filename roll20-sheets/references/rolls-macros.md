# Rolls, macros and Custom Roll Parsing

Read for a roll button, a generated command, a query, an audience or a roll-related cost.

## Separating the languages

| Syntax | Interpretation |
| --- | --- |
| `@{strength}` | Attribute of the macro context |
| `@{selected\|strength}` / `@{target\|strength}` | Attribute via selected token / target |
| `%{Character\|attack}` | Named button/ability |
| `?{Bonus\|0}` | Question at roll time |
| `[[1d20+3]]` | Dice engine expression |
| `&{template:demo}` | Template choice |
| `{{result=...}}` | Template property |
| `^{key}` | Sheet macro translation |
| `${variable}` | JS string interpolation in backticks only |

A worker can build a formula without evaluating it. If the command is saved in a derived attribute, regenerate it on all its dependencies. An up-to-date total display does not prove that the button uses the same value.

## Choosing the button

`type="roll"`, `name="roll_test"`: native command, roll or chat text. `type="action"`, `name="act_test"`: `clicked:test` handler, suited to validating a cost and to CRP. An action button is not needed to publish a simple description.

A `!command` call assumes a Mod/API script installed in the campaign. It does not create a native worker API.

## Dice

| Pattern | Use |
| --- | --- |
| `2d20kh1` / `2d20kl1` | Keep highest / lowest |
| `{expression1,expression2}kh1` | Compare compatible grouped expressions |
| `Nd10!` | Explosion |
| `Nd10s` | Sort |
| `Nd10>5` | Count at inclusive threshold |
| `1d20cs>19cf1` | Critical/fumble markers |
| `NdF` | Fudge dice |
| `[[0]]` | Numeric value without rolling a die |

Do not confuse a critical marker with an automatic mechanical effect. For rerolls, successes/failures, groupings, rounding or modifier order, open the [Dice Reference](https://help.roll20.net/hc/en-us/articles/360037773133-Dice-Reference), verified on 2026-11-03. The absence of a syntax from a local corpus does not refute its documentation.

A maximum computed by replacing `NdS` with `N*S` does not cover `kh`, explosions and rerolls. Define the accepted subset or a separate maximum calculation.

## Optional dice

Hiding a property at render time does not prevent the roll already present in the command. Omit the disabled fragments; avoid `[[ ]]`. Handle an empty pool explicitly. If several displays represent the same draw, reuse that result rather than rolling again.

## CRP cycle

```js
on("clicked:measure", () => {
  startRoll("&{template:measure} {{roll=[[1d20]]}}", result => {
    const total = result.results.roll.result;
    finishRoll(result.rollId, { roll: total - 10 });
  });
});
```

The `measure` template must display `{{roll}}` for the original and `{{computed::roll}}` for the computed result. `finishRoll` receives the identifier returned by `startRoll`. Keep the processing short and finalize every path; the documentation describes an automatic publication after about five seconds without finalization.

The example uses the documented callback. If the project already uses a Promise form, check the contract of its version or wrapper; do not add `await` to a call with a callback assuming it waits for that callback.

Source verified on 2026-11-03: [Custom Roll Parsing](https://help.roll20.net/hc/en-us/articles/4403865972503-Custom-Roll-Parsing-for-Character-Sheets).

## Audience, initiative and tracking

Centralize the audience prefix. `/me` is a public emote. `/w gm` and `/gmroll` serve different command uses; check the text actually produced and the recipient with another account. Do not replace one secret/private mode with another without reading its current contract.

`&{tracker}` depends on the token context; test selection, linking and an entry already present. Arbitrarily manipulating the campaign order belongs to a separate integration.

A chat action link created via CRP must resolve the complete row reference. Test a deleted row, a repeated click, a namesake character and a click from another player. `originalRollId` identifies the original roll, not the row. A later click may read current values rather than those at the time of the attack.

Sources verified on 2026-11-03: [Text Chat](https://help.roll20.net/hc/en-us/articles/360039675093-Text-Chat), [Macros & Token Actions](https://help.roll20.net/hc/en-us/articles/360037256794-Macros-Token-Actions).

## Escaping

Identify each layer: HTML, JS string, macro, query, template property, link. There is no universal sanitizing. Test apostrophe, accent, vertical bar, braces and line break. Encode only the necessary level of a nested query; replacing all the separators breaks attribute references. Reduce to a simple query first, then add the levels.

## Targeted checks

- Real command up to date; empty, zero and invalid formula handled.
- CRP finalized; computed result tied to the right property name.
- No optional die rolled unintentionally.
- Audience verified, cost and double click tested if relevant.
- Complete repeating link and initiative on the right token.
