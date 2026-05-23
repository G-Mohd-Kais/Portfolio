/* =========================================
   COPY EMAIL TO CLIPBOARD
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const emailBox = document.getElementById("copyEmail");
  const toast = document.getElementById("copyToast");

  if (!emailBox || !toast) return;

  const emailTextElement =
    emailBox.querySelector(".email-text");

  if (!emailTextElement) return;

  const email =
    emailTextElement.textContent.trim();

  /* =========================================
     SHOW TOAST
  ========================================= */
  function showToast(message = "Email copied to clipboard") {
    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toast._timeout);

    toast._timeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  }

  /* =========================================
     COPY FUNCTION
  ========================================= */
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);

      showToast("Email copied to clipboard");

    } catch (err) {
      /* fallback for older browsers */
      try {
        const tempInput =
          document.createElement("textarea");

        tempInput.value = email;
        document.body.appendChild(tempInput);

        tempInput.select();
        document.execCommand("copy");

        document.body.removeChild(tempInput);

        showToast("Email copied");

      } catch (fallbackErr) {
        showToast("Copy failed");
        console.error(
          "Clipboard copy failed:",
          fallbackErr
        );
      }
    }
  }

  /* =========================================
     CLICK EVENT
  ========================================= */
  emailBox.addEventListener("click", copyEmail);

  /* =========================================
     KEYBOARD ACCESSIBILITY
  ========================================= */
  emailBox.setAttribute("tabindex", "0");
  emailBox.setAttribute(
    "aria-label",
    "Copy email address"
  );

  emailBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      copyEmail();
    }
  });
});