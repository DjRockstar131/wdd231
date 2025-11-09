// Inject a consistent header/nav/footer and set last modified.
const header = document.getElementById('site-header');
const footer = document.getElementById('site-footer');

header.innerHTML = `
  <div class="header-inner">
    <a class="brand" href="index.html">
      <img src="images/logo.svg" alt="Farmington Chamber logo" width="38" height="38">
      <span>Farmington Chamber</span>
    </a>

    <button class="nav-toggle" aria-expanded="false" aria-controls="primary-nav">Menu</button>

    <nav id="primary-nav" aria-label="Primary">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="discover.html">Discover</a></li>
        <li><a href="directory.html">Directory</a></li>
        <li><a href="join.html">Join</a></li>
      </ul>
    </nav>
  </div>
`;

footer.innerHTML = `
  <div class="footer-inner">
    <div class="footer-col">
      <strong>Farmington Chamber of Commerce</strong><br>
      <span>75 N Main St, Farmington, UT 84025</span><br>
      <a href="tel:+1-801-555-0145">(801) 555-0145</a> ·
      <a href="mailto:info@farmingtonchamber.example">info@farmingtonchamber.example</a>
    </div>
    <div class="footer-col">
      <span>&copy; <span id="year"></span> Davin Quist — WDD 231</span><br>
      <span>Last Modified: <span id="lastmod"></span></span>
    </div>
  </div>
`;

// Mobile nav toggle
const toggleBtn = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-nav');
if (toggleBtn && nav) {
  toggleBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(open));
  });
}

// Footer dynamic info
const y = document.getElementById('year');
const lm = document.getElementById('lastmod');
if (y) y.textContent = new Date().getFullYear();
if (lm) lm.textContent = new Date(document.lastModified).toLocaleString('en-US', {
  year: 'numeric', month: 'short', day: '2-digit',
  hour: '2-digit', minute: '2-digit'
});

// Highlight active nav link
const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('#primary-nav a').forEach(a => {
  const href = a.getAttribute('href');
  if ((path === '' && href === 'index.html') || href === path) {
    a.setAttribute('aria-current', 'page');
  }
});
