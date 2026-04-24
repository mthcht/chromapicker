/* ==========================================================
   Chromapicker - popup controller
   ========================================================== */

/* ---------- i18n ---------- */
/**
 * Safely fetch a localized message with fallback to the element's
 * original text content if the key is missing (won't happen in
 * production but keeps development safe).
 */
function i18n(key, substitutions) {
  try {
    const msg = chrome.i18n.getMessage(key, substitutions);
    return msg || key;
  } catch (_) {
    return key;
  }
}

/**
 * Walks every [data-i18n] element in the DOM and replaces its text
 * with the localized string. Called once on DOMContentLoaded.
 */
function applyI18n(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    const msg = i18n(key);
    if (msg && msg !== key) el.textContent = msg;
  });
  // Also translate title attributes where data-i18n-title is set
  root.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.dataset.i18nTitle;
    const msg = i18n(key);
    if (msg && msg !== key) el.title = msg;
  });
}

// Apply translations as soon as the DOM is parsed
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => applyI18n());
} else {
  applyI18n();
}

const el = {
  pick: document.getElementById('pick'),
  swatch: document.getElementById('swatch'),
  halo: document.getElementById('halo'),
  hex: document.getElementById('hex'),        // large hex printed on the swatch
  hexValue: document.getElementById('hexValue'), // hex row in codes
  rgb: document.getElementById('rgb'),
  hsl: document.getElementById('hsl'),
  timestamp: document.getElementById('timestamp'),
  historyGrid: document.getElementById('historyGrid'),
  clear: document.getElementById('clear'),
  toast: document.getElementById('toast'),
  codes: document.querySelectorAll('.code'),
  // Export sheet
  exportBtn: document.getElementById('export'),
  sheet: document.getElementById('sheet'),
  sheetClose: document.getElementById('sheetClose'),
  sheetCount: document.getElementById('sheetCount'),
  tabs: document.querySelectorAll('.tab'),
  preview: document.getElementById('preview'),
  copyExport: document.getElementById('copyExport'),
  downloadExport: document.getElementById('downloadExport'),
  downloadExt: document.getElementById('downloadExt'),
  // Extract & palette
  extract: document.getElementById('extract'),
  paletteSheet: document.getElementById('paletteSheet'),
  paletteClose: document.getElementById('paletteClose'),
  paletteCount: document.getElementById('paletteCount'),
  paletteGrid: document.getElementById('paletteGrid'),
  paletteSaveAll: document.getElementById('paletteSaveAll'),
  paletteCopyAll: document.getElementById('paletteCopyAll'),
  // Mixer
  openMixer: document.getElementById('openMixer'),
  mixerSheet: document.getElementById('mixerSheet'),
  mixerClose: document.getElementById('mixerClose'),
  slotA: document.getElementById('slotA'),
  slotB: document.getElementById('slotB'),
  slotAswatch: document.getElementById('slotAswatch'),
  slotBswatch: document.getElementById('slotBswatch'),
  slotAhex: document.getElementById('slotAhex'),
  slotBhex: document.getElementById('slotBhex'),
  blendSlider: document.getElementById('blendSlider'),
  blendValue: document.getElementById('blendValue'),
  effectSelect: document.getElementById('effectSelect'),
  effectSlider: document.getElementById('effectSlider'),
  effectValue: document.getElementById('effectValue'),
  resultSwatch: document.getElementById('resultSwatch'),
  resultHex: document.getElementById('resultHex'),
  mixerCopy: document.getElementById('mixerCopy'),
  mixerSave: document.getElementById('mixerSave'),
  mixerTabs: document.querySelectorAll('.mixer .tab, #mixerSheet .tab'),
  // Slot picker
  slotPicker: document.getElementById('slotPicker'),
  slotPickerClose: document.getElementById('slotPickerClose'),
  slotPickerLabel: document.getElementById('slotPickerLabel'),
  slotPickerGrid: document.getElementById('slotPickerGrid'),
  // Harmonies
  openHarmonies: document.getElementById('openHarmonies'),
  harmoniesSheet: document.getElementById('harmoniesSheet'),
  harmoniesClose: document.getElementById('harmoniesClose'),
  harmoniesBase: document.getElementById('harmoniesBase'),
  harmonyTabs: document.querySelectorAll('#harmonyTabs .tab'),
  harmonyGrid: document.getElementById('harmonyGrid'),
  harmonyCopyAll: document.getElementById('harmonyCopyAll'),
  harmonySaveAll: document.getElementById('harmonySaveAll'),
  // Gradient
  openGradient: document.getElementById('openGradient'),
  gradientSheet: document.getElementById('gradientSheet'),
  gradientClose: document.getElementById('gradientClose'),
  gradientMeta: document.getElementById('gradientMeta'),
  gradientBand: document.getElementById('gradientBand'),
  gradientTrack: document.getElementById('gradientTrack'),
  gradientStopEdit: document.getElementById('gradientStopEdit'),
  stopSwatch: document.getElementById('stopSwatch'),
  stopSwatchInner: document.getElementById('stopSwatchInner'),
  stopHex: document.getElementById('stopHex'),
  stopPos: document.getElementById('stopPos'),
  stopDelete: document.getElementById('stopDelete'),
  gradientTypeToggles: document.querySelectorAll('.gradient__type-toggle .toggle'),
  gradientAngleWrap: document.getElementById('gradientAngleWrap'),
  gradientAngle: document.getElementById('gradientAngle'),
  angleValue: document.getElementById('angleValue'),
  gradientCssCode: document.getElementById('gradientCssCode'),
  gradientCopyCss: document.getElementById('gradientCopyCss'),
  // Image extract
  extractMenuBtn: document.getElementById('extractMenuBtn'),
  extractMenu: document.getElementById('extractMenu'),
  imageInput: document.getElementById('imageInput'),
  imageSheet: document.getElementById('imageSheet'),
  imageClose: document.getElementById('imageClose'),
  imageSheetMeta: document.getElementById('imageSheetMeta'),
  imagePreview: document.getElementById('imagePreview'),
  imageCountSlider: document.getElementById('imageCountSlider'),
  imageCountValue: document.getElementById('imageCountValue'),
  imageGrid: document.getElementById('imageGrid'),
  imageCopyAll: document.getElementById('imageCopyAll'),
  imageSaveAll: document.getElementById('imageSaveAll'),
  // New format rows
  oklch: document.getElementById('oklch'),
  lab: document.getElementById('lab'),
  cmyk: document.getElementById('cmyk'),
  cmykGamut: document.getElementById('cmykGamut'),
  p3: document.getElementById('p3'),
  p3Gamut: document.getElementById('p3Gamut'),
  // Hero badges
  contrastBadge: document.getElementById('contrastBadge'),
  contrastLabel: document.getElementById('contrastLabel'),
  deltaBadge: document.getElementById('deltaBadge'),
  deltaValue: document.getElementById('deltaValue'),
  cvdBadge: document.getElementById('cvdBadge'),
  cvdLabel: document.getElementById('cvdLabel'),
  gamutBadge: document.getElementById('gamutBadge'),
  gamutLabel: document.getElementById('gamutLabel'),
  // Tonal scale
  openScale: document.getElementById('openScale'),
  scaleSheet: document.getElementById('scaleSheet'),
  scaleClose: document.getElementById('scaleClose'),
  scaleMeta: document.getElementById('scaleMeta'),
  scaleRows: document.getElementById('scaleRows'),
  scaleExportTabs: document.querySelectorAll('#scaleExportTabs .tab'),
  scaleCode: document.getElementById('scaleCode'),
  scaleCopyCode: document.getElementById('scaleCopyCode'),
  scaleSaveAll: document.getElementById('scaleSaveAll'),
};

