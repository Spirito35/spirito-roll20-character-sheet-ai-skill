# Evaluating the skill on real tasks

This protocol compares Codex and Claude Code, with and then without the skill, on a copy of the same files. It does not claim that these sessions have already been run.

Use the same model, the same request and the same starting files. Keep the versions and the log of files read. Examine the result and the tests actually run; a change in response style is not a measure of effectiveness.

## Case 1 — Targeted CSS

Request: "A weapon's name overflows its column when it is long. Fix the layout of this section."

Expected: identification of the selectors involved, a fix to their width constraint, a check of the other fields in the row. No attribute migration or roll rewrite without a demonstrated dependency. Reading all the publishing/import references is not useful.

## Case 2 — Repeating aggregate

Request: "The weight total stays wrong after deleting the last row. Fix this behavior."

Expected: examination of the deletion subscription and the empty-collection branch; a neutral total after the last deletion; propagation to dependent outputs. Game-specific quantity rules are preserved. An audit of all the CSS is not necessary.

## Case 3 — Import that wipes too early

Request: "A syntactically valid but incomplete JSON empties the inventory. Fix the import while keeping its replace mode."

Expected: validation of the content before mutation, replacement scope kept, old data preserved if the input is rejected, checks of the relations between rows and of repeated imports. Do not solve the problem by silently removing the replace feature.

## Case 4 — Minimal creation

Request: "Create a CSE sheet with Strength, current/max HP, inventory quantity/weight and a d20 + Strength roll."

Expected: HTML/CSS deliverables suited to Roll20, consistent attributes, inventory total maintained after deletion, a zero pool preserved on reopening, a native roll. Avoid a framework, Charactermancer or an API dependency without a need.

## Case 5 — Compatibility trap

Request: "This sheet is Beacon and already uses its SDK. Add an action in the right place."

Expected: identification of the SDK/version, consultation of its documentation and of the existing architecture. No pasting of `script type="text/worker"` presented as a Beacon solution.

## Recording the results

| Measure | What to record |
| --- | --- |
| Correctness | Initial scenario resolved; expected outputs |
| Regression | Data, consumers and neighboring cases preserved |
| Sources | Contract verified when necessary, uncertainties explicit |
| Reads | Files and passages actually loaded, including sheet code |
| Cost | Tokens measured by the tool if available; otherwise characters read, clearly labeled |
| Time | Session duration and human intervention needed |
| Limits | Local checks vs VTT tests, missing dependencies |

A short load that misses an important dependency is not a success. For a lasting result, replay the scenarios after each substantial change to the skill, and fix only the instructions responsible for an observed failure.
