// Jaliyan Ships site interactions
// FormSubmit AJAX endpoint is configured in contact.html.
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  const submitButton = contactForm.querySelector('#enquirySubmit');
  const feedback = contactForm.querySelector('.form-feedback');
  const originalLabel = submitButton.textContent;
  let submitting = false;

  function showEnquiryStatus(state, message) {
    feedback.dataset.state = state;
    feedback.textContent = message;
  }

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submitting) return;
    for (const field of ['name', 'message']) {
      const input = contactForm.elements.namedItem(field);
      if (!input.value.trim()) {
        showEnquiryStatus('error', 'Please enter your name and enquiry message.');
        input.focus();
        return;
      }
    }
    const data = Object.fromEntries(new FormData(contactForm));
    submitting = true;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending enquiry…';
    contactForm.setAttribute('aria-busy', 'true');
    showEnquiryStatus('pending', 'Sending your enquiry. Please keep this page open.');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal,
        credentials: 'omit'
      });
      const result = await response.json();
      const message = typeof result.message === 'string' ? result.message : '';
      if (/activat|not confirmed|confirm your (email|form)/i.test(message)) {
        showEnquiryStatus('pending', 'The test recipient must activate the enquiry form by email before delivery can be verified. Your entries have been kept.');
      } else if (response.ok && (result.success === true || result.success === 'true')) {
        contactForm.reset();
        showEnquiryStatus('success', 'Thank you. Your enquiry was accepted by the submission service.');
      } else {
        showEnquiryStatus('error', 'Your enquiry could not be confirmed. Please check your connection or try again later. Your entries have been kept.');
      }
    } catch (error) {
      showEnquiryStatus('error', 'We could not confirm submission. Please check your connection and try again if necessary. Your entries have been kept.');
    } finally {
      clearTimeout(timeout);
      submitting = false;
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
      contactForm.removeAttribute('aria-busy');
    }
  });
  // Enable only after installing the listener, preventing native navigation if scripts fail.
  submitButton.disabled = false;
}

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');

if (menuButton && navigation) {
  function setMenu(isOpen) {
    navigation.classList.toggle('open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.textContent = isOpen ? '×' : '☰';
  }
  menuButton.addEventListener('click', () => setMenu(!navigation.classList.contains('open')));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('open')) {
      setMenu(false);
      menuButton.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
  });
  const mobileQuery = window.matchMedia('(max-width: 800px)');
  if (mobileQuery.addEventListener) mobileQuery.addEventListener('change', () => setMenu(false));
  else if (mobileQuery.addListener) mobileQuery.addListener(() => setMenu(false));
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

