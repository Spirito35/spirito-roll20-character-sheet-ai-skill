# Roll20 pitfalls found on a real sheet

Read when a control, a chat card or a stylesheet behaves strangely in Roll20, or before scripting edits on delivered CSS/HTML.

Provenance: first lessons recorded by the skill author while building the Daggerheart sheet, 2026-11-10 to 2026-11-20, tested in Roll20. They are observations from one project, not official Roll20 contracts. Each item keeps its evidence level; where a technique "was never confirmed inside Roll20", treat it as a hypothesis to test. Design preferences from the same project are in [author-style-defaults.md](author-style-defaults.md).

## Roll20 default styles to neutralize

- Roll20 adds a dice-font `::before` (content such as "t", font dicefontd20) and margins to `button[type="roll"]` and `button[type="action"]`. Always reset them (`content: none`, `margin: 0`, `padding: 0`) with high specificity, and give roll and action icon buttons the same background so they look identical.
- Roll20 draws a heavy black outline on focused inputs. Remove it and show focus with a slightly darker background instead.
- Default margins (for example a bottom margin on inputs and labels) can survive normal rules. Reset them with higher specificity, or `!important` for the margin only. Never add a bottom margin to a compact sheet.
- Roll20 adds `margin-bottom: 10px` to `.characterviewer label` and `padding-right: 10px` to `.dialog label`. Reset both on every sheet label: `.charsheet .sheet-root label { margin-bottom: 0 !important; padding-right: 0 !important; }`. Spacing comes from grid `column-gap` (for example 5px), never from label margins or padding.
- That padding also breaks centering: a centered label above a 35px input looks shifted until the right padding is removed.
- Inputs under a label may be 1px taller than intended: check the generic input rules, not only the special cases.
- Radios and checkboxes with `appearance: none` turn into squashed ovals unless width, height, min and max sizes, padding and border are all set, and they do not show a state by themselves. Draw the state yourself: Material icons (`circle`, `check`) through `::after`, or a `clip-path` polygon for a diamond (the Material `diamond` icon is a gem, not a lozenge).
- Marker cells (a dot or ring inside a header) must be centered in their cell: size the pseudo-element with `box-sizing: border-box` and equal margins, because `*` does not reach pseudo-elements.
- Hover effects on buttons: keep them to one property (a tint) and set it with `!important` if Roll20's own button hover wins.

## Controls that broke or needed another structure

Daggerheart, 2026-11-16.

- Native `input[type="radio"]` with `appearance: none` inside a flex or grid bar collapse to slivers, even with `flex: 1`. Use `label > input[type="radio"] + span`, hide the radio with `display: none` and style `input:checked + span`. The attribute still saves normally.
- A native `select` ignores `line-height`, so its text sits low. Use `appearance: none; display: block; padding: 0; text-align: center; text-align-last: center` and a `line-height` equal to height minus borders.
- Toggles that must keep their state without JS: a hidden checkbox plus `:checked + span` or `:checked ~ ...`; several inputs sharing one `attr_` name stay in sync (used for trainings and bar fills, never confirmed inside Roll20).
- Animated gauges: drive a `--m`/`--x` custom-property pair from hidden radios and let `width: calc(var(--m)/var(--x)*100%)` transition; a native range thumb cannot be animated.
- Absolute-position small markers (a "+" next to a value, a pill in a header) instead of putting them in the grid, so they never push the block below.

## Tabs and radios that do not click

- A decorative checkbox (such as a trait mark) is a real `appearance: none` square with an explicit size, border and a clearly visible checked state (fill plus inner ring), centered in its row. Never a squashed oval.
- If overlay tricks (hidden radio plus a label span, `opacity: 0`) fail to click in Roll20, make the **radio itself visible**: `appearance: none`, size, background, and its text in `::after { content: "Main" }`. No second element.
- Tabs and the roll mode radios sit in the same top bar at **fixed left offsets that cannot overlap**, whatever the sheet width. Do not anchor one group with `right` and the other with `left`. Give the roll mode radios a higher z-index than the tabs.
- The clickable area of a tab must fill the whole visible tab. Use `appearance: none`, explicit width and height, zero margin and padding, and `pointer-events: none` on the visible label.

## Roll template styles silently ignored in chat

Daggerheart, 2026-11-17.

