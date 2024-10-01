document.addEventListener('DOMContentLoaded', function () {
  const ctaButton = document.getElementById('cta-button');
  const contactForm = document.getElementById('contact-form');

  // CTA button click event
  ctaButton.addEventListener('click', function () {
    alert('Welcome to the adventure!');
  });

  // Form submission event
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Message sent! Thank you for contacting us.');
  });
});
