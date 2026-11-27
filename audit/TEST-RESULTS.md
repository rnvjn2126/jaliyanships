# Test Results

| Test | Result | Evidence |
| --- | --- | --- |
| Static regression suite | Pass | `npm run test:static` completed successfully on 27 November 2026. |
| JavaScript syntax | Pass | `node --check js/script.js` and `node --check js/contact-enquiry.js` completed successfully. |
| Playwright Chromium | Blocked | Browser binary was initially missing. Attempts using the installed Chrome executable stalled before launch and were stopped. |
| Firefox and WebKit | Blocked | Playwright browsers were not available. |
| Deployed-site audit | Blocked | Requires a published site and successful browser run. |
