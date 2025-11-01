// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav   = document.getElementById('site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Dynamic copyright (© CURRENT_YEAR)
const copyrightEl = document.getElementById('copyright');
if (copyrightEl) {
  const year = new Date().getFullYear();
  // Use &copy; symbol and current year
  copyrightEl.innerHTML = `&copy; ${year}`;
}

// Last modified (from the browser’s document.lastModified)
const lastModEl = document.getElementById('lastModified');
if (lastModEl) {
  const last = new Date(document.lastModified);
  // Format as e.g., "Last modified: 2025-11-01 13:22"
  const two = n => String(n).padStart(2, '0');
  const formatted = `${last.getFullYear()}-${two(last.getMonth()+1)}-${two(last.getDate())} ${two(last.getHours())}:${two(last.getMinutes())}`;
  lastModEl.textContent = `Last modified: ${formatted}`;
}
