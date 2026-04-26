# 🎨 Chromapicker


<img width="128" height="128" alt="icon128" src="https://github.com/user-attachments/assets/4991c32d-1237-489b-9158-f52b9f42fe4f" />

> Pick, extract, mix and analyze colors from any web page - with OKLCH precision.

A polished browser extension for developers, designers and anyone who works with color on the web. Pixel-perfect picking, full-page color extraction, image palette analysis, color mixing in perceptually uniform color spaces, harmony generators, and a CSS gradient builder - all in one extension.

Works in **Microsoft Edge**, **Google Chrome**, **Brave**, **Arc**, **Opera**, and any other Chromium-based browser (version 95 or later).

<img width="1124" height="674" alt="Capture d&#39;écran 2026-04-26 220732" src="https://github.com/user-attachments/assets/86d70fe9-ddcf-463a-ba1d-ca834cce6415" />
<img width="351" height="586" alt="Capture d&#39;écran 2026-04-26 220746" src="https://github.com/user-attachments/assets/3fafacf9-6777-4882-a599-c3f792fb6a94" />
<img width="376" height="587" alt="Capture d&#39;écran 2026-04-26 220814" src="https://github.com/user-attachments/assets/12e5aaa2-cf3c-4668-b2ec-e54f3162358a" />
<img width="360" height="642" alt="Capture d&#39;écran 2026-04-26 220831" src="https://github.com/user-attachments/assets/191a3faa-54de-496f-b3df-b9a93ea39221" />
<img width="392" height="656" alt="Capture d&#39;écran 2026-04-26 220847" src="https://github.com/user-attachments/assets/d41dc024-c6b0-4bb0-a09d-850468b6086d" />
<img width="387" height="636" alt="Capture d&#39;écran 2026-04-26 220858" src="https://github.com/user-attachments/assets/4287dc81-14b4-4033-80bc-abeecb566119" />
<img width="392" height="659" alt="Capture d&#39;écran 2026-04-26 220943" src="https://github.com/user-attachments/assets/273a8da1-73a3-4355-8c18-5e9c31bddafc" />

---

