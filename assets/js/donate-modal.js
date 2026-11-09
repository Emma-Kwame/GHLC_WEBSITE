export function setupDonateModal() {
  const openDonateButtons = [...document.querySelectorAll('#openModal, #openModalFooter')];
  const donateModal = document.getElementById('donateModal');
  const closeDonate = donateModal ? donateModal.querySelector('.modal-close') : null;
  if (donateModal && openDonateButtons.length) {
    const openModal = (e) => {
      if (e) e.preventDefault();
      donateModal.classList.add('show');
      donateModal.setAttribute('aria-hidden', 'false');
    };
    const closeModal = () => {
      donateModal.classList.remove('show');
      donateModal.setAttribute('aria-hidden', 'true');
    };
    openDonateButtons.forEach(btn => btn.addEventListener('click', openModal));
    if (closeDonate) closeDonate.addEventListener('click', closeModal);
    donateModal.addEventListener('click', (e) => {
      if (e.target === donateModal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }
}