/* ----------------- Color conversion ------------------ */
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const bigint = parseInt(h, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgbToHsl({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function formatRgb(hex) {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${r}, ${g}, ${b})`;
}
function formatHsl(hex) {
  const { h, s, l } = rgbToHsl(hexToRgb(hex));
  return `hsl(${h}, ${s}%, ${l}%)`;
}

/* ----------------- Luminance (for choosing readable ink on swatch) ------------------ */
function relLuminance({ r, g, b }) {
  const chan = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * chan(r) + 0.7152 * chan(g) + 0.0722 * chan(b);
}

/* ----------------- Time formatter ------------------ */
function relTime(ts) {
  if (!ts) return '-';
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 5) return i18n('justNow');
  if (diff < 60) return i18n('minutesAgo', [String(Math.max(1, Math.floor(diff / 60)))]);
  if (diff < 3600) return i18n('minutesAgo', [String(Math.floor(diff / 60))]);
  if (diff < 86400) return i18n('hoursAgo', [String(Math.floor(diff / 3600))]);
  return i18n('daysAgo', [String(Math.floor(diff / 86400))]);
}

/* ----------------- Toast ------------------ */
let toastTimer;
function toast(msg) {
  el.toast.textContent = msg;
  el.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.toast.classList.remove('show'), 1400);
}

/* ----------------- Render ------------------ */
// Track last hex to detect new picks and trigger the pulse animation
let lastRenderedHex = null;

function render(state) {
  const latest = state.latest;
  const history = state.history || [];

  if (latest) {
    const hex = latest.hex;
    const hexUpper = hex.toUpperCase();

    // Hero swatch - drive the CSS --c var on both the swatch and the halo
    el.swatch.style.setProperty('--c', hex);
    el.halo.style.setProperty('--c', hex);

    // Pick a readable ink color for the hex printed on the swatch
    const lum = relLuminance(hexToRgb(hex));
    const inkColor = lum > 0.55 ? 'rgba(0,0,0,0.78)' : 'rgba(255,255,255,0.92)';
    el.hex.style.setProperty('--hex-ink', inkColor);

    el.hex.textContent = hexUpper;
    el.hexValue.textContent = hexUpper;
    el.rgb.textContent = formatRgb(hex);
    el.hsl.textContent = formatHsl(hex);
    el.timestamp.textContent = relTime(latest.time);

    // Trigger a pulse animation when the color actually changed
    if (lastRenderedHex !== hex) {
      el.swatch.classList.remove('is-new');
      // Force reflow to restart the animation
      void el.swatch.offsetWidth;
      el.swatch.classList.add('is-new');
      lastRenderedHex = hex;
    }
  } else {
    el.swatch.style.setProperty('--c', 'var(--surface-hi)');
    el.halo.style.setProperty('--c', 'var(--accent)');
    el.hex.textContent = '-';
    el.hexValue.textContent = '-';
    el.rgb.textContent = '-';
    el.hsl.textContent = '-';
    el.timestamp.textContent = i18n('nothingYet');
    lastRenderedHex = null;
  }

  if (history.length === 0) {
    el.historyGrid.innerHTML = `<p class="empty">${i18n('emptyHistory')}</p>`;
  } else {
    el.historyGrid.innerHTML = '';
    history.forEach(({ hex }) => {
      const btn = document.createElement('button');
      btn.className = 'history__item';
      btn.style.background = hex;
      btn.title = hex.toUpperCase();
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(hex.toUpperCase());
        toast(i18n('toastCopied', [hex.toUpperCase()]));
        chrome.storage.local.set({
          latest: { hex, time: Date.now() },
        });
      });
      el.historyGrid.appendChild(btn);
    });
  }
}

/* ----------------- Storage ------------------ */
async function loadState() {
  const data = await chrome.storage.local.get(['latest', 'history']);
  render(data);
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local') loadState();
});

/* ----------------- Pick color ------------------ */
/* Call the native EyeDropper API directly from the popup.
   The popup stays open during the pick - the pipette cursor works
   across the whole browser window via the native compositor,
   so sampling is pixel-perfect regardless of OS scaling. */
el.pick.addEventListener('click', async () => {
  if (typeof EyeDropper === 'undefined') {
    toast(i18n('toastEyeDropperUnavailable'));
    return;
  }
  try {
    const result = await new EyeDropper().open();
    const hex = result.sRGBHex.toLowerCase();

    const { history = [] } = await chrome.storage.local.get('history');
    const filtered = history.filter((h) => h.hex !== hex);
    filtered.unshift({ hex, time: Date.now() });
    await chrome.storage.local.set({
      latest: { hex, time: Date.now() },
      history: filtered.slice(0, 24),
    });

    await navigator.clipboard.writeText(hex.toUpperCase()).catch(() => {});
    toast(i18n('toastCaptured', [hex.toUpperCase()]));
  } catch (err) {
    if (err?.name === 'AbortError') return; // user pressed Esc
    console.error('[Chromadrop] pick failed:', err);
    toast(i18n('toastPickCancelled'));
  }
});

/* ----------------- Copy handlers ------------------ */
el.codes.forEach((btn) => {
  btn.addEventListener('click', () => {
    const format = btn.dataset.format;
    const value = btn.querySelector('.code__value').textContent;
    if (!value || value === '-') {
      toast(i18n('toastNothingToCopy'));
      return;
    }
    navigator.clipboard.writeText(value);
    toast(i18n('toastCopied', [format.toUpperCase()]));
    btn.classList.add('is-copied');
    setTimeout(() => btn.classList.remove('is-copied'), 1200);
  });
});

/* ----------------- Clear history ------------------ */
el.clear.addEventListener('click', () => {
  chrome.storage.local.set({ history: [] });
  toast(i18n('clear'));
});

/* ==========================================================
   Export palette
   ========================================================== */

const FORMATS = {
  json: { ext: 'json', mime: 'application/json', label: '.json' },
  css: { ext: 'css', mime: 'text/css', label: '.css' },
  figma: { ext: 'tokens.json', mime: 'application/json', label: '.tokens.json' },
  tailwind: { ext: 'config.js', mime: 'text/javascript', label: '.config.js' },
};

let activeFormat = 'json';

function pad(n) { return String(n).padStart(2, '0'); }

function buildJson(history) {
  const colors = history.map((c, i) => {
    const { r, g, b } = hexToRgb(c.hex);
    const { h, s, l } = rgbToHsl({ r, g, b });
    return {
      name: `color-${pad(i + 1)}`,
      hex: c.hex.toLowerCase(),
      rgb: { r, g, b },
      hsl: { h, s, l },
      pickedAt: new Date(c.time).toISOString(),
    };
  });
  return JSON.stringify({
    name: 'Chromadrop palette',
    exportedAt: new Date().toISOString(),
    count: colors.length,
    colors,
  }, null, 2);
}

function buildCss(history) {
  const lines = history.map((c, i) =>
    `  --color-${pad(i + 1)}: ${c.hex.toLowerCase()};`
  );
  return `/* Chromadrop palette - ${history.length} colors */\n:root {\n${lines.join('\n')}\n}\n`;
}

/* W3C Design Tokens format - works with Tokens Studio for Figma */
function buildFigma(history) {
  const tokens = { chromadrop: {} };
  history.forEach((c, i) => {
    tokens.chromadrop[`color-${pad(i + 1)}`] = {
      $type: 'color',
      $value: c.hex.toLowerCase(),
    };
  });
  return JSON.stringify(tokens, null, 2);
}

function buildTailwind(history) {
  const entries = history.map((c, i) =>
    `          '${pad(i + 1)}': '${c.hex.toLowerCase()}',`
  );
  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        chromadrop: {
${entries.join('\n')}
        },
      },
    },
  },
};
`;
}

const BUILDERS = {
  json: buildJson,
  css: buildCss,
  figma: buildFigma,
  tailwind: buildTailwind,
};

/* Lightweight syntax highlighting for the preview */
function highlight(code, format) {
  // Escape HTML first
  const esc = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  if (format === 'css') {
    return esc
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="com">$1</span>')
      .replace(/(--[\w-]+)(:)/g, '<span class="key">$1</span>$2')
      .replace(/(#[0-9a-fA-F]{3,8})/g, '<span class="str">$1</span>');
  }
  if (format === 'tailwind') {
    return esc
      .replace(/(\/\*\*[\s\S]*?\*\/)/g, '<span class="com">$1</span>')
      .replace(/('[^']*')/g, '<span class="str">$1</span>')
      .replace(/\b(module|require|theme|extend|colors)\b/g, '<span class="key">$1</span>');
  }
  // JSON / Figma
  return esc
    .replace(/("(?:\\.|[^"\\])*")(\s*:)/g, '<span class="key">$1</span>$2')
    .replace(/:\s*("(?:\\.|[^"\\])*")/g, (m, p1) => `: <span class="str">${p1}</span>`)
    .replace(/:\s*(-?\d+(?:\.\d+)?)/g, ': <span class="num">$1</span>');
}

async function getHistory() {
  const data = await chrome.storage.local.get(['history']);
  return data.history || [];
}

async function refreshPreview() {
  const history = await getHistory();
  el.sheetCount.textContent =
    history.length === 0
      ? 'empty - pick something first'
      : `${history.length} color${history.length === 1 ? '' : 's'}`;

  const code = history.length ? BUILDERS[activeFormat](history) : '// No colors in history yet.\n// Pick some, then come back here.';
  el.preview.innerHTML = highlight(code, activeFormat);
  el.downloadExt.textContent = ` ${FORMATS[activeFormat].label}`;
  // Cache raw code for copy/download without re-running highlighter
  el.preview.dataset.raw = code;
}

/* ----------------- Open / close sheet ------------------ */
el.exportBtn.addEventListener('click', async () => {
  await refreshPreview();
  el.sheet.setAttribute('aria-hidden', 'false');
});

function closeSheet() {
  el.sheet.setAttribute('aria-hidden', 'true');
}
el.sheetClose.addEventListener('click', closeSheet);
el.sheet.addEventListener('click', (e) => {
  // click on backdrop (not card) closes
  if (e.target === el.sheet) closeSheet();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && el.sheet.getAttribute('aria-hidden') === 'false') closeSheet();
});

/* ----------------- Tabs ------------------ */
el.tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    el.tabs.forEach((t) => t.classList.remove('is-active'));
    tab.classList.add('is-active');
    activeFormat = tab.dataset.format;
    refreshPreview();
  });
});

/* ----------------- Copy / Download ------------------ */
el.copyExport.addEventListener('click', async () => {
  const raw = el.preview.dataset.raw;
  if (!raw) return;
  await navigator.clipboard.writeText(raw);
  el.copyExport.classList.add('is-done');
  const originalHTML = el.copyExport.innerHTML;
  el.copyExport.innerHTML = 'Copied ✓';
  setTimeout(() => {
    el.copyExport.classList.remove('is-done');
    el.copyExport.innerHTML = originalHTML;
  }, 1200);
});

