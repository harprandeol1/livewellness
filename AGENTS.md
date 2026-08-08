# livewellness

A single-page static marketing website for "Live Wellness" concierge medicine. Plain HTML/CSS/JS with no build system, package manager, or backend. Deployed via GitHub Pages to the custom domain in `CNAME`.

Key files:
- `index.html` — the entire page markup.
- `styles.css` — all styling.
- `script.js` — referenced by `index.html` for interactivity (nav toggle, add-on category filter, lead-form handler).

## Cursor Cloud specific instructions

- This is a static site with no dependencies to install and no build step. There is no lint/test/build tooling configured in the repo.
- To run locally, serve the directory over HTTP and open it in a browser, e.g. `python3 -m http.server 8000` from the repo root, then visit `http://localhost:8000/`. Do not open via `file://` — relative asset paths and fonts behave more reliably over HTTP.
- Known pre-existing issue (NOT an environment problem): `index.html` references `<script src="script.js"></script>`, but `script.js` does not exist as a file — its JavaScript source is mistakenly pasted as trailing plain text after the closing `</html>` tag in `index.html`. As a result `/script.js` returns 404 and JS-driven interactivity (mobile nav toggle, add-on category filter, form submit handler) does not run. Page rendering and standard anchor-link navigation work without JS. Treat fixing this as a code change, not environment setup.