- Symptom: the roll template HTML renders in chat (right classes, right fields) but none of the `.sheet-rolltemplate-X` rules apply, while the sheet itself is styled normally. Nothing is reported anywhere.
- Cause found: CSS escape sequences with leading zeros in a `content` string, such as `content: "\00a0\00a0/"` or `"\00b7"`. `\00` reads like a NUL and Roll20's chat-side CSS handling drops the template rules, without breaking the rest of the sheet CSS. Never write a backslash escape in delivered CSS: use plain characters, `margin`/`padding` for spacing, or `content: none`. Check with `grep -c '\' sheet.css` (expected 0).
- How it was found (reuse this method): the browser tolerates the file, so reading the CSS is not enough. Put a tiny "MIN" roll template (plain HTML, plain colors) in the sheet with a button that posts it, then bisect the CSS file: minimal file, first half, second half, then prefixes (25 %, 50 %, 75 %, 82 %, 88 %...) that always keep the `@import` lines and the MIN rules on top. The first prefix that fails brackets the culprit to a few dozen rules; read that segment for unusual syntax. Cut only at top-level rule boundaries so each test file stays valid.
- Ruled out in that investigation (these are fine): file size (a 156 KB sheet works), `calc()`, CSS custom properties, `!important`, `@import` fonts, `color-mix()`, `radial-gradient`/`repeating-linear-gradient`, `::-moz-range-*`. Compare with sibling sheets that work before suspecting a feature: list the properties, functions and pseudo-classes present only in the failing file.
- Keep a temporary test bar (clearly commented as temporary) with one button per template while working on roll templates, and remove it once chat rendering is confirmed.

## Roll template design rules

- The chat is outside `.charsheet`: variables defined on the sheet root do not exist there. Define colors (or custom properties) on `.sheet-rolltemplate-X` itself, or hard-code them, and load only fonts that are imported in the CSS.
- Selector syntax is `.sheet-rolltemplate-X .sheet-class`, where X is the name in `<rolltemplate class="sheet-rolltemplate-X">`. Roll20 wraps the template in `<div class="sheet-rolltemplate-X sheet-rolltemplate-darkmode">` in chat.
- Prefer a single template with conditional blocks and flags (`{{#theme_atk}} sheet-t-atk{{/theme_atk}}` inside the class) as in the working Solar Rail and Daughters of Lam sheets. Do not put a plain field (`{{kind}}`) in an attribute: that attempt coincided with the template failures and was never proven to work.
- A card used for a different kind of roll (trait, attack, spellcast) can get its own template so each has its own color without conditional classes; the worker picks the template name.
- Keep roll template syntax simple: a few `{{#field}}` blocks, one level of helpers. Test the card with plain static fields first, then add helpers (`rollGreater`, `rollTotal`, `computed::`).
- Put the `<rolltemplate>` blocks at the top of the HTML, before the root `<div>`, and keep the root `<div>` balanced (count `<div` and `</div>` before the first rolltemplate: an unclosed root put the templates inside the sheet).
- A small context line above the total (kind, range, burden, type) is one `{{info=...}}` property built in the worker, for example `Attack - V.CLOSE - 1H - PHY`. Write a bullet separator with the JS Unicode escape for U+2022 (backslash, u, 2022), never a raw bullet character in the worker.

## Buttons inside a roll template

Daggerheart, 2026-11-17, confirmed working in Roll20.