el.downloadExport.addEventListener('click', () => {
  const raw = el.preview.dataset.raw;
  if (!raw) return;
  const { ext, mime } = FORMATS[activeFormat];
  const stamp = new Date().toISOString().slice(0, 10);
  const filename = `chromadrop-palette-${stamp}.${ext}`;
  const blob = new Blob([raw], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast(`Saved ${filename}`);
});

/* ==========================================================
   Extract page palette
   ========================================================== */

el.extract.addEventListener('click', async () => {
  el.extract.classList.add('is-loading');
  el.paletteCount.textContent = 'Scanning…';
  el.paletteGrid.innerHTML = '';
  el.paletteSheet.setAttribute('aria-hidden', 'false');

  try {
    const res = await chrome.runtime.sendMessage({ type: 'EXTRACT' });
    if (!res?.ok) {
      el.paletteCount.textContent = 'Could not extract';
      el.paletteGrid.innerHTML =
        `<p class="palette__error">${res?.error || 'This page cannot be inspected.'}</p>`;
      return;
    }
    renderPalette(res.colors || []);
  } catch (err) {
    console.error('[Chromadrop] extract failed:', err);
    el.paletteCount.textContent = 'Error';
    el.paletteGrid.innerHTML = '<p class="palette__error">Extraction failed.</p>';
  } finally {
    el.extract.classList.remove('is-loading');
  }
});

function renderPalette(colors) {
  if (!colors.length) {
    el.paletteCount.textContent = 'No colors found';
    el.paletteGrid.innerHTML = '<p class="palette__empty">This page has no usable colors.</p>';
    return;
  }

  el.paletteCount.textContent = `${colors.length} color${colors.length === 1 ? '' : 's'}`;
  el.paletteGrid.innerHTML = '';

  colors.forEach(({ hex, count }) => {
    const item = document.createElement('button');
    item.className = 'palette__item';
    item.title = `${hex.toUpperCase()} - used ${count}×`;

    const swatch = document.createElement('div');
    swatch.className = 'palette__swatch';
    swatch.style.background = hex;

    // Scope (highlight) button
    const scope = document.createElement('button');
    scope.className = 'palette__scope';
    scope.title = `Highlight elements using ${hex.toUpperCase()}`;
    scope.innerHTML = `
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
    `;
    scope.addEventListener('click', async (e) => {
      e.stopPropagation();
      try {
        await chrome.runtime.sendMessage({ type: 'HIGHLIGHT', hex });
        toast(i18n('toastHighlighting'));
      } catch (err) {
        console.error('[Chromadrop] highlight failed:', err);
        toast(i18n('toastCouldNotHighlight'));
      }
    });
    swatch.appendChild(scope);

    const meta = document.createElement('div');
    meta.className = 'palette__meta';
    const hexLabel = document.createElement('span');
    hexLabel.className = 'palette__hex';
    hexLabel.textContent = hex.toUpperCase();
    const countLabel = document.createElement('span');
    countLabel.className = 'palette__count';
    countLabel.textContent = `×${count}`;
    meta.append(hexLabel, countLabel);

    item.append(swatch, meta);

    // Main click: copy + save as latest (don't pollute history though - keep it as preview)
    item.addEventListener('click', async () => {
      await navigator.clipboard.writeText(hex.toUpperCase());
      toast(i18n('toastCopied', [hex.toUpperCase()]));
      await chrome.storage.local.set({
        latest: { hex, time: Date.now() },
      });
    });

    el.paletteGrid.appendChild(item);
  });
}

// Copy all extracted colors to clipboard as newline-separated hexes
el.paletteCopyAll.addEventListener('click', async () => {
  const hexes = Array.from(el.paletteGrid.querySelectorAll('.palette__hex'))
    .map((x) => x.textContent);
  if (!hexes.length) {
    toast(i18n('toastNothingToCopy'));
    return;
  }
  await navigator.clipboard.writeText(hexes.join('\n'));
  toast(i18n('toastCopiedCount', [String(hexes.length)]));
  const original = el.paletteCopyAll.textContent;
  el.paletteCopyAll.textContent = `Copied ${hexes.length}`;
  el.paletteCopyAll.classList.add('is-done');
  setTimeout(() => {
    el.paletteCopyAll.textContent = original;
    el.paletteCopyAll.classList.remove('is-done');
  }, 1500);
});

// Save all extracted colors to history
el.paletteSaveAll.addEventListener('click', async () => {
  const swatches = el.paletteGrid.querySelectorAll('.palette__item');
  if (!swatches.length) return;

  const hexes = Array.from(swatches).map((s) =>
    s.querySelector('.palette__hex').textContent.toLowerCase()
  );

  const { history = [] } = await chrome.storage.local.get('history');
  const existing = new Set(history.map((h) => h.hex));
  const additions = hexes
    .filter((h) => !existing.has(h))
    .map((hex) => ({ hex, time: Date.now() }));

  const merged = [...additions, ...history].slice(0, 48); // temporarily allow more
  await chrome.storage.local.set({ history: merged.slice(0, 24) });

  toast(i18n('toastAddedToHistory', [String(additions.length)]));
  el.paletteSaveAll.textContent = `Added ${additions.length}`;
  setTimeout(() => {
    el.paletteSaveAll.textContent = 'Save all';
  }, 1500);
});

// Close palette sheet
el.paletteClose.addEventListener('click', () => {
  el.paletteSheet.setAttribute('aria-hidden', 'true');
});
el.paletteSheet.addEventListener('click', (e) => {
  if (e.target === el.paletteSheet) el.paletteSheet.setAttribute('aria-hidden', 'true');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && el.paletteSheet.getAttribute('aria-hidden') === 'false') {
    el.paletteSheet.setAttribute('aria-hidden', 'true');
  }
});

/* ==========================================================
   Mixer - OKLCH-aware blending + effects
   ========================================================== */

/* ---- Color space conversions ---- */
// sRGB → linear light
function srgbToLinear(c) {
  c /= 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function linearToSrgb(c) {
  const v = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  return Math.round(Math.max(0, Math.min(1, v)) * 255);
}

// linear sRGB → OKLab (Björn Ottosson, 2020)
function linearToOklab(r, g, b) {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
  return {
    L: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
  };
}
function oklabToLinear(L, a, b) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return {
    r: +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
  };
}

function hexToOklab(hex) {
  const { r, g, b } = hexToRgb(hex);
  return linearToOklab(srgbToLinear(r), srgbToLinear(g), srgbToLinear(b));
}
function oklabToHex(L, a, b) {
  const lin = oklabToLinear(L, a, b);
  const toHex = (v) => linearToSrgb(v).toString(16).padStart(2, '0');
  return '#' + toHex(lin.r) + toHex(lin.g) + toHex(lin.b);
}

/* ---- HSL conversion (uses existing rgbToHsl) ---- */
function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r1, g1, b1;
  if      (h < 60)  { r1 = c; g1 = x; b1 = 0; }
  else if (h < 120) { r1 = x; g1 = c; b1 = 0; }
  else if (h < 180) { r1 = 0; g1 = c; b1 = x; }
  else if (h < 240) { r1 = 0; g1 = x; b1 = c; }
  else if (h < 300) { r1 = x; g1 = 0; b1 = c; }
  else              { r1 = c; g1 = 0; b1 = x; }
  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}
function rgbToHex2(r, g, b) {
  const h = (x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0');
  return '#' + h(r) + h(g) + h(b);
}

/* ---- Blend functions per color space ---- */
function blendRGB(hexA, hexB, t) {
  const A = hexToRgb(hexA), B = hexToRgb(hexB);
  const r = A.r + (B.r - A.r) * t;
  const g = A.g + (B.g - A.g) * t;
  const b = A.b + (B.b - A.b) * t;
  return rgbToHex2(r, g, b);
}

function blendHSL(hexA, hexB, t) {
  const A = rgbToHsl(hexToRgb(hexA));
  const B = rgbToHsl(hexToRgb(hexB));
  // Shortest-path hue interpolation
  let dh = B.h - A.h;
  if (dh >  180) dh -= 360;
  if (dh < -180) dh += 360;
  const h = A.h + dh * t;
  const s = A.s + (B.s - A.s) * t;
  const l = A.l + (B.l - A.l) * t;
  const rgb = hslToRgb(h, s, l);
  return rgbToHex2(rgb.r, rgb.g, rgb.b);
}

function blendOKLCH(hexA, hexB, t) {
  // OKLCH is OKLab in cylindrical form - but blending in OKLab directly
  // is perceptually uniform and gives great results without hue wraparound.
  const A = hexToOklab(hexA);
  const B = hexToOklab(hexB);
  return oklabToHex(
    A.L + (B.L - A.L) * t,
    A.a + (B.a - A.a) * t,
    A.b + (B.b - A.b) * t
  );
}

/* ---- Effects ---- */
function applyEffect(hex, effect, amount) {
  if (effect === 'none' || amount === 0) return hex;
  const t = amount / 100;

  if (effect === 'tint')  return blendOKLCH(hex, '#ffffff', t);
  if (effect === 'shade') return blendOKLCH(hex, '#000000', t);

  if (effect === 'saturate' || effect === 'desaturate') {
    const { h, s, l } = rgbToHsl(hexToRgb(hex));
    const delta = effect === 'saturate' ? t : -t;
    const newS = Math.max(0, Math.min(100, s + delta * 100));
    const rgb = hslToRgb(h, newS, l);
    return rgbToHex2(rgb.r, rgb.g, rgb.b);
  }

  if (effect === 'warm' || effect === 'cool') {
    // Shift a/b axis in OKLab: +a = red, -a = green; +b = yellow, -b = blue.
    // Warm = more red+yellow, cool = more blue (slight green).
    const lab = hexToOklab(hex);
    const shift = effect === 'warm' ? 0.08 * t : -0.08 * t;
    return oklabToHex(lab.L, lab.a + shift * 0.5, lab.b + shift);
  }
  return hex;
}

/* ---- State ---- */
const mixer = {
  slotA: '#C6613F',
  slotB: '#1F1F1E',
  blend: 0.5,
  space: 'oklch',
  effect: 'none',
  effectAmount: 0,
};

function computeMix() {
  const blended =
    mixer.space === 'rgb'   ? blendRGB(mixer.slotA, mixer.slotB, mixer.blend) :
    mixer.space === 'hsl'   ? blendHSL(mixer.slotA, mixer.slotB, mixer.blend) :
                              blendOKLCH(mixer.slotA, mixer.slotB, mixer.blend);
  return applyEffect(blended, mixer.effect, mixer.effectAmount);
}

function renderMixer() {
  // Slots
  el.slotAswatch.style.background = mixer.slotA;
  el.slotBswatch.style.background = mixer.slotB;
  el.slotAhex.textContent = mixer.slotA.toUpperCase();
  el.slotBhex.textContent = mixer.slotB.toUpperCase();

  // Sliders
  el.blendSlider.value = Math.round(mixer.blend * 100);
  el.blendValue.textContent = `${Math.round(mixer.blend * 100)}%`;
  el.effectSelect.value = mixer.effect;
  el.effectSlider.value = mixer.effectAmount;
  el.effectSlider.disabled = mixer.effect === 'none';
  el.effectValue.textContent = mixer.effect === 'none' ? '-' : `${mixer.effectAmount}%`;

  // Tabs
  el.mixerTabs.forEach((t) => {
    t.classList.toggle('is-active', t.dataset.space === mixer.space);
  });

  // Result
  const result = computeMix();
  el.resultSwatch.style.background = result;
  el.resultHex.textContent = result.toUpperCase();
  // Readable ink on result
  const lum = relLuminance(hexToRgb(result));
  el.resultSwatch.style.setProperty('--result-ink', lum > 0.55 ? 'rgba(0,0,0,0.78)' : 'rgba(255,255,255,0.92)');
}

/* ---- Slot picker ---- */
let activeSlot = null;

async function openSlotPicker(slot) {
  activeSlot = slot;
  el.slotPickerLabel.textContent = `Choose color for slot ${slot}`;
  el.slotPickerGrid.innerHTML = '';

  const { history = [], latest } = await chrome.storage.local.get(['history', 'latest']);
  const picks = new Set();

  // Latest first if present
  if (latest?.hex) picks.add(latest.hex.toLowerCase());
  history.forEach((h) => picks.add(h.hex.toLowerCase()));

  if (!picks.size) {
    el.slotPickerGrid.innerHTML = `<p class="slot-picker__empty">${i18n('emptyHistoryPrompt')}</p>`;
  } else {
    picks.forEach((hex) => {
      const btn = document.createElement('button');
      btn.className = 'slot-picker__item';
      btn.style.background = hex;
      btn.title = hex.toUpperCase();
      btn.addEventListener('click', () => {
        if (activeSlot === 'A') mixer.slotA = hex;
        else                    mixer.slotB = hex;
        renderMixer();
        closeSlotPicker();
      });
      el.slotPickerGrid.appendChild(btn);
    });
  }

  el.slotPicker.setAttribute('aria-hidden', 'false');
}
function closeSlotPicker() {
  el.slotPicker.setAttribute('aria-hidden', 'true');
  activeSlot = null;
}

el.slotA.addEventListener('click', () => openSlotPicker('A'));
el.slotB.addEventListener('click', () => openSlotPicker('B'));
el.slotPickerClose.addEventListener('click', closeSlotPicker);
el.slotPicker.addEventListener('click', (e) => {
  if (e.target === el.slotPicker) closeSlotPicker();
});

/* ---- Mixer open/close ---- */
async function openMixer() {
  // Auto-fill slot A with the latest color if available
  const { latest, history = [] } = await chrome.storage.local.get(['latest', 'history']);
  if (latest?.hex) mixer.slotA = latest.hex;
  // Slot B: second-most-recent color, or dark surface
  if (history.length > 1 && history[1].hex !== mixer.slotA) {
    mixer.slotB = history[1].hex;
  } else if (history.length === 1 && history[0].hex === mixer.slotA) {
    mixer.slotB = '#1f1f1e';
  }
  renderMixer();
  el.mixerSheet.setAttribute('aria-hidden', 'false');
}
function closeMixer() {
  el.mixerSheet.setAttribute('aria-hidden', 'true');
}

el.openMixer.addEventListener('click', openMixer);
el.mixerClose.addEventListener('click', closeMixer);
el.mixerSheet.addEventListener('click', (e) => {
  if (e.target === el.mixerSheet) closeMixer();
});

/* ---- Control wiring ---- */
el.blendSlider.addEventListener('input', (e) => {
  mixer.blend = parseInt(e.target.value, 10) / 100;
  renderMixer();
});

el.mixerTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    mixer.space = tab.dataset.space;
    renderMixer();
  });
});

