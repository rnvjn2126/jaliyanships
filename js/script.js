// Jaliyan Ships site interactions
// Enquiries use a portable HTTPS form endpoint in contact.html.
// Replace the temporary recipient with the anonymous FormSubmit endpoint after activation.
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  const submitButton = contactForm.querySelector('#enquirySubmit');
  const feedback = contactForm.querySelector('.form-feedback');
  const originalLabel = submitButton.textContent;
  let submitting = false;

  function resetEnquiryState() {
    submitting = false;
    submitButton.disabled = false;
    submitButton.textContent = originalLabel;
    contactForm.removeAttribute('aria-busy');
    feedback.textContent = '';
  }

  contactForm.addEventListener('submit', (event) => {
    if (submitting) {
      event.preventDefault();
      return;
    }
    // Browser validation runs before submit; reject whitespace-only required fields.
    for (const field of ['name', 'message']) {
      const input = contactForm.elements.namedItem(field);
      if (!input.value.trim()) {
        event.preventDefault();
        feedback.textContent = 'Please enter your name and enquiry message.';
        input.focus();
        return;
      }
    }
    submitting = true;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending enquiry…';
    contactForm.setAttribute('aria-busy', 'true');
    feedback.textContent = 'Opening secure submission. Complete the spam check if requested.';
    // Let the browser POST to FormSubmit. Never submit to the static Pages host.
  });

  // Returning from the service via browser Back must enable the form again.
  window.addEventListener('pageshow', resetEnquiryState);
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

