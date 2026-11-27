import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const pages = ['index.html', 'about.html', 'management.html', 'certifications.html', 'gallery.html', 'contact.html', 'privacy.html', 'terms.html'];
const root = process.cwd();
let failures = 0;

function check(condition, message) {
  if (condition) return;
  failures += 1;
  console.error(`FAIL: ${message}`);
}

for (const page of pages) {
  const file = resolve(root, page);
  const html = readFileSync(file, 'utf8');
  check(/<title>[^<]+<\/title>/i.test(html), `${page} has a page title`);
  check(/<main[ >]/i.test(html), `${page} has main content`);
  check(!/http:\/\//i.test(html), `${page} has no insecure HTTP resources`);
  for (const match of html.matchAll(/(?:href|src|poster)="([^"]+)"/gi)) {
    const target = match[1];
    if (/^(https?:|mailto:|#)/i.test(target)) continue;
    check(existsSync(resolve(root, target)), `${page} references existing ${target}`);
  }
}

const css = readFileSync(resolve(root, 'css/style.css'), 'utf8');
check(!/https?:\/\//i.test(css), 'CSS has no external resource requests');
check(/prefers-reduced-motion/i.test(css), 'CSS supports reduced motion');
check(/focus-visible/i.test(css), 'CSS provides visible keyboard focus');

const contact = readFileSync(resolve(root, 'contact.html'), 'utf8');
const contactScript = readFileSync(resolve(root, 'js/contact-enquiry.js'), 'utf8');
check(/type="button" id="enquirySubmit"/i.test(contact), 'enquiry button avoids native navigation');
check(/form-action 'none'/.test(contact), 'contact CSP blocks native form submission');
check(/AbortController/.test(contactScript), 'enquiry script supports timeout cancellation');
check(/credentials: 'omit'/.test(contactScript), 'enquiry request omits ambient credentials');
check(/form\.reset\(\)/.test(contactScript), 'enquiry clears fields only after success');

for (const file of ['assets/company-logo.png', 'assets/jaliyan-video.mp4', 'assets/gallery-poster.jpg', '.nojekyll', 'robots.txt', 'sitemap.xml']) {
  check(existsSync(resolve(root, file)), `${file} exists`);
}

if (failures) process.exit(1);
console.log(`PASS: ${pages.length} pages, local links/assets, local CSS resources, form safeguards, deployment files`);