el.effectSelect.addEventListener('change', (e) => {
  mixer.effect = e.target.value;
  if (mixer.effect === 'none') mixer.effectAmount = 0;
  else if (mixer.effectAmount === 0) mixer.effectAmount = 30; // sensible default
  renderMixer();
});

el.effectSlider.addEventListener('input', (e) => {
  mixer.effectAmount = parseInt(e.target.value, 10);
  renderMixer();
});

/* ---- Actions ---- */
el.mixerCopy.addEventListener('click', async () => {
  const hex = computeMix().toUpperCase();
  await navigator.clipboard.writeText(hex);
  toast(i18n('toastCopied', [hex]));
  const prev = el.mixerCopy.textContent;
  el.mixerCopy.textContent = 'Copied ✓';
  el.mixerCopy.classList.add('is-done');
  setTimeout(() => {
    el.mixerCopy.textContent = prev;
    el.mixerCopy.classList.remove('is-done');
  }, 1200);
});

el.mixerSave.addEventListener('click', async () => {
  const hex = computeMix().toLowerCase();
  const { history = [] } = await chrome.storage.local.get('history');
  const filtered = history.filter((h) => h.hex !== hex);
  filtered.unshift({ hex, time: Date.now() });
  await chrome.storage.local.set({
    latest: { hex, time: Date.now() },
    history: filtered.slice(0, 24),
  });
  toast(i18n('toastSaved', [hex.toUpperCase()]));
  const prev = el.mixerSave.textContent;
  el.mixerSave.textContent = 'Saved ✓';
  setTimeout(() => { el.mixerSave.textContent = prev; }, 1200);
});

/* ---- Escape to close ---- */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (el.slotPicker.getAttribute('aria-hidden') === 'false') {
    closeSlotPicker();
  } else if (el.mixerSheet.getAttribute('aria-hidden') === 'false') {
    closeMixer();
  }
});

/* ==========================================================
   HARMONIES - 6 harmony types derived from a base color
   ========================================================== */

/*
 * Work in OKLCH polar form so hue rotations feel perceptually uniform.
 * OKLCH = (L, C, h) where C = sqrt(a² + b²), h = atan2(b, a).
 */
function oklabToOklch({ L, a, b }) {
  const C = Math.sqrt(a * a + b * b);
  let h = Math.atan2(b, a) * 180 / Math.PI;
  if (h < 0) h += 360;
  return { L, C, h };
}
function oklchToOklab({ L, C, h }) {
  const hRad = h * Math.PI / 180;
  return { L, a: C * Math.cos(hRad), b: C * Math.sin(hRad) };
}
function hexToOklch(hex) { return oklabToOklch(hexToOklab(hex)); }
function oklchToHex({ L, C, h }) {
  const { a, b } = oklchToOklab({ L, C, h });
  return oklabToHex(L, a, b);
}

function rotateHue(hex, degrees) {
  const lch = hexToOklch(hex);
  return oklchToHex({ L: lch.L, C: lch.C, h: (lch.h + degrees + 360) % 360 });
}

function harmonyFor(hex, type) {
  const base = hexToOklch(hex);
  const clampL = (L) => Math.max(0.02, Math.min(0.98, L));

  switch (type) {
    case 'complementary':
      return [hex, rotateHue(hex, 180)];

    case 'analogous':
      return [rotateHue(hex, -30), hex, rotateHue(hex, 30)];

    case 'triadic':
      return [hex, rotateHue(hex, 120), rotateHue(hex, 240)];

    case 'split':
      return [hex, rotateHue(hex, 150), rotateHue(hex, 210)];

    case 'tetradic':
      return [hex, rotateHue(hex, 90), rotateHue(hex, 180), rotateHue(hex, 270)];

    case 'mono': {
      // 5 variations of the base color: darker → base → lighter
      return [-0.28, -0.14, 0, 0.14, 0.28].map((dL) =>
        oklchToHex({ L: clampL(base.L + dL), C: base.C * (1 - Math.abs(dL) * 0.35), h: base.h })
      );
    }
  }
  return [hex];
}

const harmonyState = { baseHex: '#C6613F', type: 'complementary', colors: [] };

function renderHarmonies() {
  const { baseHex, type } = harmonyState;
  const colors = harmonyFor(baseHex, type);
  harmonyState.colors = colors;

  el.harmoniesBase.textContent = `from ${baseHex.toUpperCase()}`;

  el.harmonyTabs.forEach((t) => {
    t.classList.toggle('is-active', t.dataset.harm === type);
  });

  el.harmonyGrid.innerHTML = '';
  colors.forEach((hex) => {
    const btn = document.createElement('button');
    btn.className = 'harmony__swatch';
    if (hex.toLowerCase() === baseHex.toLowerCase()) btn.classList.add('is-base');
    btn.style.background = hex;
    btn.textContent = hex.toUpperCase();
    const lum = relLuminance(hexToRgb(hex));
    btn.style.setProperty('--harm-ink', lum > 0.55 ? 'rgba(0,0,0,0.78)' : 'rgba(255,255,255,0.92)');

    btn.addEventListener('click', async () => {
      await navigator.clipboard.writeText(hex.toUpperCase());
      toast(i18n('toastCopied', [hex.toUpperCase()]));
    });
    btn.addEventListener('contextmenu', async (e) => {
      e.preventDefault();
      const { history = [] } = await chrome.storage.local.get('history');
      const h = hex.toLowerCase();
      const filtered = history.filter((x) => x.hex !== h);
      filtered.unshift({ hex: h, time: Date.now() });
      await chrome.storage.local.set({
        latest: { hex: h, time: Date.now() },
        history: filtered.slice(0, 24),
      });
      toast(i18n('toastSaved', [hex.toUpperCase()]));
    });
    el.harmonyGrid.appendChild(btn);
  });
}

async function openHarmonies() {
  const { latest } = await chrome.storage.local.get('latest');
  harmonyState.baseHex = latest?.hex || '#C6613F';
  renderHarmonies();
  el.harmoniesSheet.setAttribute('aria-hidden', 'false');
}
function closeHarmonies() {
  el.harmoniesSheet.setAttribute('aria-hidden', 'true');
}

el.openHarmonies.addEventListener('click', openHarmonies);
el.harmoniesClose.addEventListener('click', closeHarmonies);
el.harmoniesSheet.addEventListener('click', (e) => {
  if (e.target === el.harmoniesSheet) closeHarmonies();
});
el.harmonyTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    harmonyState.type = tab.dataset.harm;
    renderHarmonies();
  });
});

el.harmonyCopyAll.addEventListener('click', async () => {
  const hexes = harmonyState.colors.map((c) => c.toUpperCase());
  await navigator.clipboard.writeText(hexes.join('\n'));
  toast(i18n('toastCopiedCount', [String(hexes.length)]));
});
el.harmonySaveAll.addEventListener('click', async () => {
  const { history = [] } = await chrome.storage.local.get('history');
  const existing = new Set(history.map((h) => h.hex));
  const additions = harmonyState.colors
    .map((h) => h.toLowerCase())
    .filter((h) => !existing.has(h))
    .map((hex) => ({ hex, time: Date.now() }));
  const merged = [...additions, ...history].slice(0, 24);
  await chrome.storage.local.set({ history: merged });
  toast(i18n('toastAddedToHistory', [String(additions.length)]));
});

/* ==========================================================
   GRADIENT BUILDER
   ========================================================== */

const gradientState = {
  stops: [
    { hex: '#C6613F', pos: 0 },
    { hex: '#1F1F1E', pos: 100 },
  ],
  selected: 0,
  type: 'linear',
  angle: 90,
};

function gradientCss() {
  const sorted = [...gradientState.stops].sort((a, b) => a.pos - b.pos);
  const stops = sorted.map((s) => `${s.hex} ${s.pos}%`).join(', ');
  if (gradientState.type === 'radial') {
    return `radial-gradient(circle, ${stops})`;
  }
  if (gradientState.type === 'conic') {
    return `conic-gradient(from ${gradientState.angle}deg, ${stops})`;
  }
  return `linear-gradient(${gradientState.angle}deg, ${stops})`;
}

