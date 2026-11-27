# Remaining Issues

| Severity | Description | Affected files | Root cause | Required verification |
| --- | --- | --- | --- | --- |
| High | Live FormSubmit delivery and anonymous identifier migration are not verified. | `contact.html` | Requires recipient inbox access and approved identifier. | One controlled production test after activation. |
| High | Playwright, screenshots, cookie/network audit and cross-browser checks are incomplete. | `tests/site.spec.mjs` | Browser runner stalled before launch. | Install browsers or resolve local runner restriction, then run `npm test`. |
| Medium | Canonical URLs and structured organization data are omitted. | all pages, `sitemap.xml` | Approved production domain and verified company facts were unavailable. | Add after company approval. |
| Medium | Legal drafts require company and professional approval. | `privacy.html`, `terms.html` | Retention, contact, governing law and policy decisions are missing. | Legal/company sign-off. |
| Low | Locally copied stock images require licence/attribution confirmation. | `assets/*.jpg` | Original photographer/licence records were not supplied. | Preserve source records or replace with owned assets. |
| Low | Contact-page CSP uses `'unsafe-inline'` for existing speculation rules. | `contact.html` | Inline browser speculation configuration. | Externalise or remove the inline rule before server CSP enforcement. |
