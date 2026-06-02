  /* =========================================
    MAIN JS
    Theme + Mobile Navigation + UX
  ========================================= */

  document.addEventListener("DOMContentLoaded", () => {
    const htmlRoot = document.documentElement;
    const themeToggle = document.getElementById("theme-toggle");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileNav = document.getElementById("mobileNav");

    const THEME_KEY = "kais-portfolio-theme";

    /* =========================================
      THEME FUNCTIONS
    ========================================= */

    function getSystemTheme() {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    function getSavedTheme() {
      return localStorage.getItem(THEME_KEY);
    }

    function applyTheme(theme) {
      if (theme === "dark") {
        htmlRoot.classList.add("dark");
        themeToggle.classList.add("dark-mode");
      } else {
        htmlRoot.classList.remove("dark");
        themeToggle.classList.remove("dark-mode");
      }
    }

    function initTheme() {
      const savedTheme = getSavedTheme();
      const initialTheme = savedTheme || getSystemTheme();

      applyTheme(initialTheme);
    }

    /* =========================================
      THEME TOGGLE CLICK
    ========================================= */

    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        const isDark = htmlRoot.classList.contains("dark");

        const newTheme = isDark ? "light" : "dark";

        applyTheme(newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
      });
    }

    /* =========================================
      SYSTEM THEME CHANGE
    ========================================= */

    const darkMedia = window.matchMedia("(prefers-color-scheme: dark)");

    darkMedia.addEventListener("change", (e) => {
      if (!getSavedTheme()) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });

    /* =========================================
      MOBILE MENU
    ========================================= */

    if (mobileMenuBtn && mobileNav) {
      mobileMenuBtn.addEventListener("click", () => {
        mobileNav.classList.toggle("active");

        const icon = mobileMenuBtn.querySelector("i");

        if (mobileNav.classList.contains("active")) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-xmark");
        } else {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      });
    }

    /* =========================================
      CLOSE MOBILE MENU ON LINK CLICK
    ========================================= */

    const mobileLinks = document.querySelectorAll(".mobile-nav a");

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active");

        const icon = mobileMenuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      });
    });

    /* =========================================
      CLOSE MOBILE MENU IF CLICK OUTSIDE
    ========================================= */

    document.addEventListener("click", (e) => {
      if (
        mobileNav &&
        mobileMenuBtn &&
        !mobileNav.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
      ) {
        mobileNav.classList.remove("active");

        const icon = mobileMenuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });

    /* =========================================
   SCROLL ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(
  ".nav-links a, .mobile-nav a"
);

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop - 150;

    const sectionHeight =
      section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY <
      sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }

  });

  navLinks.forEach((link) => {

    link.classList.remove("active");

    if (
      link.getAttribute("href") ===
      `#${current}`
    ) {
      link.classList.add("active");
    }

  });

});

    document.addEventListener("shown.bs.modal", () => {
    document.body.classList.add("modal-active");
  });

  document.addEventListener("hidden.bs.modal", () => {
     if (!document.querySelector(".modal.show")) {
      document.body.classList.remove("modal-active");
  }
});

    /* =========================================
      INIT
    ========================================= */

    initTheme();
  });