- Goal: a clickable button in the chat card (for example "show the weapon feature description", or roll the damage from the card). It is a **chat action link**, not an HTML button: `[Label](~action_name)` passed as the value of a template property, for example `{{feature=[Reliable](~feature_primary)}}`, displayed in the template with `{{#feature}}<div class="sheet-dh-feat">{{feature}}</div>{{/feature}}`. Roll20 renders it as an `<a>` inside the card.
- **The target is a hidden sheet button.** Add a normal `<button type="roll" name="roll_feature_primary" value="&{template:...} {{...=@{attr}}}">` inside a container with `display: none` (not in the visible UI). The link then uses the name **without the `roll_` prefix**: `~feature_primary`. A hidden button is still registered by Roll20. Its `value` is resolved at click time, so it always reads the current attributes.
- **Do not put a character name or id in the link.** Omit it: `~action_name`, not `~@{character_id}|action_name` and not `~Name|action_name`. The character comes from the context of the message. A name breaks as soon as it contains a parenthesis, for example "Glucow Jigle (DH)": the link ends at the first `)` and Roll20 answers "No character was found for 'Glucow Jigle (DH'". The id form `~@{character_id}|...` was tried first and also failed. This is the technique used by the LevelUp: Advanced 5th Edition sheet in the Roll20 community repository (`[DMG](~ID__show-damages)`, with hidden `roll_show-damages` buttons in the same repeating row, and the link strings stored in hidden attributes by a worker that runs on `sheet:opened` and `change:repeating_x`).
- Repeating rows: the hidden buttons live inside the fieldset row, and the link carries the row id (`~${id}__action-name`, row id first, then two underscores). A non-repeating sheet only needs the plain action name.
- The link text is built in the worker (or in an attribute) and passed as a property, so clean the label first: remove `[ ] ( ) { } | ~ @` from user text, otherwise the link or the command breaks. Only add the property when there is something to show (here: the weapon has a feature with text), so the card has no dead button.
- Style the link with `.sheet-rolltemplate-X .sheet-class a, a:link, a:visited` (display block, own background and border, `text-decoration: none`) and `a:hover`. Roll20's default chat button style wins otherwise.
- Do not put a sheet button in a row grid just to expose such an action (the author refused this): the card is the right place, the sheet UI stays unchanged.
- Source consulted: Roll20 help "Custom Roll Parsing for Character Sheets" (could not be read, HTTP 403; the search summary says the character id can be omitted when the roll comes from the sheet). See also [rolls-macros.md](rolls-macros.md) on chat action links and rows.

## Damage in a roll template

Daggerheart, 2026-11-17.

- A value shown through `{{computed::x}}` is a plain number: **no hover tooltip with the formula**. If the player must hover the value to see the calculation, show a **native inline roll** (`{{dmg=[[2d8[Dice]+3[Weapon]]]}}`) in that place. Tags such as `[Dice]`, `[Weapon]`, `[Critical]` appear in the tooltip.
- When the result depends on a comparison only known after the roll (critical when Hope equals Fear), send **both** native rolls (`dmgn` normal, `dmgc` with the critical bonus) and let the existing helpers choose which to display (`rollGreater()`, `rollLess()`, `rollTotal()` on `computed::hopev computed::fearv`). The unused roll is never displayed. This avoided `$[[n]]` references, which were never tried.

## Scripted edits: do not break the files

Daggerheart, 2026-11-17 and 2026-11-19/20.

- A script that "duplicates the lines of a rule for another template" copied the selector line `sel {` without its body and closing brace: 4 orphan `{`, and **all the sheet CSS stopped working**, not only the template. Add a selector **to the existing list** (`.sheet-rolltemplate-new .x,` placed before the existing `.sheet-rolltemplate-old .x {`) instead of copying rules, and write new rules whole.
- Always check the brace balance after a scripted CSS edit: count `{` and `}` (they must be equal) and that no rule is nested. `check_sheet.py` does not do it.
- Files with mixed CRLF and LF: read with `newline=''`, normalize `\r\n` to `\n` for matching, and write back with the original ending. A string match that "obviously exists" can fail because of `\r`.
- A Python replacement string written with a backslash group (`'\1'`) inside a shell heredoc became the control character 0x01 in the HTML. Use a lambda for the replacement, then check the file for control characters (`s.count('\x01')`) and re-read the edited lines with `od -c`.
- `sed -i` on a line number silently did nothing on a file with mixed line endings; verify with a `grep` after each scripted edit and prefer the Edit tool.
- After a scripted change to a generated sheet, rebuild, run the checker and `node --check`, and read back one generated line.
- Back up before each step (`backup/<date>-<topic>/`): the revert to the last working state is what located the regression.

## Method rules

- Before any risky refactor of CSS or roll templates, copy the five delivered/source files into `backup/<date>-<topic>/`. A full revert to the last working state is the quickest way to tell whether a regression comes from the last change.
- Say plainly when nothing was tested in Roll20, and when a fix is a hypothesis. In the template failure above, the first guesses (field in a class, unclosed root div, template placement) did not explain it; only the bisection did.
- Game rules must come from the project docs, not from habit: in Daggerheart, advantage adds a d6 to the total (disadvantage subtracts one); it is not a D&D-style double roll.
- Check what a counter means before "fixing" it. In Daggerheart, Hit Points are **marked boxes** (damage): 0 of 6 is full health, so "current equals maximum" would mean dead. Explain instead of changing, and offer a clearer label.
- When the client leaves a rule undefined (a named event, a missing feature), keep the book text and show it as written, with no automation. Ask only once, in one short list, and record the answered items in the checklist.
