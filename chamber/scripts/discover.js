// Utility: fetch JSON data
async function getJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

// Track visits to this page using localStorage
(function trackVisits() {
  const key = "discover_visits";
  const visits = Number(localStorage.getItem(key) || 0) + 1;
  localStorage.setItem(key, visits);

  const visitsEl = document.getElementById("visits");
  if (visitsEl) {
    visitsEl.textContent = `You have viewed this page ${visits} time${visits === 1 ? "" : "s"}.`;
  }
})();

// Load demographics + events from community.json
(async () => {
  try {
    const data = await getJSON("data/community.json");

    const demoEl = document.getElementById("demographics");
    const eventsEl = document.getElementById("events");

    // Insert demographics list
    if (demoEl && data.demographics) {
      demoEl.innerHTML = data.demographics
        .map(item => `<li>${item}</li>`)
        .join("");
    }

    // Insert events list
    if (eventsEl && data.events) {
      eventsEl.innerHTML = data.events
        .map(ev => `<li><strong>${ev.title}</strong> — ${ev.date} @ ${ev.location}</li>`)
        .join("");
    }

  } catch (err) {
    console.error("Error loading Discover page:", err);
  }
})();
