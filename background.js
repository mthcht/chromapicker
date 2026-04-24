/* ==========================================================
   Chromadrop - background service worker (v1.2)
   Orchestrates: custom picker, color extraction, highlighting.
   ========================================================== */

chrome.runtime.onInstalled.addListener((details) => {
  // Initialize default storage
  chrome.storage.local.get(['history'], (data) => {
    if (!data.history) chrome.storage.local.set({ history: [], latest: null });
  });

  // On first install (not on browser updates), open the welcome page
  if (details.reason === 'install') {
    chrome.tabs.create({ url: chrome.runtime.getURL('welcome.html') });
  }
});

/* Keyboard shortcut */
chrome.commands.onCommand.addListener((command) => {
  if (command === 'pick-color') startPicker();
});

/* Messages from popup / content scripts */
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg?.type === 'START_PICK') {
    startPicker();
    sendResponse({ ok: true });
    return;
  }
  if (msg?.type === 'PICKED') {
    savePick(msg.hex);
    sendResponse({ ok: true });
    return;
  }
  if (msg?.type === 'EXTRACT') {
    extractFromPage().then(sendResponse);
    return true; // async
  }
  if (msg?.type === 'HIGHLIGHT') {
    highlightOnPage(msg.hex);
    sendResponse({ ok: true });
    return;
  }
  if (msg?.type === 'CHECK_GAMUT') {
    checkPageGamut().then(sendResponse);
    return true; // async
  }
});

/* ========================================================
   Orchestration
   ======================================================== */

const BLOCKED = /^(chrome|edge|about|chrome-extension|edge-extension|view-source):/;

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return null;
  if (BLOCKED.test(tab.url || '')) return null;
  return tab;
}

async function startPicker() {
  const tab = await getActiveTab();
  if (!tab) return;

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: pickerInPage,
    });
  } catch (err) {
    console.error('[Chromadrop] picker failed:', err);
  }
}

async function savePick(hex) {
  const h = hex.toLowerCase();
  const { history = [] } = await chrome.storage.local.get('history');
  const filtered = history.filter((x) => x.hex !== h);
  filtered.unshift({ hex: h, time: Date.now() });
  await chrome.storage.local.set({
    latest: { hex: h, time: Date.now() },
    history: filtered.slice(0, 24),
  });
}

async function extractFromPage() {
  const tab = await getActiveTab();
  if (!tab) return { ok: false, error: 'This page cannot be inspected.' };

  try {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractInPage,
    });
    return { ok: true, colors: result || [] };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function highlightOnPage(hex) {
  const tab = await getActiveTab();
  if (!tab) return;
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: highlightInPage,
      args: [hex],
    });
  } catch (err) {
    console.error('[Chromadrop] highlight failed:', err);
  }
}

/* Check whether the active page authors wide-gamut colors.
 * Combines this signal with the browser's display capability
 * (matchMedia '(color-gamut: p3)') in the popup. */
async function checkPageGamut() {
  const tab = await getActiveTab();
  if (!tab) return { ok: false, pageWideGamut: false };
  try {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: detectGamutInPage,
    });
    return { ok: true, ...result };
  } catch (err) {
    return { ok: false, pageWideGamut: false, error: err.message };
  }
}

/* ========================================================
   Injected into the page: PICKER
   Uses the browser's native EyeDropper API - pixel-perfect
   because it reads directly from the compositor. Shows a nice
   confirmation toast after the user picks.
   ======================================================== */
