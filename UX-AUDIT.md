# Jaliyan Ships — UX audit

Static HTML/CSS/JavaScript, five public pages, no build system or backend. No dependencies added. The original content and GoDaddy-compatible directory layout are retained.

| # | Status | Result and verification |
|---|---|---|
| 1 | Skipped | HTML is server-served static content, with no async layout/data fetches. Image areas already have reserved geometry. Skeletons would hide usable content. |
| 2 | Skipped | No server-backed mutations or React. The contact form opens a mail client, not a record creation API. |
| 3 | Skipped | Five-page informational site, not a daily-use productivity application. |
| 4 | Skipped | No command menu or complex keyboard action set. Escape closes the mobile navigation; standard keyboard navigation remains available. |
| 5 | Skipped | No delete, archive or reversible server actions. |
| 6 | Skipped | No fetched application data. Normal HTTP caching is hosting-dependent. |
| 7 | Built | Five HTML pages: moderate speculation-rule allowlist for other informational pages; excludes current page and contact form. No router prefetch exists. Check Chrome DevTools Application > Speculative loads on HTTP(S). Browser support and prerender activation are not verified. |
| 8 | Skipped | No image uploads or image records; photos are CSS background URLs and management photos are placeholders. |
| 9 | Built | css/style.css: progressive cross-document transitions, shared header-brand name, 180 ms, reduced-motion opt-out. No same-page view changes require startViewTransition. Navigate between pages in a supporting browser. |
| 10 | Skipped | No bottom sheets. Navigation is a dropdown, not a sheet. |
| 11 | Built | css/style.css and js/script.js: explicit reversible CSS transitions for hover effects, instant menu toggling with no input lock, Escape/outside-click/viewport close. No spring-driven gestures exist. |
| 12 | Skipped | Browser website, not native Android. |
| 13 | Built | css/style.css and all HTML pages: 48 CSS px minimum height for links/buttons/form fields, 48px menu-toggle width, focus outlines, active page and menu ARIA attributes. Verify mobile navigation and keyboard focus. |
| 14 | Built | All HTML pages and css/style.css: viewport-fit=cover, left/right/top/bottom safe-area padding and responsive navigation height. Verify on a notched phone. |
| 15 | Skipped | No login, OTP or SMS backend. |
| 16 | Built | css/style.css: tabular numerals for section numbers, contact details and footer year. |
| 17 | Built | css/style.css: balanced headings and pretty paragraph wrapping where supported. |
| 18 | Built | css/style.css: 8px radius plus corner-shape: squircle for buttons and input controls; square card geometry retained. Unsupported browsers keep normal radius. |
| 19 | Skipped | No payments, database record creation or API. Mailto cannot provide server idempotency. |
| 20 | Skipped | Flat navigation without nested hover menus. |

## Validation

See UX-CHECKS.txt: baseline and each of the eight implementation steps passed static checks (all five page titles/main headings, local links, speculation JSON, CSS top-level parse and Node JavaScript syntax). No project-provided test suite or package manifest exists. Chromium refused navigation to both local HTTP and local files (ERR_BLOCKED_BY_ADMINISTRATOR). Therefore interactive behavior, device safe areas, cross-document transition activation, prerender activation, and visual layout have not been verified in a real browser. External image/font availability was not checked. No performance speedup is claimed.

## Before publishing

Replace the placeholder company email, phone and address; approved management names/photos; and certification titles/details. The form currently deliberately refuses to open an enquiry with the placeholder email. Check all five pages on mobile and desktop and verify external images. Upload the contents of the jaliyan-ships folder to your hosting document root, not the enclosing folder. The website has not been uploaded to GitHub or GoDaddy.
