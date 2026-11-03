# Roll20 Sheet Skills

Create or improve a Roll20 character sheet with help from **Codex or Claude Code**.

A *skill* is a folder of instructions that helps your AI assistant work with Roll20. You describe the sheet you want; the assistant helps write its files. You do not need to read the technical references or fill out a form first.

## 1. What you need

- **[Visual Studio Code](https://code.visualstudio.com/)** (VS Code), installed on your computer.
- **One AI assistant**, installed in VS Code and signed in. Choose either:

| Assistant | Setup and account |
| --- | --- |
| Codex by OpenAI | Follow the [VS Code setup](https://learn.chatgpt.com/docs/codex/ide). You need an account with access to Codex; availability and usage limits depend on your plan or API billing. Check [current access and pricing](https://learn.chatgpt.com/docs/pricing). |
| Claude Code by Anthropic | Follow the [VS Code setup](https://code.claude.com/docs/en/vs-code). Use an eligible paid Claude subscription, such as Pro, or a Claude Console account with usage billing. |

- **Optional: Roll20 Pro access** for the [Custom Sheet Sandbox](https://bloghub.roll20.net/posts/new-pro-feature-custom-sheet-sandbox/), where you can load and test your own sheet directly in Roll20. This is separate from your AI account. It is the best way to check your work, but not required: without it, the assistant can still create new sheets and edit the HTML/CSS code you give it, and you can test the files later.

The skill itself is free to use. You only need one assistant. The skill is a plain folder of Markdown instructions, so other AI coding assistants may be able to use it too, but it has only been prepared for Codex and Claude Code. Python 3.10+ is optional, for the included checking script; no package manager or terminal installation is needed for the skill.

*Account requirements checked on 3 November 2026; follow the linked setup pages for current details.*

## 2. Install the skill

**[Download the skill (ZIP)](https://github.com/Spirito35/roll20-sheet-skills/archive/refs/heads/main.zip)**

1. Extract the downloaded ZIP. You can also use **Code > Download ZIP** on GitHub, or, if a version is available under [Releases](https://github.com/Spirito35/roll20-sheet-skills/releases), its **Source code (zip)**.
2. Create a folder for your sheet, for example `my-roll20-sheet`. In VS Code, choose **File > Open Folder** and open it.
3. Inside that project, create the folders below and copy the **whole** downloaded `roll20-sheets` folder into the location for your assistant:

| Assistant | The installed entry file must be at |
| --- | --- |
| Codex | `my-roll20-sheet/.agents/skills/roll20-sheets/SKILL.md` |
| Claude Code | `my-roll20-sheet/.claude/skills/roll20-sheets/SKILL.md` |

Keep `references/` and `scripts/` alongside `SKILL.md`. Copy the downloaded `LICENSE` into the installed `roll20-sheets` folder too. Folder names beginning with a dot are intentional.

Open a new assistant session in this project. If the skill is missing, check the path above and restart the extension. Official installation details: [Codex skills](https://learn.chatgpt.com/docs/build-skills), [Claude Code skills](https://code.claude.com/docs/en/skills).

## 3. Describe your sheet

**With a rulebook:** put your PDF or text files in `docs/rulebooks/` inside the project. Tell the assistant which book and edition to use. Keep books you cannot redistribute out of GitHub; ask the assistant to exclude that folder before publishing.

**Without a rulebook:** list the features you want, such as attributes, skill rolls, health and inventory. The assistant will ask about missing rules.

In the assistant's chat, start with `Use $roll20-sheets` for Codex or `/roll20-sheets` for Claude Code, then add this request:

```text
Help me create a Roll20 character sheet.
Check docs/rulebooks/ for a rulebook; if there is none, ask me
which features and rules I want.
Create and fill in docs/sheet-brief.md yourself from our discussion
and the relevant rules. Start with a small first version.
Ask about missing decisions instead of inventing game rules.
Explain the next steps in simple language.
```

`docs/sheet-brief.md` is your project's short plan. The assistant maintains it; you can correct it anytime. You can speak your own language even though the skill is written in English.

For an existing sheet, place its files in the project and describe the change you want. Keep a backup before substantial edits.

## 4. See the result in Roll20

This step needs Roll20 Pro. Without it, you can keep working on the HTML/CSS files with your assistant and test them later.

Ask the assistant which HTML and CSS files to load into your [Sheet Sandbox](https://app.roll20.net/sheetsandbox). Open a character there to check the appearance, buttons and calculations.

We recommend the optional **[Roll20 Autouploader](https://wiki.roll20.net/Roll20_Autouploader)**: it sends your local files to the sandbox when you save, making visual checks faster. [Install the extension](https://chromewebstore.google.com/detail/roll20-api-and-sheet-auto/hboggmcfmaakkifgifjbccnpfmnegick), open your sandbox and select the sheet folder to monitor. Check browser compatibility; manual uploads also work.

Tell the assistant what you expected and what happened when something fails. AI-generated sheets still need testing in Roll20; a local preview cannot verify all game behavior. This project has not yet been validated through a complete live Roll20 test.

## Updates

Download the new version and replace the installed `roll20-sheets` folder, including its license. Keep your sheet files and `docs/` separate so they are preserved. You do not need GitHub Packages. Releases identify specific versions; **Code > Download ZIP** gets the current development files.

## About Spirito and support

I'm **[Spirito](https://www.spirito.fr)**, a graphic designer and role-playing character sheet creator, with more than a dozen sheets coded myself.

The sheet code used to build this skill came exclusively from my own creations. I did not use other authors' sheet code from the Roll20 community repository because I had not obtained their agreement. The skill also uses linked platform documentation. These are instructions for existing assistants, not an AI model trained exclusively on my work. This project is not affiliated with Roll20, OpenAI or Anthropic.

Like many creatives, my work has been affected by AI. It's here, and we have to work with it. If this skill helps you, you can **[say thanks with a voluntary donation](https://www.paypal.com/paypalme/spirito35)**. Donations support my work and are never required.

## License

Under the custom [Spirito Skill Sharing License](LICENSE):

- Use and adapt the skill, including to create **paid character sheets**.
- Share it for free, preserving the license and the credit **Roll20 Sheet Skills by Spirito - https://www.spirito.fr**, and identify your changes.
- **Do not sell the skill or its adaptations**, or charge for access to them.

This custom license has not been professionally reviewed and is not an OSI-approved open-source license. Earlier copies distributed under MIT retain their previously granted permissions.

The other files are primarily for the assistant: [skill instructions](roll20-sheets/SKILL.md), [technical sources](roll20-sheets/references/sources.md) and [evaluation scenarios](EVALUATION.md).
