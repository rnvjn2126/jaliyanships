# Publish on GitHub Pages

This package is ready for the `rnvjn2126/jaliyanships` repository. The expected address after successful deployment is https://rnvjn2126.github.io/jaliyanships/.

## Setup

1. Extract the archive. Copy its **contents**, including the hidden `.github` directory and `.nojekyll`, into the root of a local clone of your repository, replacing the previous website files. Do not commit the ZIP or its enclosing directory.
2. Review the logo/video and confirm they can be publicly shared. Replace placeholder contact, management and certification details before publishing.
3. On GitHub, open repository Settings > Pages. Under Build and deployment, select **GitHub Actions** as the source. GitHub Pages on a private personal repository requires GitHub Pro or another eligible plan; the published Pages website is generally public even when the source repository is private. Do not make the repository public merely to bypass that limitation without considering confidentiality.
4. Commit and push the extracted files to `main` (using GitHub Desktop or Git). The included workflow runs on pushes to `main`. If the initial run occurred before Pages was enabled, open Actions > Deploy Jaliyan website to GitHub Pages > Run workflow and choose `main`.
5. After the workflow succeeds, open Settings > Pages for the published address. Check the Gallery video and every navigation link.

Only HTML, CSS, JavaScript and assets are included in the deployment artifact. The repository's audit documents are not published by this workflow. No server-side build, dependencies or secrets are needed. The contact form remains a mailto form and requires the real company email. Some photos and fonts still load from external URLs. No custom domain or DNS changes are configured.

For a private local preview, run `py -m http.server 8000` in the extracted root, then open http://localhost:8000.

This configuration was checked locally; a live GitHub Actions run and real-browser playback have not been verified.

Official reference: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
