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
     SMOOTH NAV ACTIVE FEEL
  ========================================= */

  const navLinks = document.querySelectorAll(
    ".nav-links a, .mobile-nav a"
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) =>
        item.classList.remove(".active")
      );

      link.classList.add(".active");
    });
  });

  /* =========================================
     INIT
  ========================================= */

  initTheme();
});
