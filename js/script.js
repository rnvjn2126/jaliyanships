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

// Temporary enquiry recipient for testing only; not the company's official email.
// Public client-side code is visible to visitors. Replace before production.
const TEST_ENQUIRY_EMAIL = 'lalatina431@gmail.com';
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

    window.location.href = `mailto:${TEST_ENQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    feedback.textContent = 'Your email application should open with the test enquiry ready to send. Please send it there; delivery is not confirmed by this website.';
  });
}
