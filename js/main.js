document.documentElement.classList.remove('no-js');
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
