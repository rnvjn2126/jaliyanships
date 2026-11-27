# GoDaddy Deployment Guide

1. Approve the company contact, legal policy and FormSubmit recipient configuration. Replace the temporary FormSubmit email with the approved anonymous identifier only after FormSubmit activation.
2. In cPanel File Manager, open the domain document root, usually `public_html` or the configured addon-domain directory.
3. Upload the production ZIP, extract it in the document root, and confirm that `index.html`, `assets/`, `css/` and `js/` are directly in that directory.
4. Enable HTTPS with GoDaddy SSL and force HTTPS redirects in the hosting control panel.
5. Configure server headers where available: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`, `X-Frame-Options: DENY`, and a tested Content-Security-Policy. Confirm the FormSubmit endpoint remains allowed by `connect-src`.
6. Configure caching for versioned static assets after browser verification. Do not cache HTML indefinitely.
7. Set the approved canonical base URL and update `sitemap.xml` from relative entries to absolute URLs.
8. Test all pages, mobile navigation, legal links, HTTPS, form success and failure behavior, video playback and response headers after deployment.

No DNS settings or live deployment were changed during this audit.
