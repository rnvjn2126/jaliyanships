# Enquiry form setup

The contact page submits to FormSubmit's cross-origin HTTPS AJAX endpoint, without navigating away or launching an email client. Compatible with GitHub Pages and static GoDaddy hosting. JavaScript is required; the button starts disabled, is type=button, and invokes the dedicated js/contact-enquiry-v5.js handler. The endpoint is stored in a data attribute (not a native form action), and a contact-page CSP form-action 'none' blocks native submissions. The shared script only handles navigation. Version 5 is visible in the form footer for cache troubleshooting.

1. Submit a non-confidential test enquiry from the hosted website.
2. Confirm the activation email in the temporary recipient inbox (check spam).
3. Submit again and verify receipt. The page only confirms provider acceptance, not inbox delivery.
4. Replace the temporary email in the data-endpoint attribute with the anonymous identifier supplied by FormSubmit. Do not commit activation links or API keys.
5. Before production, use the approved company address, activate it, and retest on the production domain.

The interactive reCAPTCHA is disabled to avoid the provider's challenge page. The honeypot remains enabled and FormSubmit applies its own abuse controls; these are weaker than interactive CAPTCHA. Consider an inline CAPTCHA-compatible backend or form provider for production. No automatic retries are made; a failed or timed-out response may still have reached the provider. The form preserves input on failure and activation responses. The recipient is not displayed as a company contact but is inspectable in public source/history. Review FormSubmit privacy terms before collecting real customer data.

Documentation: https://formsubmit.co/ajax-documentation
