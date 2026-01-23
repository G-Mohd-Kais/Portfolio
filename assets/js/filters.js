const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

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
  });
});
