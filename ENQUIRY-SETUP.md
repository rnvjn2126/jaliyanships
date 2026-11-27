# Enquiry form setup

The contact page uses FormSubmit's HTTPS POST endpoint. It works on GitHub Pages and compatible static GoDaddy hosting without an email application or server-side credentials.

1. Open the hosted contact page and submit a non-confidential test enquiry.
2. Complete FormSubmit's spam check if shown.
3. In the temporary test recipient inbox, confirm the FormSubmit activation email. Check spam if needed.
4. Submit another test and verify actual delivery. FormSubmit's confirmation screen is not proof of inbox delivery.
5. Replace the recipient address in contact.html with the anonymous endpoint identifier supplied in the activation email. Do not commit activation links or API keys.
6. Before launch, replace the test recipient with the approved company recipient, activate that endpoint, and retest from the production domain.

The form intentionally uses native POST rather than AJAX to preserve the provider's CAPTCHA flow and work without JavaScript. The provider handles confirmation and errors; browser Back permits retry. JavaScript prevents duplicate clicks during navigation but does not guarantee server-side idempotency. The temporary email is not displayed as a company contact, but it remains visible in public HTML source and commit history until replaced (old history remains accessible). The provider processes form data externally; review its privacy terms before using real customer data.

Documentation: https://formsubmit.co/documentation
