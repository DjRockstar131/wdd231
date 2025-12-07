// home.js
import { initLayout } from "./layout.js";
import { fetchJSON } from "./data.js";

initLayout();

const featuredEl = document.getElementById("featured-monster");

async function loadFeatured() {
  if (!featuredEl) return;

  try {
    const data = await fetchJSON("data/creatures.json");
    const creatures = data.creatures || [];
    if (!creatures.length) return;

    const random = creatures[Math.floor(Math.random() * creatures.length)];

    featuredEl.innerHTML = `
      <article class="card creature-card">
        <img
          src="${random.image}"
          alt="${random.name}"
          class="creature-img"
          loading="lazy"
          width="480"
          height="320"
        />
        <div>
          <header class="creature-header">
            <h2>${random.name}</h2>
          </header>
          <p class="muted">${random.short_lore}</p>
          <div class="creature-meta">
            <span>Type: ${random.type}</span>
            <span>CR: ${random.cr}</span>
            <span>Env: ${(random.environment || []).join(", ")}</span>
          </div>
        </div>
      </article>
    `;
  } catch (err) {
    featuredEl.innerHTML = `<p role="alert">Failed to load featured creature.</p>`;
  }
}

loadFeatured();
