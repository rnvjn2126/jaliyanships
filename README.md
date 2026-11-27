# Jaliyan Ships — website preview

A six-page static website with company-logo branding, eight UX improvements, and a local video gallery. No package installation or build step is needed.

## Preview

1. Extract the ZIP into a folder.
2. Double-click `index.html` for a quick preview, then click Gallery in the navigation.
3. For a hosting-like preview, open PowerShell in the extracted folder and run `py -m http.server 8000`, then visit http://localhost:8000. On macOS/Linux, use `python3 -m http.server 8000`.

Keep the `assets`, `css` and `js` folders alongside the HTML files. The video is bundled and does not depend on a third-party streaming service. Some existing background photographs and fonts still use external URLs and require internet access.

## Checks and deployment

See `UX-AUDIT.md`, `UX-CHECKS.txt`, and `BRAND-THEME.md`. Static checks and video decoding passed. The browser environment blocks local navigation, so live rendering/playback remain to be verified on your computer. Replace company contact, management, and certification placeholders before publishing. Upload the extracted website contents to your GoDaddy document root. This revised ZIP has not been pushed to GitHub.

## GitHub Pages

See `GITHUB-PAGES.md` for deployment steps. The included `.github/workflows/deploy.yml` publishes the six pages and bundled media after Pages is enabled and a push to `main` (or a manual workflow run). `.nojekyll` preserves the plain static site. Keep your repository private unless you deliberately choose otherwise; the hosted website can still be public. This package has not been pushed or deployed.
