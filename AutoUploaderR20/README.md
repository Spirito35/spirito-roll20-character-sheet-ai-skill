# AutoUploaderR20 (v1.4)

A small Chrome extension that sends your sheet's files to the Roll20 Sheet Sandbox and sends them again every time you save. It is part of Spirito Roll20 Character Sheet AI Skill and is covered by the same [license](../LICENSE). It is optional: you can also upload files by hand, or use the official [Roll20 Autouploader](https://wiki.roll20.net/Roll20_Autouploader).

It needs the Roll20 Custom Sheet Sandbox, which requires Roll20 Pro. It has not been published to the Chrome Web Store.

## Install or update

1. Download this repository (**Code > Download ZIP**) and extract it somewhere it will stay, replacing any older copy.
2. In Chrome, open `chrome://extensions` and turn on **Developer mode**.
3. New installation: click **Load unpacked** and choose this `AutoUploaderR20` folder. Update: click the **Reload** arrow on the extension.
4. Reload your Roll20 game page (F5).

Do not keep the official "Roll20 API and Sheet Autouploader" extension enabled at the same time.

## Use

1. In your game, open the **Sheet Sandbox Tool**. A block named "AutoUploaderR20: load the sheet from a folder" appears inside it, above Roll20's own buttons.
2. Click **Choose a folder...** and select your sheet's folder. The `.html`, the `.css` (and `translation.json` if there is one) are sent. If there are several `.html` or `.css` files, a menu lets you pick the right one.
3. While **Send again on every save** is ticked (green dot), every saved file is sent again automatically. You can also drag your sheet's folder from the Windows file explorer into the block.
4. **Simple mode...** works with any drive but has no automatic re-sending. **Reopen ...** picks up the last folder you used.
5. To change sheet, click **Choose a folder...** again.

## If something goes wrong

Click **Diagnostics** and send a screenshot of the text that appears, or use **Copy diagnostics**.

## Status

Adapted from a working French version and translated to English on 2026-11-21. The English version has not been tested in Chrome or in Roll20 yet. The extension only reads the folder you choose and only runs on the Roll20 editor page.