function renderGradient() {
  const css = gradientCss();
  el.gradientBand.style.background = css;

  // Render stops on the track
  el.gradientTrack.innerHTML = '';
  gradientState.stops.forEach((stop, i) => {
    const node = document.createElement('div');
    node.className = 'gradient__stop' + (i === gradientState.selected ? ' is-selected' : '');
    node.style.left = `${stop.pos}%`;
    node.style.setProperty('--stop-c', stop.hex);
    node.dataset.index = String(i);
    const dot = document.createElement('div');
    dot.className = 'gradient__stop-dot';
    node.appendChild(dot);
    el.gradientTrack.appendChild(node);
  });

  // Selected stop fields
  const sel = gradientState.stops[gradientState.selected];
  if (sel) {
    el.stopSwatchInner.style.background = sel.hex;
    // Only update the field if it's not focused (don't stomp on user typing)
    if (document.activeElement !== el.stopHex) {
      el.stopHex.value = sel.hex.toUpperCase();
    }
    if (document.activeElement !== el.stopPos) {
      el.stopPos.value = Math.round(sel.pos);
    }
  }
  el.stopDelete.disabled = gradientState.stops.length <= 2;

  // Type + angle UI
  el.gradientTypeToggles.forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.type === gradientState.type);
  });
  // Angle is meaningful for linear + conic, not radial
  const showAngle = gradientState.type !== 'radial';
  el.gradientAngleWrap.style.display = showAngle ? '' : 'none';
  el.angleValue.textContent = `${gradientState.angle}°`;
  el.gradientAngle.value = gradientState.angle;

  // Meta line
  el.gradientMeta.textContent =
    `${gradientState.stops.length} stops · ${gradientState.type}${showAngle ? ` ${gradientState.angle}°` : ''}`;

  // CSS output (with `background:` prefix so it pastes as a ready rule)
  el.gradientCssCode.textContent = `background: ${css};`;
}

async function openGradient() {
  // Seed with latest color + black if first open
  const { latest, history = [] } = await chrome.storage.local.get(['latest', 'history']);
  if (latest?.hex) gradientState.stops[0].hex = latest.hex;
  if (history[1]?.hex && history[1].hex !== gradientState.stops[0].hex) {
    gradientState.stops[1].hex = history[1].hex;
  }
  gradientState.selected = 0;
  renderGradient();
  el.gradientSheet.setAttribute('aria-hidden', 'false');
}
function closeGradient() {
  el.gradientSheet.setAttribute('aria-hidden', 'true');
}

el.openGradient.addEventListener('click', openGradient);
el.gradientClose.addEventListener('click', closeGradient);
el.gradientSheet.addEventListener('click', (e) => {
  if (e.target === el.gradientSheet) closeGradient();
});

/* --- Stop interactions --- */

// Click on track: either select a stop or add a new one
el.gradientTrack.addEventListener('click', (e) => {
  const stopEl = e.target.closest('.gradient__stop');
  if (stopEl) {
    gradientState.selected = parseInt(stopEl.dataset.index, 10);
    renderGradient();
    return;
  }
  // Click on empty track → insert a stop at that position
  const rect = el.gradientTrack.getBoundingClientRect();
  const pos = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
  // Use the interpolated color at that position as the new stop's color
  const newHex = sampleGradientAt(pos);
  gradientState.stops.push({ hex: newHex, pos });
  gradientState.selected = gradientState.stops.length - 1;
  renderGradient();
});

function sampleGradientAt(pos) {
  const sorted = [...gradientState.stops].sort((a, b) => a.pos - b.pos);
  if (pos <= sorted[0].pos) return sorted[0].hex;
  if (pos >= sorted[sorted.length - 1].pos) return sorted[sorted.length - 1].hex;
  for (let i = 0; i < sorted.length - 1; i++) {
    const a = sorted[i], b = sorted[i + 1];
    if (pos >= a.pos && pos <= b.pos) {
      const t = (pos - a.pos) / (b.pos - a.pos);
      return blendOKLCH(a.hex, b.hex, t);
    }
  }
  return sorted[0].hex;
}

// Drag stops along the track
let dragState = null;
el.gradientTrack.addEventListener('mousedown', (e) => {
  const stopEl = e.target.closest('.gradient__stop');
  if (!stopEl) return;
  e.preventDefault();
  const idx = parseInt(stopEl.dataset.index, 10);
  gradientState.selected = idx;
  dragState = { index: idx, trackRect: el.gradientTrack.getBoundingClientRect() };
  stopEl.classList.add('is-dragging');
  renderGradient();
});
window.addEventListener('mousemove', (e) => {
  if (!dragState) return;
  const rect = dragState.trackRect;
  const pos = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
  gradientState.stops[dragState.index].pos = pos;
  renderGradient();
});
window.addEventListener('mouseup', () => {
  if (dragState) {
    dragState = null;
    renderGradient();
  }
});

// Stop editor inputs
el.stopHex.addEventListener('input', () => {
  const v = el.stopHex.value.trim();
  if (/^#?[0-9a-fA-F]{6}$/.test(v)) {
    const hex = (v.startsWith('#') ? v : '#' + v).toLowerCase();
    gradientState.stops[gradientState.selected].hex = hex;
    renderGradient();
  }
});
el.stopPos.addEventListener('input', () => {
  const n = parseFloat(el.stopPos.value);
  if (!isNaN(n)) {
    gradientState.stops[gradientState.selected].pos = Math.max(0, Math.min(100, n));
    renderGradient();
  }
});

// Open the slot picker to choose a color from history for the current stop
el.stopSwatch.addEventListener('click', async () => {
  // Reuse the slot picker grid
  el.slotPickerLabel.textContent = 'Choose color for this stop';
  el.slotPickerGrid.innerHTML = '';
  const { history = [], latest } = await chrome.storage.local.get(['history', 'latest']);
  const picks = new Set();
  if (latest?.hex) picks.add(latest.hex.toLowerCase());
  history.forEach((h) => picks.add(h.hex.toLowerCase()));
  if (!picks.size) {
    el.slotPickerGrid.innerHTML = `<p class="slot-picker__empty">${i18n('emptyHistory')}</p>`;
  } else {
    picks.forEach((hex) => {
      const btn = document.createElement('button');
      btn.className = 'slot-picker__item';
      btn.style.background = hex;
      btn.title = hex.toUpperCase();
      btn.addEventListener('click', () => {
        gradientState.stops[gradientState.selected].hex = hex;
        renderGradient();
        el.slotPicker.setAttribute('aria-hidden', 'true');
      });
      el.slotPickerGrid.appendChild(btn);
    });
  }
  el.slotPicker.setAttribute('aria-hidden', 'false');
});

el.stopDelete.addEventListener('click', () => {
  if (gradientState.stops.length <= 2) return;
  gradientState.stops.splice(gradientState.selected, 1);
  gradientState.selected = Math.max(0, gradientState.selected - 1);
  renderGradient();
});

el.gradientTypeToggles.forEach((btn) => {
  btn.addEventListener('click', () => {
    gradientState.type = btn.dataset.type;
    renderGradient();
  });
});
el.gradientAngle.addEventListener('input', (e) => {
  gradientState.angle = parseInt(e.target.value, 10);
  renderGradient();
});

el.gradientCopyCss.addEventListener('click', async () => {
  await navigator.clipboard.writeText(`background: ${gradientCss()};`);
  toast(i18n('toastCodeCopied'));
});

/* ==========================================================
   IMAGE PALETTE EXTRACTION (k-means on pixel colors)
   ========================================================== */

// Extract menu toggle
el.extractMenuBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const open = el.extractMenu.getAttribute('aria-hidden') === 'false';
  el.extractMenu.setAttribute('aria-hidden', open ? 'true' : 'false');
});
document.addEventListener('click', () => {
  el.extractMenu.setAttribute('aria-hidden', 'true');
});

// Menu items
document.querySelectorAll('.extract-menu__item').forEach((item) => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();
    el.extractMenu.setAttribute('aria-hidden', 'true');
    const source = item.dataset.source;
    if (source === 'page') {
      el.extract.click();
    } else if (source === 'image') {
      el.imageInput.click();
    }
  });
});

let loadedImageBitmap = null;

el.imageInput.addEventListener('change', (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    loadedImageBitmap = img;
    el.imagePreview.innerHTML = '';
    const preview = document.createElement('img');
    preview.src = url;
    el.imagePreview.appendChild(preview);
    el.imageSheet.setAttribute('aria-hidden', 'false');
    el.imageSheetMeta.textContent = `${img.naturalWidth}×${img.naturalHeight}`;
    runImageExtraction();
  };
  img.onerror = () => {
    toast(i18n('toastImageReadFailed'));
  };
  img.src = url;
  // Clear input so re-picking the same file works
  e.target.value = '';
});

el.imageCountSlider.addEventListener('input', (e) => {
  el.imageCountValue.textContent = e.target.value;
  if (loadedImageBitmap) runImageExtraction();
});

function runImageExtraction() {
  if (!loadedImageBitmap) return;
  const k = parseInt(el.imageCountSlider.value, 10);

  // Downsample for performance: sample every ~10,000px max
  const maxSide = 200;
  const scale = Math.min(maxSide / loadedImageBitmap.naturalWidth, maxSide / loadedImageBitmap.naturalHeight, 1);
  const w = Math.max(1, Math.floor(loadedImageBitmap.naturalWidth * scale));
  const h = Math.max(1, Math.floor(loadedImageBitmap.naturalHeight * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(loadedImageBitmap, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;

  // Collect opaque pixels
  const pixels = [];
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 200) continue; // skip near-transparent
    pixels.push([data[i], data[i + 1], data[i + 2]]);
  }
  if (!pixels.length) {
    el.imageGrid.innerHTML = '<p class="palette__empty">No opaque pixels found.</p>';
    return;
  }

  const clusters = kMeans(pixels, k);
  const sorted = clusters.sort((a, b) => b.count - a.count);

  el.imageGrid.innerHTML = '';
  sorted.forEach(({ center, count }) => {
    const [r, g, b] = center.map((c) => Math.round(c));
    const hex = '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');

    const item = document.createElement('button');
    item.className = 'palette__item';
    item.title = `${hex.toUpperCase()} - ${count} px`;

    const sw = document.createElement('div');
    sw.className = 'palette__swatch';
    sw.style.background = hex;

    const meta = document.createElement('div');
    meta.className = 'palette__meta';
    const hexLabel = document.createElement('span');
    hexLabel.className = 'palette__hex';
    hexLabel.textContent = hex.toUpperCase();
    const pctLabel = document.createElement('span');
    pctLabel.className = 'palette__count';
    pctLabel.textContent = `${Math.round((count / pixels.length) * 100)}%`;
    meta.append(hexLabel, pctLabel);

    item.append(sw, meta);
    item.addEventListener('click', async () => {
      await navigator.clipboard.writeText(hex.toUpperCase());
      toast(i18n('toastCopied', [hex.toUpperCase()]));
      await chrome.storage.local.set({ latest: { hex, time: Date.now() } });
    });
    el.imageGrid.appendChild(item);
  });

  el.imageSheetMeta.textContent = `${sorted.length} colors · ${pixels.length.toLocaleString()} pixels sampled`;
}

