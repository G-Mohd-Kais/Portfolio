/* =========================================
   HERO TYPED TEXT
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const typedElement = document.getElementById("typed");

  if (!typedElement) return;

  const phrases = [
    "Attractive Dashboards",
    "Automation Workflows",
    "CRM Solutions",
    "Data Pipelines",
    "Analytics Systems",
    "Operational Intelligence"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingSpeed = 90;
  const deletingSpeed = 50;
  const pauseTime = 1600;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      typedElement.textContent =
        currentPhrase.substring(0, charIndex + 1);

      charIndex++;

      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeLoop, pauseTime);
        return;
      }

      setTimeout(typeLoop, typingSpeed);

    } else {
      typedElement.textContent =
        currentPhrase.substring(0, charIndex - 1);

      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex =
          (phraseIndex + 1) % phrases.length;
      }

      setTimeout(typeLoop, deletingSpeed);
    }
  }

  /* cursor */
  const cursor = document.createElement("span");
  cursor.className = "typed-cursor";
  cursor.textContent = "|";

  typedElement.after(cursor);

  typeLoop();
});