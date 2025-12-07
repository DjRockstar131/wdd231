// form.js
import { initLayout } from "./layout.js";

initLayout();

document.addEventListener("DOMContentLoaded", () => {
  const ts = document.getElementById("timestamp");
  if (ts) {
    ts.value = new Date().toISOString();
  }
});
