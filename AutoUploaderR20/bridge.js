/*
 * AutoUploaderR20: bridge to the page.
 * Runs inside the Roll20 page to trigger the upload with Roll20's jQuery.
 * It does nothing else: everything else happens in content.js.
 */
(() => {
  if (window.__r20ffBridge) return;
  window.__r20ffBridge = true;
  const root = document.documentElement;
  root.dataset.r20ffBridge = "1";
  const jq = () => {
    const j = window.jQuery || window.$;
    return typeof j === "function" && j.fn && j.fn.jquery ? j : null;
  };
  const markJq = () => { const j = jq(); if (j) root.dataset.r20ffJq = j.fn.jquery; };
  markJq();
  setTimeout(markJq, 3000);
  document.addEventListener("r20ff-trigger", (e) => {
    const token = String(e.detail || "");
    const input = document.querySelector(`input[data-r20ff-target="${token.replace(/[^\w]/g, "")}"]`);
    if (!input) return;
    const j = jq();
    if (j) { markJq(); j(input).change(); }
    else {
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
})();
