# Website Cleanup Audit Progress

Last updated: 27 November 2026

- [x] Checkpoint 1 — repository inventory, obsolete form-script cleanup, local asset consolidation and static regression test.
- [x] Checkpoint 2 — static security review and compatible contact-page CSP/referrer/permissions policy safeguards.
- [x] Checkpoint 3 — AJAX enquiry form reviewed and strengthened. Automated mocked browser verification is pending because the browser runner stalled before launch.
- [ ] Checkpoint 4 — local and deployed live cookie/network audit. Browser execution blocked. Deployed Pages address requires a fresh run after publishing.
- [x] Checkpoint 5 — privacy and terms drafts plus footer links. Company/legal approval remains required.
- [x] Checkpoint 6 — external Unsplash and Google Fonts requests removed from runtime. Locally bundled Unsplash photos need licence/attribution review.
- [ ] Checkpoint 7 — browser performance measurement and Lighthouse comparison pending.
- [x] Checkpoint 8 — static UX review and existing reduced-motion/focus/mobile safeguards retained.
- [x] Checkpoint 9 — static accessibility work and axe-core test added. Browser execution pending.
- [ ] Checkpoint 10 — browser screenshots and Firefox/WebKit testing pending.
- [x] Checkpoint 11 — technical SEO essentials added. Canonical URLs await approved public domain.
- [x] Checkpoint 12 — local video markup and assets verified statically.
- [x] Checkpoint 13 — GitHub Pages workflow reviewed and GoDaddy guide added.
- [x] Checkpoint 14 — static regression suite added and run. Browser suite is blocked.
- [x] Checkpoint 15 — audit report set created. Production ZIP pending final browser verification.

## Continuation

Run `npm install`, then `npx playwright install chromium firefox webkit`, followed by `npm test`. If browser installation stalls, configure Playwright to use a verified executable and investigate the local runner restriction before relying on browser results. Run Lighthouse locally and against the deployed Pages URL. Capture the requested screenshots, then create the production ZIP from only the files copied by `.github/workflows/deploy.yml`.