/* Mini k-means in RGB space. Pragmatic choice - RGB clustering is
 * visually adequate for image palettes and much faster than OKLab
 * for thousands of pixels. Still good results, no math surprises. */
function kMeans(points, k, maxIter = 12) {
  if (points.length <= k) {
    return points.map((p) => ({ center: p, count: 1 }));
  }

  // k-means++ seeding for better initial centers
  const centers = [points[Math.floor(Math.random() * points.length)]];
  while (centers.length < k) {
    const distances = points.map((p) => {
      let minD = Infinity;
      for (const c of centers) {
        const d = (p[0]-c[0])**2 + (p[1]-c[1])**2 + (p[2]-c[2])**2;
        if (d < minD) minD = d;
      }
      return minD;
    });
    const total = distances.reduce((a, b) => a + b, 0);
    if (total === 0) break;
    let r = Math.random() * total;
    for (let i = 0; i < points.length; i++) {
      r -= distances[i];
      if (r <= 0) { centers.push(points[i]); break; }
    }
  }

  let assignments = new Array(points.length).fill(0);
  for (let iter = 0; iter < maxIter; iter++) {
    let changed = 0;
    // Assignment step
    for (let i = 0; i < points.length; i++) {
      let best = 0, bestD = Infinity;
      const p = points[i];
      for (let c = 0; c < centers.length; c++) {
        const cc = centers[c];
        const d = (p[0]-cc[0])**2 + (p[1]-cc[1])**2 + (p[2]-cc[2])**2;
        if (d < bestD) { bestD = d; best = c; }
      }
      if (assignments[i] !== best) { assignments[i] = best; changed++; }
    }
    // Update step
    const sums = centers.map(() => [0, 0, 0, 0]); // r, g, b, count
    for (let i = 0; i < points.length; i++) {
      const a = assignments[i], p = points[i];
      sums[a][0] += p[0];
      sums[a][1] += p[1];
      sums[a][2] += p[2];
      sums[a][3] += 1;
    }
    for (let c = 0; c < centers.length; c++) {
      if (sums[c][3] > 0) {
        centers[c] = [
          sums[c][0] / sums[c][3],
          sums[c][1] / sums[c][3],
          sums[c][2] / sums[c][3],
        ];
      }
    }
    if (changed === 0) break;
  }

  // Count cluster sizes
  const counts = new Array(centers.length).fill(0);
  for (const a of assignments) counts[a]++;
  return centers.map((center, i) => ({ center, count: counts[i] }))
    .filter((c) => c.count > 0);
}

el.imageClose.addEventListener('click', () => {
  el.imageSheet.setAttribute('aria-hidden', 'true');
});
el.imageSheet.addEventListener('click', (e) => {
  if (e.target === el.imageSheet) el.imageSheet.setAttribute('aria-hidden', 'true');
});

el.imageCopyAll.addEventListener('click', async () => {
  const hexes = Array.from(el.imageGrid.querySelectorAll('.palette__hex')).map((x) => x.textContent);
  if (!hexes.length) { toast(i18n('toastNothingToCopy')); return; }
  await navigator.clipboard.writeText(hexes.join('\n'));
  toast(i18n('toastCopiedCount', [String(hexes.length)]));
});

el.imageSaveAll.addEventListener('click', async () => {
  const hexes = Array.from(el.imageGrid.querySelectorAll('.palette__hex'))
    .map((x) => x.textContent.toLowerCase());
  if (!hexes.length) return;
  const { history = [] } = await chrome.storage.local.get('history');
  const existing = new Set(history.map((h) => h.hex));
  const additions = hexes
    .filter((h) => !existing.has(h))
    .map((hex) => ({ hex, time: Date.now() }));
  const merged = [...additions, ...history].slice(0, 24);
  await chrome.storage.local.set({ history: merged });
  toast(i18n('toastAddedToHistory', [String(additions.length)]));
});

/* ==========================================================
   Unified Escape handler - closes the topmost open sheet
   ========================================================== */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const sheets = [
    [el.slotPicker, () => el.slotPicker.setAttribute('aria-hidden', 'true')],
    [el.harmoniesSheet, closeHarmonies],
    [el.gradientSheet, closeGradient],
    [el.imageSheet, () => el.imageSheet.setAttribute('aria-hidden', 'true')],
  ];
  for (const [node, close] of sheets) {
    if (node.getAttribute('aria-hidden') === 'false') { close(); break; }
  }
});

/* ==========================================================
   EXTENDED COLOR MATH — OKLCH/Lab/CMYK/P3 strings
   Delta E CIEDE2000, WCAG + APCA contrast, CVD handling
   ========================================================== */

/* --- Format: OKLCH string for code row --- */
function formatOklch(hex) {
  const { L, C, h } = hexToOklch(hex);
  // Clamp / round to CSS-typical precision
  const Lpct = (L * 100).toFixed(1);
  const Cfmt = C.toFixed(3);
  const hFmt = isNaN(h) ? 0 : Math.round(h);
  return `oklch(${Lpct}% ${Cfmt} ${hFmt})`;
}

