/* =========================================
   PROJECT FILTERS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  buildHomepageProjects("all");
  buildHomepageAccolades("all");
  filterGalleryProjects("all");
  filterGalleryAccolades("all");
  const homepageFilterButtons =
  document.querySelectorAll(
    ".homepage-filter-btn"
  );

const galleryFilterButtons =
  document.querySelectorAll(
    ".gallery-filter-btn"
  );

  const homepageAccoladeButtons =
  document.querySelectorAll(
    ".homepage-accolade-filter-btn"
  );

const galleryAccoladeButtons =
  document.querySelectorAll(
    ".gallery-accolade-filter-btn"
  );

  if (
  !homepageFilterButtons.length &&
  !galleryFilterButtons.length&&
  !homepageAccoladeButtons.length &&
  !galleryAccoladeButtons.length
)
  return;

 /* =========================================
   HOMEPAGE FILTERS
========================================= */

homepageFilterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const selectedCategory =
      button.dataset.filter;

    homepageFilterButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    buildHomepageProjects(
      selectedCategory
    );

  });

});


/* =========================================
   GALLERY FILTERS
========================================= */

galleryFilterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const selectedCategory =
      button.dataset.filter;

    galleryFilterButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    filterGalleryProjects(
      selectedCategory
    );

  });

});

/* =========================================
   HOMEPAGE ACCOLADE FILTERS
========================================= */

homepageAccoladeButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const selectedCategory =
      button.dataset.filter;

    homepageAccoladeButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    buildHomepageAccolades(
      selectedCategory
    );

  });

});

/* =========================================
   GALLERY ACCOLADE FILTERS
========================================= */

galleryAccoladeButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const selectedCategory =
      button.dataset.filter;

    galleryAccoladeButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    filterGalleryAccolades(
      selectedCategory
    );

  });
});
});

/* =========================================
   HOMEPAGE PROJECT BUILDER
========================================= */

function buildHomepageProjects(category) {

  const gallery =
    document.querySelector(".projects-gallery-grid");

  const homepage =
    document.querySelector(".projects-grid");

  if (!gallery || !homepage) return;

  homepage.innerHTML = "";

  const cards =
    [...gallery.querySelectorAll(".project-card")];

  let selectedCards = [];

  /* ALL TAB */
  if (category === "all") {

    selectedCards = cards
      .filter(card => card.dataset.homeAll)
      .sort(
        (a, b) =>
          Number(a.dataset.homeAll) -
          Number(b.dataset.homeAll)
      )
      .slice(0, 3);

  }

  /* CATEGORY TABS */
  else {

    selectedCards = cards
      .filter(
        card =>
          card.dataset.category === category
      )
      .sort(
        (a, b) =>
          Number(a.dataset.order || 999) -
          Number(b.dataset.order || 999)
      )
      .slice(0, 3);

  }

  selectedCards.forEach(card => {

    homepage.appendChild(
      card.cloneNode(true)
    );

  });

}

/* =========================================
   GALLERY PROJECT FILTER
========================================= */

function filterGalleryProjects(category) {

  const cards =
    document.querySelectorAll(
      ".projects-gallery-grid .project-card"
    );

  cards.forEach(card => {

    if (
      category === "all" ||
      card.dataset.category === category
    ) {

      card.style.display = "block";

    } else {

      card.style.display = "none";

    }

  });

}

/* =========================================
   HOMEPAGE ACCOLADE BUILDER
========================================= */

function buildHomepageAccolades(category) {

  const gallery =
    document.querySelector(
      ".accolades-gallery-grid"
    );

  const homepage =
    document.querySelector(
      "#accolades .accolades-grid"
    );

  if (!gallery || !homepage) return;

  homepage.innerHTML = "";

  const cards =
    [...gallery.querySelectorAll(".accolade-card")];

  let selectedCards = [];

  if (category === "all") {

    selectedCards = cards
      .filter(card => card.dataset.homeAll)
      .sort(
        (a, b) =>
          Number(a.dataset.homeAll) -
          Number(b.dataset.homeAll)
      )
      .slice(0, 3);

  } else {

    selectedCards = cards
      .filter(
        card =>
          card.dataset.category === category
      )
      .sort(
        (a, b) =>
          Number(a.dataset.order || 999) -
          Number(b.dataset.order || 999)
      )
      .slice(0, 3);

  }

  selectedCards.forEach(card => {

    homepage.appendChild(
      card.cloneNode(true)
    );

  });

}

/* =========================================
   GALLERY ACCOLADE FILTER
========================================= */

function filterGalleryAccolades(category) {

  const cards =
    document.querySelectorAll(
      ".accolades-gallery-grid .accolade-card"
    );

  cards.forEach(card => {

    if (
      category === "all" ||
      card.dataset.category === category
    ) {

      card.style.display = "block";

    } else {

      card.style.display = "none";

    }

  });

}
