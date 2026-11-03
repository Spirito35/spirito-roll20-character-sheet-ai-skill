# Diagnosis by symptom

Read when the responsible layer is not yet identified. Pick a row, then open its reference, without auditing the whole sheet.

Start with the files actually loaded, their mode, the expected scenario and the first console error. Compare a new character with the failing one. Reduce to one field, one row or one button; note the before/after values and the command produced.

| Symptom | First check | Reference |
| --- | --- | --- |
| No style / empty sheet | Loaded pair, structure, mode and console | [environment](environment.md), [HTML](html.md) |
| All calculations stopped | First JS error, duplicated blocks and names | [workers](workers.md) |
| Input lost on closing | `name="attr_..."`, value actually saved | [data](data.md) |
| Two inputs unintentionally linked | Same-named attribute | [data](data.md) |
| Only an old character affected | Saved value, init/migration | [migrations](migrations-import.md) |
| Zero replaced / `NaN` / concatenation | Conversions, truthy fallback | [data](data.md) |
| Calculation correct only after reopening | Missing event or chain cut by silent | [workers](workers.md) |
| Stale total after deletion | Remove listener, empty-collection branch | [repeating](repeating.md) |
| Wrong row after a move | RowID, position taken as identity | [repeating](repeating.md) |
| Chat list in the wrong order | Manual order ignored | [repeating](repeating.md) |
| Bonus displayed but old roll | Derived macro not regenerated | [rolls](rolls-macros.md) |
| Dead button | Overlay, type, name, listener, console | [interface](interface.md), [HTML](html.md) |
| Unexpected dice / roll error | Exact command, empty/hidden fragments | [rolls](rolls-macros.md) |
| Inconsistent critical with advantage | Kept result differs between branches | [templates](roll-templates.md) |
| Missing CRP result | finishRoll, property name, computed | [rolls](rolls-macros.md) |
| Private mode shows publicly | Prefix actually sent, another reader | [rolls](rolls-macros.md) |
| Inconsistent cost on double click | Concurrent reads, moment of deduction | [resources](resources.md) |
| Rest or opening erases an input | Recalculation overwriting the manual value | [resources](resources.md), [migrations](migrations-import.md) |
| Tab broken after adding a wrapper | CSS parentage/adjacency, navigation attribute | [interface](interface.md) |
| Incorrect gauge | Existing class, value/max, dimensions | [interface](interface.md) |
| Overflow / broken popout | Intrinsic minimum, selector ancestors | [CSS](css-assets.md) |
| Icon displayed as plain text | Font loading and ligatures | [CSS](css-assets.md) |
| Different chat theme | Variables and classes of the chat context | [templates](roll-templates.md) |
| Translation key displayed | JSON loaded, exact key, dynamic key | [i18n](i18n-accessibility.md) |
| Unreadable accents in the terminal | Decode UTF-8 before concluding corruption | [validation](validation.md) |

Do not automatically attribute a rejected CSS to comments or Unicode. Check syntax, mode and the difference from the working version. Do not turn a hypothesis from this table into a certain diagnosis without a reproduction or code evidence.