/* --- CIE Lab string (via OKLab→approx Lab? No - direct D65 Lab) --- */
// sRGB -> linear
function srgbLinear(c) {
  c /= 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
// linear sRGB -> XYZ (D65)
function rgbToXyz(r, g, b) {
  const R = srgbLinear(r), G = srgbLinear(g), B = srgbLinear(b);
  return {
    X: R * 0.4124564 + G * 0.3575761 + B * 0.1804375,
    Y: R * 0.2126729 + G * 0.7151522 + B * 0.0721750,
    Z: R * 0.0193339 + G * 0.1191920 + B * 0.9503041,
  };
}
// XYZ (D65) -> CIE Lab
function xyzToLab(X, Y, Z) {
  // D65 whitepoint
  const Xn = 0.95047, Yn = 1.00000, Zn = 1.08883;
  const fx = labF(X / Xn), fy = labF(Y / Yn), fz = labF(Z / Zn);
  return {
    L: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}
function labF(t) {
  const delta = 6 / 29;
  return t > Math.pow(delta, 3) ? Math.cbrt(t) : t / (3 * delta * delta) + 4 / 29;
}
function hexToLab(hex) {
  const { r, g, b } = hexToRgb(hex);
  const { X, Y, Z } = rgbToXyz(r, g, b);
  return xyzToLab(X, Y, Z);
}
function formatLab(hex) {
  const { L, a, b } = hexToLab(hex);
  return `lab(${L.toFixed(1)}% ${a.toFixed(1)} ${b.toFixed(1)})`;
}

/* --- CMYK (naive, not color-managed — for quick reference only) --- */
function rgbToCmyk(r, g, b) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  const c = (1 - rn - k) / (1 - k);
  const m = (1 - gn - k) / (1 - k);
  const y = (1 - bn - k) / (1 - k);
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}
function formatCmyk(hex) {
  const { r, g, b } = hexToRgb(hex);
  const { c, m, y, k } = rgbToCmyk(r, g, b);
  return `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
}
/* CMYK out-of-gamut: highly saturated bright colors (especially pure blues
 * and vivid greens) cannot be reproduced in CMYK. Rule of thumb: if the color
 * lies outside the bounding chroma achievable after CMYK round-trip, warn.
 * We approximate: if the closest CMYK-representable color differs by ΔE>5, flag. */
function cmykOutOfGamut(hex) {
  // Simple heuristic: convert to CMYK, convert back to sRGB via same naive math,
  // measure ΔE. If large, out of gamut.
  const { r, g, b } = hexToRgb(hex);
  const { c, m, y, k } = rgbToCmyk(r, g, b);
  // CMYK -> RGB
  const rb = 255 * (1 - c / 100) * (1 - k / 100);
  const gb = 255 * (1 - m / 100) * (1 - k / 100);
  const bb = 255 * (1 - y / 100) * (1 - k / 100);
  // Round-trip is lossless for naive formula. Need a different check —
  // use standard commercial CMYK gamut proxy: luminance + saturation thresholds.
  // Colors with high saturation AND high brightness are typically out-of-gamut.
  const { s, l } = rgbToHsl({ r, g, b });
  // Known trouble zones: saturated blues, saturated bright oranges, pure greens
  if (s > 80 && l > 45 && l < 80) return true;
  // Electric blues
  if (b > 200 && r < 80 && g < 80) return true;
  // Pure neon greens
  if (g > 200 && r < 100 && b < 100) return true;
  return false;
}

/* --- Display-P3 output + wide-gamut detection --- */
// sRGB linear -> Display P3 linear, then gamma-encode
// Conversion matrix from Bruce Lindbloom / CSS Color Level 4 (Bradford-adapted D65 to D65):
// sRGB and P3 share the same D65 whitepoint, so only the primaries matrix differs.
function rgbToDisplayP3(r, g, b) {
  const R = srgbLinear(r), G = srgbLinear(g), B = srgbLinear(b);
  // sRGB linear -> XYZ D65 -> P3 D65 linear
  // Combined matrix (sRGB -> P3):
  const Rp =  0.8224621 * R + 0.1775380 * G + 0.0000000 * B;
  const Gp =  0.0331941 * R + 0.9668058 * G + 0.0000000 * B;
  const Bp =  0.0170827 * R + 0.0723974 * G + 0.9105199 * B;
  return { R: Rp, G: Gp, B: Bp };
}
function formatP3(hex) {
  const { r, g, b } = hexToRgb(hex);
  const { R, G, B } = rgbToDisplayP3(r, g, b);
  // P3 uses the same sRGB transfer curve in CSS Color 4
  return `color(display-p3 ${R.toFixed(3)} ${G.toFixed(3)} ${B.toFixed(3)})`;
}
/* A picked sRGB color is always inside the P3 gamut (P3 is a superset).
 * But the user may wonder if the ORIGINAL pixel was wide-gamut. The
 * EyeDropper API always returns sRGB-clamped values — there's no way
 * to detect P3 source content from within the extension. So the P3
 * gamut flag on sRGB picks is always negative. We show the flag only
 * on colors that would benefit meaningfully from P3 representation
 * (highly saturated colors near the sRGB gamut boundary). */
function p3GamutExtended(hex) {
  const { r, g, b } = hexToRgb(hex);
  // "Near the sRGB boundary" = at least one channel is 255 AND at least
  // one channel is close to 0 (pure/saturated color that would show
  // real difference in a P3 rendering context).
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max === 255 && min < 60;
}

/* --- WCAG 2.x contrast ratio --- */
function wcagContrast(hex1, hex2) {
  const L1 = relLuminance(hexToRgb(hex1));
  const L2 = relLuminance(hexToRgb(hex2));
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}

/* --- APCA (Lc) contrast — simplified SAPC-8 implementation.
 * APCA is directional (text on background). Lc value, not ratio.
 * |Lc| >= 60 acceptable for body text, >= 75 preferred, >= 90 for fine text. */
function apcaLc(textHex, bgHex) {
  const textRgb = hexToRgb(textHex);
  const bgRgb = hexToRgb(bgHex);
  // Convert to soft-clamped luminance per SAPC/APCA spec
  const smoothY = (rgb) => {
    const R = Math.pow(rgb.r / 255, 2.4);
    const G = Math.pow(rgb.g / 255, 2.4);
    const B = Math.pow(rgb.b / 255, 2.4);
    return 0.2126729 * R + 0.7151522 * G + 0.0721750 * B;
  };
  const Ytxt = smoothY(textRgb);
  const Ybg  = smoothY(bgRgb);
  // APCA soft-black threshold
  const softBlkThresh = 0.022;
  const softClip = (Y) => Y < softBlkThresh ? Y + Math.pow(softBlkThresh - Y, 1.414) : Y;
  const Yt = softClip(Ytxt);
  const Yb = softClip(Ybg);
  let Sapc;
  if (Yb > Yt) {
    // Normal polarity: dark text on light bg
    Sapc = (Math.pow(Yb, 0.56) - Math.pow(Yt, 0.57)) * 1.14;
    if (Sapc < 0.1) return 0;
    Sapc = Sapc - 0.027;
  } else {
    // Reverse polarity: light text on dark bg
    Sapc = (Math.pow(Yb, 0.65) - Math.pow(Yt, 0.62)) * 1.14;
    if (Sapc > -0.1) return 0;
    Sapc = Sapc + 0.027;
  }
  return Sapc * 100;
}

/* --- CIEDE2000 Delta E — the industry-standard perceptual difference --- */
function deltaE2000(hex1, hex2) {
  const lab1 = hexToLab(hex1);
  const lab2 = hexToLab(hex2);
  const { L: L1, a: a1, b: b1 } = lab1;
  const { L: L2, a: a2, b: b2 } = lab2;

  const C1 = Math.sqrt(a1 * a1 + b1 * b1);
  const C2 = Math.sqrt(a2 * a2 + b2 * b2);
  const Cbar = (C1 + C2) / 2;

  const G = 0.5 * (1 - Math.sqrt(Math.pow(Cbar, 7) / (Math.pow(Cbar, 7) + Math.pow(25, 7))));
  const a1p = (1 + G) * a1;
  const a2p = (1 + G) * a2;

  const C1p = Math.sqrt(a1p * a1p + b1 * b1);
  const C2p = Math.sqrt(a2p * a2p + b2 * b2);

  const h1p = Math.atan2(b1, a1p) * 180 / Math.PI;
  const h2p = Math.atan2(b2, a2p) * 180 / Math.PI;
  const h1pPos = h1p < 0 ? h1p + 360 : h1p;
  const h2pPos = h2p < 0 ? h2p + 360 : h2p;

  const dLp = L2 - L1;
  const dCp = C2p - C1p;

  let dhp;
  if (C1p * C2p === 0) dhp = 0;
  else if (Math.abs(h2pPos - h1pPos) <= 180) dhp = h2pPos - h1pPos;
  else if (h2pPos - h1pPos > 180) dhp = h2pPos - h1pPos - 360;
  else dhp = h2pPos - h1pPos + 360;

  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp * Math.PI / 180) / 2);

  const Lbarp = (L1 + L2) / 2;
  const Cbarp = (C1p + C2p) / 2;

  let hbarp;
  if (C1p * C2p === 0) hbarp = h1pPos + h2pPos;
  else if (Math.abs(h1pPos - h2pPos) <= 180) hbarp = (h1pPos + h2pPos) / 2;
  else if (h1pPos + h2pPos < 360) hbarp = (h1pPos + h2pPos + 360) / 2;
  else hbarp = (h1pPos + h2pPos - 360) / 2;

  const T = 1
    - 0.17 * Math.cos((hbarp - 30) * Math.PI / 180)
    + 0.24 * Math.cos((2 * hbarp) * Math.PI / 180)
    + 0.32 * Math.cos((3 * hbarp + 6) * Math.PI / 180)
    - 0.20 * Math.cos((4 * hbarp - 63) * Math.PI / 180);

  const dTheta = 30 * Math.exp(-Math.pow((hbarp - 275) / 25, 2));
  const Rc = 2 * Math.sqrt(Math.pow(Cbarp, 7) / (Math.pow(Cbarp, 7) + Math.pow(25, 7)));
  const Sl = 1 + (0.015 * Math.pow(Lbarp - 50, 2)) / Math.sqrt(20 + Math.pow(Lbarp - 50, 2));
  const Sc = 1 + 0.045 * Cbarp;
  const Sh = 1 + 0.015 * Cbarp * T;
  const Rt = -Math.sin(2 * dTheta * Math.PI / 180) * Rc;

  return Math.sqrt(
    Math.pow(dLp / Sl, 2)
    + Math.pow(dCp / Sc, 2)
    + Math.pow(dHp / Sh, 2)
    + Rt * (dCp / Sc) * (dHp / Sh)
  );
}

/* ==========================================================
   UI: code row updates, badge updates, Delta E tracking
   ========================================================== */

let previousPickHex = null;

function updateExtendedCodes(hex) {
  if (!hex) {
    el.oklch.textContent = '-';
    el.lab.textContent = '-';
    el.cmyk.textContent = '-';
    el.p3.textContent = '-';
    el.cmykGamut.classList.remove('is-visible');
    el.p3Gamut.classList.remove('is-visible');
    return;
  }
  el.oklch.textContent = formatOklch(hex);
  el.lab.textContent = formatLab(hex);
  el.cmyk.textContent = formatCmyk(hex);
  el.p3.textContent = formatP3(hex);
  el.cmykGamut.classList.toggle('is-visible', cmykOutOfGamut(hex));
  el.p3Gamut.classList.toggle('is-visible', p3GamutExtended(hex));
}

function updateContrastBadge(hex) {
  if (!hex) {
    el.contrastLabel.textContent = '-';
    return;
  }
  const cW = wcagContrast(hex, '#ffffff');
  const cB = wcagContrast(hex, '#000000');
  // Show the higher-contrast option
  const better = cW > cB ? { bg: 'white', c: cW } : { bg: 'black', c: cB };
  const apca = Math.abs(apcaLc(hex, better.bg === 'white' ? '#000000' : '#ffffff'));
  const pass = better.c >= 7 ? 'AAA' : better.c >= 4.5 ? 'AA' : '·';
  el.contrastLabel.textContent = `${better.c.toFixed(1)}:1 ${pass} · APCA ${Math.round(apca)}`;
}

function updateDeltaBadge(hex) {
  if (!hex || !previousPickHex || previousPickHex === hex) {
    el.deltaBadge.hidden = true;
    return;
  }
  const dE = deltaE2000(previousPickHex, hex);
  if (dE < 0.5) {
    el.deltaBadge.hidden = true;
    return;
  }
  el.deltaBadge.hidden = false;
  el.deltaValue.textContent = dE.toFixed(1);
}

/* ==========================================================
   CVD simulation — toggle cycle: off → deut → prot → trit → off
   ========================================================== */
const CVD_MODES = ['off', 'deuteranopia', 'protanopia', 'tritanopia'];
const CVD_LABELS = {
  off: 'CVD',
  deuteranopia: 'Deut',
  protanopia: 'Prot',
  tritanopia: 'Trit',
};
let cvdMode = 'off';

function setCvdMode(mode) {
  cvdMode = mode;
  if (mode === 'off') {
    document.body.removeAttribute('data-cvd');
    el.cvdBadge.classList.remove('is-active');
  } else {
    document.body.setAttribute('data-cvd', mode);
    el.cvdBadge.classList.add('is-active');
  }
  el.cvdLabel.textContent = CVD_LABELS[mode];
}

el.cvdBadge.addEventListener('click', () => {
  const idx = CVD_MODES.indexOf(cvdMode);
  setCvdMode(CVD_MODES[(idx + 1) % CVD_MODES.length]);
});

/* ==========================================================
   Wide-gamut (P3) detection
   Combines two signals:
     (1) The user's display capability via matchMedia
     (2) Whether the active page authors wide-gamut colors
         (color(display-p3 ...), oklch(), lab(), etc.)
   ========================================================== */
async function updateGamutBadge() {
  // (1) Display capability
  const displayP3 = window.matchMedia('(color-gamut: p3)').matches;
  const displayRec2020 = window.matchMedia('(color-gamut: rec2020)').matches;
  const displayCapable = displayP3 || displayRec2020;

  // (2) Page authoring - ask the content script
  let pageInfo = { pageWideGamut: false, widestSpace: null };
  try {
    const res = await chrome.runtime.sendMessage({ type: 'CHECK_GAMUT' });
    if (res?.ok) pageInfo = res;
  } catch (_) { /* tab not inspectable, or already closed */ }

  // Decide label + state
  let label, state, title;
  if (pageInfo.pageWideGamut && displayCapable) {
    // Best case: wide-gamut page on a capable display
    label = (pageInfo.widestSpace || 'P3').toUpperCase();
    state = 'is-p3';
    title = i18n('p3SourceDetected') + ' · ' + i18n('p3DisplayCapable');
  } else if (pageInfo.pageWideGamut && !displayCapable) {
    // Page has wide-gamut content but the display clips it
    label = 'sRGB *';
    state = 'is-warning';
    title = i18n('p3SourceDetected') + ' · ' + i18n('p3DisplayIncapable');
  } else if (!pageInfo.pageWideGamut && displayCapable) {
    // Display could show more but the page is sRGB
    label = 'sRGB';
    state = '';
    title = i18n('p3SourceNotDetected') + ' · ' + i18n('p3DisplayCapable');
  } else {
    // Classic sRGB everywhere
    label = 'sRGB';
    state = '';
    title = i18n('p3SourceNotDetected') + ' · ' + i18n('p3DisplayIncapable');
  }

  el.gamutLabel.textContent = label;
  el.gamutBadge.classList.remove('is-p3', 'is-warning');
  if (state) el.gamutBadge.classList.add(state);
  el.gamutBadge.title = title;
}

// Run once at popup open; the active tab won't change while the popup is open
updateGamutBadge();

// Click to re-check (in case the page loaded new CSS after popup opened)
el.gamutBadge.addEventListener('click', () => {
  updateGamutBadge();
  toast(el.gamutBadge.title);
});

/* Clicking the contrast badge opens a tiny preview toast with more details */
el.contrastBadge.addEventListener('click', async () => {
  const hex = el.hex.textContent;
  if (!hex || hex === '-') return;
  const cW = wcagContrast(hex, '#ffffff');
  const cB = wcagContrast(hex, '#000000');
  const apcaW = apcaLc(hex, '#ffffff');
  const apcaB = apcaLc(hex, '#000000');
  const msg = `vs white: ${cW.toFixed(2)}:1 (APCA ${apcaW.toFixed(0)})  ·  vs black: ${cB.toFixed(2)}:1 (APCA ${apcaB.toFixed(0)})`;
  toast(msg);
});

/* ==========================================================
   Extend existing render() to call new updates.
   Since render() is a function declaration, we can't reassign it.
   Instead, we override window.render if it's global, or patch by
   monkey-patching the reference. Since popup.js is a classic script
   (not module), top-level functions are callable but not reassignable
   without `var`. Workaround: add a hook that render() calls.
   We accomplish this by listening for chrome.storage changes and
   running updates there — render() is called on every state change
   originating from loadState() or storage.onChanged, and our logic
   can simply run in parallel via the same storage listener.
   ========================================================== */

async function applyExtendedUpdatesFromStorage() {
  const { latest } = await chrome.storage.local.get('latest');
  const hex = latest?.hex || null;
  updateExtendedCodes(hex);
  updateContrastBadge(hex);
  updateDeltaBadge(hex);
  if (hex) previousPickHex = hex;
}

// Run once on load
applyExtendedUpdatesFromStorage();

// Re-run every time storage changes
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && (changes.latest || changes.history)) {
    applyExtendedUpdatesFromStorage();
  }
});

/* Copy handler for the new code rows - reuse existing pattern */
document.querySelectorAll('.code[data-format="oklch"], .code[data-format="lab"], .code[data-format="cmyk"], .code[data-format="p3"]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const value = btn.querySelector('.code__value').textContent;
    if (!value || value === '-') return;
    await navigator.clipboard.writeText(value);
    btn.classList.add('is-copied');
    toast(i18n('toastCopied', [btn.dataset.format.toUpperCase()]));
    setTimeout(() => btn.classList.remove('is-copied'), 1200);
  });
});

/* ==========================================================
   MIXER: show Delta E between slot A and slot B.
   Instead of patching renderMixer(), we listen for slot content changes
   via a MutationObserver on the hex labels.
   ========================================================== */
function installMixerDeltaE() {
  const arrow = document.querySelector('.mixer__arrow');
  if (!arrow) return;
  const slotAHex = document.getElementById('slotAhex');
  const slotBHex = document.getElementById('slotBhex');
  if (!slotAHex || !slotBHex) return;

  let deltaTag = arrow.querySelector('.mixer__delta');
  if (!deltaTag) {
    deltaTag = document.createElement('div');
    deltaTag.className = 'mixer__delta';
    deltaTag.style.cssText = 'font-family:var(--font-mono);font-size:8.5px;font-weight:600;color:var(--ink-dim);letter-spacing:0.04em;margin-top:2px;white-space:nowrap;';
    arrow.appendChild(deltaTag);
  }

  const updateDelta = () => {
    const a = slotAHex.textContent.trim().toLowerCase();
    const b = slotBHex.textContent.trim().toLowerCase();
    if (a && b && a !== b && a.startsWith('#') && b.startsWith('#')) {
      try {
        const dE = deltaE2000(a, b);
        deltaTag.textContent = `ΔE ${dE.toFixed(1)}`;
        deltaTag.style.display = '';
      } catch (_) {
        deltaTag.style.display = 'none';
      }
    } else {
      deltaTag.style.display = 'none';
    }
  };

  const obs = new MutationObserver(updateDelta);
  obs.observe(slotAHex, { childList: true, characterData: true, subtree: true });
  obs.observe(slotBHex, { childList: true, characterData: true, subtree: true });
  updateDelta();
}
installMixerDeltaE();

/* ==========================================================
   TONAL SCALE — 11-step OKLCH ramp (50..950)
   ========================================================== */

const SCALE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const scaleState = { baseHex: '#C6613F', colors: [], exportFormat: 'css' };

/* Target L values for each step (0-1 range), based on consensus of Tailwind,
 * Radix, Material You scales. Lighter steps have less chroma to avoid pastel-
 * chalk artifacts, darker steps shed chroma to avoid murky saturation.
 *
 * L values are manually tuned to feel uniform in OKLCH lightness. */
const SCALE_L = [0.985, 0.955, 0.900, 0.825, 0.745, 0.660, 0.575, 0.490, 0.400, 0.300, 0.200];
const SCALE_C_FACTOR = [0.25, 0.40, 0.70, 0.95, 1.00, 1.00, 1.00, 0.95, 0.85, 0.65, 0.45];

function generateTonalScale(baseHex) {
  const { h, C: baseC } = hexToOklch(baseHex);
  const colors = [];
  for (let i = 0; i < SCALE_STEPS.length; i++) {
    const L = SCALE_L[i];
    const C = Math.max(0, baseC * SCALE_C_FACTOR[i]);
    colors.push({
      step: SCALE_STEPS[i],
      hex: oklchToHex({ L, C, h: isNaN(h) ? 0 : h }),
    });
  }
  return colors;
}

function renderScale() {
  const colors = generateTonalScale(scaleState.baseHex);
  scaleState.colors = colors;
  el.scaleMeta.textContent = `11 steps from ${scaleState.baseHex.toUpperCase()}`;

  el.scaleRows.innerHTML = '';
  colors.forEach(({ step, hex }) => {
    const cell = document.createElement('button');
    cell.className = 'scale__cell';
    cell.style.background = hex;
    cell.title = `${step}: ${hex.toUpperCase()}`;

    const cW = wcagContrast(hex, '#ffffff');
    const cB = wcagContrast(hex, '#000000');
    const bestContrast = Math.max(cW, cB);
    const passLabel = bestContrast >= 7 ? 'AAA' : bestContrast >= 4.5 ? 'AA' : '';
    const lum = relLuminance(hexToRgb(hex));
    const ink = lum > 0.55 ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.95)';

    const stepEl = document.createElement('span');
    stepEl.className = 'scale__cell-step';
    stepEl.style.color = ink;
    stepEl.textContent = step;

    const contrastEl = document.createElement('span');
    contrastEl.className = 'scale__cell-contrast';
    contrastEl.style.color = ink;
    contrastEl.innerHTML = `${bestContrast.toFixed(1)}<small>${passLabel || '-'}</small>`;

    cell.append(stepEl, contrastEl);
    cell.addEventListener('click', async () => {
      await navigator.clipboard.writeText(hex.toUpperCase());
      toast(i18n('toastCopied', [hex.toUpperCase()]));
    });
    el.scaleRows.appendChild(cell);
  });

  renderScaleCode();
}

function renderScaleCode() {
  const colors = scaleState.colors;
  if (!colors.length) { el.scaleCode.textContent = '-'; return; }

  if (scaleState.exportFormat === 'css') {
    const lines = colors.map((c) => `  --color-${c.step}: ${c.hex};`);
    el.scaleCode.textContent = `:root {\n${lines.join('\n')}\n}`;
  } else if (scaleState.exportFormat === 'tailwind') {
    const obj = colors.map((c) => `  ${c.step}: '${c.hex}',`).join('\n');
    el.scaleCode.textContent = `// tailwind.config.js\ncolors: {\n  brand: {\n${obj.split('\n').map(l => '  ' + l).join('\n')}\n  }\n}`;
  } else if (scaleState.exportFormat === 'figma') {
    const tokens = {};
    colors.forEach((c) => {
      tokens[c.step] = { $value: c.hex, $type: 'color' };
    });
    el.scaleCode.textContent = JSON.stringify({ brand: tokens }, null, 2);
  }
}

