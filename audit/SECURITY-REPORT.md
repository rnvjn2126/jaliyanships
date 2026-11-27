# Security Report

| Severity | Finding | Status |
| --- | --- | --- |
| Medium | Enquiry recipient is necessarily visible in public page source while using the temporary FormSubmit email endpoint. | Open. Replace it with FormSubmit’s anonymous identifier after activation and approval. |
| Medium | GitHub Pages cannot set HTTP security headers. | Open. Contact-page meta CSP, referrer policy and permissions policy were added. Configure headers at GoDaddy. |
| Low | FormSubmit spam prevention uses a honeypot and provider controls while CAPTCHA is disabled to retain an AJAX-only experience. | Open. Evaluate a provider or backend with inline challenge support before higher-volume use. |
| Low | Inline speculation rules require `'unsafe-inline'` in the contact page CSP. | Open. Move rules to an external script or remove them before enforcing a nonce/hash CSP. |
| Informational | No secrets, HTTP resources, package dependencies beyond test-only Playwright/axe-core, or unsafe `_blank` links were found in the current tree. | Verified statically. |

The CSP cannot provide `frame-ancestors` protection as an HTML meta policy. Configure `X-Frame-Options: DENY` and `Content-Security-Policy: frame-ancestors 'none'` as server headers at GoDaddy.
