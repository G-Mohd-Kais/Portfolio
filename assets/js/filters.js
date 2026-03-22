const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

// ================= FILTER LOGIC =================
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    // Active button highlight
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    // Show / hide projects
    projects.forEach(project => {
      const categories = project.dataset.category.split(" ");

      if (filter === "all" || categories.includes(filter)) {
        project.style.display = "block";
        project.style.opacity = "1";
      } else {
        project.style.opacity = "0";
        setTimeout(() => project.style.display = "none", 200);
      }
    });

    // ================= AUTO CENTER ON CLICK =================
    const container = document.querySelector(".project-filters");

    if (container) {
      const offset =
        btn.offsetLeft -
        container.clientWidth / 2 +
        btn.clientWidth / 2;

      container.scrollTo({
        left: offset,
        behavior: "smooth"
      });
    }
  });
});


// ================= CENTER ON PAGE LOAD =================
window.addEventListener("load", () => {
  const container = document.querySelector(".project-filters");
  const active = document.querySelector(".filter-btn.active");

  if (container && active) {
    const offset =
      active.offsetLeft -
      container.clientWidth / 2 +
      active.clientWidth / 2;

    container.scrollTo({
      left: offset,
      behavior: "smooth"
    });
  }
});