async function openScale() {
  const { latest } = await chrome.storage.local.get('latest');
  scaleState.baseHex = latest?.hex || '#C6613F';
  renderScale();
  el.scaleSheet.setAttribute('aria-hidden', 'false');
}
function closeScale() {
  el.scaleSheet.setAttribute('aria-hidden', 'true');
}

el.openScale.addEventListener('click', openScale);
el.scaleClose.addEventListener('click', closeScale);
el.scaleSheet.addEventListener('click', (e) => {
  if (e.target === el.scaleSheet) closeScale();
});

el.scaleExportTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    el.scaleExportTabs.forEach((t) => t.classList.remove('is-active'));
    tab.classList.add('is-active');
    scaleState.exportFormat = tab.dataset.export;
    renderScaleCode();
  });
});

el.scaleCopyCode.addEventListener('click', async () => {
  await navigator.clipboard.writeText(el.scaleCode.textContent);
  toast(i18n('toastCodeCopied'));
});

el.scaleSaveAll.addEventListener('click', async () => {
  const { history = [] } = await chrome.storage.local.get('history');
  const existing = new Set(history.map((h) => h.hex));
  const additions = scaleState.colors
    .map((c) => c.hex.toLowerCase())
    .filter((h) => !existing.has(h))
    .map((hex) => ({ hex, time: Date.now() }));
  const merged = [...additions, ...history].slice(0, 24);
  await chrome.storage.local.set({ history: merged });
  toast(i18n('toastAddedToHistory', [String(additions.length)]));
});

/* Extend Escape handler for scale sheet */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && el.scaleSheet.getAttribute('aria-hidden') === 'false') {
    closeScale();
  }
});

/* ----------------- Init ------------------ */
try {
  loadState();
} catch (err) {
  console.error('[Chromadrop] init failed:', err);
  document.body.innerHTML =
    '<div style="padding:16px;font-family:system-ui;color:#f5efe7;background:#0f0d0c;font-size:12px;line-height:1.5">' +
    '<b style="color:#ff6a2c">Chromadrop error</b><br>' + err.message + '</div>';
}
