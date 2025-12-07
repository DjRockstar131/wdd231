// layout.js
export function initLayout() {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  if (header) {
    header.innerHTML = `
      <div class="header-inner">
        <a class="brand" href="index.html">
          <img src="images/logo.svg" alt="Arcane Bestiary logo" width="36" height="36" />
          <span>Arcane Bestiary</span>
        </a>
        <button class="nav-toggle" aria-expanded="false" aria-controls="primary-nav">
          Menu
        </button>
        <nav id="primary-nav" aria-label="Primary navigation">
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="bestiary.html">Bestiary</a></li>
            <li><a href="world.html">World</a></li>
            <li><a href="form.html">Form</a></li>
          </ul>
        </nav>
      </div>
    `;
  }

  if (footer) {
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-col">
        <strong>Arcane Bestiary</strong><br />
        <span>A fan-made D&amp;D bestiary by Davin Quist</span>
      </div>

      <div class="footer-col">
        &copy; <span id="year"></span> Davin Quist — WDD 231 ·
        <br />
        <a id="demo-video" href="#" target="_blank" rel="noopener">
          🎥 Project Demo Video
        </a>
      </div>
    </div>
  `;

  // ⭐ Set the video link here — update this once you upload your video
  const videoUrl = "https://youtu.be/qSmgsUXnTxA";
  const videoLink = document.getElementById("demo-video");
  if (videoLink && videoUrl) {
    videoLink.href = videoUrl;
  }
}




  // Mobile nav toggle
  const toggleBtn = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");

  if (toggleBtn && nav) {
    toggleBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggleBtn.setAttribute("aria-expanded", String(open));
    });
  }

  // Year
  const y = document.getElementById("year");
  if (y) {
    y.textContent = new Date().getFullYear();
  }

  // Wayfinding
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("#primary-nav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path) {
      a.setAttribute("aria-current", "page");
    }
  });
const videoUrl = "https://youtu.be/qSmgsUXnTxA";
  const videoLink = document.getElementById("demo-video");
  if (videoLink && videoUrl) {
    videoLink.href = videoUrl;
}
}