## Table of contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Permissions explained](#permissions-explained)
- [Privacy](#privacy)
- [Technical notes](#technical-notes)
- [Development](#development)
- [License](#license)

---

## Features

### 🎯 Pixel-perfect picker

Click the toolbar icon and press **Pick**, or press **Alt+P** from anywhere - the browser's native EyeDropper API turns your cursor into a magnifier and samples the exact pixel you click on. The hex code is automatically copied to your clipboard.

- Works on images, videos, canvas, SVG, gradients - anything rendered to the screen
- Press **Esc** to cancel mid-pick
- On successful pick, a small toast appears on the page confirming what was captured

### 🔎 Extract page palette

The **Extract** button scans the current page and returns every color actually used in it - walking the DOM and collecting `color`, `background-color`, border colors, and SVG fills/strokes from computed styles. Results are deduplicated and sorted by frequency of use.

- Click a swatch to copy the hex code
- Click the magnifier icon on a swatch to **highlight every element on the page using that color** - they get outlined with an accent border so you can see where the color lives in the design
- **Copy all** or **Save all** to history

### 🖼️ Extract image palette

Same **Extract** button has a dropdown - pick "From an image..." and drop in any local image file. A k-means++ clustering algorithm identifies the dominant colors in the image.

- Slider to choose between 3 and 12 colors to extract
- Pixel-percentage shown for each color
- Handles any image format the browser supports (PNG, JPEG, WebP, SVG, GIF)
- Everything runs locally in the browser - the image never leaves your machine

### 🧪 Color mixer

Blend two colors in your choice of color space:

- **RGB** - linear interpolation, classic CSS-style blending
- **HSL** - hue-wheel interpolation (shortest path)
- **OKLCH** *(default)* - perceptually uniform blending, gives visually balanced results (yellow + blue = teal, not muddy gray)

Plus six post-blend effects: **tint** (lighten), **shade** (darken), **saturate**, **desaturate**, **warm**, **cool** - each with its own intensity slider.

### 🌈 Color harmonies

Given a base color, generate six classic harmony types using OKLCH hue rotation:

- **Complementary** (180° opposite)
- **Analogous** (±30° neighbors)
- **Triadic** (120° and 240°)
- **Split-complementary** (150° and 210°)
- **Tetradic** (90°, 180°, 270°)
- **Monochromatic** (5 lightness variations with chroma compensation)

Because rotations happen in OKLCH (not HSL), harmonies stay perceptually balanced - a 60° rotation produces a shift of equal visual magnitude whatever the starting color.

### 📏 Gradient builder

A visual editor for CSS gradients:

- Linear, Radial, or Conic types
- Draggable color stops on a preview band
- Click anywhere on the track to insert a new stop (color interpolated via OKLCH)
- Per-stop hex + position inputs
- Angle slider for linear/conic
- Live CSS output ready to copy

### 💾 History & export

Your last 24 unique picks persist across sessions. The palette can be exported as:

- **JSON** - full data with hex, RGB, HSL, timestamps
- **CSS** - `:root { --color-01: #...; }` custom properties
- **Figma** - W3C Design Tokens format (imports via the Tokens Studio plugin)
- **Tailwind** - drop-in `tailwind.config.js` snippet

### 🌍 Multi-language UI

Chromapicker auto-detects your browser's UI language on install and displays the interface in your preferred language. Currently supported:

- **English** (default, fallback)
- **French** (français)
- **Portuguese** (português)
- **German** (deutsch)

Strings live in `_locales/<lang>/messages.json` - a translation consists of a single JSON file. Contributions for additional languages are welcome via pull request.

---

## Installation

### From the browser store *(coming soon)*

The extension will be published on:

- Microsoft Edge Add-ons
- Chrome Web Store

### Manual install (developer mode)

1. Download the latest release from [Releases](https://github.com/mthcht/chromapicker/releases) (or clone this repo)
2. Unzip the archive
3. Open `edge://extensions` or `chrome://extensions`
4. Enable **Developer mode** (toggle in top-right)
5. Click **Load unpacked** and select the unzipped folder
6. Pin the icon from the extensions menu

A welcome page will open on first install with visual instructions for pinning.

---

## Usage

### Keyboard shortcut

**Alt+P** triggers the picker from anywhere, without opening the popup. The hex is automatically copied to your clipboard and a confirmation toast appears on the page.

You can rebind this shortcut at `edge://extensions/shortcuts` or `chrome://extensions/shortcuts`.

### Copy behavior

- Clicking any HEX/RGB/HSL row in the popup copies that value
- Clicking a history swatch copies its hex and promotes it as the current color
- The **Copy all** button in Extract/Harmony sheets copies every color as newline-separated hex codes

### Keyboard shortcuts inside the popup

- **Esc** - close the currently-open sheet (Mix, Harmony, Gradient, Export, etc.)

---

## Permissions explained

Chromapicker requests only the minimum permissions needed to function. Here's what each one does and why:

| Permission | What it does | Why Chromapicker needs it |
|---|---|---|
| **`storage`** | Read/write small amounts of data in the browser's local storage | Persist your color history (last 24 picks) and your latest pick between sessions. Nothing is synced to any server. |
| **`clipboardWrite`** | Write text to the clipboard | Auto-copy a picked hex code so you can paste it directly into your editor without an extra click. |
| **`scripting`** | Inject small scripts into the current tab | Required for the **Extract page** feature (walks DOM to collect colors), the **Highlight** feature (outlines elements using a given color), and the **Alt+P** shortcut (triggers the EyeDropper from outside the popup). |
| **`activeTab`** | Temporary access to the tab you're currently on, only while you trigger an action | Lets Chromapicker operate on the current page without needing broad host permissions like `<all_urls>`. No access to any tab you're not actively using. |

**Chromapicker requests NO access to:**

- Browsing history
- Cookies
- Passwords or form data
- Network requests
- Tabs other than the active one
- Downloads, bookmarks, or extensions
- Host permissions (no access to all URLs, no background page scraping)

The `commands` entry in the manifest registers the `Alt+P` shortcut - it's not a permission, just a keyboard binding.

---

## Privacy

**No data leaves your browser. Ever.**

- No telemetry, no analytics, no crash reports
- No external network requests by the extension (Google Fonts loads the Noto Sans JP font from a CDN for the popup UI only - the extension itself never contacts any server)
- No account, no sign-in, no cloud sync
- Your color history lives in `chrome.storage.local` and is wiped if you uninstall the extension
- Image palette extraction runs entirely locally using the Canvas API - uploaded images never leave the page

If you care about the Google Fonts request specifically, you can self-host the font by replacing the `<link>` in `popup.html` with a bundled `@font-face` declaration.

---

## Technical notes

### Color picker implementation

Chromapicker uses the browser's native [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper), available in Chromium 95+. This reads pixels directly from the browser's compositor, giving perfect alignment with the cursor regardless of OS display scaling.

An earlier version attempted a custom picker using `chrome.tabs.captureVisibleTab` + a canvas-based magnifier. It was rejected because screenshot-based picking introduces sub-pixel offset issues on non-integer display scaling (125%, 150%) that can't be fully compensated for with math alone.

### Color math

- **OKLab / OKLCH** conversions use Björn Ottosson's [2020 coefficients](https://bottosson.github.io/posts/oklab/). Round-trip accuracy verified for the full sRGB cube.
- **Harmony rotations** happen in OKLCH polar form so a 60° hue shift is perceptually consistent regardless of starting hue.
- **Mixing** in OKLab beats naïve RGB for perceptual smoothness (the classic yellow+blue test produces teal, not mud).
- **Image palette extraction** uses k-means++ seeding for stable cluster initialization, with 12 iterations cap for responsiveness. Pixels are downsampled to a max of 200px on the longest side before clustering.

### Why OKLCH instead of HSL

HSL's lightness channel is not perceptually uniform - `hsl(60, 100%, 50%)` (yellow) and `hsl(240, 100%, 50%)` (blue) look wildly different in brightness despite having the same L value. OKLCH corrects this and is the color space the CSS Color Module Level 4 spec uses as its reference. Modern design systems (Tailwind 4, Radix UI, Panda CSS) use OKLCH internally.

### Wide-gamut (P3) detection

The hero badge row includes a **gamut indicator** that combines two signals:

1. **Display capability** - `window.matchMedia('(color-gamut: p3)')` / `rec2020`
2. **Page authoring** - scans all accessible stylesheets for wide-gamut color functions (`color(display-p3 ...)`, `color(rec2020 ...)`, `oklch()`, `oklab()`, `lab()`, `lch()`) plus inline `style=""` attributes

The badge shows four states:

- **P3** (green) - Page uses wide-gamut colors AND display can show them
- **sRGB \*** (amber) - Page uses wide-gamut colors but display clips to sRGB
- **sRGB** - Classic sRGB everywhere

The native `EyeDropper` API always returns sRGB-clamped pixels, so picked colors can't recover wide-gamut data that was already thrown away - but the indicator tells you when the page is authoring wide-gamut content you might want to inspect with dev tools instead.

### Browser support

- Chromium 95+ (for EyeDropper API)
- Manifest V3
- No build step - plain ES2020 JavaScript, CSS, and HTML

---

## Development

### Project structure

```
chromapicker/
├── manifest.json          Extension manifest (MV3)
├── popup.html             Toolbar popup UI
├── popup.css              All popup styles
├── popup.js               Popup logic: picker, mixer, harmony, gradient, export
├── background.js          Service worker: install, keyboard shortcut, injection orchestrator
├── welcome.html           First-install onboarding page
├── icons/                 Extension icons (16/32/48/128 px)
└── README.md              (You're reading it)
```

### No build system

Chromapicker is deliberately build-less. Edit the source files, reload the extension in `edge://extensions` or `chrome://extensions`, and you're testing. Keep it simple.

### Testing locally

1. Make your changes
2. In the extensions page, click the **Reload** icon on the Chromapicker card (or click **Load unpacked** again)
3. Open the popup to see changes - right-click **Inspect** if you need DevTools
4. For background script changes, also click the **Service worker** link under the extension to inspect it

### Contributing

Bug reports and feature suggestions are welcome via [Issues](https://github.com/mthcht/chromapicker/issues).

For code contributions:

1. Fork the repo
2. Create a feature branch
3. Test in at least Chrome and Edge
4. Open a pull request describing the change

If you're adding a new color space conversion or a new mixer effect, please include a round-trip / reference-value test in the PR description so the math can be verified.

---

## License

MIT - do whatever you want. See [LICENSE](./LICENSE) for the full text.

---

## Credits

- Built by [mthcht](https://github.com/mthcht)
- Color math based on [Björn Ottosson's OKLab](https://bottosson.github.io/posts/oklab/)
- Typography: [Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP) via Google Fonts
- Inspired by [ColorZilla](https://www.colorzilla.com/) - the classic color picker that set the bar
