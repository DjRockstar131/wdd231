// bestiary.js
import { initLayout } from "./layout.js";
import { fetchJSON } from "./data.js";
import { getFavorites, toggleFavorite } from "./storage.js";

initLayout();

const listEl = document.getElementById("creature-list");
const filtersForm = document.getElementById("filters");
const clearFiltersBtn = document.getElementById("clear-filters");
const modal = document.getElementById("creature-modal");
const modalContent = document.getElementById("modal-content");

let allCreatures = [];
let favorites = new Set(getFavorites());

async function loadCreatures() {
  if (!listEl) return;

  // Always start with filters cleared so nothing accidentally hides everything
  if (filtersForm) {
    filtersForm.reset();
  }

  try {
    const data = await fetchJSON("data/creatures.json");
    allCreatures = data.creatures || [];
    renderCreatures();
  } catch (err) {
    console.error(err);
    listEl.innerHTML = `<p role="alert">Failed to load creatures: ${err.message}</p>`;
  }
}

function getFilterValues() {
  if (!filtersForm) {
    return {
      type: "",
      env: "",
      size: "",
      maxCr: "",
      favoritesOnly: false,
    };
  }

  const formData = new FormData(filtersForm);
  return {
    type: formData.get("type") || "",
    env: formData.get("env") || "",
    size: formData.get("size") || "",
    maxCr: formData.get("maxCr") || "",
    favoritesOnly: formData.get("favoritesOnly") === "on",
  };
}

function applyFilters(creatures) {
  const { type, env, size, maxCr, favoritesOnly } = getFilterValues();

  return creatures.filter((c) => {
    // Type
    if (type && c.type !== type) return false;

    // Environment (array of strings)
    if (env && !(c.environment || []).includes(env)) return false;

    // Size (string) – extra defensive
    if (size) {
      const creatureSize = (c.size || "").toString().toLowerCase().trim();
      const wantedSize = size.toString().toLowerCase().trim();
      if (!creatureSize || creatureSize !== wantedSize) return false;
    }

    // Max CR
    if (maxCr && Number(c.cr) > Number(maxCr)) return false;

    // Favorites
    if (favoritesOnly && !favorites.has(c.id)) return false;

    return true;
  });
}

function renderCreatures() {
  if (!listEl) return;
  listEl.innerHTML = "";

  const filtered = applyFilters(allCreatures);

  if (!filtered.length) {
    listEl.innerHTML = `<p class="muted">No creatures match those filters.</p>`;
    return;
  }

  filtered.forEach((c) => {
    const card = document.createElement("article");
    card.className = "card creature-card";
    card.dataset.creatureId = c.id;

    card.innerHTML = `
      <img
        src="${c.image}"
        alt="${c.name}"
        class="creature-img"
        loading="lazy"
        width="480"
        height="320"
      />
      <div>
        <header class="creature-header">
          <h2>${c.name}</h2>
          <button
            type="button"
            class="fav-btn"
            data-id="${c.id}"
            aria-label="Toggle favorite for ${c.name}"
          >
            ${favorites.has(c.id) ? "★" : "☆"}
          </button>
        </header>
        <div class="creature-meta">
          <span>Type: ${c.type}</span>
          <span>Size: ${c.size || "Unknown"}</span>
          <span>CR: ${c.cr}</span>
          <span>Env: ${(c.environment || []).join(", ")}</span>
        </div>
      </div>
    `;

    listEl.appendChild(card);
  });

  wireEvents();
}

function openModal(creature) {
  if (!modal || !modalContent) return;
  modalContent.innerHTML = `
    <h2>${creature.name}</h2>
    <p class="muted" style="margin-bottom: .75rem;">${creature.lore}</p>
    <ul class="bullets">
      <li><strong>Type:</strong> ${creature.type}</li>
      <li><strong>Size:</strong> ${creature.size}</li>
      <li><strong>CR:</strong> ${creature.cr}</li>
      <li><strong>Environment:</strong> ${(creature.environment || []).join(
        ", "
      )}</li>
      <li><strong>HP / AC:</strong> ${creature.hit_points} HP · AC ${
    creature.ac
  }</li>
    </ul>
    <h3 style="margin-top: .75rem;">Abilities</h3>
    <ul class="bullets">
      ${(creature.abilities || []).map((a) => `<li>${a}</li>`).join("")}
    </ul>
  `;
  if (typeof modal.showModal === "function") {
    modal.showModal();
  }
}

function wireEvents() {
  if (!listEl) return;

  // Favorite toggle buttons
  listEl.querySelectorAll(".fav-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-id");
      if (!id) return;
      const updated = toggleFavorite(id);
      favorites = new Set(updated);
      renderCreatures();
    });
  });

  // Card click -> open modal
  listEl.querySelectorAll(".creature-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (
        e.target instanceof HTMLElement &&
        e.target.matches(".fav-btn")
      )
        return;

      const id = card.getAttribute("data-creature-id");
      const creature = allCreatures.find((c) => c.id === id);
      if (creature) openModal(creature);
    });
  });
}

// Filter events
if (filtersForm) {
  filtersForm.addEventListener("input", () => {
    renderCreatures();
  });
}

// Optional: clear-filters button
if (filtersForm && clearFiltersBtn) {
  clearFiltersBtn.addEventListener("click", () => {
    filtersForm.reset();
    renderCreatures();
  });
}

// Modal close button
document.querySelector(".close-modal")?.addEventListener("click", () => {
  if (modal && modal.open) modal.close();
});

loadCreatures();
