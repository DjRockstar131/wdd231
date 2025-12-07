// thankyou.js
import { initLayout } from "./layout.js";

initLayout();

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const data = {
    name: params.get("name") || "",
    email: params.get("email") || "",
    creatureName: params.get("creatureName") || "",
    topic: params.get("topic") || "",
    message: params.get("message") || "",
    timestamp: params.get("timestamp") || "",
  };

  const out = (id) => document.getElementById(id);

  if (out("out-name")) out("out-name").textContent = data.name;
  if (out("out-email")) out("out-email").textContent = data.email;
  if (out("out-creatureName")) out("out-creatureName").textContent = data.creatureName;
  if (out("out-topic")) out("out-topic").textContent = data.topic || "—";

  if (out("out-message")) out("out-message").textContent = data.message;

  let formatted = data.timestamp;
  if (data.timestamp) {
    const d = new Date(data.timestamp);
    if (!Number.isNaN(d.getTime())) {
      formatted = d.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }
  if (out("out-timestamp")) out("out-timestamp").textContent = formatted || "—";
});
