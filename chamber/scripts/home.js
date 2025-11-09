// Utility function: load JSON data
async function getJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

// Choose 3 spotlight members: Gold first, then Silver
function pickSpotlights(members, count = 3) {
  const sorted = members
    .slice()
    .sort((a, b) => (b.membershipLevel || 1) - (a.membershipLevel || 1));

  return sorted.slice(0, count);
}

// Build spotlight card HTML
function cardFor(member) {
  const card = document.createElement("article");
  card.className = "card";

  card.innerHTML = `
    <img class="logo" src="${member.logo}" alt="${member.name} logo" width="64" height="64">
    <div>
      <h3>${member.name}</h3>
      <div class="meta">
        <div>${member.address}</div>
        <div><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></div>
      </div>
      <span class="badge ${
        member.membershipLevel === 3
          ? "gold"
          : member.membershipLevel === 2
          ? "silver"
          : "member"
      }">${
    member.membershipLevel === 3
      ? "Gold"
      : member.membershipLevel === 2
      ? "Silver"
      : "Member"
  }</span>
    </div>
  `;

  return card;
}

// Main function
(async () => {
  try {
    const snapshotEl = document.getElementById("community-snapshot");
    const spotEl = document.getElementById("spotlight-cards");

    const community = await getJSON("data/community.json");
    const members = await getJSON("data/members.json");

    // Community Snapshot list
    if (snapshotEl) {
      snapshotEl.innerHTML = community.snapshot
        .map((line) => `<li>${line}</li>`)
        .join("");
    }

    // Spotlight members (3)
    const spotlights = pickSpotlights(members, 3);

    if (spotEl) {
      spotEl.innerHTML = "";
      spotlights.forEach((member) => spotEl.appendChild(cardFor(member)));
    }

    // Weather placeholder (can add API later)
    // Example: OpenWeatherMap

  } catch (error) {
    console.error("Home page failed:", error);
  }
})();
