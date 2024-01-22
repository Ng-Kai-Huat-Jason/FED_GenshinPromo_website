// Function to open and close mobile menu when hamburger icon is clicked
function initializeMenu() {
  const bar = document.getElementById('bar');
  const close = document.getElementById('close');
  const nav = document.getElementById('navbar');

  if (bar) {
    bar.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  if (close) {
    close.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  }
}

window.onload = initializeMenu;