function pickerInPage() {
  if (window.__chromadropPickerActive) return;
  if (!window.EyeDropper) {
    console.warn('[Chromadrop] EyeDropper API unavailable.');
    return;
  }
  window.__chromadropPickerActive = true;

  const BG = '#1F1F1E';
  const INK = '#BFBEB3';
  const DIM = '#8c8b82';
  const LINE = '#3a3938';

  new EyeDropper().open().then(async (result) => {
    const hex = result.sRGBHex.toUpperCase();

    // Auto-copy; the native EyeDropper completion carries user activation.
    try { await navigator.clipboard.writeText(hex); } catch (_) {}

    // Save to storage
    chrome.runtime.sendMessage({ type: 'PICKED', hex });

    // Nice confirmation toast
    const t = document.createElement('div');
    t.style.cssText = [
      'all: initial', 'position: fixed',
      'bottom: 24px', 'left: 50%',
      'transform: translateX(-50%) translateY(16px)',
      'z-index: 2147483647',
      'display: inline-flex', 'align-items: center', 'gap: 10px',
      'padding: 10px 14px',
      `background: ${BG}`,
      `color: ${INK}`,
      `border: 1px solid ${LINE}`,
      'border-radius: 999px',
      `font-family: "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`,
      'font-size: 13px', 'font-weight: 500',
      'box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5)',
      'opacity: 0', 'transition: opacity 0.2s, transform 0.3s',
      'pointer-events: none',
    ].join(';');

    const chip = document.createElement('span');
    chip.style.cssText = [
      'display: inline-block', 'width: 16px', 'height: 16px',
      `border-radius: 4px`, `background: ${hex}`,
      'box-shadow: inset 0 0 0 1px rgba(255,255,255,0.15)',
      'flex-shrink: 0',
    ].join(';');

    const lbl = document.createElement('span');
    lbl.style.cssText = `font-family: "Noto Sans JP", ui-monospace, "SF Mono", Consolas, monospace; font-size: 12px;`;
    lbl.textContent = hex;

    const tag = document.createElement('span');
    tag.style.cssText = `color: ${DIM}; font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase;`;
    tag.textContent = '· copied';

    t.append(chip, lbl, tag);
    document.body.appendChild(t);
    requestAnimationFrame(() => {
      t.style.opacity = '1';
      t.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateX(-50%) translateY(16px)';
      setTimeout(() => t.remove(), 320);
    }, 1800);
  }).catch(() => {
    /* user pressed Esc - silent */
  }).finally(() => {
    window.__chromadropPickerActive = false;
  });
}

/* ========================================================
   Injected into the page: EXTRACT ALL COLORS
   Walks the DOM, collects unique colors from computed styles.
   Returns an array: [{hex, count}, ...] sorted by frequency.
   ======================================================== */
