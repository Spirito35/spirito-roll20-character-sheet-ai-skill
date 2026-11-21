/*
 * AutoUploaderR20 (v1.4)
 * Integrates into the "Sheet Sandbox Tool" window of the Roll20 editor.
 * You pick a folder; the extension finds the .html, the .css (and
 * translation.json if present), sends them to the Sandbox, then sends them
 * again on every save.
 *
 * This script runs apart from the page (isolated world), so that Roll20's own
 * scripts do not get in its way. bridge.js runs inside the page and triggers
 * the upload with Roll20's jQuery, as the Autouploader extension does.
 */
(() => {
  if (window.__r20ffLoaded) return;
  window.__r20ffLoaded = true;

  const POLL_MS = 1000;
  const KINDS = ["html", "css", "translation"];
  const LABELS = { html: "HTML", css: "CSS", translation: "Translation" };
  const IDS = { html: "sheetHtml", css: "sheetCss", translation: "sheetTranslation" };

  const state = {
    dirHandle: null,
    dirName: "",
    candidates: { html: [], css: [], translation: [] },
    chosen: { html: 0, css: 0, translation: 0 },
    stamps: {},
    watch: true,
    timer: null,
    fallback: false,
    ui: null,
    log: [],
  };

  /* ---------- Memory of the last folder (IndexedDB) ---------- */
  function idb() {
    return new Promise((res, rej) => {
      const r = indexedDB.open("r20ff", 1);
      r.onupgradeneeded = () => r.result.createObjectStore("kv");
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  }
  async function idbSet(k, v) {
    try {
      const db = await idb();
      await new Promise((res, rej) => {
        const tx = db.transaction("kv", "readwrite");
        tx.objectStore("kv").put(v, k);
        tx.oncomplete = res; tx.onerror = () => rej(tx.error);
      });
    } catch (e) { /* not important */ }
  }
  async function idbGet(k) {
    try {
      const db = await idb();
      return await new Promise((res, rej) => {
        const tx = db.transaction("kv", "readonly");
        const rq = tx.objectStore("kv").get(k);
        rq.onsuccess = () => res(rq.result); rq.onerror = () => rej(rq.error);
      });
    } catch (e) { return undefined; }
  }

  /* ---------- Sandbox fields ---------- */
  function sandbox() { return document.getElementById("sheetsandbox"); }

  function fileInputs() {
    return [...document.querySelectorAll('input[type="file"]')].filter((i) => !i.dataset.r20ffOwn);
  }

  function hintText(input) {
    const parts = [input.accept, input.id, input.name, input.className, input.getAttribute("aria-label")];
    const p = input.parentElement;
    if (p) parts.push(p.className, (p.textContent || "").trim().slice(0, 60));
    return parts.filter(Boolean).join(" ").toLowerCase().replace(/\s+/g, " ");
  }

  function mapInputs() {
    const map = {};
    for (const k of KINDS) {
      map[k] = document.querySelector(`#sheetsandbox .container .btn.${k} input[type="file"]`)
        || document.getElementById(IDS[k]);
    }
    const free = [];
    for (const i of fileInputs()) {
      if (KINDS.some((k) => map[k] === i)) continue;
      const acc = (i.accept || "").toLowerCase();
      let kind = null;
      if (/\.html?|text\/html/.test(acc)) kind = "html";
      else if (/\.css|text\/css/.test(acc)) kind = "css";
      else if (/\.json/.test(acc)) kind = "translation";
      if (kind && !map[kind]) map[kind] = i;
      else if (!acc || !/audio|image|video/.test(acc)) free.push(i);
    }
    for (const k of KINDS) if (!map[k] && free.length) map[k] = free.shift();
    return map;
  }

  // The file is placed in the field here, then bridge.js (which runs inside the
  // page) fires the event with Roll20's jQuery, as Autouploader does.
  function sendToInput(input, file) {
    const dt = new DataTransfer();
    dt.items.add(file);
    input.files = dt.files;
    const token = "t" + Date.now() + Math.random().toString(36).slice(2, 7);
    input.dataset.r20ffTarget = token;
    const bridged = document.documentElement.dataset.r20ffBridge === "1";
    if (bridged) {
      document.dispatchEvent(new CustomEvent("r20ff-trigger", { detail: token }));
      return document.documentElement.dataset.r20ffJq ? "jQuery " + document.documentElement.dataset.r20ffJq : "bridge (native)";
    }
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    return "native (no bridge)";
  }

  /* ---------- Reading the folder ---------- */
  function kindOf(name) {
    const n = name.toLowerCase();
    if (/\.html?$/.test(n)) return "html";
    if (/\.css$/.test(n)) return "css";
    if (/\.json$/.test(n) && /translat|traduc|^[a-z]{2}(-[a-z]{2})?\.json$/.test(n)) return "translation";
    return null;
  }

  function sortCandidates(list, dirName) {
    const base = (dirName || "").toLowerCase();
    const score = (n) => {
      const s = n.toLowerCase().split("/").pop().replace(/\.[^.]+$/, "");
      let v = 5;
      if (s === base) v = 0;
      else if (/sheet|fiche/.test(s) || s === "translation" || s === "en") v = 1;
      else if (/^(test|old|backup|copie|copy)|bak|\.min$/.test(s)) v = 9;
      return v + (n.includes("/") ? 0.5 : 0);
    };
    return list.sort((a, b) => score(a.name) - score(b.name) || a.name.localeCompare(b.name));
  }

  async function scanHandle(dir) {
    const found = { html: [], css: [], translation: [] };
    const subdirs = [];
    for await (const entry of dir.values()) {
      if (entry.kind === "file") {
        const k = kindOf(entry.name);
        if (k) found[k].push({ name: entry.name, handle: entry });
      } else subdirs.push(entry);
    }
    for (const sd of subdirs) {
      for await (const entry of sd.values()) {
        if (entry.kind !== "file") continue;
        const k = kindOf(entry.name);
        // One level down: useful for "translations/en.json" or a "src" folder.
        if (k && (!found[k].length || k === "translation")) found[k].push({ name: `${sd.name}/${entry.name}`, handle: entry });
      }
    }
    // Keep the files at the root first.
    for (const k of KINDS) {
      const top = found[k].filter((c) => !c.name.includes("/"));
      if (top.length && k !== "translation") found[k] = top;
    }
    return found;
  }

  function scanFileList(files) {
    const found = { html: [], css: [], translation: [] };
    let root = "";
    for (const f of files) {
      const parts = (f.webkitRelativePath || f.name).split("/");
      root = parts[0];
      if (parts.length > 3) continue;
      const k = kindOf(f.name);
      if (k) found[k].push({ name: parts.slice(1).join("/"), file: f });
    }
    for (const k of KINDS) {
      const top = found[k].filter((c) => !c.name.includes("/"));
      if (top.length) found[k] = top;
    }
    return { found, root };
  }

  /* ---------- Upload ---------- */
  async function upload(onlyChanged) {
    const map = mapInputs();
    const sent = [];
    const missing = [];
    let how = "";
    for (const k of KINDS) {
      const c = state.candidates[k][state.chosen[k]];
      if (!c) continue;
      let file;
      try { file = c.handle ? await c.handle.getFile() : c.entry ? await entryFile(c.entry) : c.file; }
      catch (e) { setStatus(`Cannot read ${c.name}: ${e.message}`, "err"); stopWatch(); return; }
      const stamp = `${file.lastModified}:${file.size}`;
      if (onlyChanged && state.stamps[k] === stamp) continue;
      if (!map[k]) { missing.push(LABELS[k]); continue; }
      const named = new File([file], c.name.split("/").pop(), { type: file.type || guess(k), lastModified: file.lastModified });
      how = sendToInput(map[k], named);
      state.stamps[k] = stamp;
      sent.push(LABELS[k]);
      addLog(`${c.name} sent`);
    }
    const t = new Date().toLocaleTimeString();
    if (missing.length) setStatus(`${missing.join(" and ")} field not found. Open "Diagnostics".`, "err");
    else if (sent.length) setStatus(`${sent.join(" + ")} sent at ${t}.`, "ok");
    else if (!onlyChanged) setStatus("No file to send.", "err");
    if (how) state.lastHow = how;
  }
  function guess(k) { return k === "html" ? "text/html" : k === "css" ? "text/css" : "application/json"; }

  function startWatch() {
    stopWatch();
    if (!state.watch || state.fallback || !(state.dirHandle || state.entryMode)) { render(); return; }
    state.timer = setInterval(() => upload(true), POLL_MS);
    render();
  }
  function stopWatch() { if (state.timer) clearInterval(state.timer); state.timer = null; }

  /* ---------- Choosing the folder ---------- */
  async function useDirHandle(handle) {
    stopWatch();
    state.dirHandle = handle;
    state.entryMode = false;
    state.dirName = handle.name;
    state.fallback = false;
    addLog(`Folder "${handle.name}" received, reading...`);
    setStatus(`Reading "${handle.name}"...`);
    state.candidates = await scanHandle(handle);
    for (const k of KINDS) sortCandidates(state.candidates[k], handle.name);
    addLog(`Found: ${KINDS.map((k) => `${state.candidates[k].length} ${LABELS[k]}`).join(", ")}`);
    state.chosen = { html: 0, css: 0, translation: 0 };
    state.stamps = {};
    idbSet("lastDir", handle);
    render();
    if (!state.candidates.html.length && !state.candidates.css.length) {
      setStatus(`No .html or .css file in "${handle.name}".`, "err");
      return;
    }
    await upload(false);
    startWatch();
  }

  async function pickFolder() {
    addLog('Click on "Choose a folder"');
    if (typeof window.showDirectoryPicker !== "function") {
      addLog("Native picker missing: simple mode");
      pickFolderFallback();
      return;
    }
    let handle;
    try {
      handle = await window.showDirectoryPicker({ id: "r20ff", mode: "read" });
    } catch (e) {
      if (e && e.name === "AbortError") {
        addLog(`Choice cancelled by Chrome (${e.message || "no detail"})`);
        setStatus('Chrome cancelled the folder choice. If a message mentioned "system files", or if the folder is on a network/cloud drive, try "Simple mode...".', "err");
        return;
      }
      addLog(`Native picker refused: ${e && e.name} - ${e && e.message}`);
      setStatus(`The folder picker was refused (${e && e.name}). Trying simple mode...`, "err");
      pickFolderFallback();
      return;
    }
    try {
      await useDirHandle(handle);
    } catch (e) {
      addLog(`Error: ${e && e.name} - ${e && e.message}`);
      setStatus(`Error while reading the folder: ${e && e.name} - ${e && e.message}`, "err");
    }
  }

  /* ---------- Drag and drop of a folder ---------- */
  function entryFile(entry) { return new Promise((res, rej) => entry.file(res, rej)); }
  function readDirEntries(dirEntry) {
    return new Promise((res, rej) => {
      const reader = dirEntry.createReader(); const all = [];
      const next = () => reader.readEntries((batch) => { if (!batch.length) res(all); else { all.push(...batch); next(); } }, rej);
      next();
    });
  }
  async function scanEntry(dirEntry) {
    const found = { html: [], css: [], translation: [] };
    const subs = [];
    for (const e of await readDirEntries(dirEntry)) {
      if (e.isFile) { const k = kindOf(e.name); if (k) found[k].push({ name: e.name, entry: e }); }
      else if (e.isDirectory) subs.push(e);
    }
    for (const sd of subs) {
      for (const e of await readDirEntries(sd)) {
        if (!e.isFile) continue;
        const k = kindOf(e.name);
        if (k && (!found[k].length || k === "translation")) found[k].push({ name: `${sd.name}/${e.name}`, entry: e });
      }
    }
    for (const k of KINDS) {
      const top = found[k].filter((c) => !c.name.includes("/"));
      if (top.length && k !== "translation") found[k] = top;
    }
    return found;
  }
  async function useDirEntry(dirEntry) {
    stopWatch();
    Object.assign(state, { dirHandle: null, dirName: dirEntry.name, fallback: false, entryMode: true,
      chosen: { html: 0, css: 0, translation: 0 }, stamps: {} });
    state.candidates = await scanEntry(dirEntry);
    for (const k of KINDS) sortCandidates(state.candidates[k], dirEntry.name);
    addLog(`Dropped (entry): "${dirEntry.name}", ${KINDS.map((k) => `${state.candidates[k].length} ${LABELS[k]}`).join(", ")}`);
    render();
    if (!state.candidates.html.length && !state.candidates.css.length) { setStatus(`No .html or .css file in "${dirEntry.name}".`, "err"); return; }
    await upload(false);
    startWatch();
  }
  function setupDrop(zone) {
    const on = (t, f) => zone.addEventListener(t, (e) => { e.preventDefault(); e.stopPropagation(); f(e); });
    on("dragenter", () => zone.classList.add("over"));
    on("dragover", (e) => { if (e.dataTransfer) e.dataTransfer.dropEffect = "copy"; zone.classList.add("over"); });
    on("dragleave", (e) => { if (!zone.contains(e.relatedTarget)) zone.classList.remove("over"); });
    on("drop", (e) => {
      zone.classList.remove("over");
      const item = [...(e.dataTransfer ? e.dataTransfer.items : [])].find((i) => i.kind === "file");
      if (!item) return;
      addLog("Folder dropped on the block");
      // These two calls must be made right away, during the event.
      const handleP = typeof item.getAsFileSystemHandle === "function" ? item.getAsFileSystemHandle() : null;
      const entry = typeof item.webkitGetAsEntry === "function" ? item.webkitGetAsEntry() : null;
      (async () => {
        try {
          const h = handleP ? await handleP : null;
          if (h && h.kind === "directory") { state.entryMode = false; await useDirHandle(h); return; }
          if (h && h.kind === "file") { setStatus("Drop the whole folder, not a single file.", "err"); return; }
        } catch (err) { addLog(`Direct access refused (${err.name} - ${err.message}), trying by entry`); }
        try {
          if (entry && entry.isDirectory) { await useDirEntry(entry); return; }
          setStatus("Drop a folder, not a file.", "err");
        } catch (err) {
          addLog(`Drag and drop error: ${err.name} - ${err.message}`);
          setStatus(`Error: ${err.name} - ${err.message}`, "err");
        }
      })();
    });
  }

  function pickFolderFallback() {
    const inp = document.createElement("input");
    inp.type = "file"; inp.webkitdirectory = true; inp.multiple = true;
    inp.dataset.r20ffOwn = "1"; inp.style.display = "none";
    inp.addEventListener("change", async () => {
      const files = [...(inp.files || [])];
      inp.remove();
      if (!files.length) return;
      const { found, root } = scanFileList(files);
      stopWatch();
      Object.assign(state, { dirHandle: null, dirName: root, fallback: true, entryMode: false, candidates: found,
        chosen: { html: 0, css: 0, translation: 0 }, stamps: {} });
      for (const k of KINDS) sortCandidates(state.candidates[k], root);
      addLog(`Simple mode: "${root}", ${KINDS.map((k) => `${found[k].length} ${LABELS[k]}`).join(", ")}`);
      render();
      await upload(false);
    });
    document.body.appendChild(inp);
    inp.click();
  }

  async function reopenLast() {
    const h = await idbGet("lastDir");
    if (!h) return;
    try {
      let p = await h.queryPermission({ mode: "read" });
      if (p !== "granted") p = await h.requestPermission({ mode: "read" });
      if (p !== "granted") { setStatus("Access to the folder was refused.", "err"); return; }
      await useDirHandle(h);
    } catch (e) {
      setStatus("Folder not found (moved or renamed?). Choose it again.", "err");
    }
  }

  /* ---------- Interface ---------- */
  const CSS_TEXT = `
    :host { all: initial; color: inherit; display: block; margin: 0 0 10px; }
    [hidden] { display: none !important; }
    * { box-sizing: border-box; font-family: inherit; }
    .box { font-family: -apple-system, "Segoe UI", Roboto, Arial, sans-serif; font-size: 13px; line-height: 1.4;
      color: inherit; border: 1px solid rgba(127,127,127,.45); border-radius: 8px; padding: 10px; }
    .fixed .box { background: #fff; color: #222; box-shadow: 0 8px 30px rgba(0,0,0,.28); }
    .title { font-weight: 700; margin: 0 0 8px; display: flex; align-items: center; gap: 6px; }
    .live { width: 9px; height: 9px; border-radius: 50%; background: #999; flex: none; }
    .live.on { background: #1dbf73; }
    .btns { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 8px; }
    button { padding: 6px 10px; border-radius: 6px; cursor: pointer; border: 1px solid rgba(127,127,127,.6);
      background: transparent; color: inherit; font-size: 12px; }
    button.primary { background: #e10085; border-color: #e10085; color: #fff; font-weight: 600; }
    button:hover { filter: brightness(1.1); }
    .row { display: flex; align-items: center; gap: 6px; margin: 4px 0; }
    .row span { width: 72px; opacity: .7; flex: none; }
    .row select, .row .v { flex: 1; min-width: 0; font-size: 12px; padding: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: inherit; background: transparent; }
    .row select option { color: #222; }
    .dir { font-weight: 600; margin: 2px 0 4px; word-break: break-all; }
    label.chk { display: flex; gap: 6px; align-items: center; margin: 6px 0; cursor: pointer; font-size: 12px; }
    .status { margin-top: 6px; padding: 5px 8px; border-radius: 6px; background: rgba(127,127,127,.15); font-size: 12px; }
    .status.ok { background: rgba(29,191,115,.18); }
    .status.err { background: rgba(240,88,101,.22); }
    .muted { opacity: .7; font-size: 11px; margin-top: 4px; }
    textarea { width: 100%; color: inherit; background: rgba(127,127,127,.12); border: 1px solid rgba(127,127,127,.4); border-radius: 6px; font: 11px/1.4 Consolas, monospace; padding: 6px; margin: 6px 0; resize: vertical; }
    .copied { font-size: 11px; }
    .drop { border: 1px dashed rgba(127,127,127,.7); border-radius: 6px; padding: 8px; text-align: center; font-size: 12px; opacity: .8; margin: 0 0 8px; }
    .box.over { outline: 2px dashed #e10085; outline-offset: 2px; }
    .box.over .drop { border-color: #e10085; opacity: 1; }
    pre { color: inherit; white-space: pre-wrap; font-size: 11px; background: rgba(127,127,127,.12); padding: 6px; border-radius: 6px; max-height: 200px; overflow: auto; margin: 6px 0 0; }
    .fab { position: fixed; right: 18px; bottom: 18px; z-index: 2147483646; width: 46px; height: 46px; border-radius: 50%;
      border: none; background: #e10085; color: #fff; cursor: pointer; box-shadow: 0 4px 14px rgba(0,0,0,.3); padding: 0; }
    .fixed .panel { position: fixed; right: 18px; bottom: 74px; z-index: 2147483647; width: 330px; max-width: calc(100vw - 36px); display: none; }
    .fixed .panel.open { display: block; }
  `;

  function panelHTML() {
    return `<div class="box">
      <div class="title"><i class="live"></i>AutoUploaderR20: load the sheet from a folder</div>
      <div class="btns">
        <button class="primary" data-a="pick">Choose a folder...</button>
        <button data-a="reopen" hidden></button>
        <button data-a="reload">Reload now</button>
        <button data-a="simple" title="Uses Chrome's classic upload window: works with every drive, but without automatic re-sending">Simple mode...</button>
        <button data-a="diag">Diagnostics</button>
      </div>
      <div class="drop">Or drop the sheet's folder here from the Windows file explorer</div>
      <div class="body"></div>
      <label class="chk"><input type="checkbox" data-a="watch" checked> Send again on every save</label>
      <div class="status">Choose your sheet's folder.</div>
      <div class="diag"></div>
    </div>`;
  }

  function buildUI() {
    const sb = sandbox();
    const host = document.createElement("div");
    host.id = "r20ff-host";
    const root = host.attachShadow({ mode: "open" });
    let integrated = false;
    if (sb) {
      // Integrated in the Sheet Sandbox window, just above Roll20's buttons.
      root.innerHTML = `<style>${CSS_TEXT}</style>${panelHTML()}`;
      const anchor = sb.querySelector(".container");
      if (anchor && anchor.parentElement) anchor.parentElement.insertBefore(host, anchor);
      else sb.insertBefore(host, sb.firstChild);
      integrated = true;
    } else {
      // Fallback: floating button if the window is not found.
      root.innerHTML = `<style>${CSS_TEXT}</style><div class="fixed">
        <button class="fab" title="Load a sheet from a folder">
          <svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M10 4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6z"/></svg>
        </button><div class="panel">${panelHTML()}</div></div>`;
      document.documentElement.appendChild(host);
    }
    const $ = (s) => root.querySelector(s);
    state.ui = { host, root, $, integrated };

    setupDrop($(".box"));
    const fab = $(".fab");
    if (fab) fab.addEventListener("click", () => $(".panel").classList.toggle("open"));
    $('[data-a="pick"]').addEventListener("click", pickFolder);
    $('[data-a="reopen"]').addEventListener("click", reopenLast);
    $('[data-a="reload"]').addEventListener("click", () => {
      if (state.fallback) { pickFolderFallback(); return; } // in simple mode, the folder must be read again
      state.stamps = {}; upload(false);
    });
    $('[data-a="simple"]').addEventListener("click", () => { addLog("Simple mode requested"); pickFolderFallback(); });
    $('[data-a="diag"]').addEventListener("click", showDiag);
    const w = $('[data-a="watch"]');
    w.checked = state.watch;
    w.addEventListener("change", (e) => { state.watch = e.target.checked; state.watch ? startWatch() : (stopWatch(), render()); });
    idbGet("lastDir").then((last) => {
      const rb = $('[data-a="reopen"]');
      if (last && typeof last.queryPermission === "function") { rb.hidden = false; rb.textContent = `Reopen "${last.name}"`; }
    });
    render();
    if (state.lastStatus) setStatus(state.lastStatus[0], state.lastStatus[1]);
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

  function render() {
    if (!state.ui) return;
    const { $ } = state.ui;
    const body = $(".body");
    if (!state.dirName) body.innerHTML = "";
    else {
      let h = `<div class="dir">${esc(state.dirName)}</div>`;
      for (const k of KINDS) {
        const list = state.candidates[k];
        if (!list.length) {
          if (k !== "translation") h += `<div class="row"><span>${LABELS[k]}</span><div class="v">no file</div></div>`;
          continue;
        }
        if (list.length === 1) h += `<div class="row"><span>${LABELS[k]}</span><div class="v" title="${esc(list[0].name)}">${esc(list[0].name)}</div></div>`;
        else h += `<div class="row"><span>${LABELS[k]}</span><select data-k="${k}">${list.map((c, i) =>
          `<option value="${i}"${i === state.chosen[k] ? " selected" : ""}>${esc(c.name)}</option>`).join("")}</select></div>`;
      }
      if (state.fallback) h += `<div class="muted">Simple mode: no automatic re-sending. After each change, click "Reload now" and choose the folder again.</div>`;
      body.innerHTML = h;
      body.querySelectorAll("select").forEach((s) => s.addEventListener("change", () => {
        state.chosen[s.dataset.k] = +s.value; state.stamps[s.dataset.k] = null; upload(true);
      }));
    }
    $(".live").classList.toggle("on", !!state.timer);
  }

  function setStatus(msg, cls) {
    state.lastStatus = [msg, cls];
    if (!state.ui) return;
    const el = state.ui.$(".status");
    el.textContent = msg;
    el.className = "status" + (cls ? " " + cls : "");
    render();
  }

  function addLog(msg) {
    state.log.unshift(`${new Date().toLocaleTimeString()} ${msg}`);
    state.log.length = Math.min(state.log.length, 12);
  }

  function showDiag() {
    const map = mapInputs();
    const ds = document.documentElement.dataset;
    const lines = [
      `Version: 1.4`,
      `Browser: ${(navigator.userAgent.match(/(Chrome|Edg|OPR|Brave)\/[\d.]+/g) || []).join(" ")}`,
      `Sheet Sandbox window found: ${sandbox() ? "yes" : "no"}`,
      `Bridge to the page: ${ds.r20ffBridge === "1" ? "yes" : "no"} | Roll20 jQuery: ${ds.r20ffJq || "no"}`,
      `Native folder picker: ${typeof window.showDirectoryPicker === "function" ? "yes" : "no"}`,
      `Folder: ${state.dirName || "-"}`,
      `Last upload via: ${state.lastHow || "-"}`,
      `Automatic re-sending: ${state.timer ? "active" : "inactive"}`,
    ];
    for (const k of KINDS) {
      const i = map[k];
      lines.push(`${LABELS[k]} -> ${i ? `#${i.id || "?"} (${i.files && i.files[0] ? i.files[0].name : "empty"})` : "not found"}`);
    }
    const sb = sandbox();
    if (sb) {
      const btns = [...sb.querySelectorAll("button, .btn, a.btn")].map((b) => `[${(b.className || "").toString().slice(0, 30)}] ${(b.textContent || "").trim().slice(0, 30)}`);
      lines.push(`Window buttons: ${btns.join(" | ") || "none"}`);
    }
    lines.push("Log:", ...(state.log.length ? state.log : ["(empty)"]));
    const text = lines.join("\n");
    const box = state.ui.$(".diag");
    box.innerHTML = `<textarea readonly rows="9"></textarea><button data-a="copy">Copy diagnostics</button><span class="copied"></span>`;
    const ta = box.querySelector("textarea");
    ta.value = text;
    box.querySelector('[data-a="copy"]').addEventListener("click", async () => {
      let ok = false;
      try { await navigator.clipboard.writeText(text); ok = true; } catch (e) { /* fallback below */ }
      if (!ok) { ta.focus(); ta.select(); try { ok = document.execCommand("copy"); } catch (e) { ok = false; } }
      box.querySelector(".copied").textContent = ok ? "  Copied! Paste it in the conversation." : "  Select the text and press Ctrl+C.";
    });
  }

  /* ---------- Startup ---------- */
  function check() {
    const ui = state.ui;
    if (ui && document.contains(ui.host)) {
      // Switched to floating mode but the Sandbox window has appeared since: integrate into it.
      if (!ui.integrated && sandbox()) { ui.host.remove(); state.ui = null; buildUI(); }
      return;
    }
    if (ui) state.ui = null; // the window was recreated by Roll20: insert again.
    if (sandbox() || fileInputs().some((i) => /\.html|\.css/.test(i.accept || ""))) buildUI();
  }
  check();
  let pending = false;
  new MutationObserver(() => {
    if (pending) return;
    pending = true;
    setTimeout(() => { pending = false; check(); }, 400);
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
