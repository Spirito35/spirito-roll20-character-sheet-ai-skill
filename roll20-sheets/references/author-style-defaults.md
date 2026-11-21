# Author style defaults

Read when creating or restyling a sheet and the user has given no style direction of their own: field sizes, buttons, layout density, where settings live, first-open experience.

These are the skill author's (Spirito's) house preferences, collected from real feedback while building the Daggerheart sheet, 2026-11-11 to 2026-11-20. They are design preferences and house conventions, not Roll20 platform rules. Use them as defaults. The user's own conventions, the game's official sheet and explicit project instructions override them; when a game's rules force an exception, say so. Platform behaviors and workarounds discovered on the same project are in [roll20-pitfalls.md](roll20-pitfalls.md).

## Inputs and numbers

- Hide the browser spin arrows on every `input[type="number"]` (`-webkit-appearance: none` on `::-webkit-inner-spin-button` and `::-webkit-outer-spin-button`, `-moz-appearance: textfield`). They look wrong on a sheet and push the number off center.
- Numbers are centered. The default width of a normal numeric input is **35px** (works for current/max pairs). Go smaller only for discreet values, larger only when there is room.
- A standard input, select or text field is **at most 18px tall**. It keeps item sizes consistent. Only a few special fields (big trait values, the class name) are taller.
- Read-only computed values use `readonly` inputs, never editable-looking fields.
- Remove fields that the sheet does not really need (for example a free text "homebrew" field when an "Other" choice already exists). Do not add a field the author does not need: a "player name" field for private rolls was removed; use the data the sheet already has (`character_name`) and say plainly that this is unverified.

## Buttons and rolls

- A roll button is never shown as a plain "Roll" button. The **label of the thing being rolled is the button** (`type="action"` or `type="roll"`), styled like the title, with a hover effect on the title (background and gold underline).
- Roll buttons are **squares**: 18x18px for icon buttons (the icon glyph is about 14px inside).
- Attack and damage buttons are compact **icon buttons** (Google Material Symbols: `swords` for attack, `explosion` for damage), placed **first on the line, before the Name**. Load only the needed icons with `icon_names=` in the Google Fonts URL.
- One click on **Attack** should roll the attack **and compute the damage, including the critical**, in the same chat message. A separate damage button exists only to roll the damage alone. Do not make the player press several buttons for one action.
- Roll mode (advantage / standard / disadvantage) is a set of **stylized radios** with the short labels ADV / STD / DIS, on the right of the tab bar, writing the same attribute as the old select would have.
- Roll visibility (PC / PV / GM) is one prefix attribute (`whisper_prefix`) synced by a worker and injected in front of every roll button `value` by the build script (`@{whisper_prefix}&{template:...}`). `/w gm` is common practice; `/w "Name"` needs a real player name, which was not verified. Cards for the GM start with `/w gm` in the `startRoll` command.

## Layout and information density

- A sheet must be **efficient before it is pretty**: condensed, readable at a glance, close to the paper sheet when the game has one.
- Do not repeat rules the sheet already applies (if the level is added to a threshold automatically, no reminder sentence).
- Abbreviate in selects and tables to save room: trait names as three letters (AGI, STR, FIN, INS, PRE, KNO), types in capitals (PHY, MAG), burden as 1H / 2H. Keep full names in `title` tooltips.
- **No parentheses in list labels** (select options). Write "Dread", not "Dread (Hope & Fear)". Do not write "Prof d" style explanations the players already know.
- Check that select text and labels are **not cropped at the bottom** (set an explicit height and line-height) and that two labels never overlap (for example Level and Tier).
- Select text in dense rows (AGI, MELEE, 1H, PHY) must be fully visible: set font-size 10px, small left padding, and test the widest option (V.CLOSE).
- No decorative ovals or shapes without a function. If a shape has no clear purpose, remove it or make it clearly a circle or square.
- Tinted background colors per block are welcome to show where blocks are.
- A gradient that stands for two choices (two domains, two colors) must be 50 / 50, not weighted toward one side, and must blend softly over a wide middle zone (for example stops at 22% and 78%), not switch abruptly at the center.
- **No explanatory sentences on the sheet**, or very few. Rules text belongs in the brief or a tooltip, not in a visible hint (for example do not write "Active weapons are chosen in Inventory Weapons below").

## Resources and gauges

- Prefer a **dynamic bar from 0 to 100 %** (an `input type="range"` styled as a bar, fed by a percentage attribute that the worker computes) over showing, hiding or graying many small elements. Show/hide and gray-out states are fragile in Roll20.
- Keep a number input for the current value and a read-only one for the maximum next to the bar.
- Small fixed counters the paper sheet draws as shapes (for example six diamonds) may stay as checkboxes, without locked states.
- Diamond rows that mimic the paper sheet fill contiguously: checking the 5th checks the first 4, unchecking the 1st clears all after it (Daggerheart Hope: 2 at the start, 6 at most, Scars lowering the maximum).
- A custom mechanic with a built-in decision (the Whisper Tokens: Resist or Accept at the last tier) is a **button pair that sends a private card**, never an automatic spend.

## Equipment

- "Active" equipment fields on the main page are **read-only**. The player edits them in an **inventory section** (repeating, one condensed row per item) and picks the slot (PRI / SEC). A worker copies the chosen row into the active fields, keeps one item per slot, and clears the slot when the row is removed.

