// Jaliyan Ships site interactions
// Test recipient only, not the official company address. Public client code is inspectable.
const TEST_ENQUIRY_EMAIL = 'lalatina431@gmail.com';
const contactForm = document.querySelector('#contactForm');

if (contactForm) {
  const feedback = contactForm.querySelector('.form-feedback');
  const gmailCompose = document.querySelector('#gmailCompose');

  function prepareEnquiry() {
    const data = new FormData(contactForm);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const subject = String(data.get('subject') || '').trim() || 'Website enquiry';
    const message = String(data.get('message') || '').trim();
    if (!name || !email || !message) {
      feedback.textContent = 'Please enter your name, email address and message.';
      return null;
    }
    return { subject, body: `Name: ${name}\nEmail: ${email}\n\n${message}` };
  }

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const enquiry = prepareEnquiry();
    if (!enquiry) return;
    feedback.textContent = 'Your email draft is ready to open. Send it from your email application, or choose Open in Gmail below. Delivery is not confirmed yet.';
    window.location.href = `mailto:${TEST_ENQUIRY_EMAIL}?subject=${encodeURIComponent(enquiry.subject)}&body=${encodeURIComponent(enquiry.body)}`;
  });

  if (gmailCompose) {
    gmailCompose.hidden = false;
    gmailCompose.addEventListener('click', () => {
      if (!contactForm.reportValidity()) return;
      const enquiry = prepareEnquiry();
      if (!enquiry) return;
      const query = new URLSearchParams({ view: 'cm', fs: '1', to: TEST_ENQUIRY_EMAIL, su: enquiry.subject, body: enquiry.body });
      feedback.textContent = 'A Gmail draft will open. Sign in if prompted and press Send to complete the test.';
      window.location.href = 'https://mail.google.com/mail/?' + query.toString();
    });
  }
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

