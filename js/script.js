// Jaliyan Ships site interactions
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
  window.matchMedia('(max-width: 800px)').addEventListener('change', () => setMenu(false));
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// Set this to the real company email address before publishing.
const COMPANY_EMAIL = 'your-email@example.com';
const contactForm = document.querySelector('#contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get('name').trim();
    const email = data.get('email').trim();
    const subject = data.get('subject').trim() || 'Website enquiry';
    const message = data.get('message').trim();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const feedback = document.querySelector('.form-feedback');

    if (COMPANY_EMAIL === 'your-email@example.com') {
      feedback.textContent = 'Please configure COMPANY_EMAIL in js/script.js with the company email address.';
      return;
    }

    window.location.href = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    feedback.textContent = 'Your email application should open with the enquiry ready to send.';
  });
}