## Grids, lines and repeating controls

- Complex lines (weapons, inventory) use a **CSS grid** with explicit columns, for example `18px 18px 1fr 35px 52px 35px 35px 35px 35px 35px`: two 18px icon buttons, a flexible name, then 35px cells. Remove stray margins and padding so each cell gets its full width. Selects in such rows use `appearance: none`, centered text, 10px font.
- Weapon lines in two rows when needed: row one name, trait, range, burden; row two die, mod, type, attack, feature; each row with its own grid and its own tiny label row. Fields that take long text (weapon names such as "Great Highsword of Caleb") get the wide column of their row. Short fields (trait, range, die, mod, attack) go on a second row with the feature.
- Field labels sit **above** the field as tiny 8px captions (a single header row for repeating rows), the field itself is 18px tall.
- Repeating section controls (`.repcontrol` Add and Modify buttons) are never transparent: give them the section background color, 18x18px, `margin: 0`, and show only a Material icon (`add` and `edit`) through `::before`, with the text hidden (`font-size: 0`). Repeating items use `padding: 0 0 5px 0` and no border line between rows.
- A header made of a roll label and a marker is a two-cell grid (`1fr 19px`): label button left, the marker checkbox in its own cell right.
- Use the game's own images (domain banners and so on) as decorative elements chosen with radios and sibling selectors, with a fallback color. They are small, inline, placed before the selector they illustrate, not large faded backgrounds.

## Spacing and structure

- Section titles (`h3.sheet-title`) use `margin: 0 0 5px 0; padding: 0 0 0 10px`: only a small gap below, a small left inset, no wasted vertical space.
- The sheet root has no side padding: `padding: 34px 0 0 0` (34px keeps the tab bar). Pages and panels carry their own small side margin (8px).
- Header band: the colored gradient frame holds only the **class** (with the domain icons in front, larger), the **character name** and the **level**. Everything else (domain selects, pronouns, tier, heritage, subclass, gold) goes in the neutral area beside it, as ordinary white inputs.
- When the client confirms an expansion is always used, remove the toggle and the hiding CSS instead of keeping an option.

## First-open experience and progressive disclosure

- Design the **first minute of a new character**: open on the tab where the character is built (here Class, not Main), and open the setup panels in **configuration mode** by default (put `checked` on the `cfg-toggle` checkbox: the HTML default is the attribute default). Warn that this also applies to existing characters whose toggle was never touched.
- **Hide fields that must not be filled yet** until the choice that fills them is made. Pattern: a hidden flag checkbox as the first child of the panel, synced by a worker (`class_chosen` from `class_name`, run on `sheet:opened` and `change:`), and CSS `.flag:not(:checked) ~ .block { display: none; }`. Hidden are: the domain pickers and the HP / Evasion / Spellcast base row until a class is chosen. Do not rely on `:empty` or on text values.
- Options that only exist at a given level (here Multiclass, level 5) are not shown in the creation panel when the same switch already exists on the Config page. One switch, one place.
- Long descriptions (loadout cards, subclass cards) are **hidden by default** with an eye toggle (`visibility` / `visibility_off`, hidden checkbox plus sibling selector). Keep a bottom padding on the line that becomes last.

## Where settings live

- The author **rejected per-row configuration inside a play panel** (modifiers appearing in place of the bars in Damage & Health). All modifiers live in **one "Mods" block on the Config page**, as a grid with balanced rows: same number of items on each line, and the six traits grouped on one line. Use full words as labels (Evasion, Thresholds, Knowledge) once there is room; the unit "MOD" is implied.
- A group of panels that behaves as one (Foundation, Specialization, Mastery, Foundation Multi) gets **one** collapse chevron and **one** eye, placed next to the existing config cog on the row, not one per card. Skip the automatic per-panel chevron with a marker class (`sheet-nocol`) in the build script, and hide the siblings of the row-level checkbox with `~ .panel > *:not(h3)`.
- A color or theme choice is a **single colored dot** next to the cog that opens a small popup; the popup closes as soon as a color is picked (reset the flag in a worker on `change:theme`). Several attempts with swatch rectangles and panels were refused as not pretty.

## Chat card details

- The meta line of a card (LV / REC / TYPE, DC) is a `subtitle` property, left-aligned in the card template (`text-align: left`).
- A card with several difficulties puts the DC in the title of each spell (`Title (DC 15): ...`) and not in the meta line; a single-DC card shows it in the meta. Rewrite "Make a Spellcast Roll (N)" as "On a success on your Spellcast Roll" in the card text.

## Fonts and style source

- Load each Google font with its own `@import` line and keep the Material Symbols import separate. Prefer the font the official character sheet uses (here Overpass) for body text, and check the roll-template fonts too.
- When the game has a book, reuse its **fonts, title styles, paragraph styles and colors**. If the fonts are commercial, pick the closest free Google Fonts and say which. Measure colors on the pages and map them to content types (character, equipment, magic, GM, adversaries).
- Build the CSS on variables and clear rules so it can be declined into several color options.

## Credits

- Always state, in the footer and in the credits, who made the sheet and who commissioned it (for example "created by Spirito, commissioned by <client>"), together with the license credit the game requires.
