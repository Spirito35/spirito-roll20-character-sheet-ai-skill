# Resources, costs, rests and damage

Read for HP, pools, expenses and recovery. The mechanical choices below belong to the game, not to Roll20.

## Current and maximum

Define minimum, maximum, possible overflow, initialization and the effect of a change of maximum.

| Policy | 7/10 with new maximum 15 |
| --- | --- |
| Keep the current value | 7/15 |
| Keep the missing amount | 12/15 |
| Keep the proportion | 10.5/15, then rounding rule |
| Fill | 15/15 |

Also test a lowered maximum and a zero maximum. Do not turn a cap calculation into an unintended heal. A pool at zero is a valid value. The recovery rate can be independent of the maximum.

## Spending

Identify character and row, read pools/costs/conditions, validate, then execute according to the intended rule. Insufficient: an understandable response and no expense. Negative cost: reject it or treat it as a gain explicitly; a raw subtraction can create resources.

Define when to deduct: before the roll, after success or at confirmation. Do not consume on a simple settings change. Order the writes and the CRP finalization with the required callbacks.

Two rapid clicks can read the same value before the writes. A local guard reduces repetitions from one client but does not create a transaction between players. Do not promise atomicity with a global worker boolean. Test the scenarios actually possible.

## Rests

Explicit table: resource, rest type, recovery formula, cap, conditions removed. Stable values such as `short`/`long` ease internationalization; a long rest includes the effects of the short one only if the system provides for it.

Reset a temporary confirmation after use; distinguish the display of a confirmation from the execution of the operation. Reopening the sheet must not replay the last rest.

## Damage and custom resources

Separate damage that is computed, posted to chat, applied to oneself and applied to a target. A chat card does not write the pools. For a distinct target, read [integrations.md](integrations.md) and check the automation and permissions required.

Keep the useful steps: base, dodge, protection, resistance, absorption, pool. An intermediate display makes it possible to find an error in the order of operations.

A custom resource keeps its data in the source row. A compact bar must reference the RowID, not the position. Deletion, order and slot limit: [repeating.md](repeating.md).

## Targeted checks

- Empty, zero, insufficient and sufficient pool, overflow and zero maximum.
- Cap increase/decrease without unintended recovery.
- Rapid clicks, reopening and character switch.
- Rest of each type and manual exceptions preserved.
- Attribute actually modified, beyond the chat card alone.

Provenance: design rules drawn from the local sheets; asynchronous primitives in [workers.md](workers.md) and CRP in [rolls-macros.md](rolls-macros.md).
