// Direct submission only: no native form navigation.
(() => {
  'use strict';
  const form = document.getElementById('enquiryForm');
  if (!form) return;
  const button = form.querySelector('#enquirySubmit');
  const feedback = form.querySelector('.form-feedback');
  const label = button.textContent;
  const endpoint = form.dataset.endpoint;
  let sending = false;

  function status(state, message) {
    feedback.dataset.state = state;
    feedback.textContent = message;
  }

  async function sendEnquiry() {
    if (sending || !form.reportValidity()) return;
    for (const field of ['name', 'message']) {
      const input = form.elements.namedItem(field);
      if (!input.value.trim()) {
        status('error', 'Please enter your name and enquiry message.');
        input.focus();
        return;
      }
    }
    const data = Object.fromEntries(new FormData(form));
    sending = true;
    button.disabled = true;
    button.textContent = 'Sending enquiry…';
    form.setAttribute('aria-busy', 'true');
    status('pending', 'Sending your enquiry. Please keep this page open.');
    let timeout;
    try {
      const controller = new AbortController();
      timeout = setTimeout(() => controller.abort(), 20000);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
        credentials: 'omit',
        redirect: 'error',
        signal: controller.signal
      });
      const result = await response.json();
      const message = typeof result.message === 'string' ? result.message : '';
      if (/activat|not confirmed|confirm your (email|form)/i.test(message)) {
        status('pending', 'The test recipient must activate the enquiry form by email before delivery can be verified. Your entries have been kept.');
      } else if (response.ok && (result.success === true || result.success === 'true')) {
        form.reset();
        status('success', 'Thank you. Your enquiry was accepted by the submission service.');
      } else {
        status('error', 'Your enquiry could not be confirmed. Your entries have been kept. Please try again later if necessary.');
      }
    } catch (error) {
      status('error', 'We could not confirm submission. Your entries have been kept. Check your connection and try again if necessary.');
    } finally {
      clearTimeout(timeout);
      sending = false;
      button.disabled = false;
      button.textContent = label;
      form.removeAttribute('aria-busy');
    }
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    sendEnquiry();
  });
  button.addEventListener('click', sendEnquiry);
  form.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.isComposing && event.target.tagName === 'INPUT' && event.target.type !== 'hidden') {
      event.preventDefault();
      sendEnquiry();
    }
  });
  button.disabled = false;
})();
