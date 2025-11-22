// Set timestamp when the form is loaded
document.addEventListener("DOMContentLoaded", () => {
  const timestampInput = document.getElementById("timestamp");
  if (timestampInput) {
    // Store ISO string for accuracy and easy reading later
    timestampInput.value = new Date().toISOString();
  }

  // Modal behavior: open/close
  const openButtons = document.querySelectorAll(".link-button[data-modal]");
  const closeButtons = document.querySelectorAll(".membership-modal .close-modal");

  openButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-modal");
      const dialog = document.getElementById(id);
      if (dialog && typeof dialog.showModal === "function") {
        dialog.showModal();
      }
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dialog = btn.closest("dialog");
      if (dialog && dialog.open) {
        dialog.close();
      }
    });
  });

  // Optional: close dialog when clicking backdrop
  document.querySelectorAll(".membership-modal").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (!inside) dialog.close();
    });
  });
});
