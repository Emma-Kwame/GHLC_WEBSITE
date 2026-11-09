export function setupContactForm() {
  const form = document.querySelector('[data-contact-form]');
  const status = form?.querySelector('[data-form-status]');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = data.get('name');
    const email = data.get('email');
    const subject = data.get('subject');
    const message = data.get('message');
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:info@gloryhopelife.org?subject=${encodeURIComponent(`[Website] ${subject}`)}&body=${encodeURIComponent(body)}`;

    if (status) {
      status.textContent = 'Your email app is opening so you can review and send your message.';
    }
    window.location.href = mailto;
  });
}
