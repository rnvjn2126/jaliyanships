(() => {
  'use strict';

  const form = document.getElementById('enquiryForm');
  if (!form) return;

  const button = form.querySelector('#enquirySubmit');
  const feedback = form.querySelector('.form-feedback');
  const initialLabel = button.textContent;
  const endpoint = form.dataset.endpoint;
  let sending = false;

  function setStatus(state, message) {
    feedback.dataset.state = state;
    feedback.textContent = message;
  }

  function hasRequiredText() {
    for (const fieldName of ['name', 'message']) {
      const field = form.elements.namedItem(fieldName);
      if (!field.value.trim()) {
        setStatus('error', `Please enter your ${fieldName === 'name' ? 'name' : 'enquiry message'}.`);
        field.focus();
        return false;
      }
    }
    return true;
  }

  async function sendEnquiry() {
    if (sending || !form.reportValidity() || !hasRequiredText()) return;

    sending = true;
    button.disabled = true;
    button.textContent = 'Sending enquiry…';
    form.setAttribute('aria-busy', 'true');
    setStatus('pending', 'Sending your enquiry. Please keep this page open.');

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
        credentials: 'omit',
        redirect: 'error',
        signal: controller.signal
      });
      const contentType = response.headers.get('content-type') || '';
      const result = contentType.includes('application/json') ? await response.json() : {};
      const providerMessage = typeof result.message === 'string' ? result.message : '';

      if (/activat|not confirmed|confirm your (email|form)/i.test(providerMessage)) {
        setStatus('pending', 'The test recipient must activate the enquiry form by email before delivery can be verified. Your entries have been kept.');
      } else if (response.ok && (result.success === true || result.success === 'true')) {
        form.reset();
        setStatus('success', 'Thank you. Your enquiry was accepted by the submission service.');
      } else {
        setStatus('error', 'Your enquiry could not be confirmed. Your entries have been kept. Please try again later if necessary.');
      }
    } catch (error) {
      setStatus('error', 'We could not confirm submission. Your entries have been kept. Check your connection and try again if necessary.');
    } finally {
      window.clearTimeout(timeout);
      sending = false;
      button.disabled = false;
      button.textContent = initialLabel;
      form.removeAttribute('aria-busy');
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    sendEnquiry();
  });
  button.addEventListener('click', sendEnquiry);
  form.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.isComposing && event.target.tagName === 'INPUT' && event.target.type !== 'hidden') {
      event.preventDefault();
      sendEnquiry();
    }
  });
  button.disabled = false;
})();
