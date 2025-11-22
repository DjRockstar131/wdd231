document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const firstName = params.get("firstName") || "";
  const lastName = params.get("lastName") || "";
  const email = params.get("email") || "";
  const phone = params.get("phone") || "";
  const organization = params.get("organization") || "";
  const timestamp = params.get("timestamp") || "";

  // Try to format timestamp nicely if it's ISO
  let formattedTimestamp = timestamp;
  if (timestamp) {
    const d = new Date(timestamp);
    if (!isNaN(d.getTime())) {
      formattedTimestamp = d.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
  }

  const byId = (id) => document.getElementById(id);

  if (byId("out-firstName")) byId("out-firstName").textContent = firstName;
  if (byId("out-lastName")) byId("out-lastName").textContent = lastName;
  if (byId("out-email")) byId("out-email").textContent = email;
  if (byId("out-phone")) byId("out-phone").textContent = phone;
  if (byId("out-organization")) byId("out-organization").textContent = organization;
  if (byId("out-timestamp")) byId("out-timestamp").textContent = formattedTimestamp || timestamp;
});