function extractInPage() {
  const colors = new Map();

  function normalize(css) {
    if (!css || css === 'transparent' || css === 'rgba(0, 0, 0, 0)') return null;
    const m = css.match(
      /^rgba?\(\s*(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)(?:[\s,\/]+([\d.]+))?\s*\)$/
    );
    if (!m) return null;
    const [, rs, gs, bs, as] = m;
    if (as !== undefined && parseFloat(as) < 0.3) return null;
    const toHex = (n) => Math.round(parseFloat(n)).toString(16).padStart(2, '0');
    return '#' + toHex(rs) + toHex(gs) + toHex(bs);
  }

  function add(css) {
    const hex = normalize(css);
    if (!hex) return;
    colors.set(hex, (colors.get(hex) || 0) + 1);
  }

  const all = document.body.querySelectorAll('*');
  for (const el of all) {
    // Skip invisible or offscreen
    if (!el.offsetWidth && !el.offsetHeight && el.tagName !== 'HTML') continue;
    const cs = window.getComputedStyle(el);

    add(cs.color);
    add(cs.backgroundColor);

    // Only consider borders if they actually render
    if (parseFloat(cs.borderTopWidth) > 0)    add(cs.borderTopColor);
    if (parseFloat(cs.borderRightWidth) > 0)  add(cs.borderRightColor);
    if (parseFloat(cs.borderBottomWidth) > 0) add(cs.borderBottomColor);
    if (parseFloat(cs.borderLeftWidth) > 0)   add(cs.borderLeftColor);

    // SVG fills/strokes
    const tag = el.tagName.toLowerCase();
    if (['path', 'rect', 'circle', 'ellipse', 'polygon', 'polyline', 'line'].includes(tag)) {
      add(cs.fill);
      add(cs.stroke);
    }
  }

  return Array.from(colors.entries())
    .map(([hex, count]) => ({ hex, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 36);
}

/* ========================================================
   Injected into the page: DETECT WIDE-GAMUT AUTHORING
   Scans all accessible stylesheets for color functions that
   signal wide-gamut authoring: color(display-p3 ...),
   color(rec2020 ...), color(a98-rgb ...), lch(...), lab(...),
   oklch(...), oklab(...). Cross-origin CSSOM throws, so we
   skip those silently.
   ======================================================== */
function detectGamutInPage() {
  const WIDE_GAMUT_PATTERNS = [
    /color\s*\(\s*display-p3\b/i,
    /color\s*\(\s*rec2020\b/i,
    /color\s*\(\s*a98-rgb\b/i,
    /color\s*\(\s*prophoto-rgb\b/i,
    /color\s*\(\s*xyz\b/i,
    /\boklch\s*\(/i,
    /\boklab\s*\(/i,
    /\blch\s*\(/i,
    /\blab\s*\(/i,
  ];

  const result = {
    pageWideGamut: false,
    widestSpace: null, // 'oklch' | 'lab' | 'display-p3' | 'rec2020' | etc.
    sampleRule: null,
    stylesheetsScanned: 0,
    stylesheetsSkipped: 0,
  };

  const detectedSpaces = new Set();

  function scanRules(rules) {
    for (const rule of rules) {
      try {
        // Recurse into @media, @supports, @layer, etc.
        if (rule.cssRules) scanRules(rule.cssRules);
        if (rule.style) {
          const cssText = rule.style.cssText || '';
          for (const pattern of WIDE_GAMUT_PATTERNS) {
            const match = cssText.match(pattern);
            if (match) {
              result.pageWideGamut = true;
              if (!result.sampleRule) {
                // Capture a short preview of the first wide-gamut rule found
                result.sampleRule = cssText.slice(0, 140);
              }
              const space = match[0].toLowerCase()
                .replace(/[\s(]/g, '')
                .replace('color', '');
              detectedSpaces.add(space);
            }
          }
        }
      } catch (_) {
        // Some rules throw on access (e.g. cross-origin fonts) - skip
      }
    }
  }

  for (const sheet of document.styleSheets) {
    try {
      const rules = sheet.cssRules || sheet.rules;
      if (rules) {
        scanRules(rules);
        result.stylesheetsScanned++;
      }
    } catch (_) {
      // Cross-origin stylesheet - can't read rules, skip silently
      result.stylesheetsSkipped++;
    }
  }

  // Also scan inline style="" attributes on elements (these bypass
  // stylesheets entirely). Limit to first 500 elements for performance.
  const inlineStyled = document.querySelectorAll('[style]');
  const limit = Math.min(inlineStyled.length, 500);
  for (let i = 0; i < limit; i++) {
    const s = inlineStyled[i].getAttribute('style') || '';
    for (const pattern of WIDE_GAMUT_PATTERNS) {
      if (pattern.test(s)) {
        result.pageWideGamut = true;
        const match = s.match(pattern);
        const space = match[0].toLowerCase().replace(/[\s(]/g, '').replace('color', '');
        detectedSpaces.add(space);
        if (!result.sampleRule) result.sampleRule = s.slice(0, 140);
        break;
      }
    }
  }

  // Prefer the "widest" space found (P3/rec2020 > oklch/lab)
  if (detectedSpaces.has('rec2020')) result.widestSpace = 'rec2020';
  else if (detectedSpaces.has('display-p3')) result.widestSpace = 'display-p3';
  else if (detectedSpaces.has('a98-rgb')) result.widestSpace = 'a98-rgb';
  else if (detectedSpaces.has('oklch')) result.widestSpace = 'oklch';
  else if (detectedSpaces.has('oklab')) result.widestSpace = 'oklab';
  else if (detectedSpaces.has('lch')) result.widestSpace = 'lch';
  else if (detectedSpaces.has('lab')) result.widestSpace = 'lab';

  return result;
}

/* ========================================================
   Injected into the page: HIGHLIGHT ELEMENTS BY COLOR
   Outlines every element using `targetHex` anywhere in its
   computed styles. Click anywhere (or Esc) to dismiss.
   ======================================================== */
function highlightInPage(targetHex) {
  const ACCENT = '#C6613F';
  const BG = '#1F1F1E';
  const INK = '#BFBEB3';
  const DIM = '#8c8b82';
  const LINE = '#3a3938';

  // Clear any previous highlights
  document.querySelectorAll('[data-chromadrop-hl]').forEach((el) => {
    el.style.outline = el.dataset.chromadropPrevOutline || '';
    el.style.outlineOffset = el.dataset.chromadropPrevOutlineOffset || '';
    delete el.dataset.chromadropHl;
    delete el.dataset.chromadropPrevOutline;
    delete el.dataset.chromadropPrevOutlineOffset;
  });
  document.getElementById('__chromadrop_hl_label')?.remove();

  if (!targetHex) return;

  function normalize(css) {
    if (!css) return null;
    const m = css.match(
      /^rgba?\(\s*(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)(?:[\s,\/]+([\d.]+))?\s*\)$/
    );
    if (!m) return null;
    const [, rs, gs, bs, as] = m;
    if (as !== undefined && parseFloat(as) < 0.3) return null;
    const toHex = (n) => Math.round(parseFloat(n)).toString(16).padStart(2, '0');
    return '#' + toHex(rs) + toHex(gs) + toHex(bs);
  }

  const target = targetHex.toLowerCase();
  let count = 0;

  document.body.querySelectorAll('*').forEach((el) => {
    if (!el.offsetWidth && !el.offsetHeight) return;
    const cs = window.getComputedStyle(el);
    const candidates = [
      cs.color,
      cs.backgroundColor,
      cs.borderTopColor,
      cs.borderRightColor,
      cs.borderBottomColor,
      cs.borderLeftColor,
      cs.fill,
      cs.stroke,
    ];
    for (const c of candidates) {
      if (normalize(c) === target) {
        // Save previous outline so we can restore
        el.dataset.chromadropPrevOutline = el.style.outline;
        el.dataset.chromadropPrevOutlineOffset = el.style.outlineOffset;
        el.dataset.chromadropHl = 'true';
        el.style.outline = `2px solid ${ACCENT}`;
        el.style.outlineOffset = '2px';
        count++;
        break;
      }
    }
  });

  // Floating status label
  const label = document.createElement('div');
  label.id = '__chromadrop_hl_label';
  label.style.cssText = [
    'all: initial', 'position: fixed',
    'top: 16px', 'left: 50%',
    'transform: translateX(-50%)',
    'z-index: 2147483647',
    'display: inline-flex', 'align-items: center', 'gap: 10px',
    'padding: 8px 14px',
    `background: ${BG}ee`, `color: ${INK}`,
    `border: 1px solid ${LINE}`, 'border-radius: 999px',
    `font-family: "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`,
    'font-size: 13px', 'font-weight: 500',
    'box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5)',
    'backdrop-filter: blur(8px)',
    'cursor: pointer',
  ].join(';');

  const chip = document.createElement('span');
  chip.style.cssText = [
    'display: inline-block', 'width: 16px', 'height: 16px',
    `border-radius: 4px`, `background: ${targetHex}`,
    'box-shadow: inset 0 0 0 1px rgba(255,255,255,0.15)',
  ].join(';');

  const h = document.createElement('span');
  h.style.cssText = `font-family: "Noto Sans JP", ui-monospace, "SF Mono", Consolas, monospace; font-size: 12px; font-weight: 600;`;
  h.textContent = targetHex.toUpperCase();

  const info = document.createElement('span');
  info.style.cssText = `color: ${DIM}; font-size: 11px;`;
  info.textContent = `· ${count} element${count === 1 ? '' : 's'}`;

  const dismiss = document.createElement('span');
  dismiss.style.cssText = `
    color: ${DIM}; font-size: 10px;
    letter-spacing: 0.08em; text-transform: uppercase;
    padding-left: 8px;
    border-left: 1px solid ${LINE};
  `;
  dismiss.textContent = 'click to dismiss';

  label.append(chip, h, info, dismiss);
  document.body.appendChild(label);

  // Dismiss on any click OR Esc (after a tick so we don't capture the triggering click)
  const doDismiss = () => {
    document.querySelectorAll('[data-chromadrop-hl]').forEach((el) => {
      el.style.outline = el.dataset.chromadropPrevOutline || '';
      el.style.outlineOffset = el.dataset.chromadropPrevOutlineOffset || '';
      delete el.dataset.chromadropHl;
      delete el.dataset.chromadropPrevOutline;
      delete el.dataset.chromadropPrevOutlineOffset;
    });
    label.remove();
    document.removeEventListener('click', doDismiss, true);
    document.removeEventListener('keydown', onEsc, true);
  };
  const onEsc = (e) => { if (e.key === 'Escape') doDismiss(); };

  setTimeout(() => {
    document.addEventListener('click', doDismiss, true);
    document.addEventListener('keydown', onEsc, true);
  }, 200);
}
