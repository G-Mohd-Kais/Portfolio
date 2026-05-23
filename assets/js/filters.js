/* =========================================
   PROJECT FILTERS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (!filterButtons.length || !projectCards.length) return;

  /* =========================================
     FILTER FUNCTION
  ========================================= */
  function filterProjects(category) {
    projectCards.forEach((card) => {
      const projectCategory = card.dataset.category;

      if (
        category === "all" ||
        projectCategory === category
      ) {
        card.style.display = "block";

        /* animation reset */
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";

        requestAnimationFrame(() => {
          setTimeout(() => {
            card.style.transition =
              "opacity 0.4s ease, transform 0.4s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        });

      } else {
        card.style.display = "none";
      }
    });
  }

  /* =========================================
     BUTTON EVENTS
  ========================================= */
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory =
        button.dataset.filter;

      /* active button state */
      filterButtons.forEach((btn) =>
        btn.classList.remove("active")
      );

      button.classList.add("active");

      /* filter */
      filterProjects(selectedCategory);
    });
  });

  /* =========================================
     INITIAL LOAD
  ========================================= */
  filterProjects("all");
});